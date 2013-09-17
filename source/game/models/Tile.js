/*=============================================================================
 _______  ___   ___      _______ 
|       ||   | |   |    |       |
|_     _||   | |   |    |    ___|
  |   |  |   | |   |    |   |___ 
  |   |  |   | |   |___ |    ___|
  |   |  |   | |       ||   |___ 
  |___|  |___| |_______||_______|
  
=============================================================================*/

goog.provide("game.models.Tile");

goog.require("game.models.Piece");
goog.require("goog.math.Coordinate");
goog.require("data.Const");



/**
	@constructor
	@param {goog.math.Coordinate} position
*/
game.models.Tile = function(position){
	/** @type {goog.math.Coordinate} */
	this.position = position;
	/** 
		the walls adjacent to the tile
		@type {Object}
	*/
	this.walls = {};
	/** @type {boolean} */
	this.active = false;
	/** 
		the piece which is on the tile
		@type {game.models.Piece | null}
	*/
	this.piece = null;
}

/** 
	@param {CONST.DIRECTION} direction
	@return {boolean}
*/
game.models.Tile.prototype.hasWall = function(direction){
	return this.walls[direction];
}

/** 
	clears all the data for level / stage switches
*/
game.models.Tile.prototype.reset = function(){
	this.walls = {};
	this.active = false;
}

/** 
	@param {CONST.DIRECTION} direction the piece is currently travelling in
	@returns {CONST.DIRECTION} the direction the piece would be in after leaving this tile
*/
game.models.Tile.prototype.bounce = function(direction){
	return direction;
}
