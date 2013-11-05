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

goog.require("Card.PointerLight");

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
	/** @type {Array.<Card.PointerLight>}*/
	this.pointers = new Array(pointerCount);
	for (var i = 0; i < pointerCount; i++){
		var light = new Card.PointerLight(this.Element, i);
		goog.events.listen(light, Card.EventType.POINTERSELECTED, this.pointerSelected, false, this);
		this.pointers[i] = light;
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
			this.pointers[this.level].light(false);
		}
		if (level < this.pointers.length){
			this.level = level;
			this.pointers[this.level].light(true);
		}
	}
}

/** 
	@param {goog.events.Event} e
*/
Card.Pointer.prototype.pointerSelected = function(e){
	var light = e.target;
	// this.setLevel(light.position);
}