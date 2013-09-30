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
goog.require("game.views.PatternDisplay");

/** 
	@constructor
	@extends {goog.Disposable}
*/
var PatternNoteView = function(model){
	/** @type {PatternNote} */
	this.model = model;
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"class": "PatternNote"});
	/** @type {Element} */
	this.fill = goog.dom.createDom("div", {"class": "fill"});
	/** @type {Element} */
	this.Clone = goog.dom.createDom("div", {"class": "PatternNote"});
	/** @type {Element} */
	this.fillClone = goog.dom.createDom("div", {"class": "fill"});
	this.setStyle();
	this.addToDOM();
	this.setPosition();
}

goog.inherits(PatternNoteView, goog.Disposable);

/** @override */
PatternNoteView.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	goog.dom.removeChildren(this.Clone);
	goog.dom.removeNode(this.Clone);
	this.Element = null;
	this.fill = null;
	this.Clone = null;
	this.fillClone = null;
	this.model = null;
	goog.base(this, "disposeInternal");
}

/** 
	@private
	positions the elements
*/
PatternNoteView.prototype.setPosition = function(){
	var model = this.model;
	var top = PatternDisplay.getNoteTopPosition(model.type);
	var left = PatternDisplay.getNoteLeftPosition(model.beatNumber);
	var totalWidth = PatternDisplay.getWidth();
	var noteWidth = PatternDisplay.getNoteWidth();
	goog.style.setPosition(this.Element, left, top);
	goog.style.setWidth(this.Element, noteWidth);
	//and the clone
	goog.style.setPosition(this.Clone, left + totalWidth, top);
	goog.style.setWidth(this.Clone, noteWidth);
}

/** 
	@private
	add the elemnts to the dom
*/
PatternNoteView.prototype.addToDOM = function(){
	goog.dom.appendChild(PatternDisplay.Element, this.Element);
	goog.dom.appendChild(this.Element, this.fill);
	goog.dom.appendChild(PatternDisplay.Element, this.Clone);
	goog.dom.appendChild(this.Clone, this.fillClone);
}

/** 
	@private
	styles the element appropriatly
*/
PatternNoteView.prototype.setStyle = function(){
	//set it's attributes
	goog.dom.classes.add(this.Element, this.model.type);
	goog.dom.classes.add(this.Clone, this.model.type);
}

/** 
	the hit animiation
*/
