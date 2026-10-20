[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$blueMapWebRoot = 'C:\Users\Norbert\Desktop\MC_SERVER\data\bluemap\web'
$mapTarget = Join-Path $repoRoot 'map'

if (-not (Test-Path -LiteralPath $blueMapWebRoot)) {
    throw "BlueMap output was not found at $blueMapWebRoot."
}

Push-Location $repoRoot
try {
    # Do not mix an automated snapshot with someone else's unfinished work.
    $workingChanges = @(git status --porcelain)
    if ($workingChanges.Count -gt 0) {
        Write-Warning 'BlueMap sync skipped because the repository has uncommitted changes.'
        exit 0
    }

    git fetch origin main
    if ($LASTEXITCODE -ne 0) { throw 'Could not fetch origin/main.' }

    $ahead = [int](git rev-list --count 'origin/main..HEAD')
    $behind = [int](git rev-list --count 'HEAD..origin/main')
    if ($ahead -gt 0 -and $behind -eq 0) {
        git push origin main
        if ($LASTEXITCODE -ne 0) { throw 'Could not push the previous BlueMap snapshot.' }
    } elseif ($behind -gt 0) {
        git pull --ff-only origin main
        if ($LASTEXITCODE -ne 0) { throw 'Could not fast-forward to origin/main.' }
    }

    # Exit codes below 8 mean robocopy completed successfully, including when
    # there was nothing new to copy.
    robocopy $blueMapWebRoot $mapTarget /MIR /FFT /Z /R:2 /W:2 /NP /NFL /NDL
    if ($LASTEXITCODE -ge 8) { throw "BlueMap mirror failed (robocopy exit code $LASTEXITCODE)." }

    git add -- map
    git diff --cached --quiet -- map
    if ($LASTEXITCODE -eq 0) {
        Write-Output 'BlueMap snapshot is already current.'
        exit 0
    }

    git commit --only --message 'Update BlueMap snapshot' -- map
    if ($LASTEXITCODE -ne 0) { throw 'Could not commit the BlueMap snapshot.' }

    git push origin main
    if ($LASTEXITCODE -ne 0) { throw 'Could not push the BlueMap snapshot.' }

    Write-Output 'BlueMap snapshot deployed to main.'
} finally {
    Pop-Location
}
