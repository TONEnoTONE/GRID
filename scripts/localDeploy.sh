#!/bin/sh

# move up a directory, and start at the root of the repo
cd ../

# get the stuff that cannot be added to a public repo
source ./keys.sh

BUILD_VERSION="localDeploy"

#### 
#### MODIFY THESE VALUES ACCORDING TO WHAT YOU ARE TRYING TO DO
####
export s3Folder="EchoStaging"

cd compiler/
./close.sh
cd ../

./scripts/deploy/prepareDeploy.sh
./scripts/deploy/phonegap/phoneGapDeploy.sh
#./scripts/deploy/s3/s3.sh
