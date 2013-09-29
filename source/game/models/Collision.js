/*=============================================================================
 _______  _______  ___      ___      ___   _______  ___   _______  __    _ 
|       ||       ||   |    |   |    |   | |       ||   | |       ||  |  | |
|       ||   _   ||   |    |   |    |   | |  _____||   | |   _   ||   |_| |
|       ||  | |  ||   |    |   |    |   | | |_____ |   | |  | |  ||       |
|      _||  |_|  ||   |___ |   |___ |   | |_____  ||   | |  |_|  ||  _    |
|     |_ |       ||       ||       ||   |  _____| ||   | |       || | |   |
|_______||_______||_______||_______||___| |_______||___| |_______||_|  |__|

a collision points to the two colliding pieces, their crash position, and the crash step
=============================================================================*/

goog.provide("game.models.Collision");

goog.require("goog.array");

/** 
	@constructor
	@param {Array.<Piece>} pieces
	@param {number} step
	@extends {goog.Disposable}
*/
var Collision = function(pieces, step){
	goog.base(this);
	/** @type {Array.<Piece>} */
	this.pieces = pieces;
	/** @type {number} */
	this.step = step;
}

goog.inherits(Collision, goog.Disposable);

/** @override */
Collision.prototype.disposeInternal = function(){
	//remove references to the pieces
	for (var i = 0; i < this.pieces.length; i++){
		this.pieces[i] = null;
	}
	goog.base(this, "disposeInternal");
}

/** 
	adds the pieces to the array if they're not already in there
	@param {Array.<Piece>} pieces
*/
Collision.prototype.addPieces = function(pieces){
	for (var i = 0; i < pieces.length; i++){
		var piece = pieces[i];
		if (!goog.array.contains(this.pieces, piece)){
			this.pieces.push(piece)
		}
	}
}