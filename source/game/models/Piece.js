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
	/** @type {CONST.DIRECTION} */
	this.direction = CONST.DIRECTION.WEST;
	/** @type {Object} */
	this.position = {x : 0, y : 0};
	/** @type {Array.<Object>} */
	this.path = [];
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