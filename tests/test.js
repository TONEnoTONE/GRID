require.config({
	baseUrl:'../source/',
	paths : {
		"tests" : "../tests",
		"mocha" : "../tests/deps/mocha",
		"chai" : "../tests/deps/chai",
	},
	shim: {
		'mocha': {
			exports: 'mocha'
		},
		'chai': {
			exports: 'chai'
		}
	}
});

require(["mocha", "chai", 'tests/tile'], function(mocha, chai, test){
	mocha.setup("bdd");
	test(); 
	if (window.mochaPhantomJS) { 
		mochaPhantomJS.run(); 
	} else { mocha.run(); }
});