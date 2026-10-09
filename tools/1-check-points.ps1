<#
.SYNOPSIS
  Gleicht alle Einheiten der Fraktionsdateien mit den Wahapedia-Datenblättern ab (nur lesen, ändert nichts).

.DESCRIPTION
  - Ermittelt über die Fraktionsseiten die exakten Datenblatt-Namen.
  - Lädt jedes Datenblatt (zwischengespeichert im Cache-Ordner) und liest Punkte, gestaffelte Kosten
    ("ab der 3. Einheit") und kostenpflichtige Ausrüstung – bei Space-Marines-Orden mit Orden-Filter.
  - Liest außerdem Profilwerte, Basegröße(n), Schlüsselwörter, erlaubte Anführer-/Support-Ziele und Transportregeln.
  - Schreibt einen Bericht (report.csv) in den Cache-Ordner. Diesen nutzt 2-update-points.ps1.

.PARAMETER Refresh
  Seiten neu laden statt aus dem Cache zu lesen (nach einem neuen Munitorum Field Manual nötig).

.EXAMPLE
  .\tools\1-check-points.ps1 -Refresh
#>
param(
  [string]$Cache = (Join-Path $env:TEMP 'codex-armorum-cache'),
  [string]$Edition = 'wh40k11ed',
  [int]$DelayMs = 400,
  [switch]$Refresh
)
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'lib\common.ps1')
$pages = Join-Path $Cache 'pages'
New-Item -ItemType Directory -Force $pages | Out-Null
$base = "https://wahapedia.ru/$Edition/factions"

$units = @(Get-AllUnits)
Write-Host "Einheiten-Einträge: $($units.Count)"

# 1) Datenblatt-Slugs je Fraktion
$slugMap = @{}
foreach ($fs in ($units.FSlug | Sort-Object -Unique)) {
  $html = Get-CachedPage "$base/$fs/" (Join-Path $pages "_faction_$fs.html") $DelayMs -Refresh:$Refresh
  $map = @{}
  if ($html) {
    foreach ($h in [regex]::Matches($html, "/$Edition/factions/$fs/([^""#/?]+)""")) {
      $slug = [Uri]::UnescapeDataString($h.Groups[1].Value)
      $k = Norm $slug
      if ($k -and -not $map.ContainsKey($k)) { $map[$k] = $slug }
    }
  }
  $slugMap[$fs] = $map
  Write-Host ("Fraktion {0,-22} {1,4} Datenblätter" -f $fs, $map.Count)
}

