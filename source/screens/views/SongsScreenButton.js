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
	/** @type {Element} */
	this.Text = goog.dom.createDom("div", {"id" : "Text"});
	goog.dom.appendChild(this.Boomerang, this.Text);
	/** @type {Element} */
	this.Icon = goog.dom.createDom("div", {"id" : "Icon"});
	goog.dom.appendChild(this.Boomerang, this.Icon);
	/** @private @type {!goog.math.Coordinate} */
	this.startClickPosition = new goog.math.Coordinate(-1, -1);
	/** @private @type {boolean} */
	this.eventCancelled = false;
	/** @private @type {boolean} */
	this.isVisible = false;
	/** @type {goog.events.EventHandler} */
	this.clickHandler = new goog.events.EventHandler();
	/** @type {string} */
	this.position = "offRight";
	//seutp the mouse events
	this.setupEvents();
	//set the status
	this.setStatus(status);
}

goog.inherits(SongsScreenButton, goog.Disposable);

/** @override */
SongsScreenButton.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.clickHandler.dispose();
	this.clickHandler = null;
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
		goog.dom.classes.remove(this.Element, "active");
		if ( this.status == StagesModel.STATUS.PLAYABLE ||
			 this.status == StagesModel.STATUS.SOLVED ) {
			this.callback(this.stage);
		} else if ( this.status == StagesModel.STATUS.PAY ) {
			console.log("They want to pay! handle it!");
		} else if ( this.status == StagesModel.STATUS.LOCKED ) {
			console.log("locked button clicked");
			if (!CONST.LOCKED_LOCKED){
				this.callback(this.stage);
			}
		}
	}
}

/**
	sets the visibility of the button
*/
SongsScreenButton.prototype.setVisibility = function(visible){
	if (visible){
		goog.dom.classes.add(this.Element, "visible");
	} else {
		goog.dom.classes.remove(this.Element, "visible");
	}
}

/**
	sets the visibility of the button
	@param {string} position
*/
SongsScreenButton.prototype.setPosition = function(position){
	goog.dom.classes.remove(this.Element, this.position);
	this.position = position;
	goog.dom.classes.add(this.Element, this.position);
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
	set the status of the stage
	@param {StagesModel.STATUS | null} status
*/
SongsScreenButton.prototype.setStatus = function(status){
	if (status === null){
		return;
	}
	//remove the old status class
	goog.dom.classes.remove(this.Element, this.status);
	this.status = status;
	goog.dom.classes.add(this.Element, this.status);
	//if it's not locked, get the number of completed levels and set the text
	if (this.status !== StagesModel.STATUS.LOCKED){
		var total = StageController.getLevelCount(this.stage);
		var completed = StagesModel.getCompletedLevelCount(this.stage);
		goog.dom.setTextContent(this.Text, goog.string.buildString(completed, "/", total));
		//check if all of the
		if (this.isPerfect()){
			goog.dom.classes.add(this.Element, "perfect");
		}
	} else {
		goog.dom.setTextContent(this.Text, "");
	}
}

/**
	checks if all of the levels are beat with 3 stars
	@returns {boolean}
*/
SongsScreenButton.prototype.isPerfect = function(){
	var levels = StageController.getLevelCount(this.stage);
	var allPerfect = true;
	for (var level = 0; level < levels; level++){
		var perfect = StageController.getLevelStars(this.stage, level) === 3;
		allPerfect = allPerfect && perfect;
	}
	return allPerfect;
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


