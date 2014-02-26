#!/bin/sh
root="../../../"
here=$(pwd)

echo "BUILD_ENV: ${BUILD_ENV}"

if [ ${BUILD_ENV} == "v1" ] 
then
	source ./scripts/buildSettings/stageBuildSettings.sh
elif [ ${BUILD_ENV} == "staging" ]
then
	source ./scripts/buildSettings/stageBuildSettings.sh
else
	source ./scripts/buildSettings/devBuildSettings.sh
fi

echo "\n#################################################################"
echo "# Make temp and www dirs"
echo "#################################################################"
mkdir ./tmp
mkdir ./tmp/www

echo "\n#################################################################"
echo "# Copying build files"
echo "#################################################################"
cp -R ./build/ ./tmp/www/build
cp -R ./assets/ ./tmp/www/assets
cp -R ./style/ ./tmp/www/style
cp ./scripts/deploy/phonegap/config.xml ./tmp/www
cp ./assets/images/gameIcon/icon.png ./tmp/www/icon.png
cp ./assets/images/splash/splash.png ./tmp/www/splash.png

echo "\n########################################"
echo "# Deleting misc files"
echo "########################################"
find ./tmp -iname "*.wav" -delete
find ./tmp -iname "*.scss" -delete
find ./tmp -iname "*.DS_Store" -delete

echo "\n########################################"
echo "# Writing Version File"
echo "########################################"
version="\"version\":\"${BUILD_VERSION}\"";
build="\"build\":\"${TRAVIS_BUILD_NUMBER}\"";
commithash="\"commithash\":\"${TRAVIS_COMMIT}\"";
googleAnalyticsId="\"googleAnalyticsId\":\"${GA_ID}\"";

buildSettings="{${version},${build},${commithash},${googleAnalyticsId}}" 

echo ${buildSettings} > ./tmp/www/build/version.json
cat ./tmp/www/build/version.json