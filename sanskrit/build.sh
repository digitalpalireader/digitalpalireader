APP_NAME=DPRSanskrit

# generate the XPI file
echo "Generating $APP_NAME.xpi..."
zip -r ../../$APP_NAME.xpi * -x build.sh

notify-send "Done!" "Extension Updated"

