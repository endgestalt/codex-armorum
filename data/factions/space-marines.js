/* Space Marines (Codex-Orden, z. B. Ultramarines, Imperial Fists, Salamanders) */
WH40K.registerFaction({
  id: 'space-marines',
  name: 'Space Marines',
  aliases: ['Adeptus Astartes', 'Ultramarines', 'Imperial Fists', 'Salamanders', 'Iron Hands', 'Raven Guard', 'White Scars'],
  group: 'Imperium',
  wahapedia: 'space-marines',
  colors: { primary: '#1f4fa3', accent: '#d9b552' },
  tagline: 'Die Engel des Todes – Elite für jede Lage',
  description:
    'Genetisch verbesserte Supersoldaten in Servorüstung. Space Marines haben die größte Modellauswahl im Spiel und ' +
    'können fast jede Spielweise abbilden – von zäher Infanterie über Panzerkolonnen bis zu schnellen Bike-Armeen.',
  playstyle: 'Verzeihend, vielseitig, gut für Einsteiger. Wenige, aber widerstandsfähige Modelle.',
  detachmentNote: 'Ordensspezifische Detachments (Ultramarines, White Scars …) dürfen nur von Armeen dieses Ordens gewählt werden.',
  detachments: [
    ['Armoured Speartip', 3, 'Allgemein'], ['Ceramite Sentinels', 3, 'Allgemein'], ['Gladius Strike Force', 3, 'Allgemein'],
    ['Stormlance Task Force', 3, 'Allgemein'], ['1st Company Task Force', 2, 'Allgemein'], ['Anvil Siege Force', 2, 'Allgemein'],
    ['Bastion Task Force', 2, 'Allgemein'], ['Firestorm Assault Force', 2, 'Allgemein'], ['Headhunter Task Force', 2, 'Allgemein'],
    ['Ironstorm Spearhead', 2, 'Allgemein'], ['Orbital Assault Force', 2, 'Allgemein'], ['Vanguard Spearhead', 2, 'Allgemein'],
    ['Fulguris Task Force', 1, 'Allgemein'], ['Librarius Conclave', 1, 'Allgemein'], ['Subversion Assets', 1, 'Allgemein'],
    ['Vengeful Hosts', 1, 'Allgemein'], ["Emperor's Shield", 2, 'Imperial Fists'], ['Hammer of Avernii', 2, 'Iron Hands'],
    ['Shadowmark Talon', 2, 'Raven Guard'], ["Forgefather's Seekers", 2, 'Salamanders'], ['Blade of Ultramar', 3, 'Ultramarines'],
    ['Reclamation Force', 2, 'Ultramarines'], ['Spearpoint Task Force', 2, 'White Scars']
  ],
  armies: [
    {
      id: 'gladius',
      name: 'Gladius-Schlachtlinie',
      detachments: [{ name: 'Gladius Strike Force', dp: 3 }],
      style: ['Allround', 'Combined Arms'],
      difficulty: 2,
      summary:
        'Klassische, ausgewogene Armee: zähe Primaris-Infanterie hält die Missionsziele, Dreadnoughts und Panzer liefern ' +
        'Feuerkraft, Terminatoren schlagen dort zu, wo der Gegner am stärksten ist. Verzeiht Fehler und lehrt alle Spielphasen.',
      plan: [
        'Intercessors und Scouts besetzen früh das eigene und die mittleren Missionsziele.',
        'Gladiator Lancer, Repulsor Executioner und Hellblaster bekämpfen Fahrzeuge und Monster aus der Distanz.',
        'Terminatoren mit Captain, Redemptor und Venerable Dreadnought drücken über die Mitte nach vorne.',
        'Ab Runde 3 Infernus und Impulsor-Trupp für Gegenstöße und späte Missionsziele nutzen.'
      ],
      strengths: ['Sehr robust und fehlertolerant', 'Antworten auf fast jede Bedrohung', 'Einfach zu lernen, viele Modelle im Starterset'],
      weaknesses: ['In keiner Disziplin herausragend', 'Wenige Modelle – Missionsziele können knapp werden'],
      units: [
        { name: 'Captain in Terminator Armour', role: 'char', models: 1, points: 85, leads: 'Terminator Squad', task: 'Warlord; verstärkt die Terminatoren im Zentrum' },
        { name: 'Lieutenant', role: 'char', models: 1, points: 45, leads: 'Intercessor Squad (10)', task: 'Macht den großen Intercessor-Trupp tödlicher' },
        { name: 'Intercessor Squad', role: 'line', models: 10, points: 150, task: 'Hält das zentrale Missionsziel, solide Bolter-Feuerkraft' },
        { name: 'Intercessor Squad', role: 'line', models: 5, points: 80, task: 'Fährt im Impulsor zu späten Missionszielen' },
        { name: 'Scout Squad', role: 'inf', models: 5, points: 65, pointsNext: 75, nextFrom: 3, task: 'Infiltriert, blockt Aufstellungsräume, nimmt Missionsziele' },
        { name: 'Terminator Squad', role: 'inf', models: 5, points: 160, task: 'Zäher Amboss im Zentrum, per Teleport auch Schocktruppe' },
        { name: 'Hellblaster Squad', role: 'inf', models: 5, points: 110, task: 'Plasma gegen Elite-Infanterie und leichte Fahrzeuge' },
        { name: 'Infernus Squad', role: 'inf', models: 5, points: 85, task: 'Flammenwerfer gegen Horden, schützt vor Nahkampf-Ansturm' },
        { name: 'Eradicator Squad', role: 'inf', models: 3, points: 90, pointsNext: 100, nextFrom: 3, task: 'Melta-Panzerjäger auf mittlere Distanz' },
        { name: 'Redemptor Dreadnought', role: 'veh', models: 1, points: 195, pointsNext: 210, nextFrom: 3, wargear: [['Macro plasma incinerator', 10, 1]], task: 'Feuerstarker Läufer, auch im Nahkampf gefährlich' },
        { name: 'Venerable Dreadnought', role: 'veh', models: 1, points: 165, task: 'Zäher Läufer für Gegenangriffe' },
        { name: 'Ballistus Dreadnought', role: 'veh', models: 1, points: 150, pointsNext: 160, nextFrom: 3, task: 'Lascannon/Raketen gegen schwere Ziele' },
        { name: 'Gladiator Lancer', role: 'veh', models: 1, points: 160, pointsNext: 170, nextFrom: 3, task: 'Panzerjäger mit Lancer-Laserkanone' },
        { name: 'Repulsor Executioner', role: 'veh', models: 1, points: 255, pointsNext: 275, nextFrom: 3, wargear: [['Heavy laser destroyer', 10, 1]], task: 'Schwerer Antigravpanzer, Allzweckfeuerkraft' },
        { name: 'Impulsor', role: 'trans', models: 1, points: 70, pointsNext: 80, nextFrom: 4, task: 'Schneller Transporter für den 5er-Intercessor-Trupp' },
        { name: 'Invader ATV', role: 'mounted', models: 1, points: 60, task: 'Schneller Missionsziel-Jäger, erfüllt Nebenaufträge' },
        { name: 'Captain with Jump Pack', role: 'char', models: 1, points: 75, task: 'Warlord; Kopf des Sprungangriffs' }
      ]
    },
    {
      id: 'stormlance',
      name: 'Sturmlanze – Blitzangriff',
      detachments: [{ name: 'Stormlance Task Force', dp: 3 }],
      style: ['Schnell', 'Mobil', 'Nahkampf-Hit-and-Run'],
      difficulty: 4,
      summary:
        'Alles hat Bikes, Sprungmodule oder Antigravantrieb. Die Armee überflutet das Spielfeld, schlägt präzise zu und zieht ' +
        'sich wieder zurück. Belohnt sauberes Bewegen und das Lesen der Missionsziele – verzeiht aber weniger.',
      plan: [
        'Scouts und Infiltrators sichern früh Raum, Outrider und ATV stehen bereit für Runde 1.',
        'Storm Speeder und Gladiators eröffnen Feuer auf die gefährlichsten Fahrzeuge.',
        'Sprungtruppen mit Captain schlagen auf geschwächte Ziele ein und blockieren gegnerische Bewegung.',
        'Schnelle Einheiten sammeln in Runde 4–5 die Missionsziele am Rand ein.'
      ],
      strengths: ['Extrem hohe Mobilität', 'Kann Missionsziele überall erreichen', 'Viele Aktivierungen für Nebenaufträge'],
      weaknesses: ['Einheiten einzeln eher fragil', 'Fehler in der Bewegung werden hart bestraft'],
      units: [
        { name: 'Captain with Jump Pack', role: 'char', models: 1, points: 75, leads: 'Assault Intercessors with Jump Packs', task: 'Warlord; Kopf des Sprungangriffs' },
        { name: 'Chaplain on Bike', role: 'char', models: 1, points: 70, leads: 'Outrider Squad', task: 'Macht die Outrider im Nahkampf brutal' },
        { name: 'Lieutenant with Combi-weapon', role: 'char', models: 1, points: 95, task: 'Eigenständiger Charakter, begleitet die Vorposten' },
        { name: 'Intercessor Squad', role: 'line', models: 5, points: 80, task: 'Hält das Heim-Missionsziel' },
        { name: 'Scout Squad', role: 'inf', models: 5, points: 65, pointsNext: 75, nextFrom: 3, task: 'Vorab-Bewegung, Raum verweigern' },
        { name: 'Infiltrator Squad', role: 'inf', models: 5, points: 110, pointsNext: 120, nextFrom: 3, task: 'Verhindert Schocktruppen in der Nähe, hält Mitte' },
        { name: 'Assault Intercessors with Jump Packs', role: 'inf', models: 5, points: 85, qty: 2, pointsNext: 95, nextFrom: 3, task: 'Schnelle Nahkampf-Schläge auf Missionszielhalter' },
        { name: 'Vanguard Veteran Squad with Jump Packs', role: 'inf', models: 5, points: 105, pointsNext: 115, nextFrom: 3, task: 'Elite-Nahkampf, binden schwere Einheiten' },
        { name: 'Inceptor Squad', role: 'inf', models: 3, points: 125, pointsNext: 140, nextFrom: 3, task: 'Schocktruppen-Feuerkraft auf Infanterie' },
        { name: 'Suppressor Squad', role: 'inf', models: 3, points: 85, task: 'Unterdrückungsfeuer, Nebenaufträge' },
        { name: 'Outrider Squad', role: 'mounted', models: 3, points: 70, qty: 2, task: 'Schnelle Angreifer und Missionsziel-Räuber' },
        { name: 'Invader ATV', role: 'mounted', models: 1, points: 60, task: 'Leichte Panzerjagd mit Multimelta' },
        { name: 'Storm Speeder Thunderstrike', role: 'veh', models: 1, points: 135, pointsNext: 145, nextFrom: 3, task: 'Panzerjäger mit hoher Reichweite' },
        { name: 'Storm Speeder Hailstrike', role: 'veh', models: 1, points: 105, pointsNext: 115, nextFrom: 3, task: 'Masse an Schüssen gegen Infanterie' },
        { name: 'Storm Speeder Hammerstrike', role: 'veh', models: 1, points: 140, pointsNext: 150, nextFrom: 3, task: 'Melta-Raketen gegen schwere Ziele' },
        { name: 'Gladiator Lancer', role: 'veh', models: 1, points: 160, qty: 2, pointsNext: 170, nextFrom: 3, task: 'Schwere Panzerabwehr aus der Bewegung' },
        { name: 'Impulsor', role: 'trans', models: 1, points: 70, pointsNext: 80, nextFrom: 4, task: 'Bringt Intercessors bei Bedarf nach vorne' }
      ]
    }
  ]
});
