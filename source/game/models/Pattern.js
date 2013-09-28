/*=============================================================================
 _______  _______  _______  _______  _______  ______    __    _ 
|       ||   _   ||       ||       ||       ||    _ |  |  |  | |
|    _  ||  |_|  ||_     _||_     _||    ___||   | ||  |   |_| |
|   |_| ||       |  |   |    |   |  |   |___ |   |_||_ |       |
|    ___||       |  |   |    |   |  |    ___||    __  ||  _    |
|   |    |   _   |  |   |    |   |  |   |___ |   |  | || | |   |
|___|    |__| |__|  |___|    |___|  |_______||___|  |_||_|  |__|

=============================================================================*/

goog.provide("game.models.Pattern");

goog.require("game.models.Piece");
goog.require("game.models.PatternBeat");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {Array} patternRepresentation
*/
var Pattern = function(patternRepresentation){
	goog.base(this);
	/** 
		@private 
		@type {Array.<PatternBeat>} 
	*/
	this.beats = [];
	//make a note for each of the beats
	for (var beat = 0; beat < patternRepresentation.length; beat++){
		//each of the notes in that beat
		var notesOnBeat = patternRepresentation[beat];
		var b = new PatternBeat(notesOnBeat, beat);
		this.beats.push(b);
	}
}

//extends that $h!t
goog.inherits(Pattern, goog.Disposable);

/** @override */
Pattern.prototype.disposeInternal = function(){
	goog.base(this, "disposeInternal");
}

/** 
	@returns {boolean} true if the pattern is equivalent to the passed in pattern
*/
Pattern.prototype.isEqual = function(piecePattern){
	//are all the notes completed?
	for (var i = 0, len = this.beats.length; i < len; i++){
		if (!this.beats[i].isEqual(piecePattern[i])){
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

/** 
	@enum {string}
*/
Pattern.Type = {
	Red : Piece.Type.Red,
	Yellow : Piece.Type.Yellow,
	Green : Piece.Type.Green,
	Purple : Piece.Type.Purple,
	Blue : Piece.Type.Blue,
	Rest : "rest"
}