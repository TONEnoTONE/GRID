#!/bin/sh
root="../../../"
here=$(pwd)

echo "\n#################################################################"
echo "github stuff"
echo "#################################################################"

git checkout gh-pages
cp $root/compiled.html $root/index.html
git commit -m "committing from travis!"
git push origin gh-pages 
