/*=============================================================================
	TUTORIAL MANAGER

	manages the onboarding experience
=============================================================================*/

goog.provide("managers.TutorialManager");

goog.require("ScreenText");
goog.require("goog.storage.mechanism.HTML5LocalStorage");

var TutorialManager = {
	/** @type {goog.storage.mechanism.HTML5LocalStorage} */
	storage : new goog.storage.mechanism.HTML5LocalStorage(),
	/** @type {string} */
	storageName : "OnBoarding",
	/** @param {Object} */
	onBoardingState : {},
	/** init */
	initialize : function(){
		//pull the local storage into the onBoardingState
		TutorialManager.onBoardingState = TutorialManager.getModelFromStorage();
	},
	/** 
		@param {number} stage
		@param {number} level
	*/
	setStage : function(stage, level){
		
	},
	/*=========================================================================
		LOCAL STORAGE
	=========================================================================*/
	/** 
		@param {string} attribute
		@param {*} value
		@param {boolean=} store
	*/
	setAttribute : function(attribute, value, store){
		TutorialManager.onBoardingState[attribute] = value;
		if (store){
			TutorialManager.storeModel();
		}
	},
	/** 
		stores everything in local storage
	*/
	storeModel : function(){
		TutorialManager.storage.set(TutorialManager.storageName, JSON.stringify(TutorialManager.onBoardingState));
	},
	/** 
		@suppress {checkTypes}
		@returns {Object | null} the stored object
	*/
	getModelFromStorage : function(){
		var storageString = TutorialManager.storage.get(TutorialManager.storageName);
		if (!goog.isNull(storageString)){
			return JSON.parse(storageString);
		} else {
			return null;
		}
	},
	/** 
		@param {string} attribute
		@param {boolean=} fromStorage
		@returns {*} the attribute requested
	*/
	getAttribute : function(attribute, fromStorage){
		var model = fromStorage ? TutorialManager.onBoardingState : TutorialManager.getModelFromStorage();
		if (model){
			return model.attribute;
		} else {
			return null;
		}
	},

}

TutorialManager.initialize();