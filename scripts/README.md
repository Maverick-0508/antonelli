Image conversion helper scripts

convert-images.ps1
- Purpose: Batch-convert JPEG/PNG images in the project's `images/` folder to WebP using ImageMagick's `magick` CLI.
- Usage:
  1. Install ImageMagick (if not installed):
     - winget install --id ImageMagick.ImageMagick -e
     - or download from https://imagemagick.org
  2. Open PowerShell and allow script execution if necessary (only if you trust the script):
     - Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  3. Run the script from the project root:
     - .\scripts\convert-images.ps1

Notes:
- The script will not overwrite existing .webp files; it will create .webp copies alongside originals.
- Small logo files are converted lossless by default. You can adjust quality in the script.

Next steps after conversion:
- Commit the newly created .webp files to the repository if you want them served from the <picture> tags.
- If you prefer not to commit, you can host the .webp files on a CDN and update srcset references.

If you'd like, I can generate a PowerShell script to upload large images to an optimizer service, or a script to generate responsive srcset variants.