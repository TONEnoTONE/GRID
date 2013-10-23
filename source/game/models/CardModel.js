/*=============================================================================
 _______  _______  ______    ______     __   __  _______  ______   _______  ___     
|       ||   _   ||    _ |  |      |   |  |_|  ||       ||      | |       ||   |    
|       ||  |_|  ||   | ||  |  _    |  |       ||   _   ||  _    ||    ___||   |    
|       ||       ||   |_||_ | | |   |  |       ||  | |  || | |   ||   |___ |   |    
|      _||       ||    __  || |_|   |  |       ||  |_|  || |_|   ||    ___||   |___ 
|     |_ |   _   ||   |  | ||       |  | ||_|| ||       ||       ||   |___ |       |
|_______||__| |__||___|  |_||______|   |_|   |_||_______||______| |_______||_______|

=============================================================================*/

goog.provide("Card.Model");

goog.require("goog.events.EventTarget");

/** 
	@constructor
	@extends {goog.events.EventTarget}
	@param {Array.<Pattern>} patterns
*/
Card.Model = function(patterns){
	goog.base(this);
	/** @type {Array.<Pattern>} */
	this.patterns = patterns;
	/** @type {number}*/
	this.progress = 0;
	/** @type {boolean} */
	this.selected = false;
}

goog.inherits(Card.Model, goog.events.EventTarget);

/** @override */
Card.Model.prototype.disposeInternal = function(){
	for (var i = 0; i < this.patterns.length; i++){
		this.patterns[i].dispose();
		this.patterns[i] = null;
	}
	this.patterns = null;
	goog.base(this, "disposeInternal");
}

/** 
	@param {boolean} selected
	sets the piece as selected or not
*/
Card.Model.prototype.setSelected = function(selected){
	if (this.selected !== selected){
		this.selected = selected;
		this.dispatchEvent(Card.EventType.SELECTED);
	}
}