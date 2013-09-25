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
	/** @type {Element} */
	this.text = null;
	/** @type {string} */
	this.contents = '';
	/** @type {function(Button)} */
	this.cb = function(Button){};

	goog.base(this);

	this.contents = contents;
	this.cb = cb;
	this.Element = goog.dom.createDom("div", {"class" : "Button"} );
	this.text = goog.dom.createDom("div", {"class" : "ButtonTextContainer"}, contents);

	// handle clicks
	this.clickHandler = new goog.events.EventHandler();
	this.clickHandler.listen(this.Element, goog.events.EventType.CLICK, this.clicked, false, this);

	// set elements on the button
	goog.dom.appendChild(this.Element, this.text);
}

goog.inherits(Button, goog.Disposable);


Button.prototype.clicked = function(e){
	this.cb(this);
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