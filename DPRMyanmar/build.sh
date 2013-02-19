APP_NAME=DPRMyanmar

rm ../../$APP_NAME.xpi

# generate the XPI file
echo "Generating $APP_NAME.xpi..."
zip -r ../../$APP_NAME.xpi *

notify-send "Done!" "Extension Updated"

