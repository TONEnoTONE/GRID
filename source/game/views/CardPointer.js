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
	/** @type {number} */
	this.level = -1;
	var pointerCount = 6;
	/** @type {Array.<Element>}*/
	this.pointers = new Array(pointerCount);
	for (var i = 0; i < pointerCount; i++){
		var el = goog.dom.createDom("i", {"class" : "icon-caret-right"});
		goog.dom.appendChild(this.Element, el);
		goog.style.setPosition(el, 2, 22*i + 46);
		this.pointers[i] = el;
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

/** 
	@param {number} level
*/
Card.Pointer.prototype.setLevel = function(level){
	if (level !== this.level){
		//if there is an old one
		if (this.level >= 0){
			//remove the class from the old one
			goog.dom.classes.remove(this.pointers[this.level], "active");
		}
		if (level < this.pointers.length){
			this.level = level;
			goog.dom.classes.add(this.pointers[level], "active");
		}
	}
}