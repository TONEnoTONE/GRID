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
	@param {function(boolean, number)} playbackCallback
*/
var PartsScreenButton = function(stage, level, outOf, callback, playbackCallback){
	goog.base(this);
	/** @type {number} */
	this.stage = stage;
	/** @type {number} */
	this.level = level;
	/** @type {number} */
	this.starCount = 0;
	/** @type {StagesModel.STATUS} */
	this.status = StagesModel.STATUS.LOCKED;
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"class" : "Button"});
	/** @type {Element} */
	this.Background = goog.dom.createDom("div", {"class" : "Background"});
	goog.dom.appendChild(this.Element, this.Background);
	/** @private @type {number} */
	this.interval = -1;
	/** @type {Element} */
	this.Icon = goog.dom.createDom("div", {"class" : "ButtonIcon fa"});
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
	this.Playing = goog.dom.createDom("i", {"id" : "Playing", "class" : "fa fa-volume-up"});
	goog.dom.appendChild(this.Element, this.Playing);
	/** @type {function(number)}*/
	this.cb = callback;
	/** @type {function(boolean, number)}*/
	this.playbackCallback = playbackCallback;
	/** @private @type {!goog.math.Coordinate} */
	this.startClickPosition = new goog.math.Coordinate(-1, -1);
	/** @private @type {boolean} */
	this.eventCancelled = false;
	/** @type {goog.events.EventHandler} */
	this.clickHandler = new goog.events.EventHandler();
	/** @type {PatternPlayer} */
	this.player = null;
	//seutp the mouse events
	this.setupEvents();
	//set the status
	this.setPartStatus();
	//set the status
	this.setStatusText();
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
	this.clickHandler.listen(this.Element, [goog.events.EventType.TOUCHEND, goog.events.EventType.CLICK, goog.events.EventType.MOUSEOUT], goog.bind(this.clicked, this));
}

/**
	set the level status
	@private
*/
PartsScreenButton.prototype.setPartStatus = function(){
	var status = StageController.getLevelStatus(this.stage, this.level);
	status = /** @type {StagesModel.STATUS} */ (status || StagesModel.STATUS.LOCKED);
	goog.dom.classes.set(this.Element, "Button "+status);
	this.status = status;
	//set the stars
	if (this.status === StagesModel.STATUS.SOLVED){
		var stars = StageController.getLevelStars(this.stage, this.level);
		this.setStars(stars);
	}
}


/** 
	@private
	updates the timeout time
*/
PartsScreenButton.prototype.updateTimeout = function(){
	var timeoutStr = this.timeoutString();
	if (timeoutStr === ""){
		goog.dom.setTextContent(this.StatusText, timeoutStr);
	} else {
		this.setPartStatus();
		this.setStatusText();
		clearInterval(this.interval);
	}
}

/** 
	@private
	the timeout text in string form
	@returns {string}
*/
PartsScreenButton.prototype.timeoutString = function(){
	var timeLeft = StageController.getLockOutTime(this.stage, this.level);
	if (timeLeft > 0){
		var timeoutTime = Math.ceil(timeLeft / 60);
		var timeoutText = timeoutTime+"m break";
		return timeoutText;
	} else {
		return "";
	}
}


/** 
	set the text status depending on the button status
	@param {string=} statusText
*/
PartsScreenButton.prototype.setStatusText = function(statusText){
	var text = "";
	if (goog.isDef(statusText)){
		text = statusText;
	} else if ( this.status == StagesModel.STATUS.PLAYABLE) {
		text = "play";
	} else if (this.status == StagesModel.STATUS.SOLVED) {
		//get the stars
		if (this.starCount === 3){
			text = "create";
		} else {
			text = "solved";
		}
	} else if (this.status == StagesModel.STATUS.TIMEOUT) {
		//find how long it's locked out for
		text = this.timeoutString();
		this.interval = setInterval(goog.bind(this.updateTimeout, this), 1000);
	} else if ( this.status == StagesModel.STATUS.PAY ) {
		text = "paid";
	} else if ( this.status == StagesModel.STATUS.LOCKED ) {
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
		if ( this.status == StagesModel.STATUS.PLAYABLE ||
			 this.status == StagesModel.STATUS.SOLVED ) {
			this.cb(this.level);
		} else if ( this.status == StagesModel.STATUS.PAY ) {
			console.log("They want to pay! handle it!");
		} else if ( this.status == StagesModel.STATUS.LOCKED ) {
			console.log("locked button clicked");
			this.cb(this.level);
		}
	}
	//unsolo the part if in play mode
	this.playbackCallback(false, this.level);
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
	if (this.player){
		this.playbackCallback(true, this.level);
	} else {
		this.maybeReinitTouchEvent(e);
		this.startClickPosition = new goog.math.Coordinate(e.screenX, e.screenY);
		goog.dom.classes.add(this.Element, "active");
	}
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
	this.starCount = numStars;
	for (var i = 0; i < 3; i++){
		var starClass = "fa-star-o";
		if (i < numStars){
			starClass = "fa-star";
		} 
		var star = goog.dom.createDom("i", {"class" : "fa "+starClass});
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
		var opacity = ((this.level) / completedLevels) * .5 + .5;
		goog.style.setOpacity(this.Background, opacity);	
	}
}

/** 
	
*/
PartsScreenButton.prototype.play = function(){
	//make the pattern view if it doesn't exist
	if (this.status == StagesModel.STATUS.SOLVED){
		var fadetime = 300;
		//fade out the stars
		var contentFade = new goog.fx.dom.FadeOut(this.Stars, fadetime);
		contentFade.play();
		//fade out the play buttons
		var starsFade = new goog.fx.dom.FadeIn(this.Playing, fadetime);
		starsFade.play();
		this.setStatusText("playing");
	}
}


/** 
	solo the part
	@param {number} partIndex
*/
PartsScreenButton.prototype.solo = function(partIndex){
	if (this.status == StagesModel.STATUS.SOLVED){
		//unmute the player
		if (this.player && this.level !== partIndex){
			this.player.mute();
			//switch the playhead 
			goog.dom.classes.set(this.Playing, "fa fa-volume-off");
		} else {
			this.unsolo();
		}
	}
}

/** 
	solo the part
*/
PartsScreenButton.prototype.unsolo = function(){
	if (this.status == StagesModel.STATUS.SOLVED){
		//unmute the player
		if (this.player){
			this.player.unmute();
			goog.dom.classes.set(this.Playing, "fa fa-volume-up");
		}
	}
}


/** 
	plays the pattern
	@param {number} delay
*/
PartsScreenButton.prototype.playPattern = function(delay){
	//make the pattern view if it doesn't exist
	if (this.status == StagesModel.STATUS.SOLVED){
		this.player = AudioController.playLevel(this.stage, this.level, delay);
	}
}

/** 
	fade the pattern out and the content back in
*/
PartsScreenButton.prototype.stop = function(){
	if (this.status == StagesModel.STATUS.SOLVED){
		var fadetime = 300;
		//fade out the stars
		var contentFade = new goog.fx.dom.FadeIn(this.Stars, fadetime);
		contentFade.play();
		//fade out the play buttons
		var starsFade = new goog.fx.dom.FadeOut(this.Playing, fadetime);
		starsFade.play();
		this.setStatusText();
	}
	this.player = null;
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
	clearInterval(this.interval);
	goog.base(this, "disposeInternal");
}

