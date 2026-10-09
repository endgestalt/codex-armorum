/*
 * Codex Armorum – Konfiguration
 * Regelwerte, Rollen, Link-Vorlagen. Bei einem neuen Munitorum Field Manual oder
 * einer neuen Edition wird in der Regel nur diese Datei (und ggf. die Punkte) angepasst.
 */
window.WH40K = window.WH40K || {};

WH40K.config = {
  appName: 'Codex Armorum',
  appVersion: '1.0.0',
  edition: '11. Edition',
  dataStand: 'Oktober 2026',
  pointsStand: '08.10.2026',
  pointsNote:
    'Detachments, DP-Kosten und Einheitenpunkte wurden am 08.10.2026 mit Wahapedia (11. Edition, Munitorum Field Manual v1.4) abgeglichen. ' +
    'Gestaffelte Kosten (andere Punkte ab der 2./3./4. Einheit eines Datenblatts) werden automatisch berechnet. ' +
    'Kostenpflichtige Ausrüstung (z. B. „+5 pro Meltagun“) ist bei der jeweiligen Einheit wählbar und wird mitgerechnet. ' +
    'Bilder: offizielle Produktfotos aus dem Games-Workshop-Webshop (© Games Workshop), live geladen. ' +
    'Games Workshop passt Punkte regelmäßig an; abweichende Werte kannst du direkt in der Tabelle eintragen.',

  factionPath: 'data/factions/',

  // Kampfgrößen laut "Muster Armies" der 11. Edition
  battleSizes: {
    incursion: { label: 'Incursion', points: 1000, dp: 2, enhancements: 2, unitLimit: 2 },
    strike: { label: 'Strike Force', points: 2000, dp: 3, enhancements: 4, unitLimit: 3 }
  },
  defaultBattleSize: 'strike',

  groups: [
    { id: 'Imperium', label: 'Imperium der Menschheit' },
    { id: 'Chaos', label: 'Mächte des Chaos' },
    { id: 'Xenos', label: 'Xenos' }
  ],

  // order = Sortierung, doubleLimit = doppeltes Einheitenlimit (Battleline, Dedicated Transport)
  roles: {
    epic:    { label: 'Epischer Held',  short: 'EH', order: 0, color: '#d4a537' },
    char:    { label: 'Charakter',      short: 'CH', order: 1, color: '#c7782f' },
    line:    { label: 'Battleline',     short: 'BL', order: 2, color: '#6f9a4a', doubleLimit: true },
    inf:     { label: 'Infanterie',     short: 'IN', order: 3, color: '#4f86a8' },
    mounted: { label: 'Beritten / Bikes', short: 'BE', order: 4, color: '#3fa39a' },
    beast:   { label: 'Bestien / Schwärme', short: 'BS', order: 5, color: '#8b9a3a' },
    mon:     { label: 'Monster',        short: 'MO', order: 6, color: '#a2508f' },
    veh:     { label: 'Fahrzeug',       short: 'FZ', order: 7, color: '#9a4a4a' },
    trans:   { label: 'Transporter',    short: 'TR', order: 8, color: '#7d6a9e', doubleLimit: true },
    fly:     { label: 'Flieger',        short: 'FL', order: 9, color: '#5d7fc4' },
    fort:    { label: 'Befestigung',    short: 'BF', order: 10, color: '#8a7f6a' }
  },

  collectionStates: [
    { label: 'Fehlt', symbol: '○' },
    { label: 'Vorhanden', symbol: '◐' },
    { label: 'Bemalt', symbol: '●' }
  ],

  // Link-Vorlagen – zentral änderbar, falls sich URLs ändern
  links: {
    wahapediaUnit: 'https://wahapedia.ru/wh40k11ed/factions/{faction}/{slug}',
    wahapediaFaction: 'https://wahapedia.ru/wh40k11ed/factions/{faction}/',
    shopSearch: 'https://www.warhammer.com/de-DE/plp?search={q}',
    shopProduct: 'https://www.warhammer.com/de-DE/shop/{slug}',
    gwImage: 'https://www.warhammer.com{path}?fm=webp&w={w}&h={h}',
    lexicanumSearch: 'https://wh40k.lexicanum.com/wiki/Special:Search?search={q}',
    mfm: 'https://mfm.warhammer-community.com/',
    community: 'https://www.warhammer-community.com/de-de/',
    wahapediaHome: 'https://wahapedia.ru/wh40k11ed/the-rules/core-rules/'
  }
};
