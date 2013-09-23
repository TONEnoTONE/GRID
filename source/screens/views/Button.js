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
*/
var Button = function(contents){
	goog.base(this);
	this.contents = contents;
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"class" : "Button"});
	this.clickHandler = new goog.events.EventHandler();
	this.clickHandler.listen(this.Element, goog.events.EventType.CLICK, this.clicked, false, this);
}

goog.inherits(Button, goog.Disposable);

Button.prototype.clicked = function(e){
	console.log("CLICKED!");
}

Button.prototype.disposeInternal = function(){
	goog.removeChildren(this.Element);
	goog.removeNode(this.Element);
	this.Element = null;
	this.contents = null;
	this.clickHandler.dispose();
	goog.base(this, "disposeInternal");
}