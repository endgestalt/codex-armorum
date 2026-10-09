# Gemeinsame Funktionen der Pflege-Skripte (wird per Dot-Sourcing eingebunden).

# Diese Datei liegt in tools\lib – das Projekt ist zwei Ebenen höher.
$ProjectRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$DataDir = Join-Path $ProjectRoot 'data\factions'
$Utf8NoBom = New-Object Text.UTF8Encoding($false)
$UserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) CodexArmorum-Pflegeskript'

# Wahapedia-Orden-Filter: Bitposition im CH-Feld der Space-Marines-Datenblätter
# CH(alle)=0, BA=1, BR=2, BT=3, C0(Codex ohne Supplement)=4, DA=5, DW=6, IF=7, IH=8, RG=9, SA=10, SW=11, UL=12, WS=13
$ChapterBit = @{ 'space-marines' = 4; 'blood-angels' = 1; 'black-templars' = 3; 'dark-angels' = 5; 'deathwatch' = 6; 'space-wolves' = 11 }

# Zeile einer Einheit in den Fraktionsdateien
$UnitLineRx = [regex]"\{ name: (?:'(?<n1>[^']*)'|""(?<n2>[^""]*)""), (?<wp>wahapedia: '(?<wpv>[^']*)', )?role: '(?<role>\w+)', models: (?<m>\d+), points: (?<p>\d+)(?<q>, qty: (?<qv>\d+))?(?<nx>, pointsNext: \d+, nextFrom: \d+)?(?<wg>, wargear: \[.*?\]\])?"

function Get-UnitName($m) { if ($m.Groups['n1'].Success) { $m.Groups['n1'].Value } else { $m.Groups['n2'].Value } }

function Get-FactionSlug([string]$text) { ([regex]::Match($text, "(?m)^  wahapedia: '([^']+)'")).Groups[1].Value }

# Alle Einheiten aller Fraktionsdateien
function Get-AllUnits {
  foreach ($f in Get-ChildItem $DataDir -Filter *.js) {
    $text = [IO.File]::ReadAllText($f.FullName)
    $fs = Get-FactionSlug $text
    foreach ($m in $UnitLineRx.Matches($text)) {
      [pscustomobject]@{
        File = $f.BaseName; FSlug = $fs; Name = (Get-UnitName $m); Override = $m.Groups['wpv'].Value
        Role = $m.Groups['role'].Value; Models = [int]$m.Groups['m'].Value; Points = [int]$m.Groups['p'].Value
        Qty = $(if ($m.Groups['qv'].Success) { [int]$m.Groups['qv'].Value } else { 1 })
      }
    }
  }
}

function Norm([string]$s) { [regex]::Replace($s.ToLowerInvariant(), '[^a-z0-9]', '') }

# Seite laden, mit Datei-Cache. 404 -> $null
function Get-CachedPage([string]$url, [string]$file, [int]$delayMs = 400, [switch]$Refresh) {
  if (-not $Refresh -and (Test-Path $file)) { return [IO.File]::ReadAllText($file) }
  for ($try = 0; $try -lt 3; $try++) {
    try {
      $r = Invoke-WebRequest -UseBasicParsing -Uri $url -UserAgent $UserAgent -TimeoutSec 60
      [IO.File]::WriteAllText($file, $r.Content)
      Start-Sleep -Milliseconds $delayMs
      return $r.Content
    } catch {
      $code = $null; if ($_.Exception.Response) { $code = $_.Exception.Response.StatusCode.value__ }
      if ($code -eq 404) { return $null }
      Start-Sleep -Seconds 3
    }
  }
  return $null
}

# Basegröße(n) eines Datenblatts. Wahapedia schreibt sie hinter den Titel bzw. hinter jedes Modellprofil:
#   "Intercessor Squad (⌀32mm)", "Knight Castellan (⌀170 x 109mm)", "Battlewagon (⌀Use model)",
#   "SZAREKH (⌀100mm) … TRIARCHAL MENHIR (⌀50mm)". Ergebnis z. B. "32mm" oder "Szarekh 100mm; Triarchal Menhir 50mm".
function Parse-BaseSize([string]$html) {
  $start = $html.IndexOf('logo3.png">')
  if ($start -lt 0) { $start = 0 }
  $end = $html.IndexOf('dsUnitCostHeader', $start); if ($end -lt 0) { $end = [Math]::Min($html.Length, $start + 60000) }
  $text = [regex]::Replace($html.Substring($start, $end - $start), '<[^>]+>', ' ') -replace '&#8960;', '⌀' -replace ('&#x27;|&#39;|' + [char]0x2019), "'" -replace '\s+', ' '
  $parts = New-Object System.Collections.Generic.List[string]
  foreach ($m in [regex]::Matches($text, "(?:\b([A-Z][A-Z' \-]{2,40}?)\s+)?\(⌀\s*([^)]+?)\s*\)")) {
    $size = $m.Groups[2].Value -replace 'Use model', 'Rumpf' -replace '\s*x\s*', 'x'
    $label = $m.Groups[1].Value.Trim()
    if ($label) { $label = (Get-Culture).TextInfo.ToTitleCase($label.ToLowerInvariant()) }
    $parts.Add($(if ($label) { "$label $size" } else { $size }))
  }
  $u = @($parts | Select-Object -Unique)
  # Alle Profile gleich groß (z. B. Trupp + Exarch) -> nur die Größe
  $sizes = @($u | ForEach-Object { ([regex]::Match($_, '(\d[\d.x]*mm(?: flying base)?|Rumpf)\s*$')).Groups[1].Value } | Select-Object -Unique)
  if ($u.Count -gt 1 -and $sizes.Count -eq 1 -and $sizes[0]) { return $sizes[0] }
  if ($u.Count -le 1) { return ($u -join '') -replace '^[^\d]*?(\d)', '$1' }
  return $u -join '; '
}

