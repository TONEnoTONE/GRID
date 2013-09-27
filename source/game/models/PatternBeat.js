/*=============================================================================
 _______  _______  _______  _______  _______  ______    __    _    _______  _______  _______  _______ 
|       ||   _   ||       ||       ||       ||    _ |  |  |  | |  |  _    ||       ||   _   ||       |
|    _  ||  |_|  ||_     _||_     _||    ___||   | ||  |   |_| |  | |_|   ||    ___||  |_|  ||_     _|
|   |_| ||       |  |   |    |   |  |   |___ |   |_||_ |       |  |       ||   |___ |       |  |   |  
|    ___||       |  |   |    |   |  |    ___||    __  ||  _    |  |  _   | |    ___||       |  |   |  
|   |    |   _   |  |   |    |   |  |   |___ |   |  | || | |   |  | |_|   ||   |___ |   _   |  |   |  
|___|    |__| |__|  |___|    |___|  |_______||___|  |_||_|  |__|  |_______||_______||__| |__|  |___|  

a beat of the pattern. composed of notes
=============================================================================*/

goog.provide("game.models.PatternBeat");

goog.require("goog.Disposable");
goog.require("game.models.PatternNote");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {Array.<Pattern.Type> | Pattern.Type } beatRepresentation
	@param {number} beatNumber
*/
var PatternBeat = function(beatRepresentation, beatNumber){
	goog.base(this);
	/** @type {Array.<PatternNote>} */
	this.notes = [];
	if (goog.isArray(beatRepresentation)){
		for (var i = 0; i < beatRepresentation.length; i++) {
			var n = new PatternNote(beatRepresentation[i], beatNumber);
			this.notes.push(n);
		}
	} else {
		var n = new PatternNote(beatRepresentation, beatNumber);
		this.notes.push(n)
	}
}

goog.inherits(PatternBeat, goog.Disposable);

/** @override */
PatternBeat.prototype.disposeInternal = function(){
	goog.base(this, "disposeInternal");
}

/** 
	hits a type on this beat
	@param {Piece.Type} type
*/
PatternBeat.prototype.hit = function(type){
	for (var i = 0, len = this.notes.length; i < len; i++){
		var note = this.notes[i];
		if (note.type === type){
			note.hit = true;
		}
	}
}

/** 
	@returns {boolean} true if this beat is solved
	i.e. all it's notes have been hit
*/
PatternBeat.prototype.isSolved = function(){
	for (var i = 0, len = this.notes.length; i < len; i++){
		var note = this.notes[i];
		if (!note.hit){
			return false;
		}
	}
	return true;
}

/** 
	resets the pattern
*/
PatternBeat.prototype.reset = function(){
	for (var i = 0, len = this.notes.length; i < len; i++){
		var note = this.notes[i];
		note.hit = false;
	}
}