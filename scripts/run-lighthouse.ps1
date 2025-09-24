# run-lighthouse.ps1
# Helper script that guides running Lighthouse locally via npx.
# It does not run npx directly to avoid PowerShell execution policy issues.

Write-Host "This script helps you run Lighthouse (Chrome) using npx."
Write-Host "Prerequisites: Node.js (with npx) and Google Chrome installed."
Write-Host "If npx is blocked by execution policy, you can temporarily enable script execution or run the commands manually."

Write-Host "\nRecommended command to run from the project folder (serving files via a simple HTTP server):"
Write-Host "1) Serve the site locally (PowerShell):"
Write-Host "   python -m http.server 8000"
Write-Host "2) In another terminal, run Lighthouse (desktop):"
Write-Host "   npx -y lighthouse http://localhost:8000/index.html --output html --output-path ./lighthouse-report.html --emulated-form-factor=desktop"

Write-Host "If npx is unavailable due to execution policy, run these steps manually after enabling scripts or use a different terminal."