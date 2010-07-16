#!/bin/bash
# build.sh -- builds JAR and XPI files for mozilla extensions
#   by Nickolay Ponomarev <asqueella@gmail.com>
#   (original version based on Nathan Yergler's build script)
# Most recent version is at <http://kb.mozillazine.org/Bash_build_script>

# This script assumes the following directory structure:
# ./
#   chrome.manifest (optional - for newer extensions)
#   install.rdf
#   (other files listed in $ROOT_FILES)
#
#   content/    |
#   locale/     |} these can be named arbitrary and listed in $CHROME_PROVIDERS
#   skin/       |
#
#   defaults/   |
#   components/ |} these must be listed in $ROOT_DIRS in order to be packaged
#   ...         |
#
# It uses a temporary directory ./build when building; don't use that!
# Script's output is:
# ./$APP_NAME.xpi
# ./$APP_NAME.jar  (only if $KEEP_JAR=1)
# ./files -- the list of packaged files
#
# Note: It modifies chrome.manifest when packaging so that it points to 
#       chrome/$APP_NAME.jar!/*

#
# default configuration file is ./config_build.sh, unless another file is 
# specified in command-line. Available config variables:
APP_NAME=          # short-name, jar and xpi files name. Must be lowercase with no spaces
CHROME_PROVIDERS=  # which chrome providers we have (space-separated list)
CLEAN_UP=          # delete the jar / "files" when done?       (1/0)
ROOT_FILES=        # put these files in root of xpi (space separated list of leaf filenames)
ROOT_DIRS=         # ...and these directories       (space separated list)
BEFORE_BUILD=      # run this before building       (bash command)
AFTER_BUILD=       # ...and this after the build    (bash command)
oldv=`cat version`
rdfv=`gdialog --title "Version Number" --inputbox "Enter Version Number (Currently $oldv)" 300 450 2>&1`
if [[ $rdfv = "" ]]
then
echo "No input, exiting."
exit 0
fi
xhtmlu=`gdialog --title "Update Notes" --inputbox "Enter Update Notes" 300 450 2>&1`

echo $rdfv > version

echo '<?xml version="1.0" encoding="UTF-8"?>
<RDF xmlns="http://www.w3.org/1999/02/22-rdf-syntax-ns#" 
 xmlns:em="http://www.mozilla.org/2004/em-rdf#">
  <Description about="urn:mozilla:install-manifest">
    <em:id>digitalpalireader@noah.yuttadhammo</em:id>
    <em:name>Digital Pali Reader</em:name>
    <em:version>'$rdfv'</em:version>
    <em:creator>Noah Yuttadhammo</em:creator>
    <em:description>Tool for reading the Pali Canon and commentaries using dictionary lookup and automatic word recognition.</em:description>
    <em:homepageURL>http://www.sourceforge.net/projects/digitalpali</em:homepageURL>
    <em:optionsURL>chrome://digitalpalireader/content/options.xul</em:optionsURL>
    <em:updateURL>https://gaea.site5.com/~sirimang/pali/digitalpalireader.rdf</em:updateURL>
    <em:targetApplication>
      <Description>
        <em:id>{ec8030f7-c20a-464f-9b0e-13a3a9e97384}</em:id> <!-- firefox -->
        <em:minVersion>1.5</em:minVersion>
        <em:maxVersion>4.*</em:maxVersion>
      </Description>
    </em:targetApplication>
  </Description>
</RDF>' > install.rdf

if [ -z $1 ]; then
  . ./config_build.sh
else
  . $1
fi

if [ -z $APP_NAME ]; then
  echo "You need to create build config file first!"
  echo "Read comments at the beginning of this script for more info."
  exit;
fi

ROOT_DIR=`pwd`
TMP_DIR=build

#uncomment to debug
#set -x

# remove any left-over files from previous build
rm -f $APP_NAME.jar $APP_NAME.xpi files
rm -rf $TMP_DIR

$BEFORE_BUILD

mkdir --parents --verbose $TMP_DIR/chrome

# generate the JAR file, excluding CVS and temporary files
JAR_FILE=$TMP_DIR/chrome/$APP_NAME.jar
echo "Generating $JAR_FILE..."
for CHROME_SUBDIR in $CHROME_PROVIDERS; do
  find $CHROME_SUBDIR -path '*CVS*' -prune -o -type f -print | grep -v \~ >> files
