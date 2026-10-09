<#
.SYNOPSIS
  Überträgt Punkte, gestaffelte Kosten und Ausrüstungsoptionen aus dem Bericht von 1-check-points.ps1
  in die Fraktionsdateien.

.DESCRIPTION
  Ändert pro Einheitenzeile nur: points, pointsNext/nextFrom und wargear. Modellanzahl, Anzahl (qty),
  Ausrüstungswahl (loadout) und Texte bleiben unverändert. Einheiten mit ungültiger Modellanzahl werden
  nur gemeldet – die Modellanzahl bitte von Hand anpassen und danach erneut prüfen.
  Danach in der App kontrollieren, ob alle Armeen noch ≤ 2.000 Punkte haben.

.PARAMETER DryRun
  Nur anzeigen, was sich ändern würde.

.EXAMPLE
  .\tools\2-update-points.ps1 -DryRun
  .\tools\2-update-points.ps1
#>
param(
  [string]$Cache = (Join-Path $env:TEMP 'codex-armorum-cache'),
  [switch]$DryRun
)
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'lib\common.ps1')
$reportFile = Join-Path $Cache 'report.csv'
if (-not (Test-Path $reportFile)) { throw "Kein Bericht gefunden – zuerst .\tools\1-check-points.ps1 ausführen." }
$byKey = @{}
Import-Csv $reportFile | ForEach-Object { $byKey["$($_.File)|$($_.Name)|$($_.Models)"] = $_ }

# Höchst-/Standardanzahl und Gruppe je Ausrüstungsoption (aus den Optionstexten der Datenblätter abgeleitet).
# 'M' = Modellanzahl, 'M/5' = je 5 Modelle, '2M' = zwei pro Modell. Gruppe: Optionen teilen sich die Höchstzahl.
# Neue Optionen ohne Eintrag bekommen max. 1 und werden am Ende gemeldet – dann hier ergänzen.
$WgRules = @{
  'Ravager'                             = @{ 'Dark lance' = @('3', '3') }
  'Leman Russ Battle Tank'              = @{ 'Lascannon' = @('1', '1'); 'Multi-melta' = @('2', '0', 'Seitenkuppeln'); 'Plasma cannon' = @('2', '0', 'Seitenkuppeln') }
  'Leman Russ Demolisher'               = @{ 'Lascannon' = @('1', '1'); 'Multi-melta' = @('2', '0', 'Seitenkuppeln'); 'Plasma cannon' = @('2', '0', 'Seitenkuppeln') }
  'Leman Russ Commander'                = @{ 'Lascannon' = @('1', '1'); 'Multi-melta' = @('2', '0', 'Seitenkuppeln'); 'Plasma cannon' = @('2', '0', 'Seitenkuppeln'); 'Demolisher battle cannon' = @('1', '0') }
  'Achilles Ridgerunners'               = @{ 'Heavy mining laser' = @('M', 'M') }
  'Crisis Fireknife Battlesuits'        = @{ 'Missile pod' = @('2M', 'M') }
  'Crisis Starscythe Battlesuits'       = @{ "T'au flamer" = @('2M', 'M') }
  'Dominion Squad'                      = @{ 'Meltagun' = @('4', '0') }
  'Immolator'                           = @{ 'Twin multi-melta' = @('1', '0') }
  'Paragon Warsuits'                    = @{ 'Multi-melta' = @('M', '0') }
  'Retributor Squad'                    = @{ 'Multi-melta' = @('M-1', '0') }
  'Caladius Grav-tank'                  = @{ 'Twin arachnus heavy blaze cannon' = @('1', '0') }
  'Ironstrider Ballistarii'             = @{ 'Twin cognis lascannon' = @('M', '0') }
  'Skorpius Disintegrator'              = @{ 'Ferrumite cannon' = @('1', '0') }
  'Wraithknight'                        = @{ 'Heavy wraithcannon' = @('2', '0') }
  'Field Ordnance Battery'              = @{ 'Bombast field gun' = @('M', '0') }
  'Redemptor Dreadnought'               = @{ 'Macro plasma incinerator' = @('1', '0') }
  'Forgefiend'                          = @{ 'Ectoplasma cannon' = @('3', '0') }
  'Thousand Sons Forgefiend'            = @{ 'Ectoplasma cannon' = @('3', '0') }
  'Thousand Sons Defiler'               = @{ 'Hades lascannon' = @('2', '0', 'Waffenplätze'); 'Heavy reaper autocannon' = @('2', '0', 'Waffenplätze') }
  'Repulsor Executioner'                = @{ 'Heavy laser destroyer' = @('1', '0') }
  'Scourges with Heavy Weapons'         = @{ 'Haywire blaster' = @('M-1', '0', 'schwere Waffen'); 'Dark lance' = @('M-1', '0', 'schwere Waffen') }
  'Talos'                               = @{ 'Twin haywire blaster' = @('M', '0') }
  'Brotherhood Terminator Squad'        = @{ 'Psycannon' = @('M/5+1', '0') }
  'Grey Knights Terminator Squad'       = @{ 'Psycannon' = @('M/5', '0') }
  'Paladin Squad'                       = @{ 'Psycannon' = @('2M/5+1', '0') }
  'Purgation Squad'                     = @{ 'Psycannon' = @('4', '0') }
  'Grand Master in Nemesis Dreadknight' = @{ 'Sublimator' = @('1', '0'); 'Heavy psycannon' = @('1', '0') }
  'Nemesis Dreadknight'                 = @{ 'Heavy psycannon' = @('1', '0') }
  'Knight Crusader'                     = @{ 'Rapid-fire battle cannon' = @('1', '0') }
  'Meganobz'                            = @{ 'Killsaw' = @('M', '0', 'je Modell eine'); 'Twin Killsaws' = @('M', '0', 'je Modell eine') }
  'Nobz'                                = @{ 'Paired Krumpas' = @('M/5', '0') }
  'Thunderwolf Cavalry'                 = @{ 'Storm Shield' = @('M', '0') }
  'Wolf Guard Terminators'              = @{ 'Storm Shield' = @('M', '0') }
  'Broadside Battlesuits'               = @{ 'High-yield missile pods' = @('M', '0') }
  'Ghostkeel Battlesuit'                = @{ 'Cyclic Ion Raker' = @('1', '0') }
  'Pathfinder Team'                     = @{ 'Ion rifle' = @('3', '0') }
  'Riptide Battlesuit'                  = @{ 'Ion accelerator' = @('1', '0') }
  'Tyrannofex'                          = @{ 'Acid spray' = @('1', '0', 'Hauptwaffe'); 'Rupture cannon' = @('1', '0', 'Hauptwaffe') }
}
function Eval([string]$expr, [int]$m) {
  $e = $expr -replace '2M/5', ([string](2 * [Math]::Floor($m / 5))) -replace 'M/5', ([string][Math]::Floor($m / 5)) -replace '2M', ([string](2 * $m)) -replace 'M', ([string]$m)
  return [int](Invoke-Expression $e)
}
function JsStr([string]$s) { if ($s.Contains("'")) { '"' + $s + '"' } else { "'" + $s + "'" } }

