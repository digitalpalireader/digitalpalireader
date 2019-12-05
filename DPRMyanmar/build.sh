APP_NAME=DPRMyanmar
OUTDIR="${1:-../../build}"

rm -f $OUTDIR/$APP_NAME.xpi

# generate the XPI file
echo "Generating $APP_NAME.xpi..."
zip -r $OUTDIR/$APP_NAME.xpi * -x build.sh

if hash notify-send 2>/dev/null; then
    notify-send "Done!" "Extension Updated"
fi
