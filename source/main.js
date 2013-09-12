/*=============================================================================
 _______  ______    ___   ______  
|       ||    _ |  |   | |      | 
|    ___||   | ||  |   | |  _    |
|   | __ |   |_||_ |   | | | |   |
|   ||  ||    __  ||   | | |_|   |
|   |_| ||   |  | ||   | |       |
|_______||___|  |_||___| |______| 

=============================================================================*/

//require configuration
require.config({
	baseUrl: "./source/",
	paths: {
		// "some": "some/v1.0"
		'underscore' : "dependencies/underscore",
		'const' : "data/Const"
	},
	shim: {
		'underscore': {
			exports: '_'
		}
	}
});

//and so it begins...
require(['dependencies/domReady', 'dependencies/requestAnimationFrame', "game/controllers/TileController"], function (domReady) {
	
	"use strict";
	
	//the application singleton
	var GRID = {
		/** @const */
		version : "0.0.1",
		/** */
		initialize : function(){
			console.log("GRID version "+GRID.version);
			//do initialization stuffs

			//kick off the loop
			GRID.loop();
		},
		/** 
			the loop happens on the animation frame
		*/
		loop : function(){
			//setup the next loop
			requestAnimationFrame(GRID.loop);
		}
	}

	//initialize the application when the dom is ready
	domReady(function () {
		//initialize it
		GRID.initialize();
	});
});

