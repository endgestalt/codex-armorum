/* Adeptus Custodes (inkl. Anathema Psykana) */
WH40K.registerFaction({
  id: 'adeptus-custodes',
  name: 'Adeptus Custodes',
  aliases: ['Custodes', 'Goldene Wächter', 'Sisters of Silence', 'Anathema Psykana'],
  group: 'Imperium',
  wahapedia: 'adeptus-custodes',
  colors: { primary: '#a8801f', accent: '#8f1d1d' },
  tagline: 'Die Zehntausend – Wächter des Imperators',
  description:
    'Jeder Custodian ist ein persönlich vom Imperator geschaffener Halbgott in goldener Rüstung. Kleinste Modellanzahl ' +
    'im Spiel, aber jedes Modell kämpft wie ein Held. Die Sisters of Silence ergänzen sie als Psioniker-Jägerinnen.',
  playstyle: 'Extreme Elite: 25–35 Modelle pro Armee. Jede Entscheidung zählt.',
  detachments: [
    ['Lions of the Emperor', 3], ['Talons Of The Emperor', 3], ['Auric Champions', 2],
    ['Null Maiden Vigil', 2], ['Shield Host', 2], ['Solar Spearhead', 2],
    ['Might of the Moritoi', 1], ['Silent Hunters', 1], ['Tharanatoi Hammerblow', 1]
  ],
  armies: [
    {
      id: 'shield-host',
      name: 'Goldene Schildwacht',
      detachments: [{ name: 'Shield Host', dp: 2 }, { name: 'Might of the Moritoi', dp: 1 }],
      style: ['Elite', 'Nahkampf', 'Zäh'],
      difficulty: 3,
      summary:
        'Custodian Guard und Wardens mit Charakteren bilden unzerbrechliche Blöcke, Allarus-Terminatoren schlagen per ' +
        'Teleport zu, der Telemon-Dreadnought und der Caladius liefern Feuerkraft. Wenig Modelle – jedes ein Monster.',
      plan: [
        'Guard- und Warden-Blöcke mit Shield-Captains besetzen die Mitte.',
        'Allarus-Terminatoren warten in Reserve auf Lücken.',
        'Telemon und Caladius schalten gegnerische Großziele aus.',
        'Prosecutors und Vertus Praetors holen Seiten-Missionsziele.'
      ],
      strengths: ['Jedes Modell extrem stark', 'Sehr verzeihend im Nahkampf', 'Wenig zu bemalen'],
      weaknesses: ['Sehr wenige Modelle für Missionsziele', 'Jeder Verlust schmerzt'],
      units: [
        { name: 'Trajann Valoris', role: 'epic', models: 1, points: 135, leads: 'Custodian Wardens', task: 'Warlord; Captain-General' },
        { name: 'Shield-Captain', role: 'char', models: 1, points: 110, qty: 2, leads: 'Custodian Guard', task: 'Führt einen Guard-Block' },
        { name: 'Shield-Captain in Allarus Terminator Armour', role: 'char', models: 1, points: 130, leads: 'Allarus Custodians', task: 'Teleport-Anführer' },
        { name: 'Blade Champion', role: 'char', models: 1, points: 110, pointsNext: 125, nextFrom: 2, task: 'Duellant mit hohem Schaden' },
        { name: 'Custodian Guard', role: 'line', models: 4, points: 170, qty: 2, pointsNext: 180, nextFrom: 4, task: 'Kern-Infanterie' },
        { name: 'Custodian Wardens', role: 'inf', models: 4, points: 200, pointsNext: 220, nextFrom: 2, task: 'Defensiver Elite-Block' },
        { name: 'Allarus Custodians', role: 'inf', models: 3, points: 165, pointsNext: 195, nextFrom: 3, task: 'Teleport-Terminatoren' },
        { name: 'Prosecutors', role: 'inf', models: 4, points: 45, task: 'Günstige Missionsziel-Halterinnen' },
        { name: 'Vertus Praetors', role: 'mounted', models: 3, points: 215, pointsNext: 240, nextFrom: 3, task: 'Schnelle Jetbike-Elite' },
        { name: 'Telemon Heavy Dreadnought', role: 'veh', models: 1, points: 225, pointsNext: 245, nextFrom: 2, task: 'Schwerer Läufer' },
        { name: 'Caladius Grav-tank', role: 'veh', models: 1, points: 210, pointsNext: 225, nextFrom: 3, wargear: [['Twin arachnus heavy blaze cannon', 15, 1]], task: 'Panzerjäger' }
      ]
    },
    {
      id: 'solar-spearhead',
      name: 'Sonnen-Speerspitze',
      detachments: [{ name: 'Solar Spearhead', dp: 2 }, { name: 'Silent Hunters', dp: 1 }],
      style: ['Schnell', 'Fahrzeuge', 'Jetbikes'],
      difficulty: 3,
      summary:
        'Jetbikes, Grav-Panzer und der Coronus-Transporter tragen die Goldenen über das Feld, Sisters of Silence jagen ' +
        'feindliche Psioniker. Mobiler und schussstärker als die klassische Custodes-Liste.',
      plan: [
        'Caladius-Panzer beschießen gegnerische Fahrzeuge ab Runde 1.',
        'Vertus Praetors mit Shield-Captain auf Dawneagle fliegen auf Flanken.',
        'Coronus bringt Custodian Guard ins Zentrum.',
        'Sisters of Silence jagen Psioniker und erfüllen Nebenaufträge.'
      ],
      strengths: ['Schnell und feuerstark', 'Harte Fahrzeuge', 'Gute Panzerabwehr'],
      weaknesses: ['Sehr wenige Einheiten', 'Teuer pro Modell'],
      units: [
        { name: 'Shield-Captain on Dawneagle Jetbike', role: 'char', models: 1, points: 140, leads: 'Vertus Praetors', task: 'Warlord; schneller Anführer' },
        { name: 'Knight-Centura', role: 'char', models: 1, points: 55, leads: 'Witchseekers', task: 'Führt die Sisters of Silence' },
        { name: 'Custodian Guard', role: 'line', models: 4, points: 170, qty: 2, pointsNext: 180, nextFrom: 4, task: 'Kern-Infanterie' },
        { name: 'Witchseekers', role: 'inf', models: 4, points: 50, task: 'Flammenwerfer gegen Psioniker' },
        { name: 'Vigilators', role: 'inf', models: 4, points: 50, task: 'Nahkampf-Psionikerjägerinnen' },
        { name: 'Prosecutors', role: 'inf', models: 4, points: 45, task: 'Missionsziele' },
        { name: 'Vertus Praetors', role: 'mounted', models: 3, points: 215, qty: 2, pointsNext: 240, nextFrom: 3, task: 'Jetbike-Kavallerie' },
        { name: 'Contemptor-Galatus Dreadnought', role: 'veh', models: 1, points: 165, pointsNext: 180, nextFrom: 3, task: 'Zäher Nahkampf-Läufer' },
        { name: 'Caladius Grav-tank', role: 'veh', models: 1, points: 210, qty: 2, pointsNext: 225, nextFrom: 3, wargear: [['Twin arachnus heavy blaze cannon', 15, 1]], task: 'Panzerjäger' },
        { name: 'Coronus Grav-carrier', role: 'trans', models: 1, points: 180, pointsNext: 200, nextFrom: 3, task: 'Transport und Feuerkraft' },
        { name: 'Shield-Captain', role: 'char', models: 1, points: 110, task: 'Führt einen Guard-Block' }
      ]
    }
  ]
});
