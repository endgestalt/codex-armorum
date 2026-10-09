/* Black Templars (Space-Marines-Orden, ewiger Kreuzzug) */
WH40K.registerFaction({
  id: 'black-templars',
  name: 'Black Templars',
  aliases: ['Kreuzzug', 'Helbrecht', 'Sigismund'],
  group: 'Imperium',
  wahapedia: 'space-marines',
  colors: { primary: '#1c1c1c', accent: '#e8e2d0' },
  tagline: 'Der ewige Kreuzzug – Glaube und Kettenschwert',
  description:
    'Fanatische Kreuzritter, die Psioniker verabscheuen und den Nahkampf suchen. Ihre Crusader Squads mischen ' +
    'Neophyten mit Veteranen, ihre Land Raider bringen die Sword Brethren mitten in den Feind.',
  playstyle: 'Aggressiver Nahkampf zu Fuß oder im Land Raider. Nutzt alle Space-Marines-Einheiten (ohne Psioniker) plus eigene.',
  detachmentNote: 'Allgemeine Space-Marines-Detachments sind mit den für diesen Orden gültigen DP-Kosten aufgeführt.',
  detachments: [
    ['Armoured Speartip', 3, 'Allgemein'], ['Bastion Task Force', 3, 'Allgemein'], ['Ceramite Sentinels', 3, 'Allgemein'],
    ['Gladius Strike Force', 3, 'Allgemein'], ['Anvil Siege Force', 2, 'Allgemein'], ['Firestorm Assault Force', 2, 'Allgemein'],
    ['Headhunter Task Force', 2, 'Allgemein'], ['Ironstorm Spearhead', 2, 'Allgemein'], ['Orbital Assault Force', 2, 'Allgemein'],
    ['Stormlance Task Force', 2, 'Allgemein'], ['Vanguard Spearhead', 2, 'Allgemein'], ['Fulguris Task Force', 1, 'Allgemein'],
    ['Subversion Assets', 1, 'Allgemein'], ['Vengeful Hosts', 1, 'Allgemein'], ['Companions of Vehemence', 2, 'Black Templars'],
    ['Godhammer Assault Force', 2, 'Black Templars'], ['Vindication Task Force', 2, 'Black Templars'], ["Marshal's Household", 1, 'Black Templars'],
    ['The Living Miracle', 1, 'Black Templars'], ['Wrathful Procession', 1, 'Black Templars']
  ],
  armies: [
    {
      id: 'crusade',
      name: 'Kreuzzug zu Fuß',
      detachments: [{ name: 'Vindication Task Force', dp: 2 }, { name: 'Wrathful Procession', dp: 1 }],
      style: ['Nahkampf', 'Infanterie', 'Druck'],
      difficulty: 2,
      summary:
        'Große Crusader Squads marschieren mit Charakteren gemeinsam übers Feld und überrollen den Gegner im Nahkampf. ' +
        'Einfach zu spielen, sehr thematisch und mit viel Druck über das ganze Spiel.',
      plan: [
        'Crusader Squads mit Helbrecht und Grimaldus rücken im Zentrum vor.',
        'Impulsoren bringen Bladeguard und Sword Brethren an die Flanken.',
        'Redemptor und Gladiator schalten gegnerische Fahrzeuge aus.',
        'Ab Runde 2 alle Nahkampfeinheiten gleichzeitig angreifen lassen.'
      ],
      strengths: ['Viele harte Nahkampfeinheiten', 'Gute Charakter-Synergien', 'Einfacher Spielplan'],
      weaknesses: ['Anfällig für Beschuss auf dem Weg', 'Wenig Mobilität ohne Transporter'],
      units: [
        { name: 'High Marshal Helbrecht', role: 'epic', models: 1, points: 110, leads: 'Crusader Squad', task: 'Warlord; Herr des Kreuzzugs' },
        { name: 'Chaplain Grimaldus', role: 'epic', models: 4, points: 100, leads: 'Crusader Squad', task: 'Glaubensführer, Nahkampfbuff' },
        { name: "Emperor's Champion", role: 'char', models: 1, points: 90, task: 'Duellant gegen gegnerische Charaktere' },
        { name: 'Marshal', role: 'char', models: 1, points: 80, pointsNext: 90, nextFrom: 3, leads: 'Sword Brethren Squad', task: 'Führt die Elite-Veteranen' },
        { name: 'Castellan', role: 'char', models: 1, points: 70, leads: 'Infernus Squad', task: 'Unterstützt den Infernus-Trupp' },
        { name: 'Crusader Squad', role: 'inf', models: 10, points: 150, qty: 2, task: 'Großer Nahkampfblock mit Charakter' },
        { name: 'Sword Brethren Squad', role: 'inf', models: 5, points: 125, pointsNext: 145, nextFrom: 3, task: 'Elite-Nahkämpfer' },
        { name: 'Bladeguard Veteran Squad', role: 'inf', models: 3, points: 80, qty: 2, pointsNext: 90, nextFrom: 3, task: 'Zähe Schildträger' },
        { name: 'Infernus Squad', role: 'inf', models: 5, points: 85, task: 'Hordenabwehr am Heimziel' },
        { name: 'Redemptor Dreadnought', role: 'veh', models: 1, points: 195, pointsNext: 210, nextFrom: 3, wargear: [['Macro plasma incinerator', 10, 1]], task: 'Feuerkraft und Nahkampf' },
        { name: 'Gladiator Lancer', role: 'veh', models: 1, points: 160, pointsNext: 170, nextFrom: 3, qty: 2, task: 'Panzerabwehr' },
        { name: 'Land Raider Crusader', role: 'veh', models: 1, points: 220, pointsNext: 240, nextFrom: 3, task: 'Transport für Sword Brethren' },
        { name: 'Impulsor', role: 'trans', models: 1, points: 70, qty: 2, pointsNext: 80, nextFrom: 4, task: 'Schnelle Transporter für Bladeguard' }
      ]
    },
    {
      id: 'godhammer',
      name: 'Godhammer-Panzerzug',
      detachments: [{ name: 'Godhammer Assault Force', dp: 2 }, { name: "Marshal's Household", dp: 1 }],
      style: ['Panzer', 'Sturmtransport', 'Elite'],
      difficulty: 3,
      summary:
        'Drei Land Raider rollen als stählerne Kathedralen übers Feld und entladen Terminatoren und Sword Brethren direkt ' +
        'vor dem Feind. Wenige, aber extrem harte Ziele – für viele Gegner schwer zu knacken.',
      plan: [
        'Land Raider fahren in Runde 1 sicher vor und nutzen Gelände.',
        'Runde 2: Aussteigen und angreifen mit Terminatoren, Sword Brethren, Crusader Squad.',
        'Die leeren Land Raider kämpfen als schwere Feuerunterstützung weiter.',
        'Intercessors und Gladiator sichern den eigenen Bereich.'
      ],
      strengths: ['Sehr harte Ziele', 'Geschützte Infanterie bis zum Angriff', 'Hohe Feuerkraft der Panzer'],
      weaknesses: ['Sehr wenige Einheiten', 'Anfällig gegen spezialisierte Panzerabwehr'],
      units: [
        { name: 'Marshal', role: 'char', models: 1, points: 80, pointsNext: 90, nextFrom: 3, qty: 2, leads: 'Crusader Squad', task: 'Warlord; führt die Elite' },
        { name: "Emperor's Champion", role: 'char', models: 1, points: 90, task: 'Charakterjäger' },
        { name: 'Chaplain in Terminator Armour', role: 'char', models: 1, points: 75, leads: 'Terminator Squad', task: 'Nahkampfbuff für Terminatoren' },
        { name: 'Castellan', role: 'char', models: 1, points: 70, leads: 'Crusader Squad', task: 'Führt einen Crusader Squad' },
        { name: 'Intercessor Squad', role: 'line', models: 5, points: 80, task: 'Hält das Heimziel' },
        { name: 'Crusader Squad', role: 'inf', models: 10, points: 150, qty: 2, task: 'Fahren im Land Raider nach vorne' },
        { name: 'Sword Brethren Squad', role: 'inf', models: 5, points: 125, pointsNext: 145, nextFrom: 3, task: 'Elite im Land Raider Crusader' },
        { name: 'Terminator Squad', role: 'inf', models: 5, points: 160, task: 'Im Land Raider Redeemer' },
        { name: 'Bladeguard Veteran Squad', role: 'inf', models: 3, points: 80, pointsNext: 90, nextFrom: 3, task: 'Heimverteidigung' },
        { name: 'Land Raider Crusader', role: 'veh', models: 1, points: 220, qty: 2, pointsNext: 240, nextFrom: 3, task: 'Sturmtransporter mit Hurricane-Boltern' },
        { name: 'Land Raider Redeemer', role: 'veh', models: 1, points: 260, pointsNext: 280, nextFrom: 3, task: 'Flammen-Panzer für Nahdistanz' },
        { name: 'Gladiator Lancer', role: 'veh', models: 1, points: 160, pointsNext: 170, nextFrom: 3, task: 'Panzerabwehr' }
      ]
    }
  ]
});
