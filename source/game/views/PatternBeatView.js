/*=============================================================================

 _______  _______  ______    __    _    _______  _______  _______  _______    __   __  _     _ 
|       ||       ||    _ |  |  |  | |  |  _    ||       ||   _   ||       |  |  | |  || | _ | |
|    _  ||_     _||   | ||  |   |_| |  | |_|   ||    ___||  |_|  ||_     _|  |  |_|  || || || |
|   |_| |  |   |  |   |_||_ |       |  |       ||   |___ |       |  |   |    |       ||       |
|    ___|  |   |  |    __  ||  _    |  |  _   | |    ___||       |  |   |    |       ||       |
|   |      |   |  |   |  | || | |   |  | |_|   ||   |___ |   _   |  |   |     |     | |   _   |
|___|      |___|  |___|  |_||_|  |__|  |_______||_______||__| |__|  |___|      |___|  |__| |__|

=============================================================================*/

goog.provide("game.views.PatternBeatView");

goog.require("goog.Disposable");
goog.require("game.views.PatternNoteView");
goog.require("Animation.Keyframe");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {number} beatNum
	@param {Element} container
	@param {number} width
*/
var PatternBeatView = function(beatNum, container, width){
	/** @type {number}*/
	this.beat = beatNum;
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"class" : "PatternBeatView"});
	/** @type {Element} */
	this.rest = goog.dom.createDom("div", {"class" : "rest"});
	/** @type {Array.<Element>} */
	this.rests = [];
	/** @type {Object.<PatternNoteView>}*/
	this.notes = {};
	//size it correctly
	this.setWidth(width);
	//make all the note views
	var patternTypes = PieceType.toArray();
	for (var i = 0; i < patternTypes.length; i++){
		var type = patternTypes[i];
		this.notes[type] = new PatternNoteView(type, this.Element);
	}
	goog.dom.appendChild(this.Element, this.rest);
	goog.dom.appendChild(container, this.Element);
}

goog.inherits(PatternBeatView, goog.Disposable);

/** @override */
PatternBeatView.prototype.disposeInternal = function(){
	for (var type in this.notes){
		var note = this.notes[type];
		note.dispose();
	}
	this.notes = null;
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	this.rest = null;
	goog.base(this, "disposeInternal");
}

/** 
	@param {number} width
 */
PatternBeatView.prototype.setWidth = function(width){
	this.Element.style.width = width.toFixed(3) + "px";
}

/** @type {Animation.Keyframe} */
PatternBeatView.prototype.animation = new Animation.Keyframe([{opacity : 0, "-webkit-transform" : "scale(1, 1)", "transform" : "scale(1, 1)"}, 
		{opacity : 1, "-webkit-transform" : "scale(1.1, 1.5)",  "transform" : "scale(1.1, 1.5)"}, 
		{opacity : 0, "-webkit-transform" : "scale(1, 1)", "transform" : "scale(1, 1)"}], 
		[0, 1, 20]);

/** @type {Animation.Keyframe} */
/*PatternBeatView.prototype.animation = new Animation.Keyframe([
		{opacity : 0},
		{opacity : 1}, 
		{opacity : 0}], 
		[0, 1, 20]);*/

/** @type {Animation.Keyframe} */
PatternBeatView.prototype.backgroundFlash = new Animation.Keyframe([
		{opacity : 0},
		{opacity : 1}, 
		{opacity : 0}], 
		[0, 1, 20]);


/** 
	displays the rests in the hit
	@param {Array.<PatternHit>} hits
*/
PatternBeatView.prototype.displayRests = function(hits){
	if (hits.length === 0){
		// this.clearHits();
		goog.dom.classes.add(this.rest, "rested");
	} else {
		goog.dom.classes.remove(this.rest, "rested");
	}
}

/** 
	@param {Array.<PatternHit>} hits
	@param {number} opacity
*/
PatternBeatView.prototype.displayHits = function(hits, opacity){
	for (var i = 0; i < hits.length; i++){
		var note = this.notes[hits[i].type]
		note.setOpacity(opacity);
	}
}

/** 
	hides all the notes
*/
PatternBeatView.prototype.clearHits = function(){
	for (var type in this.notes){
		var note = this.notes[type];
		note.clear();
	}
}

/** 
	hides all the notes
*/
PatternBeatView.prototype.apply = function(){
	this.forEach(function(note){
		note.apply();
	});
}

/** 
	foreach
	@param {function(PatternNoteView)} callback
*/
PatternBeatView.prototype.forEach = function(callback){
	for (var type in this.notes){
		var note = this.notes[type];
		callback(note);
	}
}

/** 
	show all the notes
*/
PatternBeatView.prototype.displayAll = function(){
	for (var type in this.notes){
		var note = this.notes[type];
		note.setBorder();
		note.setFill();
	}
}



/** 
	show the border on the hits
	@param {Array.<PatternHit>} hits
*/
PatternBeatView.prototype.displayBorder  = function(hits){
	for (var i = 0; i < hits.length; i++){
		var note = this.notes[hits[i].type];
		note.setBorder();
	}
}

/** 
	show the fill on the hits
	@param {Array.<PatternHit>} hits
*/
PatternBeatView.prototype.displayFill  = function(hits){
	for (var i = 0; i < hits.length; i++){
		var note = this.notes[hits[i].type];
		note.setFill();
	}
}

/** 
	@param {Array.<PatternHit>} hits
	@param {number} cycleTime
	@param {number} delay
	@param {number=} repeats
*/
PatternBeatView.prototype.animateBeat = function(hits, cycleTime, delay, repeats){
	var rep = repeats || "infinite";
	for (var i = 0; i < hits.length; i++){
		var note = this.notes[hits[i].type];
		note.flashAnimation(this.animation, cycleTime, delay, repeats);
	}
	if (hits.length === 0){
		var restFlash = goog.dom.createDom("div", {"class" : "restFlash"});
		goog.dom.appendChild(this.rest, restFlash);
		this.rests.push(restFlash);
		this.backgroundFlash.play(restFlash, cycleTime, {delay : delay, repeat : rep});	
	}
}



/** 
	stop the animations
*/
PatternBeatView.prototype.stopAnimation = function(){
	for (var type in this.notes){
		var note = this.notes[type];
		note.stopAnimation(this.animation);
	}
	//stop the rests
	for (var i = 0; i < this.rests.length; i++){
		var rest = this.rests[i];
		this.animation.stop(rest);
		goog.dom.removeNode(rest);
	}
	this.rests = [];
}