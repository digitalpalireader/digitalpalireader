echo ------------------------------------------------------------
echo "SYSTEM_DEFAULTWORKINGDIRECTORY = $SYSTEM_DEFAULTWORKINGDIRECTORY"
echo "RELEASE_PRIMARYARTIFACTSOURCEALIAS = $RELEASE_PRIMARYARTIFACTSOURCEALIAS"
echo ------------------------------------------------------------

echo ------------------------------------------------------------
ls -laF
echo ------------------------------------------------------------
ls -laF '$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS'
echo ------------------------------------------------------------

# Get azcopy
echo ------ Running wget
wget -O azcopy.tar.gz https://aka.ms/downloadazcopy-v10-linux
echo ------ Running tar
tar -xf azcopy.tar.gz
echo ------ Copy azcopy
ls -laF
find ./azcopy_linux_amd64_*/azcopy -name azcopy -exec cp -var {} "$SYSTEM_DEFAULTWORKINGDIRECTORY" \;

echo ------ Do azcopy
$SYSTEM_DEFAULTWORKINGDIRECTORY/azcopy copy "$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS/drop/*" 'https://'"$AzureStorageAccount"'.blob.core.windows.net/$web'"$WebContainerSASToken"'' --recursive=true

echo ------ Download asge
export RootDir="$SYSTEM_DEFAULTWORKINGDIRECTORY/$RELEASE_PRIMARYARTIFACTSOURCEALIAS/drop"
$SYSTEM_DEFAULTWORKINGDIRECTORY/azcopy copy 'https://dprproduction.blob.core.windows.net/asge/asge' "$RootDir/bin/asge" --recursive

echo ------ Compress stuff
ls -laF "$RootDir/bin/asge/"
dotnet "$RootDir/bin/asge/ASGE.dll" -- -e .xml -x 864000 -r -f '$web' -n .gz -a "$AzureStorageAccount" -k "$AzureStorageKey"
dotnet "$RootDir/bin/asge/ASGE.dll" -- -e .js .css -x 8640 -r -f '$web' -n .gz -a "$AzureStorageAccount" -k "$AzureStorageKey"
