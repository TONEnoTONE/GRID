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

/** 
	@typedef {Object}
*/
var PatternController = {
	/** @type {Pattern} */
	targetPattern : null,
	initialize : function(){
		//hmmm nothing to do here...
	},
	/** 
		@param {number} stage
		@param {number} level
		@param {number=} animationTime
	*/
	setStage : function(stage, level, animationTime){
		var pattern = StageController.getPattern(stage, level);
		//make a target pattern with this representation
		PatternController.patternLength = pattern.length;
		PatternController.targetPattern = new Pattern();
		PatternController.targetPattern.addPattern(pattern);
		PatternDisplay.setStage(PatternController.targetPattern);
		//PatternDisplay.displayTarget(PatternController.targetPattern);
		PatternDisplay.displayAll(animationTime);
	},
	/** 
		@param {number=} beatDuration
	*/
	animatePatternIn : function(beatDuration){
		beatDuration = beatDuration || 0;
		PatternDisplay.animateTargetPattern(PatternController.targetPattern, beatDuration);
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
		PatternDisplay.displayPatterns(PatternController.targetPattern, pattern);
		//display this pattern
		// PatternDisplay.display(pattern, .4);
		//display the faded target
		// PatternDisplay.display(PatternController.targetPattern, 1);
		//set the rests
		// PatternDisplay.displayRests(Pattern.combine(PatternController.targetPattern, pattern), 1);
		//glow the intersections
		// PatternDisplay.displayGlow(Pattern.intersection(PatternController.targetPattern, pattern));
	},
	/** 
		@param {Pattern} pattern
		@returns {boolean} true if the patterns are equivalent
	*/
	isTargetPattern : function(pattern){
		return Pattern.equals(PatternController.targetPattern, pattern);
	},
	/*=========================================================================
		PLAY / STOP
	=========================================================================*/
	/** 
		play the pattern
		@param {Pattern} pattern
		@param {number} delay
		@param {number} repeats
	*/
	play : function(pattern, delay, repeats){
		var duration = AudioController.stepsToSeconds(PatternController.targetPattern.getLength());
		PatternDisplay.start(pattern, duration, AudioController.stepsToSeconds(1), delay, repeats);
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
	},
}

PatternController.initialize();