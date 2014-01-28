/*=============================================================================
	PLAYER MODEL
=============================================================================*/

goog.provide("models.PlayerModel");

goog.require("game.controllers.StageController");
goog.require("goog.storage.mechanism.HTML5LocalStorage");

var PlayerModel = {
	/** @type {goog.storage.mechanism.HTML5LocalStorage} */
	storage : new goog.storage.mechanism.HTML5LocalStorage(),
	/** @type {Object} */
	state : {},
	/** @type {string}*/
	itemName : "PlayerModel",
	/** 
		initialize the storage
	*/
	initialize : function(){
		//setup the storage

		//get the state
		var state = PlayerModel.storage.get(PlayerModel.itemName);
		if (!state){
			//make one
			PlayerModel.storage.set(PlayerModel.itemName, PlayerModel.getDefaultPlayerModel());
		} else {
			//load it into the state
			PlayerModel.state = state;
		}
	},
	/** 
		@returns {string} the default player storage
	*/
	getDefaultPlayerModel : function(){
		var state = { "stages" : {} };
		return JSON.stringify(state);
	},
	/** 
		@param {number} stage
		@returns {Object} the way the stage is stored in local storage
	*/
	getStage : function(stage){

	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {Object} the way the level is stored in local storage
	*/
	getLevel : function(stage, level){

	},
	/** 
		@param {number} stage
		@returns {StagesModel.STATUS}
	*/
	getStageStatus : function(stage){

	},
	/** 
		@param {number} stage
		@param {number} level
		@returns {StagesModel.STATUS}
	*/
	getLevelStatus : function(stage, level){

	},
	/** 
		@param {number} stage
	*/
	setStageStatus : function(stage){

	},
	/** 
		@param {number} stage
		@param {number} level
	*/
	setLevelStatus : function(stage, level){

	},
}

PlayerModel.initialize();