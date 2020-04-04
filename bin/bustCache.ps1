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
  "{0}.{1}{2}" -f (Join-Path $fileInfo.DirectoryName $fileInfo.BaseName), $fileHash, $fileInfo.Extension
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

$contents | Out-File -FilePath $HtmlFilePath -Encoding utf8
