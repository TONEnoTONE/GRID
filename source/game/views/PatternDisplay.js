/*=============================================================================
 _______  _______  ______    __    _    ______   _______  _______  ___      __   __ 
|       ||       ||    _ |  |  |  | |  |      | |       ||       ||   |    |  | |  |
|    _  ||_     _||   | ||  |   |_| |  |  _    ||  _____||    _  ||   |    |  |_|  |
|   |_| |  |   |  |   |_||_ |       |  | | |   || |_____ |   |_| ||   |    |       |
|    ___|  |   |  |    __  ||  _    |  | |_|   ||_____  ||    ___||   |___ |_     _|
|   |      |   |  |   |  | || | |   |  |       | _____| ||   |    |       |  |   |  
|___|      |___|  |___|  |_||_|  |__|  |______| |_______||___|    |_______|  |___|  

the display area of the patterns on the game screen
=============================================================================*/


goog.provide("game.views.PatternDisplay");

goog.require("screens.views.GridDom");
goog.require("graphics.KeyframeAnimation");
goog.require("game.views.PatternBeatView");
goog.require("goog.math.Size");
goog.require("goog.dom");
goog.require("goog.userAgent");
goog.require("game.views.PatternView");

/** 
	@typedef {Object}
*/
var PatternDisplay = {
	/** @type {Element} */
	Container : goog.dom.createDom("div", {"id" : "PatternDisplay"}),
	/** @type {Element} */
	TargetContainer : goog.dom.createDom("div", {"id" : "PatternDisplayTarget"}),
	/** @type {Element} */
	UserPatternContainer : goog.dom.createDom("div", {"id" : "PatternDisplayUserPattern"}),
	/** @type {Element} */
	style : goog.dom.createDom("style", {"id" : "PatternDisplayAnimation"}),
	/** @type {goog.math.Size} */
	Size : new goog.math.Size(0, 0),
	/** @private
		@type {KeyframeAnimation} */
	scrollPlayHead : null,
	/** @private
		@type {Element} */
	playHead : goog.dom.createDom("div", {"id" : "PlayHead"}),
	/** 
		@private
		@type {PatternView}
	*/
	targetBeats : null,

	/** 
		@private
		@type {PatternView}
	*/
	userBeats : null,
	/** 
		initializer
	*/
	initialize : function(){
		//add the element to the dom
		goog.dom.appendChild(PatternDisplay.Container, PatternDisplay.TargetContainer);
		goog.dom.appendChild(PatternDisplay.Container, PatternDisplay.UserPatternContainer);
		// goog.dom.appendChild(PatternDisplay.TargetContainer, PatternDisplay.playHead);
		goog.dom.appendChild(GridDom.GameScreen, PatternDisplay.Container);
		goog.dom.appendChild(GridDom.AnimationStyles, PatternDisplay.style);
		PatternDisplay.Size = goog.style.getSize(PatternDisplay.Container);
		//add the scroll definition to the style container
		var transformString = goog.userAgent.WEBKIT ? "-webkit-transform" : "transform";
		var from = {};
		from[transformString] = "translate3d(0px, 0, 0)";
		var to = {};
		to[transformString] = "translate3d("+PatternDisplay.Size.width+"px, 0, 0)";
		PatternDisplay.scrollPlayHead = new KeyframeAnimation([ from, to]);
	},
	setStage : function(){
		PatternDisplay.reset();
		// PatternDisplay.targetBeats = new PatternView(PatternDisplay.TargetContainer, PatternController.patternLength);
		// PatternDisplay.userBeats = new PatternView(PatternDisplay.UserPatternContainer, PatternController.patternLength);
	},
	reset : function(){
		if (PatternDisplay.targetBeats){
			PatternDisplay.targetBeats.dispose();
		}
		if (PatternDisplay.userBeats){
			PatternDisplay.userBeats.dispose();
		}
	},
	/** 
		clears the entire display
	*/
	clear : function(){
		PatternDisplay.targetBeats.clearHits();
		PatternDisplay.userBeats.clearHits();
	},
	/** 
		displays the pattern on the target element
		@param {Pattern} pattern
	*/
	displayTarget : function(pattern){
		PatternDisplay.targetBeats.displayPattern(pattern);
		PatternDisplay.targetBeats.displayRests(pattern);
	},
	/** 
		displays the pattern on the user element
		@param {Pattern} pattern
	*/
	displayUser : function(pattern){
		//clear it first
		PatternDisplay.userBeats.displayPattern(pattern);
		PatternDisplay.userBeats.displayRests(pattern);
	},
	/*=========================================================================
		PLAY / STOP
	=========================================================================*/
	/** 
		flash the current beat
	*/
	startPlayHead : function(loopDuration, delay){
		PatternDisplay.scrollPlayHead.play(PatternDisplay.playHead, loopDuration, {delay : delay, repeat : "infinite"});
	},
	/** 
		animate to the stopped position
	*/
	stopPlayHead : function(){
		PatternDisplay.scrollPlayHead.stop(PatternDisplay.playHead);
		
	},
	/** 
		pause the animation
	*/
	pausePlayHead : function(){
		PatternDisplay.scrollPlayHead.pause(PatternDisplay.playHead);
	},
};

PatternDisplay.initialize();
