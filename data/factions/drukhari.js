/* Drukhari */
WH40K.registerFaction({
  id: 'drukhari',
  name: 'Drukhari',
  aliases: ['Dark Eldar', 'Commorragh', 'Kabal', 'Wych Cult', 'Haemonculus Coven'],
  group: 'Xenos',
  wahapedia: 'drukhari',
  colors: { primary: '#2e1a47', accent: '#6fd18a' },
  tagline: 'Piraten und Folterer aus Commorragh',
  description:
    'Die sadistischen Vettern der Aeldari überfallen aus dem Netz der Tausend Tore die Galaxis. Kabale, Wych-Kulte und ' +
    'Haemonculus-Zirkel kämpfen in schnellen, offenen Gleitern – blitzschnell, tödlich und zerbrechlich.',
  playstyle: 'Sehr schnell, viele Transporter, hoher Schaden, wenig Widerstand.',
  detachments: [
    ["Reaper's Wager", 3], ['Covenite Coterie', 2], ['Kabalite Cartel', 2],
    ['Realspace Raiders', 2], ['Skysplinter Assault', 2], ['Spectacle of Spite', 2],
    ['Exhibition of Slaughter', 1], ['Kabalite Agonysts', 1], ['Tools of Torment', 1]
  ],
  armies: [
    {
      id: 'raiders',
      name: 'Realspace-Raubzug',
      detachments: [{ name: 'Realspace Raiders', dp: 2 }, { name: 'Kabalite Agonysts', dp: 1 }],
      style: ['Schnell', 'Transporter', 'Gemischt'],
      difficulty: 4,
      summary:
        'Kabale, Wyches und Haemonculi gemeinsam: Raider und Venoms tragen die Infanterie blitzschnell über das Feld, ' +
        'Ravager und Razorwing schalten Fahrzeuge aus. Das klassische Drukhari-Raubzugsbild.',
      plan: [
        'Transporter nutzen Gelände und Distanz, bis die Ziele feststehen.',
        'Ravager und Razorwing schalten Panzer und Transporter aus.',
        'Wyches mit Succubus und Incubi mit Archon schlagen im Nahkampf zu.',
        'Kabalite und Reavers holen späte Missionsziele.'
      ],
      strengths: ['Extrem schnell', 'Viele Aktivierungen', 'Hoher Spitzenschaden'],
      weaknesses: ['Sehr zerbrechlich', 'Fehler werden hart bestraft'],
      units: [
        { name: 'Archon', role: 'char', models: 1, points: 80, leads: 'Incubi', task: 'Warlord; Herr eines Kabals' },
        { name: 'Succubus', role: 'char', models: 1, points: 50, leads: 'Wyches', task: 'Führt die Wyches' },
        { name: 'Haemonculus', role: 'char', models: 1, points: 50, leads: 'Wracks', task: 'Fleischformer' },
        { name: 'Drazhar', role: 'epic', models: 1, points: 85, task: 'Meister der Klingen' },
        { name: 'Kabalite Warriors', role: 'line', models: 10, points: 110, qty: 2, task: 'Schützen im Raider' },
        { name: 'Wyches', role: 'line', models: 10, points: 90, qty: 2, task: 'Nahkämpferinnen' },
        { name: 'Incubi', role: 'inf', models: 5, points: 90, pointsNext: 100, nextFrom: 3, task: 'Elite-Nahkampf' },
        { name: 'Wracks', role: 'inf', models: 5, points: 60, task: 'Zähe Missionsziel-Halter' },
        { name: 'Scourges with Heavy Weapons', role: 'inf', models: 5, points: 110, pointsNext: 120, nextFrom: 3, wargear: [['Haywire blaster', 5, 4, 0, 'schwere Waffen'], ['Dark lance', 5, 4, 0, 'schwere Waffen']], loadout: { 'Haywire blaster': 1 }, task: 'Fliegende Panzerjäger' },
        { name: 'Reavers', role: 'mounted', models: 3, points: 75, pointsNext: 85, nextFrom: 3, task: 'Jetbikes für Missionsziele' },
        { name: 'Talos', role: 'mon', models: 1, points: 75, pointsNext: 85, nextFrom: 3, wargear: [['Twin haywire blaster', 5, 1]], task: 'Fleischkonstrukt' },
        { name: 'Ravager', role: 'veh', models: 1, points: 110, qty: 3, wargear: [['Dark lance', 5, 3, 3]], task: 'Panzerjäger-Gleiter' },
        { name: 'Razorwing Jetfighter', role: 'fly', models: 1, points: 170, task: 'Jagdflieger' },
        { name: 'Raider', role: 'trans', models: 1, points: 75, qty: 4, pointsNext: 85, nextFrom: 4, task: 'Transportgleiter' },
        { name: 'Venom', role: 'trans', models: 1, points: 65, pointsNext: 75, nextFrom: 4, task: 'Kleiner Transporter' }
      ]
    },
    {
      id: 'coven',
      name: 'Kunst des Schmerzes – Zirkel',
      detachments: [{ name: 'Covenite Coterie', dp: 2 }, { name: 'Tools of Torment', dp: 1 }],
      style: ['Zäh', 'Monster', 'Nahkampf'],
      difficulty: 3,
      summary:
        'Die Haemonculus-Zirkel bringen ihre Schöpfungen ins Feld: Grotesques, Talos und Cronos sind für Drukhari ' +
        'ungewöhnlich zäh. Eine langsamere, aber robustere Drukhari-Armee.',
      plan: [
        'Wracks halten Missionsziele, Kabalite schießen aus Raidern.',
        'Grotesques mit Haemonculi drücken im Zentrum.',
        'Talos und Cronos schwächen und zermalmen Gegner.',
        'Ravager und Incubi kontern gegnerische Elite.'
      ],
      strengths: ['Robust für Drukhari', 'Starke Nahkampfmonster', 'Einfacher zu spielen'],
      weaknesses: ['Langsamer', 'Weniger Fernkampf'],
      units: [
        { name: 'Urien Rakarth', role: 'epic', models: 1, points: 80, task: 'Warlord; Meister des Zirkels' },
        { name: 'Haemonculus', role: 'char', models: 1, points: 50, qty: 2, leads: 'Wracks', task: 'Fleischformer' },
        { name: 'Archon', role: 'char', models: 1, points: 80, leads: 'Incubi', task: 'Kabal-Unterstützung' },
        { name: 'Drazhar', role: 'epic', models: 1, points: 85, task: 'Meister der Klingen' },
        { name: 'Kabalite Warriors', role: 'line', models: 10, points: 110, qty: 2, task: 'Schützen' },
        { name: 'Wracks', role: 'inf', models: 5, points: 60, qty: 2, task: 'Zähe Missionsziel-Halter' },
        { name: 'Incubi', role: 'inf', models: 5, points: 90, pointsNext: 100, nextFrom: 3, task: 'Elite-Nahkampf' },
        { name: 'Grotesques', role: 'inf', models: 3, points: 80, qty: 2, task: 'Muskel-Monster' },
        { name: 'Talos', role: 'mon', models: 1, points: 75, qty: 3, pointsNext: 85, nextFrom: 3, wargear: [['Twin haywire blaster', 5, 1]], task: 'Fleischkonstrukte' },
        { name: 'Cronos', role: 'mon', models: 1, points: 55, qty: 2, task: 'Schwächt Gegner' },
        { name: 'Ravager', role: 'veh', models: 1, points: 110, qty: 2, wargear: [['Dark lance', 5, 3, 3]], task: 'Panzerjäger' },
        { name: 'Raider', role: 'trans', models: 1, points: 75, qty: 2, pointsNext: 85, nextFrom: 4, task: 'Transport' },
        { name: 'Venom', role: 'trans', models: 1, points: 65, qty: 2, pointsNext: 75, nextFrom: 4, task: 'Transport' },
        { name: 'Razorwing Jetfighter', role: 'fly', models: 1, points: 170, task: 'Jagdflieger' }
      ]
    }
  ]
});
