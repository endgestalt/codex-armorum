/* Tyranids */
WH40K.registerFaction({
  id: 'tyranids',
  name: 'Tyranids',
  aliases: ['Tyraniden', 'Schwarmflotte', 'Hive Fleet', 'Leviathan'],
  group: 'Xenos',
  wahapedia: 'tyranids',
  colors: { primary: '#5a1e6e', accent: '#e6d6b8' },
  tagline: 'Der Große Verschlinger – Schwarmflotten aus dem Nichts',
  description:
    'Außergalaktische Schwarmflotten, gelenkt vom Schwarmbewusstsein. Endlose Ganten-Horden, gigantische Biomonster ' +
    'und Synapsenkreaturen, die den Schwarm koordinieren – alles nur, um Biomasse zu verschlingen.',
  playstyle: 'Von Horde bis Monster-Mash alles möglich. Synapse hält den Schwarm zusammen.',
  detachments: [
    ['Invasion Fleet', 3], ['Subterranean Assault', 3], ['Assimilation Swarm', 2],
    ['Crusher Stampede', 2], ['Synaptic Nexus', 2], ['Unending Swarm', 2],
    ['Vanguard Onslaught', 2], ['Ambush Predators', 1], ['Talons of the Norn Queen', 1],
    ['Warrior Bioform Onslaught', 1]
  ],
  armies: [
    {
      id: 'invasion-fleet',
      name: 'Invasionsflotte',
      detachments: [{ name: 'Invasion Fleet', dp: 3 }],
      style: ['Allround', 'Monster & Horde', 'Synapse'],
      difficulty: 2,
      summary:
        'Ein ausgewogener Schwarm: Termaganten und Hormaganten füllen die Missionsziele, Carnifexe, Tyrannofex und ' +
        'Exocrine liefern Wucht und Feuerkraft, Hive Tyrant und Neurotyrant halten alles in Synapse.',
      plan: [
        'Ganten verteilen sich auf alle Missionsziele und schirmen ab.',
        'Exocrine und Tyrannofex beschießen große Ziele.',
        'Carnifexe und Screamer-Killer stürmen das Zentrum.',
        'Hive Tyrant führt den Hauptangriff in Runde 2.'
      ],
      strengths: ['Sehr flexibel', 'Masse plus Monster', 'Gute Missionszielkontrolle'],
      weaknesses: ['Synapse-Abhängigkeit', 'Ganten sehr zerbrechlich'],
      units: [
        { name: 'Hive Tyrant', role: 'mon', models: 1, points: 195, task: 'Warlord; Synapsen-Monster' },
        { name: 'Neurotyrant', role: 'char', models: 1, points: 130, task: 'Psi-Synapse' },
        { name: 'Winged Tyranid Prime', role: 'char', models: 1, points: 65, leads: 'Tyranid Warriors with Melee Bio-weapons', task: 'Führt Krieger' },
        { name: 'Termagants', role: 'line', models: 10, points: 60, qty: 3, task: 'Missionsziele, Abschirmung' },
        { name: 'Hormagaunts', role: 'line', models: 10, points: 70, qty: 2, task: 'Schnelle Nahkampfhorde' },
        { name: 'Neurogaunts', role: 'inf', models: 11, points: 45, task: 'Synapsen-Begleiter' },
        { name: 'Tyranid Warriors with Melee Bio-weapons', role: 'inf', models: 3, points: 75, qty: 2, task: 'Synapse und Nahkampf' },
        { name: 'Zoanthropes', role: 'inf', models: 3, points: 90, task: 'Psi-Feuer, Schutzschild' },
        { name: "Von Ryan's Leapers", role: 'inf', models: 3, points: 55, task: 'Hinterhalt-Jäger' },
        { name: 'Ripper Swarms', role: 'beast', models: 2, points: 40, task: 'Nebenaufträge' },
        { name: 'Carnifexes', role: 'mon', models: 1, points: 90, qty: 2, task: 'Rammbock-Monster' },
        { name: 'Screamer-Killer', role: 'mon', models: 1, points: 125, pointsNext: 135, nextFrom: 3, task: 'Nahkampf-Monster' },
        { name: 'Psychophage', role: 'mon', models: 1, points: 110, task: 'Psi-Jäger' },
        { name: 'Exocrine', role: 'mon', models: 1, points: 135, pointsNext: 145, nextFrom: 3, task: 'Biokanone' },
        { name: 'Tyrannofex', role: 'mon', models: 1, points: 170, pointsNext: 180, nextFrom: 3, wargear: [['Acid spray', 10, 1, 0, 'Hauptwaffe'], ['Rupture cannon', 20, 1, 0, 'Hauptwaffe']], qty: 2, task: 'Schwere Biokanone' }
      ]
    },
    {
      id: 'subterranean',
      name: 'Untergrund-Angriff',
      detachments: [{ name: 'Subterranean Assault', dp: 3 }],
      style: ['Hinterhalt', 'Schocktruppen', 'Monster'],
      difficulty: 4,
      summary:
        'Trygons, Mawlocs und Raveners graben sich durch den Boden und brechen mitten in der gegnerischen Aufstellung hervor. ' +
        'Lictors und Genestealer lauern im Hinterhalt – der Gegner ist nirgends sicher.',
      plan: [
        'Termaganten und Lictors halten Heim- und Seitenziele.',
        'Trygons und Mawlocs bleiben in Reserve für Runde 2.',
        'Raveners und Genestealer brechen aus dem Boden in Nahkampfreichweite.',
        'Hive Tyrant und Warriors halten die Synapse.'
      ],
      strengths: ['Unberechenbare Schocktruppen', 'Starker Druck im gegnerischen Raum', 'Viele Monster'],
      weaknesses: ['Timing-abhängig', 'Wenig Fernkampf'],
      units: [
        { name: 'Hive Tyrant', role: 'mon', models: 1, points: 195, task: 'Warlord; Synapse' },
        { name: 'Deathleaper', role: 'epic', models: 1, points: 80, task: 'Charakterjäger' },
        { name: 'Broodlord', role: 'char', models: 1, points: 80, leads: 'Genestealers', task: 'Führt die Genestealer' },
        { name: 'Parasite of Mortrex', role: 'char', models: 1, points: 70, task: 'Parasitenträger' },
        { name: 'Termagants', role: 'line', models: 10, points: 60, qty: 2, task: 'Missionsziele' },
        { name: 'Tyranid Warriors with Ranged Bio-weapons', role: 'inf', models: 3, points: 60, task: 'Synapse' },
        { name: 'Genestealers', role: 'inf', models: 10, points: 140, pointsNext: 150, nextFrom: 3, qty: 2, task: 'Hinterhalt-Nahkampf' },
        { name: "Von Ryan's Leapers", role: 'inf', models: 3, points: 55, task: 'Hinterhalt' },
        { name: 'Lictor', role: 'inf', models: 1, points: 60, qty: 2, task: 'Aufklärung, Nebenaufträge' },
        { name: 'Neurolictor', role: 'inf', models: 1, points: 80, pointsNext: 90, nextFrom: 3, task: 'Psi-Lauerer' },
        { name: 'Raveners', role: 'inf', models: 5, points: 125, qty: 2, pointsNext: 135, nextFrom: 3, task: 'Grabende Nahkämpfer' },
        { name: 'Ripper Swarms', role: 'beast', models: 2, points: 40, task: 'Nebenaufträge' },
        { name: 'Trygon', role: 'mon', models: 1, points: 140, qty: 2, task: 'Grabendes Monster' },
        { name: 'Mawloc', role: 'mon', models: 1, points: 135, qty: 2, task: 'Grabendes Monster' }
      ]
    }
  ]
});
