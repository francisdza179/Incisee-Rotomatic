$basePath = "C:\Users\franc\OneDrive\Website Development\Incisee Rotomatic\products"
$files = Get-ChildItem -Path $basePath -Filter "*.html" | Sort-Object Name
$encUTF8 = [System.Text.Encoding]::UTF8
$star = [char]0x2726

foreach ($file in $files) {
    Write-Host "=== $($file.Name) ==="
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $content = $encUTF8.GetString($bytes)
    $fixCount = 0

    # Fix 1: ?? in buttons (btn class with extra attributes like id)
    # Matches: class="btn..." ... >??  (remove the ?? and space)
    $before = $content.Length
    $content = $content -replace '(?<=class="btn[^"]*"[^>]*>)\?\? +', ''
    $after = $content.Length
    if ($before -ne $after) { $fixCount++; Write-Host "  [+] Button ?? removed" }

    # Fix 2: ?? or ??? in diff-card icons (with extra attributes like style)
    $before = $content.Length
    $content = $content -replace '(?<=class="diff-card__icon-wrap[^"]*"[^>]*>)\?\?\?</div>', ($star + '</div>')
    $content = $content -replace '(?<=class="diff-card__icon-wrap[^"]*"[^>]*>)\?\?</div>', ($star + '</div>')
    $after = $content.Length
    if ($before -ne $after) { $fixCount++; Write-Host "  [+] Diff-card icons fixed" }

    # Fix 3: Any remaining ??? in app-chip or badge with extra attributes
    $content = $content -replace '(?<=class="(?:app-chip|badge)[^"]*"[^>]*>)\?\?\? +', '→ '
    $content = $content -replace '(?<=class="(?:app-chip|badge)[^"]*"[^>]*>)\?\? +', ''

    # Fix 4: Any remaining ??? in rel-card__icon with extra attributes
    $box = [char]0xD83D + [char]0xDCE6
    $content = $content -replace '(?<=class="rel-card__icon[^"]*"[^>]*>)\?\?\?</div>', ($box + '</div>')
    $content = $content -replace '(?<=class="rel-card__icon[^"]*"[^>]*>)\?\?</div>', ($box + '</div>')
    $content = $content -replace '(?<=class="rel-card__icon[^"]*"[^>]*>)\?</div>', ($box + '</div>')

    # Fix 5: Any remaining View All ? -> View All →
    $arrow = [char]0x2192
    $content = $content -replace 'View All \?', ('View All ' + $arrow)

    # Count remaining issues
    $remaining = [regex]::Matches($content, '\?\?').Count
    if ($remaining -gt 0) {
        Write-Host "  [WARN] $remaining ?? remaining" -ForegroundColor Yellow
    } else {
        Write-Host "  [OK] No ?? remaining" -ForegroundColor Green
    }

    if ($fixCount -gt 0) {
        $utf8Bytes = $encUTF8.GetBytes($content)
        [System.IO.File]::WriteAllBytes($file.FullName, $utf8Bytes)
        Write-Host "  Written $fixCount fixes"
    }
}
Write-Host "`nDone."
