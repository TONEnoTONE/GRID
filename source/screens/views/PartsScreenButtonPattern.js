/*=============================================================================
	PARTS SCREEN BUTTON PATTERN

	displays the animated pattern when in play mode
=============================================================================*/

goog.provide("screens.views.PartsScreenButtonPattern");

goog.require("game.controllers.StageController");
goog.require('goog.Disposable');


/** 
	@constructor
	@extends {goog.Disposable}
	@param {number} stage
	@param {number} level
	@param {Element} container
*/
var PartsScreenButtonPattern = function(stage, level, container){
	goog.base(this);
	/** @private @type {Element} */
	this.Element = goog.dom.createDom("div", {"id" : "PartsScreenButtonPattern"});
	goog.dom.appendChild(container, this.Element);
	/** @type {Pattern} */
	this.pattern = StageController.getPattern(stage, level);
	//get the colors from the pattern
	/** */
	var colors = goog.object.getKeys(StageController.getSamples(stage,level))
}

goog.inherits(PartsScreenButtonPattern, goog.Disposable);

/** 
	@override
*/
PartsScreenButtonPattern.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	goog.base(this, "disposeInternal");
}