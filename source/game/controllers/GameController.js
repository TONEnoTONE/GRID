/*=============================================================================
 _______  _______  __   __  _______ 
|       ||   _   ||  |_|  ||       |
|    ___||  |_|  ||       ||    ___|
|   | __ |       ||       ||   |___ 
|   ||  ||       ||       ||    ___|
|   |_| ||   _   || ||_|| ||   |___ 
|_______||__| |__||_|   |_||_______|

=============================================================================*/


define(["underscore", "appState/GameState","game/controllers/TileController"], function(){

	var _ = require("underscore");
	var State = require("appState/GameState");
	var Tiles = require("game/controllers/TileController");

	var GAME = {
		/** initializer */
		initialize : function(){
			GAME.setStage(0, 0);
		},
		/** 
			goes to the next level
		*/
		nextLevel : function(){

		},
		/** 
			@param {number} stage
			@param {number=} level
		*/
		setStage : function(stage, level){
			level = level||0;
			//setup the map
			Tiles.setStage(stage, level);
		}
	}

	//run initializer
	GAME.initialize();

	return GAME;
});