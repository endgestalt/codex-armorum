/* Death Guard */
WH40K.registerFaction({
  id: 'death-guard',
  name: 'Death Guard',
  aliases: ['Nurgle', 'Mortarion', 'Plague Marines', 'Seuchenmarines'],
  group: 'Chaos',
  wahapedia: 'death-guard',
  wahapediaConnectors: 'lower',
  colors: { primary: '#5f6e2a', accent: '#c9b26a' },
  tagline: 'Die Seuchenlegion Nurgles – unaufhaltsam und zäh',
  description:
    'Mortarions Legion wurde vom Seuchengott Nurgle verändert: aufgedunsene, nahezu unverwundbare Krieger, ' +
    'die mit Seuchenwaffen und Krankheitsauren langsam aber unaufhaltsam vorrücken.',
  playstyle: 'Sehr zäh, mittlere Distanz, Auren schwächen den Gegner. Langsam aber stetig.',
  detachments: [
    ['Virulent Vectorium', 3], ['Champions of Contagion', 2], ["Death Lord's Chosen", 2],
    ["Mortarion's Hammer", 2], ['Shamblerot Vectorium', 2], ['Tallyband Summoners', 2],
    ['Contagion Engines', 1], ['Flyblown Host', 1], ['Paragons of Putrescence', 1]
  ],
  armies: [
    {
      id: 'plague-engines',
      name: 'Seuchenpanzer-Kolonne',
      detachments: [{ name: "Mortarion's Hammer", dp: 2 }, { name: 'Contagion Engines', dp: 1 }],
      style: ['Fahrzeuge', 'Fernkampf', 'Zermürbung'],
      difficulty: 2,
      summary:
        'Drei Plagueburst Crawler beschießen den Gegner ohne Sichtlinie, Bloat-Drones und Blight-Hauler schwärmen aus, ' +
        'während Plague Marines und Terminatoren das Zentrum verseuchen.',
      plan: [
        'Plagueburst Crawler beschießen von hinten die gefährlichsten Ziele.',
        'Bloat-Drones und Blight-Hauler stören an den Flanken.',
        'Plague Marines halten Mittelziele, Poxwalker die Heimziele.',
        'Blightlords kontern im Zentrum.'
      ],
      strengths: ['Sehr robuste Fahrzeuge', 'Indirekter Beschuss', 'Einfach zu spielen'],
      weaknesses: ['Langsam', 'Begrenzte Nahkampfwucht'],
      units: [
        { name: 'Lord of Virulence', role: 'char', models: 1, points: 100, task: 'Warlord; Seuchen-Buff' },
        { name: 'Lord of Contagion', role: 'char', models: 1, points: 120, leads: 'Blightlord Terminators', task: 'Führt Terminatoren' },
        { name: 'Biologus Putrifier', role: 'char', models: 1, points: 60, task: 'Granaten-Buff' },
        { name: 'Daemon Prince of Nurgle with Wings', role: 'char', models: 1, points: 170, task: 'Fliegendes Monster' },
        { name: 'Plague Marines', role: 'line', models: 5, points: 90, qty: 3, task: 'Zäher Kern' },
        { name: 'Poxwalkers', role: 'line', models: 10, points: 65, qty: 2, task: 'Günstige Heimziel-Halter' },
        { name: 'Blightlord Terminators', role: 'inf', models: 5, points: 180, task: 'Elite-Terminatoren' },
        { name: 'Plagueburst Crawler', role: 'veh', models: 1, points: 170, qty: 3, pointsNext: 200, nextFrom: 2, task: 'Artillerie-Panzer' },
        { name: 'Foetid Bloat-drone', role: 'veh', models: 1, points: 100, qty: 2, pointsNext: 110, nextFrom: 3, task: 'Schnelle Störer' },
        { name: 'Myphitic Blight-hauler', role: 'veh', models: 1, points: 95, task: 'Panzerjäger' },
        { name: 'Death Guard Rhino', wahapedia: 'Chaos-Rhino', role: 'trans', models: 1, points: 75, pointsNext: 85, nextFrom: 4, task: 'Transport für Plague Marines' }
      ]
    },
    {
      id: 'mortarion',
      name: 'Mortarions Auserwählte',
      detachments: [{ name: "Death Lord's Chosen", dp: 2 }, { name: 'Paragons of Putrescence', dp: 1 }],
      style: ['Primarch', 'Terminatoren', 'Nahkampf'],
      difficulty: 3,
      summary:
        'Daemon Primarch Mortarion schwebt über das Schlachtfeld, Typhus und Terminator-Trupps folgen ihm. ' +
        'Eine Armee aus wenigen, extrem harten Einheiten, die das Zentrum erobert und nicht mehr hergibt.',
      plan: [
        'Poxwalker und Plague Marines besetzen Missionsziele.',
        'Mortarion greift ab Runde 2 das wichtigste Ziel an.',
        'Deathshroud und Blightlords mit Charakteren rücken im Zentrum vor.',
        'Plagueburst Crawler und Bloat-drone sichern Feuerunterstützung.'
      ],
      strengths: ['Mortarion als Riesenbedrohung', 'Extrem zähe Terminatoren', 'Starke Charaktere'],
      weaknesses: ['Teuer – wenige Einheiten', 'Abhängig von Mortarion'],
      units: [
        { name: 'Mortarion', role: 'epic', models: 1, points: 375, task: 'Warlord; Daemon Primarch' },
        { name: 'Typhus', role: 'epic', models: 1, points: 100, leads: 'Poxwalkers', task: 'Herold der Seuchen' },
        { name: 'Lord of Contagion', role: 'char', models: 1, points: 120, leads: 'Blightlord Terminators', task: 'Terminator-Anführer' },
        { name: 'Biologus Putrifier', role: 'char', models: 1, points: 60, task: 'Unterstützung' },
        { name: 'Plague Marines', role: 'line', models: 10, points: 180, task: 'Großer Kernblock' },
        { name: 'Poxwalkers', role: 'line', models: 20, points: 130, task: 'Horde mit Typhus' },
        { name: 'Blightlord Terminators', role: 'inf', models: 5, points: 180, qty: 2, task: 'Elite-Terminatoren' },
        { name: 'Deathshroud Terminators', role: 'inf', models: 3, points: 160, qty: 2, pointsNext: 170, nextFrom: 3, task: 'Nahkampf-Elite' },
        { name: 'Plagueburst Crawler', role: 'veh', models: 1, points: 170, pointsNext: 200, nextFrom: 2, task: 'Artillerie' },
        { name: 'Foetid Bloat-drone', role: 'veh', models: 1, points: 100, pointsNext: 110, nextFrom: 3, task: 'Störer' },
        { name: 'Death Guard Rhino', wahapedia: 'Chaos-Rhino', role: 'trans', models: 1, points: 75, pointsNext: 85, nextFrom: 4, task: 'Transport' }
      ]
    }
  ]
});
