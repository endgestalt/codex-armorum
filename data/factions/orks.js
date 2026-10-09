/* Orks */
WH40K.registerFaction({
  id: 'orks',
  name: 'Orks',
  aliases: ['Waaagh', 'Goff', 'Evil Sunz', 'Speed Freeks', 'Ghazghkull'],
  group: 'Xenos',
  wahapedia: 'orks',
  colors: { primary: '#3b6e22', accent: '#e4c23a' },
  tagline: 'WAAAGH! – Masse, Krach und Nahkampf',
  description:
    'Grüne Pilzwesen, die nur für den Krieg leben. Orks glauben, dass rote Fahrzeuge schneller sind – und deshalb sind ' +
    'sie es. Riesige Mobs, improvisierte Kriegsmaschinen und der große Waaagh! prägen das Spiel.',
  playstyle: 'Masse und Nahkampf, viel Würfelspaß, ein großer Waaagh!-Moment pro Spiel.',
  detachments: [
    ['War Horde', 3], ['Blitz Brigade', 1], ['Brute Bosses', 1],
    ['Bully Boyz', 1], ['Da Big Hunt', 1], ['Dread Mob', 1],
    ['Flyboyz', 1], ['Green Tide', 1], ['Kult of Speed', 1],
    ['Madcap Meks', 1], ['Runt Swarm', 1], ['Shoota Boyz', 1],
    ['Taktikal Brigade', 1], ['Wreckas', 1], ['Wurrband', 1]
  ],
  armies: [
    {
      id: 'war-horde',
      name: 'Waaagh!-Horde',
      detachments: [{ name: 'War Horde', dp: 3 }],
      style: ['Horde', 'Nahkampf', 'Waaagh!'],
      difficulty: 2,
      summary:
        'Ghazghkull und große Boyz-Mobs stürmen mit Meganobz und Battlewagon nach vorne. Ein ausgerufener Waaagh! in ' +
        'Runde 2 macht die Armee für eine Runde nahezu unaufhaltsam.',
      plan: [
        'Gretchin halten Heimziele, Kommandos infiltrieren.',
        'Boyz-Mobs mit Warboss rücken vor, Battlewagon bringt Meganobz.',
        'Runde 2: Waaagh! ausrufen und alles in den Nahkampf werfen.',
        'Mek Gunz und Lootas unterstützen aus der Distanz.'
      ],
      strengths: ['Viele Modelle', 'Enormer Nahkampf im Waaagh!', 'Sehr viel Spaß beim Würfeln'],
      weaknesses: ['Schwacher Fernkampf', 'Viele Modelle = lange Züge'],
      units: [
        { name: 'Ghazghkull Thraka', role: 'epic', models: 1, points: 300, task: 'Warlord; mit Makari' },
        { name: 'Warboss', role: 'char', models: 1, points: 100, leads: 'Boyz', task: 'Führt einen Boyz-Mob' },
        { name: 'Warboss in Mega Armour', role: 'char', models: 1, points: 125, pointsNext: 140, nextFrom: 3, leads: 'Meganobz', task: 'Gepanzerter Boss' },
        { name: 'Big Mek in Mega Armour', role: 'char', models: 1, points: 90, task: 'Kraftfeld-Unterstützung' },
        { name: 'Painboy', role: 'char', models: 1, points: 45, leads: 'Boyz', task: 'Heilt den Mob' },
        { name: 'Boyz', role: 'line', models: 20, points: 180, qty: 2, pointsNext: 190, nextFrom: 4, task: 'Haupt-Nahkampfmobs' },
        { name: 'Boyz', role: 'line', models: 10, points: 90, pointsNext: 100, nextFrom: 4, task: 'Kleiner Mob für Missionsziele' },
        { name: 'Gretchin', role: 'line', models: 10, points: 45, qty: 2, task: 'Heimziel-Halter' },
        { name: 'Meganobz', role: 'inf', models: 3, points: 110, pointsNext: 150, nextFrom: 3, wargear: [['Twin Killsaws', 5, 3, 0, 'je Modell eine'], ['Killsaw', 5, 3, 0, 'je Modell eine']], task: 'Gepanzerte Elite mit Ghaz' },
        { name: 'Nobz', role: 'inf', models: 5, points: 125, pointsNext: 155, nextFrom: 3, wargear: [['Paired Krumpas', 5, 1]], task: 'Elite-Nahkampf' },
        { name: 'Kommandos', role: 'inf', models: 10, points: 125, task: 'Infiltratoren' },
        { name: 'Stormboyz', role: 'inf', models: 5, points: 70, task: 'Schnelle Missionsziel-Jäger' },
        { name: 'Lootas', role: 'inf', models: 5, points: 50, pointsNext: 60, nextFrom: 3, task: 'Fernkampf' },
        { name: 'Mek Gunz', role: 'veh', models: 1, points: 55, qty: 2, pointsNext: 65, nextFrom: 3, task: 'Artillerie' },
        { name: 'Battlewagon', role: 'trans', models: 1, points: 150, pointsNext: 160, nextFrom: 3, task: 'Schwerer Transporter' },
        { name: 'Trukk', role: 'trans', models: 1, points: 60, pointsNext: 70, nextFrom: 4, task: 'Schneller Transporter' }
      ]
    },
    {
      id: 'speed-freeks',
      name: 'Kult der Geschwindigkeit',
      detachments: [{ name: 'Kult of Speed', dp: 1 }, { name: 'Blitz Brigade', dp: 1 }, { name: 'Da Big Hunt', dp: 1 }],
      style: ['Schnell', 'Fahrzeuge', 'Bikes & Squigs'],
      difficulty: 3,
      summary:
        'Bikes, Buggies, Battlewagons und Squighogs rasen über das Feld. Drei kleine Detachments kombinieren Geschwindigkeit, ' +
        'Fahrzeugstärke und die Jagd auf große Beute – rote Fahrzeuge sind schneller!',
      plan: [
        'Buggies und Deffkoptas stören früh und nehmen Seitenziele.',
        'Battlewagons mit Boyz und Nobz rasen ins Zentrum.',
        'Squighogs und Beastboss jagen Monster und Fahrzeuge.',
        'Warbikers holen späte Missionsziele.'
      ],
      strengths: ['Sehr schnell', 'Viele zähe Fahrzeuge', 'Flexible Detachment-Kombination'],
      weaknesses: ['Wenig Masse auf Zielen', 'Fahrzeuge anfällig gegen Panzerabwehr'],
      units: [
        { name: 'Deffkilla Wartrike', role: 'char', models: 1, points: 80, leads: 'Warbikers', task: 'Warlord; Speed-Boss' },
        { name: 'Beastboss on Squigosaur', role: 'char', models: 1, points: 140, pointsNext: 155, nextFrom: 3, task: 'Großwildjäger' },
        { name: 'Warboss', role: 'char', models: 1, points: 100, leads: 'Nobz', task: 'Führt Nobz' },
        { name: 'Mek', role: 'char', models: 1, points: 45, leads: 'Boyz', task: 'Repariert Fahrzeuge' },
        { name: 'Boyz', role: 'line', models: 10, points: 90, qty: 2, pointsNext: 100, nextFrom: 4, task: 'Im Trukk zu Missionszielen' },
        { name: 'Gretchin', role: 'line', models: 10, points: 45, task: 'Heimziel' },
        { name: 'Nobz', role: 'inf', models: 5, points: 125, pointsNext: 155, nextFrom: 3, wargear: [['Paired Krumpas', 5, 1]], loadout: { 'Paired Krumpas': 1 }, task: 'Elite im Battlewagon' },
        { name: 'Warbikers', role: 'mounted', models: 3, points: 75, qty: 2, task: 'Schnelle Angreifer' },
        { name: 'Squighog Boyz', role: 'mounted', models: 4, points: 140, qty: 2, pointsNext: 160, nextFrom: 3, task: 'Monster-Jäger' },
        { name: 'Deffkoptas', role: 'veh', models: 3, points: 80, qty: 2, pointsNext: 90, nextFrom: 3, task: 'Fliegende Störer' },
        { name: 'Rukkatrukk Squigbuggies', role: 'veh', models: 1, points: 85, task: 'Squig-Artillerie' },
        { name: 'Warbuggies', role: 'veh', models: 1, points: 70, task: 'Schnelle Buggies' },
        { name: 'Wartrakks', role: 'veh', models: 1, points: 70, task: 'Kettenbuggies' },
        { name: 'Battlewagon', role: 'trans', models: 1, points: 150, qty: 2, pointsNext: 160, nextFrom: 3, task: 'Schwere Transporter' },
        { name: 'Trukk', role: 'trans', models: 1, points: 60, qty: 2, pointsNext: 70, nextFrom: 4, task: 'Transporter für Boyz' }
      ]
    }
  ]
});
