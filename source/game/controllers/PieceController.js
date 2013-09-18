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
	*/
	addPiece : function(position){
		var p = new Piece();
		p.setPosition(position);
		PieceController.pieces.push(p);
		return p;
	},
	/** 
		@return {boolean} if there is a collision
	*/
	testCollision : function(){
		return false;
	},
	/** 
		@param {number} step
		@return {boolean} if there is a collision
	*/
	testCollisionAtStep : function(step){
		return true;
	},
	/** 
		clear all the pieces
	*/
	reset : function(){
		PieceController.forEach(function(piece){
			piece.reset();
		})
		//clear the array
		PieceController.pieces = [];
	}
}