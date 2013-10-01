#!/bin/sh

repo="../../GRID/GRID"
here=$(pwd)

echo "########################################"
echo "Pulling the latest from git"
echo "########################################"
cd $repo
git pull
cd $here

echo "\n#################################################################"
echo "Copying build files over from the working copy: $repo"
echo "#################################################################"
cp $repo/index.html ./www/
cp -R $repo/build/ ./www/build
cp -R $repo/assets/ ./www/assets
cp -R $repo/style/ ./www/style

echo "\n########################################"
echo "Deleting wav files"
echo "########################################"
find . -iname "*.wav" -delete

echo "\n########################################"
echo "zip it up"
echo "########################################"
zip -r GRIDunLOCK.zip www

#echo "\n########################################"
#echo "Run emulator and check work"
#echo "########################################"
#phonegap -V run ios

echo "\n########################################"
echo "get token from phonegap"
echo "########################################"
jsonToken=$(curl -u deaner@monsterbit.com -X POST -d "" https://build.phonegap.com/token)
token=$(echo $jsonToken | jsawk 'return this.token')
echo $token

echo "\n########################################"
echo "uploading zip to phonegap"
echo "########################################"
curl -X PUT -F file=@./GRIDunLOCK.zip https://build.phonegap.com/api/v1/apps/575351?auth_token=$token

echo "\n########################################"
echo "unlock the signing key"
echo "########################################"
curl -X PUT -d 'data={"keys":{"ios":{"id":101341,"password":"grid"}}}' https://build.phonegap.com/api/v1/apps/575351?auth_token=$token