$log = New-Object System.Collections.Generic.List[string]
$unknownWg = New-Object System.Collections.Generic.HashSet[string]
$skipped = New-Object System.Collections.Generic.HashSet[string]

foreach ($file in Get-ChildItem $DataDir -Filter *.js) {
  $text = [IO.File]::ReadAllText($file.FullName)
  $new = $UnitLineRx.Replace($text, {
    param($m)
    $name = Get-UnitName $m
    $models = [int]$m.Groups['m'].Value
    $r = $byKey["$($file.BaseName)|$name|$models"]
    if (-not $r -or -not $r.WP) {
      if ($r) { [void]$skipped.Add("$($file.BaseName) | $name | $($r.Status)") }
      return $m.Value
    }
    $pts = [int]$r.WP
    $nx = ''
    if ($r.WPNext -and [int]$r.WPNext -ne $pts) { $nx = ", pointsNext: $($r.WPNext), nextFrom: $($r.NextFrom)" }
    $wg = ''
    if ($r.Wargear) {
      $parts = foreach ($opt in ($r.Wargear -split '; ')) {
        $on, $ov = $opt -split '=', 2
        $rule = $null
        if ($WgRules.ContainsKey($name)) { $rule = $WgRules[$name][$on] }
        if (-not $rule) { [void]$unknownWg.Add("$name | $on"); $rule = @('1', '0') }
        $max = Eval $rule[0] $models; $def = Eval $rule[1] $models
        $tail = if ($rule.Count -gt 2) { ", $def, '$($rule[2])'" } elseif ($def) { ", $def" } else { '' }
        '[' + (JsStr $on) + ", $ov, $max$tail]"
      }
      $wg = ', wargear: [' + ($parts -join ', ') + ']'
    }
    $old = "p$($m.Groups['p'].Value)$($m.Groups['nx'].Value)$($m.Groups['wg'].Value)"
    $nw = "p$pts$nx$wg"
    if ($old -ne $nw) { $log.Add("$($file.BaseName) | $name | $old  ->  $nw") }
    $prefix = $m.Value.Substring(0, $m.Groups['p'].Index - $m.Index)
    return "${prefix}${pts}$($m.Groups['q'].Value)${nx}${wg}"
  })
  if (-not $DryRun -and $new -ne $text) { [IO.File]::WriteAllText($file.FullName, $new, $Utf8NoBom) }
}

