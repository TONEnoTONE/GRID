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
goog.require("managers.AppState");

//the application singleton
var GRID = {
	/** @const */
	version : "0.0.1",
	/** */
	initialize : function(){
		console.log("GRID version "+GRID.version);
	
		// start the application
		AppState.fsm.start();
	},
};

GRID.initialize();