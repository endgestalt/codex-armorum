/* Chaos Daemons */
WH40K.registerFaction({
  id: 'chaos-daemons',
  name: 'Chaos Daemons',
  aliases: ['Dämonen', 'Khorne', 'Nurgle', 'Tzeentch', 'Slaanesh', "Be'lakor"],
  group: 'Chaos',
  wahapedia: 'chaos-daemons',
  colors: { primary: '#4b0f2f', accent: '#e07a3a' },
  tagline: 'Die Diener der vier Dunklen Götter',
  description:
    'Wesen aus reiner Warp-Energie, die in die Realität einbrechen. Jeder der vier Götter – Khorne, Nurgle, Tzeentch und ' +
    'Slaanesh – hat eigene Dämonen. Gemischte Armeen oder reine Gottlegionen sind möglich.',
  playstyle: 'Schocktruppen, Großdämonen und Horden. Sehr viele Spielweisen je nach Gott.',
  detachments: [
    ['Daemonic Incursion', 3], ['Blood Legion', 2], ['Legion of Excess', 2],
    ['Plague Legion', 2], ['Scintillating Legion', 2], ['Shadow Legion', 2],
    ['Cavalcade of Chaos', 1], ['Lords of the Warp', 1], ['Warptide', 1]
  ],
  armies: [
    {
      id: 'incursion',
      name: 'Dämonische Invasion – Alle Götter',
      detachments: [{ name: 'Daemonic Incursion', dp: 3 }],
      style: ['Gemischt', 'Schocktruppen', 'Großdämonen'],
      difficulty: 3,
      summary:
        "Be'lakor und zwei Großdämonen führen Dämonen aller vier Götter an. Viele Einheiten kommen aus dem Warp " +
        '(Schocktruppen), um den Gegner überall gleichzeitig zu bedrohen.',
      plan: [
        'Plaguebearers und Nurglings sichern Heimziele.',
        "Be'lakor und Bloodthirster greifen früh im Zentrum an.",
        'Bloodletters und Flesh Hounds landen per Schocktruppe auf Seitenzielen.',
        'Horrors und Screamers bekämpfen Fahrzeuge und Infanterie.'
      ],
      strengths: ['Sehr flexibel', 'Viele Schocktruppen', 'Starke Großdämonen'],
      weaknesses: ['Keine Synergien eines Gottes', 'Kein schwerer Fernkampf'],
      units: [
        { name: "Be'lakor", role: 'epic', models: 1, points: 390, task: 'Warlord; Dunkler Meister' },
        { name: 'Bloodthirster', role: 'mon', models: 1, points: 320, pointsNext: 335, nextFrom: 3, task: 'Großdämon des Khorne' },
        { name: 'Great Unclean One', role: 'mon', models: 1, points: 265, pointsNext: 280, nextFrom: 3, task: 'Großdämon des Nurgle' },
        { name: 'Bloodmaster', role: 'char', models: 1, points: 65, leads: 'Bloodletters', task: 'Khorne-Herold' },
        { name: 'Bloodletters', role: 'line', models: 10, points: 110, qty: 2, task: 'Nahkampf-Schocktruppe' },
        { name: 'Plaguebearers', role: 'line', models: 10, points: 115, task: 'Zähe Missionsziel-Halter' },
        { name: 'Pink Horrors', role: 'line', models: 10, points: 150, task: 'Psi-Schützen' },
        { name: 'Daemonettes', role: 'line', models: 10, points: 100, task: 'Schnelle Nahkämpferinnen' },
        { name: 'Flesh Hounds', role: 'beast', models: 5, points: 75, qty: 2, task: 'Jäger' },
        { name: 'Nurglings', role: 'beast', models: 3, points: 45, task: 'Infiltrieren, Heimziel' },
        { name: 'Screamers', role: 'beast', models: 3, points: 80, task: 'Fahrzeugjäger' },
        { name: 'Seekers', role: 'mounted', models: 5, points: 85, task: 'Schnelle Missionsziel-Jäger' }
      ]
    },
    {
      id: 'plague-legion',
      name: 'Seuchenlegion des Nurgle',
      detachments: [{ name: 'Plague Legion', dp: 2 }, { name: 'Lords of the Warp', dp: 1 }],
      style: ['Zäh', 'Missionsziele', 'Langsam'],
      difficulty: 2,
      summary:
        'Rotigus, ein Great Unclean One und Herolde Nurgles führen eine zähe Masse aus Plaguebearers, Plague Drones und ' +
        'Beasts of Nurgle. Die Armee nimmt Missionsziele ein und ist dort kaum zu vertreiben.',
      plan: [
        'Plaguebearers verteilen sich auf alle Missionsziele.',
        'Gnarlmaw und Herolde stärken die zentrale Masse.',
        'Plague Drones jagen Seitenziele und Fahrzeuge.',
        'Großdämonen kontern im Zentrum.'
      ],
      strengths: ['Extrem zäh', 'Sehr gute Missionszielkontrolle', 'Einfache Spielweise'],
      weaknesses: ['Langsam', 'Wenig Schaden'],
      units: [
        { name: 'Rotigus', role: 'epic', models: 1, points: 280, task: 'Warlord; Regenbringer' },
        { name: 'Great Unclean One', role: 'mon', models: 1, points: 265, pointsNext: 280, nextFrom: 3, task: 'Großdämon' },
        { name: 'Epidemius', role: 'epic', models: 1, points: 80, task: 'Seuchen-Buchhalter' },
        { name: 'Horticulous Slimux', role: 'epic', models: 1, points: 120, task: 'Gärtner Nurgles' },
        { name: 'Poxbringer', role: 'char', models: 1, points: 60, pointsNext: 70, nextFrom: 3, leads: 'Plaguebearers', task: 'Herold' },
        { name: 'Sloppity Bilepiper', role: 'char', models: 1, points: 55, leads: 'Plaguebearers', task: 'Herold' },
        { name: 'Spoilpox Scrivener', role: 'char', models: 1, points: 60, leads: 'Plaguebearers', task: 'Herold' },
        { name: 'Plaguebearers', role: 'line', models: 10, points: 115, qty: 4, task: 'Missionsziel-Masse' },
        { name: 'Nurglings', role: 'beast', models: 3, points: 45, task: 'Infiltrieren' },
        { name: 'Beasts of Nurgle', role: 'beast', models: 1, points: 80, qty: 3, task: 'Zähe Blocker' },
        { name: 'Plague Drones', role: 'mounted', models: 3, points: 110, qty: 2, task: 'Schnelle Angreifer' },
        { name: 'Feculent Gnarlmaw', role: 'fort', models: 1, points: 100, task: 'Seuchenbaum, Aura' }
      ]
    }
  ]
});
