#!/bin/bash          
echo "making one file"
#cat  ../src/core/*.js ../src/components/*.js > ../build/grid.js
r.js -o grid.build.js

#combine with almond
echo "combine with almond"
cat  ../build/grid.js ../source/dependencies/almond.js > ../build/grid.almond.js

echo "compiling grid.js"
java -jar compiler.jar --language_in=ECMASCRIPT5  \
--compilation_level=ADVANCED_OPTIMIZATIONS \
--js=../source/dependencies/almond.js \
--js=../build/grid.js --js_output_file=../build/grid.min.js \
--externs=./externs/w3c_audio.js \
--externs=./externs/grid_extern.js \
--jscomp_off=externsValidation \
--jscomp_error=accessControls --jscomp_error=const --jscomp_error=constantProperty \
--jscomp_warning=checkVars --jscomp_warning=visibility --jscomp_warning=checkTypes
# --jscomp_warning=checkTypes
# --warning_level=VERBOSE
#  --externs=./externs/underscore.js \
# another way
# java -classpath ./js.jar:./compiler.jar org.mozilla.javascript.tools.shell.Main r.js -o grid.build.js

#testing
# echo "running phantom tests"
# cd ../tests/
# ./test.sh