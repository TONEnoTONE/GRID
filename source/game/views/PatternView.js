/*=============================================================================
 _______  _______  _______  _______  _______  ______    __    _    __   __  ___   _______  _     _ 
|       ||   _   ||       ||       ||       ||    _ |  |  |  | |  |  | |  ||   | |       || | _ | |
|    _  ||  |_|  ||_     _||_     _||    ___||   | ||  |   |_| |  |  |_|  ||   | |    ___|| || || |
|   |_| ||       |  |   |    |   |  |   |___ |   |_||_ |       |  |       ||   | |   |___ |       |
|    ___||       |  |   |    |   |  |    ___||    __  ||  _    |  |       ||   | |    ___||       |
|   |    |   _   |  |   |    |   |  |   |___ |   |  | || | |   |   |     | |   | |   |___ |   _   |
|___|    |__| |__|  |___|    |___|  |_______||___|  |_||_|  |__|    |___|  |___| |_______||__| |__|

the container of all the pattern elements in the GameScreen
=============================================================================*/


goog.provide("game.views.PatternView");

goog.require("screens.views.GridDom");
goog.require("screens.views.Button");
//goog.require("managers.AppState");

/** 
	@typedef {Object}
*/
var PatternView = {
	/** @type {Element} */
	Element : goog.dom.createDom("div", {"id" : "PatternView"}),
	initialize : function(){
		//add the element to the dom
		goog.dom.appendChild(GridDom.GameScreen, PatternView.Element);
	}
};

PatternView.initialize();