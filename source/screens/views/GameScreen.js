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

goog.require("goog.dom");
goog.require("goog.style");

var GameScreen = {
	/** @private @type {Element} */
	div : null,
	initialize : function(){
		/** @type {Element} */
		GameScreen.div = goog.dom.createDom("div", {"id" : "GameScreen", "class" : "screen"}),
		//add the BoadView to the GameView
		goog.dom.appendChild(document.body, GameScreen.div);

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