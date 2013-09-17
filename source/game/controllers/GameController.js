/*=============================================================================
 _______  _______  __   __  _______ 
|       ||   _   ||  |_|  ||       |
|    ___||  |_|  ||       ||    ___|
|   | __ |       ||       ||   |___ 
|   ||  ||       ||       ||    ___|
|   |_| ||   _   || ||_|| ||   |___ 
|_______||__| |__||_|   |_||_______|

=============================================================================*/
//goog.provide("game.controllers.GameController");

//goog.require("game.controllers.PieceController");
//goog.require("game.controllers.TileController");


/** initializer */
var GameController = GameController || {}

GameController.initialize = function(){
	/** @this {GameController} */
	GameController.setStage(0, 0);
}

/** 
	goes to the next level
*/
GameController.nextLevel = function(){

}

/** 
	@param {number} stage
	@param {number=} level
*/
GameController.setStage = function(stage, level){
	level = level||0;
	//setup the map
	//game.controllers.TileController.setStage(stage, level);
}

//run initializer
GameController.initialize();
