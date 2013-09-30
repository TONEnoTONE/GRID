/*=============================================================================
 _______  _______  _______  _______  _______  ______    __    _    __   __  ___   _______  _     _ 
|       ||   _   ||       ||       ||       ||    _ |  |  |  | |  |  | |  ||   | |       || | _ | |
|    _  ||  |_|  ||_     _||_     _||    ___||   | ||  |   |_| |  |  |_|  ||   | |    ___|| || || |
|   |_| ||       |  |   |    |   |  |   |___ |   |_||_ |       |  |       ||   | |   |___ |       |
|    ___||       |  |   |    |   |  |    ___||    __  ||  _    |  |       ||   | |    ___||       |
|   |    |   _   |  |   |    |   |  |   |___ |   |  | || | |   |   |     | |   | |   |___ |   _   |
|___|    |__| |__|  |___|    |___|  |_______||___|  |_||_|  |__|    |___|  |___| |_______||__| |__|

the container of all the pattern elements in the GameScreen
=============================================================================*/


goog.provide("game.views.PatternView");

goog.require("screens.views.GridDom");
goog.require("game.controllers.AudioController");
goog.require("goog.math.Size");
goog.require("goog.dom");

/** 
	@typedef {Object}
*/
var PatternView = {
	/** @type {Element} */
	Container : goog.dom.createDom("div", {"id" : "PatternView"}),
	/** @type {Element} */
	Element : goog.dom.createDom("div", {"id" : "PatternScroller"}),
	/** @type {Element} */
	style : goog.dom.createDom("style", {"id" : "PatternViewAnimation"}),
	/** @type {goog.math.Size} */
	Size : new goog.math.Size(0, 0),
	/** @type {number} */
	patternLength : 0,
	/** @private
		@type {string} */
	animationName : "PatternScroll",
	/** 
		initializer
	*/
	initialize : function(){
		//add the element to the dom
		goog.dom.appendChild(PatternView.Container, PatternView.Element);
		goog.dom.appendChild(GridDom.GameScreen, PatternView.Container);
		goog.dom.appendChild(GridDom.AnimationStyles, PatternView.style);
		PatternView.Size = goog.style.getSize(PatternView.Container);
		//add the scroll definition to the style container
		PatternView.setupScroll();
	},
	/*=========================================================================
		POSITIONING
	=========================================================================*/
	/** 
		@param {Pattern.Type} type
		@returns {number} the vertical position in pixels of a type
	*/
	getNoteTopPosition : function(type){
		var multiplier = 0;
		switch(type){
			case Pattern.Type.Red :
				multiplier = 0;
				break;
			case Pattern.Type.Blue :
				multiplier = 1;
				break;
			case Pattern.Type.Green :
				multiplier = 2;
				break;
			case Pattern.Type.Yellow : 
				multiplier = 3;
				break;
			case Pattern.Type.Purple :
				multiplier = 4;
				break;
			case Pattern.Type.Rest :
				multiplier = 2;
				break;
		}
		var elSize = PatternView.Size.height / 7;
		return elSize * (multiplier + 1);
	},
	/** 
		@param {number} beatNumber
		@returns {number} the horizontal position
	*/
	getNoteLeftPosition : function(beatNumber){
		// var elWidth = PatternView.Size.width / PatternController.pattern.getLength();
		var elWidth = PatternView.Size.width / PatternView.patternLength;
		return beatNumber*elWidth;
	},
	/** 
		@returns {number}
	*/
	getNoteWidth : function(){
		return PatternView.Size.width / PatternView.patternLength;
	},
	/** 
		@returns {number} the width of the entire container
	*/
	getWidth : function(){
		return PatternView.Size.width;
	},
	/*=========================================================================
		ANIMATION
	=========================================================================*/
	/** 
		makes the scroll definition
	*/
	setupScroll : function(){
		//make a prefix and non prefix versions
		var prefix = goog.dom.vendor.getVendorPrefix()+"-";
		var cssAnimation = "";
		cssAnimation = goog.string.buildString(cssAnimation, PatternView.setupScrollWithPrefix(""));
		cssAnimation = goog.string.buildString(cssAnimation, PatternView.setupScrollWithPrefix(prefix));
		goog.dom.setTextContent(PatternView.style, cssAnimation);
	},
	/** 
		@private
		@param {string} prefix
		@returns {string} csskeyframe with prefix
	*/
	setupScrollWithPrefix : function(prefix){
		//generate the keyframes
		var csskeyframe = goog.string.buildString("@", prefix, "keyframes ", PatternView.animationName," { \n");
		csskeyframe = goog.string.buildString(csskeyframe, "from { ", prefix, "transform : translate3d(0,0,0); } \n");
		csskeyframe = goog.string.buildString(csskeyframe, "to { ", prefix, "transform : translate3d(", -PatternView.Size.width,"px ,0, 0); } \n");
		csskeyframe = goog.string.buildString(csskeyframe, " } \n");
		return csskeyframe;
	},
	scroll : function(){
		//set the scroll with the right timing
		var style = PatternView.Element.style;
		var stepNum = PatternView.patternLength;
		var duration = goog.string.buildString(AudioController.stepsToSeconds(stepNum).toFixed(3),"s");
		var animationString = goog.string.buildString(PatternView.animationName, " ", duration, " linear infinite");
		if (goog.isDef(style["animation"])){
			style["animation"] = animationString;
			style["animationPlayState"] = "running";
		} else if (goog.isDef(style[goog.dom.vendor.getPrefixedPropertyName("animation")])) {
			style[goog.dom.vendor.getPrefixedPropertyName("animation")] = animationString;
			style[goog.dom.vendor.getPrefixedPropertyName("animationPlayState")] = "running";
		}
	},
	pauseScroll : function(){
		var style = PatternView.Element.style;
		var state = "paused";
		if (goog.isDef(style["animationPlayState"])){
			style["animationPlayState"] = state;
		} else if (goog.isDef(style[goog.dom.vendor.getPrefixedPropertyName("animationPlayState")])) {
			style[goog.dom.vendor.getPrefixedPropertyName("animationPlayState")] = state;
		}
	},
	stopScroll : function(){
		var style = PatternView.Element.style;
		if (goog.isDef(style["animation"])){
			style["animation"] = "";
		} else if (goog.isDef(style[goog.dom.vendor.getPrefixedPropertyName("animation")])) {
			style[goog.dom.vendor.getPrefixedPropertyName("animation")] = "";
		}
	}

};

PatternView.initialize();