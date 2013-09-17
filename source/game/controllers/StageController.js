/*=============================================================================

	STAGE CONTROLLER

	turn the stage/level description into something more parseable
=============================================================================*/

goog.provide("game.controllers.StageController");

goog.require("data.Stages");
goog.require("data.TestStages");
goog.require("data.Const");
goog.require("goog.math.Coordinate");

//scope out the stuff so the code is less ugly!!
goog.scope(function(){
	
	var Coord = goog.math.Coordinate;
	var TestStages = data.TestStages;
	var Stages = data.Stages;
	var StageController = game.controllers.StageController;

	/** set the stages set */
	StageController.Stages = Stages;
	/** 
		@param {boolean} testStages 
		use the test stages or not
	*/
	StageController.useTestStages = function(testStages){
		StageController.Stages = testStages? TestStages: Stages;
	}
	/** 
		@param {goog.math.Coordinate} position of the tile
		@param {number} stage
		@param {number} level
		@return {Object} tile with all the fields filled out
	*/
	StageController.tileAt = function(position, stage, level){
		var levelDef = StageController.Stages[stage].levels[level];
		var tileDef = levelDef.layout[position.y][position.x];
		var walls = StageController.getWalls(position, stage, level);
		var tile = {
			walls : walls,
			active : tileDef === 0 ? false : true
		};
		return tile;
	}
	/** 
		@param {goog.math.Coordinate} position of the tile
		@param {number} stage
		@param {number} level
		@return {number} the type
	*/
	StageController.typeAt = function(position, stage, level){
		if (position.x >= CONST.SIZE.WIDTH || position.x < 0){
			return 0;
		} else if (position.y >= CONST.SIZE.HEIGHT || position.y < 0){
			return 0;
		} else {
			var levelDef = StageController.Stages[stage].levels[level];
			return levelDef.layout[position.y][position.x];
		}
	}
	/**
		@param {goog.math.Coordinate} pos0
		@param {goog.math.Coordinate} pos1
	*/
	StageController.relativeDirection = function(pos0, pos1){
		if (pos0.x === pos1.x && pos0.y === pos1.y + 1){
			return CONST.DIRECTION.NORTH;
		} else if (pos0.x === pos1.x && pos0.y + 1 === pos1.y){
			return CONST.DIRECTION.SOUTH;
		} else if (pos0.x === pos1.x + 1 && pos0.y === pos1.y){
			return CONST.DIRECTION.WEST;
		} else if (pos0.x + 1 === pos1.x && pos0.y === pos1.y){
			return CONST.DIRECTION.EAST;
		} else {
			return false;
		}
	}
	/** 
		@param {goog.math.Coordinate} position of the tile
		@param {number} stage
		@param {number} level
		@return {Object} tile with all the fields filled out
	*/
	StageController.getWalls = function(position, stage, level){
		var walls = {};
		//initially set everything to false
		walls[CONST.DIRECTION.NORTH] = false;
		walls[CONST.DIRECTION.EAST] = false;
		walls[CONST.DIRECTION.SOUTH] = false;
		walls[CONST.DIRECTION.WEST] = false;
		//get the other walls
		var thisType = game.controllers.StageController.typeAt(position, stage, level);
		//get the walls around that tile
		var testPos = [position.x, position.y];
		var levelDef = game.controllers.StageController.Stages[stage].levels[level];
		for (var i = 0; i < levelDef.walls.length; i++){
			var tile0Pos = levelDef.walls[i][0];
			var tile1Pos = levelDef.walls[i][1];
			//test the position
			if (goog.math.Coordinate.equals(testPos, tile0Pos)){
				//figure out which side the wall is on
				walls[StageController.relativeDirection(tile0Pos, tile1Pos)] = true;
			} else if (_.isEqual(testPos, tile1Pos)){
				walls[StageController.relativeDirection(tile1Pos, tile0Pos)] = true;
			}
		}
		if (StageController.isEdge(thisType, StageController.typeAt(new Coord(position.x + 1, position.y), stage, level))){
			walls[CONST.DIRECTION.EAST] = true;
		}  
		if (StageController.isEdge(thisType, StageController.typeAt(new Coord(position.x - 1, position.y), stage, level))){
			walls[CONST.DIRECTION.WEST] = true;
		}  
		if (StageController.isEdge(thisType, StageController.typeAt(new Coord(position.x, position.y - 1), stage, level))){
			walls[CONST.DIRECTION.NORTH] = true;
		} 
		if (StageController.isEdge(thisType, StageController.typeAt(new Coord(position.x, position.y + 1), stage, level))){
			walls[CONST.DIRECTION.SOUTH] = true;
		}
		return walls;
	}
	/** 
		@param {number} type0
		@param {number} type1
		@return {boolean} return true of 0 && 1 or 1 && 0
	*/
	StageController.isEdge = function(type0, type1){
		return type0 + type1 === 1;
	}
	/** 
		@param {number} stage
		@return {number} the number of levels in the stage
	*/
	StageController.levelsInStage = function(stage){
		return StageController.Stages[stage].levels.length;
	}
	
});
