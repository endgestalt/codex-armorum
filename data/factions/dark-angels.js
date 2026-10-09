/* Dark Angels (Space-Marines-Orden mit Deathwing und Ravenwing) */
WH40K.registerFaction({
  id: 'dark-angels',
  name: 'Dark Angels',
  aliases: ['Deathwing', 'Ravenwing', 'Unforgiven', 'Lion El\'Jonson'],
  group: 'Imperium',
  wahapedia: 'space-marines',
  colors: { primary: '#0f4d2e', accent: '#d8c79a' },
  tagline: 'Die Unvergebenen – Deathwing und Ravenwing',
  description:
    'Der erste Orden hütet ein dunkles Geheimnis. Seine Elite – die Terminatoren der Deathwing und die Biker der ' +
    'Ravenwing – erlauben zwei völlig unterschiedliche Armeen mit demselben Orden.',
  playstyle: 'Elite-Terminatoren oder schnelle Bike-Kavallerie. Nutzt alle Space-Marines-Einheiten plus eigene.',
  detachmentNote: 'Allgemeine Space-Marines-Detachments sind mit den für diesen Orden gültigen DP-Kosten aufgeführt.',
  detachments: [
    ['Armoured Speartip', 3, 'Allgemein'], ['Ceramite Sentinels', 3, 'Allgemein'], ['Gladius Strike Force', 3, 'Allgemein'],
    ['Stormlance Task Force', 3, 'Allgemein'], ['1st Company Task Force', 2, 'Allgemein'], ['Anvil Siege Force', 2, 'Allgemein'],
    ['Bastion Task Force', 2, 'Allgemein'], ['Firestorm Assault Force', 2, 'Allgemein'], ['Headhunter Task Force', 2, 'Allgemein'],
    ['Ironstorm Spearhead', 2, 'Allgemein'], ['Orbital Assault Force', 2, 'Allgemein'], ['Vanguard Spearhead', 2, 'Allgemein'],
    ['Fulguris Task Force', 1, 'Allgemein'], ['Librarius Conclave', 1, 'Allgemein'], ['Subversion Assets', 1, 'Allgemein'],
    ['Vengeful Hosts', 1, 'Allgemein'], ['Wrath of the Rock', 3, 'Dark Angels'], ['Company of Hunters', 2, 'Dark Angels'],
    ['Inner Circle', 2, 'Dark Angels'], ["Lion's Blade Task Force", 2, 'Dark Angels'], ['Unforgiven Task Force', 2, 'Dark Angels'],
    ['Dark Age Arsenal', 1, 'Dark Angels'], ['Darkflight Pursuit', 1, 'Dark Angels'], ['Interrogation Conclave', 1, 'Dark Angels']
  ],
  armies: [
    {
      id: 'deathwing',
      name: 'Deathwing-Hammer',
      detachments: [{ name: 'Inner Circle', dp: 2 }, { name: 'Interrogation Conclave', dp: 1 }],
      style: ['Elite', 'Zäh', 'Terminatoren'],
      difficulty: 2,
      summary:
        'Eine Wand aus Terminatoren. Deathwing Knights und Terminator-Trupps teleportieren oder fahren im Land Raider ' +
        'ins Zentrum und sind kaum zu entfernen. Wenige Modelle, aber jedes zählt doppelt.',
      plan: [
        'Land Raider mit Deathwing Knights fährt ins Zentrum, ein Terminator-Trupp bleibt in Reserve.',
        'Intercessors und Infernus halten Heimziele.',
        'Runde 2: Teleport-Terminatoren erscheinen am schwächsten Punkt des Gegners.',
        'Belial und Knights binden die stärksten gegnerischen Nahkämpfer.'
      ],
      strengths: ['Extrem widerstandsfähig', 'Einfache, klare Entscheidungen', 'Starke Charaktere'],
      weaknesses: ['Sehr geringe Modellzahl', 'Langsam ohne Teleport/Transport'],
      units: [
        { name: 'Belial', role: 'epic', models: 1, points: 75, leads: 'Deathwing Knights', task: 'Warlord; Großmeister der Deathwing' },
        { name: 'Ezekiel', role: 'epic', models: 1, points: 75, task: 'Psioniker-Unterstützung' },
        { name: 'Librarian in Terminator Armour', role: 'char', models: 1, points: 85, leads: 'Deathwing Terminator Squad', task: 'Schützt den Terminator-Trupp psionisch' },
        { name: 'Chaplain in Terminator Armour', role: 'char', models: 1, points: 75, leads: 'Deathwing Terminator Squad', task: 'Nahkampfbuff für zweiten Terminator-Trupp' },
        { name: 'Intercessor Squad', role: 'line', models: 5, points: 80, qty: 2, task: 'Halten Heim- und Seitenziele' },
        { name: 'Deathwing Knights', role: 'inf', models: 5, points: 240, pointsNext: 260, nextFrom: 3, task: 'Unverwüstlicher Nahkampf-Block' },
        { name: 'Deathwing Terminator Squad', role: 'inf', models: 5, points: 165, qty: 2, task: 'Schocktruppe mit Sturmbolter und Energiewaffen' },
        { name: 'Infernus Squad', role: 'inf', models: 5, points: 85, task: 'Hordenabwehr' },
        { name: 'Redemptor Dreadnought', role: 'veh', models: 1, points: 195, pointsNext: 210, nextFrom: 3, wargear: [['Macro plasma incinerator', 10, 1]], task: 'Feuerunterstützung im Zentrum' },
        { name: 'Ballistus Dreadnought', role: 'veh', models: 1, points: 150, pointsNext: 160, nextFrom: 3, qty: 2, task: 'Panzerabwehr auf Distanz' },
        { name: 'Gladiator Lancer', role: 'veh', models: 1, points: 160, pointsNext: 170, nextFrom: 3, task: 'Panzerabwehr' },
        { name: 'Land Raider', role: 'veh', models: 1, points: 220, pointsNext: 240, nextFrom: 3, task: 'Transportiert die Deathwing Knights' }
      ]
    },
    {
      id: 'ravenwing',
      name: 'Ravenwing-Jagd',
      detachments: [{ name: 'Company of Hunters', dp: 2 }, { name: 'Darkflight Pursuit', dp: 1 }],
      style: ['Schnell', 'Bikes', 'Hit-and-Run'],
      difficulty: 4,
      summary:
        'Sammael führt die Ravenwing an: Black Knights, Outrider und Speeder jagen über das Feld, schießen und schlagen zu, ' +
        'bevor der Gegner reagiert. Eine der schnellsten Space-Marines-Armeen überhaupt.',
      plan: [
        'Scouts und Infiltrators sichern Raum, die Bikes bleiben zunächst in Deckung.',
        'Darkshroud schützt die vorrückenden Bikes vor Beschuss.',
        'Black Knights und Outrider greifen isolierte Einheiten an und nehmen Missionsziele.',
        'Dark Talon und Speeder schalten gegnerische Fahrzeuge aus.'
      ],
      strengths: ['Sehr schnell', 'Viele zähe Bike-Einheiten', 'Gut bei Nebenaufträgen'],
      weaknesses: ['Anspruchsvolle Bewegungsphase', 'Wenig Masse auf Missionszielen'],
      units: [
        { name: 'Sammael', role: 'epic', models: 1, points: 105, task: 'Warlord; Meister der Ravenwing' },
        { name: 'Chaplain on Bike', role: 'char', models: 1, points: 70, qty: 2, leads: 'Ravenwing Black Knights', task: 'Nahkampfbuff für Black Knights' },
        { name: 'Intercessor Squad', role: 'line', models: 5, points: 80, task: 'Hält das Heimziel' },
        { name: 'Scout Squad', role: 'inf', models: 5, points: 65, pointsNext: 75, nextFrom: 3, task: 'Vorab-Bewegung, Missionsziele' },
        { name: 'Infiltrator Squad', role: 'inf', models: 5, points: 110, pointsNext: 120, nextFrom: 3, task: 'Verhindert gegnerische Schocktruppen' },
        { name: 'Inceptor Squad', role: 'inf', models: 3, points: 125, pointsNext: 140, nextFrom: 3, task: 'Schocktruppe mit Feuerkraft' },
        { name: 'Assault Intercessors with Jump Packs', role: 'inf', models: 5, points: 85, pointsNext: 95, nextFrom: 3, task: 'Schnelle Missionsziel-Räuber' },
        { name: 'Ravenwing Black Knights', role: 'mounted', models: 3, points: 75, qty: 3, pointsNext: 85, nextFrom: 3, task: 'Elite-Biker: schießen und zuschlagen' },
        { name: 'Outrider Squad', role: 'mounted', models: 3, points: 70, qty: 2, task: 'Schnelle Angreifer' },
        { name: 'Invader ATV', role: 'mounted', models: 1, points: 60, task: 'Leichte Panzerjagd' },
        { name: 'Ravenwing Darkshroud', role: 'veh', models: 1, points: 70, task: 'Tarnfeld für umliegende Ravenwing-Einheiten' },
        { name: 'Land Speeder Vengeance', role: 'veh', models: 1, points: 130, pointsNext: 140, nextFrom: 3, task: 'Plasma-Feuerunterstützung' },
        { name: 'Ravenwing Dark Talon', role: 'fly', models: 1, points: 200, task: 'Flieger-Jäger und Panzerknacker' },
        { name: 'Gladiator Lancer', role: 'veh', models: 1, points: 160, qty: 2, pointsNext: 170, nextFrom: 3, task: 'Schwere Panzerabwehr' },
        { name: 'Storm Speeder Thunderstrike', role: 'veh', models: 1, points: 135, pointsNext: 145, nextFrom: 3, task: 'Schneller Panzerjäger' }
      ]
    }
  ]
});