# Anführer / Unterstützer: Datenblatt-Slugs der Einheiten, denen dieser Charakter zugeteilt werden darf (mit Orden-Filter).
# 11. Edition: LEADER (dsLeaderIcon) und SUPPORT (dsSupportIcon) – eine Leibwache kann je einen von beiden haben.
function Parse-Leaders([string]$html, [int]$chBit = -1, [string]$icon = 'dsLeaderIcon') {
  $i = $html.IndexOf($icon)
  if ($i -lt 0) { return @() }
  $ul = $html.IndexOf('<ul>', $i); $end = $html.IndexOf('</ul>', $ul)
  if ($ul -lt 0 -or $end -lt 0 -or ($ul - $i) -gt 2000) { return @() }
  $slugs = foreach ($li in [regex]::Matches($html.Substring($ul, $end - $ul), '<li(?<attr>[^>]*)>.*?href="/[^/]+/factions/[^/]+/(?<slug>[^"#]+)"')) {
    $attr = $li.Groups['attr'].Value
    if ($chBit -ge 0 -and $attr -match 'CH:([0-9a-f]+)') {
      if (([Convert]::ToInt64($Matches[1], 16) -band ([int64]1 -shl $chBit)) -eq 0) { continue }
    }
    [Uri]::UnescapeDataString($li.Groups['slug'].Value)
  }
  return @($slugs | Select-Object -Unique)
}

# Schlüsselwörter und Fraktions-Schlüsselwörter (Großschreibung, z. B. "INFANTRY", "JUMP PACK", "ADEPTUS ASTARTES")
function Parse-Keywords([string]$html) {
  $i = $html.IndexOf('KEYWORDS:')
  if ($i -lt 0) { return @{ Keywords = @(); Faction = @() } }
  $text = [regex]::Replace($html.Substring($i, [Math]::Min(6000, $html.Length - $i)), '<[^>]+>', ' ') -replace '\s+', ' '
  $kw = ([regex]::Match($text, 'KEYWORDS:\s*(.*?)\s*FACTION KEYWORDS:')).Groups[1].Value
  $fk = ([regex]::Match($text, 'FACTION KEYWORDS:\s*(.*?)\s*(?:STRATAGEMS|DETACHMENT|$)')).Groups[1].Value
  $split = { param($s) @($s -split '[;,]' | ForEach-Object { ($_ -replace '^[A-Za-z ]+:\s*', '').Trim().ToUpperInvariant() } | Where-Object { $_ -and $_.Length -lt 40 } | Select-Object -Unique) }
  return @{ Keywords = (& $split $kw); Faction = (& $split $fk) }
}

# Transport-Regeltext ("This model has a transport capacity of …")
function Parse-Transport([string]$html) {
  $i = $html.IndexOf('TRANSPORT</div>')
  if ($i -lt 0) { return '' }
  $text = [regex]::Replace($html.Substring($i + 15, [Math]::Min(2500, $html.Length - $i - 15)), '<[^>]+>', ' ') -replace '\s+', ' ' -replace ' ([,.)])', '$1'
  $m = [regex]::Match($text, '(This model has a transport capacity.*?)\s*(?:UNIT COMPOSITION|YOUR |KEYWORDS|$)')
  return $m.Groups[1].Value.Trim()
}

