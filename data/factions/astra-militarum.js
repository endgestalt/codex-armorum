/* Astra Militarum */
WH40K.registerFaction({
  id: 'astra-militarum',
  name: 'Astra Militarum',
  aliases: ['Imperiale Armee', 'Imperial Guard', 'Cadia', 'Leman Russ'],
  group: 'Imperium',
  wahapedia: 'astra-militarum',
  colors: { primary: '#4e5f2b', accent: '#d6b862' },
  tagline: 'Der Hammer des Imperators – Masse und Artillerie',
  description:
    'Milliarden gewöhnlicher Menschen gegen die Schrecken der Galaxis. Die Imperiale Armee setzt auf Masse, Befehle, ' +
    'Panzer und Artillerie – sie gewinnt nicht durch Heldentum, sondern durch Feuerkraft und Zahl.',
  playstyle: 'Fernkampf, Panzer und Befehle. Viele Modelle, starke Fahrzeuge.',
  detachments: [
    ['Grizzled Company', 3], ['Armoured Infantry', 2], ['Combined Arms', 2],
    ['Hammer of the Emperor', 2], ['Mechanised Assault', 2], ['Recon Element', 2],
    ['Siege Regiment', 2], ['Steel Hammer', 2], ['Abhuman Auxiliaries', 1],
    ['Bridgehead Strike', 1], ['Designation Force', 1]
  ],
  armies: [
    {
      id: 'armoured',
      name: 'Panzerkompanie',
      detachments: [{ name: 'Hammer of the Emperor', dp: 2 }, { name: 'Bridgehead Strike', dp: 1 }],
      style: ['Panzer', 'Fernkampf', 'Feuerkraft'],
      difficulty: 2,
      summary:
        'Leman Russ und Rogal Dorn bilden eine stählerne Front, Basilisk und Sentinels unterstützen. Die Infanterie ' +
        'hält nur die Missionsziele – die Panzer erledigen den Rest.',
      plan: [
        'Panzer stellen sich mit Sichtlinien auf die Mitte auf, Basilisk hinten.',
        'Scout Sentinels und Ratlings sichern frühe Missionsziele.',
        'Der Leman Russ Commander erteilt Befehle an die Panzerlinie.',
        'Cadians in Chimären rücken ab Runde 2 auf freie Missionsziele.'
      ],
      strengths: ['Enorme Feuerkraft', 'Sehr robuste Fahrzeuge', 'Einfacher Spielplan'],
      weaknesses: ['Wenige Modelle für Missionsziele', 'Anfällig für Nahkampf-Bindung'],
      units: [
        { name: 'Leman Russ Commander', role: 'char', models: 1, points: 195, pointsNext: 210, nextFrom: 3, wargear: [['Demolisher battle cannon', 15, 1], ['Multi-melta', 5, 2, 0, 'Seitenkuppeln'], ['Lascannon', 5, 1, 1], ['Plasma cannon', 5, 2, 0, 'Seitenkuppeln']], task: 'Warlord; Kommandopanzer, Befehle an Fahrzeuge' },
        { name: 'Cadian Command Squad', role: 'char', models: 5, points: 60, task: 'Befehle für Infanterie' },
        { name: 'Cadian Shock Troops', role: 'line', models: 10, points: 70, qty: 2, task: 'Halten Missionsziele' },
        { name: 'Ratlings', role: 'inf', models: 5, points: 60, task: 'Scharfschützen, Infiltration' },
        { name: 'Scout Sentinels', role: 'veh', models: 1, points: 55, qty: 2, task: 'Aufklärung, Missionsziele' },
        { name: 'Leman Russ Battle Tank', role: 'veh', models: 1, points: 160, qty: 2, pointsNext: 175, nextFrom: 3, wargear: [['Multi-melta', 5, 2, 0, 'Seitenkuppeln'], ['Lascannon', 5, 1, 1], ['Plasma cannon', 5, 2, 0, 'Seitenkuppeln']], task: 'Kampfpanzer' },
        { name: 'Leman Russ Demolisher', role: 'veh', models: 1, points: 160, pointsNext: 175, nextFrom: 3, wargear: [['Multi-melta', 5, 2, 0, 'Seitenkuppeln'], ['Lascannon', 5, 1, 1], ['Plasma cannon', 5, 2, 0, 'Seitenkuppeln']], task: 'Nahdistanz-Panzer' },
        { name: 'Rogal Dorn Battle Tank', role: 'veh', models: 1, points: 260, qty: 2, pointsNext: 275, nextFrom: 2, task: 'Superschwerer Kampfpanzer' },
        { name: 'Basilisk', role: 'veh', models: 1, points: 115, pointsNext: 135, nextFrom: 2, qty: 2, task: 'Artillerie ohne Sichtlinie' },
        { name: 'Chimera', role: 'trans', models: 1, points: 75, qty: 2, pointsNext: 85, nextFrom: 4, task: 'Transporter für Cadians' }
      ]
    },
    {
      id: 'combined-arms',
      name: 'Infanterie-Welle',
      detachments: [{ name: 'Combined Arms', dp: 2 }, { name: 'Abhuman Auxiliaries', dp: 1 }],
      style: ['Horde', 'Befehle', 'Missionsziele'],
      difficulty: 3,
      summary:
        'Eine Flut aus Infanterie, Kasrkin und Ogryns überschwemmt die Missionsziele, gestützt von Artillerie und ' +
        'einigen Panzern. Viele Modelle, viele Befehle, viel Kontrolle über das Spielfeld.',
      plan: [
        'Vier Trupps Cadian Shock Troops füllen die Missionsziele.',
        'Kasrkin übernehmen Nebenaufträge und gezielte Schläge.',
        'Bullgryns und Ogryns mit Nork Deddog bilden eine Nahkampfwand.',
        'Artillerie und Leman Russ dünnen den Gegner aus der Distanz aus.'
      ],
      strengths: ['Sehr viele Modelle', 'Hohe Missionszielkontrolle', 'Flexible Befehle'],
      weaknesses: ['Einzelne Trupps schwach', 'Viele Modelle = lange Züge'],
      units: [
        { name: 'Cadian Castellan', role: 'char', models: 1, points: 55, leads: 'Cadian Shock Troops', task: 'Warlord; Befehle' },
        { name: 'Commissar', role: 'char', models: 1, points: 30, task: 'Hält die Moral aufrecht' },
        { name: 'Primaris Psyker', role: 'char', models: 1, points: 60, task: 'Psionische Unterstützung' },
        { name: 'Nork Deddog', role: 'epic', models: 1, points: 60, task: 'Leibwächter-Ogryn' },
        { name: 'Cadian Command Squad', role: 'char', models: 5, points: 60, task: 'Befehle' },
        { name: 'Cadian Shock Troops', role: 'line', models: 10, points: 70, qty: 4, task: 'Masse auf Missionszielen' },
        { name: 'Kasrkin', role: 'inf', models: 10, points: 105, qty: 2, pointsNext: 120, nextFrom: 3, task: 'Elite-Infanterie' },
        { name: 'Bullgryn Squad', role: 'inf', models: 3, points: 90, pointsNext: 105, nextFrom: 2, task: 'Zähe Nahkampfwand' },
        { name: 'Ogryn Squad', role: 'inf', models: 3, points: 60, task: 'Nahkampf-Konter' },
        { name: 'Ratlings', role: 'inf', models: 5, points: 60, task: 'Scharfschützen' },
        { name: 'Cadian Heavy Weapons Squad', role: 'inf', models: 3, points: 65, task: 'Schwere Waffen' },
        { name: 'Field Ordnance Battery', role: 'veh', models: 2, points: 90, wargear: [['Bombast field gun', 10, 2]], task: 'Feldartillerie' },
        { name: 'Armoured Sentinels', role: 'veh', models: 1, points: 65, qty: 2, task: 'Leichte Läufer' },
        { name: 'Hellhound', role: 'veh', models: 1, points: 125, pointsNext: 135, nextFrom: 3, task: 'Flammenpanzer' },
        { name: 'Leman Russ Battle Tank', role: 'veh', models: 1, points: 160, pointsNext: 175, nextFrom: 3, wargear: [['Multi-melta', 5, 2, 0, 'Seitenkuppeln'], ['Lascannon', 5, 1, 1], ['Plasma cannon', 5, 2, 0, 'Seitenkuppeln']], loadout: { 'Lascannon': 0 }, task: 'Kampfpanzer' },
        { name: 'Basilisk', role: 'veh', models: 1, points: 115, pointsNext: 135, nextFrom: 2, task: 'Artillerie' },
        { name: 'Chimera', role: 'trans', models: 1, points: 75, qty: 2, pointsNext: 85, nextFrom: 4, task: 'Transport für Kasrkin' },
        { name: 'Leman Russ Commander', role: 'char', models: 1, points: 195, pointsNext: 210, nextFrom: 3, wargear: [['Demolisher battle cannon', 15, 1], ['Multi-melta', 5, 2, 0, 'Seitenkuppeln'], ['Lascannon', 5, 1, 1], ['Plasma cannon', 5, 2, 0, 'Seitenkuppeln']], task: 'Warlord; Kommandopanzer, Befehle an Fahrzeuge' }
      ]
    }
  ]
});
