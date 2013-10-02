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
goog.require("data.Config");

/** 
	@const
	@typedef {Object}
*/
var GridDom = {
	//the top level elements
	/** @type {Element} */
	Shell : goog.dom.createDom("div", {"id" : "Shell"}),
	/** @type {Element} */
	PhoneWrapper : goog.dom.createDom("div", {"id" : "PhoneWrapper"}),
	/** @type {Element} */
	PhoneScreen : goog.dom.createDom("div", {"id" : "PhoneScreen"}),
	/** @type {Element} */
	//TopNav : goog.dom.createDom("div", {"class" : "TopNav"}),
	/** @type {Element} */
	GameScreen : goog.dom.createDom("div", {"id" : "GameScreen", "class" : "screen"}),
	/** @type {Element} */
	PartsScreen : goog.dom.createDom('div', {'id': 'PartsScreen', 'class': 'screen'}),
	/** @type {Element} */
	SplashScreen : goog.dom.createDom('div', {'id': 'SplashScreen', 'class': 'screen'}),
	/** @type {Element} */
	SongsScreen : goog.dom.createDom('div', {'id': 'SongsScreen', 'class': 'screen'}),
	/** @type {Element} */
	AnimationStyles : goog.dom.createDom('div', {'id': 'AnimationStyles'}),
	//add them in the right places
	initialize : function(){
		if ( CONFIG.PLATFORM == CONFIG.PLATFORMS.DEV ) {
			//put the phone in the body
			goog.dom.appendChild(document.body, GridDom.PhoneWrapper);
			goog.dom.appendChild(GridDom.PhoneWrapper, GridDom.PhoneScreen);
			goog.dom.appendChild(GridDom.PhoneScreen, GridDom.Shell);	
		} else {
			goog.dom.appendChild(document.body, GridDom.Shell);
		}
		
		//put the screens in the phone
		goog.dom.appendChild(GridDom.Shell, GridDom.GameScreen);
		goog.dom.appendChild(GridDom.Shell, GridDom.PartsScreen);
		goog.dom.appendChild(GridDom.Shell, GridDom.SplashScreen);
		goog.dom.appendChild(GridDom.Shell, GridDom.SongsScreen);
		//goog.dom.appendChild(GridDom.PhoneScreen, GridDom.TopNav);
		goog.dom.appendChild(document.body, GridDom.AnimationStyles);
	}
}

GridDom.initialize();