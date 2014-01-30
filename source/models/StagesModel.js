/*===================================================================================================
 _______  _______  _______  _______  _______  _______  __   __  _______  ______   _______  ___     
|       ||       ||   _   ||       ||       ||       ||  |_|  ||       ||      | |       ||   |    
|  _____||_     _||  |_|  ||    ___||    ___||  _____||       ||   _   ||  _    ||    ___||   |    
| |_____   |   |  |       ||   | __ |   |___ | |_____ |       ||  | |  || | |   ||   |___ |   |    
|_____  |  |   |  |       ||   ||  ||    ___||_____  ||       ||  |_|  || |_|   ||    ___||   |___ 
 _____| |  |   |  |   _   ||   |_| ||   |___  _____| || ||_|| ||       ||       ||   |___ |       |
|_______|  |___|  |__| |__||_______||_______||_______||_|   |_||_______||______| |_______||_______|

contains all of the solved/playable/payable data for each of the stages
=====================================================================================================*/

goog.provide("models.StagesModel");

goog.require("game.controllers.StageController");
goog.require("data.TestStages");
goog.require("data.Const");
goog.require("goog.storage.mechanism.HTML5LocalStorage");

/** 
	@typedef {Object}
*/
var StagesModel =  {
	/** @type {number} */
	currentStage : 0,
	/** @type {number} */
	currentLevel : 0,
	/** @type {Object} */
	StagesStatus : {},
	/** @type {goog.storage.mechanism.HTML5LocalStorage} */
	storage : new goog.storage.mechanism.HTML5LocalStorage(),
	/** @type {string}*/
	storageStagesName : "StagesStatus",	
	/** initializer */
	initialize : function(){
		
		var StagesFromLocalStorage = StagesModel.storage.get(StagesModel.storageStagesName);

		//setup the StagesStatus
		var stageCount = StageController.getStageCount();
		for (var stage=0; stage < stageCount; stage++) {
			var levelCount = StageController.getLevelCount(stage);
			var defaultStageStatus = ( stage==0 ) ? StagesModel.STATUS.PLAYABLE : StagesModel.STATUS.LOCKED;
			var stageStatus = StagesModel.getStageStatus(stage, true);
			StagesModel.setStageStatus(stage, stageStatus || defaultStageStatus, false);
			//and the stage status
			for ( var level = 0; level <levelCount; level++) {
				// default status
				var levelStatus = StagesModel.getLevelStatus(stage, level, true);
				var defaultLevelStatus = ( level==0 ) ? StagesModel.STATUS.PLAYABLE : StagesModel.STATUS.LOCKED;
				StagesModel.setLevelStatus(stage, level, levelStatus || defaultLevelStatus, false)
			}
		}
		//store everything
		StagesModel.storeModel();
	},
	/** 
		goes to the next level
		@returns {boolean} true if we've moved onto the next stage
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
			return true;
		}
		return false;
	},
	/** 
		Set the completed stage and level on the model
		@param {number} stage
		@param {number} level
		@param {boolean=} store
	*/
	setLevelSolved : function(stage, level, store){
		StagesModel.setLevelStatus(stage, level, StagesModel.STATUS.SOLVED, store);
	},
	/** 
		Set a playable stage and level on the model
		@param {number} stage
		@param {number} level
		@param {boolean=} store
	*/
	setLevelPlayable : function(stage, level, store){
		//if this level has been solved, get outta here
		var levelStatus = StagesModel.getLevelStatus(stage, level);
		if (levelStatus === StagesModel.STATUS.LOCKED) {
			StagesModel.setLevelStatus(stage, level, StagesModel.STATUS.PLAYABLE, store);
		}	
	},
	/** 
		Set the completed stage and level on the model
		@param {number} stage
		@param {boolean=} store
	*/
	setStageSolved : function(stage, level, store){
		StagesModel.setStageStatus(stage, StagesModel.STATUS.SOLVED, store);
	},
	/** 
		set the stage as playable
		@param {number} stage
		@param {boolean=} store
	*/
	setStagePlayable : function(stage, store){
		//if this level has been solved, get outta here
		var stageStatus = StagesModel.getStageStatus(stage);
		if (stageStatus === StagesModel.STATUS.LOCKED) {
			StagesModel.setStageStatus(stage, StagesModel.STATUS.PLAYABLE, store);
		}	
	},
	/** 
		@param {number} stage
		@param {number} level
		@param {StagesModel.STATUS} status
		@param {boolean=} store
	*/
	setLevelStatus : function(stage, level, status, store){
		var stageName = StageController.getName(stage);
		if ( !goog.isDef(StagesModel.StagesStatus[stageName]) ){
			StagesModel.StagesStatus[stageName] = {};
		}
		if (!goog.isDef(StagesModel.StagesStatus[stageName]["levels"])){
			StagesModel.StagesStatus[stageName]["levels"] = [];
		} 
		StagesModel.StagesStatus[stageName]["levels"][level] = status;
		if (store){
			StagesModel.storeModel();
		}
	},
	/** 
		@param {number} stage
		@param {StagesModel.STATUS} status
		@param {boolean=} store
	*/
	setStageStatus : function(stage, status, store){
		var stageName = StageController.getName(stage);
		if ( !goog.isDef(StagesModel.StagesStatus[stageName]) ){
			StagesModel.StagesStatus[stageName] = {};
		}
		StagesModel.StagesStatus[stageName]["status"] = status;	
		if (store){
			StagesModel.storeModel();
		}
	},
	/** 
		stores everything in local storage
	*/
	storeModel : function(){
		StagesModel.storage.set(StagesModel.storageStagesName, JSON.stringify(StagesModel.StagesStatus));
	},
	/** 
		@suppress {checkTypes}
		@returns {Object | null} the stored object
	*/
	getModelFromStorage : function(){
		var storageString = StagesModel.storage.get(StagesModel.storageStagesName);
		if (!goog.isNull(storageString)){
			return JSON.parse(storageString);
		} else {
			return null;
		}
	},
	/** 
		@param {number} stage
		@param {number} level
		@param {boolean=} fromStorage
		@returns {StagesModel.STATUS|null} status
	*/
	getLevelStatus : function(stage, level, fromStorage){
		var stageStatus = fromStorage ?  StagesModel.getModelFromStorage() : StagesModel.StagesStatus;
		var stageName = StageController.getName(stage);
		if (stageStatus && stageStatus[stageName] && stageStatus[stageName]["levels"] && stageStatus[stageName]["levels"][level]) {
			return stageStatus[stageName]["levels"][level];
		} else {
			return null;
		}
	},
	/** 
		@param {number} stage
		@param {boolean=} fromStorage
		@returns {StagesModel.STATUS|null} status
	*/
	getStageStatus : function(stage, fromStorage){
		var stageStatus = fromStorage ?  StagesModel.getModelFromStorage() : StagesModel.StagesStatus;
		var stageName = StageController.getName(stage);
		if (stageStatus && stageStatus[stageName]) {
			return stageStatus[stageName].status;
		} else {
			return null;
		}
	},
	/** 
		@param {number} stage
		@param {boolean=} fromStorage
		@returns {number} the number of levels completed
	*/
	getCompletedLevelCount : function(stage, fromStorage){
		var completed = 0;
		var levelCount = StageController.getLevelCount(stage);
		for (var level = 0; level < levelCount; level++){
			var levelStatus = StagesModel.getLevelStatus(stage, level, fromStorage);
			if (levelStatus === StagesModel.STATUS.SOLVED){
				completed++;
			}
		}
		return completed;
	},
	/** 
		Set the current level to solved
	*/
	currentLevelSolved : function(){
		var stage = StagesModel.currentStage;
		var level = StagesModel.currentLevel;
		StagesModel.setLevelSolved(stage, level, false);
		//if there is a next level, it's playable
		var nextLevel = level+1;
		if (StageController.getLevelCount(stage) > nextLevel){
			StagesModel.setLevelPlayable(stage, nextLevel, false);
		} else { //otherwise, the stage is solved
			StagesModel.currentStageSolved();
		}
		StagesModel.storeModel();
	},
	/** 
		set hte current stage as solved and the next one as playable
	*/
	currentStageSolved : function(){
		var stage = StagesModel.currentStage;
		StagesModel.setStageSolved(stage, false);
		var nextStage = stage + 1;
		if (StageController.isInRange(nextStage)){
			StagesModel.setStagePlayable(nextStage, false);
		}
	},
};

/** @enum {string} */
StagesModel.STATUS = {
	SOLVED : 	"solved", 	// has been solved
	LOCKED : 	"locked", 	// cannot be played
	PLAYABLE : 	"playable",	// can be played but has not been solved
	PAY : 		"pay" 		// can be unlocked with a paid upgrade 
};

StagesModel.initialize();
