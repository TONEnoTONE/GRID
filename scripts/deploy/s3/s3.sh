#!/bin/sh
s3ScriptDir="./scripts/deploy/s3/"

cp $s3ScriptDir.s3cfg.tmp $s3ScriptDir.s3cfg

# add the keys to the bottom of the s3cfg file.
echo "access_key = ${AWS_S3_KEY}" >> $s3ScriptDir.s3cfg
echo "secret_key = ${AWS_S3_SECRET}" >> $s3ScriptDir.s3cfg

s3cmd sync --config=$s3ScriptDir.s3cfg -P tmp/www/ s3://tonenotone.com/GRID/

rm $s3ScriptDir.s3cfg