/*=============================================================================

	STAGE CONTROLLER

	turn the stage/level description into something more parseable
=============================================================================*/

goog.provide("game.controllers.StageController");

goog.require("models.StagesModel");
goog.require("data.StagesFull");
goog.require("data.Const");
goog.require("data.Direction");
goog.require("goog.math.Coordinate");

/** 
	parses the way that stages are stored
	@typedef {Object}
*/
var StageController = {

	/** set the stages set */
	Stages : StagesModel.Stages,
	/** 
		@param {boolean} testStages 
		use the test stages or not
	*/
	useTestStages : function(testStages){
		StageController.Stages = testStages? StagesModel.TestStages: StagesModel.Stages;
	},
	/** 
		@param {goog.math.Coordinate} position of the tile
		@param {number} stage
		@param {number} level
		@returns {Object} tile with all the fields filled out
	*/
	tileAt : function(position, stage, level){
		var stageDef = StageController.Stages[stage];
		var tileDef = stageDef.layout[position.y][position.x];
		var walls = StageController.getWalls(position, stage, level);
		var tile = {
			walls : walls,
			active : tileDef === 0 ? false : true
		};
		return tile;
	},
	/** 
		@param {goog.math.Coordinate} position of the tile
		@param {number} stage
		@param {number} level
		@returns {number} the type
	*/
	typeAt : function(position, stage, level){
		if (position.x >= CONST.BOARDDIMENSION.WIDTH || position.x < 0){
			return 0;
		} else if (position.y >= CONST.BOARDDIMENSION.HEIGHT || position.y < 0){
			return 0;
		} else {
			var stageDef = StageController.Stages[stage];
			return stageDef.layout[position.y][position.x];
		}
	},
	/** 
		@param {goog.math.Coordinate} position of the tile
		@param {number} stage
		@param {number} level
		@returns {Object} tile with all the fields filled out
	*/
	getWalls : function(position, stage, level){
		var walls = {};
		//initially set everything to false
		walls[Direction.North] = false;
		walls[Direction.East] = false;
		walls[Direction.South] = false;
		walls[Direction.West] = false;
		//get the other walls
		var thisType = StageController.typeAt(position, stage, level);
		//get the walls around that tile
		var testPos = [position.x, position.y];
		if (StageController.isEdge(thisType, StageController.typeAt(new goog.math.Coordinate(position.x + 1, position.y), stage, level))){
			walls[Direction.East] = true;
		}  
		if (StageController.isEdge(thisType, StageController.typeAt(new goog.math.Coordinate(position.x - 1, position.y), stage, level))){
			walls[Direction.West] = true;
		}  
		if (StageController.isEdge(thisType, StageController.typeAt(new goog.math.Coordinate(position.x, position.y - 1), stage, level))){
			walls[Direction.North] = true;
		} 
		if (StageController.isEdge(thisType, StageController.typeAt(new goog.math.Coordinate(position.x, position.y + 1), stage, level))){
			walls[Direction.South] = true;
		}
		return walls;
	},
	/** 
		@param {number} type0
		@param {number} type1
		@returns {boolean} return true of 0 && 1 or 1 && 0
	*/
	isEdge : function(type0, type1){
		return (type0 === 0 && type1 === 1) || (type1 === 0 && type0 === 1)
		// return type0 + type1 === 1;
	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {number} the count in beats
	*/
	getCountIn : function(stage, level){
		var levelDef = StageController.Stages[stage].levels[level];
		return levelDef.countIn;
	},
	/** 
		@param {number} stage
		@returns {number} the number of levels in the stage
	*/
	getLevelCount : function(stage){
		return StageController.Stages[stage].levels.length;
	},
	/** 
		@returns {number} the number of stages
	*/
	getStageCount : function(){
		return StageController.Stages.length;
	},
	/** 
		@param {number} stage
		@returns {string} the stage name
	*/
	getStageName : function(stage){
		return StageController.Stages[stage].name;
	},
	/** 
		@param {number} stage
		@returns {string} the stage genre
	*/
	getStageGenre : function(stage){
		return StageController.Stages[stage].genre;
	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {Array.<PieceType>}
	*/
	getAvailablePieces : function(stage, level){
		var stageDef = StageController.Stages[stage];
		return stageDef.pieces;
	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {Array.<PieceType>}
	*/
	getInstructions : function(stage, level){
		var levelDef = StageController.Stages[stage].levels[level];
		return levelDef.instructions;
	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {Array}
	*/
	getPattern : function(stage, level){
		//iterate over the instructions to get hte pattern
		var levelDef = StageController.Stages[stage].levels[level];
		return levelDef.pattern;
	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {number} the number of repeats
	*/
	getRepeats : function(stage, level){
		//iterate over the instructions to get hte pattern
		var levelDef = StageController.Stages[stage].levels[level];
		var ret = levelDef.repeat || 1;
		return ret;
	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {Object}
	*/
	getSamples : function(stage, level){
		var levelDef = StageController.Stages[stage].levels[level];
		return levelDef.samples;
	},
	/** 
		@param {number} stage
		@returns {number}
	*/
	getBPM : function(stage){
		var stageDef = StageController.Stages[stage];
		return stageDef.bpm;
	},
	/** 
		@param {number} stage
		@returns {Array.<Object>} the tracks
	*/
	getTracks : function(stage){
		var stageDef = StageController.Stages[stage];
		return stageDef.tracks;
	}
};
