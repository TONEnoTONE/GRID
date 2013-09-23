/*======================================================================================================
 _______  _______  __    _  _______  _______      _______  _______  ______    _______  _______  __    _ 
|       ||       ||  |  | ||       ||       |    |       ||       ||    _ |  |       ||       ||  |  | |
|  _____||   _   ||   |_| ||    ___||  _____|    |  _____||       ||   | ||  |    ___||    ___||   |_| |
| |_____ |  | |  ||       ||   | __ | |_____     | |_____ |       ||   |_||_ |   |___ |   |___ |       |
|_____  ||  |_|  ||  _    ||   ||  ||_____  |    |_____  ||      _||    __  ||    ___||    ___||  _    |
 _____| ||       || | |   ||   |_| | _____| |     _____| ||     |_ |   |  | ||   |___ |   |___ | | |   |
|_______||_______||_|  |__||_______||_______|    |_______||_______||___|  |_||_______||_______||_|  |__|

========================================================================================================*/

goog.provide("managers.views.SongsScreen");

goog.require("goog.dom");
goog.require("goog.events.BrowserEvent");
goog.require("goog.style");
goog.require("screens.views.Button");

var SongsScreen =  {
	/** 
	@private
	@type {Element} 
	*/
	div : null,
	
	/** initializer */
	initialize : function(){
		SongsScreen.div = goog.dom.createDom('div', {
		    'id': 'songs',
		    'class': 'screen',
		    }, 'songs screen');

		goog.dom.appendChild(document.body, SongsScreen.div);

		SongsScreen.hideScreen();
	},
	
	/** 
		Shows the screen
	*/
	showScreen : function(){
		goog.style.setElementShown(SongsScreen.div, true);
	},

	/** 
		Hides the screen
	*/
	hideScreen : function(){
		goog.style.setElementShown(SongsScreen.div, false);
	}
};
SongsScreen.initialize();