# convert-images.ps1
# Batch-convert PNG/JPEG images in ./images to WebP using ImageMagick (magick)
# Usage: Open PowerShell, navigate to the project folder and run:
#   .\scripts\convert-images.ps1

$imagesDir = Join-Path -Path (Get-Location) -ChildPath 'images'
if (-not (Test-Path $imagesDir)) {
    Write-Error "Images directory not found: $imagesDir"
    exit 1
}

# Check for ImageMagick
if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
    Write-Host "ImageMagick 'magick' not found. Install it first (recommended via winget):"
    Write-Host "  winget install --id ImageMagick.ImageMagick -e"
    Write-Host "Or install from https://imagemagick.org"
    exit 1
}

$quality = 80 # 0-100 quality for lossy WebP
$losslessFor = @('TerraCharge-logo.png') # small logos you may prefer lossless conversion

Get-ChildItem -Path $imagesDir -Include *.png,*.jpg,*.jpeg -File -Recurse | ForEach-Object {
    $src = $_.FullName
    $dest = [System.IO.Path]::ChangeExtension($src,'webp')

    if (Test-Path $dest) {
        Write-Host "Skipping (exists): $($_.Name) -> $(Split-Path $dest -Leaf)"
        return
    }

    $isLossless = $losslessFor -contains $_.Name
    if ($isLossless) {
        Write-Host "Converting (lossless): $($_.Name) -> $(Split-Path $dest -Leaf)"
        magick convert $src -define webp:lossless=true $dest
    } else {
        Write-Host "Converting (quality $quality): $($_.Name) -> $(Split-Path $dest -Leaf)"
        magick convert $src -quality $quality $dest
    }
}

Write-Host "\nConversion complete. New WebP files created alongside originals (no originals overwritten)."
Write-Host "Summary (largest files last):"
Get-ChildItem -Path $imagesDir | Sort-Object Length -Descending | Select-Object Name,@{Name='SizeKB';Expression={[math]::Round($_.Length/1KB,2)}} | Format-Table -AutoSize

Write-Host "\nTo preview savings, run before/after checks manually. If you want this script to keep copies in a dedicated folder, I can update it."