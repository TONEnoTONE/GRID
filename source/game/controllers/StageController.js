/*=============================================================================

	STAGE CONTROLLER

	turn the stage/level description into something more parseable
=============================================================================*/

goog.provide("game.controllers.StageController");

goog.require("data.Const");
goog.require("data.Direction");
goog.require("goog.math.Coordinate");
goog.require("data.Stages");
goog.require("models.StagesModel");

/** 
	parses the way that stages are stored
	@typedef {Object}
*/
var StageController = {
	/** set the stages set */
	Stages : Stages,
	/** 
		@param {boolean} testStages 
		use the test stages or not
	*/
	useTestStages : function(testStages){
		//StageController.Stages = testStages? TestStages: Stages;
	},
	/** 
		@param {number} stage
		@param {function(number)} callback
	*/
	forEachSolvedLevel : function(stage, callback){
		for (var level = 0, len = StageController.getLevelCount(stage); level < len; level++){
			if (StageController.getLevelStatus(stage, level) === StagesModel.STATUS.SOLVED){
				callback(level);
			}
		}
	},
	/*=========================================================================
		WALLS
	=========================================================================*/
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
			var levelDef = StageController.Stages[stage].levels[level];
			return levelDef.layout[position.y][position.x];
		}
	},
	/** 
		@param {goog.math.Coordinate} position of the tile
		@param {number} stage
		@param {number} level
		@returns {Object} tile with all the fields filled out
	*/
	tileAt : function(position, stage, level){
		var levelDef = StageController.Stages[stage].levels[level];
		var tileDef = levelDef.layout[position.y][position.x];
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
		var levelDef = StageController.Stages[stage].levels[level];
		for (var i = 0; i < levelDef.walls.length; i++){
			var tile0Pos = levelDef.walls[i][0];
			var tile1Pos = levelDef.walls[i][1];
			//test the position
			if (testPos[0] === tile0Pos[0] && testPos[1]===tile0Pos[1]){
				//figure out which side the wall is on
				walls[Direction.relativeDirection(tile0Pos, tile1Pos)] = true;
			} else if (testPos[0] === tile1Pos[0] && testPos[1]===tile1Pos[1]){
				walls[Direction.relativeDirection(tile1Pos, tile0Pos)] = true;
			}
		}
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
	/*=========================================================================
		PIECES
	=========================================================================*/
	/** 
		@param {number} stage
		@param {number} level
		@returns {Array.<PieceType>}
	*/
	getAvailablePieces : function(stage, level){
		var levelDef = StageController.Stages[stage].levels[level];
		return levelDef.pieces;
	},
	/** 
		@returns {number} the number of takes allowed in the stage
	*/
	getNumberTakesAllowed : function(){
		return 8;
	},
	/*=========================================================================
		STAGE ATTRIBUTES
	=========================================================================*/
	/** 
		@param {number} stage
		@returns {number} the bpm of the stage
	*/
	getBpm: function(stage){
		var stageDef = StageController.Stages[stage];
		return stageDef.bpm;
	},
	/** 
		@param {number} stage
		@returns {PieceType} the color of the stage
	*/
	getStageColor : function(stage){
		return StageController.Stages[stage].color;
	},
	/** 
		@param {number} stage
		@returns {string}
	*/
	getName : function(stage){
		var stageDef = StageController.Stages[stage];
		return stageDef.name;
	},
	/*=========================================================================
		LEVEL ATTRIBUTES
	=========================================================================*/
	/** 
		@param {number} stage
		@param {number} level
		@returns {Object}
	*/
	getLevel : function(stage, level){
		var levelDef = StageController.Stages[stage].levels[level];
		return levelDef;
	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {Pattern}
	*/
	getPattern : function(stage, level){
		var hits;
		var userPattern = StagesModel.getLevelPattern(stage, level, false);
		var stagePattern = StageController.Stages[stage].levels[level].pattern;
		//if the level is has 3 stars, but no custom pattern, just send a blank one
		if (userPattern){
			hits = userPattern;
			//extend the user pattern to the length of the other pattern
		} else {
			hits = stagePattern;
		}
		hits = goog.array.concat(hits,hits);
		var pattern = new Pattern(stagePattern.length * 2);
		pattern.addPattern(hits);
		return pattern;
	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {Pattern}
	*/
	getStagePattern : function(stage, level){
		var hits = StageController.Stages[stage].levels[level].pattern;
		hits = goog.array.concat(hits,hits);
		var pattern = new Pattern(hits.length);
		pattern.addPattern(hits);
		return pattern;
	},
	/** 
		@param {number} stage
		@param {number} level
	*/
	setEmptyPattern : function(stage, level){
		var stars = StageController.getLevelStars(stage, level);
		//if it's 3 stars, and there is no userpattern, set an empty one
		var userPattern = StagesModel.getLevelPattern(stage, level, false);
		if (stars === 3 && !userPattern){
			StagesModel.setEmptyLevelPattern(stage, level, false);
		}
	},
	/** 
		@param {number} stage
		@param {number} level
		@param {Pattern} pattern
	*/
	setPattern : function(stage, level, pattern){
		var storedPattern = pattern.toStageFormat();
		StagesModel.setLevelPattern(stage, level, storedPattern, true);
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
	/*=========================================================================
		LEVEL/STAGE NUMBER
	=========================================================================*/
	/** 
		@param {number} stage
		@returns {number} the number of levels in the stage
	*/
	getLevelCount : function(stage){
		return StagesModel.getLevelCount(stage);
	},
	/** 
		@returns {number} the number of stages
	*/
	getStageCount : function(){
		return StagesModel.getStageCount();
	},
	/** 
		@param {number} stage
		@param {number=} level
		@returns {boolean} true if the stage (and level) are valid number
	*/
	isInRange : function(stage, level){
		if (goog.isDef(level)){
			return StageController.getLevelCount(stage) > level && StageController.getStageCount() > stage;
		} else {
			return StageController.getStageCount() > stage;
		}
	},
	/** 
		@returns {number} the current level
	*/
	getCurrentLevel : function(){
		return StagesModel.currentLevel;
	},
	/** 
		@returns {number} the current stage
	*/
	getCurrentStage : function(){
		return StagesModel.currentStage;
	},
	/*=========================================================================
		STARS & LEVELING UP
	=========================================================================*/
	/** 
		@param {number} stage
		@param {number} level
		@returns {number}
	*/
	getLevelStars : function(stage, level){
		return StagesModel.getLevelStars(stage, level, false);
	},
	/** 
		sets the current level as solved
		@param {number} takes
		@returns {number} the number of stars
	*/
	currentLevelSolved : function(takes){
		//compute the stars for that number of takes
		var stars;
		if (takes === 1){
			stars = 3;
		} else if (takes < StageController.getNumberTakesAllowed() * .75){
			stars = 2;
		} else {
			stars = 1;
		}
		StagesModel.currentLevelSolved(stars);
		return stars;
	},
	/** 
		increment the count to the next level
	*/
	nextLevel : function(){
		StagesModel.nextLevel();;
	},
	/*=========================================================================
		LEVEL STATUS
	=========================================================================*/
	/** 
		locks the player out of the current stage for 5 minutes
	*/
	setCurrentLevelLockedOut : function(){
		StagesModel.setLevelLockOutTime(StageController.getCurrentStage(), StageController.getCurrentLevel(), Date.now(), true);
	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {number} the number of seconds left in the lock out
	*/
	getLockOutTime : function(stage, level){
		return StagesModel.getLevelLockOutTimeLeft(stage, level, false);
	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {StagesModel.STATUS|null}
	*/
	getLevelStatus : function(stage, level){
		//test if it's locked
		if (StagesModel.isLevelLockedOut(stage, level, false)){
			return StagesModel.STATUS.TIMEOUT;
		} else {
			return StagesModel.getLevelStatus(stage, level, false);
		}
	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {boolean} true if it's solved with 3 stars
	*/
	isLevelPerfect : function(stage, level){
		var stats = StagesModel.getLevelStatus(stage, level, false);
		var stars = StagesModel.getLevelStars(stage, level, false);
		return stats === StagesModel.STATUS.SOLVED && stars === 3;
	},
};
