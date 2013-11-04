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
	@param {!goog.math.Coordinate} position
*/
var Tile = function(position){
	/** @type {!goog.math.Coordinate} */
	this.position = position;
	/** 
		the walls adjacent to the tile
		@type {Object}
	*/
	this.walls = {};
	/** @type {boolean} */
	this.active = false;
}

/** 
	@param {Direction} direction
	@return {boolean}
*/
Tile.prototype.hasWall = function(direction){
	return goog.isDef(this.walls[direction]);
}

/** 
	clears all the data for level / stage switches
*/
Tile.prototype.reset = function(){
	this.walls = {};
	this.active = false;
}

/** 
	@param {Direction} direction the piece is currently travelling in
	@return {TrajectoryStep} the direction the piece would be in after leaving this tile
*/
Tile.prototype.nextStep = function(direction){
	//if it has a wall in that direction, 
	//return the opposite direction
	if (this.hasWall(direction)){
		return new TrajectoryStep(this.position, Direction.opposite(direction));
	} else {
		//otherwise just keep going forward in the same direction
		return new TrajectoryStep(goog.math.Coordinate.sum(this.position, Direction.toVector(direction)), direction);
	}
}

/** 
	@param {Direction} direction the piece is currently travelling in
	@return {TrajectoryStep} the direction the piece would be in after leaving this tile
*/
Tile.prototype.nextLoopStep = function(direction){
	//if it has a wall in that direction, 
	//return the opposite direction
	if (this.hasWall(direction)){
		var position = this.position.clone();
		switch(direction){
			case Direction.North : 
				position.y = CONST.BOARDDIMENSION.HEIGHT - 1;
				break;
			case Direction.South : 
				position.y = 0;
				break;
			case Direction.West : 
				position.x = CONST.BOARDDIMENSION.WIDTH - 1;
				break;
			case Direction.East : 
				position.x = 0;
				break;

		}
		return new TrajectoryStep(position, direction);
	} else {
		//otherwise just keep going forward in the same direction
		return new TrajectoryStep(goog.math.Coordinate.sum(this.position, Direction.toVector(direction)), direction);
	}
}
