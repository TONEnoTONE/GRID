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
		var ret = [prev];
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
	var len = this.length;
	if (this.isSymmetrical()){
		return len/2
	} else {
		return len;
	}
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
	@param {number} length
*/
Pattern.prototype.setLength = function(length){
	var currentLength = this.getLength();
	if (length > currentLength){
		this.extendLength(length);
	} else if (length < currentLength){
		this.shortenLength(length);
	}
}

/** 
	@private
	@param {number} length
*/
Pattern.prototype.shortenLength = function(length){
	var hits = [];
	this.forEach(function(hit){
		if (hit.beat < length){
			hits.push(hit);
		}
	});
	this.hits = hits;
	this.length = length;
}

/** 
	@private
	@param {number} length
*/
Pattern.prototype.extendLength = function(length){
	var hitsLength = this.hits.length;
	var hits = [];
	for (var i = 0; i < length; i++){
		var beatHits = this.getHitsOnBeat(i);
		for (var j = 0; j < beatHits.length; j++){
			var type = beatHits[j].type;
			hits.push({
				type : type,
				beat : i
			})
		}
	}
	this.hits = hits;
	this.length = length;
}

/** 
	@param {number} beat
	@returns {boolean} true if the beat is a rest
*/
Pattern.prototype.isBeatRest = function(beat){
	return this.getHitsOnBeat(beat).length === 0;
}

/** 
	@returns {boolean} true if the first half is the same as the second
*/
Pattern.prototype.isSymmetrical = function(){
	var len = this.length;
	if (len % 2 !== 0){
		return false;
	} else {
		var half = len / 2;
		for (var i = 0; i < half; i++){
			var hitFirst = this.getHitsOnBeat(i);
			var hitSecond = this.getHitsOnBeat(i + half);
			if (!Pattern.areHitsEqual(hitFirst, hitSecond)){
				return false;
			}
		}
	}
	return true;
}

/** 
	@returns {Pattern} a copy of this pattern
*/
Pattern.prototype.clone = function(){
	var ret = new Pattern(this.length);
	this.forEach(function(hit){
		ret.hits.push({
			type : hit.type,
			beat : hit.beat
		})
	});
	return ret;
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
		return 1;
	} else {
		return 0;
	}
}

/** 
	adds the hits from the other pattern to this pattern
	@param {Pattern} a
	@param {Pattern} b
	@returns {Pattern} combination of both patterns
*/
Pattern.combine = function(a, b){
	//make sure they're the same length
	if (a.length < b.length){
		a = a.clone();
		a.extendLength(b.length);
	} else if (b.length < a.length){
		b = b.clone();
		b.extendLength(a.length);
	}
	var ret = new Pattern(a.length);
	ret.hits = goog.array.concat(a.hits, b.hits);
	ret.sortHits();
	ret.removeDuplicates();
	return ret;
}

/** 
	subtracts a from b
	@param {Pattern} a
	@param {Pattern} b
	@returns {Pattern} a - b
*/
Pattern.difference = function(a, b){
	//make sure they're the same length
	if (a.length < b.length){
		a = a.clone();
		a.extendLength(b.length);
	} else if (b.length < a.length){
		b = b.clone();
		b.extendLength(a.length);
	}
	var retHits = [];
	a.forEach(function(hit){
		//see if b has the same hit, if so, don't add it to ret
		var bHits = b.getHitsOnBeat(hit.beat);
		var aHitInB = false;
		for (var i = 0; i < bHits.length; i++){
			if (Pattern.areHitsEqual(bHits[i], hit)){
				aHitInB = true;
				break;
			}
		}
		if (!aHitInB){
			retHits.push(hit);
		}
	});
	var ret = new Pattern(a.length);
	ret.hits = retHits;
	ret.sortHits();
	return ret;
}

/** 
	@param {Pattern} a
	@param {Pattern} b
	@returns {boolean} true if the patterns are equivalent
*/
Pattern.equals = function(a, b){
	if (a.hits.length !== b.hits.length){
		return false;
	}
	for (var i = 0, len = a.hits.length; i < len; i++){
		var aHits = a.hits[i];
		var bHits = b.hits[i];
		if (aHits.beat !== bHits.beat || aHits.type !== bHits.type){
			return false;
		}
	}
	return true;
}

/** 
	@param {Pattern} a
	@param {Pattern} b
	@returns {Pattern} the intersection of both patterns
*/
Pattern.intersection = function(a, b){
	//intersection algo from :
	//http://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
	var result = new Array();
	var ai=0, bi=0;
	while( ai < a.hits.length && bi < b.hits.length ) {
		var comparison = Pattern.comparator(a.hits[ai], b.hits[bi]);
		//if a < b
		if (comparison === -1){ 
			ai++; 
		} else if (comparison === 1){ 
			bi++; 
		/* they're equal */
		} else {
			result.push(a.hits[ai]);
			ai++;
			bi++;
		}
	}
	var ret = new Pattern(Math.max(a.length, b.length));
	ret.hits = result;
	return ret;
}


/** 
	@param {Array.<PatternHit>} a
	@param {Array.<PatternHit>} b
	@returns {boolean} true if they're equal
*/
Pattern.areHitsEqual = function(a, b){
	if (a.length !== b.length){
		return false;
	}
	for (var i = 0; i < a.length; i++){
		var hitA = a[i];
		var hitB = b[i];
		if (!(hitA && hitB && hitA.type === hitB.type)){
			return false;
		}
	}
	return true;
}

