/* Thousand Sons */
WH40K.registerFaction({
  id: 'thousand-sons',
  name: 'Thousand Sons',
  aliases: ['Tzeentch', 'Magnus', 'Rubricae', 'Prospero'],
  group: 'Chaos',
  wahapedia: 'thousand-sons',
  wahapediaConnectors: 'lower',
  colors: { primary: '#1d4f8f', accent: '#d9b44a' },
  tagline: 'Hexer-Legion des Tzeentch',
  description:
    'Magnus der Rote und seine Hexer-Legion. Die meisten Krieger sind seelenlose Rubricae in versiegelten Rüstungen, ' +
    'geführt von mächtigen Zauberern. Psi-Kräfte und Rituale prägen das Spiel.',
  playstyle: 'Psionik-lastig, solider Fernkampf, viele Charaktere (Sorcerer).',
  detachments: [
    ['Grand Coven', 3], ['Hexwarp Thrallband', 3], ['Rubricae Phalanx', 3],
    ['Changehost of Deceit', 2], ['Warpforged Cabal', 2], ['Warpmeld Pact', 2],
    ['Ritual of Regeneration', 1], ['Sekhetar Cohort', 1], ['Servants of Change', 1]
  ],
  armies: [
    {
      id: 'rubricae',
      name: 'Rubricae-Phalanx',
      detachments: [{ name: 'Rubricae Phalanx', dp: 3 }],
      style: ['Infanterie', 'Fernkampf', 'Zäh'],
      difficulty: 2,
      summary:
        'Rubric Marines und Scarab Occult Terminators unter Führung von Ahriman und Sorcerern bilden eine geschlossene, ' +
        'zähe Feuerlinie. Psi-Feuer durchschlägt Rüstungen, Tzaangors erledigen die Laufarbeit.',
      plan: [
        'Rubric Marines mit Sorcerern besetzen Mittelziele.',
        'Scarab Occult teleportieren in Runde 2 auf Schlüsselziele.',
        'Mutalith und Defiler unterstützen im Zentrum.',
        'Tzaangors erfüllen Nebenaufträge und schirmen ab.'
      ],
      strengths: ['Sehr robuste Infanterie', 'Psi-Waffen ignorieren viel Rüstung', 'Viele Charaktere'],
      weaknesses: ['Langsam', 'Begrenzter Nahkampf'],
      units: [
        { name: 'Ahriman', role: 'epic', models: 1, points: 100, leads: 'Rubric Marines', task: 'Warlord; Hexer-Meister' },
        { name: 'Exalted Sorcerer', role: 'char', models: 1, points: 95, leads: 'Rubric Marines', task: 'Psi-Anführer' },
        { name: 'Exalted Sorcerer on Disc of Tzeentch', role: 'char', models: 1, points: 90, task: 'Schneller Hexer' },
        { name: 'Infernal Master', role: 'char', models: 1, points: 100, task: 'Psi-Artillerie' },
        { name: 'Sorcerer in Terminator Armour', role: 'char', models: 1, points: 100, pointsNext: 110, nextFrom: 3, leads: 'Scarab Occult Terminators', task: 'Führt Terminatoren' },
        { name: 'Rubric Marines', role: 'line', models: 5, points: 100, qty: 3, pointsNext: 110, nextFrom: 4, task: 'Zäher Kern' },
        { name: 'Tzaangors', role: 'inf', models: 10, points: 75, task: 'Laufarbeit, Abschirmung' },
        { name: 'Scarab Occult Terminators', role: 'inf', models: 5, points: 180, qty: 2, pointsNext: 195, nextFrom: 3, task: 'Elite-Terminatoren' },
        { name: 'Mutalith Vortex Beast', role: 'mon', models: 1, points: 170, pointsNext: 190, nextFrom: 3, task: 'Monster mit Warp-Effekten' },
        { name: 'Thousand Sons Defiler', wahapedia: 'Defiler', role: 'veh', models: 1, points: 300, pointsNext: 350, nextFrom: 2, wargear: [['Hades lascannon', 15, 2, 0, 'Waffenplätze'], ['Heavy reaper autocannon', 15, 2, 0, 'Waffenplätze']], task: 'Dämonenmaschine' },
        { name: 'Thousand Sons Forgefiend', wahapedia: 'Forgefiend', role: 'veh', models: 1, points: 135, pointsNext: 145, nextFrom: 3, wargear: [['Ectoplasma cannon', 5, 3]], task: 'Feuerkraft' },
        { name: 'Thousand Sons Rhino', wahapedia: 'Chaos-Rhino', role: 'trans', models: 1, points: 80, qty: 2, pointsNext: 90, nextFrom: 4, task: 'Transport für Rubricae' }
      ]
    },
    {
      id: 'grand-coven',
      name: 'Großer Zirkel – Magnus',
      detachments: [{ name: 'Grand Coven', dp: 3 }],
      style: ['Primarch', 'Psi-Fokus', 'Monster'],
      difficulty: 4,
      summary:
        'Magnus der Rote selbst führt einen Zirkel aus Hexern und Dämonenprinzen an. Psi-Kräfte wüten über das Feld, ' +
        'während Rubricae und Tzaangors die Missionsziele halten.',
      plan: [
        'Magnus positioniert sich zentral und greift ab Runde 2 an.',
        'Hexer beschießen mit Psi-Kräften die Schlüsselziele.',
        'Rubricae im Rhino holen Mittelziele.',
        'Daemon Prince und Scarab Occult binden gegnerische Elite.'
      ],
      strengths: ['Magnus als riesige Bedrohung', 'Viel Psi-Schaden', 'Flexible Charaktere'],
      weaknesses: ['Teure Kernmodelle', 'Gefahren des Warp (Selbstschaden)'],
      units: [
        { name: 'Magnus the Red', role: 'epic', models: 1, points: 455, task: 'Warlord; Daemon Primarch' },
        { name: 'Daemon Prince of Tzeentch', role: 'char', models: 1, points: 170, task: 'Monster-Hexer' },
        { name: 'Exalted Sorcerer', role: 'char', models: 1, points: 95, leads: 'Rubric Marines', task: 'Psi-Anführer' },
        { name: 'Sorcerer', role: 'char', models: 1, points: 95, pointsNext: 105, nextFrom: 3, leads: 'Rubric Marines', task: 'Psi-Unterstützung' },
        { name: 'Tzaangor Shaman', role: 'char', models: 1, points: 65, leads: 'Tzaangors', task: 'Führt die Tzaangors' },
        { name: 'Rubric Marines', role: 'line', models: 5, points: 100, qty: 2, pointsNext: 110, nextFrom: 4, task: 'Missionsziele' },
        { name: 'Tzaangors', role: 'inf', models: 10, points: 75, qty: 2, task: 'Laufarbeit' },
        { name: 'Tzaangor Enlightened', role: 'mounted', models: 3, points: 50, task: 'Schnelle Jäger' },
        { name: 'Scarab Occult Terminators', role: 'inf', models: 5, points: 180, pointsNext: 195, nextFrom: 3, task: 'Elite-Teleport' },
        { name: 'Mutalith Vortex Beast', role: 'mon', models: 1, points: 170, pointsNext: 190, nextFrom: 3, task: 'Warp-Monster' },
        { name: 'Thousand Sons Forgefiend', wahapedia: 'Forgefiend', role: 'veh', models: 1, points: 135, pointsNext: 145, nextFrom: 3, wargear: [['Ectoplasma cannon', 5, 3]], task: 'Feuerkraft' },
        { name: 'Thousand Sons Chaos Spawn', wahapedia: 'Chaos-Spawn', role: 'beast', models: 2, points: 65, task: 'Störer' },
        { name: 'Thousand Sons Rhino', wahapedia: 'Chaos-Rhino', role: 'trans', models: 1, points: 80, qty: 2, pointsNext: 90, nextFrom: 4, task: 'Transport' }
      ]
    }
  ]
});
