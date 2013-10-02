#!/bin/bash          
echo "making one file"
cd ../source/
python dependencies/closure-library/closure/bin/build/closurebuilder.py --root=./ --input=grid.js   --output_mode=script  --output_file=../build/grid.js 
echo "building and minifying"
python ../source/dependencies/closure-library/closure/bin/build/closurebuilder.py --root=../source/ --input=grid.js   --output_mode=compiled  --output_file=../build/grid.min.js \
--compiler_jar=../compiler/closure/compiler.jar \
--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" \
--compiler_flags="--language_in=ECMASCRIPT5"  \
--compiler_flags="--externs=../compiler/externs/w3c_audio.js"  \
--compiler_flags="--externs=../compiler/externs/window.js"  \
--compiler_flags="--externs=../compiler/externs/statemachine.js"  \
--compiler_flags="--jscomp_off=externsValidation" \
--compiler_flags="--output_wrapper=\"(function() {%output%})();\"" \
--compiler_flags="--jscomp_error=accessControls" \
--compiler_flags="--jscomp_error=const" \
--compiler_flags="--jscomp_error=constantProperty" \
--compiler_flags="--warning_level=VERBOSE" \
--compiler_flags="--define='CONFIG.PLATFORM=\"iphone\"'"


# echo "compiling grid.js"
# cd ../compiler/
# # java -jar ./closure/compiler.jar --language_in=ECMASCRIPT5  \
# java -jar ../source/dependencies/closure-library/closure/compiler.jar --language_in=ECMASCRIPT5  \
# --compilation_level=ADVANCED_OPTIMIZATIONS \
# --js=../source/grid.js --js_output_file=../build/grid.min.js \
# --externs=./externs/w3c_audio.js \
# --externs=./externs/window.js \
# --externs=./externs/statemachine.js \
# --jscomp_off=externsValidation \
# 
# --output_wrapper="(function() {%output%})();"


# --externs=./externs/underscore.js \
# --externs=./externs/grid_extern.js \
# --jscomp_warning=checkTypes
# --warning_level=VERBOSE
#  --externs=./externs/underscore.js \
# another way
# java -classpath ./js.jar:./compiler.jar org.mozilla.javascript.tools.shell.Main r.js -o grid.build.js

# echo "compiling grid.js"
# java -jar compiler.jar --language_in=ECMASCRIPT5  \
# --compilation_level=ADVANCED_OPTIMIZATIONS \
# --process_common_js_modules --transform_amd_modules --common_js_entry_module=../source/grid.js \
# --js=../build/grid.js --js_output_file=../build/grid.min.js \
# --externs=./externs/w3c_audio.js \
# --externs=./externs/grid_extern.js \
# --jscomp_off=externsValidation \
# --jscomp_error=accessControls --jscomp_error=const --jscomp_error=constantProperty \
# --jscomp_warning=checkVars --jscomp_warning=visibility --jscomp_warning=checkTypes

#testing
# echo "running phantom tests"
# cd ../tests/
# ./test.sh