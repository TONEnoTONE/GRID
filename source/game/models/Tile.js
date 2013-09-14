/*=============================================================================
 _______  ___   ___      _______ 
|       ||   | |   |    |       |
|_     _||   | |   |    |    ___|
  |   |  |   | |   |    |   |___ 
  |   |  |   | |   |___ |    ___|
  |   |  |   | |       ||   |___ 
  |___|  |___| |_______||_______|
  
=============================================================================*/

define (["const"], function(){

	var CONST = require("const");

	/**
		@constructor
		@param {Object} position
	*/
	var Tile = function(position){
		this.position = position;
		/** the walls adjacent to the tile*/
		this.walls = {};
		/** active/inactive */
		this.active = false;
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
		this.active = false;
	}

	/** 
		@param {CONST.DIRECTION} direction the piece is currently travelling in
		@returns {CONST.DIRECTION} the direction the piece would be in after leaving this tile
	*/
	Tile.prototype.bounce = function(direction){
		return direction;
	}

	return Tile;
});
