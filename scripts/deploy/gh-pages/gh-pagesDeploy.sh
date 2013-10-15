#!/bin/sh
root="../../../"
here=$(pwd)

echo "\n#################################################################"
echo "github stuff"
echo "#################################################################"

git config user.email "deaner@monsterbit.com"
git config user.name "lilshtz"

echo "git remote set-url --push origin https://github.com/TONEnoTONE/GRID.git"
git remote set-url --push origin https://github.com/TONEnoTONE/GRID.git

echo "git remote set-branches --add origin gh-pages"
git remote set-branches --add origin gh-pages

echo "git fetch -v"
git fetch -v

echo "git checkout gh-pages"
git checkout gh-pages

echo "git merge master"
git merge master

echo "cp compiled.html index.html"
cp compiled.html index.html

echo "git commit"
git commit -a -m "committing from travis!"

echo "git push origin gh-pages"
git push origin gh-pages 