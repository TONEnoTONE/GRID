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
goog.require("goog.style.transition");
goog.require("goog.fx.css3.Transition");

var ScreenController = {
	/** 
		Static list of screens
		@type {Object}
		@private
	**/
	screens : {},
	
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
		var duration = .15;
		var transition = new goog.fx.css3.Transition( 	element, duration, {'opacity': 0}, {'opacity': 1},
      													{property: 'opacity', duration: duration, timing: 'ease-in', delay: 0});
		
		goog.events.listen( transition, goog.fx.Transition.EventType.FINISH, function() { 
			//AppState.fsm.transition(); 

		} );

		ScreenController.screens[screen].showScreen();		
		transition.play();	
		//ScreenController.screens[screen].showScreen();
	},

	/** 
		@param {CONST.APPSTATES} screen
	*/
	hideScreen : function(screen){
		// apply transition
		var element = ScreenController.screens[screen].div;
		var duration = .15;
		var transition = new goog.fx.css3.Transition( 	element, duration, {'opacity': 1}, {'opacity': 0},
      													{property: 'opacity', duration: duration, timing: 'ease-in', delay: 0});
		
		goog.events.listen( transition, goog.fx.Transition.EventType.FINISH, function() { 
			AppState.fsm.transition();
			ScreenController.screens[screen].hideScreen();
		} );

		transition.play();	
	},

	/** 
		@param {number} songIndex
	*/
	songSelectedCb : function(songIndex){
		AppModel.currentStage = songIndex;
		AppState.fsm["showparts"]();
	},
	/** 
		@param {number} partIndex
	*/
	partSelectedCb : function(partIndex){
		AppModel.currentStage = partIndex;
		AppState.fsm["showgame"]();
	}
};
ScreenController.initialize();