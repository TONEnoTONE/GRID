/*=============================================================================================================
 _______  _______  ___      _______  _______  __   __    _______  _______  ______    _______  _______  __    _ 
|       ||       ||   |    |   _   ||       ||  | |  |  |       ||       ||    _ |  |       ||       ||  |  | |
|  _____||    _  ||   |    |  |_|  ||  _____||  |_|  |  |  _____||       ||   | ||  |    ___||    ___||   |_| |
| |_____ |   |_| ||   |    |       || |_____ |       |  | |_____ |       ||   |_||_ |   |___ |   |___ |       |
|_____  ||    ___||   |___ |       ||_____  ||       |  |_____  ||      _||    __  ||    ___||    ___||  _    |
 _____| ||   |    |       ||   _   | _____| ||   _   |   _____| ||     |_ |   |  | ||   |___ |   |___ | | |   |
|_______||___|    |_______||__| |__||_______||__| |__|  |_______||_______||___|  |_||_______||_______||_|  |__|

==============================================================================================================*/

goog.provide("screens.views.SplashScreen");

goog.require("goog.dom");
goog.require("goog.events.BrowserEvent");
goog.require("goog.style");

var SplashScreen = {
	/** 
	@private
	@type {Element} 
	*/
	div : null,
	
	/** initializer */
	initialize : function(){
		SplashScreen.div = goog.dom.createDom('div', {
	    'id': 'splash',
	    'class': 'screen',
	    }, 'splash');
		
		goog.dom.appendChild(document.body, SplashScreen.div);		
		
		SplashScreen.hideScreen();

	},
	
	/** 
		Show the screen
	*/
	showScreen : function(){
		goog.style.setElementShown(SplashScreen.div, true);
	},

	/** 
		Hides the screen
	*/
	hideScreen : function(){
		goog.style.setElementShown(SplashScreen.div, false);
	}

};
SplashScreen.initialize();