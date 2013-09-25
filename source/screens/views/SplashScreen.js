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

goog.require("screens.views.GridDom");
goog.require("goog.dom");
goog.require("goog.events.BrowserEvent");
goog.require("goog.style");

var SplashScreen = {
	/** 
	@private
	@type {Element} 
	*/
	div : GridDom.SplashScreen,
	
	/** initializer */
	initialize : function(){
		SplashScreen.makeScreen();
		SplashScreen.hideScreen();
	},
	/** make the screen */
	makeScreen : function(){
		var gridBubble = "\n" +
" _______  ______    ___   ______   \n" +
"|       ||    _ |  |   | |      |  \n" +
"|    ___||   | ||  |   | |  _    | \n" +
"|   | __ |   |_||_ |   | | | |   | \n" +
"|   ||  ||    __  ||   | | |_|   | \n" +
"|   |_| ||   |  | ||   | |       | \n" +
"|_______||___|  |_||___| |______|  \n" +
"  									\n" +
"                 un                \n" +
" ___      _______  _______  ___   _  \n" +
"|   |    |       ||       ||   | | | \n" +
"|   |    |   _   ||       ||   |_| | \n" +
"|   |    |  | |  ||       ||      _| \n" +
"|   |___ |  |_|  ||      _||     |_  \n" +
"|       ||       ||     |_ |    _  | \n" +
"|_______||_______||_______||___| |_| \n";


		// holder for the song buttons
		var  gridBubbleDiv = goog.dom.createDom('pre', { 'id': 'gridBubbleDiv' }, gridBubble);

		// draw the sucker
		goog.dom.appendChild(SplashScreen.div, gridBubbleDiv);
	},
	/** Show the screen */
	showScreen : function(){
		goog.style.setElementShown(SplashScreen.div, true);
	},

	/** Hides the screen */
	hideScreen : function(){
		goog.style.setElementShown(SplashScreen.div, false);
	}

};
SplashScreen.initialize();