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
@extends {goog.Disposable}
*/
var WallView = function(model){
	goog.base(this);
	/** @type {Wall} */
	this.model = model;
	this.Element = goog.dom.createDom("div", {"class" : "WallView"});
	goog.dom.appendChild(BoardView.Board, this.Element);
	this.positionWall(this.Element);
	/** @type {KeyframeAnimation} */
	this.animation = null;
	this.makeAnimation();
	/** @type {Array.<Element>}*/
	this.animatedElements = [];
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
	this.animation = new KeyframeAnimation([from, to, to]);
}

/** 
	position the element in the board
	@private
	@param {Element} element
*/
WallView.prototype.positionWall = function(element){
	var position = this.model.position;
	var translateString = goog.string.buildString("translate3d(", position.x / 2 * CONST.TILESIZE, "px , ", position.y / 2 * CONST.TILESIZE, "px , 0)");
	goog.style.setStyle(element, {"transform" : translateString});
	//set the orientation class
	goog.dom.classes.add(element, this.model.getOrientation());
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
	goog.style.setOpacity(el, 0);
	//append it to the board
	goog.dom.appendChild(BoardView.Board, el);
	this.positionWall(el);
	//add it to the array
	this.animatedElements.push(el);
	//add the piecetype as a class
	goog.dom.classes.add(el, color);
	//start the animation on that element
	this.animation.play(el, duration, {"repeat" : "infinite", "delay" : delay, "timing" : "ease-in"});
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

