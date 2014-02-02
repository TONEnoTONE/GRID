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

goog.require("data.Stages");
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
	storageStagesName : "StagesStatus1",	
	/** initializer */
	initialize : function(){
		//setup the StagesStatus
		var stageCount = StagesModel.getStageCount();
		for (var stage=0; stage < stageCount; stage++) {
			StagesModel.setStageDefaults(stage);
			var levelCount = StagesModel.getLevelCount(stage);
			for ( var level = 0; level <levelCount; level++) {
				//set the default level status
				StagesModel.setLevelDefaults(stage, level);
			}
		}
		//store everything
		StagesModel.storeModel();
	},
	/** 
		pulls from local storage and sets the attribute if tehre is one, otherwise a default value
		@param {number} stage
		@param {number} level
	*/
	setLevelDefaults : function(stage, level){
		var levelStatus = StagesModel.getLevelStatus(stage, level, true);
		var defaultLevelStatus = ( level==0 ) ? StagesModel.STATUS.PLAYABLE : StagesModel.STATUS.LOCKED;
		StagesModel.setLevelStatus(stage, level, levelStatus || defaultLevelStatus, false);
		//if the level is solved, get the number of stars
		if (levelStatus === StagesModel.STATUS.SOLVED){
			var storedStars = StagesModel.getLevelStars(stage, level, true);
			var stars = storedStars || 1;
			StagesModel.setLevelStars(stage, level, stars, false);
		}
	},
	/** 
		pulls from local storage and sets the attribute if there is one, otherwise a default value
		@param {number} stage
	*/
	setStageDefaults : function(stage){
		var defaultStageStatus = ( stage==0 ) ? StagesModel.STATUS.PLAYABLE : StagesModel.STATUS.LOCKED;
		var stageStatus = StagesModel.getStageStatus(stage, true);
		StagesModel.setStageStatus(stage, stageStatus || defaultStageStatus, false);
	},
	/** 
		@param {number} stage
		@returns {number}
	*/
	getLevelCount : function(stage){
		return Stages[stage].levels.length;
	},
	/** 
		@returns {number}
	*/
	getStageCount : function(){
		return Stages.length;
	},
	/** 
		@param {number} stage
		return {string}
	*/
	getName : function(stage){
		return Stages[stage].name;
	},
	/*=========================================================================
		STAGE/LEVEL ATTRIBUTE GETTER/SETTER
	=========================================================================*/
	/** 
		@param {number} stage
		@param {string} attribute
		@param {*} value
		@param {boolean=} store
	*/
	setStageAttribute : function(stage, attribute, value, store){
		var stageName = StagesModel.getName(stage);
		if ( !goog.isDef(StagesModel.StagesStatus[stageName]) ){
			StagesModel.StagesStatus[stageName] = {};
		}
		StagesModel.StagesStatus[stageName][attribute] = value;	
		if (store){
			StagesModel.storeModel();
		}
	},
	/** 
		@param {number} stage
		@param {number} level
		@param {string} attribute
		@param {*} value
		@param {boolean=} store
	*/
	setLevelAttribute : function(stage, level, attribute, value, store){
		var stageName = StagesModel.getName(stage);
		if ( !goog.isDef(StagesModel.StagesStatus[stageName]) ){
			StagesModel.StagesStatus[stageName] = {};
		}
		if (!goog.isDef(StagesModel.StagesStatus[stageName]["levels"])){
			StagesModel.StagesStatus[stageName]["levels"] = [];
		} 
		if (!goog.isDef(StagesModel.StagesStatus[stageName]["levels"][level])){
			StagesModel.StagesStatus[stageName]["levels"][level] = {};
		} 
		StagesModel.StagesStatus[stageName]["levels"][level][attribute] = value;
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
		@param {boolean=} fromStorage
		@returns {Object|null} the stage representation
	*/
	getStageObject : function(stage, fromStorage){
		var stageStatus = fromStorage ?  StagesModel.getModelFromStorage() : StagesModel.StagesStatus;
		var stageName = StagesModel.getName(stage);
		if (stageStatus && stageStatus[stageName]) {
			return stageStatus[stageName];
		} else {
			return null;
		}
	},
	/** 
		@param {number} stage
		@param {number} level
		@param {string} attribute
		@param {boolean=} fromStorage
		@returns {*} the attribute requested
	*/
	getLevelAttribute : function(stage, level, attribute, fromStorage){
		var stageObj = StagesModel.getStageObject(stage, fromStorage);
		if (stageObj && stageObj["levels"] 
			&& stageObj["levels"][level] && stageObj["levels"][level][attribute]){
			return stageObj["levels"][level][attribute];
		} else {
			return null;
		}
	},
	/*=========================================================================
		COMPLETION
	=========================================================================*/
	/** 
		goes to the next level
		@returns {boolean} true if we've moved onto the next stage
	*/
	nextLevel : function(){
		StagesModel.currentLevel++;
		if (StagesModel.getLevelCount(StagesModel.currentStage) <= StagesModel.currentLevel){
			//increment the stage
			StagesModel.currentStage++;
			GridDom.setStageColor(StagesModel.currentStage);
			StagesModel.currentLevel = 0;
			if (StagesModel.getStageCount() <= StagesModel.currentStage){
				alert("you won the game!");
			}
			return true;
		}
		return false;
	},
	/** 
		Set the current level to solved
		@param {number} stars
	*/
	currentLevelSolved : function(stars){
		var stage = StagesModel.currentStage;
		var level = StagesModel.currentLevel;
		//set the stars
		StagesModel.setLevelStars(stage, level, stars, false);
		//set the status
		StagesModel.setLevelSolved(stage, level, false);
		//if there is a next level, it's playable
		var nextLevel = level+1;
		if (StagesModel.getLevelCount(stage) > nextLevel){
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
		if (StagesModel.getStageCount() > nextStage){
			StagesModel.setStagePlayable(nextStage, false);
		}
	},
	/*=========================================================================
		LEVEL STATUS
	=========================================================================*/
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
		StagesModel.setLevelAttribute(stage, level, "status", status, store);
	},
	/** 
		@param {number} stage
		@param {StagesModel.STATUS} status
		@param {boolean=} store
	*/
	setStageStatus : function(stage, status, store){
		StagesModel.setStageAttribute(stage, "status", status, store);
	},
	/** 
		@param {number} stage
		@param {number} level
		@param {boolean=} fromStorage
		@returns {StagesModel.STATUS|null} status
	*/
	getLevelStatus : function(stage, level, fromStorage){
		var status = /** @type {StagesModel.STATUS|null} */ (StagesModel.getLevelAttribute(stage, level, "status", fromStorage));
		return status;
	},
	/** 
		@param {number} stage
		@param {boolean=} fromStorage
		@returns {StagesModel.STATUS|null} status
	*/
	getStageStatus : function(stage, fromStorage){
		var stageObj = StagesModel.getStageObject(stage, fromStorage);
		if (stageObj && stageObj["status"]){
			return stageObj["status"];
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
		var levelCount = StagesModel.getLevelCount(stage);
		for (var level = 0; level < levelCount; level++){
			var levelStatus = StagesModel.getLevelStatus(stage, level, fromStorage);
			if (levelStatus === StagesModel.STATUS.SOLVED){
				completed++;
			}
		}
		return completed;
	},
	/*=========================================================================
		STARS
	=========================================================================*/
	/** 
		@param {number} stage
		@param {number} level
		@param {number} stars
		@param {boolean=} store
	*/
	setLevelStars : function(stage, level, stars, store){
		StagesModel.setLevelAttribute(stage, level, "stars", stars, store);
	},
	/** 
		@param {number} stage
		@param {number} level
		@param {boolean=} fromStorage
		@returns {number} the number of stars
	*/
	getLevelStars : function(stage, level, fromStorage){
		if (StagesModel.getLevelStatus(stage, level, fromStorage) === StagesModel.STATUS.SOLVED){
			var starNum = /** @type {number} */ (StagesModel.getLevelAttribute(stage, level, "stars", fromStorage));
			return starNum;
		} else {
			return 0;
		}
	},
	/*=========================================================================
		LOCK OUT
	=========================================================================*/
	/** 
		sets the current levele's lock out time to now
	*/
	setCurrentLevelLockedOut : function(){
		StagesModel.setLevelAttribute(StagesModel.currentStage, StagesModel.currentLevel, "lockouttime", Date.now(), true);
	},
	/** 
		@param {number} stage
		@param {number} level
		@param {boolean=} fromStorage
		@returns {number} the time the level was locked out
	*/
	getLevelLockOutTime : function(stage, level, fromStorage){
		var lockOutTime = /** @type {number} */ (StagesModel.getLevelAttribute(StagesModel.currentStage, StagesModel.currentLevel, "lockouttime", fromStorage));
		return lockOutTime;
	}
};

/** @enum {string} */
StagesModel.STATUS = {
	SOLVED : 	"solved", 	// has been solved
	LOCKED : 	"locked", 	// cannot be played
	PLAYABLE : 	"playable",	// can be played but has not been solved
	PAY : 		"pay" 		// can be unlocked with a paid upgrade 
};

StagesModel.initialize();
