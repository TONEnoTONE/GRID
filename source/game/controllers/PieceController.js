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

goog.scope(function(){

	var PieceController = game.controllers.PieceController;
	var Piece = game.models.Piece;

	/** @private */
	PieceController.pieces = [];
	/**
		iterator over all the pieces
		@param {function(game.models.Piece, number)} callback takes the object and the index
	*/
	PieceController.forEach = function(callback){
		for (var i = 0, len = PieceController.pieces.length; i < len; i++){
			var piece = PieceController.pieces[i];
			callback(piece, i);
		}
	}
	/** 
		@param {goog.math.Coordinate} position
		@return {game.models.Piece | null} return the piece that's at position
	*/
	PieceController.pieceAt = function(position){
		var retPiece = null;
		PieceController.forEach(function(piece, index){
			if (goog.math.Coordinate(piece.position, position)){
			 	retPiece = piece
			 }
		});
		return retPiece;
	}
	/** 
		@param {goog.math.Coordinate} position
		@return {boolean} returns true if it's an available spot
	*/
	PieceController.addPiece = function(position){
		var p = new Piece();
		p.setPosition(position);
		PieceController.pieces.push(p);
	}
	/** 
		computes the path of the piece
	*/
	PieceController.computePath = function(piece){
		
	}
	/** 
		@return {boolean} if there is a collision
	*/
	PieceController.testCollision = function(){
		return false;
	}
	/** 
		clear all the pieces
	*/
	PieceController.reset = function(){
		//clear the array
		PieceController.pieces = [];
	}

});