#!/bin/sh

# move up a directory, and start at the root of the repo
cd ../

# get the stuff that cannot be added to a public repo
source ./keys.sh

#### 
#### MODIFY THESE VALUES ACCORDING TO WHAT YOU ARE TRYING TO DO
#### Values are "staging", "dev", or "production"
####
export BUILD_ENV="production"
export POST_TO_PHONEGAP=false;

cd compiler/
./close.sh
cd ../

source ./scripts/deploy/prepareDeploy.sh
source ./scripts/deploy/phonegap/phoneGapDeploy.sh
#source ./scripts/deploy/s3/s3.sh
