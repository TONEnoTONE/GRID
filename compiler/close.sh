#!/bin/bash          
echo "making one file"
#cat  ../src/core/*.js ../src/components/*.js > ../build/grid.js
r.js -o grid.build.js
echo "compiling grid.js"
java -jar compiler.jar --language_in=ECMASCRIPT5  \
--compilation_level=ADVANCED_OPTIMIZATIONS \
--js=../build/grid.js --js_output_file=../build/grid.min.js \
--externs=./externs/w3c_audio.js --externs=./externs/underscore.js --externs=../source/dependencies/require.js \
--jscomp_off=externsValidation \
--jscomp_error=accessControls --jscomp_error=const
# --jscomp_off=checkVars 
# --warning_level=VERBOSE \
# another way
# java -classpath ./js.jar:./compiler.jar org.mozilla.javascript.tools.shell.Main r.js -o grid.build.js
