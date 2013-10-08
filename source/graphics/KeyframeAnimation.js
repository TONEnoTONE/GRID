/*=============================================================================

 _______  __    _  ___   __   __  _______  _______  ___   _______  __    _ 
|   _   ||  |  | ||   | |  |_|  ||   _   ||       ||   | |       ||  |  | |
|  |_|  ||   |_| ||   | |       ||  |_|  ||_     _||   | |   _   ||   |_| |
|       ||       ||   | |       ||       |  |   |  |   | |  | |  ||       |
|       ||  _    ||   | |       ||       |  |   |  |   | |  |_|  ||  _    |
|   _   || | |   ||   | | ||_|| ||   _   |  |   |  |   | |       || | |   |
|__| |__||_|  |__||___| |_|   |_||__| |__|  |___|  |___| |_______||_|  |__|

css3 keyframe animation

=============================================================================*/

goog.provide("graphics.KeyframeAnimation");

goog.require("goog.Disposable");
goog.require("goog.string");
goog.require("goog.style");
goog.require("goog.dom.vendor");
goog.require("screens.views.GridDom");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {Element} element to apply animation to
	@param {Array.<string>} keyframes of the animation
*/

var KeyframeAnimation = function(element, keyframes){
	goog.base(this);
	/** @type {Element}*/
	this.Element = element;
	/** @type {Array.<Array | string>}*/
	this.keyframes = keyframes;
	var randString = goog.string.getRandomString();
	/** @type {string}*/
	this.id = goog.string.buildString("keyframeAnimation_", randString);
	/** @type {Element}*/
	this.style = goog.dom.createDom("style", {"id" : goog.string.buildString("keyframeStyle_", randString)});
	goog.dom.appendChild(GridDom.AnimationStyles, this.style);
	//make the animation definition
	this.initAnimation();
}

goog.inherits(KeyframeAnimation, goog.Disposable);


/** 
	@override
*/
KeyframeAnimation.prototype.disposeInternal = function(){
	this.keyframes = null;
	this.Element = null;
	goog.dom.removeChildren(this.style);
	goog.dom.removeNode(this.style);
	goog.base(this, "disposeInternal");
}

/** 
	@private
*/
KeyframeAnimation.prototype.initAnimation = function(){
	var vendor = goog.dom.vendor.getVendorPrefix()+"-";
	//the keyframes
	var keyframes = "";
	keyframes = goog.string.buildString(keyframes, this.makeKeyframes(""));
	keyframes = goog.string.buildString(keyframes, this.makeKeyframes(vendor));
	//add it to the element
	goog.dom.setTextContent(this.style, keyframes);
}

/** 
	@private
	@param {string} prefix
*/
KeyframeAnimation.prototype.makeKeyframes = function(prefix){
	var cssKeyframes = goog.string.buildString("@", prefix, "keyframes ", this.id," { \n");
	var len = this.keyframes.length;
	for (var i = 0; i < len; i++){
		var step = this.keyframes[i];
		var percent = (i / (len - 1))*100;
		var keyframe = goog.string.buildString(percent.toFixed(3), "% {", this.keyframes[i], "} \n");
		cssKeyframes = goog.string.buildString(cssKeyframes, keyframe);
	}
	cssKeyframes = goog.string.buildString(cssKeyframes, "} \n");
	//make the class which includes the 
	return cssKeyframes;
}

/**
	starts the animation with optional delay
	@param {number} duration in seconds
	@param {string=} timing (default 'linear')
	@param {number=|string=} repeat times (a number or 'infinite') default is 0
	@param {number=} delay time in seconds default is 0
*/
KeyframeAnimation.prototype.play = function(duration, timing, repeat, delay){
	timing = timing || "linear";
	repeat = repeat || 0;
	delay = delay || 0;
	var style = this.Element.style;
	var animationString = goog.string.buildString(this.id, " ", duration,"s ", timing, " ", repeat, " " , delay, "s");
	if (goog.isDef(style["animation"])){
		style["animation"] = animationString;
		style["animationPlayState"] = "running";
	} else if (goog.isDef(style[goog.dom.vendor.getPrefixedPropertyName("animation")])) {
		style[goog.dom.vendor.getPrefixedPropertyName("animation")] = animationString;
		style[goog.dom.vendor.getPrefixedPropertyName("animationPlayState")] = "running";
	}
}


/**
	pauses the animation
*/
KeyframeAnimation.prototype.pause = function(){
	var style = this.Element.style;
	var state = "paused";
	if (goog.isDef(style["animationPlayState"])){
		style["animationPlayState"] = state;
	} else if (goog.isDef(style[goog.dom.vendor.getPrefixedPropertyName("animationPlayState")])) {
		style[goog.dom.vendor.getPrefixedPropertyName("animationPlayState")] = state;
	}
}

/**
	animates back to the starting position
	@param {number} duration in seconds
*/
KeyframeAnimation.prototype.reset = function(duration){
	
}

/** 
	stop the animation
*/
KeyframeAnimation.prototype.stop = function(){
	var style = this.Element.style;
	if (goog.isDef(style["animation"])){
		style["animation"] = "";
	} else if (goog.isDef(style[goog.dom.vendor.getPrefixedPropertyName("animation")])) {
		style[goog.dom.vendor.getPrefixedPropertyName("animation")] = "";
	}
}