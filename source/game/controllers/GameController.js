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
goog.require("goog.math.Coordinate");
goog.require("data.Const");

/** 
	@typedef {Object}
*/
var GameController = {
	/** initializer */
	initialize : function(){
		GameController.setStage(0, 0);
	},
	/** 
		@param {number} stage
		@param {number=} level
	*/
	setStage : function(stage, level){
		level = level||0;
		//setup the map
		TileController.setStage(stage, level);
	},
	/** 
		@param {goog.math.Coordinate} position
		@return {boolean} if the piece is valid and available
	*/
	availablePiece : function(position){
		//test if that's a valid tile && does not already have a piece there
		if (TileController.tileAt(position).state !== CONST.TILE.INACTIVE 
			&& PieceController.pieceAt(position) !== null){
			return true;
		} else {
			return false;
		}
	},
	/** 
		@param {goog.math.Coordinate} position
	*/
	addPiece : function(position){
		var piece = PieceController.addPiece(position);
		//compute the path
	},
	/** 
		computes the pieces path
		@param {Piece} piece
	*/
	computePiecePath : function(piece){
		//exit when the path loops
		//i.e. when the piece's path[0] && direction[0] == path[end] && direction[end]
	}
}

GameController.initialize();
