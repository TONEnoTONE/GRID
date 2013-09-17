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


goog.scope(function(){

	/** 
		the tile controller
	*/
	var TileController = game.controllers.TileController;
	var StageController = game.controllers.StageController;
	var Coord = goog.math.Coordinate;

	
		/** the tiles */
	TileController.tiles = new Array(CONST.SIZE.HEIGHT);

	TileController.initialize = function(){
		//setup the 2d array
		for (var i = 0; i < CONST.SIZE.HEIGHT; i++){
			TileController.tiles[i] = new Array(CONST.SIZE.WIDTH);
		}
		//fill it with tiles
		for (var x = 0; x < CONST.SIZE.WIDTH; x++){
			for (var y = 0; y < CONST.SIZE.HEIGHT; y++){
				var position = new Coord(x, y);
				TileController.tiles[y][x] = new game.models.Tile(position);
			}
		}
	}
	/** 
		@param {goog.math.Coordinate} position x,y
		@return {game.models.Tile | null} tile
	*/
	TileController.tileAt = function(position){
		//in bounds testing
		if (TileController.isInBounds(position)){
			//what happens if you pick somehting out of bounds? 
			return TileController.tiles[position.y][position.x];
		} else {
			return null;
		}
	}
	/** 
		@private
		@param {goog.math.Coordinate} position
		@return {boolean} 
	*/
	TileController.isInBounds = function(position){
		var x = position.x;
		var y = position.y;
		return x >= 0 && x < CONST.SIZE.WIDTH &&
         y >= 0 && y < CONST.SIZE.HEIGHT;
	}
	/**
		map a function onto each tile
		@param {function(game.models.Tile, goog.math.Coordinate)} callback takes the object and the position
	*/
	TileController.forEach = function(callback){
		var width = CONST.SIZE.WIDTH;
		var height = CONST.SIZE.HEIGHT;
		for (var x = 0; x < width; x++){
			for (var y = 0; y < height;  y++){
				var position = new Coord(x, y);
				callback(TileController.tileAt(position), position);
			}
		}
	}
	/** 
		resets the tiles for a new level
	*/
	TileController.reset = function(){
		TileController.forEach(function(tile){
			tile.reset();
		})
	}
	/** 
		pulls the current level from the StageController
		@param {number} stage
		@param {number} level
	*/
	TileController.setStage = function(stage, level){
		//reset the previous stuffs
		TileController.reset();
		TileController.forEach(function(tile, position){
			var response = StageController.tileAt(position, stage, level);
			tile.walls = response.walls;
			tile.active = response.active;
		});
	}

	//init
	TileController.initialize();
});