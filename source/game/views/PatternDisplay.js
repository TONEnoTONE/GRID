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

goog.require("Animation.Keyframe");

goog.require("goog.math.Size");
goog.require("goog.dom");
goog.require("goog.userAgent");

goog.require("screens.views.GridDom");
goog.require("game.views.PatternBeatView");
goog.require("game.views.PatternView");
goog.require("goog.dom.ViewportSizeMonitor");
goog.require("goog.events");

/** 
	@typedef {Object}
*/
var PatternDisplay = {
	/** @type {Element} */
	Container : goog.dom.createDom("div", {"id" : "PatternDisplayContainer"}),
	/** @type {Element} */
	Element : goog.dom.createDom("div", {"id" : "PatternDisplay"}),
	/** @type {Array.<number>} */
	timeouts : [],
	/** @type {goog.dom.ViewportSizeMonitor}*/
	vsm : new goog.dom.ViewportSizeMonitor(),
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
		goog.dom.appendChild(GridDom.GameScreen, PatternDisplay.Container);
		goog.dom.appendChild(PatternDisplay.Container, PatternDisplay.Element);
		//listen for changes to the size
		goog.events.listen(PatternDisplay.vsm, goog.events.EventType.RESIZE, PatternDisplay.setSize);
	},
	/** 
		@param {Pattern} pattern
	*/
	setStage : function(pattern){
		var len = pattern.getLength();
		PatternDisplay.targetBeats = new PatternView(PatternDisplay.Element, pattern.getLength());
	},
	reset : function(){
		if (PatternDisplay.targetBeats){
			PatternDisplay.targetBeats.dispose();
			PatternDisplay.targetBeats = null;
		}
		if (PatternDisplay.userBeats){
			PatternDisplay.userBeats.dispose();
		}
	},
	/** 
		@param {goog.math.Size} size
	*/
	setSize : function(size){
		if (!goog.isNull(PatternDisplay.targetBeats)){
			PatternDisplay.targetBeats.setWidth();
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
		@returns {number} the length of the displayed pattern
	*/
	patternLength : function(){
		return PatternDisplay.targetBeats.beats.length;
	},
	/** 
		displays the pattern on the target element
		@param {number=} animationTime
	*/
	displayAll : function(animationTime){
		PatternDisplay.targetBeats.displayAll(animationTime);
	},
	/** 
		displays the pattern on the target element
		@param {Pattern} pattern
	*/
	displayTarget : function(pattern){
		PatternDisplay.targetBeats.displayTarget(pattern);
		//PatternDisplay.targetBeats.displayRests(pattern);
	},
	/** 
		animate in the target pattern
		@param {Pattern} pattern
		@param {number} duration
	*/
	animateTargetPattern : function(pattern, duration){
		PatternDisplay.timeouts = [];
		PatternDisplay.targetBeats.forEach(function(beat, i){
			var playTime = duration * i;
			var beatHits = pattern.getHitsOnBeat(i);
			var timeout = setTimeout(function(){
				if (beat.Element){
					beat.clearHits();
					beat.displayBorder(beatHits);
					beat.apply();
				}
				beat = null;
			}, playTime);
			PatternDisplay.timeouts.push(timeout);
		});
	},
	/** 
		finish the entrance animation
	*/
	finishAnimation : function(){
		PatternDisplay.targetBeats.cancelAnimation();
		//cancel all of the timeouts
		for (var i = 0; i < PatternDisplay.timeouts.length; i++){
			clearTimeout(PatternDisplay.timeouts[i]);
		}
	},
	/** 
		show the user against the target with the rests
		@param {Pattern} target
		@param {Pattern} user
	*/
	displayPatterns : function(target, user){
		//clear it first
		PatternDisplay.targetBeats.clearHits();
		PatternDisplay.targetBeats.displayUser(user);
		PatternDisplay.targetBeats.displayTarget(target);
		PatternDisplay.targetBeats.apply();
		// PatternDisplay.targetBeats.displayUserAndTarget(user, target);
	},
	/*=========================================================================
		PLAY / STOP
	=========================================================================*/
	/** 
		flash the beats of the display
		@param {Pattern} pattern
		@param {number} cycleTime
		@param {number} beatTime
		@param {number} delay
		@param {number=} repeats
	*/
	start : function(pattern, cycleTime, beatTime, delay, repeats){
		PatternDisplay.targetBeats.animatePattern(pattern, cycleTime, beatTime, delay, repeats);
	},
	/** 
		run through the pattern once
		@param {Pattern} pattern
		@param {number} cycleTime
		@param {number} beatTime
		@param {number} delay
		@param {number=} repeats
	*/
	playOnce : function(pattern, cycleTime, beatTime, delay, repeats){
		PatternDisplay.targetBeats.animatePattern(pattern, cycleTime, beatTime, delay, repeats);
		//PatternDisplay.targetBeats.animateDownbeat(pattern, cycleTime, beatTime, delay, repeats + 1);
	},
	/** 
		animate to the stopped position
	*/
	stop : function(){
		if (PatternDisplay.targetBeats){
			PatternDisplay.targetBeats.stopAnimation();
		}
	},
	/** 
		pause the animation
	*/
	pause : function(){
		if (PatternDisplay.targetBeats){
			PatternDisplay.targetBeats.stopAnimation();
		}
	},
};

PatternDisplay.initialize();
