$basePath = "C:\Users\franc\OneDrive\Website Development\Incisee Rotomatic\products"
$files = Get-ChildItem $basePath -Filter "*.html" | Sort-Object Name
$totalIssues = 0
$totalOK = 0
$detail = ""

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $qq = [regex]::Matches($content, '\?\?').Count
    $u = [regex]::Matches($content, '\uFFFD').Count
    if ($qq -gt 0 -or $u -gt 0) {
        $detail += "$($file.Name): ??=$qq  U+FFFD=$u`n"
        $totalIssues += $qq + $u
    } else {
        $totalOK++
    }
}

if ($totalIssues -eq 0) {
    Write-Host "ALL $totalOK FILES CLEAN - No remaining broken characters!" -ForegroundColor Green
} else {
    Write-Host "Issues found:" -ForegroundColor Yellow
    Write-Host $detail
    Write-Host "Total remaining issues: $totalIssues" -ForegroundColor Red
}
