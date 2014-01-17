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
*/
var GameOverInterstitial = function(closeCallback, nextCallback, color){
	/** @type {Element}*/
	this.Element = goog.dom.createDom("div", {"id" : "GameOverInterstitial", "class" : color});
	/** @type {Button}*/
	this.ns = null;
	/** @type {Element}*/
	this.blocker = goog.dom.createDom("div", {"id" : "Blocker"});
	/** @type {Button}*/
	this.r = null;
	/** @type {Element}*/
	this.dialog = goog.dom.createDom("div", {"id" : "Dialog"});
	/** @type {function()} */
	this.closeCallback = closeCallback;
	/** @type {function()} */
	this.nextCallback = nextCallback;

	goog.base(this);


	var bg = goog.dom.createDom("div", {"id" : "Background"});
	var title = goog.dom.createDom('div', { 'id': 'Title' },'success!');
	var text = goog.dom.createDom('div', { 'id': 'Text' },'play again   -or-   next song');

	goog.dom.appendChild(GameScreen.div, this.Element);
	goog.dom.appendChild(this.Element, this.blocker);
	goog.dom.appendChild(this.Element, this.dialog);
	goog.dom.appendChild(this.dialog, bg);
	goog.dom.appendChild(this.dialog, title);
	goog.dom.appendChild(this.dialog, text);

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
	var ns = new Button("", goog.bind(this.onNextGameClick, this), {"id" : "NextSong", "class" : "GameOverInterstitialButton"});
	var r = new Button("",  goog.bind(this.onReplay, this), {"id" : "PlayAgain" , "class" : "GameOverInterstitialButton"});
	goog.dom.appendChild(this.dialog, ns.Element);
	goog.dom.appendChild(this.dialog, r.Element);
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
GameOverInterstitial.prototype.animationTime = 150;

/** 
	animate the dialog in
*/
GameOverInterstitial.prototype.animateIn = function(){
	//bring in the background
	var fade = new goog.fx.dom.Fade(this.blocker, 0, .3, this.animationTime);
  	fade.play();
	
	var slide = new goog.fx.dom.Slide(this.dialog, [0, 1000], [0, 70], this.animationTime * 2, Animation.Easing.backOut);
	goog.events.listen(slide, goog.fx.Transition.EventType.END, function(){
		
	});
	slide.play();
};

/** 
	@param {boolean} top
	@param {function()=} callback
*/
GameOverInterstitial.prototype.animateOut = function(top, callback){
	//bring in the background
	var fade = new goog.fx.dom.FadeOut(this.blocker, this.animationTime);
  	fade.play();
  	var slide;
  	if (top) {
		slide = new goog.fx.dom.Slide(this.dialog, [0, 70], [0, -1000], this.animationTime * 2, Animation.Easing.backIn);
  	} else {
  		slide = new goog.fx.dom.Slide(this.dialog, [0, 70], [0, 1000], this.animationTime * 2, Animation.Easing.backIn);	
  	}
	goog.events.listen(slide, goog.fx.Transition.EventType.END, function(){
		callback();
	});
	slide.play();
};


