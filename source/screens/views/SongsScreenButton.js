goog.provide('screens.views.SongsScreenButton');

goog.require("screens.views.Button");
goog.require("goog.dom");
goog.require('goog.style');
goog.require('goog.fx.dom.FadeOut');
goog.require('goog.fx.dom.FadeIn');
goog.require("goog.fx.dom.Scroll");
goog.require("game.controllers.StageController");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {number} stage
	@param {function(number)} callback
	@param {StagesModel.STATUS|null} status
*/
var SongsScreenButton = function(stage, callback, status){
	goog.base(this);
	/** @type {number} */
	this.stage = stage;
	/** @type {function(number)} */
	this.callback = callback;
	/** @type {StagesModel.STATUS} */
	this.status = status || StagesModel.STATUS.LOCKED;
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"class" : "SongsScreenButton"});
	goog.dom.classes.add(this.Element, StageController.getStageColor(stage));
	/** @type {Element} */
	this.Boomerang = goog.dom.createDom("div", {"id" : "Boomerang"});
	goog.dom.appendChild(this.Element, this.Boomerang);
	/** @type {Element} */
	this.Name = goog.dom.createDom("div", {"id" : "Name"}, StageController.getName(stage));
	goog.dom.appendChild(this.Boomerang, this.Name);
	/** @private @type {!goog.math.Coordinate} */
	this.startClickPosition = new goog.math.Coordinate(-1, -1);
	/** @private @type {boolean} */
	this.eventCancelled = false;
	/** @type {goog.events.EventHandler} */
	this.clickHandler = new goog.events.EventHandler();
	//seutp the mouse events
	this.setupEvents();
	//set the status
	//this.setStatusText();
}

goog.inherits(SongsScreenButton, goog.Disposable);

/** @override */
SongsScreenButton.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.callback = null;
	goog.base(this, "disposeInternal");
}

/**
	setup the click events on the buton
	@private
*/
SongsScreenButton.prototype.setupEvents = function(){
	this.clickHandler.removeAll();
	this.clickHandler.listen(this.Boomerang, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], goog.bind(this.startClick, this));
	this.clickHandler.listen(this.Boomerang, [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE], goog.bind(this.cancelled, this));
	this.clickHandler.listen(this.Boomerang, [goog.events.EventType.TOUCHEND, goog.events.EventType.CLICK], goog.bind(this.clicked, this));
}

/**
	Set's the text on the button
	@private
	@param {goog.events.BrowserEvent} e
*/
SongsScreenButton.prototype.clicked = function(e){
	e.preventDefault();
	if (!this.eventCancelled){
		goog.dom.classes.remove(this.Boomerang, "active");
		if ( this.status == StagesModel.STATUS.PLAYABLE ||
			 this.status == StagesModel.STATUS.SOLVED ) {
			this.callback(this.stage);
		} else if ( this.status == StagesModel.STATUS.PAY ) {
			console.log("They want to pay! handle it!");
		} else if ( this.status == StagesModel.STATUS.LOCKED ) {
			console.log("locked button clicked");
		}
	}
}


/**
	cancels the call
	@private
	@param {goog.events.BrowserEvent} e
*/
SongsScreenButton.prototype.cancelled = function(e){
	var movementThresh = 3;
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
SongsScreenButton.prototype.startClick = function(e){
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
SongsScreenButton.prototype.maybeReinitTouchEvent = function(e) {
	var type = e.type;
	if (type == goog.events.EventType.TOUCHSTART || type == goog.events.EventType.TOUCHMOVE) {
		e.init(e.getBrowserEvent().targetTouches[0], e.currentTarget);
	} else if (type == goog.events.EventType.TOUCHEND || type == goog.events.EventType.TOUCHCANCEL) {
		e.init(e.getBrowserEvent().changedTouches[0], e.currentTarget);
	}
}


