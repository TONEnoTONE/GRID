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
// goog.require("game.views.PatternBeatView");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {PieceType} type
	@param {number} beatNumber
*/
var PatternBeat = function(type, beatNumber){
	goog.base(this);
	/** @type {PieceType} */
	this.type = type;
	/** @type {number} */
	this.beat = beatNumber;
	//add this beat to the PatternController
	PatternController.addBeat(this);
}

goog.inherits(PatternBeat, goog.Disposable);

/** @override */
PatternBeat.prototype.disposeInternal = function(){
	PatternController.removeBeat(this);
	goog.base(this, "disposeInternal");
}

/** 
	@param {Array.<PieceType>} pieceBeat
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
	@returns {Array.<PatternType>} the beats a sorted array
*/
PatternBeat.prototype.notesAsArray = function(){
	var arr = [];
	for (var i = 0; i < this.notes.length; i++){
		var type = this.notes[i].type;
		if (type !== PatternType.Rest){
			arr[i] = type;
		}
	}
	arr.sort();
	return arr;
}