#!/bin/bash


#@usage
#compile-js $command $output $input
#compile-js build ../html/assets/js/build/xylo.app.min.js *
#compile-js list manifest.txt
#compile-js build ../html/assets/js/build/xylo.app.min.js manifest.txt
#compile-js rebuild ../html/assets/js/build/xylo.app.min.js manifest.txt
#compile-js build ../html/assets/js/build/xylo.app.min.js booter.js xylo.js service.js

command=$1
output=$2
files=''
list=''
stale=false
compiler=./closure/compiler.jar

if test -z "$command"
then
    echo "Please specify a command."
fi


if [ "$command" == "list" ]
then
    for f in $3*.js
    do
        list=$list$f'\n'
        echo -e "$f"
    done
    echo -e $list > $output
fi

if [ "$command" == "rebuild" ]
then
    command="build"
    stale=true
fi

if [ "$command" == "build" ]
then
for f in "$@"
do
    if [ "$f" != "$1" ] && [ "$f" != "$2" ] && [[ $f == *.du ]] && [[  $f != *"#"*  ]]
    then
       # echo $f
        files=$files$f' '
    fi
done

if test -z "$files"
then
    files=`cat $3`
    if test $3 -nt $output
    then
    echo $3' is newer then '$output
    stale=true
    fi
fi


for f in $files ; do
    # skip commented lines
    if [[  $f != "#"*  ]]
    then
        list=$list'--js '$f' '
        if test $f -nt $output
        then
        echo $f' is newer then '$output
        stale=true
        fi
    fi

done

#echo -e $files

# closure help
# java -jar compiler.jar -h
# --compilation_level WHITESPACE_ONLY SIMPLE_OPTIMIZATIONS ADVANCED_OPTIMIZATIONS
# --externs ../src/js/angular/angular.min.js ../src/js/angular/angular-resource.min.js
if $stale ; then
echo "Compiling $output: "
java -jar $compiler $list \
--js_output_file $output \
--language_in=ECMASCRIPT5  \
--compilation_level=ADVANCED_OPTIMIZATIONS \
--externs=./externs/w3c_audio.js \
--externs=./externs/window.js \
--externs=./externs/statemachine.js \
--jscomp_off=externsValidation \
--jscomp_error=accessControls --jscomp_error=const --jscomp_error=constantProperty \
--jscomp_warning=checkVars --jscomp_warning=visibility --jscomp_warning=checkTypes \
--output_wrapper="(function() {%output%})();"

echo "completed $output."
else
echo "No new files to compile."
fi


fi