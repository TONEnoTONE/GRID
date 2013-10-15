#!/bin/sh
root="../../../"
here=$(pwd)

echo "\n#################################################################"
echo "github stuff"
echo "#################################################################"

git config user.email "deaner@monsterbit.com"
git config user.name "lilshtz"

git fetch
git checkout gh-pages
cp $root/compiled.html $root/index.html
git commit -m "committing from travis!"
git push origin gh-pages 
