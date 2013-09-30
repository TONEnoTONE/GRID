/*=============================================================================
 _______  _______  ______    __    _    ______   _______  _______  ___      __   __ 
|       ||       ||    _ |  |  |  | |  |      | |       ||       ||   |    |  | |  |
|    _  ||_     _||   | ||  |   |_| |  |  _    ||  _____||    _  ||   |    |  |_|  |
|   |_| |  |   |  |   |_||_ |       |  | | |   || |_____ |   |_| ||   |    |       |
|    ___|  |   |  |    __  ||  _    |  | |_|   ||_____  ||    ___||   |___ |_     _|
|   |      |   |  |   |  | || | |   |  |       | _____| ||   |    |       |  |   |  
|___|      |___|  |___|  |_||_|  |__|  |______| |_______||___|    |_______|  |___|  

the display area of the patterns on the game screen
=============================================================================*/


goog.provide("game.views.PatternDisplay");

goog.require("screens.views.GridDom");
goog.require("goog.math.Size");
goog.require("goog.dom");

/** 
	@typedef {Object}
*/
var PatternDisplay = {
	/** @type {Element} */
	Container : goog.dom.createDom("div", {"id" : "PatternDisplay"}),
	/** @type {Element} */
	Element : goog.dom.createDom("div", {"id" : "PatternScroller"}),
	/** @type {Element} */
	style : goog.dom.createDom("style", {"id" : "PatternDisplayAnimation"}),
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
		goog.dom.appendChild(PatternDisplay.Container, PatternDisplay.Element);
		goog.dom.appendChild(GridDom.GameScreen, PatternDisplay.Container);
		goog.dom.appendChild(GridDom.AnimationStyles, PatternDisplay.style);
		PatternDisplay.Size = goog.style.getSize(PatternDisplay.Container);
		//add the scroll definition to the style container
		PatternDisplay.setupScroll();
	},
	/*=========================================================================
		POSITIONING
	=========================================================================*/
	/** 
		@param {PatternType} type
		@returns {number} the vertical position in pixels of a type
	*/
	getNoteTopPosition : function(type){
		var multiplier = 0;
		switch(type){
			case PatternType.Red :
				multiplier = 0;
				break;
			case PatternType.Blue :
				multiplier = 1;
				break;
			case PatternType.Green :
				multiplier = 2;
				break;
			case PatternType.Yellow : 
				multiplier = 3;
				break;
			case PatternType.Purple :
				multiplier = 4;
				break;
			case PatternType.Rest :
				multiplier = 2;
				break;
		}
		var elSize = PatternDisplay.Size.height / 7;
		return elSize * (multiplier + 1);
	},
	/** 
		@param {number} beatNumber
		@returns {number} the horizontal position
	*/
	getNoteLeftPosition : function(beatNumber){
		var elWidth = PatternDisplay.Size.width / PatternDisplay.patternLength;
		return beatNumber*elWidth;
	},
	/** 
		@returns {number}
	*/
	getNoteWidth : function(){
		return PatternDisplay.Size.width / PatternDisplay.patternLength;
	},
	/** 
		@returns {number} the width of the entire container
	*/
	getWidth : function(){
		return PatternDisplay.Size.width;
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
		cssAnimation = goog.string.buildString(cssAnimation, PatternDisplay.setupScrollWithPrefix(""));
		cssAnimation = goog.string.buildString(cssAnimation, PatternDisplay.setupScrollWithPrefix(prefix));
		goog.dom.setTextContent(PatternDisplay.style, cssAnimation);
	},
	/** 
		@private
		@param {string} prefix
		@returns {string} csskeyframe with prefix
	*/
	setupScrollWithPrefix : function(prefix){
		//generate the keyframes
		var csskeyframe = goog.string.buildString("@", prefix, "keyframes ", PatternDisplay.animationName," { \n");
		csskeyframe = goog.string.buildString(csskeyframe, "from { ", prefix, "transform : translate3d(0,0,0); } \n");
		csskeyframe = goog.string.buildString(csskeyframe, "to { ", prefix, "transform : translate3d(", -PatternDisplay.Size.width,"px ,0, 0); } \n");
		csskeyframe = goog.string.buildString(csskeyframe, " } \n");
		return csskeyframe;
	},
	scroll : function(duration){
		//set the scroll with the right timing
		var style = PatternDisplay.Element.style;
		var stepNum = PatternDisplay.patternLength;
		var animationString = goog.string.buildString(PatternDisplay.animationName, " ", duration, " linear infinite");
		if (goog.isDef(style["animation"])){
			style["animation"] = animationString;
			style["animationPlayState"] = "running";
		} else if (goog.isDef(style[goog.dom.vendor.getPrefixedPropertyName("animation")])) {
			style[goog.dom.vendor.getPrefixedPropertyName("animation")] = animationString;
			style[goog.dom.vendor.getPrefixedPropertyName("animationPlayState")] = "running";
		}
	},
	pauseScroll : function(){
		var style = PatternDisplay.Element.style;
		var state = "paused";
		if (goog.isDef(style["animationPlayState"])){
			style["animationPlayState"] = state;
		} else if (goog.isDef(style[goog.dom.vendor.getPrefixedPropertyName("animationPlayState")])) {
			style[goog.dom.vendor.getPrefixedPropertyName("animationPlayState")] = state;
		}
	},
	stopScroll : function(){
		var style = PatternDisplay.Element.style;
		if (goog.isDef(style["animation"])){
			style["animation"] = "";
		} else if (goog.isDef(style[goog.dom.vendor.getPrefixedPropertyName("animation")])) {
			style[goog.dom.vendor.getPrefixedPropertyName("animation")] = "";
		}
	}

};

PatternDisplay.initialize();
