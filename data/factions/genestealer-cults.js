/* Genestealer Cults */
WH40K.registerFaction({
  id: 'genestealer-cults',
  name: 'Genestealer Cults',
  aliases: ['GSC', 'Kult', 'Brood Brothers', 'Aufstand'],
  group: 'Xenos',
  wahapedia: 'genestealer-cults',
  colors: { primary: '#5e2a6b', accent: '#d7a34a' },
  tagline: 'Der Aufstand aus dem Untergrund',
  description:
    'Hybride Kulte, die im Verborgenen auf imperialen Welten wachsen und den Tag des Aufstands vorbereiten. ' +
    'Sie tauchen aus Tunneln auf, kehren zurück, wenn man sie vernichtet, und verwenden gestohlene Bergbaufahrzeuge.',
  playstyle: 'Hinterhalt und Wiederkehr (Cult Ambush), viele Einheiten, Charakter-Synergien.',
  detachments: [
    ['Host of Ascension', 3], ['Biosanctic Broodsurge', 2], ['Brood Brother Auxilia', 2],
    ['Final Day', 2], ['Outlander Claw', 2], ['Xenocreed Congregation', 2],
    ['Heroes of the Uprising', 1], ['Purestrain Broodswarm', 1], ['Xenocult Masses', 1]
  ],
  armies: [
    {
      id: 'ascension',
      name: 'Aufstand der Massen',
      detachments: [{ name: 'Host of Ascension', dp: 3 }],
      style: ['Hinterhalt', 'Horde', 'Nahkampf'],
      difficulty: 4,
      summary:
        'Der Patriarch und seine Hybriden-Brut schlagen aus Hinterhalten zu und kehren zurück, wenn man sie vernichtet. ' +
        'Aberrants, Acolytes und Purestrains bringen Wucht, Neophyten halten die Ziele.',
      plan: [
        'Neophyten besetzen Missionsziele, Jackals und Ridgerunners stören früh.',
        'Acolytes und Aberrants im Goliath Truck rücken ins Zentrum.',
        'Purestrains mit Patriarch tauchen per Hinterhalt auf.',
        'Zerstörte Trupps per Cult Ambush zurückbringen.'
      ],
      strengths: ['Viele Einheiten mit Wiederkehr', 'Starke Hinterhalte', 'Viele Charakter-Synergien'],
      weaknesses: ['Einheiten zerbrechlich', 'Komplex'],
      units: [
        { name: 'Patriarch', role: 'char', models: 1, points: 80, leads: 'Purestrain Genestealers', task: 'Warlord; Herr des Kults' },
        { name: 'Magus', role: 'char', models: 1, points: 50, leads: 'Neophyte Hybrids', task: 'Psioniker' },
        { name: 'Primus', role: 'char', models: 1, points: 70, leads: 'Acolyte Hybrids with Autopistols', task: 'Kriegsführer' },
        { name: 'Acolyte Iconward', role: 'char', models: 1, points: 50, leads: 'Acolyte Hybrids with Autopistols', task: 'Banner-Buff' },
        { name: 'Abominant', role: 'char', models: 1, points: 85, pointsNext: 95, nextFrom: 3, leads: 'Aberrants', task: 'Monster-Anführer' },
        { name: 'Biophagus', role: 'char', models: 1, points: 50, leads: 'Aberrants', task: 'Genmanipulator' },
        { name: 'Kelermorph', role: 'char', models: 1, points: 60, task: 'Charakterjäger' },
        { name: 'Reductus Saboteur', role: 'char', models: 1, points: 70, pointsNext: 80, nextFrom: 3, task: 'Sprengstoff-Spezialist' },
        { name: 'Clamavus', role: 'char', models: 1, points: 50, leads: 'Acolyte Hybrids with Autopistols', task: 'Störsender' },
        { name: 'Neophyte Hybrids', role: 'line', models: 10, points: 70, qty: 4, task: 'Missionsziele' },
        { name: 'Acolyte Hybrids with Autopistols', role: 'inf', models: 5, points: 70, qty: 2, task: 'Nahkampf-Kerntruppe' },
        { name: 'Aberrants', role: 'inf', models: 5, points: 140, qty: 2, pointsNext: 150, nextFrom: 3, task: 'Zähe Nahkampf-Monster' },
        { name: 'Hybrid Metamorphs', role: 'inf', models: 5, points: 75, pointsNext: 85, nextFrom: 3, task: 'Nahkampf' },
        { name: 'Purestrain Genestealers', role: 'inf', models: 10, points: 140, pointsNext: 150, nextFrom: 3, task: 'Elite-Hinterhalt' },
        { name: 'Atalan Jackals', role: 'mounted', models: 5, points: 85, qty: 2, pointsNext: 95, nextFrom: 3, task: 'Schnelle Störer' },
        { name: 'Achilles Ridgerunners', role: 'veh', models: 1, points: 95, qty: 2, pointsNext: 105, nextFrom: 3, wargear: [['Heavy mining laser', 10, 1, 1]], loadout: { 'Heavy mining laser': 0 }, task: 'Aufklärung, Raketen' },
        { name: 'Goliath Truck', role: 'trans', models: 1, points: 75, qty: 2, pointsNext: 85, nextFrom: 4, task: 'Transport' }
      ]
    },
    {
      id: 'brood-brothers',
      name: 'Brood Brothers – Abtrünnige Garde',
      detachments: [{ name: 'Brood Brother Auxilia', dp: 2 }, { name: 'Xenocult Masses', dp: 1 }],
      style: ['Fernkampf', 'Panzer', 'Infanterie'],
      difficulty: 3,
      summary:
        'Der Kult hat die örtliche Imperiale Armee unterwandert: Leman Russ, Rogal Dorn und Basilisk kämpfen jetzt für ' +
        'den Sternengott. Mehr Feuerkraft und Panzerung als ein typischer Kult.',
      plan: [
        'Neophyten und Cadian Shock Troops besetzen Missionsziele.',
        'Panzer und Basilisk beschießen die gefährlichsten Ziele.',
        'Acolytes und Kelermorph kontern im Nahkampf.',
        'Chimären bringen Truppen zu späten Missionszielen.'
      ],
      strengths: ['Starke Panzer', 'Viele Infanteriemodelle', 'Ungewöhnliche Mischung'],
      weaknesses: ['Weniger Kult-Synergien', 'Langsamer'],
      units: [
        { name: 'Primus', role: 'char', models: 1, points: 70, leads: 'Neophyte Hybrids', task: 'Warlord; Kriegsführer' },
        { name: 'Magus', role: 'char', models: 1, points: 50, leads: 'Neophyte Hybrids', task: 'Psioniker' },
        { name: 'Kelermorph', role: 'char', models: 1, points: 60, task: 'Charakterjäger' },
        { name: 'Sanctus', role: 'char', models: 1, points: 65, task: 'Kult-Assassine' },
        { name: 'Neophyte Hybrids', role: 'line', models: 10, points: 70, qty: 3, task: 'Missionsziele' },
        { name: 'Cadian Shock Troops', role: 'line', models: 10, points: 70, qty: 2, task: 'Brood-Brothers-Infanterie' },
        { name: 'Acolyte Hybrids with Autopistols', role: 'inf', models: 5, points: 70, qty: 2, task: 'Nahkampf' },
        { name: 'Atalan Jackals', role: 'mounted', models: 5, points: 85, pointsNext: 95, nextFrom: 3, task: 'Störer' },
        { name: 'Achilles Ridgerunners', role: 'veh', models: 1, points: 95, qty: 2, pointsNext: 105, nextFrom: 3, wargear: [['Heavy mining laser', 10, 1, 1]], loadout: { 'Heavy mining laser': 0 }, task: 'Aufklärung' },
        { name: 'Goliath Rockgrinder', role: 'veh', models: 1, points: 120, pointsNext: 130, nextFrom: 3, task: 'Nahkampf-Panzer' },
        { name: 'Leman Russ Battle Tank', role: 'veh', models: 1, points: 160, qty: 2, pointsNext: 175, nextFrom: 3, wargear: [['Multi-melta', 5, 2, 0, 'Seitenkuppeln'], ['Lascannon', 5, 1, 1], ['Plasma cannon', 5, 2, 0, 'Seitenkuppeln']], task: 'Kampfpanzer' },
        { name: 'Rogal Dorn Battle Tank', role: 'veh', models: 1, points: 260, pointsNext: 275, nextFrom: 2, task: 'Superschwerer Panzer' },
        { name: 'Basilisk', role: 'veh', models: 1, points: 115, pointsNext: 135, nextFrom: 2, task: 'Artillerie' },
        { name: 'Chimera', role: 'trans', models: 1, points: 75, qty: 2, pointsNext: 85, nextFrom: 4, task: 'Transporter' }
      ]
    }
  ]
});
