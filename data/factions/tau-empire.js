/* T'au Empire (inkl. Kroot) */
WH40K.registerFaction({
  id: 'tau-empire',
  name: "T'au Empire",
  searchName: 'Tau Empire',
  aliases: ['Tau', 'Kroot', 'Greater Good', 'Höheres Wohl', 'Battlesuits'],
  group: 'Xenos',
  wahapedia: 't-au-empire',
  colors: { primary: '#b8622c', accent: '#f1e2c2' },
  tagline: 'Für das Höhere Wohl – Hightech-Feuerkraft',
  description:
    'Ein junges, expansives Sternenreich mit überlegener Technologie. Kampfanzüge, Drohnen und Pulswaffen dominieren den ' +
    'Fernkampf, die Kroot-Hilfstruppen übernehmen Jagd und Nahkampf.',
  playstyle: 'Stärkster Fernkampf im Spiel, Markerlights/Spotter-Synergien, schwacher Nahkampf.',
  detachments: [
    ["Mont'ka", 3], ['Retaliation Cadre', 3], ['Kauyon', 2],
    ['Kroot Hunting Pack', 2], ['Advanced Acquisition Cadre', 1], ['Auxiliary Cadre', 1],
    ['Experimental Prototype Cadre', 1]
  ],
  armies: [
    {
      id: 'montka',
      name: "Mont'ka – Feuerkadre",
      detachments: [{ name: "Mont'ka", dp: 3 }],
      style: ['Fernkampf', 'Battlesuits', 'Aggressiv'],
      difficulty: 3,
      summary:
        'Crisis-Kampfanzüge, Riptide und Hammerheads rücken schnell vor und entfesseln in den ersten Runden vernichtendes ' +
        'Feuer. Ziel: den Gegner früh so stark dezimieren, dass er sich nicht mehr erholt.',
      plan: [
        'Pathfinders und Stealth Suits markieren Ziele.',
        'Crisis-Teams mit Commandern landen/vorrücken und feuern in Runde 1–2.',
        'Hammerheads und Riptide bekämpfen Fahrzeuge und Monster.',
        'Strike Teams und Kroot halten die Missionsziele.'
      ],
      strengths: ['Enorme Feuerkraft', 'Flexible Kampfanzüge', 'Starke Panzerabwehr'],
      weaknesses: ['Schwacher Nahkampf', 'Abhängig von Zielmarkierung'],
      units: [
        { name: 'Commander in Coldstar Battlesuit', role: 'char', models: 1, points: 95, leads: 'Crisis Sunforge Battlesuits', task: 'Warlord; schneller Commander' },
        { name: 'Commander in Enforcer Battlesuit', role: 'char', models: 1, points: 80, leads: 'Crisis Fireknife Battlesuits', task: 'Gepanzerter Commander' },
        { name: 'Cadre Fireblade', role: 'char', models: 1, points: 50, leads: 'Strike Team', task: 'Feuerbuff für Strike Team' },
        { name: 'Strike Team', role: 'line', models: 10, points: 70, qty: 2, task: 'Missionsziele, Pulsgewehre' },
        { name: 'Breacher Team', role: 'inf', models: 10, points: 90, task: 'Nahdistanz-Feuer' },
        { name: 'Pathfinder Team', role: 'inf', models: 10, points: 85, pointsNext: 100, nextFrom: 3, wargear: [['Ion rifle', 5, 3]], loadout: { 'Ion rifle': 1 }, task: 'Zielmarkierer' },
        { name: 'Stealth Battlesuits', role: 'inf', models: 5, points: 100, pointsNext: 110, nextFrom: 3, task: 'Getarnte Spotter' },
        { name: 'Kroot Carnivores', role: 'inf', models: 10, points: 65, task: 'Günstige Missionsziel-Halter' },
        { name: 'Crisis Sunforge Battlesuits', role: 'veh', models: 3, points: 125, pointsNext: 135, nextFrom: 3, task: 'Fusionsblaster gegen Panzer' },
        { name: 'Crisis Fireknife Battlesuits', role: 'veh', models: 3, points: 100, pointsNext: 110, nextFrom: 3, wargear: [['Missile pod', 5, 6, 3]], loadout: { 'Missile pod': 0 }, task: 'Doppel-Plasma gegen Elite' },
        { name: 'Crisis Starscythe Battlesuits', role: 'veh', models: 3, points: 100, pointsNext: 110, nextFrom: 3, wargear: [["T'au flamer", 5, 6, 3]], task: 'Flammen/Burst gegen Infanterie' },
        { name: 'Ghostkeel Battlesuit', role: 'veh', models: 1, points: 150, pointsNext: 165, nextFrom: 3, wargear: [['Cyclic Ion Raker', 15, 1]], task: 'Getarnter Kampfanzug' },
        { name: 'Riptide Battlesuit', role: 'veh', models: 1, points: 190, pointsNext: 220, nextFrom: 3, wargear: [['Ion accelerator', 25, 1]], task: 'Schwerer Kampfanzug' },
        { name: 'Hammerhead Gunship', role: 'veh', models: 1, points: 150, qty: 3, pointsNext: 160, nextFrom: 3, task: 'Railgun-Panzer' },
        { name: 'Devilfish', role: 'trans', models: 1, points: 75, qty: 2, pointsNext: 85, nextFrom: 4, task: 'Transport für Strike/Breacher' }
      ]
    },
    {
      id: 'kroot',
      name: 'Kroot-Jagdrudel',
      detachments: [{ name: 'Kroot Hunting Pack', dp: 2 }, { name: 'Auxiliary Cadre', dp: 1 }],
      style: ['Horde', 'Nahkampf & Fernkampf', 'Infiltration'],
      difficulty: 3,
      summary:
        'Die Kroot-Hilfstruppen übernehmen die Hauptrolle: Carnivores, Farstalkers und Krootox jagen über das Feld, ' +
        'unterstützt von T\'au-Feuerkraft in Form von Riptide, Hammerhead und Broadsides.',
      plan: [
        'Farstalkers und Lone-spear infiltrieren und markieren Ziele.',
        'Carnivores mit Shapern besetzen Missionsziele und greifen an.',
        'Krootox und Great Knarloc jagen Fahrzeuge und Elite.',
        'Riptide, Hammerhead und Broadsides sichern Feuerkraft.'
      ],
      strengths: ['Viele Modelle', 'Infiltration und Raumkontrolle', 'Mischung aus Nah- und Fernkampf'],
      weaknesses: ['Kroot zerbrechlich', 'Weniger Spitzenfeuerkraft'],
      units: [
        { name: 'Kroot War Shaper', role: 'char', models: 1, points: 60, leads: 'Kroot Carnivores', task: 'Warlord; Kriegsführer' },
        { name: 'Kroot Flesh Shaper', role: 'char', models: 1, points: 45, leads: 'Kroot Carnivores', task: 'Nahkampf-Buff' },
        { name: 'Kroot Trail Shaper', role: 'char', models: 1, points: 50, leads: 'Kroot Farstalkers', task: 'Fernkampf-Buff' },
        { name: 'Kroot Lone-spear', role: 'char', models: 1, points: 80, task: 'Berittener Scharfschütze' },
        { name: 'Cadre Fireblade', role: 'char', models: 1, points: 50, task: "T'au-Feuerbuff" },
        { name: 'Kroot Carnivores', role: 'line', models: 20, points: 130, qty: 2, task: 'Große Kroot-Mobs' },
        { name: 'Kroot Carnivores', role: 'line', models: 10, points: 65, task: 'Missionsziele' },
        { name: 'Kroot Farstalkers', role: 'inf', models: 12, points: 75, qty: 2, pointsNext: 85, nextFrom: 3, task: 'Infiltrierende Jäger' },
        { name: 'Pathfinder Team', role: 'inf', models: 10, points: 85, pointsNext: 100, nextFrom: 3, wargear: [['Ion rifle', 5, 3]], loadout: { 'Ion rifle': 3 }, task: 'Zielmarkierer' },
        { name: 'Vespid Stingwings', role: 'inf', models: 5, points: 70, task: 'Fliegende Störer' },
        { name: 'Kroot Hounds', role: 'beast', models: 10, points: 65, qty: 2, task: 'Schnelle Jäger' },
        { name: 'Krootox Rampagers', role: 'mounted', models: 3, points: 85, qty: 2, pointsNext: 95, nextFrom: 3, task: 'Nahkampf-Bestien' },
        { name: 'Krootox Riders', role: 'mounted', models: 1, points: 45, task: 'Schwere Kroot-Kanonen' },
        { name: 'Knarloc Riders', role: 'mounted', models: 3, points: 110, task: 'Kroot-Kavallerie' },
        { name: 'Great Knarloc', role: 'mon', models: 1, points: 100, task: 'Großes Biest' },
        { name: 'Broadside Battlesuits', role: 'veh', models: 2, points: 150, pointsNext: 170, nextFrom: 3, wargear: [['High-yield missile pods', 5, 2]], task: 'Schwere Feuerunterstützung' },
        { name: 'Riptide Battlesuit', role: 'veh', models: 1, points: 190, pointsNext: 220, nextFrom: 3, wargear: [['Ion accelerator', 25, 1]], loadout: { 'Ion accelerator': 1 }, task: 'Schwerer Kampfanzug' },
        { name: 'Hammerhead Gunship', role: 'veh', models: 1, points: 150, pointsNext: 160, nextFrom: 3, task: 'Panzerabwehr' }
      ]
    }
  ]
});
