/* Chaos Knights */
WH40K.registerFaction({
  id: 'chaos-knights',
  name: 'Chaos Knights',
  aliases: ['Questor Traitoris', 'War Dogs', 'Dämonenritter'],
  group: 'Chaos',
  wahapedia: 'chaos-knights',
  colors: { primary: '#3a0d0d', accent: '#b6894a' },
  tagline: 'Gefallene Ritterhäuser – Terror auf Stahlbeinen',
  description:
    'Ritterhäuser, die dem Chaos verfallen sind. Ihre Läufer verbreiten Angst und Schrecken, die kleinen War Dogs jagen ' +
    'in Rudeln. Die Abominant-Klasse kann sogar Dämonen beschwören.',
  playstyle: 'Wenige große Läufer plus War-Dog-Rudel. Angst- und Moralmechaniken.',
  detachments: [
    ['Infernal Lance', 3], ['Helhunt Lance', 2], ['Houndpack Lance', 2],
    ['Lords of Dread', 2], ['Traitoris Lance', 2], ['Bastions of Tyranny', 1],
    ['Hunting Warpack', 1], ['Iconoclast Fiefdom', 1]
  ],
  armies: [
    {
      id: 'infernal',
      name: 'Höllische Lanze',
      detachments: [{ name: 'Infernal Lance', dp: 3 }],
      style: ['Große Läufer', 'Angst', 'Nahkampf & Feuerkraft'],
      difficulty: 3,
      summary:
        'Drei große Ritter – Abominant, Desecrator und Rampager – begleitet von War Dogs. Die Lanze marschiert ins ' +
        'Zentrum, verbreitet Angst und zermalmt alles, was sich ihr entgegenstellt.',
      plan: [
        'War Dogs sichern Missionsziele an den Flanken.',
        'Desecrator beschießt die gefährlichsten Fahrzeuge.',
        'Rampager stürmt in Runde 2 ins Zentrum.',
        'Abominant unterstützt mit Warp-Effekten und Moraldruck.'
      ],
      strengths: ['Sehr harte Ziele', 'Moraldruck auf den Gegner', 'Schnell bemalt'],
      weaknesses: ['Sehr wenige Einheiten', 'Schwierig bei vielen Missionszielen'],
      units: [
        { name: 'Knight Abominant', role: 'char', models: 1, points: 355, pointsNext: 370, nextFrom: 3, task: 'Warlord; Psi-Ritter' },
        { name: 'Knight Desecrator', role: 'veh', models: 1, points: 355, pointsNext: 370, nextFrom: 3, task: 'Feuerkraft-Ritter' },
        { name: 'Knight Rampager', role: 'veh', models: 1, points: 355, pointsNext: 370, nextFrom: 3, qty: 2, task: 'Nahkampf-Ritter' },
        { name: 'War Dog Brigand', role: 'veh', models: 1, points: 135, task: 'Feuerstarker War Dog' },
        { name: 'War Dog Karnivore', role: 'veh', models: 1, points: 145, qty: 2, task: 'Nahkampf-War-Dog' },
        { name: 'War Dog Stalker', role: 'veh', models: 1, points: 135, task: 'Allround-War-Dog' }
      ]
    },
    {
      id: 'houndpack',
      name: 'Hunderudel',
      detachments: [{ name: 'Houndpack Lance', dp: 2 }, { name: 'Hunting Warpack', dp: 1 }],
      style: ['Viele Läufer', 'Schnell', 'Missionsziele'],
      difficulty: 3,
      summary:
        'Ein Rudel aus elf War Dogs, angeführt von einem Rampager. Mehr Einheiten bedeuten mehr Missionsziele – das ' +
        'Rudel jagt über das Feld und reißt isolierte Gegner nieder.',
      plan: [
        'War Dogs verteilen sich auf alle Missionsziele.',
        'Brigands und Executioners beschießen Fahrzeuge.',
        'Karnivores jagen Infanterie und Charaktere.',
        'Rampager führt den Angriff im Zentrum an.'
      ],
      strengths: ['Viele harte Einheiten', 'Gute Missionszielkontrolle', 'Schnell'],
      weaknesses: ['Einzelne War Dogs verwundbar', 'Viel Bewegung zu planen'],
      units: [
        { name: 'Knight Rampager', role: 'char', models: 1, points: 355, pointsNext: 370, nextFrom: 3, task: 'Warlord; Nahkampf-Ritter' },
        { name: 'War Dog Karnivore', role: 'veh', models: 1, points: 145, qty: 3, task: 'Nahkampf-Jäger' },
        { name: 'War Dog Brigand', role: 'veh', models: 1, points: 135, qty: 3, task: 'Feuerunterstützung' },
        { name: 'War Dog Executioner', role: 'veh', models: 1, points: 130, qty: 2, task: 'Panzerabwehr' },
        { name: 'War Dog Huntsman', role: 'veh', models: 1, points: 135, qty: 2, task: 'Melta-Jäger' },
        { name: 'War Dog Stalker', role: 'veh', models: 1, points: 135, qty: 2, task: 'Allround-War-Dog' }
      ]
    }
  ]
});
