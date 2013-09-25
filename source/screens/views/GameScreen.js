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
goog.require("goog.dom");
goog.require("goog.style");
goog.require("game.controllers.GameController");

var GameScreen = {
	/** @private @type {Element} */
	div : GridDom.GameScreen,
	initialize : function(){
		GameScreen.hideScreen();
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
	}
};
GameScreen.initialize();