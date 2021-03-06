/*=============================================================================
 _______  _______  ______    __    _    __   __  ___   _______  _     _ 
|       ||       ||    _ |  |  |  | |  |  | |  ||   | |       || | _ | |
|    _  ||_     _||   | ||  |   |_| |  |  |_|  ||   | |    ___|| || || |
|   |_| |  |   |  |   |_||_ |       |  |       ||   | |   |___ |       |
|    ___|  |   |  |    __  ||  _    |  |       ||   | |    ___||       |
|   |      |   |  |   |  | || | |   |   |     | |   | |   |___ |   _   |
|___|      |___|  |___|  |_||_|  |__|    |___|  |___| |_______||__| |__|

=============================================================================*/

goog.provide("game.views.PatternView");

goog.require("goog.Disposable");
goog.require("game.views.PatternBeatView");
goog.require("goog.dom.classes");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {Element} container	
	@param {number} length
*/
var PatternView = function(container, length){
	goog.base(this);
	/** @type {Element}*/
	this.Element = container;
	goog.dom.classes.add(this.Element, "PatternView");
	/** @type {goog.math.Size} */
	this.size = goog.style.getSize(this.Element);
	/** @type {number} */
	this.length = length;
	/** @type {Array.<PatternBeatView>}*/
	this.beats = new Array(length);
	/** @private @type {Array.<number>} */
	this.timeouts = [];
	var width = (this.size.width - 1) / length;
	for (var i = 0; i < length; i++){
		var b = new PatternBeatView(i, this.Element, width);
		this.beats[i] = b;
	}
}

goog.inherits(PatternView, goog.Disposable);

/** @override */
PatternView.prototype.disposeInternal = function(){
	for (var i = 0; i < this.beats.length; i++){
		var beat = this.beats[i];
		beat.dispose();
		beat = null;
	}
	this.beats = null;
	goog.base(this, "disposeInternal");
}

/** 
	sets the width of the pattern
*/
PatternView.prototype.setWidth = function(){
	this.size = goog.style.getSize(this.Element);
	var width = (this.size.width - 1) / this.length;
	this.forEach(function(beat){
		beat.setWidth(width);
	});
}

/** 
	@param {function(PatternBeatView, number, number=)} callback
*/
PatternView.prototype.forEach = function(callback){
	var beats = this.beats;
	for (var i = 0, len = beats.length; i < len; i++){
		callback(beats[i], i, len);
	}
}


/** 
	clears all the hits
*/
PatternView.prototype.clearHits = function(){
	this.forEach(function(beat){
		beat.clearHits();
	});
}

/** 
	@param {Pattern} pattern
	show the pattern in the display
*/
PatternView.prototype.displayPattern = function(pattern){
	this.forEach(function(beat, i){
		var beatHits = pattern.getHitsOnBeat(i);
		beat.displayFill(beatHits);
		beat.displayBorder(beatHits);
	});
}

/** 
	shows all of the colors
	@param {number=} animationTime
*/
PatternView.prototype.displayAll = function(animationTime){
	animationTime = animationTime || 0;
	this.timeouts = [];
	var self = this;
	this.forEach(function(beat, i, length){
		var delayTime = (i + 1) * (animationTime / length);
		self.timeouts.push(setTimeout(function(){
			beat.displayAll();
			beat.apply();
		}, delayTime));
	});
}

/** 
	cancels the pending setTimeouts
*/
PatternView.prototype.cancelAnimation = function(){
	for (var i = 0; i < this.timeouts.length; i++){
		clearTimeout(this.timeouts[i]);
	}
}

/** 
	@param {Pattern} pattern
*/
PatternView.prototype.displayTarget = function(pattern){
	this.forEach(function(beat, i){
		var beatHits = pattern.getHitsOnBeat(i);
		beat.displayBorder(beatHits);
	});
}

/** 
	display the rests if it's a rest
	@param {Pattern} pattern
*/
PatternView.prototype.displayRests = function(pattern){
	this.forEach(function(beat, i){
		var beatHits = pattern.getHitsOnBeat(i);
		beat.displayRests(beatHits);
	});
}
/** 
	@param {Pattern} pattern
*/
PatternView.prototype.displayUser = function(pattern){
	this.forEach(function(beat, i){
		var beatHits = pattern.getHitsOnBeat(i);
		beat.displayFill(beatHits);
	});
}

/** 
	apply the styling
*/
PatternView.prototype.apply = function(){
	this.forEach(function(beat, i){
		beat.apply();
	});
}

/** 
	@param {Pattern} pattern
	@param {number} cycleTime
	@param {number} beatTime
	@param {number} delay
	@param {number=} repeats
*/
PatternView.prototype.animatePattern = function(pattern, cycleTime, beatTime, delay, repeats){
	var beatCount = this.beats.length;
	var beats = this.beats;
	pattern.forEachBeat(function(hits, beat){
		var beatIndex = beat % beatCount;
		var beatView = beats[beatIndex];
		beatView.animateBeat(hits, cycleTime, beat * beatTime + delay, repeats);
	});
	/*this.forEach(function(beat, i){
		var beatHits = pattern.getHitsOnBeat(i);
		beat.animateBeat(beatHits, cycleTime, beatTime * i + delay, repeats);
	});*/
}

/** 
	@param {Pattern} pattern
	@param {number} cycleTime
	@param {number} beatTime
	@param {number} delay
	@param {number=} repeats
*/
PatternView.prototype.animateDownbeat = function(pattern, cycleTime, beatTime, delay, repeats){
	var beatHits = pattern.getHitsOnBeat(0);
	var beat = this.beats[0];
	beat.animateBeat(beatHits, cycleTime, delay, repeats);
}

/** 
	stop the animation
*/
PatternView.prototype.stopAnimation = function(){
	this.forEach(function(beat, i){
		beat.stopAnimation();
	});
}



