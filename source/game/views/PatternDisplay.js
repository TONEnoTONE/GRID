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

/** 
	@typedef {Object}
*/
var PatternDisplay = {
	/** @type {Element} */
	Container : goog.dom.createDom("div", {"id" : "PatternDisplay"}),
	/** @type {Element} */
	Target : goog.dom.createDom("div", {"id" : "PatternDisplayTarget"}),
	/** @type {Element} */
	UserPattern : goog.dom.createDom("div", {"id" : "PatternDisplayUserPattern"}),
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
		@type {Array.<PatternBeatView>}
	*/
	targetBeats : [],
	/** 
		@private
		@type {Array.<PatternBeatView>}
	*/
	userBeats : [],
	/** 
		initializer
	*/
	initialize : function(){
		//add the element to the dom
		goog.dom.appendChild(PatternDisplay.Container, PatternDisplay.Target);
		goog.dom.appendChild(PatternDisplay.Container, PatternDisplay.UserPattern);
		goog.dom.appendChild(PatternDisplay.Target, PatternDisplay.playHead);
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
		for (var i = 0; i < PatternController.patternLength; i++){
			//add a target beat
			var t = new PatternBeatView(i, PatternDisplay.Target);
			PatternDisplay.targetBeats[i] = t;
			//and a user beat
			var u = new PatternBeatView(i, PatternDisplay.UserPattern);
			PatternDisplay.userBeats[i] = u;
		}
		//clear the user beats
		PatternDisplay.clear();
	},
	reset : function(){
		for (var i = 0; i < PatternDisplay.targetBeats.length; i++){
			PatternDisplay.targetBeats[i].dispose();
			PatternDisplay.targetBeats[i] = null;
			PatternDisplay.userBeats[i].dispose();
			PatternDisplay.userBeats[i] = null;
		}
		PatternDisplay.targetBeats = [];
		PatternDisplay.userBeats = [];
	},
	/*=========================================================================
		POSITIONING
	=========================================================================*/
	/** 
		@param {PatternType} type
		@returns {number} the vertical position in pixels of a type
	*/
	getNoteTopPosition : function(type){
		var multiplier = 0;
		switch(type){
			case PatternType.Red :
				multiplier = 0;
				break;
			case PatternType.Blue :
				multiplier = 1;
				break;
			case PatternType.Green :
				multiplier = 2;
				break;
			case PatternType.Yellow : 
				multiplier = 3;
				break;
			case PatternType.Purple :
				multiplier = 4;
				break;
			case PatternType.Rest :
				multiplier = 2;
				break;
		}
		var elSize = PatternDisplay.Size.height / 7;
		return elSize * (multiplier + 1);
	},
	/** 
		@param {number} beatNumber
		@returns {number} the horizontal position
	*/
	getNoteLeftPosition : function(beatNumber){
		var elWidth = PatternDisplay.Size.width / PatternController.patternLength;
		return beatNumber * elWidth;
	},
	/** 
		@returns {number}
	*/
	getNoteWidth : function(){
		return PatternDisplay.Size.width / PatternController.patternLength - 1;
	},
	/** 
		@returns {number} the width of the entire container
	*/
	getWidth : function(){
		return PatternDisplay.Size.width;
	},
	/*=========================================================================
		DISPLAYING PATTERNS
	=========================================================================*/
	/** 
		@param {Pattern} pattern
		@param {Array.<PatternBeatView>} beats
		@param {number=} opacity
		show the pattern in the display
	*/
	displayPatternOnElement : function(pattern, beats, opacity){
		opacity = opacity || 1;
		for (var i = 0; i < PatternController.patternLength; i++){
			var beatHits = pattern.getHitsOnBeat(i);
			beats[i].displayHits(beatHits, opacity);
		}
	},
	/** 
		@param {Pattern} pattern
		@param {Array.<PatternBeatView>} beats
		@param {number=} opacity
	*/
	displayRests : function(pattern, beats, opacity){
		opacity = opacity || 1;
		for (var i = 0; i < PatternController.patternLength; i++){
			var beatHits = pattern.getHitsOnBeat(i);
			beats[i].displayRests(beatHits, opacity);
		}
	},
	/** 
		clears the entire display
	*/
	clear : function(){
		for (var i = 0; i < PatternController.patternLength; i++){
			PatternDisplay.targetBeats[i].clearHits();
			PatternDisplay.userBeats[i].clearHits();
		}
	},
	/** 
		clears just the target display
		@param {Array.<PatternBeatView>} beats
	*/
	clearBeats : function(beats){
		for (var i = 0; i < PatternController.patternLength; i++){
			beats[i].clearHits();
		}
	},
	/** 
		@param {Pattern} pattern
	*/
	displayGlow : function(pattern){
		for (var i = 0; i < PatternController.patternLength; i++){
			var beatHits = pattern.getHitsOnBeat(i);
			PatternDisplay.targetBeats[i].glow(beatHits);
		}
	},
	/** 
		displays the pattern on the target element
		@param {Pattern} pattern
	*/
	displayTarget : function(pattern){
		//clear it first
		PatternDisplay.clearBeats(PatternDisplay.targetBeats);
		//then display the hits
		PatternDisplay.displayPatternOnElement(pattern, PatternDisplay.targetBeats);
		//then display the rests
		PatternDisplay.displayRests(pattern, PatternDisplay.targetBeats);
	},
	/** 
		displays the pattern on the user element
		@param {Pattern} pattern
	*/
	displayUser : function(pattern){
		//clear it first
		PatternDisplay.clearBeats(PatternDisplay.userBeats);
		//then display the hits
		PatternDisplay.displayPatternOnElement(pattern, PatternDisplay.userBeats);
	},
	/*=========================================================================
		PLAY / STOP
	=========================================================================*/
	/** 
		flash the current beat
	*/
	startPlayHead : function(loopDuration, delay){
		PatternDisplay.scrollPlayHead.play(PatternDisplay.playHead, loopDuration, {"delay" : delay, "repeat" : "infinite"});
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
