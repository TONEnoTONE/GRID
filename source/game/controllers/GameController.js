/*=============================================================================
 _______  _______  __   __  _______ 
|       ||   _   ||  |_|  ||       |
|    ___||  |_|  ||       ||    ___|
|   | __ |       ||       ||   |___ 
|   ||  ||       ||       ||    ___|
|   |_| ||   _   || ||_|| ||   |___ 
|_______||__| |__||_|   |_||_______|

=============================================================================*/
goog.provide("game.controllers.GameController");

goog.require("game.controllers.PieceController");
goog.require("game.controllers.TileController");
goog.require("data.Const");


/** initializer */
var GameController = {
	initialize : function(){
		/** @this {GameController} */
		GameController.setStage(0, 0);
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
		TileController.setStage(stage, level);
	}
}

GameController.initialize();
