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
			permanentStorage.setItem("player", "{}");
			StagesModel.setPlayableLevel(0,0);

		}

		userSolvedLevels = permanentStorage.getItem("player");
		
		if (userSolvedLevels) {
			var playerData = JSON.parse(userSolvedLevels);
		} else {
			// assert some error
		}

		// set up completed levels array
		for ( var i=0; i<StagesModel.Stages.length; i++ ) {
			var stage = StagesModel.Stages[i];
			for ( var j=0; j<stage.levels.length; j++ ) {
				var level = stage.levels[j];
				// default
				level.status = ( j==0 ) ? StagesModel.LEVELSTATUS.PLAYABLE : StagesModel.LEVELSTATUS.LOCKED;
				
				// saved level data
				var solvedStage = playerData.stages[i.toString()];
				if ( solvedStage ) {
					var solvedLevel = solvedStage.levels[j.toString()];
					if ( solvedLevel ) {
						level.status = solvedLevel;
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
		StagesModel.Stages[stage].levels[level].status = StagesModel.LEVELSTATUS.SOLVED;
		var permanentStorage = window.localStorage;
		var savedPlayerData = permanentStorage.getItem("player");
		if ( savedPlayerData ) {
			var player = JSON.parse(savedPlayerData);
			
			if ( !player["stages"]) {
				player.stages = {};
				player.stages[stage] = { "levels" : {} };
				player.stages[stage].levels[level.toString()] = StagesModel.LEVELSTATUS.SOLVED;
			} else {
				player.stages[stage]["levels"][level.toString()] = StagesModel.LEVELSTATUS.SOLVED;
			}
			
			permanentStorage.setItem("player", JSON.stringify(player));
		}
	},
	/** 
		Set a playable stage and level on the model
		@param {number} stage
		@param {number} level
	*/
	setPlayableLevel : function(stage, level){
		// if this level has been solved, get outta here
		if (StagesModel.Stages[stage].levels[level].status == StagesModel.LEVELSTATUS.SOLVED ) {
			return;
		}

		var permanentStorage = window.localStorage;
		var savedPlayerData = permanentStorage.getItem("player");
		if ( savedPlayerData ) {
			var player = JSON.parse(savedPlayerData);
			
			if ( !player["stages"]) {
				player.stages = {};
				player.stages[stage] = { "levels" : {} };
				player.stages[stage].levels[level.toString()] = StagesModel.LEVELSTATUS.PLAYABLE;
			} else {
				player.stages[stage]["levels"][level.toString()] = StagesModel.LEVELSTATUS.PLAYABLE;
			}
			
			permanentStorage.setItem("player", JSON.stringify(player));
		}


		StagesModel.Stages[stage].levels[level].status = StagesModel.LEVELSTATUS.PLAYABLE;
	},
	/** 
		Set the current level to solved
	*/
	currentLevelSolved : function(){
		var s = StagesModel.currentStage;
		var l = StagesModel.currentLevel;

		StagesModel.setSolvedLevel( s, l );
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
