#!/bin/sh
phoneGapToken=${PHONEGAP_TOKEN}
phonegapScriptDir="./scripts/deploy/phonegap"

cp ./scripts/deploy/phonegap/index--PG_iphone--.html ./tmp/www/index.html

# regex
findAppIdStr='--APP_ID--'
replaceAppIdStr="${APP_ID}"

findAppVersionStr='--APP_VERSION--'
replaceAppVersionStr="${BUILD_VERSION}"

findPgAppNameStr='--PG_APP_NAME--'
replacePgAppNameStr="${PG_APP_NAME}"

# change the iframe loc
cat ${phonegapScriptDir}/configTemplate.xml | sed "s/${findAppIdStr}/${replaceAppIdStr}/g" | sed "s/${findAppVersionStr}/${replaceAppVersionStr}/g" | sed "s/${findPgAppNameStr}/${replacePgAppNameStr}/g" > ./tmp/www/config.xml


echo "\n########################################"
echo "zip it up"
echo "########################################"
cd ./tmp
zip -r GRIDunLOCK.zip www

echo "\n########################################"
echo "uploading zip to phonegap"
echo "########################################"
curl -X PUT -F file=@./GRIDunLOCK.zip https://build.phonegap.com/api/v1/apps/${PG_ECHO_STAGING}?auth_token=$phoneGapToken

echo "\n########################################"
echo "unlock the signing key"
echo "########################################"
#curl -X PUT -d 'data={"keys":{"ios":{"id":110067,"password":"grid"}}}' https://build.phonegap.com/api/v1/apps/619681?auth_token=$phoneGapToken
#curl -X PUT -d 'data={"keys":{"ios":{"id":110067,"password":"grid"}}}' https://build.phonegap.com/api/v1/apps/708557?auth_token=$phoneGapToken

cd ../