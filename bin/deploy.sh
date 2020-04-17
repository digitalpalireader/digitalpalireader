echo ------------------------------------------------------------
echo "SYSTEM_DEFAULTWORKINGDIRECTORY = $SYSTEM_DEFAULTWORKINGDIRECTORY"
echo "RELEASE_PRIMARYARTIFACTSOURCEALIAS = $RELEASE_PRIMARYARTIFACTSOURCEALIAS"
echo ------------------------------------------------------------

echo ------------------------------------------------------------
ls -laF
echo ------------------------------------------------------------
ls -laF "$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS"
echo ------------------------------------------------------------

# Get azcopy
echo ------ Running wget
wget -O azcopy.tar.gz https://azcopyvnext.azureedge.net/release20200124/azcopy_linux_amd64_10.3.4.tar.gz
echo ------ Running tar
tar -xf azcopy.tar.gz
echo ------ Copy azcopy
ls -laF
find ./azcopy_linux_amd64_*/azcopy -name azcopy -exec cp -var {} "$SYSTEM_DEFAULTWORKINGDIRECTORY" \;

echo ------ Download asge
export RootDir="$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS/drop"
$SYSTEM_DEFAULTWORKINGDIRECTORY/azcopy copy 'https://dprproduction.blob.core.windows.net/asge' "$RootDir/bin" --recursive

echo ------ Maintenance message initiaization
cp -v "$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS/drop/index.html" "$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS/drop/index-real.html"
cp -v "$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS/drop/index-upgrade.html" "$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS/drop/index.html"
$SYSTEM_DEFAULTWORKINGDIRECTORY/azcopy copy "$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS/drop/index.html" 'https://'"$AzureStorageAccount"'.blob.core.windows.net/$web'"$WebContainerSASToken"''

echo ------ Clean up container
$SYSTEM_DEFAULTWORKINGDIRECTORY/azcopy remove 'https://'"$AzureStorageAccount"'.blob.core.windows.net/$web'"$WebContainerSASToken"'' --recursive=true --exclude-path index.html
$SYSTEM_DEFAULTWORKINGDIRECTORY/azcopy list 'https://'"$AzureStorageAccount"'.blob.core.windows.net/$web'"$WebContainerSASToken"''

echo ------ Do azcopy
$SYSTEM_DEFAULTWORKINGDIRECTORY/azcopy copy "$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS/drop/*" 'https://'"$AzureStorageAccount"'.blob.core.windows.net/$web'"$WebContainerSASToken"'' --recursive=true
$SYSTEM_DEFAULTWORKINGDIRECTORY/azcopy list 'https://'"$AzureStorageAccount"'.blob.core.windows.net/$web'"$WebContainerSASToken"''

echo ------ Maintenance message finalization
cp -v "$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS/drop/index-real.html" "$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS/drop/index.html"
$SYSTEM_DEFAULTWORKINGDIRECTORY/azcopy copy "$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS/drop/index.html" 'https://'"$AzureStorageAccount"'.blob.core.windows.net/$web'"$WebContainerSASToken"''

echo ------ Compress stuff
ls -laF "$RootDir/bin/asge/asge/"
# NOTE: html cache age needs to be explicitly set to 0 on server side. http-equiv is not a valid HTML5 tag
dotnet "$RootDir/bin/asge/asge/ASGE.dll" -- -x 'no-cache, no-store' -e .html .htm -r -f '$web' -n .gz -a "$AzureStorageAccount" -k "$AzureStorageKey"
dotnet "$RootDir/bin/asge/asge/ASGE.dll" -- -x 'public, max-age=864000' -e .xml .js .css -r -f '$web' -n .gz -a "$AzureStorageAccount" -k "$AzureStorageKey"
