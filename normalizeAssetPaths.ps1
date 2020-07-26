param(
    [Parameter(Mandatory = $true)]
    $root
)

function GetReplacements
{
    param($relativePrefix)

    @{
        '"\/css\/' = "`"$relativePrefix/css/"
        '"\/fonts\/' = "`"$relativePrefix/fonts/"
        '"\/images\/' = "`"$relativePrefix/images/"
        '"\/js\/' = "`"$relativePrefix/js/"
        '"\/Archive\/' = "`"$relativePrefix/Archive/"
        '"\/suttas\/' = "`"$relativePrefix/suttas/"
    }
}

Get-ChildItem -rec -filt *.html $root | % { 
    "Fixing up {0}" -f $_.FullName; 

    Push-Location $_.DirectoryName; 
    $relativePrefix = (Join-Path $root "index.html" | Resolve-Path -Relative).Replace('index.html', '').Replace('\', '/').TrimEnd('/')
    $contents = Get-Content $_ -Raw -Encoding utf8

    $replacements = GetReplacements $relativePrefix 
    $replacements.Keys | ForEach-Object {
        $contents = $contents -replace @($_,$replacements[$_])
    }

    [System.IO.File]::WriteAllText($_.FullName, $contents, [System.Text.UTF8Encoding]($False))

    Pop-Location 
}