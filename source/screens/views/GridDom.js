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
	BottomColor : goog.dom.createDom("div", {"id" : "BottomSolidColorBackground"}),
	/** @type {Element} */
	TopColor : goog.dom.createDom("div", {"id" : "TopSolidColorBackground"}),
	/** @type {Element} */
	//TopNav : goog.dom.createDom("div", {"class" : "TopNav"}),
	/** @type {Element} */
	GameScreen : goog.dom.createDom("div", {"id" : "GameScreen", "class" : "screen"}),
	/** @type {Element} */
	PartsScreen : goog.dom.createDom('div', {'id': 'PartsScreen', 'class': 'screen'}),
	/** @type {Element} */
	SplashScreen : goog.dom.createDom('div', {'id': 'SplashScreen', 'class': 'screen'}),
	/** @type {Element} */
	ScreenText : goog.dom.createDom('div', {'id': 'ScreenText', 'class': 'screen'}),
	/** @type {Element} */
	SongsScreen : goog.dom.createDom('div', {'id': 'SongsScreen', 'class': 'screen'}),
	/** @type {Element} */
	Drawer : goog.dom.createDom('div', {'id': 'Drawer', 'class': 'screen'}),
	/** @type {Element} */
	AnimationStyles : goog.dom.createDom('div', {'id': 'AnimationStyles'}),
	//add them in the right places
	initialize : function(){
		goog.dom.appendChild(document.body, GridDom.Shell);
		//append the top and bottom colors
		goog.dom.appendChild(document.body, GridDom.BottomColor);
		goog.dom.appendChild(document.body, GridDom.TopColor);
		
		//put the screens in the phone
		goog.dom.appendChild(GridDom.Shell, GridDom.Drawer);
		goog.dom.appendChild(GridDom.Shell, GridDom.GameScreen);
		goog.dom.appendChild(GridDom.Shell, GridDom.PartsScreen);
		goog.dom.appendChild(GridDom.Shell, GridDom.SplashScreen);
		goog.dom.appendChild(GridDom.Shell, GridDom.SongsScreen);
		goog.dom.appendChild(GridDom.Shell, GridDom.ScreenText);
		//goog.dom.appendChild(GridDom.PhoneScreen, GridDom.TopNav);
		goog.dom.appendChild(document.body, GridDom.AnimationStyles);
	},
	/** 
		sets the overall color
		@param {number} stage
	*/
	setStageColor : function(stage){
		//set the stage color here
		var color = StageController.getStageColor(stage);
		goog.dom.classes.set(GridDom.Shell, color);
	}
}

GridDom.initialize();