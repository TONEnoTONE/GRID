/*=============================================================================
 _______  __   __  _______  _______  _______  __    _ 
|  _    ||  | |  ||       ||       ||       ||  |  | |
| |_|   ||  | |  ||_     _||_     _||   _   ||   |_| |
|       ||  |_|  |  |   |    |   |  |  | |  ||       |
|  _   | |       |  |   |    |   |  |  |_|  ||  _    |
| |_|   ||       |  |   |    |   |  |       || | |   |
|_______||_______|  |___|    |___|  |_______||_|  |__|

=============================================================================*/

goog.provide("screens.views.Button");

goog.require("goog.Disposable");
goog.require("goog.dom");
goog.require("goog.events.EventHandler");


/** 
	@constructor
	@extends {goog.Disposable}
	@param {string} contents
	@param {function(Button)} cb	
*/
var Button = function(contents, cb){
	/** @type {Element} */
	this.Element = null;
	/** @private @type {Element} */
	this.copyElement = null;
	/** @private @type {function(Button)} */
	this.cb = function(Button){};

	goog.base(this);

	this.contents = contents;
	this.cb = cb;
	this.Element = goog.dom.createDom("div", {"class" : "Button"} );
	this.copyElement = goog.dom.createDom("div", {"class" : "ButtonTextContainer"}, contents);
	
	// handle clicks
	this.clickHandler = new goog.events.EventHandler();
	this.clickHandler.listen(this.Element, [goog.events.EventType.TOUCHEND, goog.events.EventType.CLICK], this.clicked, true, this);

	// set elements on the button
	goog.dom.appendChild(this.Element, this.copyElement);
}

goog.inherits(Button, goog.Disposable);

Button.prototype.setCopy = function(copy){
	goog.dom.setTextContent(this.copyElement, copy);
}

Button.prototype.setCb = function(cb){
	this.cb = cb;
}

Button.prototype.clicked = function(e){
	e.preventDefault();
	this.cb(this);
}

Button.prototype.show = function(){
	goog.style.setElementShown(this.Element, true);
}

Button.prototype.hide = function(){
	goog.style.setElementShown(this.Element, false);
}

/** 
	@override
*/
Button.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	this.contents = '';
	this.cb = function(Button){};
	this.clickHandler.dispose();
	goog.base(this, "disposeInternal");
}