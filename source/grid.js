/*=============================================================================
 _______  ______    ___   ______  
|       ||    _ |  |   | |      | 
|    ___||   | ||  |   | |  _    |
|   | __ |   |_||_ |   | | | |   |
|   ||  ||    __  ||   | | |_|   |
|   |_| ||   |  | ||   | |       |
|_______||___|  |_||___| |______| 

=============================================================================*/

goog.provide("GRID");

goog.require("game.controllers.GameController");

//the application singleton
GRID = {
	/** @const */
	version : "0.0.1",
	/** */
	initialize : function(){
		/** @suppress {checkVars} */
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

GRID.initialize();