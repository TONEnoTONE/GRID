#!/bin/bash

####################################
# make sure we have a build endpoint
####################################
if [ $# == 0 ]
then
	echo "syntax: buildProd [ web | mobile ]"
	exit 2
fi

# get the stuff that cannot be added to a public repo
source ../keys.sh

# move up a directory, and start at the root of the repo
cd ../

#####################################
# How long will this take to execute?
#####################################
before=$(date +%s)

###########################
# Set up Vars
###########################
buildFor=""

###########################
# Preparing for S3 Delivery
###########################
s3ScriptDir="./scripts/deploy/s3"
cp ${s3ScriptDir}/.s3cfg.tmp ${s3ScriptDir}/.s3cfg

# add the keys to the bottom of the s3cfg file.
echo "access_key = ${AWS_S3_KEY}" >> ${s3ScriptDir}/.s3cfg
echo "secret_key = ${AWS_S3_SECRET}" >> ${s3ScriptDir}/.s3cfg

#######################
# What are building for
#######################
if [ $1 == "web" ] 
then
	buildFor="web"
elif [ $1 == "mobile" ]
then
	buildFor="mobile"
else
	echo "syntax: ./buildProduction [ mobile|web ]"
	exit 2
fi
echo ""
echo "#############################"
echo "# Making a build for: $buildFor"
echo "#############################"


######################################################################
# Show the current builds so the person building this has some context
######################################################################
echo "Current build versions deployed on the server:"
s3cmd ls --verbose --config=${s3ScriptDir}/.s3cfg s3://tonenotone.com/EchoReleases/


##########################################################################
# Have the build person input what they what this build to be versioned as
##########################################################################
echo ""
echo "########################"
echo "# Name the build version"
echo "########################"
read -p "What should our build version be? " BUILD_VERSION 
echo "Build version set to: ${BUILD_VERSION}"

#######################
# Lets build it locally
#######################
echo ""
echo "##########"
echo "# Close it"
echo "##########"
cd compiler/
./close.sh
cd ../

# And pack it up nice and tidy for deployment
./scripts/deploy/prepareDeploy.sh

# add the index page to the tmp folder
cp ${s3ScriptDir}/index--tonenotone.com--.html ./tmp/www/index.html


##############################
# Add a tag to github
##############################
echo ""
echo "######################"
echo "# SHOWING GIT BRANCHES"
echo "######################"
git branch

echo ""
read -p "Are we on a release branch? [y] " yn
case $yn in
    [Yy]* ) break;;
    [Nn]* ) exit;;
    * ) echo "We Are! Horray for us! Hoo Hoo";;
esac


###################################################
# Do the right thing for the specified build target
###################################################
echo ""
echo "##############################"
if [ $buildFor == "web" ] 
then
	echo "# Synching to s3"
	echo "##############################"
	s3cmd sync --verbose --config=${s3ScriptDir}/.s3cfg -Pf tmp/www/ s3://tonenotone.com/EchoReleases/${BUILD_VERSION}/
elif [ $buildFor == "mobile" ]
then
	#./scripts/deploy/phonegap/phoneGapDeploy.sh
	echo "Not yet"
	echo "##############################"
fi


##############################
# Change the index page
##############################
echo ""
echo "######################################"
echo "# Get / Change / and upload index file"
echo "######################################"
# get the current index file
#s3cmd get -f --verbose --config=${s3ScriptDir}/.s3cfg s3://tonenotone.com/ECHO/index.html indexTmp.html

# regex
#findStr='<iframe src=\".*\"><\/iframe>'
#replaceStr="<iframe src=\"http:\/\/tonenotone.com\/EchoReleases\/${BUILD_VERSION}\/index.html\"><\/iframe>"

# change the iframe loc
#cat indexTmp.html | sed "s/${findStr}/${replaceStr}/g" > indexTmpChanged.html

# upload the current index file
# s3cmd sync --verbose --config=${s3ScriptDir}/.s3cfg -Pf indexTmpChanged.html s3://tonenotone.com/ECHO/index.html

# upload the new version file to the webserver
# var releaseVersion = "1.0.4w";
echo "var releaseVersion = \"${BUILD_VERSION}\";" > EchoInformation.js
s3cmd sync --verbose --config=${s3ScriptDir}/.s3cfg -Pf EchoInformation.js s3://tonenotone.com/ECHO/EchoInformation.js

#############
# Git Tagging
#############
echo ""
echo "##############################"
echo "# Making tag in git: ${BUILD_VERSION}"
echo "##############################"
git tag -a ${BUILD_VERSION} -m 'Auto tagging production build for {$buildFor}'
git push --tags


#######
# Clean
#######
echo ""
echo "#############"
echo "# CLEANING UP"
echo "#############"
rm -rf tmp/
rm  indexTmp.html
rm  indexTmpChanged.html
rm ${s3ScriptDir}/.s3cfg


############
# Total Time
############
after=$(date +%s)
elapsed_seconds=$(( ${after}-${before} ))
echo "Total time: $elapsed_seconds seconds"
