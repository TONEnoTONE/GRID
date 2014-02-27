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
	/** 
		@param {function(number)} callback
	*/
	forEachStage : function(callback){
		var stageCount = StageController.getStageCount();
		for (var stage = 0; stage < stageCount; stage++){
			callback(stage);
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
		if (levelDef.walls){
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
	/** 
		@param {number} stage
		@param {number} level
		@returns {Array} the level layout array
	*/
	getLevelLayout : function(stage, level){
		var levelDef = StageController.Stages[stage].levels[level];
		return levelDef.layout;
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
		//sort the pieces
		var pieces = levelDef.pieces;
		var piecesArray = PieceType.toArray();
		pieces.sort(function(a, b){
			return  piecesArray.indexOf(b) - piecesArray.indexOf(a);
		});
		return pieces;
	},
	/** 
		@returns {number} the number of takes allowed in the stage
	*/
	getNumberTakesAllowed : function(){
		//if it's defined in the stage, use that
		var stage = StageController.getCurrentStage();
		var level = StageController.getCurrentLevel();
		var stageDef = StageController.Stages[stage];
		if (stageDef.takes){
			return stageDef.takes;
		} else {
			//otherwise, default
			return 10;
			// return 2;
		}
	},
	/*=========================================================================
		STAGE ATTRIBUTES
	=========================================================================*/
	/** 
		@param {number} stage
		@param {number} level
		@returns {number} the bpm of the stage
	*/
	getBpm: function(stage, level){
		return StageController.getStageBpm(stage) * StageController.getTempoMultiplier(stage, level);
	},
	/** 
		@param {number} stage
		@returns {number} the stage tempo
	*/
	getStageBpm : function(stage){
		var stageDef = StageController.Stages[stage];
		return stageDef.bpm;
	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {number} the tempo multipler
	*/
	getTempoMultiplier: function(stage, level){
		var levelDef = StageController.Stages[stage].levels[level];
		var mult = levelDef.multiplier || 1;
		return mult;
	},
	/** 
		@param {number} stage
		@returns {PieceType} the color of the stage
	*/
	getStageColor : function(stage){
		var colors = PieceType.toArray();
		return colors[stage % colors.length];
		// return StageController.Stages[stage].color;
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
		@returns {Array}
	*/
	getPatternHits : function(stage, level){
		var hits = StageController.Stages[stage].levels[level].pattern;
		return hits;
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
			//if it's a user pattern, make sure those samples exist, otherwise use the stage pattern
			var samples = StageController.getSamples(stage, level);
			goog.array.forEach(hits, function(hit){
				if (hit !== "rest"){
					if (!goog.isDef(samples[hit])){
						//if the sample is missing
						//the level may have moved, 
						//use the stage pattern instead
						hits = stagePattern;
					}
				}
			});
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
	/** 
		@param {number} stage
		@param {number} level
		@returns {boolean} if the level has a user pattern
	*/
	isUserPattern : function(stage, level){
		return StageController.getLevelStars(stage, level) === 3 && !StageController.getPattern(stage, level).isEmpty();
	},
	/*=========================================================================
		LEVEL/STAGE NUMBER
	=========================================================================*/
	/** 
		@returns {number} the number of levels in the game
	*/
	getTotalLevelCount : function(){
		var stageCount = StageController.getStageCount();
		var total = 0; 
		for (var stage = 0; stage < stageCount; stage++){
			total += StageController.getLevelCount(stage);
		}
		return total;
	},
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
		} else if (takes < StageController.getNumberTakesAllowed() * .5){
			stars = 2;
		} else {
			stars = 1;
		}
		StagesModel.currentLevelSolved(stars);
		//let analytics know
		Analytics.trackGameAction("level_solved");
		Analytics.trackGameAction("takes", takes);
		return stars;
	},
	/** 
		increment the count to the next level
		@returns {boolean} true if it's onto the next song
	*/
	nextLevel : function(){
		var nextSong = StagesModel.nextLevel();
		return nextSong;
	},
	/*=========================================================================
		LEVEL STATUS
	=========================================================================*/
	/** 
		locks the player out of the current stage for 5 minutes
	*/
	setCurrentLevelLockedOut : function(){
		var stage = StageController.getCurrentStage();
		var level = StageController.getCurrentLevel();
		if (!StagesModel.isLevelLockedOut(stage, level, false)){
			StagesModel.setLevelLockOutTime(stage, level, Date.now(), true);
		}
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
	/** 
		@param {number} stage
		@param {number} level
		@returns {boolean} true if it's status is TIMEOUT
	*/
	isLevelTimedOut : function(stage, level){
		return StagesModel.isLevelLockedOut(stage, level, false);
	},
	/** 
		@param {number} stage
		@returns {number} the number of solved levels in the stage
	*/
	getSolvedLevelCount : function(stage){
		var solvedLevels = 0;
		StageController.forEachSolvedLevel(stage, function(level){
			solvedLevels++;
		});
		return solvedLevels;
	},
	/** 
		@param {number} stage
		@returns {boolean} true if the stage is solved
	*/
	isStageSolved : function(stage){
		var stageStatus = StagesModel.getStageStatus(stage);
		return stageStatus === StagesModel.STATUS.SOLVED;
	},
	/** 
		@param {number} stage
		@returns {boolean} true if the stage is solved
	*/
	isStagePlayable : function(stage){
		var stageStatus = StagesModel.getStageStatus(stage);
		return stageStatus === StagesModel.STATUS.PLAYABLE;
	},
	/*=========================================================================
		STATS
	=========================================================================*/
	/** 
		@returns {number} the number of solved stages
	*/
	getTotalSolvedLevelCount : function(){
		var solvedLevels = 0;
		StageController.forEachStage(function(stage){
			solvedLevels += StageController.getSolvedLevelCount(stage);
		});
		return solvedLevels;
	},
	/** 
		@returns {number} the number of stars the player has
	*/
	getTotalStars : function(){
		var totalStars = 0;
		StageController.forEachStage(function(stage){
			StageController.forEachSolvedLevel(stage, function(level){
				totalStars += StageController.getLevelStars(stage, level);
			});
		});
		return totalStars;
	},
	/** 
		@returns {number} the number of stars the player has
	*/
	getThreeStarCount : function(){
		var threeStarLevels = 0;
		StageController.forEachStage(function(stage){
			StageController.forEachSolvedLevel(stage, function(level){
				if (StageController.getLevelStars(stage, level) === 3){
					threeStarLevels++;
				}
			});
		});
		return threeStarLevels;
	},
	/** 
		@returns {Array} the number of levels at each star
	*/
	getStarDistribution : function(){
		var levelStars = [0, 0, 0];
		StageController.forEachStage(function(stage){
			StageController.forEachSolvedLevel(stage, function(level){
				var stars = StageController.getLevelStars(stage, level) - 1;
				levelStars[stars]++;
			});
		});
		return levelStars;
	},
	/** 
		@returns {number} the number user patterns
	*/
	getTotalUserPatterns : function(){
		var userPatterns = 0;
		StageController.forEachStage(function(stage){
			StageController.forEachSolvedLevel(stage, function(level){
				if (StageController.isUserPattern(stage, level)){
					userPatterns++;
				}
			});
		});
		return userPatterns;
	}
};
