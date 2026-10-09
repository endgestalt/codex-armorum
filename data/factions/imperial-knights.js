/* Imperial Knights */
WH40K.registerFaction({
  id: 'imperial-knights',
  name: 'Imperial Knights',
  aliases: ['Questoris', 'Armiger', 'Freeblade', 'Ritter'],
  group: 'Imperium',
  wahapedia: 'imperial-knights',
  colors: { primary: '#1f3f6e', accent: '#d4a537' },
  tagline: 'Adlige Piloten in gigantischen Kampfläufern',
  description:
    'Feudale Adelshäuser, deren Ritter in turmhohen Kampfmaschinen in die Schlacht ziehen. Eine Armee besteht oft aus ' +
    'nur 5–10 Modellen – aber jedes davon ist ein wandelnder Festungsturm.',
  playstyle: 'Sehr wenige, riesige Modelle. Schnell zu bemalen, taktisch anspruchsvoll beim Missionsspiel.',
  detachments: [
    ['Freeblade Company', 3], ['Questoris Companions', 3], ['Gate Warden Lance', 2],
    ['Spearhead-At-Arms', 2], ['Valourstrike Lance', 2], ['Dominus Foebreakers', 1],
    ['Questor Forgepact', 1], ['Throne-Bonded Outriders', 1]
  ],
  armies: [
    {
      id: 'questoris',
      name: 'Questoris-Lanze',
      detachments: [{ name: 'Valourstrike Lance', dp: 2 }, { name: 'Questor Forgepact', dp: 1 }],
      style: ['Große Läufer', 'Nahkampf & Feuerkraft', 'Wenige Modelle'],
      difficulty: 3,
      summary:
        'Vier große Questoris-Ritter, darunter Canis Rex, plus Armiger als Begleitschutz. Die Ritter laufen gemeinsam vor ' +
        'und zertreten alles im Zentrum, die Armiger halten Missionsziele und jagen Infanterie.',
      plan: [
        'Armiger sichern Seitenziele und schirmen die großen Ritter ab.',
        'Canis Rex und Knight Crusader beschießen gegnerische Fahrzeuge.',
        'Knight Gallant und Paladin stürmen in Runde 2 ins Zentrum.',
        'Ritter bewusst auf Missionszielen positionieren (hohe Kontrolle).'
      ],
      strengths: ['Extrem widerstandsfähige Modelle', 'Hoher Schaden', 'Schnell bemalt'],
      weaknesses: ['Sehr wenige Einheiten', 'Anfällig gegen spezialisierte Panzerabwehr'],
      units: [
        { name: 'Canis Rex', role: 'epic', models: 1, points: 415, task: 'Warlord; legendärer Freeblade' },
        { name: 'Knight Paladin', role: 'veh', models: 1, points: 375, pointsNext: 390, nextFrom: 3, task: 'Allround-Ritter mit Kampfkanone' },
        { name: 'Knight Gallant', role: 'veh', models: 1, points: 355, pointsNext: 370, nextFrom: 3, task: 'Reiner Nahkampf-Ritter' },
        { name: 'Knight Crusader', role: 'veh', models: 1, points: 395, pointsNext: 415, nextFrom: 2, wargear: [['Rapid-fire battle cannon', 15, 1]], loadout: { 'Rapid-fire battle cannon': 1 }, task: 'Feuerkraft-Ritter' },
        { name: 'Armiger Warglaive', role: 'veh', models: 1, points: 140, task: 'Schneller Nahkampf-Begleiter' },
        { name: 'Armiger Helverin', role: 'veh', models: 1, points: 140, qty: 2, task: 'Feuerunterstützung gegen leichte Ziele' }
      ]
    },
    {
      id: 'armiger-pack',
      name: 'Armiger-Rudel mit Dominus',
      detachments: [{ name: 'Spearhead-At-Arms', dp: 2 }, { name: 'Dominus Foebreakers', dp: 1 }],
      style: ['Mehr Aktivierungen', 'Fernkampf', 'Missionsziele'],
      difficulty: 3,
      summary:
        'Ein schwerer Dominus-Castellan als Feuerbasis, dazu ein Rudel Armiger, die über das Feld schwärmen und ' +
        'Missionsziele nehmen. Mehr Einheiten als die klassische Ritterliste – besser fürs Missionsspiel.',
      plan: [
        'Knight Castellan steht zentral und beschießt die gefährlichsten Ziele.',
        'Armiger verteilen sich auf alle Missionsziele.',
        'Gallant und Errant bilden die Nahkampf- und Panzerjagd-Speerspitze.',
        'Armiger Warglaives jagen gegnerische Charaktere und leichte Fahrzeuge.'
      ],
      strengths: ['Mehr Einheiten als typische Ritterlisten', 'Starke Fernkampfbasis', 'Flexibel'],
      weaknesses: ['Armiger einzeln verwundbar', 'Castellan langsam'],
      units: [
        { name: 'Knight Castellan', role: 'char', models: 1, points: 425, pointsNext: 450, nextFrom: 2, task: 'Warlord; superschwerer Dominus-Ritter' },
        { name: 'Knight Gallant', role: 'veh', models: 1, points: 355, pointsNext: 370, nextFrom: 3, task: 'Nahkampf-Ritter' },
        { name: 'Knight Errant', role: 'veh', models: 1, points: 355, pointsNext: 370, nextFrom: 3, task: 'Melta-Ritter gegen Panzer' },
        { name: 'Armiger Warglaive', role: 'veh', models: 1, points: 140, qty: 3, task: 'Schnelle Nahkampf-Armiger' },
        { name: 'Armiger Helverin', role: 'veh', models: 1, points: 140, qty: 3, task: 'Feuerunterstützung' }
      ]
    }
  ]
});
