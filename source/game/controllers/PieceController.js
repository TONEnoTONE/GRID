/*=============================================================================
 _______  ___   _______  _______  _______  _______ 
|       ||   | |       ||       ||       ||       |
|    _  ||   | |    ___||       ||    ___||  _____|
|   |_| ||   | |   |___ |       ||   |___ | |_____ 
|    ___||   | |    ___||      _||    ___||_____  |
|   |    |   | |   |___ |     |_ |   |___  _____| |
|___|    |___| |_______||_______||_______||_______|

The piece controller. 
collision detection between pieces
=============================================================================*/

goog.provide("game.controllers.PieceController");

goog.require("game.models.Piece");
goog.require("game.controllers.TileController");

game.controllers.PieceController = {
	/** @private */
	pieces : [],
	/**
		map a function onto each piece
		@param {function(game.models.Piece, number)} callback takes the object and the index
	*/
	forEach : function(callback){
		for (var i = 0, len = game.controllers.PieceController.pieces.length; i < len; i++){
			var piece = game.controllers.PieceController.pieces[i];
			callback(piece, i);
		}
	},
	/** 
		@param {game.models.Piece} piece
		move a piece forward checking for collisions
	*/
	movePiece : function(piece){
		
	},
	step : function(){
		game.controllers.PieceController.forEach(function(piece, index){
			
		});
	},
	/** 
		@param {Object} position
		@return {game.models.Piece | null} return the piece that's at position
	*/
	pieceAt : function(position){
		var retPiece = null;
		game.controllers.PieceController.forEach(function(piece, index){
			if (_.isEqual(piece.position, position)){
				retPiece = piece
			}
		});
		return retPiece;
	},
	/** 
		@param {Object} position
		@return {boolean} returns true if it's an available spot
	*/
	placePiece : function(piece, position){

	},
	/**
		
	*/
	solvable : function(){

	},
	reset : function(){

	}

};