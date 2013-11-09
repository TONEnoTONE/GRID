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
goog.require("game.views.PatternView");
goog.require("models.StagesModel");

goog.require("game.models.Pattern");

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
		var partsIndex = StagesModel.currentStage;
		if (partsIndex >= 0) {
			var parts = StageController.Stages[partsIndex].levels;
			// make the buttons
			for (var i=0; i<parts.length; i++) {
				var part = parts[i];
				var clickable = true;
				var buttonContent = null;
				var patternButton = null;

				var bCont = goog.dom.createDom('div', { 'class': 'ButtonContainer' });
				goog.dom.appendChild(PartsScreen.partsButtonsDiv, bCont);
				
				if ( part.status == StagesModel.LEVELSTATUS.SOLVED ) {
					goog.dom.classes.add(bCont, "PatternButton");


					//buttonContent = "[] . [] .";
					var pattern = part.pattern;
					var patternDisplay = goog.dom.createDom("div", {"id" : "PatternDisplay"});
					var patternDisplayTarget = goog.dom.createDom("div", {"id" : "PatternDisplayTarget"});
					goog.dom.appendChild(patternDisplay, patternDisplayTarget);
					
					patternButton= new Button(patternDisplay, PartsScreen.onPartClick);
					goog.dom.appendChild(bCont, patternButton.Element);
					
					var targetPattern = new Pattern(pattern.length);
					targetPattern.addPattern(pattern);
					var len = targetPattern.getLength();
					if (targetPattern.isSymmetrical()){
						len /= 2;
					}
					var pv = new PatternView(patternDisplayTarget, len);	
					pv.clearHits();
					pv.displayPattern(targetPattern);
					pv.displayRests(targetPattern);


				} else if ( part.status == StagesModel.LEVELSTATUS.LOCKED ) {
					buttonContent = goog.dom.createDom("i", {"class" : "icon-lock"});
				} else if ( part.status == StagesModel.LEVELSTATUS.PLAYABLE ) {
					buttonContent = part.name;
				} else if ( part.status == StagesModel.LEVELSTATUS.PAY ) {
					buttonContent = goog.dom.createDom("i", {"class" : "icon-usd"});
				} else {
					buttonContent = "";
				}

				if ( patternButton ) {
					var b= patternButton;
				} else {
					var b= new Button(buttonContent, PartsScreen.onPartClick);
					goog.dom.appendChild(bCont, b.Element);
				}

				PartsScreen.partsButtons.push( { button :b, data: part, index: i} );
			}
		}
	},
	/** 
		@param {goog.events.BrowserEvent} e
	*/
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
		var partIndex = -1;
		for ( var i=0; i<PartsScreen.partsButtons.length; i++) {
			if ( PartsScreen.partsButtons[i].button === partButton ) {
				part = PartsScreen.partsButtons[i].data;
				partIndex = PartsScreen.partsButtons[i].index;
				break;
			}
		}
		if (partIndex >= 0) {
			if ( part.status == StagesModel.LEVELSTATUS.PLAYABLE ||
				 part.status == StagesModel.LEVELSTATUS.SOLVED ) 
			{
				ScreenController.partSelectedCb(partIndex);
			} else if ( part.status == StagesModel.LEVELSTATUS.PAY ) {
				console.log("They want to pay! handle it!");
			}
		} else {
			console.log('No song obj for the clicked partButton. W.T.F.?')
		}
	},

	/** 
		handle any topnavleft clicks
		@private
	*/
	onTopNavLeftClick : function(){
		AppState.fsm["showsongs"]();
	},
	/** 
		handle any topnavright clicks
		@private
	*/
	onTopNavRightClick : function(){
	
	},

	/** 
		Show the screen
	*/
	showScreen : function(){
		goog.style.setElementShown(PartsScreen.div, true);
		PartsScreen.makeButtons();
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