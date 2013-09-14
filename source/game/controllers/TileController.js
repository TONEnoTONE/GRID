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

define(['const', "underscore", 'game/models/Tile', "game/controllers/StageController"], function(){

	var CONST = require("const");
	var _ = require("underscore");
	var Tile = require('game/models/Tile');
	var StageController = require("game/controllers/StageController");

	/** 
		The collection of tiles
	*/
	var Tiles = {
		/** the tiles */
		tiles : new Array(CONST.SIZE.HEIGHT),
		initialize : function(){
			//setup the 2d array
			for (var i = 0; i < CONST.SIZE.HEIGHT; i++){
				Tiles.tiles[i] = new Array(CONST.SIZE.WIDTH);
			}
			//fill it with tiles
			for (var x = 0; x < CONST.SIZE.WIDTH; x++){
				for (var y = 0; y < CONST.SIZE.HEIGHT; y++){
					var position = {x : x, y : y};
					Tiles.tiles[y][x] = new Tile(position);
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
			@return {Tile | undefined} tile
		*/
		tileAt : function(position){
			//in bounds testing
			if (position.y >= 0 && position.y < CONST.SIZE.HEIGHT){
				//what happens if you pick somehting out of bounds? 
				return Tiles.tiles[position.y][position.x];
			} else {
				return;
			}
		},
		/**
			map a function onto each tile
			@param {function(Tile, Object=)} callback takes the object and the position
		*/
		forEach : function(callback){
			var width = CONST.SIZE.WIDTH;
			var height = CONST.SIZE.HEIGHT;
			for (var x = 0; x < width; x++){
				for (var y = 0; y < height;  y++){
					var position = {x : x, y : y};
					callback(Tiles.tileAt(position), position);
				}
			}
		},
		/** 
			resets the tiles for a new level
		*/
		reset : function(){
			Tiles.forEach(function(tile){
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
			Tiles.reset();
			Tiles.forEach(function(tile, position){
				var response = StageController.tileAt(position, stage, level);
				tile.walls = response.walls;
				tile.active = response.active;
			});
		}
	}

	//init
	Tiles.initialize();

	//return for require
	return Tiles;
});