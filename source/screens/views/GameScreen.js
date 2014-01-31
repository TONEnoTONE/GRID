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

/** 
	@typedef {Object}
*/
var GameScreen = {
	/** @type {Element} */
	div : GridDom.GameScreen,
	/** @private 
		@type {Button} */
	playButton : null,
	//initialize
	initialize : function(){
		GameScreen.hideScreen();
		var b = new Button("", GameScreen.onBackButton, {"class" : "BackButton"});
		// goog.dom.appendChild(GameScreen.div, GameScreen.playButton.Element);
		goog.dom.appendChild(GameScreen.div, b.Element);
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
	},
	/** 
		Shows the screen
	*/
	showScreen : function(){
		goog.style.setElementShown(GameScreen.div, true);
		GameController.beforeVisible();
	},
	/** 
		called when the animation is over
	*/
	onShown : function(){
		//set the stage
		GameController.setStageAnimated(StagesModel.currentStage, StagesModel.currentLevel);
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