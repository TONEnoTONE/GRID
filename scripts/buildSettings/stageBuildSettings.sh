 #!/bin/bash

###### BUILD SETTINGS ######
# What the app spits out on the bottom, also informs folder structure on prod web builds
export BUILD_VERSION="Staging"
# Apple identifier
export APP_ID="com.tonenotone.echoV1Staging"
# App id for phone gap. 
export PG_APP_ID=785295
# App name for phone gap. 
export PG_APP_NAME="EchoStaging"
# s3 folder
export S3_Folder_Destination="EchoStaging"
# Google Analytics ID
export GA_ID="UA-47760090-2"
