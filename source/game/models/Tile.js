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

goog.require("goog.math.Coordinate");
goog.require("data.Const");



/**
	@constructor
	@param {goog.math.Coordinate} position
*/
var Tile = function(position){
	/** @type {goog.math.Coordinate} */
	this.position = position;
	/** 
		the walls adjacent to the tile
		@type {Object}
	*/
	this.walls = {};
	/** @type {CONST.TILE} */
	this.state = CONST.TILE.INACTIVE;
}

/** 
	@param {CONST.DIRECTION} direction
	@return {boolean}
*/
Tile.prototype.hasWall = function(direction){
	return this.walls[direction];
}

/** 
	clears all the data for level / stage switches
*/
Tile.prototype.reset = function(){
	this.walls = {};
	this.state = CONST.TILE.INACTIVE;
}

/** 
	@param {CONST.DIRECTION} direction the piece is currently travelling in
	@returns {CONST.DIRECTION} the direction the piece would be in after leaving this tile
*/
Tile.prototype.bounce = function(direction){
	return direction;
}
