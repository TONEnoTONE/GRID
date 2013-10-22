#!/bin/bash
s3ScriptDir="./scripts/deploy/s3/"

cp $s3ScriptDir.s3cfg.tmp $s3ScriptDir.s3cfg
cp ./scripts/deploy/s3/index--tonenotone.com--.html ./tmp/www/index.html

# add the keys to the bottom of the s3cfg file.
echo "access_key = ${AWS_S3_KEY}" >> $s3ScriptDir.s3cfg
echo "secret_key = ${AWS_S3_SECRET}" >> $s3ScriptDir.s3cfg

echo "TRAVIS_BRANCH ${TRAVIS_BRANCH}"

if [ ${TRAVIS_BRANCH} == "Toy" ] 
then
	echo "LE TOY"
	product="TOY"
else
	echo "MR MASTER"
	product="GRID"
fi

#s3cmd sync --config=$s3ScriptDir.s3cfg -P tmp/www/ s3://tonenotone.com/${product}/

rm $s3ScriptDir.s3cfg