require.config({
	baseUrl:'../source/',
	paths : {
		"tests" : "../tests",
		"mocha" : "../tests/deps/mocha",
		"chai" : "../tests/deps/chai",
		'underscore' : "dependencies/underscore",
		'const' : "data/Const"
	},
	shim: {
		'mocha': {
			exports: 'mocha'
		},
		'chai': {
			exports: 'chai'
		},
		'underscore': {
			exports: '_'
		}
	}
});

//add the test's file name here to have it run
var testNames = ["unit/tile"];

require(["mocha", "chai"], function(mocha, chai){
	mocha.setup("bdd");
	var testsRun = 0;
	for (var i = 0; i < testNames.length; i++){
		//call up each of the tests
		require(["tests/"+testNames[i]], function(test){
			//push a test onto the array
			test();
			testsRun++;
			//when all the tests have been run
			//do the mocha part
			if (testsRun === testNames.length){
				//add the results to mocha
				if (window.mochaPhantomJS) { 
					mochaPhantomJS.run(); 
				} else { 
					mocha.run(); 
				}
			}
		});
	}
	
});