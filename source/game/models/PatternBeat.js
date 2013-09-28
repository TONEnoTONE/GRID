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
	@param {Array.<Piece.Type>} pieceBeat
	@returns {boolean} true if the arrays are equal
*/
PatternBeat.prototype.isEqual = function(pieceBeat){
	var notesArray = this.notesAsArray();
	//sort the arrays
	pieceBeat.sort();
	//compare them
	return goog.array.equals(notesArray, pieceBeat.sort());
}

/** 
	@private
	@returns {Array.<Pattern.Type>} the beats a sorted array
*/
PatternBeat.prototype.notesAsArray = function(){
	var arr = [];
	for (var i = 0; i < this.notes.length; i++){
		var type = this.notes[i].type;
		if (type !== Pattern.Type.Rest){
			arr[i] = type;
		}
	}
	arr.sort();
	return arr;
}