<#
.SYNOPSIS
  Erzeugt data/images.js neu: ordnet jeder Einheit ein Produktfoto aus dem Games-Workshop-Webshop zu.

.DESCRIPTION
  Nutzt die öffentliche Produktsuche des GW-Webshops (englischer Katalog), gefiltert auf Warhammer 40,000
  und die jeweilige Fraktion. Bewertet Treffer nach Namensübereinstimmung.
  - $SearchTerms: abweichende Suchbegriffe, wenn der Bausatz anders heißt als das Datenblatt.
  - $Exclude: Einheiten, für die die Suche nachweislich ein falsches Modell liefert (bleiben ohne Bild).
  Ergebnisbericht im Cache-Ordner (images-report.txt). Vor dem Übernehmen Stichproben in der App prüfen.

.PARAMETER Out
  Zieldatei (Standard: data/images.js). Zum Vergleichen z. B. eine Datei im Temp-Ordner angeben.

.EXAMPLE
  .\tools\3-update-images.ps1
#>
param(
  [string]$Out,
  [string]$Cache = (Join-Path $env:TEMP 'codex-armorum-cache')
)
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'lib\common.ps1')
if (-not $Out) { $Out = Join-Path $ProjectRoot 'data\images.js' }
New-Item -ItemType Directory -Force $Cache | Out-Null

# Öffentlicher Such-Schlüssel des Webshops (wird so auch vom Shop im Browser verwendet)
$hdr = @{ 'x-algolia-api-key' = '92c6a8254f9d34362df8e6d96475e5d8'; 'x-algolia-application-id' = 'M5ZIQZNQ2H' }
$endpoint = 'https://m5ziqznq2h-dsn.algolia.net/1/indexes/prod-lazarus-product-en-gb/query'
$G = 'GameSystemsRoot.lvl2:Warhammer 40,000 > '
$facetOf = @{
  'space-marines' = @('Space Marines > Space Marines', 'Space Marines > Ultramarines')
  'blood-angels' = @('Space Marines > Blood Angels', 'Space Marines > Space Marines')
  'dark-angels' = @('Space Marines > Dark Angels', 'Space Marines > Space Marines')
  'space-wolves' = @('Space Marines > Space Wolves', 'Space Marines > Space Marines')
  'black-templars' = @('Space Marines > Black Templars', 'Space Marines > Space Marines')
  'deathwatch' = @('Space Marines > Deathwatch', 'Space Marines > Space Marines')
  'grey-knights' = @('Space Marines > Grey Knights')
  'adepta-sororitas' = @('Armies of the Imperium > Adepta Sororitas')
  'adeptus-custodes' = @('Armies of the Imperium > Adeptus Custodes')
  'adeptus-mechanicus' = @('Armies of the Imperium > Adeptus Mechanicus')
  'astra-militarum' = @('Armies of the Imperium > Astra Militarum')
  'imperial-knights' = @('Armies of the Imperium > Imperial Knights')
  'imperial-agents' = @('Armies of the Imperium > Imperial Agents', 'Space Marines > Grey Knights', 'Space Marines > Deathwatch')
  'chaos-space-marines' = @('Armies of Chaos > Chaos Space Marines')
  'death-guard' = @('Armies of Chaos > Death Guard')
  'thousand-sons' = @('Armies of Chaos > Thousand Sons')
  'world-eaters' = @('Armies of Chaos > World Eaters', 'Armies of Chaos > Chaos Daemons')
  'emperors-children' = @("Armies of Chaos > Emperor's Children", 'Armies of Chaos > Chaos Daemons')
  'chaos-daemons' = @('Armies of Chaos > Chaos Daemons')
  'chaos-knights' = @('Armies of Chaos > Chaos Knights')
  'aeldari' = @('Xenos Armies > Aeldari'); 'drukhari' = @('Xenos Armies > Drukhari'); 'necrons' = @('Xenos Armies > Necrons')
  'orks' = @('Xenos Armies > Orks'); 'tau-empire' = @("Xenos Armies > T'au Empire"); 'tyranids' = @('Xenos Armies > Tyranids')
  'genestealer-cults' = @('Xenos Armies > Genestealer Cults', 'Armies of the Imperium > Astra Militarum')
  'leagues-of-votann' = @('Xenos Armies > Leagues of Votann')
}

