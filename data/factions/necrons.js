/* Necrons */
WH40K.registerFaction({
  id: 'necrons',
  name: 'Necrons',
  aliases: ['Nekrons', 'Szarekh', 'Silent King', 'Dynastie'],
  group: 'Xenos',
  wahapedia: 'necrons',
  colors: { primary: '#0c3b2e', accent: '#59e38b' },
  tagline: 'Die erwachenden Dynastien aus lebendem Metall',
  description:
    'Uralte Roboterarmeen, die nach Jahrmillionen in Grabwelten erwachen. Ihre Krieger reparieren sich selbst ' +
    '(Reanimation Protocols), Overlords und Crypteks kommandieren gewaltige Kriegsmaschinen.',
  playstyle: 'Langsam, sehr zäh durch Selbstreparatur, starker Fernkampf auf mittlere Distanz.',
  detachments: [
    ['Awakened Dynasty', 3], ['Canoptek Court', 3], ['Starshatter Arsenal', 3],
    ['Annihilation Legion', 2], ['Cryptek Conclave', 2], ['Cursed Legion', 2],
    ['Hypercrypt Legion', 2], ['Obeisance Phalanx', 2], ['Pantheon of Woe', 2],
    ['Hand of the Dynasty', 1], ['Skyshroud Spearhead', 1], ["The Phaeron's Armoury", 1]
  ],
  armies: [
    {
      id: 'awakened',
      name: 'Erweckte Dynastie',
      detachments: [{ name: 'Awakened Dynasty', dp: 3 }],
      style: ['Infanterie', 'Zäh', 'Allround'],
      difficulty: 1,
      summary:
        'Imotekh führt große Necron-Warrior-Phalanxen an, die sich ständig selbst reparieren. Doomsday Ark und Doomstalker ' +
        'liefern Feuerkraft, Lychguard und Skorpekhs kontern. Sehr einsteigerfreundlich.',
      plan: [
        'Necron Warriors mit Overlord/Technomancer besetzen Missionsziele.',
        'Doomsday Ark und Doomstalker beschießen große Ziele.',
        'Lychguard und Skorpekh kontern gegnerische Nahkämpfer.',
        'Ghost Ark bringt einen 10er-Warrior-Trupp zu späten Missionszielen.'
      ],
      strengths: ['Sehr zäh durch Reanimation', 'Einfach zu spielen', 'Gute Missionszielkontrolle'],
      weaknesses: ['Langsam', 'Wenig Nahkampfwucht'],
      units: [
        { name: 'Imotekh the Stormlord', role: 'epic', models: 1, points: 100, leads: 'Necron Warriors', task: 'Warlord; Phaeron' },
        { name: 'Overlord', role: 'char', models: 1, points: 90, leads: 'Necron Warriors', task: 'Anführer' },
        { name: 'Technomancer', role: 'char', models: 1, points: 80, pointsNext: 90, nextFrom: 2, leads: 'Immortals', task: 'Verbessert Reanimation' },
        { name: 'Royal Warden', role: 'char', models: 1, points: 50, leads: 'Immortals', task: 'Unterstützung' },
        { name: 'Hexmark Destroyer', role: 'char', models: 1, points: 75, task: 'Schütze gegen Infanterie' },
        { name: 'Necron Warriors', role: 'line', models: 20, points: 190, task: 'Unverwüstliche Phalanx' },
        { name: 'Necron Warriors', role: 'line', models: 10, points: 85, qty: 2, task: 'Kleinere Phalanx, ein Trupp fährt in der Ghost Ark' },
        { name: 'Immortals', role: 'line', models: 10, points: 140, task: 'Elite-Schützen' },
        { name: 'Lychguard', role: 'inf', models: 5, points: 80, qty: 2, task: 'Leibwache, Nahkampf' },
        { name: 'Cryptothralls', role: 'inf', models: 2, points: 60, task: 'Leibwächter für Crypteks' },
        { name: 'Skorpekh Destroyers', role: 'inf', models: 3, points: 85, pointsNext: 95, nextFrom: 3, task: 'Nahkampf-Zerstörer' },
        { name: 'Ophydian Destroyers', role: 'inf', models: 3, points: 80, pointsNext: 90, nextFrom: 3, task: 'Tunnelnde Angreifer' },
        { name: 'Canoptek Doomstalker', role: 'veh', models: 1, points: 140, qty: 2, task: 'Fernkampf-Läufer' },
        { name: 'Triarch Stalker', role: 'veh', models: 1, points: 110, pointsNext: 120, nextFrom: 3, task: 'Zielmarkierer' },
        { name: 'Doomsday Ark', role: 'veh', models: 1, points: 210, pointsNext: 230, nextFrom: 3, task: 'Schwere Kanone' },
        { name: 'Ghost Ark', role: 'trans', models: 1, points: 100, task: 'Transport und Reparatur für Necron Warriors' }
      ]
    },
    {
      id: 'canoptek',
      name: 'Kanoptek-Hof des Stillen Königs',
      detachments: [{ name: 'Canoptek Court', dp: 3 }],
      style: ['Konstrukte', 'Schnell', 'Monster'],
      difficulty: 3,
      summary:
        'Der Stille König und seine Kanoptek-Konstrukte: Wraiths, Scarabs und Doomstalker schwärmen schnell aus, während ' +
        'Szarekh im Zentrum alles zerstört, was sich nähert.',
      plan: [
        'Warriors und Immortals halten die Heimziele.',
        'Canoptek Wraiths jagen über die Flanken.',
        'Szarekh rückt ins Zentrum und schießt alles nieder.',
        'Scarabs und Tomb Blades holen Seitenziele.'
      ],
      strengths: ['Sehr zähe Konstrukte', 'Silent King als Riesenbedrohung', 'Schnelle Wraiths'],
      weaknesses: ['Abhängig vom Silent King', 'Wenige Missionsziel-Halter'],
      units: [
        { name: 'The Silent King', role: 'epic', models: 3, points: 420, wahapedia: 'The-Silent-King', task: 'Warlord; Szarekh mit Triarch Menhirs' },
        { name: 'Technomancer', role: 'char', models: 1, points: 80, pointsNext: 90, nextFrom: 2, leads: 'Necron Warriors', task: 'Reparatur' },
        { name: 'Plasmancer', role: 'char', models: 1, points: 60, leads: 'Immortals', task: 'Psi-artiges Feuer' },
        { name: 'Necron Warriors', role: 'line', models: 10, points: 85, qty: 2, task: 'Heimziele' },
        { name: 'Immortals', role: 'line', models: 10, points: 140, task: 'Elite-Schützen' },
        { name: 'Cryptothralls', role: 'inf', models: 2, points: 60, task: 'Leibwächter' },
        { name: 'Lokhust Heavy Destroyers', role: 'mounted', models: 1, points: 50, pointsNext: 60, nextFrom: 3, task: 'Panzerjäger' },
        { name: 'Tomb Blades', role: 'mounted', models: 3, points: 70, pointsNext: 80, nextFrom: 3, task: 'Schnelle Missionsziel-Jäger' },
        { name: 'Canoptek Wraiths', role: 'beast', models: 3, points: 95, qty: 3, pointsNext: 115, nextFrom: 2, task: 'Phasen-Konstrukte' },
        { name: 'Canoptek Scarab Swarms', role: 'beast', models: 3, points: 40, qty: 2, task: 'Schwärme für Nebenaufträge' },
        { name: 'Canoptek Spyders', role: 'mon', models: 1, points: 65, task: 'Reparatur-Konstrukt' },
        { name: 'Canoptek Reanimator', role: 'mon', models: 1, points: 75, task: 'Reanimations-Unterstützung' },
        { name: 'Canoptek Doomstalker', role: 'veh', models: 1, points: 140, qty: 2, task: 'Fernkampf-Läufer' },
        { name: 'Triarch Stalker', role: 'veh', models: 1, points: 110, pointsNext: 120, nextFrom: 3, task: 'Zielmarkierer' }
      ]
    }
  ]
});
