APP_NAME=dprweb
OUTDIR="${1:-../../build}"
SOURCEDIR="${2:-$OUTDIR/..}"

echo "Building dprweb extensions"
pushd extensions
yarn install
yarn lint
yarn build
yarn citest
popd

rm -f $OUTDIR/$APP_NAME.zip

# generate the ZIP file
echo "Generating $APP_NAME.zip... ($SOURCEDIR -> $OUTDIR)"
pushd $SOURCEDIR
zip -r $OUTDIR/$APP_NAME.zip * -x \*.git\* -x \*node_modules\* *.zip
popd

if hash notify-send 2>/dev/null; then
    notify-send "Done!" "Extension Updated"
fi
