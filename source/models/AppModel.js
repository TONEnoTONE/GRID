/*==========================================================================
 _______  _______  _______    __   __  _______  ______   _______  ___     
|   _   ||       ||       |  |  |_|  ||       ||      | |       ||   |    
|  |_|  ||    _  ||    _  |  |       ||   _   ||  _    ||    ___||   |    
|       ||   |_| ||   |_| |  |       ||  | |  || | |   ||   |___ |   |    
|       ||    ___||    ___|  |       ||  |_|  || |_|   ||    ___||   |___ 
|   _   ||   |    |   |      | ||_|| ||       ||       ||   |___ |       |
|__| |__||___|    |___|      |_|   |_||_______||______| |_______||_______|

===========================================================================*/

goog.provide("models.AppModel");

goog.require("game.controllers.StageController");

/** 
	@typedef {Object}
*/
var AppModel =  {
	/** @type {number} */
	currentStage : 0,
	/** @type {number} */
	currentLevel : 0,
	/** initializer */
	initialize : function(){
	},
	/** 
		goes to the next level
	*/
	nextLevel : function(){
		AppModel.currentLevel++;
		if (StageController.getLevelCount(AppModel.currentStage) <= AppModel.currentLevel){
			//increment the stage
			AppModel.currentStage++;
			AppModel.currentLevel = 0;
			if (StageController.getStageCount() <= AppModel.currentStage){
				alert("you won the game!");
			}
		}
	}

};
AppModel.initialize();