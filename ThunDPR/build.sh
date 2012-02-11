APP_NAME=thunDPR

# generate the XPI file
echo "Generating $APP_NAME.xpi..."
zip -r ../../$APP_NAME.xpi *

notify-send "Done!" "Extension Updated"

