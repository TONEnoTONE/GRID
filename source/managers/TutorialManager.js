/*=============================================================================
	TUTORIAL MANAGER

	manages the onboarding experience
=============================================================================*/

goog.provide("managers.TutorialManager");

var TutorialManager = {
	/** @param {boolean} */
	onBoarding : true,
	/** init */
	initialize : function(){
		//decide whether or not we're still onboarding
	},
	/** 
		@param {number} stage
		@param {number} level
	*/
	setStage : function(){
		if (TutorialManager.onBoarding){
			
		}
	}
}

TutorialManager.initialize();