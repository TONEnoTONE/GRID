#!/bin/sh
s3ScriptDir="./scripts/deploy/s3/"

cp $s3ScriptDir.s3cfg.tmp $s3ScriptDir.s3cfg

echo "blah blah ${AWS_S3_KEY}"
echo "blah blah 2 ${AWS_S3_SECRET}"

echo "access_key = ${AWS_S3_KEY}" >> $s3ScriptDir.s3cfg
echo "secret_key = ${AWS_S3_SECRET}" >> $s3ScriptDir.s3cfg

s3cmd --config=$s3ScriptDir.s3cfg ls

cat $s3ScriptDir.s3cfg

#rm $s3ScriptDir.s3cfg