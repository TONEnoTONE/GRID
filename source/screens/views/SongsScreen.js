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
goog.require('screens.views.SongsScreenButton');

goog.require("game.controllers.StageController");
goog.require("screens.views.Button");
goog.require("screens.views.TopNav");
goog.require("screens.views.GridDom");
goog.require("models.StagesModel");
goog.require("managers.TutorialManager");

var SongsScreen =  {
	/** Data for the stages.
	@private @type {StageController} */
	Stages : StageController,
	/** @private @type {Element} */
	div : GridDom.SongsScreen,
	/** @private @type {Element} */
	songButtonsDiv : null,
	/** @private @type {Element} */
	songButtonContainer : null,
	/** @private @type {number} */
	currentVisibleSong : -1,
	/** @private @type {Button} */
	rightButton : null,
	/** @private @type {Button} */
	leftButton : null,
	/** @private @type {goog.math.Size} */
	buttonSize : null,
	/** @private @type {Array.<SongScreenButton>} */
	songButtons : [],
	/** @private @type {goog.fx.dom.Scroll} */
	scrollAnimation : null,
	/** @private @type {number} */
	scrollStartPosition : NaN,
	/** initializer */
	initialize : function(){
		SongsScreen.Stages = StageController.Stages;
		SongsScreen.songSelectedCb = StageController.songSelectedCb;

		SongsScreen.makeScreen();
		SongsScreen.hideScreen();
		
		// handle clicks
		SongsScreen.clickHandler = new goog.events.EventHandler();
		SongsScreen.clickHandler.listen(SongsScreen.div, [goog.events.EventType.TOUCHMOVE], SongsScreen.clicked);
		SongsScreen.clickHandler.listen(SongsScreen.songButtonContainer, [goog.events.EventType.TOUCHSTART], SongsScreen.scrollStart);
		SongsScreen.clickHandler.listen(SongsScreen.songButtonContainer, [goog.events.EventType.TOUCHEND], SongsScreen.scrollEnd);
		SongsScreen.clickHandler.listen(SongsScreen.songButtonContainer, [goog.events.EventType.TOUCHMOVE], SongsScreen.scrolling);
	},
	/** 
		click handler 
		@param {goog.events.BrowserEvent} e
	*/
	clicked : function(e){
		e.preventDefault();
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
		if (!isNaN(SongsScreen.scrollStartPosition)){
			SongsScreen.maybeReinitTouchEvent(e);
			var scrollDelta =  SongsScreen.scrollStartPosition - e.clientX;
			var thresh = 70;
			if (Math.abs(scrollDelta) > thresh){
				SongsScreen.scrollStartPosition = NaN;
				if (scrollDelta > 0){
					SongsScreen.scrollRight();
				} else {
					SongsScreen.scrollLeft();
				}
			} 
			//SongsScreen.scrollStartPosition = e.clientX;
			//SongsScreen.partsButtonsDiv.scrollTop += scrollDelta;
		}
	},
	/** 
		@param {goog.events.BrowserEvent} e
	*/
	scrollStart : function(e){
		SongsScreen.maybeReinitTouchEvent(e);
		SongsScreen.scrollStartPosition = e.clientX;
	},
	/** 
		@param {goog.events.BrowserEvent} e
	*/
	scrollEnd : function(e){
		SongsScreen.scrollStartPosition = NaN;
	},
	/** make the screen **/
	makeScreen : function(){
		// holder for the song buttons
		SongsScreen.songButtonContainer = goog.dom.createDom('div', { 'id': 'SongButtonContainer' });
		SongsScreen.songButtonsDiv = goog.dom.createDom('div', { 'id': 'SongButtons' });
		// make the top nav
		var topNav = new TopNav();
		topNav.title('songs');
		//topNav.setLeftButton('', SongsScreen.onTopNavLeftClick);
		//topNav.setRightButton('parts', SongsScreen.onTopNavRightClick);

		// make the buttons
		SongsScreen.makeSongButtons();
		// make the buttons
		SongsScreen.makeScrollButtons();
		// draw the sucker
		goog.dom.appendChild(SongsScreen.div, topNav.Element);
		goog.dom.appendChild(SongsScreen.div, SongsScreen.songButtonContainer);
		goog.dom.appendChild(SongsScreen.songButtonContainer, SongsScreen.songButtonsDiv);
	},
	/** 
		@param {number} stageNumber
	*/
	scrollToSong : function(stageNumber){
		SongsScreen.fadeButtons();
		if (SongsScreen.buttonSize === null && SongsScreen.songButtons.length > 0){
			SongsScreen.buttonSize = goog.style.getSize(SongsScreen.songButtons[0].Element);
		}
		var scrollAmnt = stageNumber * SongsScreen.buttonSize.width + 400;
		var currentScroll = SongsScreen.songButtonContainer.scrollLeft;
		if (SongsScreen.scrollAnimation !== null){
			SongsScreen.scrollAnimation.stop();
		}
		SongsScreen.scrollAnimation = new goog.fx.dom.Scroll(SongsScreen.songButtonContainer, [currentScroll, 0], [scrollAmnt, 0], 300, Animation.Easing.backOut);
		SongsScreen.scrollAnimation.play();

	},
	/** 
		scroll over to the right
	*/
	scrollRight : function(){
		if (SongsScreen.currentVisibleSong < StageController.getStageCount() - 1){
			SongsScreen.currentVisibleSong++;
			SongsScreen.scrollToSong(SongsScreen.currentVisibleSong);
		}
	},
	/** 
		scroll over to the right
	*/
	scrollLeft : function(){
		if (SongsScreen.currentVisibleSong > 0){
			SongsScreen.currentVisibleSong--;
			SongsScreen.scrollToSong(SongsScreen.currentVisibleSong);
		}
	},
	/** 
		make the buttons the right visibility
	*/
	fadeButtons : function(){
		var fullOpacity = .5;
		var fadeTime = 200;
		if (SongsScreen.currentVisibleSong === StageController.getStageCount() - 1){
			//fade out the right button
			goog.dom.classes.add(SongsScreen.rightButton.Element, "invisible");
		} else {
			//fade in the right button
			goog.dom.classes.remove(SongsScreen.rightButton.Element, "invisible");
		}
		if (SongsScreen.currentVisibleSong === 0){
			//fade out the left button
			goog.dom.classes.add(SongsScreen.leftButton.Element, "invisible");
		} else {
			//fade in the left button
			goog.dom.classes.remove(SongsScreen.leftButton.Element, "invisible");
		}
	},
	/** 
		make the two scroll buttons
	*/
	makeScrollButtons : function(){
		SongsScreen.leftButton = new Button("", SongsScreen.scrollLeft, {"id" : "LeftButton", "class" : "NavButton"});
		SongsScreen.rightButton = new Button("", SongsScreen.scrollRight, {"id" : "RightButton", "class" : "NavButton"});
		goog.dom.appendChild(SongsScreen.div, SongsScreen.leftButton.Element);
		goog.dom.appendChild(SongsScreen.div, SongsScreen.rightButton.Element);
		//fade the buttons initially to 0
		goog.dom.classes.add(SongsScreen.rightButton.Element, "invisible");
		goog.dom.classes.add(SongsScreen.leftButton.Element, "invisible");
	},
	/** 
		add song buttons and data
		@private
	*/
	makeSongButtons : function(){
		// make the buttons
		for (var stage=0; stage<StageController.getStageCount(); stage++) {
			var stageStatus = StagesModel.getStageStatus(stage);
			var s = new SongsScreenButton(stage, SongsScreen.onSongClick, stageStatus);
			goog.dom.appendChild(SongsScreen.songButtonsDiv, s.Element);
			SongsScreen.songButtons.push(s);
		}
	},
	/** 
		sets the statuses of each of the buttons
	*/
	updateSongButtons : function(){
		for (var stage=0; stage < SongsScreen.songButtons.length; stage++) {
			var button = SongsScreen.songButtons[stage];
			var stageStatus = StagesModel.getStageStatus(stage);
			button.setStatus(stageStatus);
		}
	},
	/** 
		handle any song button clicks
		@private
		@param {number} stageNumber 
	*/
	onSongClick : function(stageNumber){
		ScreenController.songSelectedCb(stageNumber);
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
		// track that we are here
		ga_storage._trackEvent('Screen', 'shown', 'SongsScreen');


		goog.style.setElementShown(SongsScreen.div, true);
		SongsScreen.updateSongButtons();
	},
	/** 
		called when the screen is shown
	*/
	onShown : function(){
		if (SongsScreen.currentVisibleSong === -1) {
			//get the first playable song
			var stage = 0;
			for (var len = StageController.getStageCount(); stage < len ; stage++){
				var status = StagesModel.getStageStatus(stage);

				if (status === StagesModel.STATUS.PLAYABLE){
					break;
				}
			}
			SongsScreen.currentVisibleSong = stage;
			setTimeout(function(){
				SongsScreen.scrollToSong(SongsScreen.currentVisibleSong);
			}, 200);
		} else {
			SongsScreen.scrollToSong(SongsScreen.currentVisibleSong);
		}
		//let the tutorial manager know
		TutorialManager.songScreen();
	},
	/** 
		Hides the screen
	*/
	hideScreen : function(){
		goog.style.setElementShown(SongsScreen.div, false);
	}
};
SongsScreen.initialize();
