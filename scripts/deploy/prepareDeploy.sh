#!/bin/sh
root="../../../"
here=$(pwd)

echo "\n#################################################################"
echo "Make temp and www dirs"
echo "#################################################################"
mkdir ./tmp
mkdir ./tmp/www

echo "\n#################################################################"
echo "Copying build files"
echo "#################################################################"
cp -R ./build/ ./tmp/www/build
cp -R ./assets/ ./tmp/www/assets
cp -R ./style/ ./tmp/www/style
cp ./scripts/deploy/phonegap/config.xml ./tmp/www

echo "\n########################################"
echo "Deleting misc files"
echo "########################################"
find ./tmp -iname "*.wav" -delete
find ./tmp -iname "*.scss" -delete
find ./tmp -iname "*.DS_Store" -delete
