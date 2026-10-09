/* Grey Knights */
WH40K.registerFaction({
  id: 'grey-knights',
  name: 'Grey Knights',
  aliases: ['Ordo Malleus', 'Titan', 'Dämonenjäger'],
  group: 'Imperium',
  wahapedia: 'grey-knights',
  colors: { primary: '#6f7d8a', accent: '#d9c37a' },
  tagline: 'Die Dämonenjäger von Titan',
  description:
    'Ein geheimer Orden aus psionisch begabten Space Marines, die einzig dafür existieren, Dämonen zu vernichten. ' +
    'Jeder Krieger ist ein Psioniker, fast jede Einheit kann per Teleport ins Gefecht springen.',
  playstyle: 'Elite-Armee mit Teleport-Tricks und Psi-Fähigkeiten. Wenige, sehr starke Modelle.',
  detachments: [
    ['Warpbane Task Force', 3], ['Augurium Task Force', 2], ['Banishers', 2],
    ['Brotherhood Strike', 2], ['Hallowed Conclave', 2], ['Sanctic Spearhead', 2],
    ['Argent Assault', 1], ['Fires of Purgation', 1], ['Immaterial Interdiction', 1]
  ],
  armies: [
    {
      id: 'warpbane',
      name: 'Teleport-Schlag',
      detachments: [{ name: 'Warpbane Task Force', dp: 3 }],
      style: ['Schocktruppen', 'Elite', 'Psi'],
      difficulty: 4,
      summary:
        'Die Armee springt per Teleport über das Schlachtfeld: Terminatoren und Paladine erscheinen dort, wo sie gebraucht ' +
        'werden, Interceptors versetzen sich blitzschnell. Sehr stark, wenn man die Teleport-Tricks beherrscht.',
      plan: [
        'Strike Squads halten Heimziele, Interceptors springen auf Seitenziele.',
        'Paladine und Terminatoren bleiben teils in Reserve für Runde 2.',
        'Dreadknights drücken früh nach vorne und ziehen Feuer auf sich.',
        'Gleichzeitiges Landen mehrerer Trupps überlastet den Gegner.'
      ],
      strengths: ['Hohe Mobilität durch Teleport', 'Elite-Truppen mit Psi-Waffen', 'Stark gegen Dämonen und Elite'],
      weaknesses: ['Sehr wenige Modelle', 'Anspruchsvolles Timing'],
      units: [
        { name: 'Grand Master Voldus', role: 'epic', models: 1, points: 125, leads: 'Paladin Squad', task: 'Warlord; psionischer Anführer' },
        { name: 'Brother-Captain', role: 'char', models: 1, points: 95, leads: 'Brotherhood Terminator Squad', task: 'Führt Terminatoren' },
        { name: 'Brotherhood Librarian', role: 'char', models: 1, points: 90, pointsNext: 100, nextFrom: 2, leads: 'Brotherhood Terminator Squad', task: 'Psi-Unterstützung' },
        { name: 'Brotherhood Chaplain', role: 'char', models: 1, points: 65, task: 'Nahkampfbuff' },
        { name: 'Brotherhood Champion', role: 'char', models: 1, points: 70, task: 'Duellant gegen Charaktere' },
        { name: 'Strike Squad', role: 'line', models: 5, points: 115, qty: 2, task: 'Missionsziel-Halter mit Teleport' },
        { name: 'Brotherhood Terminator Squad', role: 'inf', models: 5, points: 175, qty: 2, wargear: [['Psycannon', 5, 2]], task: 'Zäher Teleport-Angriff' },
        { name: 'Paladin Squad', role: 'inf', models: 5, points: 215, pointsNext: 255, nextFrom: 3, wargear: [['Psycannon', 5, 3]], task: 'Elite der Elite' },
        { name: 'Interceptor Squad', role: 'inf', models: 5, points: 125, pointsNext: 135, nextFrom: 3, task: 'Schnelle Missionsziel-Jäger' },
        { name: 'Purgation Squad', role: 'inf', models: 5, points: 105, pointsNext: 115, nextFrom: 3, wargear: [['Psycannon', 5, 4]], loadout: { 'Psycannon': 2 }, task: 'Schwere Waffen' },
        { name: 'Purifier Squad', role: 'inf', models: 5, points: 130, pointsNext: 140, nextFrom: 3, task: 'Hordenabwehr mit Flammen' },
        { name: 'Nemesis Dreadknight', role: 'veh', models: 1, points: 195, qty: 2, pointsNext: 210, nextFrom: 3, wargear: [['Heavy psycannon', 15, 1]], task: 'Großer Läufer, Fern- und Nahkampf' }
      ]
    },
    {
      id: 'banishers',
      name: 'Bannstrahl – Panzer & Dreadknights',
      detachments: [{ name: 'Banishers', dp: 2 }, { name: 'Fires of Purgation', dp: 1 }],
      style: ['Fernkampf', 'Schwere Unterstützung', 'Zäh'],
      difficulty: 3,
      summary:
        'Mehr Feuerkraft, mehr Panzerung: Dreadknights, Land Raider und Purgation Squads halten den Gegner auf Distanz, ' +
        'während Draigo und Terminatoren das Zentrum besetzen.',
      plan: [
        'Purgation Squads und Land Raider nehmen Feuerpositionen ein.',
        'Dreadknights und Draigo besetzen das Zentrum.',
        'Strike Squads im Rhino holen späte Missionsziele.',
        'Terminatoren springen dorthin, wo die gegnerische Linie aufbricht.'
      ],
      strengths: ['Mehr Fernkampf als typische GK', 'Sehr robuste Großeinheiten', 'Draigo als Fels in der Brandung'],
      weaknesses: ['Weniger Teleport-Tricks', 'Geringe Modellzahl'],
      units: [
        { name: 'Kaldor Draigo', role: 'epic', models: 1, points: 125, leads: 'Brotherhood Terminator Squad', task: 'Warlord; Oberster Großmeister' },
        { name: 'Grand Master in Nemesis Dreadknight', role: 'char', models: 1, points: 200, pointsNext: 215, nextFrom: 3, wargear: [['Sublimator', 15, 1], ['Heavy psycannon', 15, 1]], task: 'Großer Held-Läufer' },
        { name: 'Brotherhood Librarian', role: 'char', models: 1, points: 90, pointsNext: 100, nextFrom: 2, qty: 2, task: 'Psi-Unterstützung' },
        { name: 'Strike Squad', role: 'line', models: 5, points: 115, qty: 2, task: 'Missionsziele' },
        { name: 'Brotherhood Terminator Squad', role: 'inf', models: 5, points: 175, wargear: [['Psycannon', 5, 2]], task: 'Zäher Kern mit Draigo' },
        { name: 'Purgation Squad', role: 'inf', models: 5, points: 105, qty: 2, pointsNext: 115, nextFrom: 3, wargear: [['Psycannon', 5, 4]], task: 'Schwere Psi-Waffen' },
        { name: 'Servitors', role: 'inf', models: 4, points: 60, task: 'Günstiger Heimziel-Halter' },
        { name: 'Nemesis Dreadknight', role: 'veh', models: 1, points: 195, qty: 2, pointsNext: 210, nextFrom: 3, wargear: [['Heavy psycannon', 15, 1]], task: 'Feuerstarke Läufer' },
        { name: 'Venerable Dreadnought', role: 'veh', models: 1, points: 130, pointsNext: 140, nextFrom: 3, task: 'Zähe Feuerunterstützung' },
        { name: 'Land Raider', role: 'veh', models: 1, points: 220, pointsNext: 240, nextFrom: 3, task: 'Panzer und Transport' },
        { name: 'Rhino', role: 'trans', models: 1, points: 70, pointsNext: 80, nextFrom: 4, task: 'Transport für Strike Squad' }
      ]
    }
  ]
});
