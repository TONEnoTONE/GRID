/*=============================================================================
 _______  _______  ______    ______     __   __  ___   _______  _     _ 
|       ||   _   ||    _ |  |      |   |  | |  ||   | |       || | _ | |
|       ||  |_|  ||   | ||  |  _    |  |  |_|  ||   | |    ___|| || || |
|       ||       ||   |_||_ | | |   |  |       ||   | |   |___ |       |
|      _||       ||    __  || |_|   |  |       ||   | |    ___||       |
|     |_ |   _   ||   |  | ||       |   |     | |   | |   |___ |   _   |
|_______||__| |__||___|  |_||______|     |___|  |___| |_______||__| |__|

=============================================================================*/

goog.provide("Card.View");

goog.require("goog.dom");
goog.require("goog.events.EventTarget");

/** 
	a card that represents an entire song
	@constructor
	@extends {goog.events.EventTarget}
	@param {string} stageName
*/
Card.View = function(stageName){
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"class" : "CardView", "id" : stageName});
	goog.dom.appendChild(document, this.Element);
}

//extend
goog.inherits(Card.View, goog.events.EventTarget);

/** @override */
Card.View.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
}