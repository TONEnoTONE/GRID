/*======================================================================================================
 _______  _______  __    _  _______  _______      _______  _______  ______    _______  _______  __    _ 
|       ||       ||  |  | ||       ||       |    |       ||       ||    _ |  |       ||       ||  |  | |
|  _____||   _   ||   |_| ||    ___||  _____|    |  _____||       ||   | ||  |    ___||    ___||   |_| |
| |_____ |  | |  ||       ||   | __ | |_____     | |_____ |       ||   |_||_ |   |___ |   |___ |       |
|_____  ||  |_|  ||  _    ||   ||  ||_____  |    |_____  ||      _||    __  ||    ___||    ___||  _    |
 _____| ||       || | |   ||   |_| | _____| |     _____| ||     |_ |   |  | ||   |___ |   |___ | | |   |
|_______||_______||_|  |__||_______||_______|    |_______||_______||___|  |_||_______||_______||_|  |__|

========================================================================================================*/

goog.provide("screens.views.SongsScreen");

goog.require("goog.dom");
goog.require("goog.events.BrowserEvent");
goog.require("goog.style");

goog.require("game.controllers.StageController");
goog.require("screens.views.Button");

var SongsScreen =  {
	/** 
	@private
	@type {StageController} 
	*/
	Stages : StageController,
	/** 
	@private
	@type {Element} 
	*/
	div : null,
	
	/** initializer */
	initialize : function(){
		SongsScreen.Stages = StageController.Stages;
		SongsScreen.makeScreen();
		SongsScreen.hideScreen();
	},
	
	/** make the screen **/
	makeScreen : function(){
		SongsScreen.div = goog.dom.createDom('div', {
		    'id': 'SongsScreen',
		    'class': 'screen',
		    }, 'songs screen');

		goog.dom.appendChild(document.body, SongsScreen.div);

		// make the buttons
		for (var i=0; i<Stages.length; i++) {
			var stage = Stages[i];
			var b= new Button(stage.name);

			var buttonrow = goog.dom.createDom('div', { 'class': 'buttonrow' });
			goog.dom.appendChild(SongsScreen.div, buttonrow);
			goog.dom.appendChild(buttonrow, b.Element);
		}
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