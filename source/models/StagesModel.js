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

		// Get player data specific data
		var permanentStorage = window.localStorage;
		var solvedStages = {};
		var solvedLevels = [];

		var userSolvedLevels = JSON.parse(permanentStorage.getItem(StagesModel.LEVELSTATUS.SOLVED));
		// for the first time only
		if (!userSolvedLevels) {
			permanentStorage.setItem(StagesModel.LEVELSTATUS.SOLVED, "{}");
		} else {
			var solvedStages = userSolvedLevels;	
		}

		// set up completed levels array
		for ( var i=0; i<StagesModel.Stages.length; i++ ) {
			var stage = StagesModel.Stages[i];
			for ( var j=0; j<stage.levels.length; j++ ) {
				var level = stage.levels[j];
				// until we start taking the saved game state, we will start out with one available level
				level.status = (j==0) ? StagesModel.LEVELSTATUS.PLAYABLE : StagesModel.LEVELSTATUS.LOCKED;
				// saved level data
				var solvedLevels = solvedStages[i.toString()];
				if ( solvedLevels ) {
					if (solvedLevels.indexOf(j)>-1) {
						level.status = StagesModel.LEVELSTATUS.SOLVED;
					}
				}
				
				// for fun
				if ( j > 6 ) level.status = StagesModel.LEVELSTATUS.PAY;
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
		var stages = JSON.parse(permanentStorage.getItem(StagesModel.LEVELSTATUS.SOLVED));
		var levels = stages[stage];

		if ( !levels ) {
			levels = [];
		}

		levels.push(level);
		stages[stage] = levels;
		
		permanentStorage.setItem(StagesModel.LEVELSTATUS.SOLVED, JSON.stringify(stages));

	},
	/** 
		Set the current level to solved
	*/
	currentLevelSolved : function(){
		var s = StagesModel.currentStage;
		var l = StagesModel.currentLevel;

		StagesModel.setSolvedLevel( s, l );
		StagesModel.Stages[s].levels[l+1].status = StagesModel.LEVELSTATUS.PLAYABLE;
	}
};

/** @enum {string} */
StagesModel.LEVELSTATUS = {
	SOLVED : "solved", 	// has been solved
	LOCKED : "locked", 	// cannot be played
	PLAYABLE : "playable", 	// can be played but has not been solved
	PAY : "pay" 		// can be unlocked with a paid upgrade 
};

StagesModel.initialize();
