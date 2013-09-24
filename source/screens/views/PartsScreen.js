/*=============================================================================================================
 _______  _______  ______    _______  _______    _______  _______  ______    _______  _______  __    _ 
|       ||   _   ||    _ |  |       ||       |  |       ||       ||    _ |  |       ||       ||  |  | |
|    _  ||  |_|  ||   | ||  |_     _||  _____|  |  _____||       ||   | ||  |    ___||    ___||   |_| |
|   |_| ||       ||   |_||_   |   |  | |_____   | |_____ |       ||   |_||_ |   |___ |   |___ |       |
|    ___||       ||    __  |  |   |  |_____  |  |_____  ||      _||    __  ||    ___||    ___||  _    |
|   |    |   _   ||   |  | |  |   |   _____| |   _____| ||     |_ |   |  | ||   |___ |   |___ | | |   |
|___|    |__| |__||___|  |_|  |___|  |_______|  |_______||_______||___|  |_||_______||_______||_|  |__|

==============================================================================================================*/

goog.provide("screens.views.PartsScreen");

goog.require("goog.dom");
goog.require("goog.events.BrowserEvent");
goog.require("goog.style");

var PartsScreen = {
	/** 
	@private
	@type {Element} 
	*/
	div : null,
	
	/** initializer */
	initialize : function(){
		PartsScreen.div = goog.dom.createDom('div', {
	    'id': 'splash',
	    'class': 'screen',
	    }, 'parts is parts!');
		
		goog.dom.appendChild(document.body, PartsScreen.div);		
		
		PartsScreen.hideScreen();

	},
	
	/** 
		Show the screen
	*/
	showScreen : function(){
		goog.style.setElementShown(PartsScreen.div, true);
	},

	/** 
		Hides the screen
	*/
	hideScreen : function(){
		goog.style.setElementShown(PartsScreen.div, false);
	}

};
PartsScreen.initialize();