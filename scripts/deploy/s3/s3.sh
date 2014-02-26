#!/bin/sh
s3ScriptDir="./scripts/deploy/s3"

cp ${s3ScriptDir}/.s3cfg.tmp $s3ScriptDir.s3cfg
cp ${s3ScriptDir}/index--tonenotone.com--.html ./tmp/www/index.html

# add the keys to the bottom of the s3cfg file.
echo "access_key = ${AWS_S3_KEY}" >> ${s3ScriptDir}/.s3cfg
echo "secret_key = ${AWS_S3_SECRET}" >> ${s3ScriptDir}/.s3cfg

echo "\n########################################"
echo "uploading to tonenotone.com/${S3_Folder_Destination}/"
echo "########################################"
s3cmd sync --config=${s3ScriptDir}/.s3cfg -Pf tmp/www/ s3://tonenotone.com/${S3_Folder_Destination}/

rm ${s3ScriptDir}/.s3cfg