# Profilwerte (M, T, SV, W, LD, OC) je Modellprofil + Rettungswurf (INSV).
# Ergebnis: Text wie "M 6\" T 4 SV 3+ W 2 LD 6+ OC 2" bzw. bei mehreren Profilen "Szarekh: M … | Triarchal Menhir: M …"
function Parse-Stats([string]$html) {
  # Werte stehen in Sechsergruppen (M T SV W LD OC), Modellnamen separat (dsModelName) – je Profil eine Gruppe
  $keys = @('M', 'T', 'SV', 'W', 'LD', 'OC')
  $vals = @([regex]::Matches($html, 'dsCharValue[^>]*>([^<]*)<') | ForEach-Object { ($_.Groups[1].Value -replace '&quot;', '"').Trim() })
  if ($vals.Count -lt 6) { return '' }
  $names = @([regex]::Matches($html, 'dsModelName[^>]*>([^<]*)<') | ForEach-Object { (Get-Culture).TextInfo.ToTitleCase($_.Groups[1].Value.Trim().ToLowerInvariant()) })
  $groups = [Math]::Min(6, [Math]::Floor($vals.Count / 6))
  $parts = for ($g = 0; $g -lt $groups; $g++) {
    $line = (0..5 | ForEach-Object { "$($keys[$_]) $($vals[$g * 6 + $_])" }) -join ' '
    if ($groups -gt 1 -and $names.Count -gt $g) { "$($names[$g]): $line" } else { $line }
  }
  $txt = $parts -join ' | '
  $inv = ([regex]::Match($html, '(?s)dsInvulWrap">.{0,400}?INSV.{0,300}?(\d\+)')).Groups[1].Value
  if ($inv) { $txt += " | INV $inv" }
  return $txt
}
# Detachments einer Fraktionsseite: Name, DP (Basis + abweichende DP je Orden), Orden-Maske
function Parse-Detachments([string]$html) {
  $seen = @{}
  foreach ($m in [regex]::Matches($html, '<label class="container DetFilterItem[^>]*>')) {
    $tag = $m.Value
    $name = ([regex]::Match($tag, 'data-det-name="([^"]+)"')).Groups[1].Value -replace ('&#x27;|&#39;|' + [char]0x2019), "'"
    if (-not $name -or $seen.ContainsKey($name)) { continue }
    $dp = ([regex]::Match($tag, 'data-dp-base="(\d+)"')).Groups[1].Value
    $byCh = @{}
    foreach ($x in [regex]::Matches($tag, 'data-dp-([A-Z0-9]{2})="(\d+)"')) { $byCh[$x.Groups[1].Value] = [int]$x.Groups[2].Value }
    $mask = ([regex]::Match($tag, 'CH:([0-9a-f]+)')).Groups[1].Value
    $seen[$name] = [pscustomobject]@{ Name = $name; DP = $(if ($dp) { [int]$dp } else { $null }); ByChapter = $byCh; ChMask = $mask }
  }
  return @($seen.Values)
}

# Kostentabelle eines Wahapedia-Datenblatts lesen.
# Liefert First/Next (Modellanzahl -> Punkte), From (ab welcher Einheit Next gilt), Wargear (Option -> Punkte), Raw (Text).
function Parse-CostTable([string]$html, [int]$chBit = -1) {
  $result = [pscustomobject]@{ First = @{}; Next = @{}; From = $null; Wargear = [ordered]@{}; Raw = '' }
  $start = $html.IndexOf('dsUnitCostHeader')
  if ($start -lt 0) { return $result }
  $tStart = $html.LastIndexOf('<tbody>', $start)
  $end = $html.IndexOf('</table>', $start)
  $tbl = $html.Substring($tStart, $end - $tStart)
  $tier = 'first'; $ctx = 0; $raw = New-Object System.Collections.Generic.List[string]
  foreach ($tr in [regex]::Matches($tbl, '<tr(?<attr>[^>]*)>(?<body>.*?)</tr>')) {
    $attr = $tr.Groups['attr'].Value; $body = $tr.Groups['body'].Value
    if ($chBit -ge 0 -and $attr -match 'CH:([0-9a-f]+)') {
      $mask = [Convert]::ToInt64($Matches[1], 16)
      if (($mask -band ([int64]1 -shl $chBit)) -eq 0) { continue }
    }
    # Imperial Agents: erste Tabelle = eigenes Detachment, zweite = als zugeteilter Agent
    if ($body -match 'dsHeaderAoI') { $ctx++; continue }
    if ($ctx -gt 1) { continue }
    if ($body -match 'dsUnitCostHeader">([^<]+)<') {
      $h = $Matches[1]
      if ($h -match 'WARGEAR') { $tier = 'wargear' }
      elseif ($h -match 'YOUR (\d)(ST|ND|RD|TH) ?\+') { $tier = 'next'; $result.From = [int]$Matches[1] }
      else { $tier = 'first' }
      $raw.Add("[$h]"); continue
    }
    # Preisfeld kann verschachtelte Tooltip-Spans enthalten -> Tags entfernen, Zahl nehmen
    if ($body -match '<td>([^<]+)</td><td><div class="PriceTag">(.*?)</div>' -and ([regex]::Replace($Matches[2], '<[^>]+>', ' ') -match '(\d+)\s*$')) {
      $label = ($body -replace '^.*?<td>([^<]+)</td>.*$', '$1').Trim() -replace '&#x27;', "'"; $v = [int]$Matches[1]
      $raw.Add("$label=$v")
      if ($tier -eq 'wargear') {
        $wn = $label -replace '^per\s+', ''
        if (-not $result.Wargear.Contains($wn)) { $result.Wargear[$wn] = $v }
        continue
      }
      if ($label -match ',') { continue }   # gemischte Zeilen wie "1 Sword Brother, 4 Neophytes" -> von Hand prüfen
      $k = [int]([regex]::Match($label, '^\d+').Value)
      if (-not $k) { continue }
      $target = if ($tier -eq 'next') { $result.Next } else { $result.First }
      if (-not $target.ContainsKey($k)) { $target[$k] = $v }
    }
  }
  $result.Raw = ($raw | Select-Object -Unique) -join ' '
  return $result
}
