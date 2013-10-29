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
goog.require("graphics.KeyframeAnimation");

/** 
	@constructor
	@param {Wall} model
	@param {Direction} direction
	@extends {goog.Disposable}
*/
var WallView = function(model, direction){
	goog.base(this);
	/** @type {Wall} */
	this.model = model;
	/** @type {Direction} */
	this.direction = direction;
	this.Element = goog.dom.createDom("div", {"class" : "WallView"});
	goog.dom.classes.add(this.Element, direction);
	goog.dom.appendChild(BoardView.Board, this.Element);
	this.positionWall(this.Element);
	/** @type {KeyframeAnimation} */
	this.animation = null;
	/** @type {KeyframeAnimation} */
	this.flashAnimation = null;
	this.makeAnimation();
	/** @type {Array.<Element>}*/
	this.animatedElements = [];
	/** @type {Element} */
	this.flashEl = null;
}


goog.inherits(WallView, goog.Disposable);

/** @override */
WallView.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.model = null;
	this.animation.dispose();
	this.animation = null;
	//remove all the nodes from the animated elements
	for (var i = 0; i < this.animatedElements.length; i++){
		goog.dom.removeNode(this.animatedElements[i]);
	}
	this.animatedElements = null;
	goog.base(this, "disposeInternal");
}

/** 
	makes a keyframe animation
*/
WallView.prototype.makeAnimation  = function(){
	var from = {
		"opacity" : 1
	};
	var to = {
		"opacity" : 0
	};
	this.animation = new KeyframeAnimation([from, to, to, to, to]);
	this.flashAnimation = new KeyframeAnimation([to, from, to]);
}

/** 
	position the element in the board
	@private
	@param {Element} element
*/
WallView.prototype.positionWall = function(element){
	var position = this.model.position;
	var orientation = this.model.getOrientation();
	var xPos = 0;
	var yPos = 0;
	if (orientation === Wall.Orientation.Vertical){
		//left wall
		if (position.x !== 0){
			xPos = 8;
		} 
	} else {
		//left wall
		if (position.y !== 0){
			yPos = 8;
		} 
	}
	var translateString = goog.string.buildString("translate3d(", xPos / 2 * CONST.TILESIZE, "px , ", yPos / 2 * CONST.TILESIZE, "px , 0)");
	goog.style.setStyle(element, {"transform" : translateString});
	//set the orientation class
	goog.dom.classes.add(element, orientation);
	//apply the margin from the board
	BoardView.applyMargin(element);
}

/** 
	triggers a hit animation
	@param {number} duration of the loop
	@param {number} delay before starting
	@param {PieceType} color
*/
WallView.prototype.hit = function(duration, delay, color){
	//make a new element
	var el = goog.dom.createDom("div", {"class" : "WallView Hit"});
	goog.dom.classes.add(el, this.direction);
	goog.style.setOpacity(el, 0);
	//append it to the board
	goog.dom.appendChild(BoardView.Board, el);
	this.positionWall(el);
	//add it to the array
	this.animatedElements.push(el);
	//add the piecetype as a class
	goog.dom.classes.add(el, color);
	//start the animation on that element
	this.animation.play(el, duration, {repeat : "infinite", delay : delay, timing : "ease-out"});
}

/** 
	flashes animation
	@param {number} time
	@param {PieceType} color
*/
WallView.prototype.flash = function(time, color){
	//make a new element
	var el = this.flashEl = goog.dom.createDom("div", {"class" : "WallView Hit"});
	goog.dom.classes.add(el, this.direction);
	goog.style.setOpacity(el, 1);
	//append it to the board
	goog.dom.appendChild(BoardView.Board, el);
	this.positionWall(el);
	//add the piecetype as a class
	goog.dom.classes.add(el, color);
	//start the animation on that element
	// this.flashAnimation.play(el, time, {repeat : "infinite"});
}

/** 
	flashes animation
*/
WallView.prototype.stopFlashing = function(){
	if (this.flashEl){
		// this.flashAnimation.stop(this.flashEl);
		goog.style.setOpacity(this.flashEl, 0);
		goog.dom.removeNode(this.flashEl);
	}
}

/** 
	stop all of the current animations
*/
WallView.prototype.stop = function(){
	//remove all the nodes from the animated elements
	for (var i = 0; i < this.animatedElements.length; i++){
		var el = this.animatedElements[i];
		this.animation.stop(el)
		goog.dom.removeChildren(el);
		goog.dom.removeNode(el);
	}
	this.animatedElements = [];
}

