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
	/** Data for the stages.
	@private @type {StageController} */
	Stages : StageController,
	/** @private @type {Element} */
	div : null,
	/** @private @type {Element} */
	songButtonsDiv : null,
	/** @private @type {Array} */
	songButtons : [],
	

	
	/** initializer */
	initialize : function(){
		SongsScreen.Stages = StageController.Stages;
		SongsScreen.songSelectedCb = StageController.songSelectedCb;

		SongsScreen.makeScreen();
		SongsScreen.hideScreen();
	},
	
	/** make the screen **/
	makeScreen : function(){
		SongsScreen.div = goog.dom.createDom('div', {
		    'id': 'SongsScreen',
		    'class': 'screen',
		    });
		// holder for the song buttons
		SongsScreen.songButtonsDiv = goog.dom.createDom('div', { 'id': 'SongButtons' });

		SongsScreen.makeSongButtons();

		// draw the sucker
		goog.dom.appendChild(document.body, SongsScreen.div);
		goog.dom.appendChild(SongsScreen.div, SongsScreen.songButtonsDiv);
	},

	/** 
		add song buttons and data
		@private
	*/
	makeSongButtons : function(){
		// make the buttons
		for (var i=0; i<Stages.length; i++) {
			var stage = Stages[i];
			var b= new Button(stage.name, SongsScreen.onSongClick);

			SongsScreen.songButtons.push( { button :b, data: stage, index: i } );
			goog.dom.appendChild(SongsScreen.songButtonsDiv, b.Element);
		}
	},

	/** 
		remove the song buttons and clear the data associated with them
		@private
	*/
	clearSongButtons : function(){
		SongsScreen.songButtons = null;
		goog.dom.removeChildren(SongsScreen.songButtonsDiv);
	},


	/** 
		handle any song button clicks
		@private
		@param {Button} songButton 
	*/
	onSongClick : function(songButton){
		var song = null;
		for ( var i=0; i<SongsScreen.songButtons.length; i++) {
			if ( SongsScreen.songButtons[i].button === songButton ) {
				song = SongsScreen.songButtons[i].index;
				break;
			}
		}
		if (song >= 0) {
			ScreenController.songSelectedCb(song);
		} else {
			console.log('No song obj for the clicked songButton. W.T.F.?')
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
