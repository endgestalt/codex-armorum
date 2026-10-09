/* Aeldari (Craftworlds, Harlequins, Ynnari) */
WH40K.registerFaction({
  id: 'aeldari',
  name: 'Aeldari',
  aliases: ['Eldar', 'Craftworld', 'Harlequins', 'Ynnari', 'Weltenschiff'],
  group: 'Xenos',
  wahapedia: 'aeldari',
  colors: { primary: '#1c6b5e', accent: '#e8c14a' },
  tagline: 'Die Weltenschiffe einer sterbenden Rasse',
  description:
    'Uralte, psionisch begabte Rasse, die auf riesigen Weltenschiffen lebt. Aspektkrieger sind Spezialisten ihres Kriegs-' +
    'pfades, Seher lenken das Schicksal, Phantomkonstrukte tragen die Seelen der Toten. Schnell, präzise, zerbrechlich.',
  playstyle: 'Glaskanonen: hohe Mobilität und Schaden, wenig Widerstand. Belohnt Präzision.',
  detachments: [
    ['Aspect Host', 3], ['Warhost', 3], ['Corsair Coterie', 2],
    ['Devoted of Ynnead', 2], ['Eldritch Raiders', 2], ['Ghosts of the Webway', 2],
    ['Guardian Battlehost', 2], ['Seer Council', 2], ["Serpent's Brood", 2],
    ['Spirit Conclave', 2], ['Windrider Host', 2], ['Armoured Warhost', 1],
    ['Fateful Performance', 1], ['Path of the Outcast', 1], ['Twilight Flickers', 1]
  ],
  armies: [
    {
      id: 'aspect-host',
      name: 'Aspektkrieger-Heer',
      detachments: [{ name: 'Aspect Host', dp: 3 }],
      style: ['Spezialisten', 'Hit-and-Run', 'Präzision'],
      difficulty: 4,
      summary:
        'Der Avatar des Khaine führt Fire Dragons, Dark Reapers, Banshees und Warp Spiders an. Jeder Trupp hat eine klare ' +
        'Aufgabe – im richtigen Moment eingesetzt, zerlegen sie ihr Ziel in einem Zug.',
      plan: [
        'Dark Reapers und Fire Prism beschießen aus sicherer Position.',
        'Fire Dragons fahren im Wave Serpent an Panzer heran.',
        'Banshees und Shining Spears schlagen auf geschwächte Ziele.',
        'Warp Spiders und Swooping Hawks schnappen späte Missionsziele.'
      ],
      strengths: ['Jede Einheit ein Spezialist', 'Sehr mobil', 'Hoher Spitzenschaden'],
      weaknesses: ['Zerbrechlich', 'Fehler werden sofort bestraft'],
      units: [
        { name: 'Avatar of Khaine', role: 'epic', models: 1, points: 250, task: 'Kriegsgott-Avatar, Nahkampf-Monster' },
        { name: 'Autarch Wayleaper', role: 'char', models: 1, points: 70, leads: 'Swooping Hawks', task: 'Warlord; Kommandant' },
        { name: 'Guardian Defenders', role: 'line', models: 11, points: 90, task: 'Hält das Heimziel' },
        { name: 'Fire Dragons', role: 'inf', models: 5, points: 120, qty: 2, pointsNext: 130, nextFrom: 3, task: 'Melta-Panzerjäger' },
        { name: 'Dark Reapers', role: 'inf', models: 5, points: 95, qty: 2, task: 'Präzisionsfeuer auf Distanz' },
        { name: 'Howling Banshees', role: 'inf', models: 5, points: 85, task: 'Schnelle Nahkämpferinnen' },
        { name: 'Warp Spiders', role: 'inf', models: 5, points: 105, pointsNext: 125, nextFrom: 3, task: 'Teleportierende Störtruppe' },
        { name: 'Swooping Hawks', role: 'inf', models: 5, points: 95, pointsNext: 110, nextFrom: 3, task: 'Missionsziel-Jäger' },
        { name: 'Rangers', role: 'inf', models: 5, points: 60, task: 'Infiltrieren, Nebenaufträge' },
        { name: 'Shining Spears', role: 'mounted', models: 3, points: 100, task: 'Jetbike-Lanzenreiter' },
        { name: 'Fire Prism', role: 'veh', models: 1, points: 150, task: 'Laserpanzer' },
        { name: 'Crimson Hunter', role: 'fly', models: 1, points: 160, qty: 2, task: 'Flieger-Jäger' },
        { name: 'Wave Serpent', role: 'trans', models: 1, points: 115, qty: 2, pointsNext: 125, nextFrom: 4, task: 'Schneller Transporter' }
      ]
    },
    {
      id: 'seer-wraith',
      name: 'Seherrat & Phantome',
      detachments: [{ name: 'Seer Council', dp: 2 }, { name: 'Armoured Warhost', dp: 1 }],
      style: ['Psi', 'Zäh', 'Phantomkonstrukte'],
      difficulty: 3,
      summary:
        'Eldrad und die Farseers lenken das Schicksal, während Wraithguard, Wraithblades und ein Wraithknight die harte ' +
        'Front bilden. Ungewöhnlich zäh für Aeldari, mit starken Psi-Kräften.',
      plan: [
        'Wraithguard im Wave Serpent fahren zu gegnerischen Panzern.',
        'Wraithknight und Wraithblades halten das Zentrum.',
        'Farseers verstärken Schlüsseleinheiten und schwächen Gegner.',
        'Guardians und Rangers nehmen Missionsziele.'
      ],
      strengths: ['Sehr zähe Phantomeinheiten', 'Mächtige Psi-Kräfte', 'Starke Panzerabwehr'],
      weaknesses: ['Langsamer als andere Aeldari', 'Teure Kernteile'],
      units: [
        { name: 'Eldrad Ulthran', role: 'epic', models: 1, points: 120, task: 'Warlord; legendärer Seher' },
        { name: 'Farseer', role: 'char', models: 1, points: 65, leads: 'Guardian Defenders', task: 'Schicksals-Buff' },
        { name: 'Farseer Skyrunner', role: 'char', models: 1, points: 60, task: 'Mobiler Seher' },
        { name: 'Spiritseer', role: 'char', models: 1, points: 50, task: 'Psi-Unterstützung für die Phantomkrieger (eigenständig)' },
        { name: 'Warlock Conclave', role: 'char', models: 2, points: 55, leads: 'Guardian Defenders', task: 'Psi-Unterstützung' },
        { name: 'Guardian Defenders', role: 'line', models: 11, points: 90, task: 'Missionsziele' },
        { name: 'Rangers', role: 'inf', models: 5, points: 60, qty: 2, task: 'Infiltration' },
        { name: 'Wraithguard', role: 'inf', models: 5, points: 145, qty: 2, task: 'Panzerjäger-Phantome' },
        { name: 'Wraithblades', role: 'inf', models: 5, points: 140, task: 'Nahkampf-Phantome' },
        { name: 'Wraithlord', role: 'mon', models: 1, points: 125, task: 'Phantomläufer' },
        { name: 'Wraithknight', role: 'mon', models: 1, points: 385, pointsNext: 405, nextFrom: 2, wargear: [['Heavy wraithcannon', 10, 2]], loadout: { 'Heavy wraithcannon': 2 }, task: 'Riesiges Phantomkonstrukt' },
        { name: 'Wave Serpent', role: 'trans', models: 1, points: 115, qty: 2, pointsNext: 125, nextFrom: 4, task: 'Transport für Wraithguard' },
        { name: 'Avatar of Khaine', role: 'epic', models: 1, points: 250, task: 'Kriegsgott-Avatar, Nahkampf-Monster' }
      ]
    }
  ]
});
