/*=============================================================================
 _______  ___   _______  _______  _______ 
|       ||   | |       ||       ||       |
|    _  ||   | |    ___||       ||    ___|
|   |_| ||   | |   |___ |       ||   |___ 
|    ___||   | |    ___||      _||    ___|
|   |    |   | |   |___ |     |_ |   |___ 
|___|    |___| |_______||_______||_______|

=============================================================================*/

goog.provide("game.models.Piece");

goog.require("data.Direction");
goog.require("goog.math.Coordinate");
goog.require("game.models.Trajectory");

/** 
	@constructor
*/
var Piece = function(){
	/** @type {Direction} */
	this.direction = Direction.West;
	/** @type {!goog.math.Coordinate} */
	this.position = new goog.math.Coordinate(0, 0);
	/** @type {Trajectory} */
	this.trajectory = new Trajectory();
}

/** 
	@param {!Direction} direction
*/
Piece.prototype.setDirection = function(direction){
	this.direction = direction;
}

/** 
	@param {!goog.math.Coordinate} position
*/
Piece.prototype.setPosition = function(position){
	this.position = position;
}

/** 
	reset all the parameters before the piece is destroyed
*/
Piece.prototype.reset = function(){
	this.path = null;
}