/*=====================================================================================================================================================
 _______  _______  ______    _______  _______  __    _      _______  _______  __    _  _______  ______    _______  ___      ___      _______  ______   
|       ||       ||    _ |  |       ||       ||  |  | |    |       ||       ||  |  | ||       ||    _ |  |       ||   |    |   |    |       ||    _ |  
|  _____||       ||   | ||  |    ___||    ___||   |_| |    |       ||   _   ||   |_| ||_     _||   | ||  |   _   ||   |    |   |    |    ___||   | ||  
| |_____ |       ||   |_||_ |   |___ |   |___ |       |    |       ||  | |  ||       |  |   |  |   |_||_ |  | |  ||   |    |   |    |   |___ |   |_||_ 
|_____  ||      _||    __  ||    ___||    ___||  _    |    |      _||  |_|  ||  _    |  |   |  |    __  ||  |_|  ||   |___ |   |___ |    ___||    __  |
 _____| ||     |_ |   |  | ||   |___ |   |___ | | |   |    |     |_ |       || | |   |  |   |  |   |  | ||       ||       ||       ||   |___ |   |  | |
|_______||_______||___|  |_||_______||_______||_|  |__|    |_______||_______||_|  |__|  |___|  |___|  |_||_______||_______||_______||_______||___|  |_|
=====================================================================================================================================================*/

goog.provide("screens.ScreenController");

goog.require("data.Const");
goog.require("screens.views.SplashScreen");
goog.require("screens.views.SongsScreen");
goog.require("screens.views.PartsScreen");
goog.require("screens.views.GameScreen");

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
		ScreenController.screens[screen].showScreen();
	},

	/** 
		@param {CONST.APPSTATES} screen
	*/
	hideScreen : function(screen){
		ScreenController.screens[screen].hideScreen();
	}
};
ScreenController.initialize();