/*=============================================================================

 _______  _______  _______  _______  _______  ______    __    _    _______  _______  ______    ___     
|       ||   _   ||       ||       ||       ||    _ |  |  |  | |  |       ||       ||    _ |  |   |    
|    _  ||  |_|  ||_     _||_     _||    ___||   | ||  |   |_| |  |       ||_     _||   | ||  |   |    
|   |_| ||       |  |   |    |   |  |   |___ |   |_||_ |       |  |       |  |   |  |   |_||_ |   |    
|    ___||       |  |   |    |   |  |    ___||    __  ||  _    |  |      _|  |   |  |    __  ||   |___ 
|   |    |   _   |  |   |    |   |  |   |___ |   |  | || | |   |  |     |_   |   |  |   |  | ||       |
|___|    |__| |__|  |___|    |___|  |_______||___|  |_||_|  |__|  |_______|  |___|  |___|  |_||_______|

=============================================================================*/

goog.provide("game.controllers.PatternController");

goog.require("game.controllers.StageController");
goog.require("game.models.Pattern");
goog.require("game.views.PatternDisplay");
goog.require("goog.array");
goog.require("data.Util");

/** 
	@typedef {Object}
*/
var PatternController = {
	/** @type {Pattern} */
	targetPattern : null,
	/** @type {boolean} */
	showHints : false,
	/** init */
	initialize : function(){
		//hmmm nothing to do here...
	},
	/** 
		@param {number} stage
		@param {number} level
		@param {number=} animationTime
	*/
	setStage : function(stage, level, animationTime){
		PatternController.targetPattern = StageController.getPattern(stage, level);
		PatternController.patternLength = PatternController.targetPattern.length;
		//make a target pattern with this representation
		PatternDisplay.setStage(PatternController.targetPattern);
		PatternDisplay.displayAll(animationTime);
	},
	/** 
		@param {number} stage
		@param {number} level
	*/
	refreshPattern : function(stage, level){
		PatternController.targetPattern = StageController.getPattern(stage, level);
		PatternController.patternLength = PatternController.targetPattern.length;
		PatternController.updated(PatternController.targetPattern);
	},
	/** 
		@param {number=} beatDuration
	*/
	animatePatternIn : function(beatDuration){
		beatDuration = beatDuration || 0;
		PatternDisplay.animateTargetPattern(PatternController.targetPattern, beatDuration);
	},
	/** 
		finish the entrance animation
	*/
	finishAnimation : function(){
		PatternDisplay.finishAnimation();
		PatternController.animatePatternIn(0);
	},
	/** 
		clears both patterns
	*/
	reset : function(){
		PatternDisplay.reset();
	},
	/** 
		notification that a pattern was updated
		@param {Pattern} pattern
	*/
	updated : function(pattern){
		//clear the old version
		if (PatternController.showHints){
			PatternDisplay.displayPatterns(PatternController.targetPattern, pattern);
		}
	},
	/** 
		@param {Pattern} pattern
		@returns {boolean} true if the patterns are equivalent
	*/
	isTargetPattern : function(pattern){
		return Pattern.equals(PatternController.targetPattern, pattern);
	},
	/** 
		@param {Pattern} pattern
	*/
	setTargetPattern : function(pattern){
		PatternController.targetPattern = pattern.clone();
		//store the pattern
		StageController.setPattern(StageController.getCurrentStage(), StageController.getCurrentLevel(), pattern);
	},
	/*=========================================================================
		PLAY / STOP
	=========================================================================*/
	/** 
		play the pattern
		@param {Pattern} pattern
		@param {number} delay
		@param {number=} repeats
	*/
	play : function(pattern, delay, repeats){	
		//the length is the lcm of the target length and the pattern length
		var len = Util.lcm(pattern.length, PatternDisplay.patternLength() * 2);
		pattern.setLength(len);
		var duration = AudioController.stepsToSeconds(pattern.getLength());
		PatternDisplay.start(pattern, duration, AudioController.stepsToSeconds(1), delay, repeats);
	},
	/** 
		play the pattern
		@param {Pattern} pattern
		@param {number} delay
		@param {number=} repeats
	*/
	playOnce : function(pattern, delay, repeats){
		var duration = AudioController.stepsToSeconds(PatternController.targetPattern.getLength());
		PatternDisplay.playOnce(pattern, duration, AudioController.stepsToSeconds(1), 0, repeats);
	},
	/** 
		animate to the stopped position
	*/
	stop : function(){
		PatternDisplay.stop();
	},
	/** 
		pause the animation
	*/
	pause : function(){
		PatternDisplay.pause();
	}
}

PatternController.initialize();