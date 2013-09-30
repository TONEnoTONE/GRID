/*=============================================================================
 _______  _______  _______  _______  _______  ______    __    _ 
|       ||   _   ||       ||       ||       ||    _ |  |  |  | |
|    _  ||  |_|  ||_     _||_     _||    ___||   | ||  |   |_| |
|   |_| ||       |  |   |    |   |  |   |___ |   |_||_ |       |
|    ___||       |  |   |    |   |  |    ___||    __  ||  _    |
|   |    |   _   |  |   |    |   |  |   |___ |   |  | || | |   |
|___|    |__| |__|  |___|    |___|  |_______||___|  |_||_|  |__|

the pattern represents the bounces of a piece
=============================================================================*/

goog.provide("game.models.Pattern");

goog.require("data.PatternType");
goog.require("game.models.PatternBeat");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {Piece} patternRepresentation
*/
var Pattern = function(piece){
	goog.base(this);
	/** @private
		@type {Piece} */
	this.piece = piece;
	/** @private
		@type {Array.<PatternBeat>} */
	this.beats = [];
}

//extends that $h!t
goog.inherits(Pattern, goog.Disposable);

/** @override */
Pattern.prototype.disposeInternal = function(){
	this.piece = null;
	goog.base(this, "disposeInternal");
}

/** 
	update the pattern from the trajectory
*/
Pattern.prototype.update = function(){
	//clear the current notes
	this.clear();
	//get the hits from the trajectory
	
	//
}

Pattern.prototype.clear = function(){
	for (var i = 0, len = this.beats.length; i < len; i++){
		this.beats[i].dispose();
		this.beats[i] = null;
	}
	this.beats = [];
}

/** 
	@returns {boolean} true if the pattern is equivalent to the passed in pattern
*/
Pattern.prototype.isEqual = function(piecePattern){
	var beatLength = this.beats.length;
	var patternLength = piecePattern.length;
	if (beatLength > patternLength){
		return false;
	}
	//are all the notes completed?
	for (var i = 0; i < patternLength; i++){
		var beatPosition = i % beatLength;
		if (!this.beats[beatPosition].isEqual(piecePattern[i])){
			return false;
		}
	}
	return true;
}

/** 
	@returns {number} the number of beats in the pattern
*/
Pattern.prototype.getLength = function(){
	return this.beats.length;
}