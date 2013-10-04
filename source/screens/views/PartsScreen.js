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
goog.require("goog.events.EventHandler");

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
		PartsScreen.makeScreen();
		PartsScreen.hideScreen();
	},
	
	/** make the screen **/
	makeScreen : function(){
		// holder for the song buttons
		PartsScreen.partsButtonsDiv = goog.dom.createDom('div', { 'id': 'PartsButtons' });

		// make the top nav
		var topNav = new TopNav();
		topNav.title('PARTS');
		topNav.setLeftButton('', PartsScreen.onTopNavLeftClick);
		//topNav.setRightButton('game', PartsScreen.onTopNavRightClick);

		PartsScreen.makeButtons();

		// draw the sucker
		goog.dom.appendChild(PartsScreen.div, topNav.Element);
		goog.dom.appendChild(PartsScreen.div, PartsScreen.partsButtonsDiv);

		// handle clicks
		PartsScreen.clickHandler = new goog.events.EventHandler();
		PartsScreen.clickHandler.listen(PartsScreen.div, [goog.events.EventType.TOUCHMOVE], PartsScreen.clicked, true, PartsScreen);
	},

	/** 
		add song buttons and data
		@private
	*/
	makeButtons : function(){
		var partsIndex = AppModel.currentStage;
		if (partsIndex >= 0) {
			var parts = Stages[partsIndex].levels;
			// make the buttons
			for (var i=0; i<parts.length; i++) {
				var part = parts[i];
				var b= new Button(part.name, PartsScreen.onPartClick);
				var bCont = goog.dom.createDom('div', { 'class': 'ButtonContainer' });

				PartsScreen.partsButtons.push( { button :b, data: part, index: i} );
				goog.dom.appendChild(PartsScreen.partsButtonsDiv, bCont);
				goog.dom.appendChild(bCont, b.Element);
			}
		}
	},
	clicked : function(e){
		e.preventDefault();
	},

	/** 
		remove the part buttons and clear the data associated with them
		@private
	*/
	clearButtons : function(){
		//destroy all the buttons
		for (var i = 0; i < PartsScreen.partsButtons.length; i++){
			var button = PartsScreen.partsButtons[i].button;
			button.dispose();
		}
		PartsScreen.partsButtons = [];
		goog.dom.removeChildren(PartsScreen.partsButtonsDiv);
	},


	/** 
		handle any song button clicks
		@private
		@param {Button} partButton 
	*/
	onPartClick : function(partButton){
		var part = -1;
		for ( var i=0; i<PartsScreen.partsButtons.length; i++) {
			if ( PartsScreen.partsButtons[i].button === partButton ) {
				part = PartsScreen.partsButtons[i].index;
				break;
			}
		}
		if (part >= 0) {
			ScreenController.partSelectedCb(part);
		} else {
			console.log('No song obj for the clicked partButton. W.T.F.?')
		}
	},

	/** 
		handle any topnavleft clicks
		@private
	*/
	onTopNavLeftClick : function(){
		console.log('left click');
		AppState.fsm["showsongs"]();
	},
	/** 
		handle any topnavright clicks
		@private
	*/
	onTopNavRightClick : function(){
		console.log('right click');
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
		PartsScreen.clearButtons();
		goog.style.setElementShown(PartsScreen.div, false);
	}

};
PartsScreen.initialize();