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

goog.require("managers.AppState");
goog.require("managers.Debug");

//the application singleton
var GRID = {
	/** */
	initialize : function(){
		// start the application
		AppState.start();
	},
};

GRID.initialize();