# Bausatz heißt anders als das Datenblatt -> eigener Suchbegriff (Suche ohne Fraktionsfilter, alle Begriffe müssen passen)
$SearchTerms = [ordered]@{
  'Suppressor Squad' = 'Suppressors'; 'Wolf Lord on Thunderwolf' = 'Thunderwolf'; 'Marshal' = 'Black Templars Marshal'
  'Sword Brethren Squad' = 'Sword Brethren'; 'Eliminator Squad' = 'Eliminators'; 'Ironstrider Ballistarii' = 'Ironstrider Ballistarius'
  'Death Guard Rhino' = 'Chaos Rhino'; 'Thousand Sons Rhino' = 'Chaos Rhino'; 'World Eaters Rhino' = 'Chaos Rhino'; "Emperor's Children Rhino" = 'Chaos Rhino'
  'Thousand Sons Defiler' = 'Defiler'; 'Thousand Sons Forgefiend' = 'Forgefiend'; 'Thousand Sons Chaos Spawn' = 'Chaos Spawn'
  'World Eaters Chaos Spawn' = 'Chaos Spawn'; "Emperor's Children Chaos Spawn" = 'Chaos Spawn'; 'World Eaters Maulerfiend' = 'Maulerfiend'
  "Emperor's Children Maulerfiend" = 'Maulerfiend'; 'World Eaters Land Raider' = 'Chaos Land Raider'; "Emperor's Children Land Raider" = 'Chaos Land Raider'
  "Emperor's Children Heldrake" = 'Heldrake'; 'World Eaters Master of Executions' = 'Master of Executions'; 'World Eaters Lord on Juggernaut' = 'Lord on Juggernaut'
  'Daemon Prince of Khorne with Wings' = 'Daemon Prince'; 'Mek Gunz' = 'Mek Gunz'; 'Commander in Coldstar Battlesuit' = "T'au Empire Commander"
  'Commander in Enforcer Battlesuit' = "T'au Empire Commander"; 'Carnifexes' = 'Carnifex'; 'Purestrain Genestealers' = 'Genestealers'
  'Death Company Marines' = 'Death Company Marines'; 'Death Company Dreadnought' = 'Death Company Dreadnought'; 'Kâhl' = 'Kahl'
}
# Suche liefert nachweislich ein falsches Modell -> kein Bild (in der App per Klick eigenes Bild hinterlegen)
$Exclude = @('Scout Squad', 'Stealth Battlesuits', 'Knarloc Riders', 'Inquisitor in Terminator Armour', 'Inquisitor', 'Brotherhood Librarian',
  'Brotherhood Chaplain', 'Knight Abominant', 'Knight Desecrator', 'Knight Rampager', 'Lieutenant in Phobos Armour')

function N2([string]$s) { ([regex]::Replace($s.Normalize([Text.NormalizationForm]::FormD), '[̀-ͯ]', '')).ToLowerInvariant() -replace '[^a-z0-9 ]', ' ' -replace '\s+', ' ' }
$stop = @('the', 'with', 'of', 'in', 'on', 'and', 'squad', 'team', 'unit', 'units', 'a')
function Words([string]$s) { (N2 $s).Trim() -split ' ' | Where-Object { $_ -and $_ -notin $stop } | ForEach-Object { if ($_.Length -gt 4 -and $_.EndsWith('s')) { $_.Substring(0, $_.Length - 1) } else { $_ } } }
$badName = '(?i)legions imperialis|kill team|combat patrol|battleforce|paints|transfers|upgrade|keychain|codex|cards|dice|army set|starter|introductory|getting started|bundle|terrain|boarding patrol|spearhead'

function Search([string]$q, $facets) {
  Start-Sleep -Milliseconds 120
  $ff = @(, @('GameSystemsRoot.lvl0:Warhammer 40,000')); $ff += , @('productType:miniatureKit')
  if ($facets) { $ff += , @($facets | ForEach-Object { $G + $_ }) }
  $body = @{ query = $q; hitsPerPage = 20; facetFilters = $ff; attributesToRetrieve = @('name', 'slug', 'images'); attributesToHighlight = @() } | ConvertTo-Json -Compress -Depth 5
  ((Invoke-WebRequest -UseBasicParsing -Method Post -Uri $endpoint -Headers $hdr -ContentType 'application/json; charset=utf-8' -Body ([Text.Encoding]::UTF8.GetBytes($body))).Content | ConvertFrom-Json).hits
}
function ImageOf($hit) { @($hit.images) | Where-Object { $_ -match '/920x950/.+\.(jpg|png)$' } | Select-Object -First 1 }
# Bewertung: fehlende Wörter des Datenblatts kosten viel, zusätzliche Wörter im Produktnamen wenig
function Pick($hits, [string]$q) {
  $want = @(Words $q); $best = $null
  foreach ($hit in $hits) {
    if ($hit.name -match $badName) { continue }
    $img = ImageOf $hit; if (-not $img) { continue }
    $nm = $hit.name -replace '^[^:]+:\s*', ''
    $have = @(Words $nm)
    $common = @($want | Where-Object { $have -contains $_ }).Count
    if ($common -eq 0) { continue }
    $score = 100 - 30 * ($want.Count - $common) - 8 * ($have.Count - $common)
    if ((N2 $nm).Trim() -eq (N2 $q).Trim()) { $score += 50 }
    if (-not $best -or $score -gt $best.score) { $best = [pscustomobject]@{ name = $hit.name; slug = $hit.slug; img = $img; score = $score } }
  }
  $best
}
function Simplify([string]$n) { (($n -replace "^(World Eaters|Emperor's Children|Thousand Sons|Death Guard|Ravenwing|Deathwing) ", '') -replace ' (with|on) .*$', '').Trim() }

