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

/** 
	@typedef {Object}
*/
var GameScreen = {
	/** @type {Element} */
	div : GridDom.GameScreen,
	/** 
		@private 
		@type {Button}
	*/
	playButton : null,
	//initialize
	initialize : function(){
		GameScreen.hideScreen();
		GameScreen.playButton = new Button("PLAY", GameScreen.playHit);
		
		var b = new Button("", GameScreen.onBackButton, "BackButton");

		goog.dom.appendChild(GameScreen.div, GameScreen.playButton.Element);
		goog.dom.appendChild(GameScreen.div, b.Element);
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
	},
	/** 
		Hides the screen
	*/
	hideScreen : function(){
		goog.style.setElementShown(GameScreen.div, false);
	},
	/** 
		@param {Button} button
	*/
	playHit : function(button){
		if (!GameController.playing){
			GameController.play();
			button.setCopy("STOP");
			goog.dom.classes.add(button.Element, "playing");
		} else {
			GameController.stop();
			button.setCopy("PLAY");
			goog.dom.classes.remove(button.Element, "playing");
		}
	}
};
GameScreen.initialize();