# 2) Datenblätter lesen
$seen = @{}
$i = 0
$rows = foreach ($u in $units) {
  $i++
  $key = "$($u.File)|$($u.Name)"
  if (-not $seen.ContainsKey($key)) {
    Write-Progress -Activity 'Datenblätter' -Status $u.Name -PercentComplete (100 * $i / $units.Count)
    $slug = $null
    if ($u.Override) { $slug = $u.Override }
    else {
      $n1 = Norm ([regex]::Replace($u.Name, '[^\x00-\x7F]', ''))
      $n2 = Norm ([regex]::Replace($u.Name.Normalize([Text.NormalizationForm]::FormD), '[̀-ͯ]', ''))
      if ($slugMap[$u.FSlug].ContainsKey($n1)) { $slug = $slugMap[$u.FSlug][$n1] }
      elseif ($slugMap[$u.FSlug].ContainsKey($n2)) { $slug = $slugMap[$u.FSlug][$n2] }
    }
    $c = $null; $status = 'kein Datenblatt gefunden'
    if ($slug) {
      $file = Join-Path $pages ($u.FSlug + '__' + ($slug -replace '[^\w-]', '_') + '.html')
      $html = Get-CachedPage ("$base/$($u.FSlug)/" + [Uri]::EscapeDataString($slug)) $file $DelayMs -Refresh:$Refresh
      if ($html) {
        $bit = if ($ChapterBit.ContainsKey($u.File)) { $ChapterBit[$u.File] } else { -1 }
        $c = Parse-CostTable $html $bit
        $c | Add-Member -NotePropertyName Base -NotePropertyValue (Parse-BaseSize $html)
        $kw = Parse-Keywords $html
        $c | Add-Member -NotePropertyName Keywords -NotePropertyValue ($kw.Keywords -join '|')
        $c | Add-Member -NotePropertyName FKeywords -NotePropertyValue ($kw.Faction -join '|')
        $c | Add-Member -NotePropertyName Leaders -NotePropertyValue ((Parse-Leaders $html $bit 'dsLeaderIcon') -join '|')
        $c | Add-Member -NotePropertyName Supports -NotePropertyValue ((Parse-Leaders $html $bit 'dsSupportIcon') -join '|')
        $c | Add-Member -NotePropertyName Transport -NotePropertyValue (Parse-Transport $html)
        $c | Add-Member -NotePropertyName Stats -NotePropertyValue (Parse-Stats $html)
        $status = if ($c.First.Count) { 'ok' } else { 'keine Punkte erkannt' }
      } else { $status = 'Seite nicht gefunden (404)' }
    }
    $seen[$key] = [pscustomobject]@{ Slug = $slug; C = $c; Status = $status }
  }
  $e = $seen[$key]; $c = $e.C
  $wp = $null; $wpNext = $null; $sizes = ''; $wg = ''
  if ($c) {
    if ($c.First.ContainsKey($u.Models)) { $wp = $c.First[$u.Models] }
    if ($c.Next.ContainsKey($u.Models)) { $wpNext = $c.Next[$u.Models] }
    $sizes = ($c.First.Keys | Sort-Object | ForEach-Object { "$($_):$($c.First[$_])" }) -join ' '
    $wg = ($c.Wargear.Keys | ForEach-Object { "$($_)=$($c.Wargear[$_])" }) -join '; '
  }
  $status = $e.Status
  if ($status -eq 'ok' -and $null -eq $wp) { $status = "Modellanzahl $($u.Models) nicht gültig" }
  [pscustomobject]@{
    File = $u.File; Name = $u.Name; Models = $u.Models; Points = $u.Points
    WP = $wp; WPNext = $wpNext; NextFrom = $(if ($c) { $c.From }); Sizes = $sizes; Wargear = $wg
    Status = $status; Diff = $(if ($null -ne $wp -and $wp -ne $u.Points) { 'X' } else { '' })
    Slug = $e.Slug; FSlug = $u.FSlug; Base = $(if ($c) { $c.Base })
    Keywords = $(if ($c) { $c.Keywords }); FKeywords = $(if ($c) { $c.FKeywords }); Leaders = $(if ($c) { $c.Leaders }); Supports = $(if ($c) { $c.Supports }); Transport = $(if ($c) { $c.Transport }); Stats = $(if ($c) { $c.Stats })
    Raw = $(if ($c) { $c.Raw })
  }
}
Write-Progress -Activity 'Datenblätter' -Completed
$report = Join-Path $Cache 'report.csv'
$rows | Export-Csv $report -NoTypeInformation -Encoding UTF8

$diff = @($rows | Where-Object Diff -eq 'X' | Sort-Object File, Name -Unique)
$prob = @($rows | Where-Object Status -ne 'ok' | Sort-Object File, Name -Unique)
Write-Host ''
Write-Host "Abweichende Punkte: $($diff.Count)"
$diff | ForEach-Object { Write-Host ("  {0} | {1} ({2} Modelle): {3} -> {4}" -f $_.File, $_.Name, $_.Models, $_.Points, $_.WP) }
Write-Host "Von Hand zu prüfen: $($prob.Count)"
$prob | ForEach-Object { Write-Host ("  {0} | {1}: {2}  {3}" -f $_.File, $_.Name, $_.Status, $_.Raw) }
Write-Host ''
Write-Host "Bericht: $report"
