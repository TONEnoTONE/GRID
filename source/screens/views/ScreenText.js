/*=============================================================================

	SCREEN TEXT

	draws text to the screen wherever necessary
=============================================================================*/

goog.provide("ScreenText");
goog.provide("ScreenText.Text");

goog.require("screens.views.GridDom");
goog.require("Animation.Keyframe");

var ScreenText = {
	/** @type {goog.storage.mechanism.HTML5LocalStorage} */
	storage : new goog.storage.mechanism.HTML5LocalStorage(),
	/** @type {Element} */
	Element : null,
	/** @type {Array.<ScreenText.Text>}*/
	onScreen : [],
	/** @type {Array.<number>}*/
	timeouts : [],
	/** init */
	initialize : function(){
		ScreenText.Element = GridDom.ScreenText;
		goog.dom.classes.add(ScreenText.Element, "visible");
	},
	/** 
		removes all the text on the screen
	*/
	hideText : function(){
		for (var i = 0; i < ScreenText.onScreen.length; i++){
			ScreenText.onScreen[i].dispose();
		}
		ScreenText.onScreen = [];
		//clear any timeouts also
		for (var i = 0; i < ScreenText.timeouts.length; i++){
			clearTimeout(ScreenText.timeouts[i]);
		}
		ScreenText.timeouts = [];
	},
	gameScreenRetry : function(){
		new ScreenText.Text("try again!", "GameScreenRetry", 10, 1500);
	},
	/** 
		show the song screen menu
	*/
	songScreenInstruction : function(){
		//if we're onboarding
		var startDelay = 7000;
		var onScreenTime = 10000;
		new ScreenText.Text("Select the first song to start", "SongScreenTopText", startDelay, onScreenTime);
		// new ScreenText.Text("Unlock each part.", "SongScreenBottomText", startDelay + 600, onScreenTime);
	},
	/** 
		show the song screen menu
	*/
	partsScreenInstructions : function(){
		//if we're onboarding
		var startDelay = 1000;
		var onScreenTime = 10000;
		new ScreenText.Text("Select the first part of the song", "PartsScreenText", startDelay, onScreenTime);
	},
	/** 
		@param {string} text
	*/
}

ScreenText.initialize();

/** 
	@extends {goog.Disposable}
	@constructor
	@param {string} text
	@param {string} style
	@param {number=} delay
	@param {number=} duration on screen
*/
ScreenText.Text = function(text, style, delay, duration){
	goog.base(this);
	/** @private @type {string} */
	this.text = text;
	/** @private @type {number} */
	this.disappearTimeout = -1;
	/** @private @type {number} */
	this.appearTimeout = -1;
	/** @private @type {Element} */
	this.Element = goog.dom.createDom("div", {"id" : style, "class" : "OnScreenText"}, text);
	goog.dom.appendChild(ScreenText.Element, this.Element);
	//adds itself to the screentext array
	ScreenText.onScreen.push(this);
	//make it appear after a delay
	delay = delay || 0;
	this.appearTimeout = setTimeout(goog.bind(this.appear, this), delay);
	//make it disappear
	if (goog.isDef(duration)){
		this.disappearTimeout = setTimeout(goog.bind(this.disappear, this), duration + delay);
	}
}

goog.inherits(ScreenText.Text, goog.Disposable);

/** @override */
ScreenText.Text.prototype.disposeInternal = function(){
	//remove self from the onScreen array
	clearTimeout(this.appearTimeout);
	clearTimeout(this.disappearTimeout);
	goog.dom.removeNode(this.Element);
	goog.dom.removeChildren(this.Element);
	this.Element = null;
	goog.base(this, "disposeInternal");
}

/** @type {Animation.Keyframe} */
ScreenText.Text.prototype.appearAnimation = new Animation.Keyframe([{"opacity" : 0}, {"opacity" : 1}]);

/** @type {Animation.Keyframe} */
ScreenText.Text.prototype.disappearAnimation = new Animation.Keyframe([{"opacity" : 1}, {"opacity" : 0}]);

/** @private @type {number}*/
ScreenText.Text.prototype.animationDuration = .2;

/** 
	appear animation
*/
ScreenText.Text.prototype.appear = function(){
	goog.dom.classes.add(this.Element, "visible");
}

/** 
	disappear animation
*/
ScreenText.Text.prototype.disappear = function(){
	goog.dom.classes.remove(this.Element, "visible");
	this.disappearTimeout = setTimeout(goog.bind(this.dispose, this), 300);
}





