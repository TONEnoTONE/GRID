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

goog.require("data.Const");
goog.require("goog.math.Coordinate");
goog.require("game.models.PathStep");

/** 
	@constructor
*/
var Piece = function(){
	/** @type {CONST.DIRECTION} */
	this.direction = CONST.DIRECTION.WEST;
	/** @type {goog.math.Coordinate} */
	this.position = null;
	/** @type {Array.<PathStep>} */
	this.path = [];
}

/** 
	@param {CONST.DIRECTION} direction
*/
Piece.prototype.setDirection = function(direction){
	this.direction = direction;
}

/** 
	@param {goog.math.Coordinate} position
*/
Piece.prototype.setPosition = function(position){
	this.position = position;
}

/** 
	@param {number} step
	@return {goog.math.Coordinate}
*/
Piece.prototype.getPositionAtStep = function(step){
	step = step % this.path.length;
	return this.path[step].position;
}

/** 
	@param {number} step
	@return {goog.math.Coordinate}
*/
Piece.prototype.getDirectionAtStep = function(step){
	step = step % this.path.length;
	return this.path[step].direction;
}