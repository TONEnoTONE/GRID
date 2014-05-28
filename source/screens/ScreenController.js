/*=======================================================================================================
 _______  _______  ______    _______  _______  __    _    _______  _______  ______    ___      ______   
|       ||       ||    _ |  |       ||       ||  |  | |  |       ||       ||    _ |  |   |    |    _ |  
|  _____||       ||   | ||  |    ___||    ___||   |_| |  |       ||_     _||   | ||  |   |    |   | ||  
| |_____ |       ||   |_||_ |   |___ |   |___ |       |  |       |  |   |  |   |_||_ |   |    |   |_||_ 
|_____  ||      _||    __  ||    ___||    ___||  _    |  |      _|  |   |  |    __  ||   |___ |    __  |
 _____| ||     |_ |   |  | ||   |___ |   |___ | | |   |  |     |_   |   |  |   |  | ||       ||   |  | |
|_______||_______||___|  |_||_______||_______||_|  |__|  |_______|  |___|  |___|  |_||_______||___|  |_|
========================================================================================================*/

goog.provide("screens.ScreenController");

goog.require("data.Const");
goog.require("screens.views.SplashScreen");
goog.require("screens.views.SongsScreen");
goog.require("screens.views.PartsScreen");
goog.require("screens.views.GameScreen");
goog.require("screens.views.Drawer");
goog.require("goog.style.transition");
goog.require("goog.fx.css3.Transition");

var ScreenController = {
	/** 
		Static list of screens
		@type {Object}
		@private
	**/
	screens : {},
	/** 
		@type { Boolean }
		@private
	*/
	isDrawerOpen :  false,
	/** 
		I do't like holding on to this, but the CSS is in a state such that it's not advisable to ove everything out a level
		and make this transform the same across all it's containers. TODO: refactor / massage CSS and move all these Screens into a
		containing screen. 

		@type { Object }
		@private
	*/
	currentScreen :  '',
	
	/** initializer */
	initialize : function(){
		// set up available screens
		ScreenController.screens[CONST.APPSTATES.SCREEN_SPLASH] = SplashScreen;
		ScreenController.screens[CONST.APPSTATES.SCREEN_SONGS] = SongsScreen;
		ScreenController.screens[CONST.APPSTATES.SCREEN_PARTS] = PartsScreen;
		ScreenController.screens[CONST.APPSTATES.SCREEN_GAME] = GameScreen;
	},
	
	/** 
		@param {CONST.APPSTATES} screen
	*/
	showScreen : function(screen){
		// apply transition
		var element = ScreenController.screens[screen].div;
		goog.dom.classes.add(element, "visible");
		var duration = .2;
		var transition = new goog.fx.css3.Transition( 	element, duration, {'opacity': 0}, {'opacity': 1},
      													{property: 'opacity', duration: duration, timing: 'ease-in', delay: 0});
		goog.style.setOpacity(element, 1);
		goog.events.listen( transition, goog.fx.Transition.EventType.END, function() {
			var scr = ScreenController.screens[screen];
			if (goog.isFunction(scr.onShown)){
				scr.onShown();
			}
		} );
		transition.play();	
		ScreenController.screens[screen].showScreen();
		ScreenController.currentScreen = screen;
	},

	/** 
		@param {CONST.APPSTATES} screen
	*/
	hideScreen : function(screen){
		// first make sure the drawer is hidden. 
		// a bit brute forcey. this might be ore racefully done if we listen for the drawer closing anim
		// to complete, but it's not all 'googed' up right now. perhaps it can be done later.
		Drawer.hide();

		// apply transition
		var element = ScreenController.screens[screen].div;
		var duration = .2;
		goog.style.setOpacity(element, 0);
		var transition = new goog.fx.css3.Transition( 	element, duration, {'opacity': 1}, {'opacity': 0},
      													{property: 'opacity', duration: duration, timing: 'ease-in', delay: 0});
		
		goog.events.listen( transition, goog.fx.Transition.EventType.FINISH, function() { 
			AppState.fsm.transition();
			ScreenController.screens[screen].hideScreen();
			goog.dom.classes.remove(element, "visible");
		} );
		transition.play();
		//remove the text from the previous screen	
		ScreenText.hideText();
	},

	/** 
		@param {number} songIndex
	*/
	songSelectedCb : function(songIndex){
		StagesModel.currentStage = songIndex;
		AppState.fsm["showparts"]();
	},
	/** 
		@param {number} partIndex
	*/
	partSelectedCb : function(partIndex){
		StagesModel.currentLevel = partIndex;
		AppState.fsm["showgame"]();
	},
	/** 
		the start button appears once the files have loaded
	*/
	appLoaded : function(){
		SplashScreen.appLoaded();
	},
	/**
		open/close the drawer
	*/
	toggleDrawer :  function() {
		if ( ScreenController.isDrawerOpen ) {
			AppState.fsm["closethedrawer"]();
		} else {
			AppState.fsm["openthedrawer"]();
		}
	},
	/** 
		Show drawer
	*/
	openDrawer :  function() {
		var currElement = ScreenController.screens[ScreenController.currentScreen].div;
		Drawer.show();
		goog.dom.classes.remove(currElement, "menuClosed");
		goog.dom.classes.add(currElement, "menuOpen");

		goog.dom.classes.remove(GridDom.Drawer, "drawerClosed");
		goog.dom.classes.add(GridDom.Drawer, "drawerOpen");

		ScreenController.isDrawerOpen = true;
	},
	/** 
		Show drawer
	*/
	closeDrawer : function() {
		var currElement = ScreenController.screens[ScreenController.currentScreen].div;
		goog.dom.classes.remove(currElement, "menuOpen");
		goog.dom.classes.add(currElement, "menuClosed");

		goog.dom.classes.remove(GridDom.Drawer, "drawerOpen");
		goog.dom.classes.add(GridDom.Drawer, "drawerClosed");

		ScreenController.isDrawerOpen = false;
		//Drawer.hide();
	}
};
ScreenController.initialize();