param(
    [Parameter(Mandatory = $true)]
    [string]$DestinationRoot
)

$ErrorActionPreference = 'Stop'

$sourceRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\\..')).Path
$manifestPath = Join-Path $PSScriptRoot 'manifest.json'

if (-not (Test-Path -LiteralPath $DestinationRoot)) {
    throw "Destination root does not exist: $DestinationRoot"
}

$destinationRootPath = (Resolve-Path -LiteralPath $DestinationRoot).Path
$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json

Write-Host "Copying bundle: $($manifest.bundleName)"
Write-Host "Source: $sourceRoot"
Write-Host "Destination: $destinationRootPath"

foreach ($relativePath in $manifest.copyPaths) {
    $sourcePath = Join-Path $sourceRoot $relativePath
    $destinationPath = Join-Path $destinationRootPath $relativePath

    if (-not (Test-Path -LiteralPath $sourcePath)) {
        Write-Warning "Skipping missing path: $relativePath"
        continue
    }

    $destinationParent = Split-Path -Parent $destinationPath

    if (-not (Test-Path -LiteralPath $destinationParent)) {
        New-Item -ItemType Directory -Path $destinationParent -Force | Out-Null
    }

    Copy-Item -LiteralPath $sourcePath -Destination $destinationPath -Recurse -Force
    Write-Host "Copied: $relativePath"
}

Write-Host ''
Write-Host 'Manual merge files to review in the target project:'

foreach ($relativePath in $manifest.manualMergePaths) {
    Write-Host " - $relativePath"
}

Write-Host ''
Write-Host 'Data source status:'
$manifest.dataSourceStatus.PSObject.Properties | ForEach-Object {
    Write-Host " - $($_.Name): $($_.Value)"
}
