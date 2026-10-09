/*
 * Codex Armorum – Oberfläche
 * Rendert Fraktionsauswahl, Armeen, Tabelle, Vergleich und Dialoge.
 * Erweiterungen bitte über WH40K.on(...) / WH40K.registerPlugin(...) andocken (siehe README).
 */
(function () {
  'use strict';

  const W = window.WH40K;
  const C = W.config;
  const U = W.util;
  const S = W.store;
  const esc = U.esc;

  const state = { factionId: null, armyId: null, sortKey: null, sortDir: 1, role: 'all', highlight: null };

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ================================================================== *
   * Start
   * ================================================================== */
  document.addEventListener('DOMContentLoaded', async () => {
    applyTheme(S.get('theme') || 'dark');
    $('#editionInfo').textContent = C.edition + ' · Stand ' + C.dataStand;
    $('#pointsNote').textContent = C.pointsNote;

    const failed = await W.loadFactions();
    if (!W.factions.length) {
      $('#armyPanel').innerHTML = '<p class="empty">Keine Fraktionsdaten gefunden. Prüfe data/manifest.js.</p>';
      return;
    }
    if (failed.length) toast('Nicht geladen: ' + failed.join(', '));

    buildFactionSelect();
    buildFactionGrid();
    buildSearchIndex();
    bindGlobal();
    window.addEventListener('hashchange', route);
    route();
    W.emit('ready', W);
  });

  /* ================================================================== *
   * Routing  (#fraktion/armee)
   * ================================================================== */
  function route() {
    const parts = decodeURIComponent(location.hash.replace(/^#/, '')).split('/');
    const last = S.get('last') || {};
    const f = W.factionIndex[parts[0]] || W.factionIndex[last.f] || W.factions[0];
    const a = f.armies.find((x) => x.id === parts[1]) || f.armies.find((x) => x.id === last.a) || f.armies[0];
    if (state.factionId !== f.id) { state.role = 'all'; state.sortKey = null; }
    state.factionId = f.id;
    state.armyId = a ? a.id : null;
    S.set('last', { f: f.id, a: state.armyId });
    render();
  }

  function go(fid, aid, highlight) {
    state.highlight = highlight || null;
    const hash = '#' + fid + '/' + aid;
    if (location.hash === hash) route();
    else location.hash = hash;
  }

  const currentFaction = () => W.factionIndex[state.factionId];
  const currentArmy = () => currentFaction().armies.find((a) => a.id === state.armyId);

  /* ================================================================== *
   * Fraktionswahl
   * ================================================================== */
  function buildFactionSelect() {
    const sel = $('#factionSelect');
    sel.innerHTML = C.groups
      .map((g) => {
        const fs = W.factions.filter((f) => f.group === g.id);
        if (!fs.length) return '';
        return '<optgroup label="' + esc(g.label) + '">' +
          fs.map((f) => '<option value="' + esc(f.id) + '">' + esc(f.name) + '</option>').join('') +
          '</optgroup>';
      })
      .join('');
    sel.addEventListener('change', () => {
      const f = W.factionIndex[sel.value];
      go(f.id, f.armies[0].id);
    });
  }

  function buildFactionGrid() {
    const grid = $('#factionGrid');
    grid.innerHTML = C.groups
      .map((g) => {
        const fs = W.factions.filter((f) => f.group === g.id);
        if (!fs.length) return '';
        return '<div class="grid-group"><h3>' + esc(g.label) + '</h3><div class="tiles">' +
          fs.map((f) =>
            '<button class="tile" data-fid="' + esc(f.id) + '" style="--fc:' + f.colors.primary + ';--fc2:' + f.colors.accent + '">' +
              '<span class="tile-name">' + esc(f.name) + '</span>' +
              '<span class="tile-tag">' + esc(f.tagline || '') + '</span>' +
            '</button>'
          ).join('') +
          '</div></div>';
      })
      .join('');
    grid.addEventListener('click', (e) => {
      const t = e.target.closest('.tile');
      if (!t) return;
      const f = W.factionIndex[t.dataset.fid];
      toggleGrid(false);
      go(f.id, f.armies[0].id);
    });
  }

  function toggleGrid(force) {
    const grid = $('#factionGrid');
    const show = typeof force === 'boolean' ? force : grid.hidden;
    grid.hidden = !show;
    $('#btnGrid').setAttribute('aria-expanded', String(show));
    $$('.tile', grid).forEach((t) => t.classList.toggle('active', t.dataset.fid === state.factionId));
  }

  /* ================================================================== *
   * Haupt-Rendering
   * ================================================================== */
  function render() {
    const f = currentFaction();
    const a = currentArmy();
    const root = document.documentElement;
    root.style.setProperty('--fc', f.colors.primary);
    root.style.setProperty('--fc2', f.colors.accent);
    $('#factionSelect').value = f.id;
    document.title = (a ? a.name + ' · ' : '') + f.name + ' – Codex Armorum';

    renderFactionPanel(f, a);
    renderTabs(f);
    renderArmy(f, a);
  }

  function renderFactionPanel(f, a) {
    const links = U.factionLinks(f);
    const used = new Set((a ? a.detachments : []).map((d) => d.name));
    const groups = {};
    f.detachments.forEach((d) => { (groups[d.group || ''] = groups[d.group || ''] || []).push(d); });

    const detHtml = Object.keys(groups)
      .map((g) =>
        (g ? '<h5>' + esc(g) + '</h5>' : '') +
        '<ul class="det-list">' +
        groups[g]
          .sort((x, y) => y.dp - x.dp || x.name.localeCompare(y.name))
          .map((d) =>
            '<li class="' + (used.has(d.name) ? 'used' : '') + '"><span class="dp dp-' + d.dp + '">' + d.dp + ' DP</span>' + esc(d.name) + '</li>'
          ).join('') +
        '</ul>'
      )
      .join('');

    $('#factionPanel').innerHTML =
      '<div class="faction-head">' +
        '<div class="faction-mark" aria-hidden="true">' + esc(U.initials(f.name)) + '</div>' +
        '<div class="faction-title">' +
          '<span class="group-badge">' + esc(f.group) + '</span>' +
          '<h2>' + esc(f.name) + '</h2>' +
          '<p class="tagline">' + esc(f.tagline || '') + '</p>' +
        '</div>' +
        '<div class="faction-links">' +
          linkBtn(links.wahapedia, 'Regeln (Wahapedia)') +
          linkBtn(links.lexicanum, 'Hintergrund (Lexicanum)') +
          linkBtn(links.shop, 'GW-Shop') +
        '</div>' +
      '</div>' +
      '<p class="faction-desc">' + esc(f.description || '') + '</p>' +
      (f.playstyle ? '<p class="faction-play"><b>Spielgefühl:</b> ' + esc(f.playstyle) + '</p>' : '') +
      '<details class="detachments"><summary>Verfügbare Detachments (' + f.detachments.length + ') – ' +
        'max. ' + C.battleSizes[C.defaultBattleSize].dp + ' DP bei ' + C.battleSizes[C.defaultBattleSize].label + '</summary>' +
        (f.detachmentNote ? '<p class="muted">' + esc(f.detachmentNote) + '</p>' : '') +
        detHtml +
      '</details>';
  }

  function renderTabs(f) {
    $('#armyTabs').innerHTML = f.armies
      .map((a, i) => {
        const c = W.calc.army(f, a);
        return '<button class="army-tab ' + (a.id === state.armyId ? 'active' : '') + '" data-aid="' + esc(a.id) + '">' +
          '<span class="tab-num">' + romanize(i + 1) + '</span>' +
          '<span class="tab-body"><span class="tab-name">' + esc(a.name) + '</span>' +
          '<span class="tab-meta">' + esc(a.style.join(' · ')) + ' · ' + U.fmt(c.total) + ' Pkt.</span></span>' +
          '</button>';
      })
      .join('');
  }

  function renderArmy(f, a) {
    const panel = $('#armyPanel');
    if (!a) { panel.innerHTML = '<p class="empty">Für diese Fraktion sind noch keine Armeen hinterlegt.</p>'; return; }
    const c = W.calc.army(f, a);
    const pct = Math.min(100, (c.total / c.size.points) * 100);
    const over = c.total > c.size.points;

    panel.innerHTML =
      '<article class="army panel">' +
        '<header class="army-head">' +
          '<div>' +
            '<h2>' + esc(a.name) + '</h2>' +
            '<div class="chips">' +
              a.detachments.map((d) => '<span class="chip det"><span class="dp dp-' + d.dp + '">' + d.dp + ' DP</span>' + esc(d.name) + '</span>').join('') +
              a.style.map((s) => '<span class="chip">' + esc(s) + '</span>').join('') +
              '<span class="chip diff" title="Spielerische Schwierigkeit">Anspruch ' + stars(a.difficulty) + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="actions">' +
            '<button class="btn" data-act="text">⧉ Liste als Text</button>' +
            '<button class="btn" data-act="compare">⇄ Vergleichen</button>' +
            '<button class="btn" data-act="print">⎙ Drucken</button>' +
            '<button class="btn ghost" data-act="export" title="Punkte, Sammlung, Bilder und Notizen sichern">⤓ Export</button>' +
            '<button class="btn ghost" data-act="import">⤒ Import</button>' +
            (S.countLoadouts(f.id, a.id) ? '<button class="btn ghost warn" data-act="resetLoadout">↺ Ausrüstung zurücksetzen</button>' : '') +
            (S.countPointOverrides(f.id) ?'<button class="btn ghost warn" data-act="resetPoints">↺ Punkte zurücksetzen (' + S.countPointOverrides(f.id) + ')</button>' : '') +
          '</div>' +
        '</header>' +

        '<div class="stats">' +
          '<div class="stat wide ' + (over ? 'bad' : '') + '">' +
            '<span class="stat-label">Punkte (' + esc(c.size.label) + ')</span>' +
            '<span class="stat-value">' + U.fmt(c.total) + '<small> / ' + U.fmt(c.size.points) + '</small></span>' +
            '<div class="bar"><span style="width:' + pct.toFixed(1) + '%"></span></div>' +
            '<span class="stat-sub">' + (over ? U.fmt(-c.remaining) + ' zu viel' : U.fmt(c.remaining) + ' frei – z. B. für Verbesserungen (max. ' + c.size.enhancements + ')') + '</span>' +
          '</div>' +
          stat('Detachment-Punkte', c.dp + '<small> / ' + c.size.dp + '</small>', c.dp > c.size.dp) +
          stat('Einheiten', c.unitCount) +
          stat('Modelle', c.models) +
          stat('Ausrüstung', '+' + c.wargearPoints, false, 'Pkt. für Waffenoptionen') +
          stat('Ø Pkt./Modell', c.models ? Math.round(c.total / c.models) : 0) +
          stat('Sammlung', c.ownedUnits + '<small> / ' + c.unitCount + '</small>', false, c.coverage.ready ? '✔ spielbereit · ' + c.paintedUnits + ' bemalt' : c.coverage.pct + ' % · ' + c.paintedUnits + ' bemalt') +
        '</div>' +

        warningsBlock(c) +

        '<div class="army-grid">' +
          '<section class="card">' +
            '<h3>Strategie</h3>' +
            '<p>' + esc(a.summary || '') + '</p>' +
            (a.plan && a.plan.length ? '<h4>Spielplan</h4><ol class="plan">' + a.plan.map((p) => '<li>' + esc(p) + '</li>').join('') + '</ol>' : '') +
          '</section>' +
          '<section class="card">' +
            '<div class="sw">' +
              '<div><h4>Stärken</h4><ul class="pros">' + (a.strengths || []).map((s) => '<li>' + esc(s) + '</li>').join('') + '</ul></div>' +
              '<div><h4>Schwächen</h4><ul class="cons">' + (a.weaknesses || []).map((s) => '<li>' + esc(s) + '</li>').join('') + '</ul></div>' +
            '</div>' +
            '<h4>Punkteverteilung nach Rolle</h4>' + roleChart(c) +
          '</section>' +
        '</div>' +

        '<div class="filters" role="toolbar" aria-label="Rollenfilter">' + roleFilters(c) + '</div>' +
        unitTable(f, c) +
        leadersTransportCard(c) +
        basesCard(c) +

        '<section class="card notes">' +
          '<h4>Eigene Notizen zu dieser Armee</h4>' +
          '<textarea id="armyNote" rows="3" placeholder="z. B. Aufstellungsideen, Erfahrungen aus Spielen, Kaufliste …">' + esc(S.getNote(f.id, a.id)) + '</textarea>' +
        '</section>' +
      '</article>';

    bindArmy(f, a);
    flashHighlight();
    W.emit('armyRendered', { faction: f, army: a, calc: c, root: panel });
  }

  function stat(label, value, bad, sub) {
    return '<div class="stat ' + (bad ? 'bad' : '') + '"><span class="stat-label">' + esc(label) + '</span>' +
      '<span class="stat-value">' + value + '</span>' + (sub ? '<span class="stat-sub">' + esc(sub) + '</span>' : '') + '</div>';
  }

  function roleChart(c) {
    const roles = C.roles;
    const keys = Object.keys(c.byRole).sort((a, b) => roles[a].order - roles[b].order);
    const bar = keys
      .map((k) => {
        const p = (c.byRole[k].points / c.total) * 100;
        return '<span style="width:' + p.toFixed(2) + '%;background:' + roles[k].color + '" title="' + esc(roles[k].label) + ': ' + c.byRole[k].points + ' Pkt."></span>';
      })
      .join('');
    const legend = keys
      .map((k) =>
        '<li><i style="background:' + roles[k].color + '"></i>' + esc(roles[k].label) +
        ' <b>' + U.fmt(c.byRole[k].points) + '</b> <span class="muted">(' + Math.round((c.byRole[k].points / c.total) * 100) + ' %)</span></li>'
      )
      .join('');
    return '<div class="role-bar">' + bar + '</div><ul class="role-legend">' + legend + '</ul>';
  }

  function roleFilters(c) {
    const keys = Object.keys(c.byRole).sort((a, b) => C.roles[a].order - C.roles[b].order);
    if (state.role !== 'all' && !c.byRole[state.role]) state.role = 'all';
    return ['all'].concat(keys)
      .map((k) => {
        const label = k === 'all' ? 'Alle' : C.roles[k].label;
        const n = k === 'all' ? c.unitCount : c.byRole[k].units;
        return '<button class="fchip ' + (state.role === k ? 'active' : '') + '" data-role="' + k + '">' + esc(label) + ' <span>' + n + '</span></button>';
      })
      .join('');
  }

  // Profilwerte aus data/datasheets.js, z. B. "M 6" T 4 SV 3+ W 2 LD 6+ OC 2 | INV 4+"
  function statLine(f, r) {
    const s = U.sheetOf(f, r);
    if (!s || !s.stats) return '';
    const parts = s.stats.split(' | ');
    const inv = parts.filter((p) => /^INV /.test(p)).map((p) => p.replace('INV ', ''))[0];
    const fmt = (p) => p.replace(/\b(M|T|SV|W|LD|OC) (\S+)/g, (_, k, v) => '<i>' + ({ SV: 'Sv', LD: 'Ld' }[k] || k) + '</i>' + esc(v)).replace(/^([^:<]+): /, '<b>$1</b> ');
    return '<span class="stat-line" title="Profilwerte laut Datenblatt">' +
      parts.filter((p) => !/^INV /.test(p)).map(fmt).join('<br>') +
      (inv ? ' <i>Inv</i>' + esc(inv) : '') + '</span>';
  }

  // Fehler (rot) machen die Liste regelwidrig; Hinweise (gelb) sind Empfehlungen
  function warningsBlock(c) {
    const errors = c.warnings.filter((w) => w.level === 'error');
    const hints = c.warnings.filter((w) => w.level !== 'error');
    return '<div class="warnings' + (errors.length ? '' : ' ok') + '">' +
      (errors.length ? errors.map((w) => '<p class="error">⚠ ' + esc(w.text) + '</p>').join('')
        : '<p>✔ Liste regelkonform (Punkte, DP, Einheitenlimits, Warlord, Anführer)</p>') +
      hints.map((w) => '<p class="warn">ℹ ' + esc(w.text) + '</p>').join('') +
    '</div>';
  }

  // Anführer-Zuordnung und Einsteigeplan
  function leadersTransportCard(c) {
    const L = c.leaders.list;
    const T = c.transport;
    if (!L.length && !T.slots.length) return '';
    const icon = { ok: '✔', invalid: '✖', missing: '✖', none: '○', solo: '–' };
    const leaderHtml = L.length
      ? '<ul class="lt-list">' + L.map((l) => {
          let txt;
          if (l.status === 'ok') txt = 'führt <b>' + esc(l.target) + '</b>';
          else if (l.status === 'invalid') txt = '<b>' + esc(l.target) + '</b> ist nicht erlaubt';
          else if (l.status === 'missing') txt = '<b>' + esc(l.target) + '</b> fehlt in der Armee';
          else if (l.status === 'solo') txt = 'kann keine Einheit führen (allein unterwegs)';
          else txt = l.possible.length ? 'ohne Zuordnung – möglich: ' + esc(l.possible.join(', ')) : 'ohne Zuordnung – keine passende Einheit in der Armee';
          return '<li class="lt-' + l.status + '" title="Laut Datenblatt erlaubt: ' + esc(l.allowed.join(', ') || '–') + '">' +
            '<span class="lt-icon">' + icon[l.status] + '</span><span><b>' + esc(l.name) + '</b>' + (l.qty > 1 ? ' (' + l.qty + '×)' : '') + ' – ' + txt + '</span></li>';
        }).join('') + '</ul>'
      : '<p class="muted small">Keine Charaktere.</p>';
    const transportHtml = T.slots.length
      ? '<ul class="lt-list">' + T.slots.map((s) => {
          const pct = Math.min(100, Math.round((s.load / s.rule.capacity) * 100));
          const who = s.passengers.length ? s.passengers.map((p) => esc(p.names.join(' + ')) + ' <span class="muted">(' + p.space + ' Plätze)</span>').join(', ') : '<span class="muted">leer</span>';
          return '<li class="' + (s.dedicated && !s.passengers.length ? 'lt-invalid' : '') + '" title="' + esc(s.rule.text) + '">' +
            '<span class="lt-icon">🛡</span><span><b>' + esc(s.name) + (s.of > 1 ? ' #' + s.copy : '') + '</b> ' +
            '<span class="muted">' + s.load + '/' + s.rule.capacity + '</span>' +
            '<span class="lt-bar"><span style="width:' + pct + '%"></span></span>' + who + '</span></li>';
        }).join('') + '</ul>' +
        (T.walking.length ? '<p class="muted small">Passen in einen Transporter, laufen aber zu Fuß: ' + esc(T.walking.join(', ')) + '</p>' : '') +
        '<p class="muted small">Vorschlag nach Kapazität und Schlüsselwörtern laut Datenblatt (Regeltext beim Überfahren). ' +
        'Einheiten, die in der Aufgabe des Transporters genannt sind, werden bevorzugt.</p>'
      : '<p class="muted small">Keine Transporter.</p>';
    return '<div class="army-grid lt">' +
      '<section class="card"><h4>Anführer</h4>' + leaderHtml + '</section>' +
      '<section class="card"><h4>Einsteigeplan</h4>' + transportHtml + '</section>' +
    '</div>';
  }

  function basesCard(c) {
    const b = c.bases;
    const keys = Object.keys(b.sizes).sort((x, y) => parseFloat(x) - parseFloat(y));
    if (!keys.length && !b.mixed.length && !b.hulls) return '';
    return '<section class="card bases">' +
      '<h4>Basen-Bedarf dieser Armee</h4>' +
      '<div class="base-chips">' +
        keys.map((k) => '<span class="base-chip"><b>' + b.sizes[k] + '×</b> ' + esc(U.formatBase(k)) + '</span>').join('') +
        (b.hulls ? '<span class="base-chip muted"><b>' + b.hulls + '×</b> Fahrzeug ohne Base</span>' : '') +
      '</div>' +
      (b.mixed.length
        ? '<p class="muted small">Gemischte Einheiten (Basegröße je Modelltyp):</p><ul class="base-mixed">' +
          b.mixed.map((m) => '<li><b>' + esc(m.name) + '</b> (' + m.models + ' Modelle): ' + esc(U.formatBase(m.base)) + '</li>').join('') + '</ul>'
        : '') +
      '<p class="muted small">Quelle: Basegrößen laut Datenblatt (Wahapedia / offizielle GW-Angaben).</p>' +
    '</section>';
  }

  function unitTable(f, c) {
    let rows = c.rows.map((r) => {
      const b = U.baseOf(r, f);
      // Sortierwert: größte Zahl der Basegröße (Fahrzeuge ohne Base ganz oben)
      const nums = b ? (b.match(/\d+(?:\.\d+)?/g) || []).map(Number) : [];
      const lead = c.leaders.list.find((l) => l.idx === r.idx) || null;
      const needed = c.rows.filter((x) => x.name === r.name).reduce((s, x) => s + x.qty, 0);
      return Object.assign({}, r, { base: b, lead, needed, ownedQty: S.getOwnedQty(f.id, r), baseSort: b && /^Rumpf$/.test(b) ? 9999 : nums.length ? Math.max(...nums) : -1 });
    });
    if (state.role !== 'all') rows = rows.filter((r) => r.role === state.role);
    if (state.sortKey) {
      const k = state.sortKey;
      rows.sort((x, y) => {
        let vx = x[k], vy = y[k];
        if (k === 'role') { vx = C.roles[x.role].order; vy = C.roles[y.role].order; }
        if (typeof vx === 'string') return vx.localeCompare(vy) * state.sortDir;
        return (vx - vy) * state.sortDir;
      });
    }
    const th = (key, label, cls) => {
      const arrow = state.sortKey === key ? (state.sortDir > 0 ? ' ▲' : ' ▼') : '';
      return '<th class="' + (cls || '') + ' sortable" data-sort="' + key + '" tabindex="0">' + label + arrow + '</th>';
    };

    return '<div class="table-wrap"><table class="units">' +
      '<thead><tr>' +
        '<th class="c-img">Bild</th>' +
        th('name', 'Einheit', 'c-name') +
        th('role', 'Rolle', 'c-role') +
        th('modelTotal', 'Modelle', 'c-num') +
        th('baseSort', 'Base', 'c-base') +
        th('qty', 'Anz.', 'c-num') +
        th('ppu', 'Pkt./Einheit', 'c-pts') +
        th('total', 'Gesamt', 'c-num') +
        '<th class="c-task">Aufgabe in der Armee</th>' +
        '<th class="c-links">Infos</th>' +
        '<th class="c-own" title="Sammlung: Fehlt / Vorhanden / Bemalt">Sammlung</th>' +
      '</tr></thead><tbody>' +
      rows.map((r) => unitRow(f, r)).join('') +
      '</tbody>' +
      '<tfoot><tr><td colspan="3">Summe' + (state.role !== 'all' ? ' (Filter: ' + esc(C.roles[state.role].label) + ')' : '') + '</td>' +
        '<td class="c-num">' + rows.reduce((s, r) => s + r.modelTotal, 0) + '</td><td></td>' +
        '<td class="c-num">' + rows.reduce((s, r) => s + r.qty, 0) + '</td><td></td>' +
        '<td class="c-num"><b>' + U.fmt(rows.reduce((s, r) => s + r.total, 0)) + '</b></td><td colspan="3"></td></tr></tfoot>' +
      '</table></div>';
  }

  function unitRow(f, r) {
    const role = C.roles[r.role];
    const links = U.unitLinks(f, r);
    const img = U.unitImage(f, r);
    const own = C.collectionStates[r.owned];
    const thumb =
      '<button class="thumb' + (img ? ' has-img' : '') + '" data-act="img" style="--rc:' + role.color + '"' +
        (img ? ' data-large="' + esc(img.large) + '" data-caption="' + esc(img.source) + '"' : '') +
        ' title="' + (img ? '' : 'Kein Bild hinterlegt – ') + 'Klicken, um eine eigene Bild-URL zu hinterlegen">' +
        (img ? '<img src="' + esc(img.thumb) + '" alt="' + esc(r.name) + '" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.classList.remove(\'has-img\');this.remove()">' : '') +
        '<span class="ph"><b>' + esc(U.initials(r.name)) + '</b><small>' + esc(role.short) + '</small></span>' +
      '</button>';
    const wargear = r.loadout.length
      ? '<span class="wargear">' + r.loadout.map((w, wi) =>
          '<label class="wg' + (w.count ? ' on' : '') + '" title="' + esc(w.name) + ': +' + w.points + ' Pkt. pro Stück, max. ' + w.max + ' je Einheit' + (w.def ? ' (Standardausrüstung: ' + w.def + ')' : '') + '">' +
            '⚙ <input type="number" min="0" max="' + w.max + '" value="' + w.count + '" data-act="wg" data-wi="' + wi + '" aria-label="Anzahl ' + esc(w.name) + '">' +
            '<span>× ' + esc(w.name) + ' <em>+' + w.points + '</em></span>' +
          '</label>'
        ).join('') + (r.wargearPoints ? '<span class="wg-sum">Ausrüstung: +' + r.wargearPoints + ' Pkt.</span>' : '') + '</span>'
      : '';

    return '<tr data-idx="' + r.idx + '" data-name="' + esc(r.name) + '" class="' + (r.owned === 2 ? 'painted' : r.owned ? 'owned' : '') + '">' +
      '<td class="c-img">' + thumb + '</td>' +
      '<td class="c-name"><strong>' + esc(r.name) + '</strong>' +
        statLine(f, r) +
        (r.enhancement ? '<span class="enh">✦ ' + esc(r.enhancement.name) + ' (+' + r.enhancement.points + ')</span>' : '') +
        (r.lead && r.lead.target
          ? '<span class="leads lt-' + r.lead.status + '" title="Laut Datenblatt erlaubt: ' + esc(r.lead.allowed.join(', ') || '–') + '">↳ führt: ' + esc(r.leads) +
            (r.lead.status === 'ok' ? ' ✔' : r.lead.status === 'invalid' ? ' ✖ nicht erlaubt' : ' ✖ nicht in der Armee') + '</span>'
          : r.lead && r.lead.possible.length
            ? '<span class="leads" title="Laut Datenblatt erlaubt: ' + esc(r.lead.allowed.join(', ')) + '">↳ kann führen: ' + esc(r.lead.possible.join(', ')) + '</span>'
            : '') +
        wargear +
      '</td>' +
      '<td class="c-role" data-label="Rolle"><span class="role-badge" style="--rc:' + role.color + '">' + esc(role.label) + '</span></td>' +
      '<td class="c-num" data-label="Modelle">' + r.modelTotal + (r.qty > 1 ? '<small> (' + r.qty + '×' + r.models + ')</small>' : '') + '</td>' +
      '<td class="c-base" data-label="Base"' + (r.base && r.base.includes(';') ? ' title="Gemischte Einheit – Basegröße je Modelltyp"' : '') + '>' + esc(U.formatBase(r.base)).replace(/ · /g, '<br>') + '</td>' +
      '<td class="c-num" data-label="Anzahl">' + r.qty + '×</td>' +
      '<td class="c-pts" data-label="Pkt./Einheit">' +
        '<input type="number" min="0" step="5" value="' + r.ppu + '" data-act="pts" aria-label="Punkte pro Einheit ' + esc(r.name) + '" class="' + (r.overridden ? 'changed' : '') + '"' +
        ' title="' + (r.overridden ? 'Eigener Wert – Datensatz: ' + r.points : 'Punkte laut Wahapedia (Stand ' + C.pointsStand + ')') + '">' +
        (r.nextPrice != null
          ? '<small class="tier' + (r.tiered ? ' active' : '') + '" title="Gestaffelte Kosten der 11. Edition: ab der ' + (r.nextFrom || 2) + '. Einheit dieses Datenblatts gilt ein anderer Preis">ab ' + (r.nextFrom || 2) + '.: ' + r.nextPrice + (r.tiered ? ' (' + r.tiered + '×)' : '') + '</small>'
          : '') +
      '</td>' +
      '<td class="c-num total" data-label="Gesamt">' + U.fmt(r.total) + '</td>' +
      '<td class="c-task" data-label="Aufgabe">' + esc(r.task) + '</td>' +
      '<td class="c-links">' +
        '<a href="' + esc(links.wahapedia) + '" target="_blank" rel="noopener" title="Datenblatt auf Wahapedia">Datenblatt</a>' +
        '<a href="' + esc(links.shop) + '" target="_blank" rel="noopener" title="' + (links.shopIsProduct ? 'Bausatz im Games-Workshop-Shop: ' + esc(U.productOf(r).product) : 'Bei Games Workshop suchen') + '">Shop</a>' +
        '<a href="' + esc(links.lexicanum) + '" target="_blank" rel="noopener" title="Hintergrund im Lexicanum">Lore</a>' +
      '</td>' +
      '<td class="c-own"><button class="own own-' + r.owned + '" data-act="own" title="' + own.label + ' – klicken zum Wechseln">' + own.symbol + '<span>' + own.label + '</span></button>' +
        (r.owned
          ? '<label class="own-qty' + (r.ownedQty < r.needed ? ' short' : '') + '" title="Wie viele Einheiten „' + esc(r.name) + '“ besitzt du? Diese Armee braucht ' + r.needed + '.">' +
              '<input type="number" min="1" max="99" value="' + r.ownedQty + '" data-act="ownqty" aria-label="Anzahl besessen"> / ' + r.needed + '</label>'
          : '') +
      '</td>' +
      '</tr>';
  }

  /* ================================================================== *
   * Interaktion
   * ================================================================== */
  function bindArmy(f, a) {
    const panel = $('#armyPanel');

    panel.querySelectorAll('[data-act]').forEach((el) => {
      const act = el.dataset.act;
      if (act === 'pts') {
        el.addEventListener('change', () => {
          const row = el.closest('tr');
          const unit = a.units[+row.dataset.idx];
          const v = el.value === '' ? null : Math.max(0, Math.round(+el.value));
          S.setPoints(f.id, unit, v);
          renderTabs(f);
          renderArmy(f, a);
          toast(v == null || v === unit.points ? 'Punktewert zurückgesetzt' : unit.name + ': ' + v + ' Pkt. gespeichert');
        });
        return;
      }
      if (act === 'wg') {
        el.addEventListener('change', () => {
          const row = el.closest('tr');
          const unit = a.units[+row.dataset.idx];
          const w = unit.wargear[+el.dataset.wi];
          const cur = Object.assign({}, S.getLoadout(f.id, a.id, unit.idx) || unit.loadout || {});
          cur[w.name] = Math.max(0, Math.min(w.max, Math.round(+el.value || 0)));
          S.setLoadout(f.id, a.id, unit.idx, cur);
          renderTabs(f);
          renderArmy(f, a);
        });
        return;
      }
      if (act === 'ownqty') {
        el.addEventListener('change', () => {
          const unit = a.units[+el.closest('tr').dataset.idx];
          S.setOwnedQty(f.id, unit, Math.max(1, Math.round(+el.value || 1)));
          renderArmy(f, a);
        });
        return;
      }
      el.addEventListener('click', (e) => {
        const row = el.closest('tr');
        const unit = row ? a.units[+row.dataset.idx] : null;
        switch (act) {
          case 'own': {
            const prev = S.getOwned(f.id, unit);
            const next = (prev + 1) % C.collectionStates.length;
            S.setOwned(f.id, unit, next);
            // erstes Markieren: Anzahl = Bedarf dieser Armee (änderbar)
            if (!prev && next) {
              const needed = a.units.filter((u) => u.name === unit.name).reduce((s, u) => s + u.qty, 0);
              S.setOwnedQty(f.id, unit, Math.max(needed, 1));
            }
            renderArmy(f, a);
            break;
          }
          case 'img': {
            e.preventDefault();
            const cur = S.getImage(f.id, unit) || '';
            const url = window.prompt('Bild-URL für „' + unit.name + '“ (leer lassen zum Entfernen):', cur);
            if (url === null) return;
            const clean = url.trim();
            if (clean && !/^https?:\/\//i.test(clean) && !/^data:image\//i.test(clean)) { toast('Bitte eine http(s)-Adresse angeben'); return; }
            S.setImage(f.id, unit, clean);
            renderArmy(f, a);
            break;
          }
          case 'text': openText(f, a); break;
          case 'compare': openCompare(f, a); break;
          case 'print': window.print(); break;
          case 'export': exportData(); break;
          case 'import': $('#importFile').click(); break;
          case 'resetLoadout':
            if (window.confirm('Ausrüstung dieser Armee auf die Vorgabe zurücksetzen?')) {
              S.resetLoadouts(f.id, a.id);
              renderTabs(f);
              renderArmy(f, a);
            }
            break;
          case 'resetPoints':
            if (window.confirm('Alle eigenen Punktewerte für ' + f.name + ' zurücksetzen?')) {
              S.resetPoints(f.id);
              renderTabs(f);
              renderArmy(f, a);
            }
            break;
        }
      });
    });

    panel.querySelectorAll('th.sortable').forEach((th) => {
      const sort = () => {
        const k = th.dataset.sort;
        if (state.sortKey === k) {
          if (state.sortDir === -1) { state.sortKey = null; state.sortDir = 1; } else state.sortDir = -1;
        } else { state.sortKey = k; state.sortDir = 1; }
        renderArmy(f, a);
      };
      th.addEventListener('click', sort);
      th.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sort(); } });
    });

    panel.querySelectorAll('.fchip').forEach((b) =>
      b.addEventListener('click', () => { state.role = b.dataset.role; renderArmy(f, a); })
    );

    const note = $('#armyNote');
    let t;
    note.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => S.setNote(f.id, a.id, note.value.trim() ? note.value : ''), 400);
    });
  }

  /* Vergrößerte Bildvorschau beim Überfahren eines Vorschaubilds (ein gemeinsames, fixiertes Element,
     damit es nicht vom scrollbaren Tabellencontainer abgeschnitten wird). */
  function bindImagePreview() {
    const box = $('#imgPreview');
    const img = box.querySelector('img');
    const cap = box.querySelector('figcaption');
    const show = (thumb) => {
      if (!thumb.classList.contains('has-img') || !thumb.dataset.large) return;
      img.src = thumb.dataset.large;
      cap.textContent = thumb.dataset.caption || '';
      box.hidden = false;
      const r = thumb.getBoundingClientRect();
      const w = box.offsetWidth || 300, h = box.offsetHeight || 320;
      let left = r.right + 12;
      if (left + w > window.innerWidth - 8) left = Math.max(8, r.left - w - 12);
      const top = Math.min(Math.max(8, r.top + r.height / 2 - h / 2), window.innerHeight - h - 8);
      box.style.left = left + 'px';
      box.style.top = top + 'px';
    };
    const hide = () => { box.hidden = true; };
    document.addEventListener('mouseover', (e) => { const t = e.target.closest('.thumb'); if (t) show(t); });
    document.addEventListener('mouseout', (e) => { const t = e.target.closest('.thumb'); if (t && !t.contains(e.relatedTarget)) hide(); });
    document.addEventListener('focusin', (e) => { const t = e.target.closest('.thumb'); if (t) show(t); else hide(); });
    window.addEventListener('scroll', hide, { passive: true });
    img.addEventListener('load', () => { if (!box.hidden) { const r = box.getBoundingClientRect(); if (r.bottom > window.innerHeight - 8) box.style.top = Math.max(8, window.innerHeight - r.height - 8) + 'px'; } });
  }

  /* ================================================================== *
   * Sammlungsübersicht über alle Fraktionen
   * ================================================================== */
  function openCollection() {
    renderCollection();
    $('#dlgCollection').showModal();
  }

  function renderCollection() {
    const showAll = $('#colAll').checked;
    const entries = S.collectionEntries();
    const rowsHtml = [];
    let sumUnits = 0, sumModels = 0, sumPainted = 0;
    const ready = [], close = [];

    W.factions.forEach((f) => {
      const mine = entries.filter((e) => e.fid === f.id && e.state);
      if (!mine.length && !showAll) return;
      // Modellanzahl je Datenblatt aus den Armeen (größte vorkommende Truppgröße)
      const modelsOf = {};
      f.armies.forEach((a) => a.units.forEach((u) => { modelsOf[u.name] = Math.max(modelsOf[u.name] || 0, u.models); }));
      let units = 0, models = 0, painted = 0;
      mine.forEach((e) => {
        const n = S.getOwnedQty(f.id, { name: e.name });
        units += n;
        models += n * (modelsOf[e.name] || 1);
        if (e.state === 2) painted += n;
      });
      sumUnits += units; sumModels += models; sumPainted += painted;

      const armies = f.armies.map((a) => {
        const cov = W.calc.coverage(f, a);
        if (cov.ready) ready.push({ f, a });
        else if (cov.pct >= 50) close.push({ f, a, cov });
        const miss = cov.missing.map((m) => m.missing + '× ' + m.name).join(', ');
        return '<button type="button" class="cov-chip' + (cov.ready ? ' ready' : '') + '" data-fid="' + esc(f.id) + '" data-aid="' + esc(a.id) + '" title="' + esc(cov.ready ? 'Alle Einheiten vorhanden' : 'Fehlt: ' + miss) + '">' +
          '<span class="cov-name">' + esc(a.name) + '</span>' +
          '<span class="cov-bar"><span style="width:' + cov.pct + '%"></span></span>' +
          '<span class="cov-pct">' + (cov.ready ? '✔ spielbereit' : cov.pct + ' %') + '</span></button>';
      }).join('');

      rowsHtml.push('<tr style="--fc:' + f.colors.primary + ';--fc2:' + f.colors.accent + '">' +
        '<th><span class="col-dot"></span>' + esc(f.name) + '</th>' +
        '<td class="c-num">' + mine.length + '</td><td class="c-num">' + units + '</td><td class="c-num">' + models + '</td>' +
        '<td class="c-num">' + painted + (units ? ' <small>(' + Math.round((painted / units) * 100) + ' %)</small>' : '') + '</td>' +
        '<td class="cov-cell">' + armies + '</td></tr>');
    });

    const top = close.sort((x, y) => y.cov.pct - x.cov.pct).slice(0, 5);
    $('#collectionBody').innerHTML = entries.some((e) => e.state) || showAll
      ? '<div class="stats col-stats">' +
          stat('Einheiten', sumUnits) + stat('Modelle', sumModels) +
          stat('Bemalt', sumPainted, false, sumUnits ? Math.round((sumPainted / sumUnits) * 100) + ' %' : '') +
          stat('Spielbereite Armeen', ready.length) +
        '</div>' +
        (ready.length ? '<p><b>Spielbereit:</b> ' + ready.map((x) => esc(x.f.name + ' – ' + x.a.name)).join(' · ') + '</p>' : '') +
        (top.length ? '<p><b>Fast komplett:</b> ' + top.map((x) => esc(x.f.name + ' – ' + x.a.name) + ' <span class="muted">(' + x.cov.pct + ' %, fehlt: ' + esc(x.cov.missing.map((m) => m.missing + '× ' + m.name).join(', ')) + ')</span>').join('<br>') + '</p>' : '') +
        '<div class="table-wrap"><table class="compare col-table"><thead><tr><th>Fraktion</th><th>Datenblätter</th><th>Einheiten</th><th>Modelle</th><th>Bemalt</th><th>Beispielarmeen (Klick öffnet)</th></tr></thead>' +
        '<tbody>' + rowsHtml.join('') + '</tbody></table></div>' +
        '<p class="muted small">Gezählt wird je Fraktion und Datenblatt. Die Anzahl besessener Einheiten trägst du in der Spalte „Sammlung“ der Armee-Tabelle ein.</p>'
      : '<p class="empty">Noch keine Sammlung erfasst. Markiere in einer Armee-Tabelle in der Spalte „Sammlung“, welche Einheiten du besitzt – hier siehst du dann, welche Armeen du schon spielen kannst.</p>';
  }

  function bindGlobal() {
    bindImagePreview();
    $('#btnCollection').addEventListener('click', openCollection);
    $('#colAll').addEventListener('change', renderCollection);
    $('#collectionBody').addEventListener('click', (e) => {
      const chip = e.target.closest('.cov-chip');
      if (!chip) return;
      $('#dlgCollection').close();
      go(chip.dataset.fid, chip.dataset.aid);
    });
    $('#armyTabs').addEventListener('click', (e) => {
      const b = e.target.closest('.army-tab');
      if (b) go(state.factionId, b.dataset.aid);
    });
    $('#btnGrid').addEventListener('click', () => toggleGrid());
    $('#btnTheme').addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
    $('#btnHelp').addEventListener('click', () => $('#dlgHelp').showModal());
    $('#btnCopy').addEventListener('click', copyText);
    $('#importFile').addEventListener('change', importData);
    $('#cmpA').addEventListener('change', renderCompare);
    $('#cmpB').addEventListener('change', renderCompare);

    // Dialoge per Klick auf den Hintergrund schließen
    $$('dialog').forEach((d) => d.addEventListener('click', (e) => { if (e.target === d) d.close(); }));

    const input = $('#globalSearch');
    input.addEventListener('input', () => runSearch(input.value));
    input.addEventListener('keydown', (e) => {
      const items = $$('#searchResults .sr-item');
      if (e.key === 'ArrowDown' && items.length) { e.preventDefault(); items[0].focus(); }
      if (e.key === 'Enter' && items.length) { e.preventDefault(); items[0].click(); }
      if (e.key === 'Escape') closeSearch();
    });
    $('#searchResults').addEventListener('keydown', (e) => {
      const items = $$('#searchResults .sr-item');
      const i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); (items[i + 1] || items[0]).focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); i <= 0 ? input.focus() : items[i - 1].focus(); }
      if (e.key === 'Escape') { closeSearch(); input.focus(); }
    });
    $('#searchResults').addEventListener('click', (e) => {
      const it = e.target.closest('.sr-item');
      if (!it) return;
      closeSearch();
      input.value = '';
      go(it.dataset.fid, it.dataset.aid, it.dataset.unit || null);
    });
    document.addEventListener('click', (e) => { if (!e.target.closest('.search')) closeSearch(); });

    document.addEventListener('keydown', (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
      if (typing || e.ctrlKey || e.metaKey || e.altKey || document.querySelector('dialog[open]')) return;
      if (e.key === '/') { e.preventDefault(); input.focus(); }
      else if (e.key === '?') $('#dlgHelp').showModal();
      else if (e.key === 't' || e.key === 'T') $('#btnTheme').click();
      else if (e.key === 's' || e.key === 'S') openCollection();
      else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const f = currentFaction();
        const i = f.armies.findIndex((a) => a.id === state.armyId);
        const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + f.armies.length) % f.armies.length;
        go(f.id, f.armies[n].id);
      }
    });
  }

  function flashHighlight() {
    if (!state.highlight) return;
    const row = $$('#armyPanel tbody tr').find((tr) => tr.dataset.name === state.highlight);
    state.highlight = null;
    if (!row) return;
    row.classList.add('flash');
    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => row.classList.remove('flash'), 2400);
  }

  /* ================================================================== *
   * Suche
   * ================================================================== */
  let searchIndex = [];
  function buildSearchIndex() {
    searchIndex = [];
    W.factions.forEach((f) => {
      searchIndex.push({ type: 'faction', label: f.name, sub: f.group + ' · ' + (f.tagline || ''), fid: f.id, aid: f.armies[0].id, key: U.stripDiacritics(f.name + ' ' + (f.aliases || []).join(' ')).toLowerCase() });
      f.armies.forEach((a) => {
        searchIndex.push({ type: 'army', label: a.name, sub: f.name + ' · ' + a.style.join(', '), fid: f.id, aid: a.id, key: U.stripDiacritics(a.name + ' ' + a.detachments.map((d) => d.name).join(' ')).toLowerCase() });
        a.units.forEach((u) => {
          searchIndex.push({ type: 'unit', label: u.name, sub: f.name + ' · ' + a.name + ' · ' + C.roles[u.role].label, fid: f.id, aid: a.id, unit: u.name, key: U.stripDiacritics(u.name).toLowerCase() });
        });
      });
    });
  }

  function runSearch(q) {
    const box = $('#searchResults');
    const term = U.stripDiacritics(q.trim()).toLowerCase();
    if (term.length < 2) { closeSearch(); return; }
    const words = term.split(/\s+/);
    const hits = searchIndex.filter((e) => words.every((w) => e.key.includes(w))).slice(0, 40);
    const icon = { faction: '⚑', army: '⚔', unit: '◆' };
    box.innerHTML = hits.length
      ? hits.map((h) =>
          '<button class="sr-item" data-fid="' + esc(h.fid) + '" data-aid="' + esc(h.aid) + '"' + (h.unit ? ' data-unit="' + esc(h.unit) + '"' : '') + '>' +
            '<span class="sr-icon">' + icon[h.type] + '</span><span><b>' + esc(h.label) + '</b><small>' + esc(h.sub) + '</small></span></button>'
        ).join('')
      : '<p class="sr-empty">Keine Treffer</p>';
    box.hidden = false;
  }
  function closeSearch() { $('#searchResults').hidden = true; }

  /* ================================================================== *
   * Dialoge: Text, Vergleich, Export/Import
   * ================================================================== */
  function openText(f, a) {
    $('#listText').value = W.calc.listText(f, a);
    $('#dlgText').showModal();
  }

  function copyText() {
    const ta = $('#listText');
    const done = () => toast('Liste kopiert');
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(ta.value).then(done, () => { ta.select(); document.execCommand('copy'); done(); });
    } else {
      ta.select();
      document.execCommand('copy');
      done();
    }
  }

  function armyOptions(selected) {
    return W.factions
      .map((f) =>
        '<optgroup label="' + esc(f.name) + '">' +
        f.armies.map((a) => {
          const v = f.id + '/' + a.id;
          return '<option value="' + esc(v) + '"' + (v === selected ? ' selected' : '') + '>' + esc(a.name) + '</option>';
        }).join('') +
        '</optgroup>'
      )
      .join('');
  }

  function openCompare(f, a) {
    const cur = f.id + '/' + a.id;
    const other = f.armies.find((x) => x.id !== a.id);
    $('#cmpA').innerHTML = armyOptions(cur);
    $('#cmpB').innerHTML = armyOptions(other ? f.id + '/' + other.id : cur);
    renderCompare();
    $('#dlgCompare').showModal();
  }

  function renderCompare() {
    const pick = (v) => {
      const [fid, aid] = v.split('/');
      const f = W.factionIndex[fid];
      const a = f.armies.find((x) => x.id === aid);
      return { f, a, c: W.calc.army(f, a) };
    };
    const A = pick($('#cmpA').value);
    const B = pick($('#cmpB').value);
    const roles = Object.keys(C.roles)
      .filter((k) => A.c.byRole[k] || B.c.byRole[k])
      .sort((x, y) => C.roles[x].order - C.roles[y].order);
    const max = Math.max(1, ...roles.map((k) => Math.max((A.c.byRole[k] || {}).points || 0, (B.c.byRole[k] || {}).points || 0)));
    const bar = (v, color) => '<div class="cmp-bar"><span style="width:' + ((v / max) * 100).toFixed(1) + '%;background:' + color + '"></span><em>' + (v || '–') + '</em></div>';
    const row = (label, x, y) => '<tr><th>' + label + '</th><td>' + x + '</td><td>' + y + '</td></tr>';

    $('#compareBody').innerHTML =
      '<table class="compare">' +
        '<thead><tr><th></th><th>' + esc(A.f.name) + '<br><b>' + esc(A.a.name) + '</b></th><th>' + esc(B.f.name) + '<br><b>' + esc(B.a.name) + '</b></th></tr></thead><tbody>' +
        row('Detachments', esc(A.a.detachments.map((d) => d.name + ' (' + d.dp + ')').join(', ')), esc(B.a.detachments.map((d) => d.name + ' (' + d.dp + ')').join(', '))) +
        row('Stil', esc(A.a.style.join(', ')), esc(B.a.style.join(', '))) +
        row('Anspruch', stars(A.a.difficulty), stars(B.a.difficulty)) +
        row('Punkte', U.fmt(A.c.total), U.fmt(B.c.total)) +
        row('Einheiten', A.c.unitCount, B.c.unitCount) +
        row('Modelle', A.c.models, B.c.models) +
        row('Ø Pkt./Modell', Math.round(A.c.total / A.c.models), Math.round(B.c.total / B.c.models)) +
        roles.map((k) => row(esc(C.roles[k].label), bar((A.c.byRole[k] || {}).points || 0, C.roles[k].color), bar((B.c.byRole[k] || {}).points || 0, C.roles[k].color))).join('') +
      '</tbody></table>';
  }

  function exportData() {
    const payload = { app: C.appName, version: C.appVersion, exported: new Date().toISOString(), data: S.dump() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'codex-armorum-daten-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    toast('Export erstellt');
  }

  function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const data = parsed && parsed.data ? parsed.data : parsed;
        if (!data || typeof data !== 'object') throw new Error('Ungültiges Format');
        if (!window.confirm('Import ersetzt deine aktuellen Punkte, Sammlung, Bilder und Notizen. Fortfahren?')) return;
        S.replace(data);
        render();
        toast('Daten importiert');
      } catch (err) {
        toast('Import fehlgeschlagen: ' + err.message);
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  }

  /* ================================================================== *
   * Kleinkram
   * ================================================================== */
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    S.set('theme', t);
  }

  function linkBtn(href, label) {
    return '<a class="btn link" href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(label) + ' ↗</a>';
  }

  function stars(n) {
    const v = Math.max(0, Math.min(5, n || 0));
    return '<span class="stars" aria-label="' + v + ' von 5">' + '★'.repeat(v) + '<span>' + '★'.repeat(5 - v) + '</span></span>';
  }

  function romanize(n) {
    return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][n - 1] || String(n);
  }

  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  W.ui = { go, render, toast };
})();
