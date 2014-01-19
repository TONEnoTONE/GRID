/*===================================================================================================
 _______  _______  _______  _______  _______  _______  __   __  _______  ______   _______  ___     
|       ||       ||   _   ||       ||       ||       ||  |_|  ||       ||      | |       ||   |    
|  _____||_     _||  |_|  ||    ___||    ___||  _____||       ||   _   ||  _    ||    ___||   |    
| |_____   |   |  |       ||   | __ |   |___ | |_____ |       ||  | |  || | |   ||   |___ |   |    
|_____  |  |   |  |       ||   ||  ||    ___||_____  ||       ||  |_|  || |_|   ||    ___||   |___ 
 _____| |  |   |  |   _   ||   |_| ||   |___  _____| || ||_|| ||       ||       ||   |___ |       |
|_______|  |___|  |__| |__||_______||_______||_______||_|   |_||_______||______| |_______||_______|
=====================================================================================================*/

goog.provide("models.StagesModel");

goog.require("data.Stages");
goog.require("data.TestStages");
goog.require("data.Const");

/** 
	@typedef {Object}
*/
var StagesModel =  {
	/** @type {number} */
	currentStage : 0,
	/** @type {number} */
	currentLevel : 0,
	/** @type {Array} */
	Stages : Stages,
	/** @type {Array} */
	TestStages : TestStages,
	/** @type {Array} */
	//Levels : [],
	
	/** initializer */
	initialize : function(){
		// Get raw data from LoadingManager 

		// Get player data for levels. 
		var permanentStorage = window.localStorage;
		var solvedStages = {};
		var solvedLevels = [];
		var userSolvedLevels = permanentStorage.getItem("player");

		// for the first time only
		if (!userSolvedLevels) {
			userSolvedLevels = '{"stages" : []}';
			permanentStorage.setItem("player", userSolvedLevels);
			StagesModel.setPlayableLevel(0,0);
		} 

		var playerData = JSON.parse(userSolvedLevels);

		// set up completed levels array
		for ( var i=0; i<StagesModel.Stages.length; i++ ) {
			var stage = StagesModel.Stages[i];
			for ( var j=0; j<stage.levels.length; j++ ) {
				var level = stage.levels[j];
				// default
				level['status'] = ( j==0 ) ? StagesModel.LEVELSTATUS.PLAYABLE : StagesModel.LEVELSTATUS.LOCKED;
				
				// saved level data
				var solvedStage = playerData['stages'][i.toString()];
				if ( solvedStage ) {
				 	var solvedLevel = solvedStage['levels'][j.toString()];
				 	if ( solvedLevel ) {
				 		level['status'] = solvedLevel;
				 	}
				}
			}
		}
	},
	/** 
		goes to the next level
	*/
	nextLevel : function(){
		StagesModel.currentLevel++;
		if (StageController.getLevelCount(StagesModel.currentStage) <= StagesModel.currentLevel){
			//increment the stage
			StagesModel.currentStage++;
			StagesModel.currentLevel = 0;
			if (StageController.getStageCount() <= StagesModel.currentStage){
				alert("you won the game!");
			}
		}
	},
	/** 
		Set the completed stage and level on the model
		@param {number} stage
		@param {number} level
	*/
	setSolvedLevel : function(stage, level){
		StagesModel.setLevelStatus(stage, level, StagesModel.LEVELSTATUS.SOLVED);
	},
	/** 
		Set a playable stage and level on the model
		@param {number} stage
		@param {number} level
	*/
	setPlayableLevel : function(stage, level){
		//if this level has been solved, get outta here
		var levelStatus = StagesModel.getLevelStatus(stage, level);
		if (levelStatus == StagesModel.LEVELSTATUS.SOLVED || levelStatus == null) {
			return;
		}
		StagesModel.setLevelStatus(stage, level, StagesModel.LEVELSTATUS.PLAYABLE);
	},
	/** 
		@param {number} stage
		@param {number} level
		@param {string} status
	*/
	setLevelStatus : function(stage, level, status){
		var permanentStorage = window.localStorage;
		var savedPlayerData = permanentStorage.getItem("player");
		if ( savedPlayerData ) {
			var player = JSON.parse(savedPlayerData);
			
			if ( !goog.isDef(player['stages']) ){
				player['stages'] = {};
				player['stages'][stage] = { "levels" : {} };
				player['stages'][stage]["levels"][level.toString()] = status;
			} else if (!goog.isDef(player['stages'][stage])){
				player['stages'][stage] = { "levels" : {} };
				player['stages'][stage]["levels"][level.toString()] = status;
			} else {
				player['stages'][stage]["levels"][level.toString()] = status;
			}

			permanentStorage.setItem("player", JSON.stringify(player));
		}
		StagesModel.Stages[stage].levels[level].status = status;
	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {string} status
	*/
	getLevelStatus : function(stage, level){
		if (StagesModel.Stages[stage] && StagesModel.Stages[stage].levels[level]) {
			return StagesModel.Stages[stage].levels[level].status;
		} else {
			return null;
		}
	},
	/** 
		Set the current level to solved
	*/
	currentLevelSolved : function(){
		var s = StagesModel.currentStage;
		var l = StagesModel.currentLevel;

		StagesModel.setSolvedLevel( s, l );
		//and the next level, assuming there is one, to playable
		StagesModel.setPlayableLevel( s, l+1 );
	}
};

/** @enum {string} */
StagesModel.LEVELSTATUS = {
	SOLVED : 	"solved", 	// has been solved
	LOCKED : 	"locked", 	// cannot be played
	PLAYABLE : 	"playable",	// can be played but has not been solved
	PAY : 		"pay" 		// can be unlocked with a paid upgrade 
};

StagesModel.initialize();
