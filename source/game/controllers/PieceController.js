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
goog.require("goog.math.Coordinate");

game.controllers.PieceController = {
	/** @private */
	pieces : [],
	/**
		iterator over all the pieces
		@param {function(game.models.Piece, number)} callback takes the object and the index
	*/
	forEach : function(callback){
		for (var i = 0, len = game.controllers.PieceController.pieces.length; i < len; i++){
			var piece = game.controllers.PieceController.pieces[i];
			callback(piece, i);
		}
	},
	/** 
		@param {goog.math.Coordinate} position
		@return {game.models.Piece | null} return the piece that's at position
	*/
	pieceAt : function(position){
		var retPiece = null;
		game.controllers.PieceController.forEach(function(piece, index){
			// if (_.isEqual(piece.position, position)){
			// 	retPiece = piece
			// }
		});
		return retPiece;
	},
	/** 
		@param {goog.math.Coordinate} position
		@return {boolean} returns true if it's an available spot
	*/
	addPiece : function(position){
		var p = new game.models.Piece();
		p.setPosition(position);
		game.controllers.PieceController.pieces.push(p);
	},
	/** 
		computes the path of the piece
	*/
	computePath : function(piece){
		
	},
	/** 
		@return {boolean} if there is a collision
	*/
	testCollision : function(){
		return false;
	},
	/** 
		clear all the pieces
	*/
	reset : function(){
		//clear the array
		game.controllers.PieceController.pieces = [];
	}

};