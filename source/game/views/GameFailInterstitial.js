goog.provide("game.views.GameFailInterstitial");

goog.require("goog.Disposable");
goog.require("game.controllers.StageController");
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
	@param {function()} continueCallback
*/
var GameFailInterstitial = function(closeCallback, continueCallback){
	/** @type {Element}*/
	this.Element = goog.dom.createDom("div", {"id" : "GameOverInterstitial", "class" : "red Fail"});
	/** @type {Button}*/
	this.ns = null;
	/** @type {Element}*/
	this.blocker = goog.dom.createDom("div", {"id" : "Blocker"});
	/** @type {Button}*/
	this.r = null;
	/** @type {Element}*/
	this.dialog = goog.dom.createDom("div", {"id" : "Dialog"});
	/** @type {Element}*/
	this.TimeLeft = goog.dom.createDom("div", {"id" : "TimeLeft"}, "hihi");
	/** @private @type {number}*/
	this.timeout = -1;
	/** @type {function()} */
	this.closeCallback = closeCallback;
	/** @type {function()} */
	this.continueCallback = continueCallback;
	
	goog.base(this);

	var bg = goog.dom.createDom("div", {"id" : "Background"});
	var title = goog.dom.createDom('div', { 'id': 'Title' },'too many tries!');
	var text = goog.dom.createDom('div', { 'id': 'Text' },'Take a 5 minute break from this part.');

	goog.dom.appendChild(GameScreen.div, this.Element);
	goog.dom.appendChild(this.Element, this.blocker);
	goog.dom.appendChild(this.Element, this.dialog);
	goog.dom.appendChild(this.dialog, this.TimeLeft);
	goog.dom.appendChild(this.dialog, bg);
	goog.dom.appendChild(this.dialog, title);
	goog.dom.appendChild(this.dialog, text);

	this.makeButtons();

	this.animateIn();

	this.updateTime();

	//notify the tutorial manager
	TutorialManager.gameFailInterstitial();
}

//extend dispoable
goog.inherits(GameFailInterstitial, goog.Disposable);

/** @override */
GameFailInterstitial.prototype.disposeInternal = function() {
	//remove the Element from the DOM
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	this.ns = null;
	this.s = null;
	this.dialog = null;
	//clear the timeout
	clearTimeout(this.timeout);
	//dispose
	goog.base(this, 'disposeInternal');
};

/** 
	adding the menu buttons
	@private
*/
GameFailInterstitial.prototype.makeButtons = function() {
	var r = new Button("",  goog.bind(this.onReplay, this), {"id" : "BackToPart" , "class" : "GameOverInterstitialButton"});
	goog.dom.appendChild(this.dialog, r.Element);
};

/** 
	updates the timeout time
	@private
*/
GameFailInterstitial.prototype.updateTime = function() {
	//get the time left
	var stage = StageController.getCurrentStage();
	var level = StageController.getCurrentLevel();
	if (StageController.isLevelTimedOut(stage, level)){
		var time = StageController.getLockOutTime(stage, level);
		this.timeout = setTimeout(goog.bind(this.updateTime, this), 1000);
		var minutes = parseInt(time / 60, 10);
		var seconds = time % 60;
		var secondString = seconds.toString();
		if (seconds < 10){
			secondString = "0" + secondString;
		}
		var timeString = goog.string.buildString(minutes, ":", secondString);
		goog.dom.setTextContent(this.TimeLeft, timeString);
	} else {
		//fade the numbers out
		var anim = new goog.fx.dom.FadeOut(this.TimeLeft, 400);
		anim.play();
		//add a button
		var r = new Button("",  goog.bind(this.continueCallback, this), {"id" : "NextSong" , "class" : "GameOverInterstitialButton"});
		goog.dom.appendChild(this.dialog, r.Element);
	}
};

/** @private */
GameFailInterstitial.prototype.onReplay = function() {
	this.closeCallback();
};

/** @type {number} 
	@private */
GameFailInterstitial.prototype.animationTime = 500;

/** 
	animate the dialog in
*/
GameFailInterstitial.prototype.animateIn = function(){
	//bring in the background
	var fade = new goog.fx.dom.Fade(this.blocker, 0, .3, this.animationTime);
  	fade.play();
	
	var slide = new goog.fx.dom.Slide(this.dialog, [0, 1000], [0, 70], this.animationTime, Animation.Easing.backOut);
	goog.events.listen(slide, goog.fx.Transition.EventType.END, function(){
		
	});
	slide.play();
};

/** 
	@param {boolean} top
	@param {function()=} callback
*/
GameFailInterstitial.prototype.animateOut = function(top, callback){
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


