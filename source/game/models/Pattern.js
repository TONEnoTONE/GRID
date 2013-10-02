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
goog.require("goog.array");
// goog.require("game.models.PatternBeat");

/** 
	a representation of a pattern hit
	@typedef {{
		beat : number,
		type : PatternType
	}}
*/
var PatternHit = {}

/** 
	@constructor
	@extends {goog.Disposable}
	@param {number=} length
*/
var Pattern = function(length){
	goog.base(this);
	/** @type {number}*/
	this.length = length || PatternController.patternLength;
	/** @type {Array.<PatternHit>} */
	this.hits = [];
}

//extends that $h!t
goog.inherits(Pattern, goog.Disposable);

/** @override */
Pattern.prototype.disposeInternal = function(){
	this.hits = null;
	goog.base(this, "disposeInternal");
}

/** 
	@param {Array} pattern
*/
Pattern.prototype.addPattern = function(pattern){
	//add the hits for the entire length of the pattern
	for (var i = 0; i < this.length; i++){
		var patternIndex = i % pattern.length;
		this.addBeat(pattern[patternIndex], i);
	}
	this.sortHits();
}

/** 
	sets a type on a note
	@param {Array.<PieceType> | PieceType} types
	@param {number} beat
*/
Pattern.prototype.addBeat = function(types, beat){
	if (goog.isArray(types)){
		for (var i = 0; i < types.length; i++){
			var type = types[i];
			if (type !== PatternType.Rest){
				this.hits.push({
					beat : beat,
					type : type
				});
			}
		}
	} else {
		if (types !== PatternType.Rest){
			this.hits.push({
				beat : beat,
				type : types
			});
		}
	}
}

/** 
	@private 
	removes the duplicates from the hit array
*/
Pattern.prototype.removeDuplicates = function(){
	if (this.hits.length > 0){
		var prev = this.hits[0];
		var ret = [];
		for (var i = 1, len = this.hits.length; i < len; i++){
			var hit = this.hits[i];
			if (Pattern.comparator(prev, hit) !== 0){
				prev = hit;
				ret.push(hit);
			}
		}
		this.hits = ret;
	}
}

/** 
	@param {PieceType} type
	@param {number} beatNumber
*/
Pattern.prototype.addHit = function(type, beatNumber){
	//make sure that it's in the range
	beatNumber = beatNumber % this.length;
	this.hits.push({
		type : type,
		beat : beatNumber
	});
	this.sortHits();
}

/** 
	@returns {number} the number of beats in the pattern
*/
Pattern.prototype.getLength = function(){
	return this.length;
}

/** 
	@private
	keep the hits array sorted for quickest lookup
*/
Pattern.prototype.sortHits = function(){
	goog.array.sort(this.hits, Pattern.comparator);
}

/** 
	@param {function(PatternHit, number)} callback
*/
Pattern.prototype.forEach = function(callback){
	for (var i = 0, len = this.hits.length; i < len; i++){
		callback(this.hits[i], i);
	}
}

/** 
	@param {number} beat
	@returns {Array.<PatternHit>} 
*/
Pattern.prototype.getHitsOnBeat = function(beat){
	var hits = [];
	//put it in the range of the Pattern
	beat = beat % this.length;
	//find the beat
	for (var i = 0, len = this.hits.length; i < len; i++){
		var hit = this.hits[i];
		if (hit.beat === beat){
			hits.push(hit);
		} else if (hit.beat > beat){
			break;
		}
	}
	return hits;
}

/** 
	@param {number} beat
	@returns {boolean} true if the beat is a rest
*/
Pattern.prototype.isBeatRest = function(beat){
	return this.getHitsOnBeat(beat).length === 0;
}

/** 
	adds the hits from the other pattern to this pattern
	@param {Pattern} pattern
*/
Pattern.prototype.combine = function(pattern){
	this.hits = goog.array.concat(this.hits, pattern.hits);
	this.sortHits();
	this.removeDuplicates();
}

/** 
	@param {Pattern} pattern
	@returns {boolean} true if the patterns are equivalent
*/
Pattern.prototype.equals = function(pattern){
	if (this.hits.length !== pattern.hits.length){
		return false;
	}
	for (var i = 0, len = this.hits.length; i < len; i++){
		var mine = this.hits[i];
		var theirs = pattern.hits[i];
		if (mine.beat !== theirs.beat || mine.type !== theirs.type){
			return false;
		}
	}
	return true;
}


/*=============================================================================
	STATIC METHODS
=============================================================================*/

/** 
	@param {PatternHit} a
	@param {PatternHit} b
	@returns {number} -1, 0, 1
*/
Pattern.comparator = function(a, b){
	if (a.beat < b.beat){
		return -1;
	} else if (a.beat > b.beat){
		return 1;
	} else if (a.type < b.type){
		return -1;
	} else if (a.type > b.type){
		return 0;
	} else {
		return 0;
	}
}