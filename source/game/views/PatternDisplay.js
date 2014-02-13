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
		@type {Element} */
	playHead : goog.dom.createDom("div", {"id" : "PlayHead"}),
	/** @type {Array.<number>} */
	timeouts : [],
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
		// goog.dom.appendChild(PatternDisplay.Container, PatternDisplay.UserPatternContainer);
		goog.dom.appendChild(PatternDisplay.TargetContainer, PatternDisplay.playHead);
		goog.dom.appendChild(GridDom.GameScreen, PatternDisplay.Container);
		goog.dom.appendChild(GridDom.AnimationStyles, PatternDisplay.style);
		PatternDisplay.Size = goog.style.getSize(PatternDisplay.Container);
	},
	/** 
		@param {Pattern} pattern
	*/
	setStage : function(pattern){
		var len = pattern.getLength();
		PatternDisplay.targetBeats = new PatternView(PatternDisplay.TargetContainer, pattern.getLength());
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
