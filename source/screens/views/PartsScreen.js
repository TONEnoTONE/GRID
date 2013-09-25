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
goog.require("screens.views.GridDom");

goog.require("models.AppModel");

var PartsScreen = {
	/** Data for the stages.
	@private @type {StageController} */
	Stages : StageController,
	/** @private @type {Element} */
	div : GridDom.PartsScreen,
	/** @private @type {Element} */
	partsButtonsDiv : null,
	/** @private @type {Array} */
	partsButtons : [],

	/** initializer */
	initialize : function(){
		// holder for the song buttons
		PartsScreen.partsButtonsDiv = goog.dom.createDom('div', { 'id': 'PartsButtons' });

		PartsScreen.makeScreen();
		PartsScreen.hideScreen();
	},
	
	/** make the screen **/
	makeScreen : function(){
		// holder for the song buttons
		PartsScreen.partsButtonsDiv = goog.dom.createDom('div', { 'id': 'PartsButtons' });

		PartsScreen.makeButtons();

		// draw the sucker
		goog.dom.appendChild(PartsScreen.div, PartsScreen.partsButtonsDiv);
	},

	/** 
		add song buttons and data
		@private
	*/
	makeButtons : function(){
		var partsIndex = AppModel.currentStage;
		if ( partsIndex != undefined) {
			var parts = Stages[partsIndex].levels;
			// make the buttons
			for (var i=0; i<parts.length; i++) {
				var part = parts[i];
				var b= new Button(part.name, PartsScreen.onSongClick);

				PartsScreen.partsButtons.push( { button :b, data: part, index: i} );
				goog.dom.appendChild(PartsScreen.partsButtonsDiv, b.Element);
			}
		}
	},

	/** 
		remove the part buttons and clear the data associated with them
		@private
	*/
	clearPartsButtons : function(){
		PartsScreen.songButtons = null;
		goog.dom.removeChildren(PartsScreen.partsButtonsDiv);
	},


	/** 
		handle any song button clicks
		@private
		@param {Button} partButton 
	*/
	onPartClick : function(partButton){
		var part = null;
		for ( var i=0; i<PartsScreen.songButtons.length; i++) {
			if ( PartsScreen.partsButtons[i].button === partButton ) {
				part = PartsScreen.partsButtons[i].index;
				break;
			}
		}
		if (song) {
			ScreenController.partSelectedCb(part);
		} else {
			console.log('No song obj for the clicked partButton. W.T.F.?')
		}
	},

	/** 
		Show the screen
	*/
	showScreen : function(){
		PartsScreen.makeButtons();
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