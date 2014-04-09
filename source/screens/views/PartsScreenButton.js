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
goog.require('screens.views.PartsScreenButtonPattern');
goog.require("data.Util");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {number} stage
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
	this.timeout = -1;
	/** @private @type {number} */
	this.soloTimeout = -1;
	/** @type {Element} */
	this.MuteIndicator = goog.dom.createDom("div", {"id" : "MuteIndicator"});
	goog.dom.appendChild(this.Element, this.MuteIndicator);
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
	/** @type {boolean} @private*/
	this.mousedown = false;
	/** @type {boolean} @private*/
	this.muted = false;
	//seutp the mouse events
	this.setupEvents();
	//set the status
	this.setPartStatus();
	//set the status
	this.setStatusText();
	/** @private @type {PartsScreenButtonPattern} */
	this.pattern = new PartsScreenButtonPattern(stage, level, this.Element);
}

goog.inherits(PartsScreenButton, goog.Disposable);

/**
	setup the click events on the buton
	@private
*/
PartsScreenButton.prototype.setupEvents = function(){
	this.clickHandler.removeAll();
	this.clickHandler.listen(this.Element, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], goog.bind(this.startClick, this));
	this.clickHandler.listen(this.Element, [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE], goog.bind(this.mousemove, this));
	this.clickHandler.listen(document, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP], goog.bind(this.endClick, this));
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
	var timeLeft = StageController.getLockOutTime(this.stage, this.level);
	if (timeLeft > 0){
		var timeoutTime = Math.ceil(timeLeft / 60);
		var timeoutText = timeoutTime+"m break";
		goog.dom.setTextContent(this.StatusText, timeoutText);
		this.timeout = setTimeout(goog.bind(this.updateTimeout, this), 1000);
	} else {
		this.setPartStatus();
		this.setStatusText();
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
			text = "remix";
		} else {
			text = "solved";
		}
	} else if (this.status == StagesModel.STATUS.TIMEOUT) {
		//find how long it's locked out for
		this.updateTimeout();
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
PartsScreenButton.prototype.endClick = function(e){
	if (!this.mousedown){
		return;
	}
	this.mousedown = false;
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
			if (!CONST.LOCKED_LOCKED){
				this.cb(this.level);
			}
		}
	}
	//unsolo the part if in play mode
	this.playbackCallback(false, this.level);
	clearTimeout(this.soloTimeout);
}


/**
	cancels the call
	@private
	@param {goog.events.BrowserEvent} e
*/
PartsScreenButton.prototype.mousemove = function(e){
	if (this.mousedown){
		var movementThresh = 3;
		Util.maybeReinitTouchEvent(e);
		var currentPos = new goog.math.Coordinate(e.screenX, e.screenY);
		if (goog.math.Coordinate.distance(currentPos, this.startClickPosition) > movementThresh){
			this.eventCancelled = true;
			goog.dom.classes.remove(this.Element, "active");
			clearTimeout(this.soloTimeout);
		} 	
		if (this.player){
			var muteThresh = 20;
			var diff = this.startClickPosition.x - e.screenX;
			if (!this.muted &&  diff > muteThresh){
				this.muted = true;
				this.mute();
				// this.setStatusText("muted");
				//clear the solotimeout
				clearTimeout(this.soloTimeout);
				//small bar at the side
				goog.dom.classes.add(this.MuteIndicator, "muted");
				//unsolo the part if in play mode
				this.playbackCallback(false, this.level);
			} else if (this.muted && diff < -muteThresh){
				this.muted = false;
				this.unmute();
				goog.dom.classes.remove(this.MuteIndicator, "muted");
				// this.setStatusText("playing");
			} 
		}
	}
}

/** 
	@private 
*/
PartsScreenButton.prototype.soloTimeoutCallback = function(){
	this.playbackCallback(true, this.level);
}

/**
	cancels the call
	@private
	@param {goog.events.BrowserEvent} e
*/
PartsScreenButton.prototype.startClick = function(e){
	e.preventDefault();
	this.mousedown = true;
	Util.maybeReinitTouchEvent(e);
	this.startClickPosition = new goog.math.Coordinate(e.screenX, e.screenY);
	this.eventCancelled = false;
	if (this.player){
		if (!this.muted){
			this.soloTimeout = setTimeout(goog.bind(this.soloTimeoutCallback, this), 200);
		}
	} else {
		goog.dom.classes.add(this.Element, "active");
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
		var fadetime = 200;
		//fade out the stars
		var contentFade = new goog.fx.dom.FadeOut(this.Stars, fadetime);
		contentFade.play();
		//fade out the play buttons
		var starsFade = new goog.fx.dom.FadeIn(this.Playing, fadetime);
		starsFade.play();
		this.setStatusText("");
		this.pattern.fadeIn();
	}
}


/** 
	solo the part
	@param {number} partIndex
*/
PartsScreenButton.prototype.solo = function(partIndex){
	if (this.status == StagesModel.STATUS.SOLVED){
		//unmute the player
		if (this.level === partIndex){
			this.unmute();
		} else {
			this.mute();
		}
	}
}

/** 
	mute this part
*/
PartsScreenButton.prototype.mute = function(){
	if (this.player){
		this.player.mute();
		goog.dom.classes.set(this.Playing, "fa fa-volume-off");
	}
}

/** 
	unmute this part
*/
PartsScreenButton.prototype.unmute = function(){
	if (this.player){
		this.player.unmute();
		goog.dom.classes.set(this.Playing, "fa fa-volume-up");
	}
}

/** 
	solo the part
*/
PartsScreenButton.prototype.unsolo = function(){
	//unmute the player
	if (!this.muted){
		this.unmute();
	} else {
		this.mute();
	}
	
}


/** 
	plays the pattern
	@param {number} delay
*/
PartsScreenButton.prototype.playPattern = function(delay){
	//make the pattern view if it doesn't exist
	if (this.status == StagesModel.STATUS.SOLVED){
		this.muted = false;
		this.player = AudioController.playLevel(this.stage, this.level, delay);
		this.pattern.play(delay);
	}
}

/** 
	fade the pattern out and the content back in
*/
PartsScreenButton.prototype.stop = function(){
	if (this.status == StagesModel.STATUS.SOLVED){
		var fadetime = 200;
		//fade out the stars
		var contentFade = new goog.fx.dom.FadeIn(this.Stars, fadetime);
		contentFade.play();
		//fade out the play buttons
		var starsFade = new goog.fx.dom.FadeOut(this.Playing, fadetime);
		starsFade.play();
		this.setStatusText();
		//remove the indicator
		goog.dom.classes.remove(this.MuteIndicator, "muted");
		this.unmute();
		//and the pattern
		this.pattern.stop();
		this.pattern.fadeOut();
	}
	this.player = null;
	this.muted = false;
}

/** 
	@returns {boolean} true if the status should be played
*/

/** 
	@override
*/
PartsScreenButton.prototype.disposeInternal = function(){
	clearTimeout(this.timeout);
	clearTimeout(this.soloTimeout);
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.player = null;
	this.Element = null;
	this.clickHandler.dispose();
	goog.base(this, "disposeInternal");
}

