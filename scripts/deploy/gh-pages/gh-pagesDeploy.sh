#!/bin/sh
root="../../../"
here=$(pwd)

echo "\n#################################################################"
echo "move compiled grid libs to temp local"
echo "#################################################################"
cp ./build/grid.min.js ./build/grid.min.js.temp
cp ./build/grid.js ./build/grid.js.temp

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

echo "git pull"
git pull

echo "git merge master"
git merge master -m "merging master to gh-pages"

echo "\n#################################################################"
echo "move compiled grid libs back / copy over gh-pages index"
echo "#################################################################"
mv ./build/grid.min.js.temp ./build/grid.min.js
mv ./build/grid.js.temp ./build/grid.js
cp compiled.html index.html

echo "git status"
git status

echo "git commit"
git commit -am "committing from travis!"

echo "git push origin gh-pages"
git push origin gh-pages 