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

/** 
	@constructor
*/
game.models.Piece = function(){
	this.direction = CONST.DIRECTION.WEST;
	this.position = {x : 0, y : 0};
	this.startPosition = {x : 0, y : 0};
}

/** 
	@param {CONST.DIRECTION} direction
*/
game.models.Piece.prototype.setDirection = function(direction){
	this.direction = direction;
}

/** 
	@param {Object} position
*/
game.models.Piece.prototype.setPosition = function(position){
	this.position = position;
}

/** 
	@param {Object} position
*/
game.models.Piece.prototype.setStartPosition = function(position){
	this.startPosition = position;
}