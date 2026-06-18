$basePath = "C:\Users\franc\OneDrive\Website Development\Incisee Rotomatic\products"
$encUTF8 = [System.Text.Encoding]::UTF8

$sponge = [char]0xD83E + [char]0xDDBD
$label = [char]0xD83C + [char]0xDFF7 + [char]0xFE0F
$hospital = [char]0xD83C + [char]0xDFE5
$gear = [char]0x2699 + [char]0xFE0F
$cycle = [char]0xD83D + [char]0xDD04
$wrench = [char]0xD83D + [char]0xDD27
$arrow = [char]0x2192

$fixes = @(
    @("foam-gaskets.html", 'class="product-hero__image" data-reveal="left">??</div>', 'class="product-hero__image" data-reveal="left">' + $sponge + '</div>'),
    @("logos-labels.html", 'class="product-img-box" data-reveal="left">???</div>', 'class="product-img-box" data-reveal="left">' + $label + '</div>'),
    @("medical-die-cuts.html", 'font-size:72px;color:var(--clr-text-muted);">??</div></div>', 'font-size:72px;color:var(--clr-text-muted);">' + $hospital + '</div></div>'),
    @("rotary-flatbed-parts.html", 'class="product-hero__image" data-reveal="left">??</div>', 'class="product-hero__image" data-reveal="left">' + $gear + '</div>'),
    @("sealing-gaskets.html", 'font-size:72px;color:var(--clr-text-muted);">??</div></div>', 'font-size:72px;color:var(--clr-text-muted);">' + $cycle + '</div></div>'),
    @("silicone-pads.html", 'font-size:72px;color:var(--clr-text-muted);">??</div></div>', 'font-size:72px;color:var(--clr-text-muted);">' + $wrench + '</div></div>')
)

foreach ($fix in $fixes) {
    $path = Join-Path $basePath $fix[0]
    $bytes = [System.IO.File]::ReadAllBytes($path)
    $content = $encUTF8.GetString($bytes)
    $oldStr = $fix[1]
    $newStr = $fix[2]
    if ($content.Contains($oldStr)) {
        $content = $content.Replace($oldStr, $newStr)
        $utf8Bytes = $encUTF8.GetBytes($content)
        [System.IO.File]::WriteAllBytes($path, $utf8Bytes)
        Write-Host "$($fix[0]): Fixed"
    } else {
        Write-Host "$($fix[0]): NOT FOUND"
    }
}

# Fix "Request a Quote ?" in logos-labels.html
$path2 = Join-Path $basePath "logos-labels.html"
$bytes2 = [System.IO.File]::ReadAllBytes($path2)
$content2 = $encUTF8.GetString($bytes2)
if ($content2.Contains("Request a Quote ?")) {
    $content2 = $content2.Replace("Request a Quote ?", "Request a Quote " + $arrow)
    $utf8Bytes2 = $encUTF8.GetBytes($content2)
    [System.IO.File]::WriteAllBytes($path2, $utf8Bytes2)
    Write-Host "logos-labels.html: Fixed Request a Quote ?"
} else {
    Write-Host "logos-labels.html: Request a Quote ? NOT FOUND"
}

Write-Host "`nDone."
