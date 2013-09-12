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
var testNames = ["tile", "tile2"];

require(["mocha", "chai"], function(mocha, chai, test){
	mocha.setup("bdd");
	var tests = [];
	for (var i = 0; i < testNames.length; i++){
		require(["tests/"+testNames[i]], function(test){
			//pusht the test onto the array
			tests.push(test);
			if (tests.length === testNames.length){
				for (var i = 0; i < testNames.length; i++){
					var t = tests[i];
					//run the test
					t();
				}
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