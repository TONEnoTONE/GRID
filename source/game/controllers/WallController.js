/*=============================================================================

 _     _  _______  ___      ___        _______  __    _  _______  ______    ___     
| | _ | ||   _   ||   |    |   |      |       ||  |  | ||       ||    _ |  |   |    
| || || ||  |_|  ||   |    |   |      |       ||   |_| ||_     _||   | ||  |   |    
|       ||       ||   |    |   |      |       ||       |  |   |  |   |_||_ |   |    
|       ||       ||   |___ |   |___   |      _||  _    |  |   |  |    __  ||   |___ 
|   _   ||   _   ||       ||       |  |     |_ | | |   |  |   |  |   |  | ||       |
|__| |__||__| |__||_______||_______|  |_______||_|  |__|  |___|  |___|  |_||_______|

=============================================================================*/

goog.provide("game.controllers.WallController");

goog.require("game.models.Wall");
goog.require("goog.math.Coordinate");


/** 
	@typedef {Object}
*/
var WallController = {
	/** @private
		@type {Object.<string : Wall>} */
	walls : {},
	initialize : function(){

	},
	/** 
		@param {!goog.math.Coordinate} position
		@param {Direction} direction
		@returns {Wall} the newly created wall or the existing wall if there is already one there
	*/
	addWall : function(position, direction){
		var wallAlready = WallController.getWall(position, direction);
		//check if the wall exists already
		if (goog.isDef(wallAlready)){
			return wallAlready;
		} else {
			var coord = WallController.toWallCoordinate(position, direction);
			var w = new Wall(coord);
			WallController.walls[coord] = w;
			return w;
		}
	},
	/** 
		@param {!goog.math.Coordinate} position
		@param {Direction} direction
		@returns {Wall | undefined} a wall if there is one at that position
	*/
	getWall : function(position, direction){
		var coord = WallController.toWallCoordinate(position, direction);
		return WallController.walls[coord];
	},
	/** 
		converts a tile position / direction into a wall coordinate
		@private
		@param {!goog.math.Coordinate} position
		@param {Direction} direction
		@returns {string} the position in wall coordinate space eg "0_0" -> [0,0]
	*/
	toWallCoordinate : function(position, direction){
		position.scale(2);
		position.translate(1, 1);
		var sum = goog.math.Coordinate.sum(position, Direction.toVector(direction));
		//convert it to a string
		return goog.string.buildString(sum.x, "_", sum.y);
	},
	/** 
		converts a wall position into a tile coordinate
		@private
		@param {string} position
		@param {Direction} direction from the wall of the desired tile coordinate
		@returns {!goog.math.Coordinate} the position in tile coordinate space
	*/
	toTileCoordinate : function(wallPosition, direction){
		var wallPosArray = wallPosition.split("_");
		var position = new goog.math.Coordinate(parseInt(wallPosArray[0], 10), parseInt(wallPosArray[1], 10));
		position.translate(-1, -1);
		position = goog.math.Coordinate.sum(position, Direction.toVector(direction));
		position.scale(.5);
		return position;
	}
};

WallController.initialize();