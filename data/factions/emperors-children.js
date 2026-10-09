/* Emperor's Children */
WH40K.registerFaction({
  id: 'emperors-children',
  name: "Emperor's Children",
  aliases: ['Slaanesh', 'Fulgrim', 'Noise Marines', 'Kinder des Imperators'],
  group: 'Chaos',
  wahapedia: 'emperor-s-children',
  wahapediaConnectors: 'lower',
  colors: { primary: '#6e1f6a', accent: '#e0b3d6' },
  tagline: 'Die perfektionssüchtige Legion des Slaanesh',
  description:
    'Einst die stolzesten Krieger des Imperators, heute Sklaven ihrer Sucht nach Perfektion und Exzess. ' +
    'Schnelle, präzise Duellanten und Noise Marines mit Schallwaffen prägen die Legion von Fulgrim.',
  playstyle: 'Schnell, präzise, Nahkampf-Duellanten plus Schallwaffen auf mittlere Distanz.',
  detachments: [
    ['Coterie of the Conceited', 3], ['Carnival of Excess', 2], ['Court of the Phoenician', 2],
    ['Mercurial Host', 2], ['Peerless Bladesmen', 2], ['Rapid Evisceration', 2],
    ["Slaanesh's Chosen", 2], ['Elegant Brutes', 1], ['Frenzied Host', 1],
    ['Spectacle of Slaughter', 1]
  ],
  armies: [
    {
      id: 'phoenician',
      name: 'Hofstaat des Phoenicians',
      detachments: [{ name: 'Court of the Phoenician', dp: 2 }, { name: 'Spectacle of Slaughter', dp: 1 }],
      style: ['Primarch', 'Nahkampf', 'Duellanten'],
      difficulty: 3,
      summary:
        'Fulgrim selbst führt Lucius, Flawless Blades und Infractors in einen blitzschnellen Nahkampf. Die Armee sucht ' +
        'die perfekten Duelle und zerschneidet die Elite des Gegners.',
      plan: [
        'Tormentors und Infractors sichern Missionsziele.',
        'Rhinos bringen Flawless Blades mit Charakteren nach vorne.',
        'Fulgrim greift das stärkste gegnerische Modell an.',
        'Noise Marines und Maulerfiend unterstützen auf mittlere Distanz.'
      ],
      strengths: ['Sehr schnelle Nahkämpfer', 'Starke Charakter-Duelle', 'Fulgrim als Großbedrohung'],
      weaknesses: ['Teure Elite', 'Wenig Panzerabwehr auf Distanz'],
      units: [
        { name: 'Fulgrim', role: 'epic', models: 1, points: 340, task: 'Warlord; Daemon Primarch' },
        { name: 'Lucius the Eternal', role: 'epic', models: 1, points: 120, leads: 'Flawless Blades', task: 'Unsterblicher Duellant' },
        { name: 'Lord Exultant', role: 'char', models: 1, points: 90, pointsNext: 100, nextFrom: 3, leads: 'Infractors', task: 'Anführer' },
        { name: 'Lord Kakophonist', role: 'char', models: 1, points: 70, leads: 'Noise Marines', task: 'Schall-Buff' },
        { name: 'Daemon Prince of Slaanesh with Wings', role: 'char', models: 1, points: 205, pointsNext: 235, nextFrom: 2, task: 'Fliegender Charakterjäger' },
        { name: 'Infractors', role: 'line', models: 10, points: 160, task: 'Schnelle Kerntruppe' },
        { name: 'Infractors', role: 'line', models: 5, points: 85, qty: 2, task: 'Missionsziele' },
        { name: 'Tormentors', role: 'line', models: 5, points: 80, qty: 2, task: 'Schützen und Missionsziel-Halter' },
        { name: 'Flawless Blades', role: 'inf', models: 3, points: 95, qty: 2, task: 'Elite-Duellanten' },
        { name: 'Noise Marines', role: 'inf', models: 6, points: 145, pointsNext: 160, nextFrom: 3, task: 'Schallwaffen auf mittlere Distanz' },
        { name: "Emperor's Children Chaos Spawn", wahapedia: 'Chaos-Spawn', role: 'beast', models: 2, points: 70, task: 'Störer' },
        { name: "Emperor's Children Maulerfiend", wahapedia: 'Maulerfiend', role: 'veh', models: 1, points: 120, pointsNext: 130, nextFrom: 3, task: 'Fahrzeugjäger' },
        { name: "Emperor's Children Rhino", wahapedia: 'Chaos-Rhino', role: 'trans', models: 1, points: 70, qty: 2, pointsNext: 80, nextFrom: 4, task: 'Transport' }
      ]
    },
    {
      id: 'cacophony',
      name: 'Kakophonie der Noise Marines',
      detachments: [{ name: 'Carnival of Excess', dp: 2 }, { name: 'Elegant Brutes', dp: 1 }],
      style: ['Fernkampf', 'Fahrzeuge', 'Dämonen-Unterstützung'],
      difficulty: 3,
      summary:
        'Drei Trupps Noise Marines zerreißen den Gegner mit Schallwaffen, unterstützt von Land Raider, Heldrake und ' +
        'Daemonettes. Infractors halten die Linie, der geflügelte Daemon Prince jagt Charaktere.',
      plan: [
        'Noise Marines mit Lord Kakophonist nehmen Feuerpositionen ein.',
        'Infractors und Daemonettes besetzen Missionsziele.',
        'Heldrake und Daemon Prince jagen exponierte Ziele.',
        'Der Land Raider drückt ins Zentrum.'
      ],
      strengths: ['Starker Fernkampf auf mittlere Distanz', 'Mobil', 'Mischung aus Marines und Dämonen'],
      weaknesses: ['Noise Marines teuer', 'Wenig harte Panzerabwehr'],
      units: [
        { name: "Daemon Prince of Slaanesh with Wings", role: 'char', models: 1, points: 205, pointsNext: 235, nextFrom: 2, task: 'Warlord; fliegender Prinz' },
        { name: 'Lord Kakophonist', role: 'char', models: 1, points: 70, leads: 'Noise Marines', task: 'Schall-Buff' },
        { name: 'Lord Exultant', role: 'char', models: 1, points: 90, pointsNext: 100, nextFrom: 3, leads: 'Infractors', task: 'Anführer' },
        { name: 'Infractors', role: 'line', models: 10, points: 160, qty: 2, task: 'Kerntruppe' },
        { name: 'Tormentors', role: 'line', models: 5, points: 80, qty: 2, task: 'Missionsziele' },
        { name: 'Noise Marines', role: 'inf', models: 6, points: 145, qty: 3, pointsNext: 160, nextFrom: 3, task: 'Schallwaffen-Feuerlinie' },
        { name: 'Daemonettes', role: 'inf', models: 10, points: 100, task: 'Schnelle Dämonen' },
        { name: "Emperor's Children Chaos Spawn", wahapedia: 'Chaos-Spawn', role: 'beast', models: 2, points: 70, task: 'Störer' },
        { name: "Emperor's Children Land Raider", wahapedia: 'Chaos-Land-Raider', role: 'veh', models: 1, points: 220, pointsNext: 240, nextFrom: 3, task: 'Schwerer Transporter' },
        { name: "Emperor's Children Heldrake", wahapedia: 'Heldrake', role: 'fly', models: 1, points: 175, task: 'Flieger' },
        { name: "Emperor's Children Rhino", wahapedia: 'Chaos-Rhino', role: 'trans', models: 1, points: 70, qty: 2, pointsNext: 80, nextFrom: 4, task: 'Transport' }
      ]
    }
  ]
});
