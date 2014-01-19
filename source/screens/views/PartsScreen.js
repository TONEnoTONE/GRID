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
goog.require("goog.dom.query");
goog.require("game.models.Pattern");
goog.require('goog.fx.dom.Fade');
goog.require('goog.fx.dom.FadeOut');
goog.require('goog.fx.dom.FadeIn');
goog.require("goog.fx.dom.Scroll");

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
	/** @private @type {Array} */
	partsPatterns : [],
	/** @private @type {number} */
	scrollStartPosition : -1,
	/** @private @type {number} */
	completedLevels : 0,
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
		var partCount = StageController.getLevelCount(stage);
		PartsScreen.completedLevels = 0;
		// make the buttons
		for (var i=0; i<partCount; i++) {
			var clickable = true;
			var buttonContent = "";
			var patternButton = null;

			var bCont = goog.dom.createDom('div', { 'class': 'ButtonContainer' });
			goog.dom.appendChild(PartsScreen.partsButtonsDiv, bCont);
			//get the status
			var status = StageController.getLevelStatus(stage, i);
			if ( status == StagesModel.LEVELSTATUS.SOLVED ) {
				goog.dom.classes.add(bCont, "Completed");
				// goog.string.buildString(i + 1, "/", partCount);
				// buttonContent = goog.dom.createDom("div", {"class" : "PartsScreenButtonNumber"});
				buttonContent = "";
				PartsScreen.completedLevels += 1;
			} else if ( status == StagesModel.LEVELSTATUS.LOCKED ) {
				// buttonContent = goog.dom.createDom("i", {"class" : "icon-lock"});
				buttonContent = ""
				goog.dom.classes.add(bCont, "Locked");
			} else if ( status == StagesModel.LEVELSTATUS.PLAYABLE ) {
				goog.dom.classes.add(bCont, "Playable");
			} else if ( status == StagesModel.LEVELSTATUS.PAY ) {
				buttonContent = goog.dom.createDom("i", {"class" : "icon-usd"});
				goog.dom.classes.add(bCont, "Pay");
			} else {
				buttonContent = "";
			}
			var b= new Button(buttonContent, PartsScreen.onPartClick);
			goog.dom.appendChild(bCont, b.Element);

			var level = StageController.getLevel(stage, i);
			PartsScreen.partsButtons.push( { button :b, data: level, index: i} );
		}
		PartsScreen.gradientOpacity();
	},
	/** 
		sets a gradient opacity on the completed parts
	*/
	gradientOpacity : function(){
		var fadetime = 150;
		//set the opacity of the completed levels
		var completedLevels = PartsScreen.completedLevels;
		for (var i = 0; i < completedLevels; i++){
			var element = PartsScreen.partsButtons[i].button.Element;
			var opacity = (i / completedLevels) * .5;
			var buttonFade = new goog.fx.dom.Fade(element, 1, opacity + .5, fadetime);
			buttonFade.play();
		}
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
		@param {number} stage
		@param {number} level
		@param {Element} element
	*/
	addPattern : function(stage, level, element){
		//buttonContent = "[] . [] .";
		var patternDisplayTarget = goog.dom.createDom("div", {"id" : "PatternDisplay"});
		goog.dom.appendChild(element, patternDisplayTarget);

		var pattern = StageController.getPattern(stage, level);
		var targetPattern = new Pattern(pattern.length);
		targetPattern.addPattern(pattern);
		var pv = new PatternView(patternDisplayTarget, targetPattern.getLength());	
		pv.clearHits();
		pv.displayPattern(targetPattern);
		PartsScreen.partsPatterns.push({
			element : patternDisplayTarget,
			patternView : pv,
			pattern : targetPattern,
		});
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
		//dispose the patterns
		for (var i = 0; i < PartsScreen.partsPatterns.length; i++){
			PartsScreen.partsPatterns[i].patternView.dispose();
			PartsScreen.partsPatterns[i].pattern.dispose();
		}
		PartsScreen.partsPatterns = [];
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
		//brind the scroll to the top
		PartsScreen.partsButtonsDiv.scrollTop = 0;
	},
	/** 
		called when the screen is shown
	*/
	onShown : function(){
		//move the scroll so that the next playable section is on top
		if (PartsScreen.completedLevels < PartsScreen.partsButtons.length){
			var playableButtonElement = PartsScreen.partsButtons[PartsScreen.completedLevels].button.Element;
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
	},
	/** 
		show and play the pattern
	*/
	playPattern : function(){
		var fadetime = 150;
		//fade in the pattern
		for (var i = 0; i < PartsScreen.partsPatterns.length; i++){
			var patternEl = PartsScreen.partsPatterns[i].element;
			var patternFade = new goog.fx.dom.FadeIn(patternEl, fadetime);
			patternFade.play();
			var buttonEl = PartsScreen.partsButtons[i].button.Element;
			var buttonFade = new goog.fx.dom.FadeIn(buttonEl, fadetime);
			buttonFade.play();
		}
		//fade out the numbers
		/*
		var num = document.querySelectorAll(".PartsScreenButtonNumber");
		for (var j = 0; j < num.length; j++){
			var numberFade = new goog.fx.dom.FadeOut(num[j], fadetime);
			numberFade.play();
		}*/
	},
	/** 
		stop the pattern
	*/
	stopPattern : function(){
		var fadetime = 150;
		for (var i = 0; i < PartsScreen.partsPatterns.length; i++){
			var patternEl = PartsScreen.partsPatterns[i].element;
			var patternFade = new goog.fx.dom.FadeOut(patternEl, fadetime);
			patternFade.play();
		}
		PartsScreen.gradientOpacity();
		//fade out the numbers
		/*
		var num = document.querySelectorAll(".PartsScreenButtonNumber");
		for (var j = 0; j < num.length; j++){
			var numberFade = new goog.fx.dom.FadeIn(num[j], fadetime);
			numberFade.play();
		}*/
	},

};
PartsScreen.initialize();