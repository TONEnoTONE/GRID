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
goog.require("game.controllers.StageController");

/** 
	the tile controller
*/
game.controllers.TileController = {
	/** the tiles */
	tiles : new Array(CONST.SIZE.HEIGHT),
	initialize : function(){
		//setup the 2d array
		for (var i = 0; i < CONST.SIZE.HEIGHT; i++){
			game.controllers.TileController.tiles[i] = new Array(CONST.SIZE.WIDTH);
		}
		//fill it with tiles
		for (var x = 0; x < CONST.SIZE.WIDTH; x++){
			for (var y = 0; y < CONST.SIZE.HEIGHT; y++){
				var position = {x : x, y : y};
				game.controllers.TileController.tiles[y][x] = new game.models.Tile(position);
			}
		}
		//set all the neighbor pointers
		//does it need pointers to the neighbors??
		//circular references could be bad?!?!
		/*for (var x = 0; x < CONST.SIZE.WIDTH; x++){
			for (var y = 0; y < CONST.SIZE.HEIGHT; y++){
				var t = Tiles.tileAt({x : x, y : y});
				t.neighbors[CONST.DIRECTION.NORTH] = Tiles.tileAt({x : x, y : y - 1});
				t.neighbors[CONST.DIRECTION.SOUTH] = Tiles.tileAt({x : x, y : y + 1});
				t.neighbors[CONST.DIRECTION.EAST] = Tiles.tileAt({x : x + 1, y : y});
				t.neighbors[CONST.DIRECTION.WEST] = Tiles.tileAt({x : x - 1, y : y});
			}
		}*/
	},
	/** 
		@param {Object} position x,y
		@return {game.models.Tile | null} tile
	*/
	tileAt : function(position){
		//in bounds testing
		if (position.y >= 0 && position.y < CONST.SIZE.HEIGHT){
			//what happens if you pick somehting out of bounds? 
			return game.controllers.TileController.tiles[position.y][position.x];
		} else {
			return null;
		}
	},
	/**
		map a function onto each tile
		@param {function(game.models.Tile, Object)} callback takes the object and the position
	*/
	forEach : function(callback){
		var width = CONST.SIZE.WIDTH;
		var height = CONST.SIZE.HEIGHT;
		for (var x = 0; x < width; x++){
			for (var y = 0; y < height;  y++){
				var position = {x : x, y : y};
				callback(game.controllers.TileController.tileAt(position), position);
			}
		}
	},
	/** 
		resets the tiles for a new level
	*/
	reset : function(){
		game.controllers.TileController.forEach(function(tile){
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
		game.controllers.TileController.reset();
		game.controllers.TileController.forEach(function(tile, position){
			var response = game.controllers.StageController.tileAt(position, stage, level);
			tile.walls = response.walls;
			tile.active = response.active;
		});
	}
}

//init
game.controllers.TileController.initialize();