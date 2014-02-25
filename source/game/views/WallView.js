/*=============================================================================

_     _  _______  ___      ___        __   __  ___   _______  _     _ 
| | _ | ||   _   ||   |    |   |      |  | |  ||   | |       || | _ | |
| || || ||  |_|  ||   |    |   |      |  |_|  ||   | |    ___|| || || |
|       ||       ||   |    |   |      |       ||   | |   |___ |       |
|       ||       ||   |___ |   |___   |       ||   | |    ___||       |
|   _   ||   _   ||       ||       |   |     | |   | |   |___ |   _   |
|__| |__||__| |__||_______||_______|    |___|  |___| |_______||__| |__|

=============================================================================*/

goog.provide("game.views.WallView");

goog.require("goog.Disposable");
goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.string");
goog.require("game.views.BoardView");
goog.require("data.Const");
goog.require('goog.userAgent');
goog.require("Animation.Keyframe");
goog.require("goog.fx.dom.FadeOut");
goog.require("goog.fx.dom.FadeIn");

/** 
@constructor
@param {Wall} model
@extends {goog.Disposable}
*/
var WallView = function(model){
	goog.base(this);
	/** @type {Wall} */
	this.model = model;
	/** @private @type {boolean} */
	this.fadedIn = false;
	this.Element = goog.dom.createDom("div", {"class" : "WallView"});
	// goog.dom.appendChild(BoardView.Board, this.Element);
	this.positionWall(this.Element);
	/** @type {Animation.Keyframe} */
	this.animation = null;
	//this.makeAnimation();
	/** @type {Array.<Element>}*/
	this.animatedElements = [];
	//add the class to make it fade in
	// setTimeout(goog.bind(this.fadeIn, this), 10);
}


goog.inherits(WallView, goog.Disposable);

/** @override */
WallView.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.model = null;
	if (this.animation){
		this.animation.dispose();
		this.animation = null;
	}
	//remove all the nodes from the animated elements
	for (var i = 0; i < this.animatedElements.length; i++){
		goog.dom.removeNode(this.animatedElements[i]);
	}
	this.animatedElements = null;
	goog.base(this, "disposeInternal");
}

/** 
	makes a keyframe animation
	@param {Piece} piece
	@param {number} hitIndex
*/
WallView.prototype.makeAnimation  = function(piece, hitIndex){
	var bounce = piece.bounces[hitIndex];
	var percent = 400 / piece.pattern.length
	var translate = Direction.toVector(bounce.direction).scale(CONST.TILESIZE / 2);
	var transform = goog.string.buildString("translate3d( ", translate.x, "px , ",translate.y, "px, 0px) scale(4)");
	var easing = "ease-out"
	var start = {
		"opacity" : 0,
		"-webkit-transform" : "translate3d(0px, 0px, 0px) scale(1)", 
		"transform" : "translate3d(0px, 0px, 0px) scale(1)", 
		"-webkit-animation-timing-function" : easing,
		"animation-timing-function" : easing,
	};
	var from = {
		"opacity" : 1,
		"-webkit-transform" : "translate3d(0px, 0px, 0px) scale(1)", 
		"transform" : "translate3d(0px, 0px, 0px) scale(1)", 
		"-webkit-animation-timing-function" : easing,
		"animation-timing-function" : easing,
	};
	var to = {
		"opacity" : 0,
		"-webkit-transform" : transform, 
		"transform" : transform
	};
	this.animation = new Animation.Keyframe([start, from, to], [0, 1, percent]);
}

/** 
	position the element in the board
	@private
	@param {Element} element
*/
WallView.prototype.positionWall = function(element){
	var position = this.model.position.clone().scale(CONST.TILESIZE / 2);
	//var translateString = goog.string.buildString("translate3d(", position.x / 2 * CONST.TILESIZE, "px , ", position.y / 2 * CONST.TILESIZE, "px , 0)");
	//goog.style.setStyle(element, {"transform" : translateString});
	var margin = BoardView.getMargin();
	goog.style.setPosition(element, goog.math.Coordinate.sum(margin, position));
	//set the orientation class
	goog.dom.classes.add(element, this.model.getOrientation());
}

/** 
	triggers a hit animation
	@param {Piece} piece
	@param {number} hitIndex
	@param {number} duration
	@param {number} delay
*/
WallView.prototype.hit = function(piece, hitIndex, duration, delay){
	this.makeAnimation(piece, hitIndex);
	//make a new element
	var el = goog.dom.createDom("div", {"class" : "WallView Hit"});
	goog.style.setOpacity(el, 0);
	//append it to the board
	goog.dom.appendChild(BoardView.Board, el);
	this.positionWall(el);
	//add it to the array
	this.animatedElements.push(el);
	//add the piecetype as a class
	goog.dom.classes.add(el, piece.type);
	//start the animation on that element
	this.animation.play(el, duration, {repeat : "infinite", delay : delay, timing : "linear"});
}

/** 
	stop all of the current animations
*/
WallView.prototype.stop = function(){
	//remove all the nodes from the animated elements
	for (var i = 0; i < this.animatedElements.length; i++){
		var el = this.animatedElements[i];
		this.animation.stop(el)
		goog.dom.removeNode(el);
	}
	this.animatedElements = [];
}

/** 
	@private
	@const
	the fade time in milliseconds
*/
WallView.prototype.fadeTime = 150;

/** 
	fades the piece back in
*/
WallView.prototype.fadeIn = function(){
	if (!this.fadedIn){
		//console.log("fade");
		this.fadedIn = true;
		// goog.dom.classes.add(this.Element, "Visible");
		goog.dom.appendChild(BoardView.Board, this.Element);
		// goog.style.setOpacity(this.Element, 1);
		// var fade = new goog.fx.dom.FadeIn(this.Element, this.fadeTime);
		// fade.play();
		// goog.dom.classes.add(this.Element, "Visible");
	}
}

