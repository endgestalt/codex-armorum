/* Adepta Sororitas */
WH40K.registerFaction({
  id: 'adepta-sororitas',
  name: 'Adepta Sororitas',
  aliases: ['Sisters of Battle', 'Schwestern des Kampfes', 'Ecclesiarchie'],
  group: 'Imperium',
  wahapedia: 'adepta-sororitas',
  colors: { primary: '#7d0f15', accent: '#efe6d2' },
  tagline: 'Schwestern des Kampfes – Glaube, Flamme und Bolter',
  description:
    'Die kämpfenden Orden der Ecclesiarchie. Mit Flammenwerfern, Meltas und unerschütterlichem Glauben stellen sie sich ' +
    'jedem Feind. Glaubenspunkte (Miracle Dice) erlauben es, Würfelergebnisse gezielt festzulegen.',
  playstyle: 'Mittlere Distanz, Melta und Flammen, Wunderwürfel für Schlüsselmomente.',
  detachments: [
    ['Hallowed Martyrs', 3], ['Army of Faith', 2], ['Bringers of Flame', 2],
    ['Champions of Faith', 2], ['Penitent Host', 2], ['Chorus of Condemnation', 1],
    ['Sacred Champions', 1], ['Sanctified Orators', 1]
  ],
  armies: [
    {
      id: 'martyrs',
      name: 'Märtyrer-Linie',
      detachments: [{ name: 'Hallowed Martyrs', dp: 3 }],
      style: ['Allround', 'Infanterie & Panzer', 'Zermürbung'],
      difficulty: 2,
      summary:
        'Solide Battle Sister Squads in Immolatoren, gestützt von Exorcist, Castigator und Paragons. Die Schwestern werden ' +
        'stärker, je mehr sie unter Druck geraten – ideal für ein Abnutzungsgefecht um die Missionsziele.',
      plan: [
        'Battle Sisters besetzen Missionsziele, Immolatoren bringen Dominions nach vorne.',
        'Exorcist und Castigator beschießen Fahrzeuge und Infanterie.',
        'Morvenn Vahl und Paragons kontern im Zentrum.',
        'Arco-Flagellanten werfen sich auf gegnerische Nahkämpfer.'
      ],
      strengths: ['Gute Mischung aus Fern- und Nahkampf', 'Wunderwürfel für sichere Schlüsselwürfe', 'Viele Modelle auf dem Tisch'],
      weaknesses: ['Infanterie mit nur 3+ Rüstung', 'Teure Panzer'],
      units: [
        { name: 'Morvenn Vahl', role: 'epic', models: 1, points: 200, leads: '', task: 'Warlord; Äbtissin im Paragon-Anzug' },
        { name: 'Canoness', role: 'char', models: 1, points: 60, qty: 2, leads: 'Battle Sisters Squad', task: 'Führt Battle Sisters' },
        { name: 'Hospitaller', role: 'char', models: 1, points: 65, pointsNext: 75, nextFrom: 2, leads: 'Battle Sisters Squad', task: 'Unterstützt einen Battle-Sisters-Trupp, heilt' },
        { name: 'Dialogus', role: 'char', models: 1, points: 40, leads: 'Battle Sisters Squad', task: 'Unterstützung, Nebenaufträge' },
        { name: 'Battle Sisters Squad', role: 'line', models: 10, points: 100, qty: 3, task: 'Rückgrat, hält Missionsziele' },
        { name: 'Dominion Squad', role: 'inf', models: 10, points: 90, pointsNext: 100, nextFrom: 3, wargear: [['Meltagun', 5, 4]], task: 'Melta-Sturmtrupp im Immolator' },
        { name: 'Retributor Squad', role: 'inf', models: 5, points: 105, pointsNext: 115, nextFrom: 3, wargear: [['Multi-melta', 5, 4]], task: 'Schwere Waffen' },
        { name: 'Seraphim Squad', role: 'inf', models: 5, points: 75, pointsNext: 85, nextFrom: 3, task: 'Schnelle Sprungtruppen' },
        { name: 'Arco-flagellants', role: 'inf', models: 10, points: 140, qty: 2, task: 'Selbstmörderische Nahkämpfer' },
        { name: 'Paragon Warsuits', role: 'veh', models: 3, points: 180, pointsNext: 190, nextFrom: 3, wargear: [['Multi-melta', 10, 3]], task: 'Gepanzerte Elite-Läufer' },
        { name: 'Exorcist', role: 'veh', models: 1, points: 180, pointsNext: 220, nextFrom: 2, task: 'Raketenorgel gegen Fahrzeuge' },
        { name: 'Castigator', role: 'veh', models: 1, points: 165, pointsNext: 175, nextFrom: 3, task: 'Kampfpanzer' },
        { name: 'Immolator', role: 'trans', models: 1, points: 100, qty: 2, pointsNext: 115, nextFrom: 4, wargear: [['Twin multi-melta', 15, 1]], task: 'Flammen-Transporter' }
      ]
    },
    {
      id: 'penitent',
      name: 'Bußprozession',
      detachments: [{ name: 'Penitent Host', dp: 2 }, { name: 'Sanctified Orators', dp: 1 }],
      style: ['Nahkampf', 'Horde', 'Aggressiv'],
      difficulty: 3,
      summary:
        'Büßerinnen, Penitent Engines und Arco-Flagellanten stürmen mit Ministorum-Priestern im Rücken auf den Feind zu. Viele schnelle ' +
        'Nahkampfeinheiten, die den Gegner von Beginn an unter Druck setzen.',
      plan: [
        'Ministorum-Priester begleiten die Nahkämpfer, Saint Celestine und Morvenn Vahl führen die Spitze an.',
        'Penitent Engines und Mortifiers greifen gegnerische Fahrzeuge an.',
        'Arco-Flagellanten binden Elite-Nahkämpfer.',
        'Battle Sisters und Novizinnen halten den Heimbereich.'
      ],
      strengths: ['Massiver Nahkampfdruck', 'Viele Bedrohungen gleichzeitig', 'Celestine schwer zu töten'],
      weaknesses: ['Kaum Fernkampf', 'Einheiten zerbrechlich'],
      units: [
        { name: 'Saint Celestine', role: 'epic', models: 3, points: 150, task: 'Warlord; wiederauferstehende Heilige' },
        { name: 'Ministorum Priest', role: 'char', models: 1, points: 50, leads: 'Arco-flagellants', task: 'Stärkt die Arco-Flagellanten' },
        { name: 'Ministorum Priest', role: 'char', models: 1, points: 50, task: 'Zusätzlicher Buff-Charakter' },
        { name: 'Canoness', role: 'char', models: 1, points: 60, leads: 'Battle Sisters Squad', task: 'Heimverteidigung' },
        { name: 'Battle Sisters Squad', role: 'line', models: 10, points: 100, qty: 2, task: 'Halten Missionsziele' },
        { name: 'Sisters Novitiate Squad', role: 'inf', models: 10, points: 90, task: 'Missionsziele und Abschirmung' },
        { name: 'Repentia Squad', role: 'inf', models: 10, points: 140, qty: 2, task: 'Brutale Nahkämpferinnen' },
        { name: 'Arco-flagellants', role: 'inf', models: 10, points: 140, qty: 2, task: 'Selbstmörderischer Ansturm' },
        { name: 'Penitent Engines', role: 'veh', models: 2, points: 140, qty: 2, task: 'Nahkampf-Läufer' },
        { name: 'Mortifiers', role: 'veh', models: 2, points: 130, qty: 2, task: 'Schwere Nahkampf-Läufer' },
        { name: 'Immolator', role: 'trans', models: 1, points: 100, pointsNext: 115, nextFrom: 4, wargear: [['Twin multi-melta', 15, 1]], task: 'Transport für Repentia' },
        { name: 'Morvenn Vahl', role: 'epic', models: 1, points: 200, task: 'Warlord; Äbtissin im Paragon-Anzug' }
      ]
    }
  ]
});
