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
	goog.dom.classes.add(this.fill, "filled");
}

PatternNoteView.prototype.setBorder = function(){
	goog.dom.classes.add(this.fill, "bordered");
}

PatternNoteView.prototype.clear = function(){
	goog.dom.classes.set(this.fill, "fill");
}

/** 
	hide it
*/
PatternNoteView.prototype.hide = function(){
	if (this.opacity !== 0){
		// this.opacity = 0;
		// goog.style.setOpacity(this.Element, 0);
	}
}

/** 
	start the animation
*/
PatternNoteView.prototype.animate = function(){

}