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
	updates the visibility of the note
*/
PatternNoteView.prototype.update = function(){
	var opacity = 1;
	goog.style.setOpacity(this.Element, opacity);
}

/** 
	show the beat
*/
PatternNoteView.prototype.show = function(){
	goog.style.transition.removeAll(this.Element);
	goog.style.setStyle(this.Element, {
		'opacity': 1,
		'transition': "opacity 100ms"
	});
}

/** 
	hide it
*/
PatternNoteView.prototype.hide = function(){
	goog.style.transition.removeAll(this.Element);
	goog.style.setStyle(this.Element, {
		'opacity': 0,
		'transition': "opacity 100ms"
	});
}

/** 
	start the animation
*/
PatternNoteView.prototype.animate = function(){

}