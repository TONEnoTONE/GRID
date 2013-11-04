/*=============================================================================
 _______  _______  ______    ______     _______  _______  ______      ___      ___   _______  __   __  _______ 
|       ||   _   ||    _ |  |      |   |       ||       ||    _ |    |   |    |   | |       ||  | |  ||       |
|       ||  |_|  ||   | ||  |  _    |  |    _  ||_     _||   | ||    |   |    |   | |    ___||  |_|  ||_     _|
|       ||       ||   |_||_ | | |   |  |   |_| |  |   |  |   |_||_   |   |    |   | |   | __ |       |  |   |  
|      _||       ||    __  || |_|   |  |    ___|  |   |  |    __  |  |   |___ |   | |   ||  ||       |  |   |  
|     |_ |   _   ||   |  | ||       |  |   |      |   |  |   |  | |  |       ||   | |   |_| ||   _   |  |   |  
|_______||__| |__||___|  |_||______|   |___|      |___|  |___|  |_|  |_______||___| |_______||__| |__|  |___|  

=============================================================================*/


goog.provide("Card.PointerLight");

goog.require("screens.views.GridDom");
goog.require("goog.dom");
goog.require("goog.style");
goog.require('goog.events.EventTarget');

/** 
	@constructor
	@extends {goog.events.EventTarget}
*/
Card.PointerLight = function(container, position){
	goog.base(this);
	/** @type {Element} */
	this.Element = goog.dom.createDom("i", {"class" : "icon-caret-right"});
	goog.dom.appendChild(container, this.Element);
	goog.style.setPosition(this.Element, 2, 22*position + 46);
	/** @type {number}*/
	this.position = position;
	/** @type {Button} */
	this.Button = new Button("<", goog.bind(this.clicked, this), "PointerLight");
	goog.dom.appendChild(container, this.Button.Element);
	goog.style.setPosition(this.Button.Element, 120, 22*position + 46);
}	

goog.inherits(Card.PointerLight, goog.events.EventTarget);

/** 
	@param {boolean} bool
*/
Card.PointerLight.prototype.light = function(bool){
	if (bool){
		goog.dom.classes.add(this.Element, "active");
		goog.dom.classes.add(this.Button.Element, "active");
	} else {
		goog.dom.classes.remove(this.Element, "active");
		goog.dom.classes.remove(this.Button.Element, "active");
	}
}

/** 
	@param {Button} button
*/
Card.PointerLight.prototype.clicked = function(button){
	this.dispatchEvent(Card.EventType.POINTERSELECTED);
}
