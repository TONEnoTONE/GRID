/*=============================================================================
 _______  ______    ___   ______     ______   _______  __   __ 
|       ||    _ |  |   | |      |   |      | |       ||  |_|  |
|    ___||   | ||  |   | |  _    |  |  _    ||   _   ||       |
|   | __ |   |_||_ |   | | | |   |  | | |   ||  | |  ||       |
|   ||  ||    __  ||   | | |_|   |  | |_|   ||  |_|  ||       |
|   |_| ||   |  | ||   | |       |  |       ||       || ||_|| |
|_______||___|  |_||___| |______|   |______| |_______||_|   |_|

why is this here?

good question. instead of tying the code to a particular dom state, we can generate 
the dom here and only make JS refernces to it. 

basically. another level of abstraction. and you don't need to touch the dom. 

and it fixes some circular dependency issues
=============================================================================*/

goog.provide("screens.views.GridDom");

goog.require("goog.dom");

/** 
	@const
	@typedef {Object}
*/
var GridDom = {
	//the top level elements
	/** @type {Element} */
	PhoneWrapper : goog.dom.createDom("div", {"id" : "PhoneWrapper"}),
	/** @type {Element} */
	GameScreen : goog.dom.createDom("div", {"id" : "GameScreen", "class" : "screen"}),
	/** @type {Element} */
	PartsScreen : goog.dom.createDom('div', {'id': 'PartsScreen', 'class': 'screen'}),
	/** @type {Element} */
	SplashScreen : goog.dom.createDom('div', {'id': 'splash', 'class': 'screen'}, 'splash'),
	//add them in the right places
	initialize : function(){
		goog.dom.appendChild(document.body, GridDom.PhoneWrapper);
		goog.dom.appendChild(GridDom.PhoneWrapper, GridDom.GameScreen);
		goog.dom.appendChild(GridDom.PhoneWrapper, GridDom.PartsScreen);
		goog.dom.appendChild(GridDom.PhoneWrapper, GridDom.SplashScreen);
	}
}

GridDom.initialize();