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

require(['const', 'game/models/Tile'], function(){

	var CONST = require("const");

	/** 
		The collection of tiles
		@singleton
	*/
	var Tiles = {
		tiles : new Array(CONST.SIZE.WIDTH * CONST.SIZE.HEIGHT),
		initialize : function(){
			//some initialization routine
		},
		/** 
			@param {number} level
		*/
		setLevel : function(level){

		},
		/** 
			@param {number} stage
		*/
		setStage : function(stage){

		}
	}

	Tiles.initialize();

	//return for require
	return Tiles;
});