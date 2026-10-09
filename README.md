# Codex Armorum – Warhammer 40k Armee-Kompendium

Lokale Web-App mit allen aktuellen Fraktionen der **11. Edition** und je zwei Beispielarmeen (Strike Force, 2.000 Punkte),
die unterschiedliche Strategien verfolgen.

**Start:** `index.html` per Doppelklick im Browser öffnen. Kein Server und keine Installation nötig.
Eine Internetverbindung braucht es nur für die Schriftarten und die externen Links.

## Funktionen

| Bereich | Was es tut |
|---|---|
| Fraktionswahl | Dropdown nach Imperium/Chaos/Xenos gruppiert, dazu eine Kachelübersicht („Alle Fraktionen“) |
| Armeen | Je Fraktion zwei Listen als Reiter: Detachments mit DP, Stil, Anspruch (★), Strategie, Spielplan, Stärken und Schwächen |
| Tabelle | Bild, Einheit, Rolle, Modelle, Anzahl, Punkte (editierbar), Summe, Aufgabe, Links (Wahapedia-Datenblatt, GW-Shop, Lexicanum), Sammlungsstatus |
| Prüfung | Punktelimit, DP-Budget, Verbesserungen, Einheitenlimit (3×, Battleline/Transporter 6×, Epische Helden 1×), Warlord, Anführer (erlaubte Leibwache laut Datenblatt, je Einheit ein Leader + ein Support, Support-Einheiten müssen zugeteilt sein) |
| Einsteigeplan | Verteilt Einheiten samt Anführern auf die Transporter – nach Kapazität, Schlüsselwörtern und Sonderregeln (Platzbedarf, Ausschlüsse, Zusatzplätze, Teilung). Warnt, wenn ein Dedicated Transport leer bliebe (wird in der 11. Edition zu Spielbeginn zerstört). |
| Basen | Basegröße je Einheit und Basen-Bedarf je Armee |
| Kennzahlen | Punkte mit Balken, DP, Einheiten, Modelle, Ø Punkte pro Modell, Sammlungsfortschritt |
| Rollenverteilung | Balken zeigt, wie viele Punkte in welche Rolle fließen; Filter-Chips über der Tabelle |
| Vergleich | Zwei beliebige Armeen (auch fraktionsübergreifend) nebeneinander |
| Suche | `/` – findet Einheiten, Armeen und Fraktionen und springt direkt zur Tabellenzeile |
| Sammlungsübersicht | „▣ Sammlung“ (Taste S): Einheiten, Modelle und Bemalfortschritt je Fraktion, welche Beispielarmeen spielbereit sind und was jeweils fehlt |
| Persönliche Daten | Eigene Punktewerte, Sammlung (Fehlt/Vorhanden/Bemalt + Anzahl), eigene Bild-URLs, Notizen je Armee – im Browser gespeichert, als JSON exportier- und importierbar |
| Ausgabe | Liste als Text kopieren, Druckansicht |
| Komfort | Deep-Links (`index.html#orks/war-horde`), Hell/Dunkel-Schema (`T`), Pfeiltasten wechseln Armeen, Mobilansicht |

## Datenstand und Genauigkeit

- **Detachments und DP-Kosten** stammen aus den aktuellen Faction Packs (Wahapedia, Stand Oktober 2026).
- **Kampfgrößen-Regeln** (2.000 Punkte, 3 DP, 4 Verbesserungen, Einheitenlimit 3) folgen den „Muster Armies“-Regeln der 11. Edition.
- **Einheitenpunkte und Einheitengrößen** wurden am 08.10.2026 vollständig mit den Wahapedia-Datenblättern abgeglichen
  (Munitorum Field Manual v1.4). Alle 56 Armeen liegen zwischen 1.950 und 2.000 Punkten.
- **Gestaffelte Kosten:** In der 11. Edition kosten manche Datenblätter ab der 2., 3. oder 4. Einheit einen anderen Preis.
  Das steht in den Daten als `pointsNext` und `nextFrom` und wird automatisch eingerechnet (Hinweis „ab 3.: …“ in der Tabelle).
