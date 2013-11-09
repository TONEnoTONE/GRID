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
	/** @type {Array.<PatternBeatView>}*/
	this.beats = new Array(length);
	var width = this.size.width / length - 1;
	for (var i = 0; i < length; i++){
		var b = new PatternBeatView(i, this.Element, width);
		this.beats[i] = b;
	}
	this.clearHits();
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
	@param {function(PatternBeatView, number)} callback
*/
PatternView.prototype.forEach = function(callback){
	var beats = this.beats;
	for (var i = 0, len = beats.length; i < len; i++){
		callback(beats[i], i);
	}
}

/** 
	display the rests if it's a rest
	@param {Pattern} pattern
*/
PatternView.prototype.displayRests = function(pattern){
	var opacity = 1;
	this.forEach(function(beat, i){
		var beatHits = pattern.getHitsOnBeat(i);
		beat.displayRests(beatHits, opacity);
	});
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
	var opacity = 1;
	this.forEach(function(beat, i){
		var beatHits = pattern.getHitsOnBeat(i);
		beat.displayHits(beatHits, opacity);
	});
}

/** 
	@param {Pattern} target
	@param {Pattern} comp
	hits only in target are borders
	hits only in comp are fills
	hits in both are filled with border
*/
PatternView.prototype.displayCoincidence = function(target, comp){
	var opacity = 1;
	this.forEach(function(beat, i){
		var beatHits = target.getHitsOnBeat(i);
		// beat.displayBorder(beatHits, opacity);
	});
	this.forEach(function(beat, i){
		var beatHits = comp.getHitsOnBeat(i);
		// beat.displayFill(beatHits, opacity);
	});
}