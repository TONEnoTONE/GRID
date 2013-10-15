/*=============================================================================

 _______  _______  ___      ___      ___   _______  ___   _______  __    _    __   __  _     _ 
|       ||       ||   |    |   |    |   | |       ||   | |       ||  |  | |  |  | |  || | _ | |
|       ||   _   ||   |    |   |    |   | |  _____||   | |   _   ||   |_| |  |  |_|  || || || |
|       ||  | |  ||   |    |   |    |   | | |_____ |   | |  | |  ||       |  |       ||       |
|      _||  |_|  ||   |___ |   |___ |   | |_____  ||   | |  |_|  ||  _    |  |       ||       |
|     |_ |       ||       ||       ||   |  _____| ||   | |       || | |   |   |     | |   _   |
|_______||_______||_______||_______||___| |_______||___| |_______||_|  |__|    |___|  |__| |__|

=============================================================================*/

goog.provide("game.views.CollisionView");

goog.require("goog.Disposable");
goog.require("goog.dom");
goog.require("graphics.KeyframeAnimation");
goog.require("data.Const");
goog.require("game.views.BoardView");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {Collision} model
*/
var CollisionView = function(model){
	goog.base(this);
	/** @type {Collision} */
	this.model = model;
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"class" : "CollisionView"});
	goog.dom.appendChild(BoardView.Board, this.Element);
	this.position();
	/** @type {KeyframeAnimation} */
	this.animation = new KeyframeAnimation([{opacity : 0}, {opacity : 1}]);
}

goog.inherits(CollisionView, goog.Disposable);

/** @override */
CollisionView.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.animation.dispose();
	this.animation = null;
	this.model = null;
	goog.base(this, "disposeInternal");
}

/** 
	position the element in the board
	@private
	@param {Element} element
*/
CollisionView.prototype.position = function(){
	var element = this.Element;
	var position = this.model.getPosition();
	var translateString = goog.string.buildString("translate3d(", position.x * CONST.TILESIZE, "px , ", position.y * CONST.TILESIZE, "px , 0)");
	goog.style.setStyle(element, {"transform" : translateString});
	//apply the margin from the board
	BoardView.applyMargin(element);
}

/** 
	@param {number} playbackTime
*/
CollisionView.prototype.play = function(playbackTime){
	this.animation.play(this.Element, .2, {"delay" : playbackTime}, function(e){
		goog.style.setOpacity(e.target, 1);
	});
}

/** 
	stop the animation
*/
CollisionView.prototype.stop = function(){
	goog.style.setOpacity(this.Element, 0);
	this.animation.stop(this.Element);
}

/** 
	stop the animation
*/
CollisionView.prototype.pause = function(){
	this.animation.pause(this.Element);
}