- **Ausrüstungskosten** (z. B. „+5 pro Meltagun“) sind je Einheit hinterlegt und in der Tabelle wählbar. Kostenpflichtige
  Standardwaffen (z. B. 3 Dark Lances am Ravager) zählen automatisch mit. Ordensabhängige Preise (Blood Angels, Dark Angels,
  Space Wolves, Deathwatch, Black Templars) sind berücksichtigt.
- **Bilder:** Offizielle Produktfotos aus dem Games-Workshop-Webshop (© Games Workshop). Sie werden live geladen, also nur mit
  Internetverbindung. Die Zuordnung steht in `data/images.js` (Einheitenname → Bild, Produktseite, Bausatzname). Der Link
  „Shop“ führt bei zugeordneten Einheiten direkt zum Bausatz. Fehlt ein Bild oder ist es falsch, korrigierst du es dort oder
  per Klick aufs Bild in der App.
- **Imperial Agents** sind mit den Kosten im eigenen Agents-Detachment hinterlegt. Als zugeteilte Agenten in anderen Armeen
  kosten sie teils mehr (z. B. Eversor 100 → 110).
- Games Workshop passt Punkte regelmäßig an. Abweichungen trägst du direkt in der Tabelle ein; dauerhaft änderst du
  `points` in der Fraktionsdatei.
- **Eigene Bilder:** Ein Klick auf ein Bild oder einen Platzhalter hinterlegt eine eigene Bild-URL (z. B. ein Foto deiner
  bemalten Figuren). Dauerhaft geht das über `image` im Datensatz.

## Projektstruktur

```
index.html                 Seitengerüst
assets/css/theme.css       Gothic-Theme (Farb-Tokens, hell/dunkel, mobil, Druck)
assets/js/core.js          Kern: Registry, Berechnung, Validierung, Speicher, Hooks – ohne Oberfläche
assets/js/app.js           Oberfläche: Rendering, Interaktion, Dialoge
data/config.js             Edition, Kampfgrößen, Rollen, Link-Vorlagen
data/manifest.js           Liste der Fraktionsdateien (bestimmt die Reihenfolge)
data/images.js             Produktfotos je Einheitenname (GW-Webshop)
data/datasheets.js         Datenblatt-Infos je Fraktion|Einheit: Base, Schlüsselwörter, Anführer-Ziele, Transportregel
data/factions/<id>.js      Eine Datei pro Fraktion
```

## Erweitern

### Neue Armee zu einer Fraktion hinzufügen

Ein weiteres Objekt in `armies` der Fraktionsdatei eintragen. Ab der dritten Armee erscheinen automatisch weitere Reiter.

```js
{
  id: 'meine-liste',                       // eindeutig innerhalb der Fraktion, landet in der URL
  name: 'Meine Liste',
  battleSize: 'strike',                    // optional: 'incursion' (1.000 Pkt.) oder 'strike' (Standard)
  detachments: [{ name: 'Gladius Strike Force', dp: 3 }],
  style: ['Allround'],                     // Schlagworte
  difficulty: 2,                           // 1–5
  summary: 'Kurzbeschreibung der Strategie',
  plan: ['Schritt 1', 'Schritt 2'],
  strengths: ['…'],
  weaknesses: ['…'],
  units: [
    { name: 'Intercessor Squad', role: 'line', models: 10, points: 150, qty: 1, task: 'Hält Missionsziele' }
  ]
}
```

### Felder einer Einheit

