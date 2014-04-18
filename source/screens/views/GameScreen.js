/*==========================================================================================
 _______  _______  __   __  _______  _______  _______  ______    _______  _______  __    _ 
|       ||   _   ||  |_|  ||       ||       ||       ||    _ |  |       ||       ||  |  | |
|    ___||  |_|  ||       ||    ___||  _____||       ||   | ||  |    ___||    ___||   |_| |
|   | __ |       ||       ||   |___ | |_____ |       ||   |_||_ |   |___ |   |___ |       |
|   ||  ||       ||       ||    ___||_____  ||      _||    __  ||    ___||    ___||  _    |
|   |_| ||   _   || ||_|| ||   |___  _____| ||     |_ |   |  | ||   |___ |   |___ | | |   |
|_______||__| |__||_|   |_||_______||_______||_______||___|  |_||_______||_______||_|  |__|

==========================================================================================*/

goog.provide("screens.views.GameScreen");

goog.require("screens.views.GridDom");
goog.require("screens.views.Button");
goog.require("goog.dom");
goog.require("goog.style");
goog.require("game.controllers.GameController");
goog.require("game.controllers.StageController");
goog.require("managers.Analytics");

/** 
	@typedef {Object}
*/
var GameScreen = {
	/** @type {Element} */
	div : GridDom.GameScreen,
	/** @private 
		@type {Button} */
	playButton : null,
	/** @private 
		@type {Button} */
	backButton : null,
	/** @type {Button} */
	questionMark : new Button("", TutorialManager.onQuestionMark, {"id" : "TutorialQuestionMark", "class" : "fa fa-question-circle"}),
	//initialize
	initialize : function(){
		GameScreen.hideScreen();
		GameScreen.backButton = new Button("", GameScreen.onBackButton, {"class" : "BackButton fa fa-angle-left"});
		// goog.dom.appendChild(GameScreen.div, GameScreen.playButton.Element);
		goog.dom.appendChild(GameScreen.div, GameScreen.backButton.Element);
		goog.dom.appendChild(GameScreen.div, GameScreen.questionMark.Element);
		//prevent it from bouncing
		goog.events.listen(GameScreen.div, [goog.events.EventType.TOUCHMOVE], GameScreen.clicked);
	},
	/**
		@param {goog.events.BrowserEvent} e
	*/
	clicked : function(e){
		e.preventDefault();
	},
	/** 
		callback for the back button
		@param {Button} button
	*/
	onBackButton : function(button) {
		AppState.fsm["showparts"]();
		Analytics.trackEvent('menu', 'game', 'back');
	},
	/** 
		Shows the screen
	*/
	showScreen : function(){
		// track that we are here
		goog.style.setElementShown(GameScreen.div, true);
		GameController.beforeVisible();
		TutorialManager.onGameScreen();
	},
	/** 
		called when the animation is over
	*/
	onShown : function(){
		//set the stage
		GameController.setStageAnimated(StageController.getCurrentStage(), StageController.getCurrentLevel());
	},
	/** 
		conditionally set training wheels (pattern hints) if the stage
		@param {boolean} useHints
	*/
	showHints : function(useHints){
		//add the training wheels or not
		if (useHints){
			goog.dom.classes.remove(GameScreen.div, "NoTrainingWheels");
		} else {
			goog.dom.classes.add(GameScreen.div, "NoTrainingWheels");
		}
	},
	/** 
		Hides the screen
	*/
	hideScreen : function(){
		goog.style.setElementShown(GameScreen.div, false);
		//make sure the game is stopped
		GameController.stopGame();
	},
	/** 
		sets the state of the button
	*/
	setButton : function(state){

	}
};
GameScreen.initialize();