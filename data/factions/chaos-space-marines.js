/* Chaos Space Marines (Heretic Astartes) */
WH40K.registerFaction({
  id: 'chaos-space-marines',
  name: 'Chaos Space Marines',
  aliases: ['Heretic Astartes', 'Black Legion', 'Night Lords', 'Iron Warriors', 'Alpha Legion', 'Word Bearers'],
  group: 'Chaos',
  wahapedia: 'chaos-space-marines',
  colors: { primary: '#5c1a1a', accent: '#c8a050' },
  tagline: 'Verräter-Legionen im Dienst der Dunklen Götter',
  description:
    'Abtrünnige Space Marines, die sich vom Imperator abgewandt haben. Vom Black Legion bis zu den Night Lords bieten ' +
    'sie Kultisten-Horden, Dämonenmaschinen, Terminatoren und Paktmagie – eine sehr vielseitige Chaos-Fraktion.',
  playstyle: 'Vielseitig wie Space Marines, aber riskanter: Dark Pacts geben Boni gegen Schaden am eigenen Trupp.',
  detachments: [
    ['Creations of Bile', 3], ["Huron's Marauders", 3], ['Pactbound Zealots', 3],
    ['Renegade Raiders', 3], ['Chaos Cult', 2], ['Cult of the Arkifane', 2],
    ['Deceptors', 2], ['Dread Talons', 2], ['Fellhammer Siege-Host', 2],
    ['Nightmare Hunt', 2], ['Renegade Warband', 2], ['Soulforged Warpack', 2],
    ['Veterans of the Long War', 2], ['Warpstrike Champions', 2], ['Cabal of Chaos', 1],
    ['Devotees of Destruction', 1], ['Murdertalon Raiders', 1]
  ],
  armies: [
    {
      id: 'black-legion',
      name: 'Schwarze Legion – Abaddons Garde',
      detachments: [{ name: 'Veterans of the Long War', dp: 2 }, { name: 'Cabal of Chaos', dp: 1 }],
      style: ['Elite', 'Terminatoren', 'Allround'],
      difficulty: 3,
      summary:
        'Abaddon der Plünderer führt Chaos-Terminatoren, Legionäre und Dämonenmaschinen an. Kultisten füllen die ' +
        'Missionsziele, Forgefiend und Land Raider liefern Feuerkraft – eine klassische Black-Legion-Streitmacht.',
      plan: [
        'Kultisten besetzen Heim- und Seitenziele.',
        'Abaddon mit Terminatoren teleportiert oder fährt im Land Raider ins Zentrum.',
        'Havocs und Forgefiend schalten Fahrzeuge aus.',
        'Maulerfiend und Chosen kontern gegnerische Vorstöße.'
      ],
      strengths: ['Abaddon als enorme Bedrohung', 'Gute Fern-/Nahkampf-Mischung', 'Günstige Missionsziel-Halter'],
      weaknesses: ['Teure Kernteile', 'Kultisten sehr zerbrechlich'],
      units: [
        { name: 'Abaddon the Despoiler', role: 'epic', models: 1, points: 295, leads: 'Chaos Terminator Squad', task: 'Warlord; Kriegsmeister des Chaos' },
        { name: 'Chaos Lord in Terminator Armour', role: 'char', models: 1, points: 85, leads: 'Chaos Terminator Squad', task: 'Führt zweiten Terminator-Trupp' },
        { name: 'Sorcerer in Terminator Armour', role: 'char', models: 1, points: 80, task: 'Psionische Unterstützung' },
        { name: 'Legionaries', role: 'line', models: 5, points: 90, qty: 2, task: 'Vielseitige Kerntruppe' },
        { name: 'Cultist Mob', role: 'line', models: 10, points: 50, qty: 2, task: 'Günstige Missionsziel-Halter' },
        { name: 'Chaos Terminator Squad', role: 'inf', models: 5, points: 175, qty: 2, task: 'Elite-Schocktruppen' },
        { name: 'Chosen', role: 'inf', models: 5, points: 135, pointsNext: 145, nextFrom: 3, task: 'Elite-Nahkampf' },
        { name: 'Havocs', role: 'inf', models: 5, points: 125, pointsNext: 135, nextFrom: 3, task: 'Schwere Waffen' },
        { name: 'Forgefiend', role: 'veh', models: 1, points: 160, pointsNext: 170, nextFrom: 3, wargear: [['Ectoplasma cannon', 5, 3]], loadout: { 'Ectoplasma cannon': 1 }, task: 'Feuerstarke Dämonenmaschine' },
        { name: 'Maulerfiend', role: 'veh', models: 1, points: 130, task: 'Nahkampf-Dämonenmaschine' },
        { name: 'Chaos Land Raider', role: 'veh', models: 1, points: 220, pointsNext: 240, nextFrom: 3, task: 'Transport für Abaddon + Terminatoren' },
        { name: 'Chaos Rhino', role: 'trans', models: 1, points: 65, pointsNext: 75, nextFrom: 4, task: 'Transport für Legionäre' },
        { name: 'Chaos Bikers', role: 'mounted', models: 3, points: 70, task: 'Schnelle Angreifer' }
      ]
    },
    {
      id: 'dread-talons',
      name: 'Schreckensflug der Night Lords',
      detachments: [{ name: 'Dread Talons', dp: 2 }, { name: 'Murdertalon Raiders', dp: 1 }],
      style: ['Schnell', 'Sprungtruppen', 'Terror'],
      difficulty: 4,
      summary:
        'Raptoren, Warp Talons und Heldrakes stürzen sich aus dem Himmel auf isolierte Ziele. Die Armee verbreitet Angst, ' +
        'bricht Moral und jagt den Gegner von seinen Missionszielen.',
      plan: [
        'Kultisten und Legionäre halten Heimziele.',
        'Raptoren mit Haarken greifen früh die Flanken an.',
        'Warp Talons landen aus der Reserve hinter feindlichen Linien.',
        'Heldrakes jagen Flieger und leichte Infanterie.'
      ],
      strengths: ['Sehr schnell', 'Starker Moraldruck', 'Viele Bedrohungen gleichzeitig'],
      weaknesses: ['Einheiten eher fragil', 'Anspruchsvolles Timing'],
      units: [
        { name: 'Haarken Worldclaimer', role: 'epic', models: 1, points: 90, leads: 'Raptors', task: 'Warlord; Herold der Night Lords' },
        { name: 'Chaos Lord with Jump Pack', role: 'char', models: 1, points: 80, leads: 'Raptors', task: 'Führt einen Raptoren-Trupp' },
        { name: 'Legionaries', role: 'line', models: 5, points: 90, qty: 2, task: 'Heimziel' },
        { name: 'Cultist Mob', role: 'line', models: 10, points: 50, qty: 2, task: 'Missionsziele' },
        { name: 'Raptors', role: 'inf', models: 5, points: 110, qty: 3, pointsNext: 120, nextFrom: 3, task: 'Schnelle Sprungtruppen' },
        { name: 'Warp Talons', role: 'inf', models: 5, points: 125, qty: 2, pointsNext: 135, nextFrom: 3, task: 'Schock-Nahkämpfer' },
        { name: 'Chaos Bikers', role: 'mounted', models: 3, points: 70, qty: 2, task: 'Schnelle Angreifer' },
        { name: 'Chaos Spawn', role: 'beast', models: 2, points: 60, qty: 2, task: 'Günstige Störer' },
        { name: 'Venomcrawler', role: 'veh', models: 1, points: 120, pointsNext: 130, nextFrom: 3, task: 'Mobile Dämonenmaschine' },
        { name: 'Forgefiend', role: 'veh', models: 1, points: 160, pointsNext: 170, nextFrom: 3, wargear: [['Ectoplasma cannon', 5, 3]], loadout: { 'Ectoplasma cannon': 1 }, task: 'Feuerkraft' },
        { name: 'Heldrake', role: 'fly', models: 1, points: 175, qty: 2, task: 'Flieger-Jäger' },
        { name: 'Chaos Rhino', role: 'trans', models: 1, points: 65, pointsNext: 75, nextFrom: 4, task: 'Transport für Legionäre' }
      ]
    }
  ]
});
