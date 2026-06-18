# Helper: emoji via surrogate pairs
$car     = [char]0xD83D + [char]0xDE97  # 🚗
$plane   = [char]0x2708 + [char]0xFE0F  # ✈️
$sat     = [char]0xD83D + [char]0xDCE1  # 📡
$battery = [char]0xD83D + [char]0xDD0B  # 🔋
$hosp    = [char]0xD83D + [char]0xDEA5  # 🏥
$micro   = [char]0xD83D + [char]0xDD2C  # 🔬
$bubble  = [char]0xD83E + [char]0xDEA7  # 🫧
$bulb    = [char]0xD83D + [char]0xDCA1  # 💡
$box     = [char]0xD83D + [char]0xDCE6  # 📦
$trophy  = [char]0xD83C + [char]0xDFC6  # 🏆
$xTwitter= [char]0xD835 + [char]0xDD4F  # 𝕏
$play    = [char]0x25B6                # ▶
$pin     = [char]0xD83D + [char]0xDCCD # 📍
$phone   = [char]0xD83D + [char]0xDCDE # 📞
$mail    = [char]0x2709 + [char]0xFE0F # ✉️
$star    = [char]0x2726                # ✦
$arrow   = [char]0x2192                # →
$guille  = [char]0x203A                # ›

$basePath = "C:\Users\franc\OneDrive\Website Development\Incisee Rotomatic\products"
$files = Get-ChildItem -Path $basePath -Filter "*.html" | Sort-Object Name

$enc1252 = [System.Text.Encoding]::GetEncoding(1252)
$encUTF8 = [System.Text.Encoding]::UTF8
$crlf = "`r`n"

