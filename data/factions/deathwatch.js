/* Deathwatch (Space-Marines-Orden, Xenos-Jäger) */
WH40K.registerFaction({
  id: 'deathwatch',
  name: 'Deathwatch',
  aliases: ['Kill Team', 'Watch Fortress', 'Ordo Xenos'],
  group: 'Imperium',
  wahapedia: 'space-marines',
  colors: { primary: '#262626', accent: '#c0c6cc' },
  tagline: 'Die Wacht im Dunkeln – Spezialisten gegen Xenos',
  description:
    'Veteranen aus allen Orden, vereint in gemischten Kill Teams mit Spezialmunition. Die Deathwatch passt ihre ' +
    'Ausrüstung an jeden Gegner an und schlägt chirurgisch präzise zu.',
  playstyle: 'Flexible Elite-Trupps mit Spezialmunition, viele Schocktruppen und Flieger.',
  detachmentNote:
    'Black Spear Task Force ist das eigene Detachment. Deathwatch-Einheiten können auch in allgemeinen Space-Marines-' +
    'Detachments gespielt werden – Details im aktuellen Faction Pack prüfen.',
  detachments: [
    ['Armoured Speartip', 3, 'Allgemein'], ['Ceramite Sentinels', 3, 'Allgemein'], ['Gladius Strike Force', 3, 'Allgemein'],
    ['1st Company Task Force', 2, 'Allgemein'], ['Anvil Siege Force', 2, 'Allgemein'], ['Bastion Task Force', 2, 'Allgemein'],
    ['Firestorm Assault Force', 2, 'Allgemein'], ['Headhunter Task Force', 2, 'Allgemein'], ['Ironstorm Spearhead', 2, 'Allgemein'],
    ['Orbital Assault Force', 2, 'Allgemein'], ['Stormlance Task Force', 2, 'Allgemein'], ['Vanguard Spearhead', 2, 'Allgemein'],
    ['Fulguris Task Force', 1, 'Allgemein'], ['Librarius Conclave', 1, 'Allgemein'], ['Subversion Assets', 1, 'Allgemein'],
    ['Vengeful Hosts', 1, 'Allgemein'], ['Black Spear Task Force', 3, 'Deathwatch']
  ],
  armies: [
    {
      id: 'black-spear',
      name: 'Black Spear – Kill Teams',
      detachments: [{ name: 'Black Spear Task Force', dp: 3 }],
      style: ['Elite', 'Fernkampf', 'Schocktruppen'],
      difficulty: 3,
      summary:
        'Vielseitige Kill Teams mit Spezialmunition, abgesetzt durch Corvus Blackstars. Jeder Trupp kann jede Zielart ' +
        'bekämpfen – die Armee reagiert flexibel auf die gegnerische Aufstellung.',
      plan: [
        'Veteranen-Trupps halten Missionsziele und wählen passende Munition.',
        'Corvus Blackstars fliegen Kill Teams an die Flanken.',
        'Der Terminator-Trupp schlägt per Teleport zu.',
        'Redemptor und Gladiator räumen schwere Ziele ab.'
      ],
      strengths: ['Sehr flexibel gegen jeden Gegner', 'Viele Elite-Schützen', 'Mobil durch Flieger'],
      weaknesses: ['Teuer pro Modell', 'Erfordert Planung und Regelkenntnis'],
      units: [
        { name: 'Watch Master', role: 'char', models: 1, points: 95, leads: 'Deathwatch Veterans (10)', task: 'Warlord; Kommandant der Wacht' },
        { name: 'Watch Captain Artemis', role: 'epic', models: 1, points: 65, task: 'Aggressiver Held mit Stasisbombe' },
        { name: 'Librarian in Terminator Armour', role: 'char', models: 1, points: 85, leads: 'Terminator Squad', task: 'Psionischer Schutz' },
        { name: 'Deathwatch Veterans', role: 'inf', models: 10, points: 190, task: 'Großer Kernblock auf dem Mittelziel' },
        { name: 'Deathwatch Veterans', role: 'inf', models: 5, points: 100, task: 'Flexibler Missionsziel-Trupp' },
        { name: 'Fortis Kill Team', role: 'inf', models: 10, points: 195, qty: 2, pointsNext: 210, nextFrom: 3, task: 'Allround-Kill-Team' },
        { name: 'Spectrus Kill Team', role: 'inf', models: 10, points: 170, pointsNext: 180, nextFrom: 3, task: 'Infiltratoren, Präzisionsschüsse' },
        { name: 'Terminator Squad', role: 'inf', models: 5, points: 160, task: 'Teleport-Angriff' },
        { name: 'Corvus Blackstar', role: 'fly', models: 1, points: 180, qty: 2, task: 'Transportflieger mit Feuerkraft' },
        { name: 'Redemptor Dreadnought', role: 'veh', models: 1, points: 195, pointsNext: 210, nextFrom: 3, wargear: [['Macro plasma incinerator', 10, 1]], loadout: { 'Macro plasma incinerator': 1 }, task: 'Feuerunterstützung' },
        { name: 'Gladiator Lancer', role: 'veh', models: 1, points: 160, pointsNext: 170, nextFrom: 3, task: 'Panzerabwehr' }
      ]
    },
    {
      id: 'headhunter',
      name: 'Kopfjäger – Phobos-Einsatz',
      detachments: [{ name: 'Headhunter Task Force', dp: 2 }, { name: 'Subversion Assets', dp: 1 }],
      style: ['Infiltration', 'Präzision', 'Charakterjagd'],
      difficulty: 4,
      summary:
        'Phobos-Agenten und Veteranen infiltrieren früh, Scharfschützen schalten gegnerische Anführer aus, bevor das ' +
        'eigentliche Gefecht beginnt. Eine taktische Liste für Spieler, die gern Fallen stellen.',
      plan: [
        'Infiltrators, Incursors und Scouts besetzen vorgeschobene Positionen.',
        'Eliminators und Gladiators jagen gegnerische Charaktere und Fahrzeuge.',
        'Deathwatch Veterans halten die Mitte; Corvus bringt Hellblaster an Schlüsselstellen.',
        'Reiver und Scouts erfüllen Nebenaufträge im gegnerischen Raum.'
      ],
      strengths: ['Starke frühe Kontrolle', 'Präzisionswaffen gegen Charaktere', 'Viele Aktivierungen'],
      weaknesses: ['Wenig Nahkampfwucht', 'Einzelne Trupps fragil'],
      units: [
        { name: 'Watch Master', role: 'char', models: 1, points: 95, leads: 'Deathwatch Veterans', task: 'Warlord' },
        { name: 'Captain in Phobos Armour', role: 'char', models: 1, points: 70, leads: 'Infiltrator Squad', task: 'Führt die Infiltratoren' },
        { name: 'Lieutenant in Phobos Armour', role: 'char', models: 1, points: 45, leads: 'Incursor Squad', task: 'Unterstützt die Incursors' },
        { name: 'Deathwatch Veterans', role: 'inf', models: 5, points: 100, qty: 2, task: 'Kernblock und Missionsziele' },
        { name: 'Infiltrator Squad', role: 'inf', models: 5, points: 110, pointsNext: 120, nextFrom: 3, task: 'Verhindert Schocktruppen' },
        { name: 'Incursor Squad', role: 'inf', models: 5, points: 85, pointsNext: 95, nextFrom: 3, task: 'Vorab-Bewegung, Störung' },
        { name: 'Eliminator Squad', role: 'inf', models: 3, points: 75, task: 'Scharfschützen gegen Charaktere' },
        { name: 'Reiver Squad', role: 'inf', models: 5, points: 75, task: 'Nebenaufträge hinter feindlichen Linien' },
        { name: 'Scout Squad', role: 'inf', models: 5, points: 65, qty: 2, pointsNext: 75, nextFrom: 3, task: 'Raumkontrolle' },
        { name: 'Eradicator Squad', role: 'inf', models: 3, points: 90, pointsNext: 100, nextFrom: 3, qty: 2, task: 'Melta gegen Panzer' },
        { name: 'Hellblaster Squad', role: 'inf', models: 5, points: 110, task: 'Plasma-Schocktrupp im Corvus' },
        { name: 'Corvus Blackstar', role: 'fly', models: 1, points: 180, task: 'Transportflieger' },
        { name: 'Gladiator Lancer', role: 'veh', models: 1, points: 160, qty: 2, pointsNext: 170, nextFrom: 3, task: 'Panzerabwehr' },
        { name: 'Repulsor Executioner', role: 'veh', models: 1, points: 230, pointsNext: 250, nextFrom: 3, wargear: [['Heavy laser destroyer', 10, 1]], loadout: { 'Heavy laser destroyer': 1 }, task: 'Schwerer Feuerunterstützer' },
        { name: 'Impulsor', role: 'trans', models: 1, points: 70, pointsNext: 80, nextFrom: 4, task: 'Mobiler Transport für Veteranen' }
      ]
    }
  ]
});
