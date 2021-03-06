/*=============================================================================
 _______  _______  ______    __    _    __    _  _______    __   __  _     _ 
|       ||       ||    _ |  |  |  | |  |  |  | ||       |  |  | |  || | _ | |
|    _  ||_     _||   | ||  |   |_| |  |   |_| ||_     _|  |  |_|  || || || |
|   |_| |  |   |  |   |_||_ |       |  |       |  |   |    |       ||       |
|    ___|  |   |  |    __  ||  _    |  |  _    |  |   |    |       ||       |
|   |      |   |  |   |  | || | |   |  | | |   |  |   |     |     | |   _   |
|___|      |___|  |___|  |_||_|  |__|  |_|  |__|  |___|      |___|  |__| |__|

pattern note view
makes an element for each pattern note and adds it to the 
=============================================================================*/

goog.provide("game.views.PatternNoteView");

goog.require("goog.Disposable");
goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.style.transition");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {PieceType} type
	@param {Element} container
*/
var PatternNoteView = function(type, container){
	/** @type {PieceType} */
	this.type = type;
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"class": "PatternNoteView"});
	/** @type {Element} */
	this.fill = goog.dom.createDom("div", {"class": "fill"});
	/** @type {Array.<Element>} */
	this.flashes = [];
	/** @type {number} */
	this.opacity = 1;
	/** @type {boolean} */
	this.filled = false;
	/** @type {boolean} */
	this.bordered = false;
	//set it's attributes
	goog.dom.classes.add(this.Element, type);
	//add it to the container
	goog.dom.appendChild(container, this.Element);
	goog.dom.appendChild(this.Element, this.fill);
}

goog.inherits(PatternNoteView, goog.Disposable);

/** @override */
PatternNoteView.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	this.fill = null;
	goog.base(this, "disposeInternal");
}

/** 
	fade to the given opacity
	@param {number} val
*/
PatternNoteView.prototype.setOpacity = function(val){
	if (val !== this.opacity){
		this.opacity = val;
		goog.style.transition.removeAll(this.Element);
		goog.style.setStyle(this.Element, {
			'opacity': val,
			// 'transition': "opacity 100ms"
		});
	}
}

/** 
	set the display style
*/
PatternNoteView.prototype.setFill = function(){
	this.filled = true;
}

/** 

*/
PatternNoteView.prototype.setBorder = function(){
	this.bordered = true;
}

PatternNoteView.prototype.clear = function(){
	this.filled = false;
	this.bordered = false;
}


/** 
	apply the styling to the note
*/
PatternNoteView.prototype.apply = function(){
	if (this.filled && this.bordered){
		goog.dom.classes.set(this.fill,"fill filled bordered");
	} else if (this.filled) {
		goog.dom.classes.set(this.fill,"fill filled");
	} else if (this.bordered) {
		goog.dom.classes.set(this.fill,"fill bordered");
	} else {
		goog.dom.classes.set(this.fill,"fill");
	}
}

/** 
	hide it
*/
PatternNoteView.prototype.hide = function(){
	// if (this.opacity !== 0){
	// 	// this.opacity = 0;
	// 	// goog.style.setOpacity(this.Element, 0);
	// }
}

/** 
	apply an animation to the inner element
	@param {Animation.Keyframe} animation
	@param {number} cycleTime
	@param {number} delay
	@param {number=} repeats
*/
PatternNoteView.prototype.flashAnimation = function(animation, cycleTime, delay, repeats){
	var rep = repeats || "infinite"
	var flash = goog.dom.createDom("div", {"class": "flash"});
	goog.dom.appendChild(this.Element, flash);
	animation.play(flash, cycleTime, {delay : delay, repeat : rep, timing : "ease-out"});
	this.flashes.push(flash);
}

/** 
	stop the animation
*/
PatternNoteView.prototype.stopAnimation = function(animation){
	for (var i = 0; i < this.flashes.length; i++){
		var flash = this.flashes[i];
		animation.stop(flash);
		goog.dom.removeNode(flash);
	}
	this.flashes = [];
}