foreach ($file in $files) {
    Write-Host ""
    Write-Host "===== Processing: $($file.Name) =====" -ForegroundColor Cyan
    $fixCount = 0

    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)

    # Convert mixed Windows-1252/UTF-8 bytes to proper UTF-8 bytes
    $outBytes = New-Object System.Collections.Generic.List[byte]
    $i = 0
    while ($i -lt $bytes.Length) {
        $b = $bytes[$i]
        if ($b -le 0x7F) {
            $outBytes.Add($b); $i++
        } elseif ($b -ge 0xC0 -and $b -le 0xDF -and $i+1 -lt $bytes.Length -and $bytes[$i+1] -ge 0x80 -and $bytes[$i+1] -le 0xBF) {
            $outBytes.Add($b); $outBytes.Add($bytes[$i+1]); $i += 2
        } elseif ($b -ge 0xE0 -and $b -le 0xEF -and $i+2 -lt $bytes.Length -and $bytes[$i+1] -ge 0x80 -and $bytes[$i+1] -le 0xBF -and $bytes[$i+2] -ge 0x80 -and $bytes[$i+2] -le 0xBF) {
            $outBytes.Add($b); $outBytes.Add($bytes[$i+1]); $outBytes.Add($bytes[$i+2]); $i += 3
        } elseif ($b -ge 0xF0 -and $b -le 0xF7 -and $i+3 -lt $bytes.Length -and $bytes[$i+1] -ge 0x80 -and $bytes[$i+1] -le 0xBF -and $bytes[$i+2] -ge 0x80 -and $bytes[$i+2] -le 0xBF -and $bytes[$i+3] -ge 0x80 -and $bytes[$i+3] -le 0xBF) {
            $outBytes.Add($b); $outBytes.Add($bytes[$i+1]); $outBytes.Add($bytes[$i+2]); $outBytes.Add($bytes[$i+3]); $i += 4
        } else {
            $unicodeChar = $enc1252.GetString([byte[]]@($b))
            $utf8Bytes = $encUTF8.GetBytes($unicodeChar)
            foreach ($ub in $utf8Bytes) { $outBytes.Add($ub) }
            $i++
        }
    }
    $content = $encUTF8.GetString($outBytes.ToArray())

    # ========== NAVBAR INDUSTRY ICONS ==========
    $patterns = @(
        @('industries/automotive.html', $car, "Automotive"),
        @('industries/aerospace.html', $plane, "Aerospace"),
        @('industries/telecom.html', $sat, "Telecom"),
        @('industries/ev.html', $battery, "EV"),
        @('industries/healthcare.html', $hosp, "Healthcare")
    )
    foreach ($p in $patterns) {
        $href = $p[0]; $emoji = $p[1]; $name = $p[2]
        $old = '<a href="../' + $href + '" class="navbar__dropdown-item" role="menuitem">' + $crlf + '              <div class="navbar__dropdown-icon">??</div>'
        if ($content.Contains($old)) {
            $new = '<a href="../' + $href + '" class="navbar__dropdown-item" role="menuitem">' + $crlf + '              <div class="navbar__dropdown-icon">' + $emoji + '</div>'
            $content = $content.Replace($old, $new); $fixCount++
            Write-Host "  [+] $name icon"
        }
    }

    # ========== NAVBAR PRODUCT DROPDOWN ICONS ==========
    $prodPatterns = @(
        @('products/epfte-membranes.html', $micro, "ePTFE"),
        @('products/rubber-gaskets.html', $bubble, "Rubber Gaskets"),
        @('products/electronic-die-cuts.html', $bulb, "Electronic Die-Cuts")
    )
    foreach ($p in $prodPatterns) {
        $href = $p[0]; $emoji = $p[1]; $name = $p[2]
        $old = '<a href="../' + $href + '" class="navbar__dropdown-item" role="menuitem">' + $crlf + '              <div class="navbar__dropdown-icon">??</div>'
        if ($content.Contains($old)) {
            $new = '<a href="../' + $href + '" class="navbar__dropdown-item" role="menuitem">' + $crlf + '              <div class="navbar__dropdown-icon">' + $emoji + '</div>'
            $content = $content.Replace($old, $new); $fixCount++
            Write-Host "  [+] $name icon"
        }
    }

    # View All Products icon
    $oldView = '<a href="../products.html" class="navbar__dropdown-item" role="menuitem">' + $crlf + '              <div class="navbar__dropdown-icon">??</div>'
    if ($content.Contains($oldView)) {
        $newView = '<a href="../products.html" class="navbar__dropdown-item" role="menuitem">' + $crlf + '              <div class="navbar__dropdown-icon">' + $box + '</div>'
        $content = $content.Replace($oldView, $newView); $fixCount++
        Write-Host "  [+] View All icon"
    }
    if ($content.Contains('View All Products ?')) {
        $content = $content.Replace('View All Products ?', 'View All Products ' + $arrow); $fixCount++
        Write-Host "  [+] View All text"
    }

    # ========== NAVBAR RFQ ==========
    $rfqOld1 = 'class="navbar__rfq">? Request a Quote'
    if ($content.Contains($rfqOld1)) {
        $content = $content.Replace($rfqOld1, 'class="navbar__rfq">' + $star + ' Request a Quote')
        $fixCount++; Write-Host "  [+] navbar RFQ"
    }
    $rfqOld2 = 'class="navbar__mobile-rfq">? Request a Quote'
    if ($content.Contains($rfqOld2)) {
        $content = $content.Replace($rfqOld2, 'class="navbar__mobile-rfq">' + $star + ' Request a Quote')
        $fixCount++; Write-Host "  [+] navbar mobile RFQ"
    }

    # ========== FOOTER ICONS ==========
    if ($content.Contains('footer__cert-icon">??</span>')) {
        $content = $content.Replace('footer__cert-icon">??</span>', 'footer__cert-icon">' + $trophy + '</span>')
        $fixCount++; Write-Host "  [+] Footer cert icon"
    }
    if ($content.Contains('aria-label="Twitter">??</a>')) {
        $content = $content.Replace('aria-label="Twitter">??</a>', 'aria-label="Twitter">' + $xTwitter + '</a>')
        $fixCount++; Write-Host "  [+] Footer Twitter"
    }
    if ($content.Contains('aria-label="YouTube">?</a>')) {
        $content = $content.Replace('aria-label="YouTube">?</a>', 'aria-label="YouTube">' + $play + '</a>')
        $fixCount++; Write-Host "  [+] Footer YouTube"
    }

    # Footer contact icons
    $fAddrOld = $crlf + '            <div class="footer__contact-icon">??</div>' + $crlf + '            <div class="footer__contact-text">' + $crlf + '              No 42, JAK Industrial Park'
    if ($content.Contains($fAddrOld)) {
        $fAddrNew = $crlf + '            <div class="footer__contact-icon">' + $pin + '</div>' + $crlf + '            <div class="footer__contact-text">' + $crlf + '              No 42, JAK Industrial Park'
        $content = $content.Replace($fAddrOld, $fAddrNew); $fixCount++; Write-Host "  [+] Footer address icon"
    }
    $fPhoneOld = $crlf + '            <div class="footer__contact-icon">??</div>' + $crlf + '            <div class="footer__contact-text">' + $crlf + '              <a href="../tel:+919884554999'
    if ($content.Contains($fPhoneOld)) {
        $fPhoneNew = $crlf + '            <div class="footer__contact-icon">' + $phone + '</div>' + $crlf + '            <div class="footer__contact-text">' + $crlf + '              <a href="../tel:+919884554999'
        $content = $content.Replace($fPhoneOld, $fPhoneNew); $fixCount++; Write-Host "  [+] Footer phone icon"
    }
    $fEmailOld = $crlf + '            <div class="footer__contact-icon">??</div>' + $crlf + '            <div class="footer__contact-text">' + $crlf + '              <a href="../mailto:cs@inciserotomatic.com'
    if ($content.Contains($fEmailOld)) {
        $fEmailNew = $crlf + '            <div class="footer__contact-icon">' + $mail + '</div>' + $crlf + '            <div class="footer__contact-text">' + $crlf + '              <a href="../mailto:cs@inciserotomatic.com'
        $content = $content.Replace($fEmailOld, $fEmailNew); $fixCount++; Write-Host "  [+] Footer email icon"
    }

    # ========== PAGE-SPECIFIC ==========
    $bc = 0; $content = [regex]::Replace($content, '(?<=class="badge[^"]*">)\?\?\? +|(?<=class="badge[^"]*">)\?\? +', { $bc++; return '' })
    if ($bc -gt 0) { $fixCount++; Write-Host "  [+] Removed $bc badge prefixes" }

    $btc = 0; $content = [regex]::Replace($content, '(?<=class="btn[^"]*">)\?\? +', { $btc++; return '' })
    if ($btc -gt 0) { $fixCount++; Write-Host "  [+] Removed $btc button prefixes" }

    $cc = 0; $content = [regex]::Replace($content, '(?<=class="app-chip">)\?\?\? +|(?<=class="app-chip">)\?\? +', { $cc++; return ($script:arrow + ' ') })
    if ($cc -gt 0) { $fixCount++; Write-Host "  [+] Fixed $cc app-chip prefixes" }

    $rc = 0; $content = [regex]::Replace($content, '(?<=class="rel-card__icon">)\?\?\?</div>|(?<=class="rel-card__icon">)\?\?</div>|(?<=class="rel-card__icon">)\?</div>', { $rc++; return ($script:box + '</div>') })
    if ($rc -gt 0) { $fixCount++; Write-Host "  [+] Fixed $rc rel-card icons" }

    $dc = 0; $content = [regex]::Replace($content, '(?<=class="diff-card__icon-wrap[^"]*">)\?\?\?</div>|(?<=class="diff-card__icon-wrap[^"]*">)\?\?</div>|(?<=class="diff-card__icon-wrap[^"]*">)\?</div>', { $dc++; return ($script:star + '</div>') })
    if ($dc -gt 0) { $fixCount++; Write-Host "  [+] Fixed $dc diff-card icons" }

    $sp = 0; $content = [regex]::Replace($content, '(?<=class="sep">)\?\?</span>|(?<=class="sep">)\?</span>', { $sp++; return ($script:guille + '</span>') })
    if ($sp -gt 0) { $fixCount++; Write-Host "  [+] Fixed $sp breadcrumb sep" }

    # Encoding fixes report
    if ($content.Contains('Chennai – 600 062')) { Write-Host "  [OK] Chennai en-dash" }
    if ($content.Contains('© 2025 Incisee Rotomatic')) { Write-Host "  [OK] Copyright" }

    Write-Host "  TOTAL: $fixCount fixes" -ForegroundColor Green

    $utf8Bytes = $encUTF8.GetBytes($content)
    [System.IO.File]::WriteAllBytes($file.FullName, $utf8Bytes)
}

Write-Host "`n===== ALL DONE =====" -ForegroundColor Green
