<#
.SYNOPSIS
  Gleicht die Detachments (Name + DP-Kosten) aller Fraktionen mit Wahapedia ab.

.DESCRIPTION
  - Liest die Detachments von der Wahapedia-Fraktionsseite (Cache aus 1-check-points.ps1).
  - Berücksichtigt bei Space-Marines-Orden, welche Detachments der Orden nutzen darf und abweichende DP je Orden.
  - Meldet: neue / entfallene Detachments, geänderte DP, Armeen mit unbekanntem Detachment oder falschen DP,
    Armeen über dem DP-Budget (Strike Force: 3 DP).
  - Mit -Apply: ersetzt die Detachment-Liste jeder Fraktion und korrigiert die DP in den Armeen.
    Umbenannte Detachments in Armeen werden NICHT automatisch ersetzt (nur gemeldet, mit Vorschlag).

.EXAMPLE
  .\tools\4-check-detachments.ps1            # nur prüfen
  .\tools\4-check-detachments.ps1 -Apply     # übernehmen
#>
param(
  [string]$Cache = (Join-Path $env:TEMP 'codex-armorum-cache'),
  [string]$Edition = 'wh40k11ed',
  [int]$MaxDP = 3,
  [switch]$Refresh,
  [switch]$Apply
)
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'lib\common.ps1')
$pages = Join-Path $Cache 'pages'
New-Item -ItemType Directory -Force $pages | Out-Null

$chapterCode = @{ 'blood-angels' = 'BA'; 'black-templars' = 'BT'; 'dark-angels' = 'DA'; 'deathwatch' = 'DW'; 'space-wolves' = 'SW' }
$chapterName = @{ 1 = 'Blood Angels'; 2 = 'Blood Ravens'; 3 = 'Black Templars'; 5 = 'Dark Angels'; 6 = 'Deathwatch'; 7 = 'Imperial Fists'; 8 = 'Iron Hands'; 9 = 'Raven Guard'; 10 = 'Salamanders'; 11 = 'Space Wolves'; 12 = 'Ultramarines'; 13 = 'White Scars' }
# Apostroph vereinheitlichen und kyrillische Doppelgänger ersetzen (Wahapedia schreibt z. B. "Kauyоn" mit kyrillischem о)
function Clean([string]$s) {
  $map = @{ [char]0x2019 = "'"; [char]0x043E = 'o'; [char]0x0430 = 'a'; [char]0x0435 = 'e'; [char]0x0440 = 'p'; [char]0x0441 = 'c'; [char]0x041E = 'O'; [char]0x0410 = 'A'; [char]0x0415 = 'E' }
  $sb = New-Object Text.StringBuilder
  foreach ($ch in $s.ToCharArray()) { if ($map.ContainsKey($ch)) { [void]$sb.Append($map[$ch]) } else { [void]$sb.Append($ch) } }
  $sb.ToString()
}
# Space Marines (Codex): allgemeine Detachments (Bit 4) + Codex-Orden ohne eigene Fraktionsdatei (BR, IF, IH, RG, SA, UL, WS)
$codexMask = [int64](16 + 4 + 128 + 256 + 512 + 1024 + 4096 + 8192)
# Für Namensvorschläge: allgemeine Wörter (Task Force, Strike …) nicht werten, damit der Eigenname zählt
function Words([string]$s) { @((Clean $s).ToLowerInvariant() -split '[^a-z0-9]+' | Where-Object { $_.Length -gt 2 -and $_ -notin @('task', 'force', 'strike', 'assault', 'the', 'host', 'legion', 'cadre', 'lance', 'band') }) }

