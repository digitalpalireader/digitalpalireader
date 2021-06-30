param(
  [Parameter(Mandatory = $true)]
  [System.IO.FileInfo] $HtmlFilePath
)

$root = Split-Path $PSScriptRoot

function AppendHashToFileName
{
  param($filePath)

  $fileHash = (Get-FileHash -Algorithm MD5 (Join-Path $root $filePath)).Hash
  $fileInfo = [IO.FileInfo] $filePath

  $oldFilePathWithoutExtension = $filePath.Substring(0, $filePath.Length - $fileInfo.Extension.Length)
  $newExtension = ".{0}{1}" -f $fileHash, $fileInfo.Extension

  Write-Host (">>>> '$filePath' => '$($oldFilePathWithoutExtension)$($newExtension)'")

  "$($oldFilePathWithoutExtension)$($newExtension)"
}

function rename-file
{
  param($filePath)

  $newFilePath = AppendHashToFileName $filePath

  $fileFullPath = (Join-Path $root $filePath)
  $newFileFullPath = (Join-Path $root $newFilePath)
  Rename-Item $fileFullPath $newFileFullPath -Verbose
}

function FixLinkRelElement
{
  param($line)

  if ($line -notmatch '^\s*\<link rel=\"stylesheet\" href=\"(.*)\" \/\>\s*$') {
    return "Error - unexpected format for link rel."
  }

  $fileName = AppendHashToFileName $Matches.1
  rename-file $Matches.1
  return "    <link rel=""stylesheet"" href=""$fileName"" />"
}

function TransformScriptHrefElement
{
  param($line)

  if ($line -notmatch '^\s*\<script src=\"(.*)\"\>\<\/script\>\s*$') {
    return "Error - unexpected format for script src."
  }

  $fileName = AppendHashToFileName $Matches.1
  rename-file $Matches.1
  return "    <script src=""$fileName""></script>"
}

$contents = Get-Content $HtmlFilePath | ForEach-Object {
  if ($_ -imatch '\<link.*rel=.*stylesheet.*') {
    FixLinkRelElement $_
  } elseif ($_ -imatch '\<script.*src=.*') {
    TransformScriptHrefElement $_
  } else {
    $_
  }
}

# BEGIN: HACK
# NOTE: This is a temporary but stable solution. Once we get webpack, all this gimmickery goes away.
$chromeJsFileName = Get-ChildItem -Recurse -Filter "chrome.*js" $root
if (-not $chromeJsFileName) {
  throw 'Did not find chrome.js'
} else {
  Write-Output "Found $($chromeJsFileName.FullName)"
}

$chromeJsReplaced = $False
$contents = $contents | ForEach-Object {
  if ($_ -ceq "      import '/_dprhtml/js/chrome.js'") {
    "      import '/_dprhtml/js/$($chromeJsFileName.Name)'"
    $chromeJsReplaced = $True
  } else {
    $_
  }
}

if (-not $chromeJsReplaced) {
  throw 'Did not find chrome.js import in index.html'
} else {
  Write-Output "Updated chrome.js import..."
}
# END: HACK

$contents | Out-File -FilePath $HtmlFilePath -Encoding utf8
