APP_NAME=DPRSanskrit
OUTDIR="${1:-../..}"

# generate the XPI file
echo "Generating $APP_NAME.xpi..."
zip -r $OUTDIR/$APP_NAME.xpi * -x build.sh

if hash notify-send 2>/dev/null; then
    notify-send "Done!" "Extension Updated"
fi

