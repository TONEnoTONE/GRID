/*=============================================================================
 _______  _______  ______    ______     _______  __    _  _______  ______   
|       ||   _   ||    _ |  |      |   |       ||  |  | ||       ||    _ |  
|       ||  |_|  ||   | ||  |  _    |  |    _  ||   |_| ||_     _||   | ||  
|       ||       ||   |_||_ | | |   |  |   |_| ||       |  |   |  |   |_||_ 
|      _||       ||    __  || |_|   |  |    ___||  _    |  |   |  |    __  |
|     |_ |   _   ||   |  | ||       |  |   |    | | |   |  |   |  |   |  | |
|_______||__| |__||___|  |_||______|   |___|    |_|  |__|  |___|  |___|  |_|

=============================================================================*/

goog.provide("Card.Pointer");

goog.require("screens.views.GridDom");
goog.require("goog.dom");
goog.require("goog.style");


/** 
	@constructor
	@extends {goog.Disposable}
*/
Card.Pointer = function(){
	goog.base(this);
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"id" : "CardPointer"});
	goog.dom.appendChild(GridDom.GameScreen, this.Element);
	/** @type {Array.<Element>}*/
	this.pointers = new Array(5);
	for (var i = 0; i < 5; i++){
		var el = goog.dom.createDom("i", {"class" : "icon-caret-right"});
		goog.dom.appendChild(this.Element, el);
		goog.style.setPosition(el, 2, 34*i + 46);
	}
}

goog.inherits(Card.Pointer, goog.Disposable);

/** @override */
Card.Pointer.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	goog.base(this, "disposeInternal");
}