$issues = New-Object System.Collections.Generic.List[string]
$changedFiles = 0
foreach ($file in Get-ChildItem $DataDir -Filter *.js) {
  $text = [IO.File]::ReadAllText($file.FullName)
  $fs = Get-FactionSlug $text
  $html = Get-CachedPage "https://wahapedia.ru/$Edition/factions/$fs/" (Join-Path $pages "_faction_$fs.html") 400 -Refresh:$Refresh
  if (-not $html) { $issues.Add("$($file.BaseName): Fraktionsseite nicht ladbar"); continue }

  $bit = if ($ChapterBit.ContainsKey($file.BaseName)) { $ChapterBit[$file.BaseName] } else { -1 }
  $code = $chapterCode[$file.BaseName]
  # Wahapedia-Liste für diese Fraktion (nur Detachments mit DP – Boarding Actions haben keine)
  $filterMask = if ($file.BaseName -eq 'space-marines') { $codexMask } elseif ($bit -ge 0) { [int64]1 -shl $bit } else { -1 }
  $wp = @(Parse-Detachments $html | Where-Object { $null -ne $_.DP } | Where-Object {
      $filterMask -lt 0 -or -not $_.ChMask -or (([Convert]::ToInt64($_.ChMask, 16) -band $filterMask) -ne 0)
    } | ForEach-Object {
      $dp = if ($code -and $_.ByChapter.ContainsKey($code)) { $_.ByChapter[$code] } else { $_.DP }
      # Gruppe: bei Space-Marines-Seiten "Allgemein" (Codex-Bit 4 gesetzt) oder Ordensname
      $group = ''
      if ($fs -eq 'space-marines' -and $_.ChMask) {
        $mask = [Convert]::ToInt64($_.ChMask, 16)
        if ($mask -band 16) { $group = 'Allgemein' }
        else { $group = ($chapterName.Keys | Sort-Object | Where-Object { $mask -band ([int64]1 -shl $_) } | ForEach-Object { $chapterName[$_] }) -join ' / ' }
      }
      [pscustomobject]@{ Name = (Clean $_.Name); DP = $dp; Group = $group }
    })
  $wpByName = @{}; $wp | ForEach-Object { $wpByName[$_.Name] = $_ }

  # Liste in der Datendatei (Fraktionsebene)
  $blockRx = [regex]'(?ms)^  detachments: \[\r?\n(.*?)^  \],?\r?\n'
  $block = $blockRx.Match($text)
  $mine = @{}
  if ($block.Success) {
    foreach ($m in [regex]::Matches($block.Groups[1].Value, "\[(?:'(?<n1>[^']*)'|""(?<n2>[^""]*)""),\s*(?<dp>\d+)")) {
      $n = Clean $(if ($m.Groups['n1'].Success) { $m.Groups['n1'].Value } else { $m.Groups['n2'].Value }); $mine[$n] = [int]$m.Groups['dp'].Value
    }
  }
  foreach ($d in $wp) {
    if (-not $mine.ContainsKey($d.Name)) { $issues.Add("$($file.BaseName): NEU auf Wahapedia – $($d.Name) ($($d.DP) DP)") }
    elseif ($mine[$d.Name] -ne $d.DP) { $issues.Add("$($file.BaseName): DP geändert – $($d.Name): $($mine[$d.Name]) -> $($d.DP)") }
  }
  foreach ($n in $mine.Keys) { if (-not $wpByName.ContainsKey($n)) { $issues.Add("$($file.BaseName): ENTFALLEN/umbenannt – $n") } }

  # Armeen
  $newText = $text
  $armyRx = [regex]"(?m)^      id: '(?<id>[^']+)',"
  foreach ($am in $armyRx.Matches($text)) {
    $s = $am.Index; $e = $text.IndexOf('units: [', $s)
    $seg = $text.Substring($s, $e - $s)
    $sum = 0
    foreach ($dm in [regex]::Matches($seg, "\{ name: (?:'(?<n1>[^']*)'|""(?<n2>[^""]*)""), dp: (?<dp>\d+) \}")) {
      $n = Clean $(if ($dm.Groups['n1'].Success) { $dm.Groups['n1'].Value } else { $dm.Groups['n2'].Value })
      $dp = [int]$dm.Groups['dp'].Value
      if ($wpByName.ContainsKey($n)) {
        $real = $wpByName[$n].DP; $sum += $real
        if ($real -ne $dp) {
          $issues.Add("$($file.BaseName)/$($am.Groups['id'].Value): DP von $n ist $real (in der Armee: $dp)")
          $newText = $newText.Replace($dm.Value, $dm.Value -replace 'dp: \d+', "dp: $real")
        }
      } else {
        $sum += $dp
        $w = Words $n
        $best = $wp | Sort-Object { -(@(Words $_.Name | Where-Object { $w -contains $_ }).Count) } | Select-Object -First 1
        $issues.Add("$($file.BaseName)/$($am.Groups['id'].Value): Detachment '$n' gibt es nicht (mehr)" + $(if ($best) { " – gemeint vielleicht '$($best.Name)' ($($best.DP) DP)?" } else { '' }))
      }
    }
    if ($sum -gt $MaxDP) { $issues.Add("$($file.BaseName)/$($am.Groups['id'].Value): $sum DP – Budget ist $MaxDP") }
  }

  if ($Apply -and $block.Success -and $wp.Count) {
    $items = $wp | Sort-Object @{ e = { $_.Group -ne 'Allgemein' } }, Group, @{ e = { -$_.DP } }, Name | ForEach-Object {
      $n = if ($_.Name.Contains("'")) { '"' + $_.Name + '"' } else { "'" + $_.Name + "'" }
      '[' + $n + ', ' + $_.DP + $(if ($_.Group) { ", '" + $_.Group + "'" } else { '' }) + ']'
    }
    $lines = for ($i = 0; $i -lt $items.Count; $i += 3) { '    ' + (($items[$i..([Math]::Min($i + 2, $items.Count - 1))]) -join ', ') }
    $nl = if ($text.Contains("`r`n")) { "`r`n" } else { "`n" }
    $replacement = '  detachments: [' + $nl + ($lines -join (',' + $nl)) + $nl + '  ],' + $nl
    $newText = $blockRx.Replace($newText, [Text.RegularExpressions.MatchEvaluator] { param($x) $replacement }, 1)
  }
  if ($Apply -and $newText -ne $text) { [IO.File]::WriteAllText($file.FullName, $newText, $Utf8NoBom); $changedFiles++ }
}

Write-Host ($(if ($Apply) { "Übernommen in $changedFiles Dateien. " } else { 'PRÜFUNG (nichts geändert). ' }) + "Befunde: $($issues.Count)")
$issues | ForEach-Object { Write-Host "  $_" }
