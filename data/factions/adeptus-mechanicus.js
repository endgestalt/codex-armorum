/* Adeptus Mechanicus */
WH40K.registerFaction({
  id: 'adeptus-mechanicus',
  name: 'Adeptus Mechanicus',
  aliases: ['AdMech', 'Skitarii', 'Mars', 'Cult Mechanicus'],
  group: 'Imperium',
  wahapedia: 'adeptus-mechanicus',
  colors: { primary: '#8b1a1a', accent: '#d9a441' },
  tagline: 'Die Priester des Maschinengottes',
  description:
    'Cyborg-Armeen vom Mars: Skitarii-Soldaten, Tech-Priester und uralte Kampfroboter. Exotische Waffen wie ' +
    'Radium-Karabiner und Disintegratoren machen sie zu einer vielseitigen Fernkampf-Fraktion.',
  playstyle: 'Fernkampf und Mobilität, viele Spezialregeln und Synergien.',
  detachments: [
    ['Eradication Cohort', 3], ['Haloscreed Battle Clade', 3], ['Cohort Cybernetica', 2],
    ['Data-Psalm Conclave', 2], ['Explorator Maniple', 2], ['Rad-Zone Corps', 2],
    ['Skitarii Hunter Cohort', 2], ['Cohort Acquisitus', 1], ['Lords of the Forge', 1],
    ['Luminen Auto-choir', 1]
  ],
  armies: [
    {
      id: 'skitarii-hunt',
      name: 'Skitarii-Jagdkohorte',
      detachments: [{ name: 'Skitarii Hunter Cohort', dp: 2 }, { name: 'Cohort Acquisitus', dp: 1 }],
      style: ['Schnell', 'Fernkampf', 'Viele Aktivierungen'],
      difficulty: 4,
      summary:
        'Rangers, Vanguard, Serberys-Reiter und Sicarians bilden ein bewegliches Netz über das Schlachtfeld. Dunerider ' +
        'und Disintegratoren bringen die Feuerkraft – eine flinke Liste für Missions- und Nebenauftragsspieler.',
      plan: [
        'Rangers und Vanguard besetzen Missionsziele, teils im Dunerider.',
        'Serberys-Einheiten und Pteraxii stören den Gegner früh.',
        'Disintegratoren, Ballistarii und Onager schalten Fahrzeuge aus.',
        'Sicarians kontern gegnerische Vorstöße im Nahkampf.'
      ],
      strengths: ['Sehr viele Einheiten', 'Gute Mobilität', 'Starke Nebenauftragswertung'],
      weaknesses: ['Zerbrechliche Infanterie', 'Komplexe Synergien'],
      units: [
        { name: 'Skitarii Marshal', role: 'char', models: 1, points: 35, leads: 'Skitarii Vanguard', task: 'Warlord; günstiger Anführer' },
        { name: 'Tech-Priest Manipulus', role: 'char', models: 1, points: 60, leads: 'Skitarii Rangers', task: 'Feuerkraft-Buff' },
        { name: 'Cybernetica Datasmith', role: 'char', models: 1, points: 25, leads: 'Kastelan Robots', task: 'Steuert die Kastelans' },
        { name: 'Skitarii Rangers', role: 'line', models: 10, points: 85, qty: 2, task: 'Fernkampf-Missionsziel-Halter' },
        { name: 'Skitarii Vanguard', role: 'line', models: 10, points: 85, qty: 2, task: 'Radium-Nahdistanz-Schützen' },
        { name: 'Sicarian Infiltrators', role: 'inf', models: 5, points: 75, qty: 2, pointsNext: 85, nextFrom: 3, task: 'Infiltrieren, Raumkontrolle' },
        { name: 'Sicarian Ruststalkers', role: 'inf', models: 5, points: 75, pointsNext: 85, nextFrom: 3, task: 'Nahkampf-Jäger' },
        { name: 'Pteraxii Skystalkers', role: 'inf', models: 5, points: 75, pointsNext: 85, nextFrom: 3, task: 'Springende Störtruppe' },
        { name: 'Kastelan Robots', role: 'veh', models: 2, points: 150, pointsNext: 180, nextFrom: 2, task: 'Schwerer Roboter-Block' },
        { name: 'Serberys Raiders', role: 'mounted', models: 3, points: 60, qty: 2, task: 'Schnelle Aufklärer' },
        { name: 'Serberys Sulphurhounds', role: 'mounted', models: 3, points: 55, task: 'Flammen-Kavallerie' },
        { name: 'Ironstrider Ballistarii', role: 'veh', models: 2, points: 160, pointsNext: 175, nextFrom: 3, wargear: [['Twin cognis lascannon', 10, 2]], loadout: { 'Twin cognis lascannon': 2 }, task: 'Mobile Panzerabwehr' },
        { name: 'Skorpius Disintegrator', role: 'veh', models: 1, points: 160, qty: 2, wargear: [['Ferrumite cannon', 10, 1]], task: 'Schwerer Antigrav-Panzer' },
        { name: 'Onager Dunecrawler', role: 'veh', models: 1, points: 155, task: 'Läufer mit Neutronlaser' },
        { name: 'Skorpius Dunerider', role: 'trans', models: 1, points: 75, qty: 2, pointsNext: 85, nextFrom: 4, task: 'Schnelle Transporter' },
        { name: 'Kataphron Destroyers', role: 'inf', models: 3, points: 100, task: 'Schwere Waffen-Servitoren' }
      ]
    },
    {
      id: 'cybernetica',
      name: 'Kastelan-Kohorte',
      detachments: [{ name: 'Cohort Cybernetica', dp: 2 }, { name: 'Lords of the Forge', dp: 1 }],
      style: ['Zäh', 'Roboter', 'Feuerlinie'],
      difficulty: 2,
      summary:
        'Belisarius Cawl führt eine Phalanx aus Kastelan-Robotern und Kataphron-Servitoren an. Langsam, aber mit enormer ' +
        'Feuerkraft und Widerstand – eine Feuerlinie, die der Gegner erst einmal knacken muss.',
      plan: [
        'Kastelans mit Datasmiths besetzen das Zentrum und schießen.',
        'Rangers halten die Heimziele, Electro-Priests schirmen ab.',
        'Onager und Disintegrator bekämpfen Fahrzeuge.',
        'Kataphron Breachers kontern im Nahkampf.'
      ],
      strengths: ['Sehr hohe Feuerkraft', 'Robuste Einheiten', 'Einfacher Spielplan'],
      weaknesses: ['Langsam', 'Wenige Modelle für Missionsziele'],
      units: [
        { name: 'Belisarius Cawl', role: 'epic', models: 1, points: 220, task: 'Warlord; Erzmagos, repariert und buffed' },
        { name: 'Technoarcheologist', role: 'char', models: 1, points: 45, leads: 'Corpuscarii Electro-Priests', task: 'Unterstützung' },
        { name: 'Cybernetica Datasmith', role: 'char', models: 1, points: 25, qty: 2, leads: 'Kastelan Robots', task: 'Steuert Kastelans' },
        { name: 'Skitarii Rangers', role: 'line', models: 10, points: 85, qty: 2, task: 'Missionsziele halten' },
        { name: 'Corpuscarii Electro-Priests', role: 'inf', models: 5, points: 65, task: 'Abschirmung, Nahdistanz' },
        { name: 'Fulgurite Electro-Priests', role: 'inf', models: 5, points: 70, task: 'Nahkampf-Konter' },
        { name: 'Kataphron Destroyers', role: 'inf', models: 3, points: 100, task: 'Schwere Waffen-Servitoren' },
        { name: 'Kataphron Breachers', role: 'inf', models: 3, points: 150, task: 'Zähe Nahkampf-Servitoren' },
        { name: 'Kastelan Robots', role: 'veh', models: 2, points: 150, qty: 3, pointsNext: 180, nextFrom: 2, task: 'Roboter-Phalanx' },
        { name: 'Onager Dunecrawler', role: 'veh', models: 1, points: 155, qty: 2, task: 'Panzerabwehr' },
        { name: 'Skorpius Disintegrator', role: 'veh', models: 1, points: 160, wargear: [['Ferrumite cannon', 10, 1]], task: 'Feuerunterstützung' },
        { name: 'Skorpius Dunerider', role: 'trans', models: 1, points: 75, pointsNext: 85, nextFrom: 4, task: 'Transport für Kataphron Breachers' },
        { name: 'Sicarian Infiltrators', role: 'inf', models: 5, points: 75, pointsNext: 85, nextFrom: 3, task: 'Infiltrieren, Raumkontrolle' }
      ]
    }
  ]
});
