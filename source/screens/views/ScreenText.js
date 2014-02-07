/*=============================================================================

	SCREEN TEXT

	draws text to the screen wherever necessary
=============================================================================*/

goog.provide("ScreenText");
goog.provide("ScreenText.Text");
goog.provide('ScreenText.GameInstruction');

goog.require("screens.views.GridDom");
goog.require("Animation.Keyframe");

var ScreenText = {
	/** @type {Element} */
	Element : null,
	/** @type {Element} */
	Background : goog.dom.createDom("div", {"id" : "Background"}),
	/** @type {Array.<ScreenText.Text>}*/
	onScreen : [],
	onClicks : [],
	/** init */
	initialize : function(){
		ScreenText.Element = GridDom.ScreenText;
		goog.dom.classes.add(ScreenText.Element, "visible");
		goog.dom.appendChild(ScreenText.Element, ScreenText.Background);
		//remove it once its been clicked
		goog.events.listen(document, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], ScreenText.removeOnClick);
	},
	/** 
		removes all the text on the screen
	*/
	hideText : function(){
		for (var i = 0; i < ScreenText.onScreen.length; i++){
			ScreenText.onScreen[i].disappear();
		}
		ScreenText.onScreen = [];
	},
	gameScreenRetry : function(){
		new ScreenText.Text("try again!", "GameScreenRetry", 10, 1500);
	},
	removeOnClick : function(){
		for (var i = 0; i < ScreenText.onClicks.length; i++){
			ScreenText.onClicks[i].disappear();
		}
		ScreenText.onClicks = [];
	},
	/** 
		show the song screen menu
	*/
	songScreenInstruction : function(){
		//if we're onboarding
		var startDelay = 2000;
		var onScreenTime = 1000;
		new ScreenText.Text("First Song", "SongScreenClickHere", startDelay, onScreenTime);
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
	/*=========================================================================
		GAME SCREEN
	=========================================================================*/
	/** 
		highlight the piece
	*/
	gameScreenDragPiece : function(){
		//if we're onboarding
		var startDelay = 1500;
		new ScreenText.Text("", "GameScreenPieceDrag", startDelay, undefined);
	},
	/** 
		@param {string} instruction0
		@param {string=} instruction1
		@param {number=} delay
	*/
	gameScreenInstruction : function(instruction0, instruction1, delay){
		if (goog.isDef(instruction1)){
			var firstScreenDuration = 1500;
			new ScreenText.Text(instruction0, "GameInstruction", 0, firstScreenDuration);
			new ScreenText.Text(instruction1, "GameInstruction", firstScreenDuration, undefined, true);
			new ScreenText.GameInstruction("", delay);
		} else {
			new ScreenText.GameInstruction(instruction0, delay);
		}
	},
	/** 
		@param {string} text
	*/
	quickBoardText : function(text){
		new ScreenText.Text(text, "BoardText", 0, 1000, false);
	},
	/** 
		@param {string} text
		@param {number} delay
	*/
	highlightPlayButton : function(text, delay){
		new ScreenText.Text(text, "ButtonHighlight", delay, undefined, true);
	},
	/** 
		@param {string} text
		@param {number} delay
	*/
	highlightNextButton : function(text, delay){
		new ScreenText.Text(text, "NextButtonHighlight", delay, undefined, true);
	},
	/** 
		show the numbers on the tiles
		@param {number=} delay
	*/
	showNumbersOnGame : function(delay){
		delay = delay || 0;
		var waitTime  = 200;
		new ScreenText.Text("1", "BoardOne", waitTime * 0 + delay);
		new ScreenText.Text("2", "BoardTwo", waitTime * 1 + delay);
		new ScreenText.Text("3", "BoardThree", waitTime * 2 + delay);
		new ScreenText.Text("4", "BoardFour", waitTime * 3 + delay);
	},
	/** 
		show the numbers on the tiles
		@param {number=} delay
	*/
	showNumbersOnPattern : function(delay){
		delay = delay || 0;
		var waitTime  = 200;
		new ScreenText.Text("1", "PatternOne", waitTime * 0 + delay);
		new ScreenText.Text("2", "PatternTwo", waitTime * 1 + delay);
		new ScreenText.Text("3", "PatternThree", waitTime * 2 + delay);
		new ScreenText.Text("4", "PatternFour", waitTime * 3 + delay);
	}
}

ScreenText.initialize();

/*=============================================================================
	ON SCREEN TEXT
=============================================================================*/

/** 
	@extends {goog.Disposable}
	@constructor
	@param {string} text
	@param {string} style
	@param {number=} delay
	@param {number=} duration on screen
	@param {boolean=} goneOnClick
*/
ScreenText.Text = function(text, style, delay, duration, goneOnClick){
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
	if (goog.isDef(goneOnClick)){
		//setup a click event on the screen
		ScreenText.onClicks.push(this);
	}
}

goog.inherits(ScreenText.Text, goog.Disposable);

/** @override */
ScreenText.Text.prototype.disposeInternal = function(){
	//remove self from the onScreen array
	goog.array.remove(ScreenText.onScreen, this);
	//clear the timeouts
	clearTimeout(this.appearTimeout);
	clearTimeout(this.disappearTimeout);
	//remove the dom stuff
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
	if (this.Element){
		goog.dom.classes.remove(this.Element, "visible");
	}
	this.disappearTimeout = setTimeout(goog.bind(this.dispose, this), 1000);
}


/*=============================================================================
	GAME INSTRUCTION
=============================================================================*/


/** 
	@constructor
	@extends {ScreenText.Text}
	@param {string} text
	@param {number=} delay
*/
ScreenText.GameInstruction  = function(text, delay){
	goog.base(this, text, "GameInstruction", delay, undefined, true);
}

goog.inherits(ScreenText.GameInstruction, ScreenText.Text);

/** 
	disappear animation
*/
ScreenText.GameInstruction.prototype.appear = function(){
	goog.dom.classes.add(ScreenText.Background, "visible");
	goog.base(this, "appear");
}

/** 
	disappear animation
*/
ScreenText.GameInstruction.prototype.disappear = function(){
	goog.dom.classes.remove(ScreenText.Background, "visible");
	goog.base(this, "disappear");
}






