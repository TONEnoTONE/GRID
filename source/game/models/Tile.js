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
goog.require("data.Direction");

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
	@param {Direction} direction
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
	@param {Direction} direction the piece is currently travelling in
	@returns {Direction} the direction the piece would be in after leaving this tile
*/
Tile.prototype.continueInDirection = function(direction){
	//if it has a wall in that direction, 
	//return the opposite direction
	if (this.hasWall(direction)){
		return Direction.opposite(direction);
	} else {
		//otherwise just keep going forward
		return direction;
	}
}
