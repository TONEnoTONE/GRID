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
goog.require("game.views.PatternView");

/** 
	@constructor
	@extends {goog.Disposable}
*/
var PatternNoteView = function(model){
	/** @type {PatternNote} */
	this.model = model;
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"class": "PatternNote"});
	this.fill = goog.dom.createDom("div", {"class": "fill"});
	goog.dom.classes.add(this.Element, this.model.type);
	//add it to the dom
	goog.dom.appendChild(PatternView.Element, this.Element);
	goog.dom.appendChild(this.Element, this.fill);
	//position it
	var top = PatternView.getNoteTopPosition(model.type);
	var left = PatternView.getNoteLeftPosition(model.beatNumber);
	var width = PatternView.getNoteWidth();
	goog.style.setPosition(this.Element, left, top);
	goog.style.setWidth(this.Element, width);
}

goog.inherits(PatternNoteView, goog.Disposable);

/** @override */
PatternNoteView.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	this.fill = null;
	this.model = null;
	goog.base(this, "disposeInternal");
}