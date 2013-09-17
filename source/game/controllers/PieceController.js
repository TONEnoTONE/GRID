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
goog.require("game.controllers.TileController");

var PieceController = {
	/** @private */
	pieces : [],
	/**
		iterator over all the pieces
		@param {function(Piece, number)} callback takes the object and the index
	*/
	forEach : function(callback){
		for (var i = 0, len = PieceController.pieces.length; i < len; i++){
			var piece = PieceController.pieces[i];
			callback(piece, i);
		}
	},
	/** 
		@param {goog.math.Coordinate} position
		@return {Piece | null} return the piece that's at position
	*/
	pieceAt : function(position){
		var retPiece = null;
		PieceController.forEach(function(piece, index){
			if (goog.math.Coordinate.equals(piece.position, position)){
			 	retPiece = piece
			 }
		});
		return retPiece;
	},
	/** 
		@param {goog.math.Coordinate} position
		@return {boolean} returns true if it's an available spot
	*/
	addPiece : function(position){
		var p = new Piece();
		p.setPosition(position);
		PieceController.pieces.push(p);
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
		PieceController.pieces = [];
	}
}