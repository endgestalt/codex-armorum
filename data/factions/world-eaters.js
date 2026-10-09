/* World Eaters */
WH40K.registerFaction({
  id: 'world-eaters',
  name: 'World Eaters',
  aliases: ['Khorne', 'Angron', 'Berzerker', 'Blutgott'],
  group: 'Chaos',
  wahapedia: 'world-eaters',
  wahapediaConnectors: 'lower',
  colors: { primary: '#8b0f0f', accent: '#c8a050' },
  tagline: 'Blut für den Blutgott! Schädel für den Schädelthron!',
  description:
    'Angrons Legion kennt nur ein Ziel: Nahkampf. Durch die Butcher\'s Nails in den Wahnsinn getrieben, stürmen die ' +
    'Berzerker auf den Feind zu. Psioniker gibt es keine – dafür Segnungen des Khorne.',
  playstyle: 'Reiner Nahkampf, sehr aggressiv, Würfelglück durch Blessings of Khorne.',
  detachments: [
    ['Berzerker Warband', 3], ['Cult of Blood', 2], ['Goretrack Onslaught', 2],
    ['Khorne Daemonkin', 2], ['Possessed Slaughterband', 2], ['Brazen Engines', 1],
    ['Butchers of Khorne', 1], ['Vessels of Wrath', 1]
  ],
  armies: [
    {
      id: 'berzerkers',
      name: 'Berzerker-Kriegsbande',
      detachments: [{ name: 'Berzerker Warband', dp: 3 }],
      style: ['Nahkampf', 'Aggressiv', 'Primarch'],
      difficulty: 2,
      summary:
        'Angron, Khârn und Berzerker-Horden in Rhinos und Land Raider stürmen ab Runde 1 auf den Feind zu. ' +
        'Einfacher Plan, enorme Wucht – perfekt für Spieler, die gern würfeln und angreifen.',
      plan: [
        'Jakhals rennen vor und blocken gegnerische Bewegung.',
        'Berzerker im Rhino/Land Raider fahren in Angriffsreichweite.',
        'Angron greift das größte Ziel an, Eightbound folgen.',
        'Maulerfiend und Lord on Juggernaut jagen Fahrzeuge.'
      ],
      strengths: ['Brutaler Nahkampf', 'Einfacher Spielplan', 'Schnelle Angriffe'],
      weaknesses: ['Fast kein Fernkampf', 'Leidet gegen Abschirmung und Beschuss'],
      units: [
        { name: 'Angron', role: 'epic', models: 1, points: 330, task: 'Daemon Primarch, Riesenbedrohung' },
        { name: 'Khârn the Betrayer', role: 'epic', models: 1, points: 115, leads: 'Khorne Berzerkers', task: 'Warlord; Berzerker-Champion' },
        { name: 'World Eaters Master of Executions', wahapedia: 'Master-of-Executions', role: 'char', models: 1, points: 60, qty: 2, task: 'Charakterjäger' },
        { name: 'World Eaters Lord on Juggernaut', wahapedia: 'Lord-on-Juggernaut', role: 'char', models: 1, points: 95, task: 'Schneller Nahkampf-Held' },
        { name: 'Khorne Berzerkers', role: 'line', models: 10, points: 160, qty: 2, task: 'Haupt-Nahkampfblöcke' },
        { name: 'Jakhals', role: 'line', models: 10, points: 65, qty: 2, task: 'Günstige Störer' },
        { name: 'Eightbound', role: 'inf', models: 3, points: 125, pointsNext: 140, nextFrom: 3, task: 'Dämonisch besessene Nahkämpfer' },
        { name: 'Exalted Eightbound', role: 'inf', models: 3, points: 130, pointsNext: 145, nextFrom: 3, task: 'Elite-Besessene' },
        { name: 'World Eaters Chaos Spawn', wahapedia: 'Chaos-Spawn', role: 'beast', models: 2, points: 95, task: 'Störer' },
        { name: 'World Eaters Maulerfiend', wahapedia: 'Maulerfiend', role: 'veh', models: 1, points: 140, pointsNext: 150, nextFrom: 3, task: 'Fahrzeugjäger' },
        { name: 'World Eaters Land Raider', wahapedia: 'Chaos-Land-Raider', role: 'veh', models: 1, points: 220, pointsNext: 240, nextFrom: 3, task: 'Sturmtransporter' },
        { name: 'World Eaters Rhino', wahapedia: 'Chaos-Rhino', role: 'trans', models: 1, points: 75, qty: 2, pointsNext: 85, nextFrom: 4, task: 'Transport für Berzerker' }
      ]
    },
    {
      id: 'daemonkin',
      name: 'Khornes Blutschar',
      detachments: [{ name: 'Khorne Daemonkin', dp: 2 }, { name: 'Vessels of Wrath', dp: 1 }],
      style: ['Dämonen & Marines', 'Nahkampf', 'Monster'],
      difficulty: 3,
      summary:
        'Sterbliche und Dämonen Khornes kämpfen Seite an Seite: Ein Bloodthirster und ein Daemon Prince führen Bloodletters, ' +
        'Bloodcrushers und Eightbound in einer Welle aus Blut und Messing.',
      plan: [
        'Bloodletters und Jakhals besetzen Missionsziele.',
        'Flesh Hounds jagen über die Flanken.',
        'Bloodthirster und Daemon Prince greifen ab Runde 2 große Ziele an.',
        'Eightbound und Berzerker drücken das Zentrum.'
      ],
      strengths: ['Viele große Bedrohungen', 'Schnelle Dämonen', 'Starker Nahkampf'],
      weaknesses: ['Wenig Fernkampf', 'Komplexere Synergien'],
      units: [
        { name: 'Bloodthirster', role: 'mon', models: 1, points: 320, pointsNext: 335, nextFrom: 3, task: 'Großdämon des Khorne' },
        { name: 'Daemon Prince of Khorne with Wings', role: 'char', models: 1, points: 170, task: 'Warlord; fliegender Prinz' },
        { name: 'Lord Invocatus', role: 'epic', models: 1, points: 100, task: 'Schneller Held auf Juggernaut' },
        { name: 'Khorne Berzerkers', role: 'line', models: 10, points: 160, task: 'Nahkampfblock' },
        { name: 'Jakhals', role: 'line', models: 10, points: 65, task: 'Missionsziele' },
        { name: 'Bloodletters', role: 'inf', models: 10, points: 90, qty: 2, task: 'Dämonische Infanterie' },
        { name: 'Bloodcrushers', role: 'mounted', models: 3, points: 95, pointsNext: 115, nextFrom: 3, task: 'Dämonen-Kavallerie' },
        { name: 'Flesh Hounds', role: 'beast', models: 5, points: 75, qty: 2, task: 'Schnelle Jäger' },
        { name: 'Eightbound', role: 'inf', models: 3, points: 125, qty: 2, pointsNext: 140, nextFrom: 3, task: 'Besessene Nahkämpfer' },
        { name: 'World Eaters Maulerfiend', wahapedia: 'Maulerfiend', role: 'veh', models: 1, points: 140, pointsNext: 150, nextFrom: 3, task: 'Fahrzeugjäger' },
        { name: 'Angron', role: 'epic', models: 1, points: 330, task: 'Daemon Primarch, Riesenbedrohung' }
      ]
    }
  ]
});
