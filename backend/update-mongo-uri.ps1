# PowerShell script to update MongoDB URI in .env file
# Usage: .\update-mongo-uri.ps1 "your_connection_string_here"

param(
    [Parameter(Mandatory=$true)]
    [string]$ConnectionString
)

$envFile = ".\.env"

if (-not (Test-Path $envFile)) {
    Write-Host "Error: .env file not found!" -ForegroundColor Red
    exit 1
}

# Read the current .env file
$content = Get-Content $envFile

# Replace the MONGO_URI line
$updatedContent = $content | ForEach-Object {
    if ($_ -match "^MONGO_URI=") {
        "MONGO_URI=$ConnectionString"
    } else {
        $_
    }
}

# Write back to file
$updatedContent | Set-Content $envFile -Encoding UTF8

Write-Host "✓ MongoDB URI updated successfully!" -ForegroundColor Green
Write-Host "Updated connection string: $ConnectionString" -ForegroundColor Cyan

