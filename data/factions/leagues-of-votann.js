/* Leagues of Votann */
WH40K.registerFaction({
  id: 'leagues-of-votann',
  name: 'Leagues of Votann',
  aliases: ['Votann', 'Squats', 'Kin', 'Hearthkyn'],
  group: 'Xenos',
  wahapedia: 'leagues-of-votann',
  wahapediaConnectors: 'lower',
  colors: { primary: '#9a4f1a', accent: '#5fc4c4' },
  tagline: 'Die Kin – Prospektoren mit Ahnen-Technologie',
  description:
    'Die Kin sind robuste, pragmatische Bergbau- und Händlervölker, die von uralten Ahnen-Kernen geleitet werden. ' +
    'Sie kombinieren schwere Rüstung mit präziser Feuerkraft und rechnen jedem Feind seinen Groll (Judgement Tokens) vor.',
  playstyle: 'Zäh, solide Feuerkraft, Groll-Marker auf gegnerischen Einheiten.',
  detachments: [
    ['Hearthband', 3], ['Brandfast Oathband', 2], ['Dêlve Assault Shift', 2],
    ['Hearthfyre Arsenal', 2], ['Mercenary Oathband', 2], ['Needgaârd Oathband', 2],
    ['Persecution Prospect', 2], ['Armoured Trailblazers', 1], ['Farseekers', 1],
    ['Hearthguard Covenant', 1]
  ],
  armies: [
    {
      id: 'hearthband',
      name: 'Herdfeuer-Schar',
      detachments: [{ name: 'Hearthband', dp: 3 }],
      style: ['Zäh', 'Fernkampf', 'Fahrzeuge'],
      difficulty: 2,
      summary:
        'Hearthkyn Warriors und Einhyr Hearthguard rücken in Sagitaurs und hinter Hekaton-Landfestungen vor. ' +
        'Solide, gepanzerte Feuerlinie mit starkem Nahkampfkonter durch die Cthonian Beserks.',
      plan: [
        'Hearthkyn Warriors besetzen Mittel- und Heimziele.',
        'Hekatons beschießen Fahrzeuge und transportieren Hearthguard.',
        'Thunderkyn unterdrücken gegnerische Infanterie.',
        'Hearthguard mit Kâhl und Beserks kontern im Zentrum.'
      ],
      strengths: ['Sehr robuste Infanterie und Fahrzeuge', 'Gute Feuerkraft', 'Einfacher Spielplan'],
      weaknesses: ['Eher langsam', 'Wenige Modelle'],
      units: [
        { name: 'Ûthar the Destined', role: 'epic', models: 1, points: 90, leads: 'Einhyr Hearthguard', task: 'Warlord; Held der Kin' },
        { name: 'Kâhl', wahapedia: 'K-hl', role: 'char', models: 1, points: 65, leads: 'Einhyr Hearthguard', task: 'Anführer' },
        { name: 'Einhyr Champion', role: 'char', models: 1, points: 65, leads: 'Einhyr Hearthguard', task: 'Nahkampf-Held' },
        { name: 'Grimnyr', role: 'char', models: 3, points: 65, leads: 'Hearthkyn Warriors', task: 'Psi-Ahnenrufer' },
        { name: 'Hearthkyn Warriors', role: 'line', models: 10, points: 90, qty: 2, task: 'Kern-Infanterie' },
        { name: 'Einhyr Hearthguard', role: 'inf', models: 5, points: 130, qty: 3, pointsNext: 140, nextFrom: 3, task: 'Elite-Infanterie' },
        { name: 'Cthonian Beserks', role: 'inf', models: 5, points: 95, task: 'Nahkampf-Bergleute' },
        { name: 'Brôkhyr Thunderkyn', role: 'inf', models: 3, points: 80, qty: 2, pointsNext: 90, nextFrom: 3, task: 'Schwere Waffen' },
        { name: 'Hernkyn Pioneers', role: 'mounted', models: 3, points: 80, pointsNext: 90, nextFrom: 3, task: 'Schnelle Aufklärer' },
        { name: 'Hekaton Land Fortress', role: 'veh', models: 1, points: 250, qty: 2, pointsNext: 265, nextFrom: 2, task: 'Schwerer Transporter/Panzer' },
        { name: 'Sagitaur', role: 'trans', models: 1, points: 85, qty: 2, pointsNext: 95, nextFrom: 4, task: 'Leichte Transporter' },
        { name: 'Cthonian Earthshakers', role: 'veh', models: 2, points: 100, task: 'Artillerie' }
      ]
    },
    {
      id: 'prospect',
      name: 'Verfolgungs-Prospekt',
      detachments: [{ name: 'Persecution Prospect', dp: 2 }, { name: 'Farseekers', dp: 1 }],
      style: ['Schnell', 'Fahrzeuge & Bikes', 'Jagd'],
      difficulty: 3,
      summary:
        'Hernkyn-Pioniere, Yaegirs und drei Sagitaurs jagen über das Feld, setzen Groll-Marker und picken einzelne Ziele ' +
        'heraus. Die schnellste Spielweise der Kin.',
      plan: [
        'Yaegirs infiltrieren und markieren Ziele.',
        'Pioneers und Sagitaurs jagen über die Flanken.',
        'Hearthkyn im Sagitaur nehmen Missionsziele ein.',
        'Hekaton und Thunderkyn liefern schwere Feuerkraft.'
      ],
      strengths: ['Sehr mobil für Votann', 'Viele Aktivierungen', 'Groll-Synergien'],
      weaknesses: ['Leichtere Einheiten', 'Anspruchsvoll beim Positionieren'],
      units: [
        { name: 'Kâhl', wahapedia: 'K-hl', role: 'char', models: 1, points: 65, leads: 'Einhyr Hearthguard', task: 'Warlord' },
        { name: 'Brôkhyr Iron-master', role: 'char', models: 5, points: 70, task: 'Repariert Fahrzeuge' },
        { name: 'Grimnyr', role: 'char', models: 3, points: 65, leads: 'Hearthkyn Warriors', task: 'Psi-Unterstützung' },
        { name: 'Hearthkyn Warriors', role: 'line', models: 10, points: 90, qty: 2, task: 'Kern-Infanterie' },
        { name: 'Hernkyn Yaegirs', role: 'inf', models: 10, points: 90, qty: 2, task: 'Infiltrierende Jäger' },
        { name: 'Einhyr Hearthguard', role: 'inf', models: 5, points: 130, pointsNext: 140, nextFrom: 3, task: 'Elite' },
        { name: 'Brôkhyr Thunderkyn', role: 'inf', models: 3, points: 80, qty: 2, pointsNext: 90, nextFrom: 3, task: 'Schwere Waffen' },
        { name: 'Hernkyn Pioneers', role: 'mounted', models: 3, points: 80, qty: 3, pointsNext: 90, nextFrom: 3, task: 'Schnelle Jäger' },
        { name: 'Cthonian Earthshakers', role: 'veh', models: 2, points: 100, task: 'Artillerie' },
        { name: 'Hekaton Land Fortress', role: 'veh', models: 1, points: 250, pointsNext: 265, nextFrom: 2, qty: 2, task: 'Schwerer Panzer' },
        { name: 'Sagitaur', role: 'trans', models: 1, points: 85, qty: 3, pointsNext: 95, nextFrom: 4, task: 'Schnelle Transporter' }
      ]
    }
  ]
});
