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
		@type {Object.<Wall>} */
	walls : {},
	/** @private
		@type {Object.<Wall>} */
	indicatorWalls : {},
	initialize : function(){
		//make the indicator walls for each direction
		var position = new goog.math.Coordinate(0, 0);
		Direction.forEach(function(direction){
			var coord = WallController.toWallCoordinate(position, direction);
			var w = new Wall(coord);
			WallController.indicatorWalls[direction] = w;
		})
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
			//put it in the container
			WallController.walls[WallController.positionToString(coord)] = w;
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
		return WallController.walls[WallController.positionToString(coord)];
	},
	/** 
		converts a tile position / direction into a wall coordinate
		@private
		@param {!goog.math.Coordinate} position
		@param {Direction} direction
		@returns {!goog.math.Coordinate} the position in wall coordinate space
	*/
	toWallCoordinate : function(position, direction){
		var ret = position.clone().scale(2);
		ret.translate(1, 1);
		return goog.math.Coordinate.sum(ret, Direction.toVector(direction));
	},
	/** 
		converts a wall position into a tile coordinate
		@private
		@param {!goog.math.Coordinate} wallPosition
		@param {Direction} direction from the wall of the desired tile coordinate
		@returns {!goog.math.Coordinate} the position in tile coordinate space
	*/
	toTileCoordinate : function(wallPosition, direction){
		var ret = wallPosition.clone();
		ret.translate(-1, -1);
		var position = goog.math.Coordinate.sum(ret, Direction.toVector(direction));
		ret.scale(.5);
		return ret;
	},
	/** 
		converts a coordinate to a string seperated by an underscore
		@param {!goog.math.Coordinate} position
		@returns {string} 
	*/
	positionToString : function(position){
		return goog.string.buildString(position.x, "_", position.y);
	},
	/** 
		clears all the walls
	*/
	reset : function(){
		//remove all the walls
		WallController.forEach(function(wall){
			wall.dispose();
		});
		WallController.walls = {};
	},
	/** 
		iterates over all the walls
		@param {function(Wall)} callback
	*/
	forEach : function(callback){
		//remove all the walls
		goog.object.forEach(WallController.walls, function(wall){
			callback(wall);
		});
	},
	/** 
		flash the wall in a certain direction
		@param {Direction} direction
	*/
	flashDirection : function(direction){
		
	},	
};

WallController.initialize();