done

zip -0 -r $JAR_FILE `cat files`
# The following statement should be used instead if you don't wish to use the JAR file
#cp --verbose --parents `cat files` $TMP_DIR/chrome

# prepare components and defaults
echo "Copying various files to $TMP_DIR folder..."
for DIR in $ROOT_DIRS; do
  mkdir $TMP_DIR/$DIR
  FILES="`find $DIR -path '*CVS*' -prune -o -type f -print | grep -v \~`"
  echo $FILES >> files
  cp --verbose --parents $FILES $TMP_DIR
done

# Copy other files to the root of future XPI.
for ROOT_FILE in $ROOT_FILES install.rdf chrome.manifest; do
  cp --verbose $ROOT_FILE $TMP_DIR
  if [ -f $ROOT_FILE ]; then
    echo $ROOT_FILE >> files
  fi
done

cd $TMP_DIR

if [ -f "chrome.manifest" ]; then
  echo "Preprocessing chrome.manifest..."
  # You think this is scary?
  #s/^(content\s+\S*\s+)(\S*\/)$/\1jar:chrome\/$APP_NAME\.jar!\/\2/
  #s/^(skin|locale)(\s+\S*\s+\S*\s+)(.*\/)$/\1\2jar:chrome\/$APP_NAME\.jar!\/\3/
  #
  # Then try this! (Same, but with characters escaped for bash :)
  sed -i -r s/^\(content\\s+\\S*\\s+\)\(\\S*\\/\)$/\\1jar:chrome\\/$APP_NAME\\.jar!\\/\\2/ chrome.manifest
  sed -i -r s/^\(skin\|locale\)\(\\s+\\S*\\s+\\S*\\s+\)\(.*\\/\)$/\\1\\2jar:chrome\\/$APP_NAME\\.jar!\\/\\3/ chrome.manifest

  # (it simply adds jar:chrome/whatever.jar!/ at appropriate positions of chrome.manifest)
fi

# generate the XPI file
echo "Generating $APP_NAME.xpi..."
zip -r ../$APP_NAME.xpi *

cd "$ROOT_DIR"

echo "Cleanup..."
if [ $CLEAN_UP = 0 ]; then
  # save the jar file
  mv $TMP_DIR/chrome/$APP_NAME.jar .
else
  rm ./files
fi

# remove the working files
rm -rf $TMP_DIR

echo "Sending files..."

echo '<?xml version="1.0" encoding="UTF-8"?>

<RDF:RDF xmlns:RDF="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:em="http://www.mozilla.org/2004/em-rdf#">
  <RDF:Description about="urn:mozilla:extension:digitalpalireader@noah.yuttadhammo">
    <em:updates>
      <RDF:Seq>
        <RDF:li>
          <RDF:Description>
            <em:version>'$rdfv'</em:version>
            <em:targetApplication>
              <RDF:Description>
                <em:id>{ec8030f7-c20a-464f-9b0e-13a3a9e97384}</em:id>
                <em:minVersion>1.5</em:minVersion>
                <em:maxVersion>4.*</em:maxVersion>
                <em:updateLink>https://gaea.site5.com/~sirimang/pali/digitalpalireader.xpi</em:updateLink>
                <em:updateInfoURL>https://gaea.site5.com/~sirimang/pali/digitalpalireader.xhtml</em:updateInfoURL>
              </RDF:Description>
            </em:targetApplication>
          </RDF:Description>
        </RDF:li>
      </RDF:Seq>
    </em:updates>
  </RDF:Description>
</RDF:RDF>' > digitalpalireader.rdf

echo "$xhtmlu" > digitalpalireader.xhtml
cp digitalpalireader.xpi /home/noah/Desktop/Dhamma/DPRArchives/dpr$rdfv.xpi
scp digitalpalireader.xpi sirimang@sirimangalo.org:www/pali/
scp digitalpalireader.rdf sirimang@sirimangalo.org:www/pali/
scp digitalpalireader.xhtml sirimang@sirimangalo.org:www/pali/

zenity --title "Done!" --info --text="Extension Updated" 200 100

$AFTER_BUILD
