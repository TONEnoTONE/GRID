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
	/** @type {Element} */
	loadingScreen : null,
	/** @type {number} */
	timeout : -1,
	/** @type {TopNav} */
	topNav : null,
	/** initializer */
	initialize : function(){
		PartsScreen.playButton = new Button("play song", PartsScreen.playHit, {"id" : "PartsPlayButton"});
		goog.dom.appendChild(PartsScreen.div, PartsScreen.playButton.Element);
		PartsScreen.makeLoadingScreen();
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
		PartsScreen.topNav = new TopNav();
		PartsScreen.topNav.title("song name");
		PartsScreen.topNav.setLeftButton('', PartsScreen.onTopNavLeftClick);
		
		PartsScreen.makeButtons();

		// draw the sucker
		goog.dom.appendChild(PartsScreen.div, PartsScreen.topNav.Element);
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
		var stage = StageController.getCurrentStage();
		//set the color palette of the current stage
		GridDom.setStageColor(stage);
		var levelCount = StageController.getLevelCount(stage);
		PartsScreen.completedLevels = 0;
		// make the buttons
		for (var level=0; level<levelCount; level++) {
			var status = StageController.getLevelStatus(stage, level);
			var button = new PartsScreenButton(stage, level, levelCount, PartsScreen.onPartClick, PartsScreen.playbackCallback);
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
			PartsScreen.setPlayButtonLoading(true);
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
		@param {boolean} loading
	*/
	setPlayButtonLoading : function(loading){
		if (loading){
			goog.dom.classes.add(PartsScreen.playButton.Element, "fa fa-spinner fa-spin loading")
		} else {
			goog.dom.classes.set(PartsScreen.playButton.Element, "")
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
		//if it's playing, solo that part
		if (PartsScreen.patternPlaying){
			var status = StageController.getLevelStatus(StageController.getCurrentStage(), partIndex);
			if (status !== StagesModel.STATUS.PLAYABLE){
				return;
			} 
		} 
		//otherwise go onto the next screen
		if (!PartsScreen.stageWasLoaded){
			PartsScreen.makeLoadingScreenVisible(true, partIndex);
		} else {
			ScreenController.partSelectedCb(partIndex);
		}
	},
	/** 
		handle the mouse up event
		@private
		@param {boolean} solo
		@param {number} partIndex
	*/
	playbackCallback : function(solo, partIndex){
		//if it's playing, solo that part
		if (PartsScreen.patternPlaying){
			if (solo){
				PartsScreen.forEach(function(partButton, index){
					partButton.solo(partIndex);
				});
			} else {
				//PartsScreen.unSolo();
				PartsScreen.forEach(function(partButton, index){
					partButton.unsolo();
				});
			}
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
		// track that we are here
		ga_storage._trackEvent('Screen', 'shown', 'PartsScreen');

		goog.style.setElementShown(PartsScreen.div, true);
		PartsScreen.makeButtons();
		//brind the scroll to the top
		PartsScreen.partsButtonsDiv.scrollTop = 0;
		//load the audio for the level
		PartsScreen.stageWasLoaded = false;
		AudioController.loadStageAudio(StageController.getCurrentStage(), function(){
			PartsScreen.stageWasLoaded = true;
			//make the play button visible
			PartsScreen.setPlayButtonLoading(false);
		});
		//also set the top nav title to the song
		var songName = StageController.getName(StageController.getCurrentStage());
		PartsScreen.topNav.title(songName);
	},
	/** 
		called when the screen is shown
	*/
	onShown : function(){
		PartsScreen.scrollToPlayableButton();
		TutorialManager.partsScreen();
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
			//notify the tutorial manager
			TutorialManager.partsScreenPlayButtonHit();
		} else {
			PartsScreen.stopPattern();
		}
	},
	/** 
		show and play the pattern
	*/
	playPattern : function(){
		//make sure all of the parts are loaded
		PartsScreen.patternPlaying = true;
		//make the pattern
		var stage = StageController.getCurrentStage();
		goog.dom.classes.add(PartsScreen.playButton.Element, "playing");
		PartsScreen.playButton.setText("stop");
		//add the pattern for each of the buttons
		//set the global delay
		AudioController.setGlobalDelay(stage);
		var delay = .5;
		PartsScreen.forEach(function(button){
			button.play();
			button.playPattern(delay);
		});
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
	/*=========================================================================
		LOADING
	=========================================================================*/
	/** 
		make a loading screen
	*/
	makeLoadingScreen : function(){
		PartsScreen.loadingScreen = goog.dom.createDom("div", {"id" : "LoadingScreen"});
		goog.dom.appendChild(PartsScreen.div, PartsScreen.loadingScreen);
		var spinner = goog.dom.createDom("div", {"id" : "Spinner"});
		goog.dom.appendChild(PartsScreen.loadingScreen, spinner);
		var text = goog.dom.createDom("div", {"id" : "Text"}, "loading");
		goog.dom.appendChild(PartsScreen.loadingScreen, text);
	},
	/** 
		show/hide the loading screen
		@param {boolean} show
		@param {number} partIndex
	*/
	makeLoadingScreenVisible : function(show, partIndex){
		if (show){
			goog.dom.classes.add(PartsScreen.loadingScreen, "visible");
			PartsScreen.timeout = setInterval(function(){
				if (PartsScreen.stageWasLoaded) {
					clearInterval(PartsScreen.timeout);
					PartsScreen.makeLoadingScreenVisible(false, partIndex);
					PartsScreen.onPartClick(partIndex);
				}
			}, 50);
			//keep testing until 
		} else {
			goog.dom.classes.remove(PartsScreen.loadingScreen, "visible");
		}
	}

};
PartsScreen.initialize();