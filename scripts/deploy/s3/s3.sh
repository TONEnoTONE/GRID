#!/bin/sh
s3ScriptDir="./scripts/deploy/s3"
s3Folder="GRID"

cp ${s3ScriptDir}/.s3cfg.tmp $s3ScriptDir.s3cfg
cp ${s3ScriptDir}/index--tonenotone.com--.html ./tmp/www/index.html

# add the keys to the bottom of the s3cfg file.
echo "access_key = ${AWS_S3_KEY}" >> ${s3ScriptDir}/.s3cfg
echo "secret_key = ${AWS_S3_SECRET}" >> ${s3ScriptDir}/.s3cfg

echo "\n########################################"
echo "uploading to tonenotone.com/${s3Folder}/"
echo "########################################"
s3cmd sync --config=${s3ScriptDir}/.s3cfg -Pf tmp/www/ s3://tonenotone.com/${s3Folder}/

rm ${s3ScriptDir}/.s3cfg