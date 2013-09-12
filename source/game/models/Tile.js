/*=============================================================================
 _______  ___   ___      _______ 
|       ||   | |   |    |       |
|_     _||   | |   |    |    ___|
  |   |  |   | |   |    |   |___ 
  |   |  |   | |   |___ |    ___|
  |   |  |   | |       ||   |___ 
  |___|  |___| |_______||_______|

  Tiles have pointers to all the neighboring tiles
  
=============================================================================*/

require (["underscore", "const"], function(){

	var CONST = require("const");

	/**
		@constructor
		@param {Object} position
	*/
	var Tile = function(position){
		this.position = position;
		/* the objects neighbors */
		this.neighbors = {};
	}

	/** 
		@param {CONST.DIRECTION} direction
		@param {Tile} tile
	*/
	Tile.prototype.setNeighbor = function(direction, tile){
		this.neighbors[direction] = tile;
	}

	/** 
		@param {CONST.DIRECTION} direction
		@param {Tile} tile
	*/
	Tile.prototype.setWall = function(direction, tile){
		this.neighbors[direction] = tile;
	}

	/** 
		
	*/
	Tile.prototype.hasWall = function(){

	}

	return Tile;
});
