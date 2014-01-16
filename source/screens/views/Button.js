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
	@param {string|Element} contents
	@param {function(Button)} cb
	@param {string=} divClass
	@param {string=} divID
*/
var Button = function(contents, cb, divClass, divID){
	/** @type {Element} */
	this.Element = null;
	/** @public @type {Element} */
	this.copyElement = null;
	/** @private @type {function(Button)} */
	this.cb = function(Button){};

	goog.base(this);


	divClass = (divClass != undefined) ? divClass : "Button";

	/** @type {goog.events.EventHandler} */
	this.clickHandler = new goog.events.EventHandler();
	
	this.contents = contents;
	this.cb = cb;
	if (goog.isDef(divID)){
		this.setClickableElement(goog.dom.createDom("div", {"class" : divClass, "id" : divID}));
	} else {
		this.setClickableElement(goog.dom.createDom("div", {"class" : divClass}));
	}
	this.copyElement = goog.dom.createDom("div", {"class" : "ButtonTextContainer"});

	goog.dom.appendChild(this.Element, this.copyElement);
	
	if ( goog.isString(contents)) {
		this.setText(contents);
	//} else if (goog.typeOf("HTMLElement")) {
	} else {
		goog.dom.appendChild(this.copyElement, contents);
	}
}

goog.inherits(Button, goog.Disposable);

/**
	Sets the text on the button
	@param {string} text
*/
Button.prototype.setText = function(text){
	goog.dom.setTextContent(this.copyElement, text);
}

/**
	Sets the callback
	@param {function(Button)} cb
*/
Button.prototype.setCb = function(cb){
	this.cb = cb;
}

/**
	Set's the text on the button
	@param {Element} element
*/
Button.prototype.setClickableElement = function(element){
	this.Element = element;
	this.clickHandler.removeAll();
	this.clickHandler.listen(this.Element, [goog.events.EventType.TOUCHEND, goog.events.EventType.CLICK], this.clicked, true, this);
}

/**
	Set's the text on the button
	@private
	@param {goog.events.BrowserEvent} e
*/
Button.prototype.clicked = function(e){
	e.preventDefault();
	this.cb(this);
}

/** shows the button */
Button.prototype.show = function(){
	goog.style.setElementShown(this.Element, true);
}

/** hides the button */
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