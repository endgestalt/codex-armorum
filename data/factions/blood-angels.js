/* Blood Angels (Space-Marines-Orden mit eigenen Detachments) */
WH40K.registerFaction({
  id: 'blood-angels',
  name: 'Blood Angels',
  aliases: ['Death Company', 'Sanguinius'],
  group: 'Imperium',
  wahapedia: 'space-marines',
  colors: { primary: '#9b111e', accent: '#e3c26a' },
  tagline: 'Engelsgleiche Krieger mit dem Fluch des Roten Durstes',
  description:
    'Die Söhne des Sanguinius kämpfen am liebsten mit Sprungmodulen und Kettenschwertern. Ihr genetischer Fluch – ' +
    'Roter Durst und Schwarzer Zorn – macht sie im Nahkampf zu den gefährlichsten Space Marines.',
  playstyle: 'Aggressiv, nahkampforientiert, schnelle Sprungtruppen. Nutzt alle Space-Marines-Einheiten plus eigene.',
  detachmentNote: 'Allgemeine Space-Marines-Detachments sind mit den für diesen Orden gültigen DP-Kosten aufgeführt.',
  detachments: [
    ['Armoured Speartip', 3, 'Allgemein'], ['Ceramite Sentinels', 3, 'Allgemein'], ['Gladius Strike Force', 3, 'Allgemein'],
    ['1st Company Task Force', 2, 'Allgemein'], ['Anvil Siege Force', 2, 'Allgemein'], ['Bastion Task Force', 2, 'Allgemein'],
    ['Firestorm Assault Force', 2, 'Allgemein'], ['Headhunter Task Force', 2, 'Allgemein'], ['Ironstorm Spearhead', 2, 'Allgemein'],
    ['Orbital Assault Force', 2, 'Allgemein'], ['Stormlance Task Force', 2, 'Allgemein'], ['Vanguard Spearhead', 2, 'Allgemein'],
    ['Fulguris Task Force', 1, 'Allgemein'], ['Librarius Conclave', 1, 'Allgemein'], ['Subversion Assets', 1, 'Allgemein'],
    ['Vengeful Hosts', 1, 'Allgemein'], ['Angelic Inheritors', 3, 'Blood Angels'], ['Liberator Assault Group', 3, 'Blood Angels'],
    ['Rage-cursed Onslaught', 3, 'Blood Angels'], ['The Angelic Host', 2, 'Blood Angels'], ['The Lost Brethren', 2, 'Blood Angels'],
    ['Encarmine Speartip', 1, 'Blood Angels'], ['Legacy of Grace', 1, 'Blood Angels'], ['Wrath of the Doomed', 1, 'Blood Angels']
  ],
  armies: [
    {
      id: 'angelic-host',
      name: 'Engelsschwarm – Sprungangriff',
      detachments: [{ name: 'The Angelic Host', dp: 2 }, { name: 'Encarmine Speartip', dp: 1 }],
      style: ['Schnell', 'Nahkampf', 'Schocktruppen'],
      difficulty: 3,
      summary:
        'Commander Dante und die Sanguinary Guard führen eine Welle aus Sprungtruppen an. Die Armee überspringt Gelände, ' +
        'landet aus der Reserve und zerlegt gezielt die Schlüsseleinheiten des Gegners.',
      plan: [
        'Fahrzeuge und Intercessors sichern Heim- und Mittelziele.',
        'Sprungtruppen bleiben teils in Reserve, um Lücken des Gegners zu bestrafen.',
        'Dante + Sanguinary Guard greifen das wichtigste Ziel in Runde 2 an.',
        'Death Company mit Chaplain räumt Missionsziele im gegnerischen Bereich.'
      ],
      strengths: ['Hohe Bewegungsreichweite über Gelände', 'Sehr starke Nahkampfcharaktere', 'Flexibler Reserveeinsatz'],
      weaknesses: ['Teure Elite – wenige Modelle', 'Leidet gegen massiven Beschuss in Runde 1'],
      units: [
        { name: 'Commander Dante', role: 'epic', models: 1, points: 125, leads: 'Sanguinary Guard', task: 'Warlord; tödlicher Nahkämpfer mit Sprungmodul' },
        { name: 'Sanguinary Priest', role: 'char', models: 1, points: 75, pointsNext: 85, nextFrom: 3, leads: 'Infernus Squad', task: 'Verstärkt Nahkampftrupps, heilt' },
        { name: 'Chaplain with Jump Pack', role: 'char', models: 1, points: 80, leads: 'Death Company Marines with Jump Packs', task: 'Führt die Death Company an' },
        { name: 'Intercessor Squad', role: 'line', models: 5, points: 80, qty: 2, task: 'Halten Missionsziele, einer im Impulsor' },
        { name: 'Sanguinary Guard', role: 'inf', models: 3, points: 120, qty: 2, pointsNext: 140, nextFrom: 3, task: 'Elite-Leibwache mit Sprungmodulen' },
        { name: 'Death Company Marines with Jump Packs', role: 'inf', models: 5, points: 115, pointsNext: 130, nextFrom: 3, task: 'Rasende Angriffstruppe' },
        { name: 'Assault Intercessors with Jump Packs', role: 'inf', models: 5, points: 95, qty: 2, pointsNext: 105, nextFrom: 3, task: 'Günstige Sprungtruppe für Missionsziele' },
        { name: 'Vanguard Veteran Squad with Jump Packs', role: 'inf', models: 5, points: 110, pointsNext: 120, nextFrom: 3, task: 'Bindet und zerschlägt schwere Infanterie' },
        { name: 'Inceptor Squad', role: 'inf', models: 3, points: 125, pointsNext: 140, nextFrom: 3, task: 'Feuerunterstützung aus der Reserve' },
        { name: 'Infernus Squad', role: 'inf', models: 5, points: 85, task: 'Hordenabwehr am eigenen Missionsziel' },
        { name: 'Baal Predator', role: 'veh', models: 1, points: 125, qty: 2, pointsNext: 135, nextFrom: 3, task: 'Schnelle Feuerunterstützungspanzer' },
        { name: 'Gladiator Lancer', role: 'veh', models: 1, points: 160, pointsNext: 170, nextFrom: 3, task: 'Panzerabwehr auf Distanz' },
        { name: 'Redemptor Dreadnought', role: 'veh', models: 1, points: 195, pointsNext: 210, nextFrom: 3, wargear: [['Macro plasma incinerator', 10, 1]], loadout: { 'Macro plasma incinerator': 1 }, task: 'Stabiles Zentrum, Feuerkraft' },
        { name: 'Impulsor', role: 'trans', models: 1, points: 70, pointsNext: 80, nextFrom: 4, task: 'Bringt Intercessors zu Missionszielen' }
      ]
    },
    {
      id: 'black-rage',
      name: 'Schwarzer Zorn – Death Company',
      detachments: [{ name: 'Rage-cursed Onslaught', dp: 3 }],
      style: ['Nahkampf', 'All-in', 'Infanterie'],
      difficulty: 3,
      summary:
        'Die Verdammten der Death Company stürmen in Land Raider und Rhino nach vorne. Astorath und Lemartes machen sie ' +
        'noch gefährlicher – ein kompromissloser Nahkampfhammer, der den Gegner früh unter Druck setzt.',
      plan: [
        'Land Raider Crusader und Rhino bringen die großen Death-Company-Trupps sicher nach vorne.',
        'Gladiator, Baal Predator und Intercessors halten den eigenen Bereich.',
        'Runde 2: Alle Nahkampftrupps gleichzeitig in die gegnerische Linie werfen.',
        'Death Company Dreadnought bindet Panzer und große Monster.'
      ],
      strengths: ['Enormer Nahkampfschaden', 'Viele Charaktere für Synergien', 'Druck ab Runde 1'],
      weaknesses: ['Wenig Fernkampf', 'Abhängig von gelungenen Angriffen'],
      units: [
        { name: 'Astorath', role: 'epic', models: 1, points: 85, task: 'Erlöser der Verdammten – Buff für die Death Company' },
        { name: 'Lemartes', role: 'epic', models: 1, points: 100, leads: 'Death Company Marines with Jump Packs', task: 'Wächter der Verlorenen, Sprungangriff' },
        { name: 'Death Company Captain', role: 'char', models: 1, points: 70, leads: 'Death Company Marines (10)', task: 'Warlord; führt den Haupttrupp' },
        { name: 'Chaplain with Jump Pack', role: 'char', models: 1, points: 80, task: 'Zusätzlicher Anführer für Sprungtruppen' },
        { name: 'Sanguinary Priest', role: 'char', models: 1, points: 75, pointsNext: 85, nextFrom: 3, leads: 'Intercessor Squad', task: 'Unterstützt einen Intercessor-Trupp' },
        { name: 'Intercessor Squad', role: 'line', models: 5, points: 80, qty: 2, task: 'Halten Heimziele' },
        { name: 'Death Company Marines', role: 'inf', models: 10, points: 160, qty: 2, pointsNext: 170, nextFrom: 3, task: 'Haupt-Nahkampftrupps im Transporter' },
        { name: 'Death Company Marines with Jump Packs', role: 'inf', models: 5, points: 115, qty: 2, pointsNext: 130, nextFrom: 3, task: 'Schnelle Angriffe auf Flanken' },
        { name: 'Scout Squad', role: 'inf', models: 5, points: 65, pointsNext: 75, nextFrom: 3, task: 'Frühe Missionszielkontrolle' },
        { name: 'Death Company Dreadnought', role: 'veh', models: 1, points: 150, pointsNext: 160, nextFrom: 3, task: 'Nahkampf-Läufer gegen Fahrzeuge' },
        { name: 'Baal Predator', role: 'veh', models: 1, points: 125, pointsNext: 135, nextFrom: 3, task: 'Feuerunterstützung' },
        { name: 'Gladiator Lancer', role: 'veh', models: 1, points: 160, pointsNext: 170, nextFrom: 3, task: 'Panzerabwehr' },
        { name: 'Land Raider Crusader', role: 'veh', models: 1, points: 220, pointsNext: 240, nextFrom: 3, task: 'Schwerer Sturmtransporter für 10 Death Company' },
        { name: 'Rhino', role: 'trans', models: 1, points: 65, pointsNext: 75, nextFrom: 4, task: 'Transport für den zweiten Fußtrupp' },
        { name: 'Assault Intercessors with Jump Packs', role: 'inf', models: 5, points: 95, pointsNext: 105, nextFrom: 3, task: 'Günstige Sprungtruppe für Missionsziele' }
      ]
    }
  ]
});
