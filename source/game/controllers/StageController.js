/*=============================================================================

	STAGE CONTROLLER

	turn the stage/level description into something more parseable
=============================================================================*/

define(["data/Stages", "underscore", "const"], function(STAGES){

	var _ = require("underscore");

	var CONST = require("const");

	var CONTROLLER = {
		/** 
			@param {Object} position of the tile
			@param {number} stage
			@param {number} level
			@return {Object} tile with all the fields filled out
		*/
		tileAt : function(position, stage, level){
			var levelDef = STAGES[stage].levels[level];
			var tileDef = levelDef.layout[position.y][position.x];
			var walls = CONTROLLER.getWalls(position, stage, level);
			var tile = {
				walls : walls,
				active : tileDef === 0 ? false : true
			};
			return tile;
		},
		/** 
			@param {Object} position of the tile
			@param {number} stage
			@param {number} level
			@return {number} the type
		*/
		typeAt : function(position, stage, level){
			if (position.x >= CONST.SIZE.WIDTH || position.x < 0){
				return 0;
			} else if (position.y >= CONST.SIZE.HEIGHT || position.y < 0){
				return 0;
			} else {
				var levelDef = STAGES[stage].levels[level];
				return levelDef.layout[position.y][position.x];
			}
		},
		/**
			@param {Object} pos0
			@param {Object} pos1
		*/
		relativeDirection : function(pos0, pos1){
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
		},
		/** 
			@param {Object} position of the tile
			@param {number} stage
			@param {number} level
			@return {Object} tile with all the fields filled out
		*/
		getWalls : function(position, stage, level){
			var walls = {};
			//initially set everything to false
			walls[CONST.DIRECTION.NORTH] = false;
			walls[CONST.DIRECTION.EAST] = false;
			walls[CONST.DIRECTION.SOUTH] = false;
			walls[CONST.DIRECTION.WEST] = false;
			//get the other walls
			var thisType = CONTROLLER.typeAt(position, stage, level);
			//get the walls around that tile
			var testPos = [position.x, position.y];
			var levelDef = STAGES[stage].levels[level];
			for (var i = 0; i < levelDef.walls.length; i++){
				var tile0Pos = levelDef.walls[i][0];
				var tile1Pos = levelDef.walls[i][1];
				//test the position
				if (_.isEqual(testPos, tile0Pos)){
					//figure out which side the wall is on
					walls[CONTROLLER.relativeDirection(tile0Pos, tile1Pos)] = true;
				} else if (_.isEqual(testPos, tile1Pos)){
					walls[CONTROLLER.relativeDirection(tile1Pos, tile0Pos)] = true;
				}
			}
			if (CONTROLLER.isEdge(thisType, CONTROLLER.typeAt({ x : position.x + 1, y : position.y }, stage, level))){
				walls[CONST.DIRECTION.EAST] = true;
			}  
			if (CONTROLLER.isEdge(thisType, CONTROLLER.typeAt({ x : position.x - 1, y : position.y }, stage, level))){
				walls[CONST.DIRECTION.WEST] = true;
			}  
			if (CONTROLLER.isEdge(thisType, CONTROLLER.typeAt({ x : position.x, y : position.y - 1}, stage, level))){
				walls[CONST.DIRECTION.NORTH] = true;
			} 
			if (CONTROLLER.isEdge(thisType, CONTROLLER.typeAt({ x : position.x, y : position.y + 1}, stage, level))){
				walls[CONST.DIRECTION.SOUTH] = true;
			}
			return walls;
		},
		/** 
			@param {number} type0
			@param {number} type1
			@return {boolean} return true of 0 && 1 or 1 && 0
		*/
		isEdge : function(type0, type1){
			return type0 + type1 === 1;
		},
		/** 
			@param {number} stage
			@return {number} the number of levels in the stage
		*/
		levelsInStage : function(stage){
			return STAGES[stage].levels.length;
		}
	}

	return CONTROLLER;
});