| Feld | Pflicht | Bedeutung |
|---|---|---|
| `name` | ja | Offizieller englischer Datenblattname; daraus werden die Links gebildet |
| `role` | ja | `epic`, `char`, `line`, `inf`, `mounted`, `beast`, `mon`, `veh`, `trans`, `fly`, `fort` (siehe `config.js`) |
| `models` | ja | Modelle pro Einheit |
| `points` | ja | Punkte pro Einheit (für die ersten Einheiten dieses Datenblatts) |
| `pointsNext` | nein | Punkte ab der `nextFrom`-ten Einheit dieses Datenblatts (gestaffelte Kosten) |
| `nextFrom` | nein | Ab der wievielten Einheit `pointsNext` gilt (2, 3 oder 4) |
| `qty` | nein | Anzahl identischer Einheiten (Standard 1) |
| `wargear` | nein | Kostenpflichtige Ausrüstung: `[Name, Punkte je Stück, Höchstzahl je Einheit, Standardanzahl, Gruppe]`. Optionen derselben Gruppe teilen sich die Höchstzahl. |
| `loadout` | nein | Vorgabe der Ausrüstung in dieser Liste, z. B. `{ 'Psycannon': 2 }`. In der App änderbar, die Änderung wird lokal gespeichert. |
| `task` | nein | Aufgabe in der Armee |
| `leads` | nein | Leibwache, der der Charakter zugeteilt ist (als Leader oder Support). Wird gegen das Datenblatt geprüft; Support-Einheiten müssen zugeteilt sein. Ohne Angabe läuft ein Leader eigenständig. |
| `enhancement` | nein | `{ name: '…', points: 20 }`, wird zur Einheit addiert und gezählt |
| `wahapedia` | nein | Eigener Wahapedia-Slug, falls der automatisch gebildete Link nicht passt |
| `image` | nein | Bild-URL für die Tabelle |
| `searchName` | nein | Abweichender Suchbegriff für Shop und Lexicanum |

### Neue Fraktion

1. `data/factions/<id>.js` anlegen, am einfachsten als Kopie einer bestehenden Datei.
2. Die `id` in `data/manifest.js` eintragen.
3. `wahapedia` = Fraktions-Slug aus der Wahapedia-URL. Bei Codizes, die Verbindungswörter kleinschreiben
   (`Lord-of-Contagion`), zusätzlich `wahapediaConnectors: 'lower'` setzen.

### Neue Edition oder geänderte Regeln

Kampfgrößen, Limits, Rollen und Link-Vorlagen stehen zentral in `data/config.js`.
Für eine neue Wahapedia-Edition reicht es, `links.wahapediaUnit` und `links.wahapediaFaction` anzupassen.

### Eigene Module (Plugins)

`core.js` bietet Hooks, damit neue Funktionen ohne Änderungen an `app.js` andocken können. Beispiel für eine neue
Datei `assets/js/plugins/wuerfel.js`, eingebunden in `index.html` nach `app.js`:

```js
WH40K.registerPlugin({
  init(W) {
    W.on('armyRendered', ({ faction, army, calc, root }) => {
      const box = document.createElement('section');
      box.className = 'card';
      box.innerHTML = '<h4>Mein Modul</h4><p>' + calc.models + ' Modelle in dieser Armee.</p>';
      root.querySelector('.army').appendChild(box);
    });
  }
});
```

Verfügbare Ereignisse: `ready` (alle Daten geladen) und `armyRendered` (nach jedem Neuaufbau einer Armee).
Nützliche APIs: `WH40K.calc.army(f, a)`, `WH40K.calc.listText(f, a)`, `WH40K.store`, `WH40K.ui.go(fid, aid)`.

## Pflege-Werkzeuge (`tools/`)

PowerShell-Skripte, um Punkte und Bilder aktuell zu halten, z. B. nach einem neuen Munitorum Field Manual.
Ausführen im Projektordner (Windows PowerShell 5.1 oder PowerShell 7):

```powershell
.\tools\1-check-points.ps1 -Refresh     # Wahapedia neu laden und abgleichen (ändert nichts)
.\tools\2-update-points.ps1 -DryRun     # zeigt, was sich ändern würde
.\tools\2-update-points.ps1             # Punkte, gestaffelte Kosten und Ausrüstung übernehmen
.\tools\4-check-detachments.ps1        # Detachments + DP prüfen (-Apply übernimmt)
.\tools\3-update-images.ps1             # data/images.js neu erzeugen (GW-Produktfotos)
.\tools\serve.ps1                       # optional: App unter http://localhost:8765 starten
```

