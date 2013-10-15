#!/bin/sh
root="../../../"
here=$(pwd)

echo "\n#################################################################"
echo "github stuff"
echo "#################################################################"

git config user.email "deaner@monsterbit.com"
git config user.name "lilshtz"

echo "git fetch"
git fetch
echo "git checkout gh-pages"
git checkout gh-pages
echo "cp compiled.html index.html"
cp compiled.html index.html
echo "git commit"
git commit -m "committing from travis!"
echo "git push origin gh-pages"
git push origin gh-pages 