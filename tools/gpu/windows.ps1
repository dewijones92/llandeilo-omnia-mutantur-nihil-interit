# The Windows half of tools/gpu/run.sh: installs Playwright (cached), unpacks the test code, checks the
# WSL preview is reachable, runs each pass on Windows Chrome, and copies the results back to WSL.
# Exit codes: the first failing Playwright pass's code, 124 for a pass that ran out of time (its whole
# process tree is killed), or 10-13 for a setup failure.
# -CleanupOnly kills any Playwright run the kit left behind under -Root and does nothing else.
param(
  [string]$Tar,
  [string]$BaseUrl,
  [string]$Dest,
  [string]$PlaywrightVersion,
  [string]$Root = 'C:\llandeilo-gpu',
  [string]$Passes = 'gpu,e2e',
  [int]$PassTimeoutSec = 2100,
  [switch]$Uncapped,
  [switch]$CleanupOnly
)

$ErrorActionPreference = 'Stop'
function Log([string]$m) { Write-Host ('{0} gpu(win): {1}' -f (Get-Date -Format HH:mm:ss), $m) }

# Kills the process trees of the kit's own Playwright runs (node.exe started from under $Root, and the
# Chrome it launched, which are its children). Dewi's own Chrome windows are never in those trees.
function Stop-KitRuns {
  $mine = Get-CimInstance Win32_Process -Filter "Name = 'node.exe'" |
    Where-Object { $_.CommandLine -and $_.CommandLine.Contains($Root) }
  foreach ($p in $mine) {
    Log "killing a leftover kit run (node pid $($p.ProcessId)) and its Chrome"
    & taskkill.exe /T /F /PID $p.ProcessId | Out-Null
  }
}

New-Item -ItemType Directory -Force -Path $Root | Out-Null
if ($CleanupOnly) { Stop-KitRuns; exit 0 }
foreach ($required in 'Tar', 'BaseUrl', 'Dest', 'PlaywrightVersion') {
  if (-not (Get-Variable $required -ValueOnly)) { Log "missing -$required"; exit 10 }
}
Stop-KitRuns
# npm and other cmd.exe shims refuse a UNC working directory, which is where WSL starts us.
Set-Location -LiteralPath $Root

# Only Playwright is needed on this side (the app is built and served in WSL), so install just that,
# at the version package-lock.json pins, and keep it until that version or Node changes.
$nodeVersion = (& node --version)
$stamp = "@playwright/test@$PlaywrightVersion node $nodeVersion"
$stampFile = Join-Path $Root '.installed'
$cached = (Test-Path $stampFile) -and ((Get-Content $stampFile -Raw).Trim() -eq $stamp)
if ($cached) {
  Log "playwright cached ($stamp)"
} else {
  Log "installing $stamp"
  $pkg = [ordered]@{
    private      = $true
    description  = 'Playwright for tools/gpu/run.sh (llandeilo-omnia-mutantur-nihil-interit)'
    dependencies = [ordered]@{ '@playwright/test' = $PlaywrightVersion }
  }
  Set-Content -LiteralPath (Join-Path $Root 'package.json') -Value ($pkg | ConvertTo-Json) -Encoding ascii
  $ErrorActionPreference = 'Continue'
  & npm install --no-audit --no-fund --no-package-lock --registry https://registry.npmjs.org/
  $code = $LASTEXITCODE
  $ErrorActionPreference = 'Stop'
  if ($code -ne 0) { Log "npm install failed (exit $code)"; exit 10 }
  Set-Content -LiteralPath $stampFile -Value $stamp -Encoding ascii
}

# A fresh copy of the test code every run, so nothing from an earlier run lingers.
$repo = Join-Path $Root 'repo'
if (Test-Path $repo) { Remove-Item -LiteralPath $repo -Recurse -Force }
New-Item -ItemType Directory -Path $repo | Out-Null
$localTar = Join-Path $Root 'repo.tar'
Copy-Item -LiteralPath $Tar -Destination $localTar -Force
$ErrorActionPreference = 'Continue'
& "$env:SystemRoot\System32\tar.exe" -xf $localTar -C $repo
$code = $LASTEXITCODE
$ErrorActionPreference = 'Stop'
if ($code -ne 0) { Log "unpacking the test code failed (exit $code)"; exit 11 }
Log "test code unpacked to $repo"

try {
  $r = Invoke-WebRequest -Uri $BaseUrl -UseBasicParsing -TimeoutSec 15
} catch {
  Log "Windows cannot reach the WSL preview at ${BaseUrl}: $($_.Exception.Message)"
  exit 12
}
if ($r.StatusCode -ne 200 -or $r.Content -notmatch 'id="scene"') {
  Log "$BaseUrl answered $($r.StatusCode) but is not the app (another server on that port?)"
  exit 12
}
Log "preview reachable at $BaseUrl"

Set-Location -LiteralPath $repo
$env:GPU_E2E_BASE_URL = $BaseUrl
$env:GPU_RESULTS_DIR = 'test-results-gpu'
$env:GPU_UNCAPPED = if ($Uncapped) { '1' } else { '0' }
$cli = Join-Path $Root 'node_modules\@playwright\test\cli.js'
$final = 0
foreach ($p in $Passes.Split(',')) {
  $env:GPU_PASS = $p
  $t0 = Get-Date
  Log "pass $p starting"
  $proc = Start-Process -FilePath 'node' -NoNewWindow -PassThru `
    -ArgumentList @("`"$cli`"", 'test', '-c', 'playwright.gpu.config.ts', "--project=$p")
  $null = $proc.Handle # without this the exit code of a -PassThru process can read back empty
  if ($proc.WaitForExit($PassTimeoutSec * 1000)) {
    $code = $proc.ExitCode
  } else {
    Log "pass $p ran past $PassTimeoutSec s: killing its process tree (node pid $($proc.Id))"
    & taskkill.exe /T /F /PID $proc.Id | Out-Null
    $code = 124
  }
  Log ('pass {0} exit {1} in {2:n0}s' -f $p, $code, ((Get-Date) - $t0).TotalSeconds)
  if ($final -eq 0 -and $code -ne 0) { $final = $code }
}

$out = Join-Path $repo 'test-results-gpu'
New-Item -ItemType Directory -Force -Path $out | Out-Null
# The normal specs save their screenshots under test-results/.
if (Test-Path 'test-results') { Copy-Item -LiteralPath 'test-results' -Destination (Join-Path $out 'e2e-shots') -Recurse }
try {
  New-Item -ItemType Directory -Force -Path $Dest | Out-Null
  Copy-Item -Path (Join-Path $out '*') -Destination $Dest -Recurse -Force
  Log "results copied to $Dest"
} catch {
  Log "copying results back to WSL failed: $($_.Exception.Message) (they are still in $out)"
  if ($final -eq 0) { $final = 13 }
}
exit $final
