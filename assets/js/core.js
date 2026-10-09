/*
 * Codex Armorum – Kern
 * Namespace, Daten-Registry, Berechnungen, Speicher und Erweiterungs-Hooks.
 * Diese Datei kennt keine Oberfläche; app.js baut darauf auf.
 */
(function (global) {
  'use strict';

  const WH40K = (global.WH40K = global.WH40K || {});

  WH40K.factions = [];
  WH40K.factionIndex = {};

  /* ------------------------------------------------------------------ *
   * Ereignisse / Plugins
   * Eigene Module können sich einklinken, z. B.:
   *   WH40K.on('armyRendered', ({ faction, army, calc, root }) => { ... });
   * ------------------------------------------------------------------ */
  const listeners = {};
  WH40K.on = function (event, fn) {
    (listeners[event] = listeners[event] || []).push(fn);
  };
  WH40K.emit = function (event, payload) {
    (listeners[event] || []).forEach((fn) => {
      try { fn(payload); } catch (err) { console.error('[WH40K] Hook-Fehler', event, err); }
    });
  };
  WH40K.registerPlugin = function (plugin) {
    if (!plugin || typeof plugin.init !== 'function') {
      console.warn('[WH40K] Plugin braucht eine init()-Funktion', plugin);
      return;
    }
    WH40K.on('ready', () => plugin.init(WH40K));
  };

  /* ------------------------------------------------------------------ *
   * Hilfsfunktionen
   * ------------------------------------------------------------------ */
  const util = (WH40K.util = {});

  util.esc = function (value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  util.fmt = function (n) {
    return Number(n || 0).toLocaleString('de-DE');
  };

  util.stripDiacritics = function (s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '');
  };

  // Wahapedia-Schema: Wörter mit großem Anfangsbuchstaben, Leerzeichen und Apostrophe -> "-"
  // Beispiele: "Captain in Terminator Armour" -> "Captain-In-Terminator-Armour",
  //            "Shas'o R'alai" -> "Shas-o-R-alai", "XV9 Hazard" -> "Xv9-Hazard"
  // connectors = 'lower': Verbindungswörter bleiben klein ("Lord-of-Contagion") – bei neueren Codizes so üblich.
  // Passt der Name trotzdem nicht, im Datensatz `wahapedia: '<Slug>'` angeben.
  const CONNECTORS = ['of', 'the', 'with', 'on', 'in', 'and', 'at', 'to', 'for'];
  util.wahapediaSlug = function (name, connectors) {
    return String(name)
      .trim()
      .split(/\s+/)
      .map((w, i) => {
        if (w.includes('-')) return w;
        if (connectors === 'lower' && i > 0 && CONNECTORS.includes(w.toLowerCase())) return w.toLowerCase();
        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
      })
      .join('-')
      .replace(/['’]/g, '-')
      .replace(/[^\p{L}\p{N}-]/gu, '');
  };

  util.template = function (tpl, values) {
    return tpl.replace(/\{(\w+)\}/g, (_, k) => (values[k] == null ? '' : values[k]));
  };

  // Produktdaten aus data/images.js (GW-Webshop): Bild, Produktseite, Bausatzname
  util.productOf = function (unit) {
    return (WH40K.images && (WH40K.images[unit.imageKey || unit.name])) || null;
  };

  util.unitLinks = function (faction, unit) {
    const L = WH40K.config.links;
    const q = encodeURIComponent(unit.searchName || unit.name);
    const product = util.productOf(unit);
    return {
      wahapedia: util.template(L.wahapediaUnit, {
        faction: faction.wahapedia,
        slug: encodeURIComponent(unit.wahapedia || util.wahapediaSlug(unit.name, faction.wahapediaConnectors))
      }),
      shop: product && product.slug ? util.template(L.shopProduct, { slug: product.slug }) : util.template(L.shopSearch, { q }),
      shopIsProduct: !!(product && product.slug),
      lexicanum: util.template(L.lexicanumSearch, { q })
    };
  };

  // Datenblatt-Infos aus data/datasheets.js (Base, Schlüsselwörter, Anführer-Ziele, Transportregel)
  util.sheetOf = function (faction, unit) {
    return (WH40K.datasheets && WH40K.datasheets[faction.id + '|' + unit.name]) || null;
  };

  // Basegröße, z. B. "32mm", "75x42mm", "Rumpf", mehrere Profile mit ";" getrennt
  util.baseOf = function (unit, faction) {
    const sheet = faction ? util.sheetOf(faction, unit) : null;
    return unit.base || (sheet && sheet.base) || null;
  };

  // Alle Schlüsselwörter einer Einheit (inkl. Fraktion), großgeschrieben
  util.keywordsOf = function (faction, unit) {
    const s = util.sheetOf(faction, unit);
    return s ? (s.kw || []).concat(s.fkw || []) : [];
  };

  /*
   * Transportregel aus dem Wortlaut lesen, z. B.:
   * "capacity of 12 ADEPTUS ASTARTES INFANTRY models. It cannot transport JUMP PACK, GRAVIS … models.
   *  Each TERMINATOR model takes up the space of 2 models."
   * Ergebnis: { capacity, require: [[Wort, …] je Pflichtwort bzw. Oder-Gruppe], exclude: [Schlüsselwort], size: {Schlüsselwort: n} }
   */
  util.parseTransport = function (text) {
    if (!text) return null;
    const cap = /capacity of (\d+) (.+?) models?\b/i.exec(text);
    if (!cap) return null;
    const words = cap[2].replace(/\(.*?\)/g, ' ').toUpperCase().split(/\s+/).filter(Boolean);
    const require = [];
    for (let i = 0; i < words.length; i++) {
      if (words[i + 1] === 'OR') {
        const group = [words[i]];
        while (words[i + 1] === 'OR' && words[i + 2]) { group.push(words[i + 2]); i += 2; }
        require.push(group);
      } else if (words[i] !== 'OR') require.push([words[i]]);
    }
    const splitList = (s) => s.replace(/\(.*?\)/g, ' ').split(/,|\/|\bor\b|\band\b/i).map((x) => x.replace(/\bmodels?\b/i, '').trim().toUpperCase()).filter(Boolean);
    const exclude = [];
    const except = [];   // Ausnahmen vom Ausschluss, z. B. "(excluding ASURYANI … models)"
    const ex1 = /cannot transport (.+?) models?(?:\.|\s*\(|$)/i.exec(text);
    if (ex1) {
      exclude.push(...splitList(ex1[1]));
      const exc = /cannot transport [^.]*?\(excluding (.+?) models?\b/i.exec(text);
      if (exc) except.push(...splitList(exc[1]));
    }
    const ex2 = /models? \(excluding (.+?) models?\)/i.exec(text.slice(cap.index, cap.index + cap[0].length + 60));
    if (ex2) exclude.push(...splitList(ex2[1]));
    const size = {};
    const re = /each (.+?) models? takes? (?:up )?the space of (\d+) models?/gi;
    let m;
    while ((m = re.exec(text))) splitList(m[1]).forEach((k) => { size[k] = +m[2]; });
    // Zusatzplatz, z. B. "… models and 1 NECRONS INFANTRY CHARACTER model"
    const ext = /capacity of \d+ .+? models? and (\d+) (.+?) models?\b/i.exec(text);
    const extra = ext ? { count: +ext[1], require: ext[2].toUpperCase().split(/\s+/).filter(Boolean).map((w) => [w]) } : null;
    // Sonderregel: eine Einheit wird geteilt, eine Hälfte steigt ein (z. B. Sagitaur + Hearthkyn Warriors)
    const sp = /select one (.+?) unit from your army that has not been split/i.exec(text);
    return { capacity: +cap[1], require, exclude, except, size, extra, split: sp ? sp[1].toUpperCase() : null, text };
  };

  // Wörter vergleichen ohne Plural-s (WARRIOR = WARRIORS, NECRON = NECRONS)
  const stemWord = (w) => (w.length > 4 && /S$/.test(w) ? w.slice(0, -1) : w);
  const hasAll = (wordSet, phrase) => phrase.split(/\s+/).every((w) => wordSet.has(stemWord(w)));

  // Passt eine Einheit in diesen Transporter? Liefert Platzbedarf pro Modell oder 0, wenn nicht erlaubt.
  util.transportSlotsPerModel = function (rule, keywords, require) {
    const kw = new Set(keywords);
    const words = new Set(keywords.join(' ').split(/\s+/).map(stemWord));
    if (!(require || rule.require).every((g) => g.some((w) => words.has(stemWord(w))))) return 0;
    const excepted = (rule.except || []).some((x) => hasAll(words, x));
    if (!excepted && rule.exclude.some((x) => kw.has(x) || hasAll(words, x))) return 0;
    let per = 1;
    Object.keys(rule.size).forEach((k) => { if (kw.has(k)) per = Math.max(per, rule.size[k]); });
    return per;
  };
  // Lesbare Form: "⌀32 mm", "oval 75×42 mm", "Rumpf (keine Base)"
  util.formatBase = function (base) {
    if (!base) return '–';
    return String(base)
      .split(/;\s*/)
      .map((p) =>
        p
          .replace(/\bRumpf\b/, 'Rumpf (keine Base)')
          .replace(/(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)mm/, 'oval $1×$2 mm')
          .replace(/(^|\s)(\d+(?:\.\d+)?)mm/, '$1⌀$2 mm')
          .replace('flying base', 'Flugbase')
      )
      .join(' · ');
  };

  // Bild einer Einheit: eigenes Bild (Klick in der App) > `image` im Datensatz > Produktfoto aus data/images.js
  util.unitImage = function (faction, unit) {
    const L = WH40K.config.links;
    const own = WH40K.store.getImage(faction.id, unit) || unit.image;
    if (own) return { thumb: own, large: own, source: 'Eigenes Bild', custom: true };
    const product = util.productOf(unit);
    if (!product || !product.img) return null;
    return {
      thumb: util.template(L.gwImage, { path: product.img, w: 120, h: 124 }),
      large: util.template(L.gwImage, { path: product.img, w: 440, h: 454 }),
      source: 'Bausatz: ' + product.product + ' (© Games Workshop)',
      custom: false
    };
  };

  util.factionLinks = function (faction) {
    const L = WH40K.config.links;
    const q = encodeURIComponent(faction.searchName || faction.name);
    return {
      wahapedia: util.template(L.wahapediaFaction, { faction: faction.wahapedia }),
      shop: util.template(L.shopSearch, { q }),
      lexicanum: util.template(L.lexicanumSearch, { q })
    };
  };

  util.initials = function (name) {
    const words = util.stripDiacritics(name).replace(/[^A-Za-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
    const skip = ['of', 'the', 'with', 'in', 'on', 'and', 'de', 'da'];
    const main = words.filter((w) => !skip.includes(w.toLowerCase()));
    return (main.slice(0, 2).map((w) => w[0]).join('') || '?').toUpperCase();
  };

  /* ------------------------------------------------------------------ *
   * Speicher (localStorage) – nur für persönliche Einstellungen.
   * Alles, was hier liegt, lässt sich als JSON exportieren/importieren.
   * ------------------------------------------------------------------ */
  const STORE_KEY = 'wh40k-codex-armorum:v1';
  let userData = readStore();

  // WH40K_EPHEMERAL = true (z. B. in tools/validate.html): persönliche Daten weder lesen noch schreiben
  function readStore() {
    if (global.WH40K_EPHEMERAL) return {};
    try {
      const raw = global.localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      return {};
    }
  }
  function writeStore() {
    if (global.WH40K_EPHEMERAL) return;
    try {
      global.localStorage.setItem(STORE_KEY, JSON.stringify(userData));
    } catch (err) {
      /* privater Modus o. ä. – App funktioniert trotzdem, nur ohne Speichern */
    }
  }
  function bucket(name) {
    if (!userData[name] || typeof userData[name] !== 'object') userData[name] = {};
    return userData[name];
  }

  const unitKey = (fid, unit) => fid + '|' + unit.name + '|' + unit.models;
  const ownKey = (fid, unit) => fid + '|' + unit.name;

  WH40K.store = {
    get: (k) => userData[k],
    set: (k, v) => { userData[k] = v; writeStore(); },

    getPoints: (fid, unit) => {
      const v = bucket('points')[unitKey(fid, unit)];
      return typeof v === 'number' ? v : null;
    },
    setPoints: (fid, unit, value) => {
      const b = bucket('points');
      const key = unitKey(fid, unit);
      if (value == null || value === unit.points) delete b[key];
      else b[key] = value;
      writeStore();
    },
    resetPoints: (fid) => {
      const b = bucket('points');
      Object.keys(b).forEach((k) => { if (!fid || k.startsWith(fid + '|')) delete b[k]; });
      writeStore();
    },
    countPointOverrides: (fid) => Object.keys(bucket('points')).filter((k) => k.startsWith(fid + '|')).length,

    getOwned: (fid, unit) => bucket('collection')[ownKey(fid, unit)] || 0,
    setOwned: (fid, unit, v) => {
      const b = bucket('collection');
      if (!v) { delete b[ownKey(fid, unit)]; delete bucket('ownedQty')[ownKey(fid, unit)]; }
      else b[ownKey(fid, unit)] = v;
      writeStore();
    },

    // Anzahl besessener Einheiten dieses Datenblatts (für „spielbereit“-Prüfung). Ohne Eintrag: 1, wenn als vorhanden markiert.
    getOwnedQty: (fid, unit) => {
      const v = bucket('ownedQty')[ownKey(fid, unit)];
      if (typeof v === 'number') return v;
      return (bucket('collection')[ownKey(fid, unit)] || 0) ? 1 : 0;
    },
    setOwnedQty: (fid, unit, n) => {
      const b = bucket('ownedQty');
      if (!n) delete b[ownKey(fid, unit)];
      else b[ownKey(fid, unit)] = Math.max(0, Math.round(n));
      writeStore();
    },
    collectionEntries: () => Object.keys(bucket('collection')).map((k) => {
      const i = k.indexOf('|');
      return { fid: k.slice(0, i), name: k.slice(i + 1), state: bucket('collection')[k] };
    }),

    getImage: (fid, unit) => bucket('images')[ownKey(fid, unit)] || null,
    setImage: (fid, unit, url) => {
      const b = bucket('images');
      if (!url) delete b[ownKey(fid, unit)];
      else b[ownKey(fid, unit)] = url;
      writeStore();
    },

    // Ausrüstungswahl je Armeezeile: { Optionsname: Anzahl pro Einheit }
    getLoadout: (fid, aid, idx) => bucket('loadout')[fid + '|' + aid + '|' + idx] || null,
    setLoadout: (fid, aid, idx, value) => {
      const b = bucket('loadout');
      if (!value) delete b[fid + '|' + aid + '|' + idx];
      else b[fid + '|' + aid + '|' + idx] = value;
      writeStore();
    },
    resetLoadouts: (fid, aid) => {
      const b = bucket('loadout');
      Object.keys(b).forEach((k) => { if (k.startsWith(fid + '|' + aid + '|')) delete b[k]; });
      writeStore();
    },
    countLoadouts: (fid, aid) => Object.keys(bucket('loadout')).filter((k) => k.startsWith(fid + '|' + aid + '|')).length,

    getNote: (fid, aid) => bucket('notes')[fid + '|' + aid] || '',
    setNote: (fid, aid, text) => {
      const b = bucket('notes');
      if (!text) delete b[fid + '|' + aid];
      else b[fid + '|' + aid] = text;
      writeStore();
    },

    dump: () => JSON.parse(JSON.stringify(userData)),
    replace: (obj) => { userData = obj && typeof obj === 'object' ? obj : {}; writeStore(); }
  };

  /* ------------------------------------------------------------------ *
   * Registry
   * ------------------------------------------------------------------ */
  WH40K.registerFaction = function (faction) {
    const problems = [];
    if (!faction || !faction.id) { console.error('[WH40K] Fraktion ohne id', faction); return; }
    if (WH40K.factionIndex[faction.id]) { console.warn('[WH40K] Fraktion doppelt registriert:', faction.id); return; }

    const roles = WH40K.config.roles;
    faction.armies = (faction.armies || []).map((army, ai) => {
      army.id = army.id || 'armee-' + (ai + 1);
      army.battleSize = army.battleSize || WH40K.config.defaultBattleSize;
      army.detachments = (army.detachments || []).map((d) => (Array.isArray(d) ? { name: d[0], dp: d[1] } : d));
      army.style = army.style || [];
      army.units = (army.units || []).map((u, ui) => {
        if (!roles[u.role]) problems.push(army.id + ': unbekannte Rolle "' + u.role + '" bei ' + u.name);
        if (typeof u.points !== 'number') problems.push(army.id + ': Punkte fehlen bei ' + u.name);
        // Ausrüstung: [Name, Punkte je Stück, Höchstzahl je Einheit, Standardanzahl, Gruppe]
        // Optionen derselben Gruppe teilen sich die Höchstzahl (z. B. „entweder Multi-melta oder Plasma cannon“).
        const wargear = (u.wargear || []).map((w) =>
          Array.isArray(w) ? { name: w[0], points: w[1], max: w[2], def: w[3] || 0, group: w[4] || null } : w
        );
        return Object.assign({ qty: 1, models: 1, task: '' }, u, { idx: ui, wargear });
      });
      return army;
    });
    faction.detachments = (faction.detachments || []).map((d) =>
      Array.isArray(d) ? { name: d[0], dp: d[1], group: d[2] || '' } : d
    );
    if (problems.length) console.warn('[WH40K] Datenhinweise für ' + faction.id, problems);

    WH40K.factions.push(faction);
    WH40K.factionIndex[faction.id] = faction;
  };

  /* Lädt alle in data/manifest.js eingetragenen Fraktionsdateien (funktioniert auch per file://). */
  WH40K.loadFactions = function () {
    const ids = WH40K.manifest || [];
    const base = WH40K.config.factionPath;
    const jobs = ids.map(
      (id) =>
        new Promise((resolve) => {
          const s = document.createElement('script');
          s.src = base + id + '.js';
          s.onload = () => resolve(null);
          s.onerror = () => resolve(id);
          document.head.appendChild(s);
        })
    );
    return Promise.all(jobs).then((results) => {
      WH40K.factions.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
      return results.filter(Boolean);
    });
  };

  /* ------------------------------------------------------------------ *
   * Berechnungen
   * ------------------------------------------------------------------ */
  WH40K.calc = {};

  WH40K.calc.army = function (faction, army) {
    const cfg = WH40K.config;
    const size = cfg.battleSizes[army.battleSize] || cfg.battleSizes[cfg.defaultBattleSize];
    const store = WH40K.store;

    // 11. Edition: Manche Datenblätter kosten ab der N-ten Einheit (nextFrom) einen anderen Preis (pointsNext).
    // Gezählt wird pro Datenblattname über alle Zeilen der Armee, in Listenreihenfolge.
    const copiesSeen = {};
    const rows = army.units.map((u) => {
      const override = store.getPoints(faction.id, u);
      const ppu = override != null ? override : u.points;
      const delta = ppu - u.points;
      const nextPrice = u.pointsNext != null ? u.pointsNext + delta : null;
      const enh = u.enhancement ? u.enhancement.points || 0 : 0;
      let unitsTotal = 0;
      let tiered = 0;
      for (let i = 0; i < u.qty; i++) {
        const copyNo = (copiesSeen[u.name] = (copiesSeen[u.name] || 0) + 1);
        const useNext = nextPrice != null && copyNo >= (u.nextFrom || 2);
        unitsTotal += useNext ? nextPrice : ppu;
        if (useNext) tiered++;
      }
      // Ausrüstung: gespeicherte Wahl > `loadout` im Datensatz > Standardanzahl. Gilt je Einheit, also × Anzahl.
      const chosen = store.getLoadout(faction.id, army.id, u.idx) || u.loadout || {};
      const loadout = u.wargear.map((w) => {
        const count = Math.max(0, Math.min(w.max, chosen[w.name] != null ? chosen[w.name] : w.def));
        return Object.assign({}, w, { count, cost: count * w.points });
      });
      const wargearPerUnit = loadout.reduce((s, w) => s + w.cost, 0);
      return Object.assign({}, u, {
        ppu,
        nextPrice,
        tiered,
        loadout,
        wargearPerUnit,
        wargearPoints: wargearPerUnit * u.qty,
        overridden: override != null,
        enhPoints: enh,
        total: unitsTotal + wargearPerUnit * u.qty + enh,
        modelTotal: u.models * u.qty,
        owned: store.getOwned(faction.id, u)
      });
    });

    const total = rows.reduce((s, r) => s + r.total, 0);
    const dp = army.detachments.reduce((s, d) => s + (d.dp || 0), 0);
    const enhancements = rows.filter((r) => r.enhancement).length;

    const byRole = {};
    rows.forEach((r) => {
      byRole[r.role] = byRole[r.role] || { points: 0, units: 0 };
      byRole[r.role].points += r.total;
      byRole[r.role].units += r.qty;
    });

    const warnings = [];
    if (total > size.points) warnings.push({ level: 'error', text: 'Punktelimit überschritten: ' + total + ' / ' + size.points });
    if (dp > size.dp) warnings.push({ level: 'error', text: 'Zu viele Detachment-Punkte: ' + dp + ' / ' + size.dp + ' DP' });
    if (enhancements > size.enhancements) warnings.push({ level: 'error', text: 'Zu viele Verbesserungen: ' + enhancements + ' / ' + size.enhancements });

    const perName = {};
    rows.forEach((r) => {
      perName[r.name] = perName[r.name] || { qty: 0, role: r.role };
      perName[r.name].qty += r.qty;
    });
    Object.keys(perName).forEach((name) => {
      const { qty, role } = perName[name];
      const limit = role === 'epic' ? 1 : size.unitLimit * (cfg.roles[role] && cfg.roles[role].doubleLimit ? 2 : 1);
      if (qty > limit) warnings.push({ level: 'error', text: name + ': ' + qty + '× (erlaubt ' + limit + '×)' });
    });
    rows.forEach((r) => {
      const groups = {};
      r.loadout.forEach((w) => {
        if (!w.group) return;
        groups[w.group] = groups[w.group] || { used: 0, max: w.max, names: [] };
        groups[w.group].used += w.count;
        groups[w.group].names.push(w.name);
      });
      Object.keys(groups).forEach((g) => {
        if (groups[g].used > groups[g].max) {
          warnings.push({ level: 'error', text: r.name + ': ' + groups[g].names.join(' + ') + ' zusammen max. ' + groups[g].max + ' (' + g + ')' });
        }
      });
    });
    if (!rows.some((r) => r.role === 'char' || r.role === 'epic')) {
      warnings.push({ level: 'error', text: 'Kein Charakter als Warlord vorhanden' });
    }

    // Basen-Bedarf: Einheiten mit einer einzigen Basegröße werden gezählt, gemischte Einheiten separat gelistet
    const bases = { sizes: {}, mixed: [], hulls: 0, unknown: [] };
    rows.forEach((r) => {
      const b = util.baseOf(r, faction);
      if (!b) bases.unknown.push(r.name);
      else if (b.includes(';')) bases.mixed.push({ name: r.name, models: r.modelTotal, base: b });
      else if (/^Rumpf$/.test(b)) bases.hulls += r.modelTotal;
      else bases.sizes[b] = (bases.sizes[b] || 0) + r.modelTotal;
    });

    // Sammlung: benötigte vs. besessene Einheiten je Datenblatt
    const coverage = WH40K.calc.coverage(faction, army);
    const ownedUnits = coverage.have;
    const paintedUnits = coverage.painted;
    const unitCount = rows.reduce((s, r) => s + r.qty, 0);

    const leaders = WH40K.calc.leaders(faction, rows);
    leaders.warnings.forEach((w) => warnings.push(w));
    const transport = WH40K.calc.transport(faction, rows, leaders);
    transport.warnings.forEach((w) => warnings.push(w));

    return {
      size,
      rows,
      total,
      remaining: size.points - total,
      dp,
      enhancements,
      unitCount,
      models: rows.reduce((s, r) => s + r.modelTotal, 0),
      byRole,
      warnings,
      ownedUnits,
      paintedUnits,
      overrides: rows.filter((r) => r.overridden).length,
      wargearPoints: rows.reduce((s, r) => s + r.wargearPoints, 0),
      bases,
      coverage,
      leaders,
      transport
    };
  };

  /* Sammlung: Wie viele der benötigten Einheiten besitze ich? (je Datenblatt: min(besessen, benötigt)) */
  WH40K.calc.coverage = function (faction, army) {
    const store = WH40K.store;
    const need = {};
    army.units.forEach((u) => { need[u.name] = need[u.name] || { unit: u, qty: 0 }; need[u.name].qty += u.qty; });
    let total = 0, have = 0, painted = 0;
    const missing = [];
    Object.keys(need).forEach((name) => {
      const { unit, qty } = need[name];
      const owned = store.getOwnedQty(faction.id, unit);
      const got = Math.min(owned, qty);
      total += qty;
      have += got;
      if (store.getOwned(faction.id, unit) === 2) painted += got;
      if (got < qty) missing.push({ name, missing: qty - got, unit });
    });
    return { total, have, painted, missing, ready: total > 0 && have === total, pct: total ? Math.round((have / total) * 100) : 0 };
  };

  /*
   * Anführer prüfen: Darf der Charakter die angegebene Einheit führen (laut Datenblatt)? Ist sie in der Armee?
   * Hat jede Leibwache höchstens einen Anführer (je Einheit gleichen Namens)?
   */
  WH40K.calc.leaders = function (faction, rows) {
    const list = [];
    const warnings = [];
    const used = { leader: {}, support: {} };
    const qtyOf = (name) => rows.filter((r) => r.name === name).reduce((s, r) => s + r.qty, 0);
    rows.forEach((r) => {
      if (r.role !== 'char' && r.role !== 'epic') return;
      const sheet = util.sheetOf(faction, r);
      const allowed = (sheet && sheet.leads) || [];
      const kind = sheet && sheet.attach === 'support' ? 'support' : 'leader';
      const possible = allowed.filter((n) => qtyOf(n) > 0);
      const target = r.leads ? r.leads.replace(/\s*\(.*\)\s*$/, '').trim() : '';
      let status = 'none';
      if (target) {
        if (!qtyOf(target)) status = 'missing';
        else if (sheet && !allowed.includes(target)) status = 'invalid';
        else status = 'ok';
        if (status === 'ok') used[kind][target] = (used[kind][target] || 0) + r.qty;
      } else if (!allowed.length) status = 'solo';
      list.push({ name: r.name, idx: r.idx, qty: r.qty, target, status, allowed, possible, kind });
      const verb = kind === 'support' ? 'unterstützen' : 'führen';
      if (status === 'missing') warnings.push({ level: 'error', text: r.name + ' soll „' + target + '“ ' + verb + ' – diese Einheit ist nicht in der Armee' });
      if (status === 'invalid') warnings.push({ level: 'error', text: r.name + ' darf „' + target + '“ nicht ' + verb + ' (erlaubt: ' + (allowed.join(', ') || 'keine') + ')' });
      if (status === 'none' && kind === 'support') {
        warnings.push({ level: 'error', text: r.name + ' ist eine Support-Einheit und muss einer Leibwache zugeteilt sein' + (possible.length ? ' (möglich: ' + possible.join(', ') + ')' : ' – keine passende Einheit in der Armee') });
      }
    });
    ['leader', 'support'].forEach((kind) => {
      Object.keys(used[kind]).forEach((t) => {
        if (used[kind][t] > qtyOf(t)) {
          warnings.push({ level: 'error', text: used[kind][t] + ' ' + (kind === 'support' ? 'Support-Einheiten' : 'Leader') + ' für ' + qtyOf(t) + '× ' + t + ' – je Einheit nur ein ' + (kind === 'support' ? 'Support' : 'Leader') });
        }
      });
    });
    return { list, warnings };
  };

  /*
   * Einsteigeplan (Vorschlag): verteilt Einheiten (inkl. zugeteilter Anführer) auf die Transporter.
   * Zuerst Einheiten, die in der Aufgabe des Transporters genannt sind, dann die größten passenden.
   * 11. Edition: Ein DEDICATED TRANSPORT ohne Passagiere wird zu Spielbeginn zerstört.
   */
  WH40K.calc.transport = function (faction, rows, leaders) {
    const slots = [];
    rows.forEach((r) => {
      const sheet = util.sheetOf(faction, r);
      const rule = sheet ? util.parseTransport(sheet.transport) : null;
      if (!rule) return;
      const dedicated = (sheet.kw || []).includes('DEDICATED TRANSPORT');
      for (let i = 0; i < r.qty; i++) slots.push({ name: r.name, copy: i + 1, of: r.qty, task: r.task || '', rule, dedicated, load: 0, passengers: [] });
    });
    if (!slots.length) return { slots, walking: [], warnings: [] };

    // Passagier-Blöcke: jede Einheit (je Exemplar) + zugeteilte Anführer
    const blocks = [];
    const transportNames = new Set(slots.map((s) => s.name));
    rows.forEach((r) => {
      if (transportNames.has(r.name)) return;
      const isLeader = leaders.list.some((l) => l.idx === r.idx && l.status === 'ok');
      if (isLeader) return;
      for (let i = 0; i < r.qty; i++) blocks.push({ names: [r.name], parts: [{ row: r, models: r.models }], assigned: false });
    });
    leaders.list.filter((l) => l.status === 'ok').forEach((l) => {
      const row = rows.find((r) => r.idx === l.idx);
      for (let i = 0; i < l.qty; i++) {
        const b = blocks.find((x) => x.names[0] === l.target && x.parts.length === 1) || blocks.find((x) => x.names[0] === l.target);
        if (b) { b.names.push(row.name); b.parts.push({ row, models: row.models }); }
        else blocks.push({ names: [row.name], parts: [{ row, models: row.models }], assigned: false });
      }
    });
    // Platzbedarf eines Blocks: { n: Plätze, x: Zusatzplätze (z. B. Charakterplatz der Ghost Ark) } oder null
    const need = (slot, block) => {
      let n = 0, x = 0;
      for (const p of block.parts) {
        const kw = util.keywordsOf(faction, p.row);
        const per = util.transportSlotsPerModel(slot.rule, kw);
        if (per) { n += per * p.models; continue; }
        if (slot.rule.extra && util.transportSlotsPerModel(slot.rule, kw, slot.rule.extra.require)) { x += p.models; continue; }
        return null;
      }
      return { n, x };
    };
    const fits = (slot, r) => r && slot.load + r.n <= slot.rule.capacity && (slot.extraLoad || 0) + r.x <= (slot.rule.extra ? slot.rule.extra.count : 0);
    const mentions = (slot, block) => {
      const t = slot.task.toLowerCase();
      return block.names.some((n) => n.toLowerCase().split(/\s+/).filter((w) => w.length > 4 && !/squad|team|marines/.test(w)).some((w) => t.includes(w.replace(/s$/, ''))));
    };
    const place = (slot, block, r, label) => {
      slot.passengers.push({ names: label ? [label] : block.names, models: block.parts.reduce((s, p) => s + p.models, 0), space: r.n + r.x });
      slot.load += r.n; slot.extraLoad = (slot.extraLoad || 0) + r.x; block.assigned = true;
    };
    // Teilungsregel (Sagitaur): ungeteilte passende Einheit halbieren, eine Hälfte steigt ein, die andere bleibt als eigener Block
    const trySplit = (slot, block) => {
      if (!slot.rule.split || block.split) return false;
      const p = block.parts[0];   // Leibwache; weitere Teile sind zugeteilte Charaktere
      if (!util.keywordsOf(faction, p.row).includes(slot.rule.split)) return false;
      const half = Math.ceil(p.models / 2);
      const chars = block.parts.slice(1);
      // Charaktere steigen mit der ersten Hälfte ein, wenn Platz ist – sonst bleiben sie bei der zweiten
      let embark = { names: [p.row.name].concat(chars.map((c) => c.row.name)), parts: [{ row: p.row, models: half }].concat(chars), split: true };
      let r = need(slot, embark);
      let withChars = true;
      if (!fits(slot, r)) {
        embark = { names: [p.row.name], parts: [{ row: p.row, models: half }], split: true };
        r = need(slot, embark);
        withChars = false;
        if (!fits(slot, r)) return false;
      }
      place(slot, embark, r, '½ ' + p.row.name + ' (' + half + ')' + (withChars && chars.length ? ' + ' + chars.map((c) => c.row.name).join(' + ') : ''));
      const rest = [{ row: p.row, models: p.models - half }].concat(withChars ? [] : chars);
      block.parts = rest;
      block.names = ['½ ' + p.row.name + ' (' + (p.models - half) + ')'].concat(withChars ? [] : chars.map((c) => c.row.name));
      block.split = true;
      return true;
    };
    // 1) in der Aufgabe genannte Einheiten
    slots.forEach((slot) => {
      blocks.filter((b) => !b.assigned && mentions(slot, b)).forEach((b) => {
        const r = need(slot, b);
        if (fits(slot, r)) place(slot, b, r);
      });
    });
    // 2) leere Transporter (Dedicated zuerst) mit der größten passenden Einheit füllen, sonst Teilungsregel nutzen
    slots.slice().sort((a, b) => (b.dedicated - a.dedicated)).forEach((slot) => {
      if (slot.passengers.length) return;
      const fit = blocks.filter((b) => !b.assigned).map((b) => ({ b, r: need(slot, b) })).filter((x) => fits(slot, x.r)).sort((x, y) => (y.r.n + y.r.x) - (x.r.n + x.r.x))[0];
      if (fit) { place(slot, fit.b, fit.r); return; }
      blocks.filter((b) => !b.assigned).some((b) => trySplit(slot, b));
    });
    const walking = blocks.filter((b) => !b.assigned && slots.some((s) => fits({ load: 0, extraLoad: 0, rule: s.rule }, need(s, b)))).map((b) => b.names.join(' + '));
    const warnings = slots.filter((s) => s.dedicated && !s.passengers.length).map((s) => ({
      level: 'warn',
      text: s.name + (s.of > 1 ? ' #' + s.copy : '') + ': keine passende Einheit an Bord – ein Dedicated Transport ohne Passagiere wird zu Spielbeginn zerstört'
    }));
    return { slots, walking, warnings };
  };

  WH40K.calc.listText = function (faction, army) {
    const c = WH40K.calc.army(faction, army);
    const roles = WH40K.config.roles;
    const lines = [];
    lines.push(faction.name + ' – ' + army.name);
    lines.push(c.size.label + ': ' + c.total + ' / ' + c.size.points + ' Punkte · ' + c.dp + ' / ' + c.size.dp + ' DP · ' + c.models + ' Modelle');
    lines.push('Detachments: ' + army.detachments.map((d) => d.name + ' (' + d.dp + ' DP)').join(' + '));
    lines.push('');
    Object.keys(roles)
      .sort((a, b) => roles[a].order - roles[b].order)
      .forEach((role) => {
        const rs = c.rows.filter((r) => r.role === role);
        if (!rs.length) return;
        lines.push('== ' + roles[role].label.toUpperCase() + ' ==');
        rs.forEach((r) => {
          const left = (r.qty > 1 ? r.qty + '× ' : '') + r.name + ' (' + r.models + (r.models === 1 ? ' Modell' : ' Modelle') + ')';
          lines.push(left + ' ' + '.'.repeat(Math.max(2, 58 - left.length)) + ' ' + r.total);
          if (r.enhancement) lines.push('   + ' + r.enhancement.name + ' (' + r.enhancement.points + ')');
          r.loadout.filter((w) => w.count).forEach((w) => {
            lines.push('   ⚙ ' + w.count + '× ' + w.name + (r.qty > 1 ? ' je Einheit' : '') + ' (+' + w.cost * r.qty + ')');
          });
        });
        lines.push('');
      });
    const bs = c.bases;
    const sizeKeys = Object.keys(bs.sizes).sort((x, y) => parseFloat(x) - parseFloat(y));
    if (sizeKeys.length || bs.mixed.length || bs.hulls) {
      lines.push('== BASEN ==');
      sizeKeys.forEach((k) => lines.push(bs.sizes[k] + '× ' + util.formatBase(k)));
      if (bs.hulls) lines.push(bs.hulls + '× Fahrzeug ohne Base');
      bs.mixed.forEach((m) => lines.push(m.name + ' (' + m.models + ' Modelle): ' + util.formatBase(m.base)));
      lines.push('');
    }
    lines.push('Punkte laut Wahapedia (Stand ' + WH40K.config.pointsStand + ') – vor dem Spiel im aktuellen Munitorum Field Manual prüfen.');
    return lines.join('\n');
  };
})(window);
