/*=============================================================================
 _______  ______    ___   ______  
|       ||    _ |  |   | |      | 
|    ___||   | ||  |   | |  _    |
|   | __ |   |_||_ |   | | | |   |
|   ||  ||    __  ||   | | |_|   |
|   |_| ||   |  | ||   | |       |
|_______||___|  |_||___| |______| 

=============================================================================*/

goog.provide("grid");

goog.require("game.controllers.GameController");
goog.require("states.AppState");

//the application singleton
var GRID = {
	/** @const */
	version : "0.0.1",
	/** */
	initialize : function(){
		console.log("GRID version "+GRID.version);
	
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

GRID.initialize();