Danach `tools\validate.html` öffnen (Doppelklick): prüft alle Beispielarmeen auf Punkte (1.950–2.000), Regelfehler,
Hinweise und Datenlücken – ohne persönliche Punkte/Ausrüstung aus dem Browser.

**Claude-Skill:** Unter `.claude/skills/wh40k-daten-aktualisieren/` liegt ein Skill für Claude Code, der den gesamten
Ablauf beschreibt – inkl. der Regeln der 11. Edition, wie die App sie rechnet, und wie man Armeen nach einem Update
wieder ausgleicht. In einer Claude-Code-Sitzung im Projektordner genügt z. B. „Es gibt ein neues Munitorum Field
Manual, bitte Daten aktualisieren.“

Falls PowerShell die Ausführung blockiert, einmalig für die aktuelle Sitzung:
`Set-ExecutionPolicy -Scope Process Bypass`

| Skript | Aufgabe |
|---|---|
| `1-check-points.ps1` | Findet zu jeder Einheit das Wahapedia-Datenblatt, liest Punkte, gestaffelte Kosten, Ausrüstungskosten, Profilwerte, Basen, Schlüsselwörter, Leader/Support-Ziele und Transportregeln (bei Space-Marines-Orden mit Orden-Filter) und listet Abweichungen. Seiten werden im Temp-Ordner zwischengespeichert (`%TEMP%\codex-armorum-cache`); `-Refresh` lädt sie neu. |
| `2-update-points.ps1` | Erzeugt `data/datasheets.js` (Base, Schlüsselwörter, Anführer-Ziele, Transportregeln) neu und überträgt die Werte aus dem Bericht in `data/factions/*.js`. Ändert nur `points`, `pointsNext`/`nextFrom` und `wargear`, nicht Modellanzahl, `qty`, `loadout` oder Texte. Höchstzahlen der Ausrüstung stehen in der Tabelle `$WgRules` im Skript; neue Optionen ohne Regel werden gemeldet. |
| `3-update-images.ps1` | Sucht für jede Einheit den passenden Bausatz im GW-Webshop. Abweichende Bausatznamen stehen in `$SearchTerms`, bekannte Fehltreffer in `$Exclude`. Korrekturen bitte dort eintragen, nicht direkt in `images.js`. |
| `4-check-detachments.ps1` | Vergleicht die Detachments jeder Fraktion (Name, DP, bei Orden abweichende DP) mit Wahapedia, prüft die Armeen auf unbekannte Detachments und DP-Budget. `-Apply` übernimmt Listen und DP; umbenannte Detachments in Armeen werden mit Vorschlag gemeldet. |
| `validate.html` | Prüfseite für alle Armeen (Punkte, Fehler, Hinweise, Datenlücken). |
| `serve.ps1` | Kleiner lokaler Webserver, optional. |
| `lib/common.ps1` | Gemeinsame Funktionen (Parser für Kosten, Profilwerte, Basen, Leader/Support, Transport, Detachments; Cache). |

**Typischer Ablauf bei neuen Punkten:** `1-check-points.ps1 -Refresh` → `4-check-detachments.ps1` (ggf. `-Apply`) →
`2-update-points.ps1 -DryRun` → `2-update-points.ps1` → `validate.html` → Armeen ausgleichen, bis alles grün ist.

**Von Hand zu prüfen** meldet das Prüfskript Einheiten, deren Kostentabelle es nicht lesen kann (derzeit nur der
Crusader Squad mit gemischter Zeile „1 Sword Brother, 4 Neophytes, 5 Initiates = 150“), sowie Einheiten, deren
Modellanzahl nicht mehr gültig ist.

### Ideen für später

- Eigener Listenbaukasten (Einheiten hinzufügen und entfernen, eigene Armeen speichern)
- Verbesserungen (Enhancements) je Detachment mit Punkten hinterlegen
- Missionen und Nebenaufträge, Würfelrechner, Spielprotokoll
- Kampfgröße Incursion (1.000 Punkte) als zusätzliche Listen

---
Inoffizielles Fan-Werkzeug. Warhammer 40,000 und alle zugehörigen Namen sind Marken von Games Workshop Ltd.
