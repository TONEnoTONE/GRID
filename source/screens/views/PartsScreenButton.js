/*=============================================================================
PARTS SCREEN BUTTON
=============================================================================*/

goog.provide('screens.views.PartsScreenButton');

goog.require("screens.views.Button");
goog.require("goog.dom");
goog.require('goog.style');
goog.require("game.views.PatternView");
goog.require("goog.dom.query");
goog.require("game.models.Pattern");
goog.require('goog.fx.dom.Fade');
goog.require('goog.fx.dom.FadeOut');
goog.require('goog.fx.dom.FadeIn');
goog.require("goog.fx.dom.Scroll");
goog.require("game.controllers.StageController");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {number} level
	@param {number} outOf
	@param {function(number)} callback
	@param {StagesModel.LEVELSTATUS} status
*/
var PartsScreenButton = function(level, outOf, callback, status){
	goog.base(this);
	/** @type {number} */
	this.level = level;
	/** @type {StagesModel.LEVELSTATUS} */
	this.status = status;
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"class" : "Button "+status});
	/** @type {Element} */
	this.Background = goog.dom.createDom("div", {"class" : "Background"});
	goog.dom.appendChild(this.Element, this.Background);
	/** @type {Element} */
	this.Icon = goog.dom.createDom("div", {"class" : "ButtonIcon"});
	goog.dom.appendChild(this.Element, this.Icon);
	/** @type {Element} */
	this.StatusText = goog.dom.createDom("div", {"class" : "StatusText"});
	goog.dom.appendChild(this.Element, this.StatusText);
	/** @type {Element} */
	this.Stars = goog.dom.createDom("div", {"class" : "Stars"});
	goog.dom.appendChild(this.Element, this.Stars);
	/** @type {Element} */
	this.OutOf = goog.dom.createDom("div", {"class" : "OutOf"}, goog.string.buildString(level + 1, "/", outOf));
	goog.dom.appendChild(this.Element, this.OutOf);
	/** @type {Element} */
	this.PatternDisplay = null;
	/** @type {function(number)}*/
	this.cb = callback;
	/** @private @type {!goog.math.Coordinate} */
	this.startClickPosition = new goog.math.Coordinate(-1, -1);
	/** @private @type {boolean} */
	this.eventCancelled = false;
	/** @type {goog.events.EventHandler} */
	this.clickHandler = new goog.events.EventHandler();
	//seutp the mouse events
	this.setupEvents();
	//set the status
	this.setStatusText();
	if (this.status === StagesModel.LEVELSTATUS.SOLVED){
		this.setStars(3);
	}
}

goog.inherits(PartsScreenButton, goog.Disposable);

/**
	setup the click events on the buton
	@private
*/
PartsScreenButton.prototype.setupEvents = function(){
	this.clickHandler.removeAll();
	this.clickHandler.listen(this.Element, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], goog.bind(this.startClick, this));
	this.clickHandler.listen(this.Element, [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE], goog.bind(this.cancelled, this));
	this.clickHandler.listen(this.Element, [goog.events.EventType.TOUCHEND, goog.events.EventType.CLICK], goog.bind(this.clicked, this));
}

/** 
	set the text status depending on the button status
*/
PartsScreenButton.prototype.setStatusText = function(){
	var text = "";
	if ( this.status == StagesModel.LEVELSTATUS.PLAYABLE) {
		text = "play";
	} else if (this.status == StagesModel.LEVELSTATUS.SOLVED ) {
		text = "solved";
	} else if ( this.status == StagesModel.LEVELSTATUS.PAY ) {
		text = "paid";
	} else if ( this.status == StagesModel.LEVELSTATUS.LOCKED ) {
		text = "locked";
	}
	goog.dom.setTextContent(this.StatusText, text);
}


/**
	Set's the text on the button
	@private
	@param {goog.events.BrowserEvent} e
*/
PartsScreenButton.prototype.clicked = function(e){
	e.preventDefault();
	if (!this.eventCancelled){
		goog.dom.classes.remove(this.Element, "active");
		if ( this.status == StagesModel.LEVELSTATUS.PLAYABLE ||
			 this.status == StagesModel.LEVELSTATUS.SOLVED ) {
			this.cb(this.level);
		} else if ( this.status == StagesModel.LEVELSTATUS.PAY ) {
			console.log("They want to pay! handle it!");
		} else if ( this.status == StagesModel.LEVELSTATUS.LOCKED ) {
			console.log("locked button clicked");
		}
	}
}


/**
	cancels the call
	@private
	@param {goog.events.BrowserEvent} e
*/
PartsScreenButton.prototype.cancelled = function(e){
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
PartsScreenButton.prototype.startClick = function(e){
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
PartsScreenButton.prototype.maybeReinitTouchEvent = function(e) {
	var type = e.type;
	if (type == goog.events.EventType.TOUCHSTART || type == goog.events.EventType.TOUCHMOVE) {
		e.init(e.getBrowserEvent().targetTouches[0], e.currentTarget);
	} else if (type == goog.events.EventType.TOUCHEND || type == goog.events.EventType.TOUCHCANCEL) {
		e.init(e.getBrowserEvent().changedTouches[0], e.currentTarget);
	}
}

/** 
	@param {number} numStars
*/
PartsScreenButton.prototype.setStars = function(numStars){
	for (var i = 0; i < numStars; i++){
		var star = goog.dom.createDom("i", {"class" : "icon-star"});
		goog.dom.appendChild(this.Stars, star);
	}
}

/** shows the button */
PartsScreenButton.prototype.show = function(){
	goog.style.setElementShown(this.Element, true);
}

/** hides the button */
PartsScreenButton.prototype.hide = function(){
	goog.style.setElementShown(this.Element, false);
}

/** 
	@param {number} completedLevels
*/
PartsScreenButton.prototype.setGradient = function(completedLevels){
	if (this.level < completedLevels){
		var opacity = ((this.level + 1) / completedLevels) * .5 + .5;
		goog.style.setOpacity(this.Background, opacity);	
	}
}

/** 
	@param {number} stage
*/
PartsScreenButton.prototype.addPattern = function(stage){
	//make the pattern view if it doesn't exist
	if (this.status == StagesModel.LEVELSTATUS.SOLVED && !this.PatternDisplay){
		this.PatternDisplay = goog.dom.createDom("div", {"id" : "PatternDisplay"});
		goog.dom.appendChild(this.Element, this.PatternDisplay);
		var pattern = StageController.getPattern(stage, this.level);
		var targetPattern = new Pattern(pattern.length);
		targetPattern.addPattern(pattern);
		var pv = new PatternView(this.PatternDisplay, targetPattern.getLength());	
		pv.clearHits();
		pv.displayPattern(targetPattern);
	}
}

/** 
	@returns {boolean} true if the status should be played
*/

/** 
	@override
*/
PartsScreenButton.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	this.clickHandler.dispose();
	goog.base(this, "disposeInternal");
}

