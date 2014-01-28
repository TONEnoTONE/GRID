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
goog.require("game.controllers.AudioController");

goog.require("screens.views.GridDom");
goog.require("game.views.PatternView");
goog.require("models.StagesModel");
goog.require("goog.dom.query");
goog.require("game.models.Pattern");
goog.require('goog.fx.dom.Fade');
goog.require('goog.fx.dom.FadeOut');
goog.require('goog.fx.dom.FadeIn');
goog.require("goog.fx.dom.Scroll");
goog.require("game.controllers.StageController");
goog.require("screens.views.PartsScreenButton");
goog.require("screens.views.Button");

var PartsScreen = {
	/** @private @type {Element} */
	div : GridDom.PartsScreen,
	/** @private @type {Element} */
	partsButtonsDiv : null,
	/** @private @type {Array} */
	partsButtons : [],
	/** @private @type {Array} */
	partsPatterns : [],
	/** @private @type {number} */
	scrollStartPosition : -1,
	/** @private @type {number} */
	completedLevels : 0,
	/** @type {boolean} */
	stageWasLoaded : false,
	/** @type {Button} */
	playButton : null,
	/** @type {boolean} */
	patternPlaying : false,
	/** initializer */
	initialize : function(){
		PartsScreen.playButton = new Button("play song", PartsScreen.playHit, {"id" : "PartsPlayButton"});
		goog.dom.appendChild(PartsScreen.div, PartsScreen.playButton.Element);
		// holder for the song buttons
		PartsScreen.makeScreen();
		PartsScreen.hideScreen();
	},
	/** 
		iterate over all the buttons
		@param {function(PartsScreenButton, number)} callback
	*/
	forEach : function(callback){
		for (var i = 0, len = PartsScreen.partsButtons.length; i < len; i++){
			callback(PartsScreen.partsButtons[i], i);
		}
	},
	/** make the screen **/
	makeScreen : function(){
		// holder for the song buttons
		PartsScreen.partsButtonsDiv = goog.dom.createDom('div', { 'id': 'PartsButtons' });

		// make the top nav
		var topNav = new TopNav();
		topNav.title('parts');
		topNav.setLeftButton('', PartsScreen.onTopNavLeftClick);
		
		PartsScreen.makeButtons();

		// draw the sucker
		goog.dom.appendChild(PartsScreen.div, topNav.Element);
		goog.dom.appendChild(PartsScreen.div, PartsScreen.partsButtonsDiv);

		// handle clicks
		PartsScreen.clickHandler = new goog.events.EventHandler();
		PartsScreen.clickHandler.listen(PartsScreen.partsButtonsDiv, [goog.events.EventType.TOUCHSTART], PartsScreen.scrollStart);
		PartsScreen.clickHandler.listen(PartsScreen.partsButtonsDiv, [goog.events.EventType.TOUCHEND], PartsScreen.scrollEnd);
		PartsScreen.clickHandler.listen(PartsScreen.partsButtonsDiv, [goog.events.EventType.TOUCHMOVE], PartsScreen.scrolling);
		PartsScreen.clickHandler.listen(PartsScreen.div, [goog.events.EventType.TOUCHMOVE], PartsScreen.clicked);
	},
	/** 
		click handler 
		@param {goog.events.BrowserEvent} e
	*/
	clicked : function(e){
		e.preventDefault();
	},
	/** 
		add song buttons and data
		@private
	*/
	makeButtons : function(){
		var stage = StagesModel.currentStage;
		//set the color palette of the current stage
		var color = StageController.getStageColor(stage);
		goog.dom.classes.set(PartsScreen.partsButtonsDiv, color);
		var levelCount = StageController.getLevelCount(stage);
		PartsScreen.completedLevels = 0;
		// make the buttons
		for (var level=0; level<levelCount; level++) {
			var status = StagesModel.getLevelStatus(stage, level);
			var button = new PartsScreenButton(level, levelCount, PartsScreen.onPartClick, status);
			PartsScreen.partsButtons.push(button);
			//put the element in the container
			goog.dom.appendChild(PartsScreen.partsButtonsDiv, button.Element);
			if (status === StagesModel.STATUS.SOLVED){
				PartsScreen.completedLevels++;
			}
		}
		PartsScreen.setGradient();
		PartsScreen.playButtonVisible();
	},
	/** 
		sets the visibility of the play button if there is more than one level completed
	*/
	playButtonVisible : function(){
		if (PartsScreen.completedLevels > 0){
			goog.style.setStyle(PartsScreen.playButton.Element, {
				"pointer-events" : "auto",
				"opacity" : 1
			});
		} else {
			goog.style.setStyle(PartsScreen.playButton.Element, {
				"pointer-events" : "none",
				"opacity" : 0
			});
		}
	},
	/** 
		sets a gradient opacity on the completed parts
	*/
	setGradient : function(){
		PartsScreen.forEach(function(button){
			button.setGradient(PartsScreen.completedLevels);
		})
	},
	/** 
		@private
		@param {goog.events.BrowserEvent} e
	*/
	maybeReinitTouchEvent : function(e) {
		var type = e.type;
		if (type == goog.events.EventType.TOUCHSTART || type == goog.events.EventType.TOUCHMOVE) {
			e.init(e.getBrowserEvent().targetTouches[0], e.currentTarget);
		} else if (type == goog.events.EventType.TOUCHEND || type == goog.events.EventType.TOUCHCANCEL) {
			e.init(e.getBrowserEvent().changedTouches[0], e.currentTarget);
		}
	},
	/** 
		@param {goog.events.BrowserEvent} e
	*/
	scrolling : function(e){
		e.preventDefault();
		if (PartsScreen.scrollStartPosition !== -1){
			PartsScreen.maybeReinitTouchEvent(e);
			var scrollDelta =  PartsScreen.scrollStartPosition - e.clientY;
			PartsScreen.scrollStartPosition = e.clientY;
			PartsScreen.partsButtonsDiv.scrollTop += scrollDelta;
		}
	},
	/** 
		@param {goog.events.BrowserEvent} e
	*/
	scrollStart : function(e){
		PartsScreen.maybeReinitTouchEvent(e);
		PartsScreen.scrollStartPosition = e.clientY;
	},
	/** 
		@param {goog.events.BrowserEvent} e
	*/
	scrollEnd : function(e){
		PartsScreen.scrollStartPosition = -1;
	},
	/** 
		remove the part buttons and clear the data associated with them
		@private
	*/
	clearButtons : function(){
		//destroy all the buttons
		for (var i = 0; i < PartsScreen.partsButtons.length; i++){
			var button = PartsScreen.partsButtons[i];
			button.dispose();
		}
		PartsScreen.partsButtons = [];
		goog.dom.removeChildren(PartsScreen.partsButtonsDiv);
	},


	/** 
		handle any song button clicks
		@private
		@param {number} partIndex
	*/
	onPartClick : function(partIndex){
		ScreenController.partSelectedCb(partIndex);
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
		//brind the scroll to the top
		PartsScreen.partsButtonsDiv.scrollTop = 0;
		//load the audio for the level
		PartsScreen.stageWasLoaded = false;
		AudioController.loadStageAudio(StagesModel.currentStage, function(){
			PartsScreen.stageWasLoaded = true;
		});
	},
	/** 
		called when the screen is shown
	*/
	onShown : function(){
		PartsScreen.scrollToPlayableButton();
	},
	/** 
		move the scroll so that the next playable section is on top
	*/
	scrollToPlayableButton : function(){
		if (PartsScreen.completedLevels > 0){
			var playableButtonElement = PartsScreen.partsButtons[PartsScreen.completedLevels - 1].Element;
			var size = goog.style.getSize(PartsScreen.partsButtonsDiv);
			var margins = goog.style.getMarginBox(playableButtonElement);
			var buttonSize = goog.style.getSize(playableButtonElement).height + margins.top;
			var posY = buttonSize * PartsScreen.completedLevels;
			if (size.height < posY + buttonSize){
				var scrollAmnt = posY + buttonSize - size.height;
				var scroll = new goog.fx.dom.Scroll(PartsScreen.partsButtonsDiv, [0, 0], [0, scrollAmnt], 300, Animation.Easing.easeOut);
				scroll.play();
			}
		}
	},
	/** 
		Hides the screen
	*/
	hideScreen : function(){
		PartsScreen.clearButtons();
		goog.style.setElementShown(PartsScreen.div, false);
		PartsScreen.stopPattern();
	},
	/** 
		@param {Button} button
	*/
	playHit : function(button){
		if (!PartsScreen.patternPlaying){
			PartsScreen.playPattern();
		} else {
			PartsScreen.stopPattern();
		}
	},
	/** 
		show and play the pattern
	*/
	playPattern : function(){
		PartsScreen.patternPlaying = true;
		//make the pattern
		var stage = StagesModel.currentStage;
		goog.dom.classes.add(PartsScreen.playButton.Element, "playing");
		PartsScreen.playButton.setText("stop");
		//add the pattern for each of the buttons
		PartsScreen.forEach(function(button){
			button.play();
		});
		//play the stage
		var delay = .5;
		AudioController.playStage(StagesModel.currentStage, PartsScreen.completedLevels, delay);
	},
	/** 
		stop the pattern
	*/
	stopPattern : function(){
		PartsScreen.patternPlaying = false;
		goog.dom.classes.remove(PartsScreen.playButton.Element, "playing");
		PartsScreen.playButton.setText("play parts");
		//add the pattern for each of the buttons
		PartsScreen.forEach(function(button){
			button.stop();
		});
		AudioController.stop();
	},

};
PartsScreen.initialize();