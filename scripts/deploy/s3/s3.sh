#!/bin/sh
s3ScriptDir="./scripts/deploy/s3/"

cp $s3ScriptDir.s3cfg.tmp $s3ScriptDir.s3cfg

echo "access_key = ${AWS_S3_KEY}" >> $s3ScriptDir.s3cfg
echo "secret_key = ${AWS_S3_SECRET}" >> $s3ScriptDir.s3cfg

cat $s3ScriptDir.s3cfg

s3cmd --config=$s3ScriptDir.s3cfg ls


rm $s3ScriptDir.s3cfg