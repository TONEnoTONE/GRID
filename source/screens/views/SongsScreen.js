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
goog.require("goog.style");
goog.require("goog.events.BrowserEvent");
goog.require("goog.events.EventHandler");

goog.require("game.controllers.StageController");
goog.require("screens.views.Button");
goog.require("screens.views.TopNav");
goog.require("screens.views.GridDom");

var SongsScreen =  {
	/** Data for the stages.
	@private @type {StageController} */
	Stages : StageController,
	/** @private @type {Element} */
	div : GridDom.SongsScreen,
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
		
		// handle clicks
		SongsScreen.clickHandler = new goog.events.EventHandler();
		SongsScreen.clickHandler.listen(SongsScreen.div, [goog.events.EventType.TOUCHMOVE], SongsScreen.clicked);
	},
	/** 
		click handler 
		@param {goog.events.BrowserEvent} e
	*/
	clicked : function(e){
		e.preventDefault();
	},
	/** make the screen **/
	makeScreen : function(){
		// holder for the song buttons
		SongsScreen.songButtonsDiv = goog.dom.createDom('div', { 'id': 'SongButtons' });

		// make the top nav
		var topNav = new TopNav();
		topNav.title('songs');
		topNav.setLeftButton('', SongsScreen.onTopNavLeftClick);
		//topNav.setRightButton('parts', SongsScreen.onTopNavRightClick);

		// make the buttons
		SongsScreen.makeSongButtons();

		// draw the sucker
		goog.dom.appendChild(SongsScreen.div, topNav.Element);
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
			goog.dom.classes.add(b.Element, StageController.getStageColor(i));
			SongsScreen.songButtons.push( { button :b, data: stage, index: i } );
			goog.dom.appendChild(SongsScreen.songButtonsDiv, b.Element);
		}
	},

	/** 
		remove the song buttons and clear the data associated with them
		@private
	*/
	clearButtons : function(){
		//destroy all the buttons
		for (var i = 0; i < SongsScreen.songButtons.length; i++){
			var button = SongsScreen.songButtons[i].button;
			button.dispose();
		}
		SongsScreen.songButtons = [];
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
		handle any topnavleft clicks
		@private
	*/
	onTopNavLeftClick : function(){
		AppState.fsm["showsplash"]();
	},
	/** 
		handle any topnavright clicks
		@private
	*/
	onTopNavRightClick : function(){
		
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
