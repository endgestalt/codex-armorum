/* Imperial Agents (Inquisition, Assassinen, Adeptus Arbites, Imperialis Fleet) */
WH40K.registerFaction({
  id: 'imperial-agents',
  name: 'Imperial Agents',
  aliases: ['Inquisition', 'Assassinorum', 'Officio Assassinorum', 'Arbites', 'Navy Breachers'],
  group: 'Imperium',
  wahapedia: 'imperial-agents',
  colors: { primary: '#4a1f1f', accent: '#c9a24a' },
  tagline: 'Inquisitoren, Assassinen und Vollstrecker',
  description:
    'Die Werkzeuge der imperialen Macht hinter den Kulissen: Inquisitoren und ihr Gefolge, die Tempel-Assassinen, ' +
    'die Arbites und die Entertrupps der Flotte. Kann eigenständig oder als Verstärkung anderer imperialer Armeen gespielt werden.',
  playstyle: 'Bunte Spezialistentruppe mit vielen Charakteren und Missionsziel-Werkzeugen.',
  detachments: [
    ['Imperialis Fleet', 2], ['Ordo Hereticus Purgation Force', 2], ['Ordo Malleus Daemon Hunters', 2],
    ['Ordo Xenos Alien Hunters', 2], ['Veiled Blade Elimination Force', 1]
  ],
  armies: [
    {
      id: 'malleus',
      name: 'Ordo Malleus – Dämonenjagd',
      detachments: [{ name: 'Ordo Malleus Daemon Hunters', dp: 2 }, { name: 'Veiled Blade Elimination Force', dp: 1 }],
      style: ['Gemischt', 'Charakterjagd', 'Elite-Kern'],
      difficulty: 4,
      summary:
        'Inquisitor Coteaz führt eine Truppe aus Grey-Knights-Verstärkung, Arbites und Navy Breachers an, während alle vier ' +
        'Tempel-Assassinen gezielt gegnerische Schlüsselfiguren ausschalten.',
      plan: [
        'Navy Breachers und Arbites halten Missionsziele.',
        'Drei Grey-Knights-Terminator-Trupps bilden den harten Kern.',
        'Assassinen jagen Charaktere, Psioniker und Fahrzeuge.',
        'Inquisitorial Agents erfüllen Nebenaufträge.'
      ],
      strengths: ['Viele Spezialisten', 'Starke Charakterjagd', 'Unberechenbar für Gegner'],
      weaknesses: ['Komplex in der Handhabung', 'Wenig Synergie zwischen Untergruppen'],
      units: [
        { name: 'Inquisitor Coteaz', role: 'epic', models: 1, points: 75, task: 'Warlord; Meister der Ordo Malleus' },
        { name: 'Inquisitor', role: 'char', models: 1, points: 55, task: 'Unterstützung, Nebenaufträge' },
        { name: 'Callidus Assassin', role: 'epic', models: 1, points: 100, task: 'Gestaltwandlerin, Störung' },
        { name: 'Vindicare Assassin', role: 'epic', models: 1, points: 110, task: 'Scharfschütze gegen Charaktere' },
        { name: 'Eversor Assassin', role: 'epic', models: 1, points: 100, task: 'Nahkampf-Berserker' },
        { name: 'Culexus Assassin', role: 'epic', models: 1, points: 85, task: 'Psionikerjäger' },
        { name: 'Inquisitorial Agents', role: 'inf', models: 6, points: 50, qty: 2, task: 'Nebenaufträge, Missionsziele' },
        { name: 'Imperial Navy Breachers', role: 'line', models: 10, points: 90, qty: 4, task: 'Zähe Missionsziel-Halter' },
        { name: 'Exaction Squad', role: 'inf', models: 11, points: 90, qty: 2, task: 'Arbites-Feuerlinie' },
        { name: 'Subductor Squad', role: 'inf', models: 11, points: 85, qty: 2, task: 'Arbites-Nahkampf' },
        { name: 'Voidsmen-at-Arms', role: 'inf', models: 6, points: 50, task: 'Günstige Abschirmung' },
        { name: 'Grey Knights Terminator Squad', role: 'inf', models: 5, points: 175, qty: 3, wargear: [['Psycannon', 5, 1]], loadout: { 'Psycannon': 1 }, task: 'Harter Grey-Knights-Kern' },
        { name: 'Inquisitor in Terminator Armour', role: 'char', models: 1, points: 70, leads: 'Exaction Squad', task: 'Führt die Arbites des Exaction Squad' }
      ]
    },
    {
      id: 'xenos',
      name: 'Ordo Xenos – Alienjäger',
      detachments: [{ name: 'Ordo Xenos Alien Hunters', dp: 2 }, { name: 'Veiled Blade Elimination Force', dp: 1 }],
      style: ['Elite-Schützen', 'Spezialmunition', 'Flieger'],
      difficulty: 4,
      summary:
        'Deathwatch Kill Teams im Dienste der Ordo Xenos, unterstützt durch Flottentrupps und Assassinen. ' +
        'Präzise Elite-Schützen, die per Corvus Blackstar überall auftauchen.',
      plan: [
        'Navy Breachers und Voidsmen sichern Missionsziele.',
        'Kill Teams fliegen mit Corvus Blackstars an Schlüsselpositionen.',
        'Assassinen und Rogue Trader stören den Gegner.',
        'Watch Master koordiniert die Kill Teams im Zentrum.'
      ],
      strengths: ['Präzise Elite-Schützen', 'Mobil durch Flieger', 'Viele Charaktere'],
      weaknesses: ['Teure Kill Teams', 'Wenig Masse'],
      units: [
        { name: 'Inquisitor', role: 'char', models: 1, points: 55, task: 'Warlord; Ordo-Xenos-Inquisitor' },
        { name: 'Watch Master', role: 'char', models: 1, points: 95, leads: 'Deathwatch Kill Team', task: 'Führt einen Kill Team' },
        { name: 'Rogue Trader Entourage', role: 'char', models: 4, points: 75, task: 'Freihändler mit Gefolge' },
        { name: 'Callidus Assassin', role: 'epic', models: 1, points: 100, task: 'Störung' },
        { name: 'Vindicare Assassin', role: 'epic', models: 1, points: 110, task: 'Charakterjagd' },
        { name: 'Eversor Assassin', role: 'epic', models: 1, points: 100, task: 'Nahkampf-Berserker' },
        { name: 'Culexus Assassin', role: 'epic', models: 1, points: 85, task: 'Psionikerjäger' },
        { name: 'Deathwatch Kill Team', role: 'inf', models: 5, points: 100, qty: 3, task: 'Elite-Xenosjäger' },
        { name: 'Imperial Navy Breachers', role: 'line', models: 10, points: 90, qty: 3, task: 'Missionsziele' },
        { name: 'Voidsmen-at-Arms', role: 'inf', models: 6, points: 50, qty: 2, task: 'Abschirmung' },
        { name: 'Inquisitorial Agents', role: 'inf', models: 6, points: 50, qty: 2, task: 'Nebenaufträge' },
        { name: 'Exaction Squad', role: 'inf', models: 11, points: 90, task: 'Feuerlinie' },
        { name: 'Subductor Squad', role: 'inf', models: 11, points: 85, task: 'Nahkampf' },
        { name: 'Corvus Blackstar', role: 'fly', models: 1, points: 180, qty: 2, task: 'Transportflieger' },
        { name: 'Inquisitor Coteaz', role: 'epic', models: 1, points: 75, task: 'Warlord; Meister der Ordo Malleus' }
      ]
    }
  ]
});
