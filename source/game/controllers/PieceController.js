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

goog.require("goog.math.Coordinate");
goog.require("goog.array");
goog.require("game.models.Piece");
goog.require("game.controllers.StageController");
goog.require("game.views.PieceSelection");

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
		add the piece if it's not already in there
		@param {Piece} piece
	*/
	addPiece : function(piece){
		if (!goog.array.contains(PieceController.pieces, piece)){
			PieceController.pieces.push(piece);
		}
	},
	/** 
		@return {boolean} if there is a collision
	*/
	testCollision : function(){
		var len = PieceController.leastCommonMultiple();
		for (var step = 0; step < len; step++){
			if (PieceController.collisionAtStep(step)){
				return true;
			}
		}
		return false;
	},
	/** 
		compute the lowest common multiple of the trajectory lengths
		@private
		@return {number} lcm of all the lengths
	*/
	leastCommonMultiple : function(){
		if (PieceController.pieces.length > 0){
			var gcd = PieceController.pieces[0].trajectory.getLength();
			for (var i = 1, len = PieceController.pieces.length; i < len; i++){
				var piece = PieceController.pieces[i];
				gcd = PieceController.gcd(gcd, piece.trajectory.getLength());
			}
			var total = 1;
			PieceController.forEach(function(piece){
				total*=piece.trajectory.getLength();
			});
			return total / gcd;
		}
	},
	/** 
		used to compute the lowest common multiple
		@private
		@param {!number} a
		@param {!number} b
		@return {!number} greatest common denominator of the two numbers
	*/
	gcd : function(a, b){
		if (a == 0)
			return b;
		while (b != 0) {
			if (a > b)
				a = a - b;
			else
				b = b - a;
		}
		return a;
	},
	/** 
		test a collision at a step
		O(n*log(n)) where n = number of pieces
		@param {number} step
		@return {boolean} if there is a collision
	*/
	collisionAtStep : function(step){
		var len = PieceController.pieces.length;
		for (var i = 0; i < len; i++){
			//compare this piece against all the later ones
			var testStep = PieceController.pieces[i].trajectory.stepAt(step);
			for (var j = i + 1; j < len; j++){
				var compareStep = PieceController.pieces[j].trajectory.stepAt(step);
				if (testStep.collidesWith(compareStep)){
					return true;
				}
			}
		}
		return false;
	},
	/** 
		clear all the pieces
	*/
	reset : function(){
		PieceController.forEach(function(piece){
			piece.dispose();
		})
		//clear the array
		PieceController.pieces = [];
		PieceSelection.reset();
	},
	/** 
		pulls the current level from the StageController
		@param {number} stage
		@param {number} level
	*/
	setStage : function(stage, level){
		//reset the old setup
		PieceController.reset();
		//start a new one
		var pieces = [];
		var pieceTypes = StageController.getAvailablePieces(stage, level);
		PieceSelection.setAvailablePieces(pieceTypes);
	}
};