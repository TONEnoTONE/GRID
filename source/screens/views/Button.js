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
goog.require('goog.fx.dom.Fade');


/** 
	@constructor
	@extends {goog.Disposable}
	@param {string|Element} contents
	@param {function(Button)} cb
	@param {Object=} options
*/
var Button = function(contents, cb, options){
	goog.base(this);
	/** @type {Element} */
	this.Element = null;
	/** @public @type {Element} */
	this.copyElement = null;
	/** @private @type {function(Button)} */
	this.cb = function(Button){};
	/** @private @type {!goog.math.Coordinate} */
	this.startClickPosition = new goog.math.Coordinate(-1, -1);
	/** @private @type {boolean} */
	this.eventCancelled = false;
	


	options = goog.isDef(options) ? options : {"class" : "Button"};

	/** @type {goog.events.EventHandler} */
	this.clickHandler = new goog.events.EventHandler();
	
	this.contents = contents;
	this.cb = cb;
	this.setClickableElement(goog.dom.createDom("div", options));
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
	this.clickHandler.listen(this.Element, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], goog.bind(this.startClick, this));
	this.clickHandler.listen(this.Element, [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE], goog.bind(this.cancelled, this));
	this.clickHandler.listen(this.Element, [goog.events.EventType.TOUCHEND, goog.events.EventType.CLICK, goog.events.EventType.MOUSEOUT], goog.bind(this.clicked, this));
}

/**
	Set's the text on the button
	@private
	@param {goog.events.BrowserEvent} e
*/
Button.prototype.clicked = function(e){
	e.preventDefault();
	if (!this.eventCancelled){
		goog.dom.classes.remove(this.Element, "active");
		this.cb(this);
	}
}

/**
	cancels the call
	@private
	@param {goog.events.BrowserEvent} e
*/
Button.prototype.cancelled = function(e){
	var movementThresh = 20;
	this.maybeReinitTouchEvent(e);
	var currentPos = new goog.math.Coordinate(e.screenX, e.screenY);
	if (goog.math.Coordinate.distance(currentPos, this.startClickPosition) > movementThresh){
		this.eventCancelled = true;
		goog.dom.classes.remove(this.Element, "active");
	}
}

/**
	cancels the call
	@private
	@param {goog.events.BrowserEvent} e
*/
Button.prototype.startClick = function(e){
	e.preventDefault();
	this.eventCancelled = false;
	this.maybeReinitTouchEvent(e);
	this.startClickPosition = new goog.math.Coordinate(e.screenX, e.screenY);
	goog.dom.classes.add(this.Element, "active");
}

/** 
		@private
		@param {goog.events.BrowserEvent} e
	*/
Button.prototype.maybeReinitTouchEvent = function(e) {
	var type = e.type;
	if (type == goog.events.EventType.TOUCHSTART || type == goog.events.EventType.TOUCHMOVE) {
		e.init(e.getBrowserEvent().targetTouches[0], e.currentTarget);
	} else if (type == goog.events.EventType.TOUCHEND || type == goog.events.EventType.TOUCHCANCEL) {
		e.init(e.getBrowserEvent().changedTouches[0], e.currentTarget);
	}
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