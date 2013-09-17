/*=============================================================================
 _______  ___   ___      _______  _______ 
|       ||   | |   |    |       ||       |
|_     _||   | |   |    |    ___||  _____|
  |   |  |   | |   |    |   |___ | |_____ 
  |   |  |   | |   |___ |    ___||_____  |
  |   |  |   | |       ||   |___  _____| |
  |___|  |___| |_______||_______||_______|

  Tile Controller
=============================================================================*/

goog.provide("game.controllers.TileController");

goog.require("data.Const");
goog.require('game.models.Tile');
goog.require("goog.math.Coordinate");
goog.require("game.controllers.StageController");


/** 
	@typedef {Object}
*/
var TileController = {
	initialize : function(){
		//setup the 2d array
		for (var i = 0; i < CONST.SIZE.HEIGHT; i++){
			TileController.tiles[i] = new Array(CONST.SIZE.WIDTH);
		}
		//fill it with tiles
		for (var x = 0; x < CONST.SIZE.WIDTH; x++){
			for (var y = 0; y < CONST.SIZE.HEIGHT; y++){
				var position = new goog.math.Coordinate(x, y);
				TileController.tiles[y][x] = new Tile(position);
			}
		}
	},
	/** the tiles */
	tiles : new Array(CONST.SIZE.HEIGHT),
	/** 
		@param {goog.math.Coordinate} position x,y
		@return {Tile | null} tile
	*/
	tileAt : function(position){
		//in bounds testing
		if (TileController.isInBounds(position)){
			//what happens if you pick somehting out of bounds? 
			return TileController.tiles[position.y][position.x];
		} else {
			return null;
		}
	},
	/** 
		@private
		@param {goog.math.Coordinate} position
		@return {boolean} 
	*/
	isInBounds : function(position){
		var x = position.x;
		var y = position.y;
		return x >= 0 && x < CONST.SIZE.WIDTH &&
	     y >= 0 && y < CONST.SIZE.HEIGHT;
	},
	/**
		map a function onto each tile
		@param {function(Tile, goog.math.Coordinate)} callback takes the object and the position
	*/
	forEach : function(callback){
		var width = CONST.SIZE.WIDTH;
		var height = CONST.SIZE.HEIGHT;
		for (var x = 0; x < width; x++){
			for (var y = 0; y < height;  y++){
				var position = new goog.math.Coordinate(x, y);
				callback(TileController.tileAt(position), position);
			}
		}
	},
	/** 
		resets the tiles for a new level
	*/
	reset : function(){
		TileController.forEach(function(tile){
			tile.reset();
		})
	},
	/** 
		pulls the current level from the StageController
		@param {number} stage
		@param {number} level
	*/
	setStage : function(stage, level){
		//reset the previous stuffs
		TileController.reset();
		TileController.forEach(function(tile, position){
			var response = StageController.tileAt(position, stage, level);
			tile.walls = response.walls;
			tile.state = response.state;
		});
	}
}

//init
TileController.initialize();