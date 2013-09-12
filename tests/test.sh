#!/bin/bash          
echo "running tests"
#runs all the test in teh current dir
mocha $(find ./ -name '*.js')