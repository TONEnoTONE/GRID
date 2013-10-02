/*=============================================================================
 _______  _______  _______  _______  _______  ______    __    _    _______  _______  _______  _______ 
|       ||   _   ||       ||       ||       ||    _ |  |  |  | |  |  _    ||       ||   _   ||       |
|    _  ||  |_|  ||_     _||_     _||    ___||   | ||  |   |_| |  | |_|   ||    ___||  |_|  ||_     _|
|   |_| ||       |  |   |    |   |  |   |___ |   |_||_ |       |  |       ||   |___ |       |  |   |  
|    ___||       |  |   |    |   |  |    ___||    __  ||  _    |  |  _   | |    ___||       |  |   |  
|   |    |   _   |  |   |    |   |  |   |___ |   |  | || | |   |  | |_|   ||   |___ |   _   |  |   |  
|___|    |__| |__|  |___|    |___|  |_______||___|  |_||_|  |__|  |_______||_______||__| |__|  |___|  

a beat of the pattern. 
=============================================================================*/

goog.provide("game.models.PatternBeat");

goog.require("goog.Disposable");
goog.require("data.PieceType");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {PieceType} type
	@param {number} beatNumber
*/
var PatternBeat = function(beatNumber){
	goog.base(this);
	/** @type {number} */
	this.beat = beatNumber;
	/** @type {Array.<PieceType>} */
	this.notes = [];
}

goog.inherits(PatternBeat, goog.Disposable);

/** @override */
PatternBeat.prototype.disposeInternal = function(){
	for (var i = 0; i < this.notes.length; i++){
		this.notes[i] = null;
	}
	this.notes = null;
	goog.base(this, "disposeInternal");
}

/** 
	sets a type on a note
	@param {Array.<PieceType> | PieceType}
*/
PatternBeat.prototype.hitBeat = function(types){
	if (goog.isArray(types)){
		for (var i = 0; i < types.length; i++){
			var type = types[i];
			if (type !== PatternType.Rest){
				this.notes.push(type);
			}
		}
	} else {
		if (types !== PatternType.Rest){
			this.notes.push(types);
		}
	}
}

/** 
	@param {PieceType} type
	@returns {boolean} true if the beat contains that note
*/
PatternBeat.prototype.containsType = function(type){
	return goog.array.contains(this.notes, type);
}

/** 
	@returns {boolean} true if this beat is a rest
*/
PatternBeat.prototype.isRest = function(){
	//test if there are not types assigned
	return this.notes.length === 0;
}