$units = [ordered]@{}
foreach ($u in Get-AllUnits) { if (-not $units.Contains($u.Name)) { $units[$u.Name] = $u.File } }
Write-Host "Einheiten: $($units.Count)"

$lines = New-Object System.Collections.Generic.List[string]
$rep = New-Object System.Collections.Generic.List[string]
$i = 0
foreach ($n in $units.Keys) {
  $i++; Write-Progress -Activity 'Produktfotos' -Status $n -PercentComplete (100 * $i / $units.Count)
  if ($Exclude -contains $n) { $rep.Add("AUS  $n"); continue }
  $best = $null
  if ($SearchTerms.Contains($n)) {
    $q = $SearchTerms[$n]; $want = @(Words $q)
    $hit = Search $q $null | Where-Object { $_.name -notmatch $badName -and (ImageOf $_) } | Where-Object {
      $have = @(Words $_.name); @($want | Where-Object { $have -notcontains $_ }).Count -eq 0
    } | Sort-Object { $_.name.Length } | Select-Object -First 1
    if ($hit) { $best = [pscustomobject]@{ name = $hit.name; slug = $hit.slug; img = (ImageOf $hit); score = 100 } }
  } else {
    $fac = $facetOf[$units[$n]]
    $q = $n -replace 'â', 'a' -replace 'ô', 'o' -replace 'Û', 'U'
    $best = Pick (Search $q $fac) $q
    if (-not $best -or $best.score -lt 60) {
      $s = Simplify $q
      if ($s -ne $q) { $b2 = Pick (Search $s $fac) $s; if ($b2 -and (-not $best -or $b2.score -gt $best.score)) { $best = $b2 } }
    }
  }
  if ($best -and $best.score -ge 50) {
    $lines.Add("  '" + $n.Replace("'", "\'") + "': { img: '$($best.img)', slug: '$($best.slug)', product: '" + $best.name.Replace("'", "\'") + "' }")
    $rep.Add("OK   [$($best.score)] $n  ->  $($best.name)")
  } else {
    $rep.Add("--   $n" + $(if ($best) { "  (bester: $($best.name) [$($best.score)])" } else { '' }))
  }
}
Write-Progress -Activity 'Produktfotos' -Completed

$sb = New-Object Text.StringBuilder
[void]$sb.AppendLine('/*')
[void]$sb.AppendLine(' * Produktfotos je Einheitenname aus dem offiziellen Games-Workshop-Webshop (Bilder © Games Workshop).')
[void]$sb.AppendLine(' * img: Bildpfad auf warhammer.com, slug: Produktseite (warhammer.com/<sprache>/shop/<slug>), product: Bausatzname.')
[void]$sb.AppendLine(' * Erzeugt mit tools/3-update-images.ps1 – Korrekturen dort eintragen ($SearchTerms / $Exclude),')
[void]$sb.AppendLine(' * sonst gehen sie beim nächsten Lauf verloren. Eigene Bilder lassen sich in der App per Klick hinterlegen.')
[void]$sb.AppendLine(" * Stand: $(Get-Date -Format 'dd.MM.yyyy')")
[void]$sb.AppendLine(' */')
[void]$sb.AppendLine('window.WH40K = window.WH40K || {};')
[void]$sb.AppendLine('WH40K.images = {')
[void]$sb.AppendLine(($lines -join ",`n"))
[void]$sb.AppendLine('};')
[IO.File]::WriteAllText($Out, $sb.ToString(), $Utf8NoBom)
$rep | Set-Content (Join-Path $Cache 'images-report.txt') -Encoding UTF8
Write-Host "Mit Bild: $($lines.Count) von $($units.Count)  ->  $Out"
Write-Host "Bericht: $(Join-Path $Cache 'images-report.txt')"
