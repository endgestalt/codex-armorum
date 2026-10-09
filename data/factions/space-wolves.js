/* Space Wolves (Space-Marines-Orden mit eigenen Detachments) */
WH40K.registerFaction({
  id: 'space-wolves',
  name: 'Space Wolves',
  aliases: ['Vlka Fenryka', 'Leman Russ', 'Fenris'],
  group: 'Imperium',
  wahapedia: 'space-marines',
  colors: { primary: '#5b7d96', accent: '#e0c27a' },
  tagline: 'Die Wölfe von Fenris – Sagas und Donnerwölfe',
  description:
    'Wilde, stolze Krieger, die auf riesigen Donnerwölfen reiten und ihre Taten in Sagas besingen. ' +
    'Space Wolves kombinieren Space-Marines-Zähigkeit mit aggressivem Nahkampf und starken Charakteren.',
  playstyle: 'Nahkampflastig mit starken Helden. Nutzt alle Space-Marines-Einheiten plus eigene.',
  detachmentNote: 'Allgemeine Space-Marines-Detachments sind mit den für diesen Orden gültigen DP-Kosten aufgeführt.',
  detachments: [
    ['Armoured Speartip', 3, 'Allgemein'], ['Ceramite Sentinels', 3, 'Allgemein'], ['Gladius Strike Force', 3, 'Allgemein'],
    ['Stormlance Task Force', 3, 'Allgemein'], ['1st Company Task Force', 2, 'Allgemein'], ['Anvil Siege Force', 2, 'Allgemein'],
    ['Bastion Task Force', 2, 'Allgemein'], ['Firestorm Assault Force', 2, 'Allgemein'], ['Headhunter Task Force', 2, 'Allgemein'],
    ['Ironstorm Spearhead', 2, 'Allgemein'], ['Orbital Assault Force', 2, 'Allgemein'], ['Vanguard Spearhead', 2, 'Allgemein'],
    ['Fulguris Task Force', 1, 'Allgemein'], ['Librarius Conclave', 1, 'Allgemein'], ['Subversion Assets', 1, 'Allgemein'],
    ['Vengeful Hosts', 1, 'Allgemein'], ['Saga of the Beastslayer', 2, 'Space Wolves'], ['Saga of the Bold', 2, 'Space Wolves'],
    ['Saga of the Great Wolf', 2, 'Space Wolves'], ['Saga of the Hunter', 2, 'Space Wolves'], ['Champions of Fenris', 1, 'Space Wolves'],
    ['Legends of Saga and Song', 1, 'Space Wolves'], ['Veterans of the Fang', 1, 'Space Wolves']
  ],
  armies: [
    {
      id: 'thunderwolves',
      name: 'Donnerwolf-Sturm',
      detachments: [{ name: 'Saga of the Bold', dp: 2 }, { name: 'Champions of Fenris', dp: 1 }],
      style: ['Nahkampf', 'Kavallerie', 'Heldenfokus'],
      difficulty: 3,
      summary:
        'Thunderwolf Cavalry und Ragnar Blackmane stürmen nach vorn, gestützt von Wolf Guard und Blood Claws. ' +
        'Die Helden erfüllen ihre Sagas, indem sie gegnerische Champions im Zweikampf niederstrecken.',
      plan: [
        'Fenrisian Wolves und Intercessors besetzen Missionsziele und schirmen ab.',
        'Thunderwolves mit Wolf Lord greifen ab Runde 2 die Flanke an.',
        'Ragnar mit Blood Claws und Arjac mit Terminatoren drücken das Zentrum.',
        'Redemptor und Gladiator liefern Fernkampf-Unterstützung.'
      ],
      strengths: ['Sehr starker Nahkampf', 'Schnelle, zähe Kavallerie', 'Viele Heldenoptionen'],
      weaknesses: ['Fernkampf eher dünn', 'Teure Schlüsseleinheiten'],
      units: [
        { name: 'Ragnar Blackmane', role: 'epic', models: 1, points: 90, leads: 'Blood Claws', task: 'Warlord; Speerspitze des Angriffs' },
        { name: 'Arjac Rockfist', role: 'epic', models: 1, points: 95, leads: 'Wolf Guard Terminators', task: 'Unverwüstlicher Terminator-Held' },
        { name: 'Murderfang', role: 'epic', models: 1, points: 150, task: 'Wahnsinniger Nahkampf-Dreadnought' },
        { name: 'Wolf Lord on Thunderwolf', role: 'char', models: 1, points: 100, leads: 'Thunderwolf Cavalry', task: 'Führt die Kavallerie an' },
        { name: 'Wolf Priest', role: 'char', models: 1, points: 70, leads: 'Wolf Guard Headtakers', task: 'Schützt und stärkt die Headtakers' },
        { name: 'Intercessor Squad', role: 'line', models: 5, points: 80, qty: 2, task: 'Halten Heimziele' },
        { name: 'Blood Claws', role: 'inf', models: 10, points: 135, task: 'Junge, wilde Angriffswelle' },
        { name: 'Wolf Guard Headtakers', role: 'inf', models: 6, points: 170, pointsNext: 180, nextFrom: 3, task: 'Elite-Jäger mit hohem Schaden' },
        { name: 'Wolf Guard Terminators', role: 'inf', models: 5, points: 155, pointsNext: 195, nextFrom: 3, wargear: [['Storm Shield', 5, 5]], task: 'Zäher Kern im Zentrum' },
        { name: 'Thunderwolf Cavalry', role: 'mounted', models: 3, points: 100, qty: 2, pointsNext: 130, nextFrom: 3, wargear: [['Storm Shield', 5, 3]], task: 'Schnelle, zähe Nahkampf-Kavallerie' },
        { name: 'Fenrisian Wolves', role: 'beast', models: 5, points: 45, qty: 2, pointsNext: 50, nextFrom: 3, task: 'Günstige Abschirmer und Missionsziel-Jäger' },
        { name: 'Redemptor Dreadnought', role: 'veh', models: 1, points: 195, pointsNext: 210, nextFrom: 3, wargear: [['Macro plasma incinerator', 10, 1]], loadout: { 'Macro plasma incinerator': 1 }, task: 'Feuerkraft im Zentrum' },
        { name: 'Gladiator Lancer', role: 'veh', models: 1, points: 160, pointsNext: 170, nextFrom: 3, task: 'Panzerabwehr' },
        { name: 'Land Raider Crusader', role: 'veh', models: 1, points: 220, pointsNext: 240, nextFrom: 3, task: 'Transport für Blood Claws + Ragnar' }
      ]
    },
    {
      id: 'great-wolf',
      name: 'Garde des Großen Wolfs',
      detachments: [{ name: 'Saga of the Great Wolf', dp: 2 }, { name: 'Veterans of the Fang', dp: 1 }],
      style: ['Elite', 'Zäh', 'Terminatoren & Panzer'],
      difficulty: 2,
      summary:
        'Logan Grimnar führt die Veteranen der Wolf Guard in Terminator-Rüstung, unterstützt von Bjorn und schwerer ' +
        'Panzerung. Langsamer, aber sehr standfest – eine Wand aus grauem Ceramit.',
      plan: [
        'Long Fangs, Ballistus und Repulsor beschießen gegnerische Panzer aus der Deckung.',
        'Logan mit Wolf Guard Terminators teleportiert oder läuft ins Zentrum.',
        'Zweiter Terminator-Trupp im Land Raider kontert gegnerische Vorstöße.',
        'Intercessors und Scouts übernehmen Nebenaufträge.'
      ],
      strengths: ['Sehr robuste Einheiten', 'Gute Mischung aus Fern- und Nahkampf', 'Logan als starker Warlord'],
      weaknesses: ['Wenige Modelle', 'Begrenzte Geschwindigkeit'],
      units: [
        { name: 'Logan Grimnar', role: 'epic', models: 1, points: 100, leads: 'Wolf Guard Terminators', task: 'Warlord; Herr von Fenris' },
        { name: 'Bjorn the Fell-Handed', role: 'epic', models: 1, points: 160, task: 'Legendärer Dreadnought, extrem zäh' },
        { name: 'Wolf Guard Battle Leader in Terminator Armour', role: 'char', models: 1, points: 75, leads: 'Wolf Guard Terminators', task: 'Führt den zweiten Terminator-Trupp' },
        { name: 'Librarian', role: 'char', models: 1, points: 70, pointsNext: 80, nextFrom: 3, task: 'Runenpriester – psionische Unterstützung' },
        { name: 'Iron Priest', role: 'char', models: 1, points: 50, task: 'Repariert Fahrzeuge und Bjorn' },
        { name: 'Intercessor Squad', role: 'line', models: 10, points: 150, task: 'Großer Missionsziel-Halter' },
        { name: 'Intercessor Squad', role: 'line', models: 5, points: 80, qty: 2, task: 'Heimziel' },
        { name: 'Scout Squad', role: 'inf', models: 5, points: 65, pointsNext: 75, nextFrom: 3, task: 'Nebenaufträge' },
        { name: 'Wolf Guard Terminators', role: 'inf', models: 5, points: 155, qty: 2, pointsNext: 195, nextFrom: 3, wargear: [['Storm Shield', 5, 5]], task: 'Elite-Kern der Armee' },
        { name: 'Hellblaster Squad', role: 'inf', models: 5, points: 110, task: 'Plasma gegen Elite' },
        { name: 'Long Fangs', role: 'inf', models: 5, points: 120, task: 'Schwere Waffen aus der Distanz' },
        { name: 'Ballistus Dreadnought', role: 'veh', models: 1, points: 150, pointsNext: 160, nextFrom: 3, task: 'Panzerabwehr' },
        { name: 'Repulsor Executioner', role: 'veh', models: 1, points: 230, pointsNext: 250, nextFrom: 3, wargear: [['Heavy laser destroyer', 10, 1]], loadout: { 'Heavy laser destroyer': 1 }, task: 'Schwerer Feuerunterstützer' },
        { name: 'Land Raider', role: 'veh', models: 1, points: 220, pointsNext: 240, nextFrom: 3, task: 'Transport für Terminatoren' }
      ]
    }
  ]
});
