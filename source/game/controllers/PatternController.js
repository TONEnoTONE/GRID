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
	/**
		@type {Pattern} 
		@private
	*/
	pattern : null,
	/**
		@type {Array.<PatternBeat>} 
		@private
	*/
	targetPattern : [],
	/**
		@type {Array.<PatternBeat>} 
		@private
	*/
	realizedPattern : [],
	initialize : function(){

	},
	/** 
		@param {number} stage
		@param {number} level
	*/
	setStage : function(stage, level){
		PatternController.reset();
		var pattern = StageController.getPattern(stage, level);
		// PatternView.patternLength = pattern.length;
		PatternDisplay.patternLength = pattern.length;
		PatternController.pattern = new Pattern(pattern);
	},
	reset : function(){
		if (PatternController.pattern){
			PatternController.pattern.dispose();
		}
	},
	/** 
		@returns {boolean} true if the patterns are the same
	*/
	isEqual : function(piecePattern){
		return PatternController.pattern.isEqual(piecePattern);
	},
	/*=========================================================================
		BEATS
	=========================================================================*/
	addBeat : function(beat){
		//make sure that the beat exists before it's added

		//sort the list after
	},
	removeBeat : function(beat){

	},
	/** 
		takes two beats and returns -1, 0, or 1
		@param {PatternBeat} a
		@param {PatternBeat} b
		@returns {number}
	*/
	sortFunction : function(a, b){
		
	},
	/*=========================================================================
		PLAY / STOP
	=========================================================================*/
	/** 
		scrolling animation
	*/
	play : function(){
		// PatternView.scroll();
	},
	/** 
		animate to the stopped position
	*/
	stop : function(){
		// PatternView.stopScroll();
	},
	/** 
		pause the animation
	*/
	pause : function(){
		// PatternView.pauseScroll();
	},
}

PatternController.initialize();