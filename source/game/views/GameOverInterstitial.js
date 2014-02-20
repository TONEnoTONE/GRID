goog.provide("game.views.GameOverInterstitial");

goog.require("goog.Disposable");
goog.require("screens.views.GridDom");
goog.require("goog.fx.dom.FadeOut");
goog.require("goog.fx.dom.FadeIn");
goog.require("goog.fx.dom.Fade");
goog.require("goog.fx.dom.Slide");
goog.require("Animation.Easing");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {function()} closeCallback
	@param {function()} nextCallback
	@param {PieceType} color
	@param {number} stars
	@param {boolean} stageCompleted
	@param {boolean} gameCompleted
*/
var GameOverInterstitial = function(closeCallback, nextCallback, color, stars, stageCompleted, gameCompleted){
	/** @type {Element}*/
	this.Element = goog.dom.createDom("div", {"id" : "GameOverInterstitial", "class" : color});
	/** @type {Element}*/
	this.blocker = goog.dom.createDom("div", {"id" : "Blocker"});
	/** @type {Button} */
	this.Next = null;
	/** @type {Button} */
	this.Replay = null;
	/** @type {Element}*/
	this.dialog = goog.dom.createDom("div", {"id" : "Dialog"});
	/** @type {Element}*/
	this.TextDescription = null;
	/** @type {function()} */
	this.closeCallback = closeCallback;
	/** @type {function()} */
	this.nextCallback = nextCallback;
	/** @type {Element} */
	this.StarContainer = goog.dom.createDom("div", {"id" : "StarContainer"});
	goog.dom.appendChild(this.dialog, this.StarContainer);
	/** @type {Array.<Element>} */
	this.Stars = [];
	/** @type {number} */
	this.starsCompleted = stars;
	//add empty stars
	for (var i = 0; i < 3; i++){
		var star = goog.dom.createDom("i", {"class" : "fa EmptyStar"});
		this.Stars[i]  = star;
		goog.dom.appendChild(this.StarContainer, star);
	}

	goog.base(this);

	//set the text
	var textContent = "";
	var titleText = "success!";
	if (gameCompleted){
		titleText = "winner!";
		textContent  = "You've completed all of the songs! Stay tuned for more and keep creating!";
		goog.dom.classes.add(this.Element, "GameCompleted");
	} else if (stageCompleted){
		titleText = "song completed!";
		textContent  = "Listen to the completed song on the parts screen or continue to the next song.";
		goog.dom.classes.add(this.Element, "SongCompleted");
	} else if (stars === 3){
		textContent  = "You've unlocked the ability to REMIX this part!";
		titleText = "perfect!";
		goog.dom.classes.add(this.Element, "Perfect");
	} else {
		textContent  = "Replay or go to the next part.";
	}

	var bg = goog.dom.createDom("div", {"id" : "Background"});
	var title = goog.dom.createDom('div', { 'id': 'Title' }, titleText);
	this.TextDescription = goog.dom.createDom('div', { 'id': 'Text' }, textContent);

	goog.dom.appendChild(GameScreen.div, this.Element);
	goog.dom.appendChild(this.Element, this.blocker);
	goog.dom.appendChild(this.Element, this.dialog);
	goog.dom.appendChild(this.dialog, bg);
	goog.dom.appendChild(this.dialog, title);
	goog.dom.appendChild(this.dialog, this.TextDescription);

	this.makeButtons();
	this.animateIn();
}

//extend dispoable
goog.inherits(GameOverInterstitial, goog.Disposable);

/** @override */
GameOverInterstitial.prototype.disposeInternal = function() {
	//remove the Element from the DOM
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	this.ns = null;
	this.s = null;
	this.dialog = null;
	//dispose
	goog.base(this, 'disposeInternal');
};

/** 
	adding the menu buttons
	@private
*/
GameOverInterstitial.prototype.makeButtons = function() {
	this.Next = new Button("", goog.bind(this.onNextGameClick, this), {"id" : "NextSong", "class" : "GameOverInterstitialButton"});
	this.Replay = new Button("",  goog.bind(this.onReplay, this), {"id" : "PlayAgain" , "class" : "GameOverInterstitialButton"});
	goog.dom.appendChild(this.dialog, this.Next.Element);
	goog.dom.appendChild(this.dialog, this.Replay.Element);
};

/** @private */
GameOverInterstitial.prototype.onNextGameClick = function() {
	this.nextCallback();
};

/** @private */
GameOverInterstitial.prototype.onReplay = function() {
	this.closeCallback();
};

/** @type {number} 
	@private */
GameOverInterstitial.prototype.animationTime = 700;

/** 
	animate the dialog in
*/
GameOverInterstitial.prototype.animateIn = function(){
	//bring in the background
	var fade = new goog.fx.dom.Fade(this.blocker, 0, .3, this.animationTime);
  	fade.play();
	var slide = new goog.fx.dom.Slide(this.dialog, [0, 1000], [0, 70], this.animationTime, Animation.Easing.backOut);
	goog.events.listen(slide, goog.fx.Transition.EventType.END, goog.bind(this.showStars, this));
	slide.play();
};

/** 
	show the stars that were earned
*/
GameOverInterstitial.prototype.showStars = function(){
	for (var i = 0; i < this.starsCompleted; i++){
		var waitTime = (i + 1) * 300;
		var Stars = this.Stars;
		setTimeout(function(){
			var index = i;
			return function(){
				var star = Stars[index];
				goog.dom.classes.set(star, "fa FilledStar");
			}
		}(), waitTime);
	}
}

/** 
	@param {boolean} top
	@param {function()=} callback
*/
GameOverInterstitial.prototype.animateOut = function(top, callback){
	//bring in the background
	var fade = new goog.fx.dom.Fade(this.blocker, .3,  0, this.animationTime);
  	fade.play();
  	var slide;
  	if (top) {
		slide = new goog.fx.dom.Slide(this.dialog, [0, 70], [0, -700], this.animationTime, Animation.Easing.backIn);
  	} else {
  		slide = new goog.fx.dom.Slide(this.dialog, [0, 70], [0, 1000], this.animationTime, Animation.Easing.backIn);	
  	}
	goog.events.listen(slide, goog.fx.Transition.EventType.END, function(){
		callback();
	});
	slide.play();
};


