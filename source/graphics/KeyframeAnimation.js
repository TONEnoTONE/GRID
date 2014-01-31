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

goog.provide("Animation.Keyframe");

goog.require("screens.views.GridDom");
goog.require("goog.Disposable");
goog.require("goog.string");
goog.require("goog.style");
goog.require("goog.dom.vendor");
goog.require("goog.events.EventHandler");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {Array.<Object>} keyframes of the animation
	@param {Array.<number>=} timing optionally specifiy the timing of the animation
	@param {Array.<string>=} easing optionally specifiy the easing of the animation
*/


Animation.Keyframe = function(keyframes, timing, easing){
	goog.base(this);
	//convert the objects into strings
	var keyframeStrings = new Array(keyframes.length);
	for (var i = 0; i < keyframes.length; i++){
		keyframeStrings[i] = goog.style.toStyleAttribute(keyframes[i]);
	}
	/** @type {Array.<string>}*/
	this.keyframes = keyframeStrings;
	/** @type {Array.<number>}*/
	this.timing = timing || [];
	/** @type {Array.<number>}*/
	this.easing = easing || [];
	//a unique animation name
	var randString = goog.string.getRandomString();
	/** @type {string}*/
	this.id = goog.string.buildString("keyframeAnimation_", randString);
	/** @type {Element}*/
	this.style = goog.dom.createDom("style", {"id" : goog.string.buildString("keyframeStyle_", randString)});
	goog.dom.appendChild(GridDom.AnimationStyles, this.style);
	//make the animation definition
	this.initAnimation();
	//make the handler for TRANSITIONEND callbacks
	this.endCallbackHandler = new goog.events.EventHandler();
}

goog.inherits(Animation.Keyframe, goog.Disposable);


/** 
	@override
*/
Animation.Keyframe.prototype.disposeInternal = function(){
	this.endCallbackHandler.dispose();
	this.keyframes = null;
	goog.dom.removeChildren(this.style);
	goog.dom.removeNode(this.style);
	goog.base(this, "disposeInternal");
}

/** 
	@private
*/
Animation.Keyframe.prototype.initAnimation = function(){
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
Animation.Keyframe.prototype.makeKeyframes = function(prefix){
	var cssKeyframes = goog.string.buildString("@", prefix, "keyframes ", this.id," { \n");
	var len = this.keyframes.length;
	for (var i = 0; i < len; i++){
		var step = this.keyframes[i];
		var perString;
		if (goog.isDef(this.timing[i])){
			perString = this.timing[i];
		} else {
			var percent = (i / (len - 1))*100;
			perString = percent.toFixed(3);
		}
		var keyframe = goog.string.buildString(perString, "% {", this.keyframes[i], "} \n");
		cssKeyframes = goog.string.buildString(cssKeyframes, keyframe);
	}
	cssKeyframes = goog.string.buildString(cssKeyframes, "} \n");
	//make the class which includes the 
	return cssKeyframes;
}
/** 
	@param {Element} element
	@param {string} attribute
	@param {number|string} value
*/
Animation.Keyframe.prototype.setPrefixedProperty = function(element, attribute, value){
	var style = element.style;
	if (goog.isDef(style[attribute])){
		style[attribute] = value;
	} else if (goog.isDef(style[goog.dom.vendor.getPrefixedPropertyName(attribute)])) {
		style[goog.dom.vendor.getPrefixedPropertyName(attribute)] = value;
	}
}

/**
	starts the animation with optional delay
	@param {Element} element
	@param {number} duration
	@param {Object|null=} properties
	@param {function()=} callback function when the animation ends
*/
Animation.Keyframe.prototype.play = function(element, duration, properties, callback){
	properties = properties || {};
	var timing = properties.timing || "linear";
	var repeat = properties.repeat || 1;
	var delay = properties.delay || 0;
	var style = element.style;
	var animationString = goog.string.buildString(this.id, " ", duration,"s ", timing, " ", delay, "s normal");
	this.setPrefixedProperty(element, "animation", animationString);
	this.setPrefixedProperty(element, "animationPlayState", "running");
	this.setPrefixedProperty(element, "animationIterationCount", repeat);
	this.setPrefixedProperty(element, "animationFillMode", "forwards");
	//add the callback handler
	if (goog.isDef(callback)){
		this.endCallbackHandler.listenOnce(element, goog.events.EventType.ANIMATIONEND, callback);
	}
}



/**
	pauses the animation
	@param {Element} element
*/
Animation.Keyframe.prototype.pause = function(element){
	this.setPrefixedProperty(element, "animationPlayState", "paused");
}

/** 
	stop the animation
	@param {Element} element
*/
Animation.Keyframe.prototype.stop = function(element){
	this.setPrefixedProperty(element, "animation", "");
}