# Datenblatt-Infos je Fraktion|Einheit -> data/datasheets.js
# (Basegröße, Schlüsselwörter, erlaubte Anführer-Ziele, Transportregel)
$rows = Import-Csv $reportFile
$nameBySlug = @{}
foreach ($r in $rows) { if ($r.Slug) { $k = "$($r.FSlug)|$($r.Slug)"; if (-not $nameBySlug.ContainsKey($k)) { $nameBySlug[$k] = $r.Name } } }
$sheets = [ordered]@{}
foreach ($r in ($rows | Sort-Object File, Name)) {
  $key = "$($r.File)|$($r.Name)"
  if ($sheets.Contains($key) -or -not $r.Slug) { continue }
  $e = [ordered]@{}
  if ($r.Base) { $e.base = $r.Base }
  if ($r.Keywords) { $e.kw = @($r.Keywords -split '\|') }
  if ($r.FKeywords) { $e.fkw = @($r.FKeywords -split '\|') }
  $attachList = $r.Leaders
  if (-not $attachList -and $r.Supports) { $attachList = $r.Supports; $e.attach = 'support' }
  if ($attachList) {
    $e.leads = @($attachList -split '\|' | ForEach-Object {
      $n = $nameBySlug["$($r.FSlug)|$_"]
      if ($n) { $n } else { ($_ -replace '-\d+$', '') -replace '-', ' ' }
    } | Select-Object -Unique)
  }
  if ($r.Transport) { $e.transport = $r.Transport }
  if ($r.Stats) { $e.stats = $r.Stats }
  $sheets[$key] = $e
}
$json = $sheets | ConvertTo-Json -Depth 5 -Compress
$sb = New-Object Text.StringBuilder
[void]$sb.AppendLine('/*')
[void]$sb.AppendLine(' * Datenblatt-Infos je "Fraktion|Einheit" laut Wahapedia (11. Edition).')
[void]$sb.AppendLine(' * base: "32mm" rund, "75x42mm" oval, "Rumpf" = Fahrzeug ohne Base, mehrere Profile mit ";" getrennt')
[void]$sb.AppendLine(' * kw / fkw: Schlüsselwörter / Fraktions-Schlüsselwörter, leads: Einheiten, denen der Charakter zugeteilt werden darf,')
[void]$sb.AppendLine(' * attach: "support" = Support-Einheit (sonst Leader; je Leibwache max. ein Leader + ein Support),')
[void]$sb.AppendLine(' * transport: Transportregel im Wortlaut, stats: Profilwerte ("M 6\" T 4 SV 3+ W 2 LD 6+ OC 2 | INV 4+").')
[void]$sb.AppendLine(' * Erzeugt mit tools/2-update-points.ps1 – nicht von Hand ändern.')
[void]$sb.AppendLine(" * Stand: $(Get-Date -Format 'dd.MM.yyyy')")
[void]$sb.AppendLine(' */')
[void]$sb.AppendLine('window.WH40K = window.WH40K || {};')
[void]$sb.AppendLine('WH40K.datasheets = ' + $json + ';')
$sheetFile = Join-Path $ProjectRoot 'data\datasheets.js'
$sheetNew = $sb.ToString()
$sheetOld = if (Test-Path $sheetFile) { [IO.File]::ReadAllText($sheetFile) -replace '(?m)^ \* Stand: .*$', '' } else { '' }
$sheetChanged = ($sheetNew -replace '(?m)^ \* Stand: .*$', '') -ne $sheetOld
if (-not $DryRun -and $sheetChanged) { [IO.File]::WriteAllText($sheetFile, $sheetNew, $Utf8NoBom) }

Write-Host ($(if ($DryRun) { 'PROBELAUF – ' } else { '' }) + "Datenblatt-Infos: $($sheets.Count) Einträge" + $(if ($sheetChanged) { ' (data/datasheets.js aktualisiert)' } else { ' (unverändert)' }))
Write-Host ($(if ($DryRun) { 'PROBELAUF – ' } else { '' }) + "Geänderte Einheitenzeilen: $($log.Count)")
$log | Sort-Object -Unique | ForEach-Object { Write-Host "  $_" }
if ($skipped.Count) { Write-Host "Nicht geändert (von Hand prüfen):"; $skipped | Sort-Object | ForEach-Object { Write-Host "  $_" } }
if ($unknownWg.Count) { Write-Host "Ausrüstungsoptionen ohne Regel (Höchstzahl 1 angenommen – in `$WgRules ergänzen):"; $unknownWg | Sort-Object | ForEach-Object { Write-Host "  $_" } }
