/**=============================================================================
 _______  ______    ___   ______  
|       ||    _ |  |   | |      | 
|    ___||   | ||  |   | |  _    |
|   | __ |   |_||_ |   | | | |   |
|   ||  ||    __  ||   | | |_|   |
|   |_| ||   |  | ||   | |       |
|_______||___|  |_||___| |______| 

@license (c) 2014 TONEnoTONE, Yotam Mann, & Chris Deaner
=============================================================================*/

goog.provide("grid");

goog.require("managers.Analytics");
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