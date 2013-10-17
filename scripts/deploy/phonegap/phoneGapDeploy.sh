#!/bin/sh
root="../../../"
here=$(pwd)
phoneGapToken=sdifjze5Xb11xFXV3MnZ

echo "\n#################################################################"
echo "Make temp and www dirs"
echo "#################################################################"
mkdir ./tmp
mkdir ./tmp/www

echo "\n#################################################################"
echo "Copying build files"
echo "#################################################################"
cp ./phoneGap-iphone.html ./tmp/www/
mv ./tmp/www/phoneGap-iphone.html ./tmp/www/index.html
#cp $repo/index.html ./www/
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


echo "\n########################################"
echo "zip it up"
echo "########################################"
cd ./tmp
zip -r GRIDunLOCK.zip www

echo "\n########################################"
echo "uploading zip to phonegap"
echo "########################################"
curl -X PUT -F file=@./GRIDunLOCK.zip https://build.phonegap.com/api/v1/apps/582285?auth_token=$phoneGapToken

echo "\n########################################"
echo "unlock the signing key"
echo "########################################"
curl -X PUT -d 'data={"keys":{"ios":{"id":106206,"password":"grid"}}}' https://build.phonegap.com/api/v1/apps/575351?auth_token=$phoneGapToken


echo "\n removing tmp dir"
cd ../
rm -rf ./tmp
