/*=============================================================================
 _______  ______    _______      ___    __   __  ___   _______  _     _ 
|       ||    _ |  |   _   |    |   |  |  | |  ||   | |       || | _ | |
|_     _||   | ||  |  |_|  |    |   |  |  |_|  ||   | |    ___|| || || |
  |   |  |   |_||_ |       |    |   |  |       ||   | |   |___ |       |
  |   |  |    __  ||       | ___|   |  |       ||   | |    ___||       |
  |   |  |   |  | ||   _   ||       |   |     | |   | |   |___ |   _   |
  |___|  |___|  |_||__| |__||_______|    |___|  |___| |_______||__| |__|

=============================================================================*/

goog.provide("game.views.TrajectoryView");

goog.require("goog.Disposable");
goog.require("screens.views.GridDom");
goog.require("goog.dom");
goog.require("goog.dom.vendor");
goog.require("graphics.KeyframeAnimation");

/** 
	@constructor
	@extends {goog.Disposable}
*/
var TrajectoryView = function(model){
	goog.base(this);
	/** @private 
		@type {Trajectory} */
	this.model = model;
	/** @type {KeyframeAnimation}*/
	this.animation = new KeyframeAnimation([{opacity : 0},{opacity : 1}], [0, 10]);
	/** @type {Array.<Element>}*/
	this.steps = [];
	this.makeAnimation();
}

goog.inherits(TrajectoryView, goog.Disposable);

/** 
	@private
	makes the animation
*/
TrajectoryView.prototype.makeAnimation = function(){
	var animation = [];
	var steps = this.model.steps;
	for (var i = 0; i < steps.length; i++){
		var position = steps[i].position;
		var offset = BoardView.positionToPixel(position);
		var el = goog.dom.createDom("div", {"class" : "TrajectoryStepView"});
		var fill = goog.dom.createDom("div", {"id" : "fill"});
		goog.dom.appendChild(BoardView.Board, el);
		goog.dom.appendChild(el, fill);
		goog.style.setPosition(el, offset);
		this.steps[i] = el;
	}
}

/** 
	returns a style object for each of the steps
	@param {TrajectoryStep} step
	@param {!goog.math.Coordinate} offset
	@returns {Object}
*/
TrajectoryView.prototype.getStepStyle = function(step, offset){
	//offset hte position by the position
	var diff = goog.math.Coordinate.difference(step.position, offset);
	var translated = diff.scale(CONST.TILESIZE, CONST.TILESIZE);
	//build the translation string
	var translateString = goog.string.buildString("translate3d( ",translated.x,"px , ",translated.y,"px, 0) ");
	//build the rotation string
	var angle = Direction.toAngle(step.direction)
	var rotateString = goog.string.buildString("rotate( ",angle,"deg) ");
	//combine them in the style
	var style = {};
	var transformString = goog.userAgent.WEBKIT ? "-webkit-transform" : "transform";
	style[transformString] = goog.string.buildString(translateString, rotateString);
	return style;
}

/** 
	play the animation
	@param {PieceType} type
	@param {number} duration
	@param {number} delay
	@param {number=} wait
*/
TrajectoryView.prototype.playAnimation = function(type, duration, delay, wait){
	wait = wait || 0;
	for (var i = 0; i < this.steps.length; i++){
		var element = this.steps[i];
		goog.dom.classes.add(element, type);
		this.animation.play(element, duration, {delay:i*delay + wait, repeat : "infinite"});
	}
	goog.style.setOpacity(this.steps[0], 0);
}

/** 
	play the animation
	@param {PieceType} type
	@param {number} duration
	@param {number} delay
	@param {number=} wait
*/
TrajectoryView.prototype.stepForward = function(type, duration, delay, wait){
	wait = wait || 0;
	for (var i = 0; i < this.steps.length; i++){
		var element = this.steps[i];
		goog.dom.classes.add(element, type);
		this.animation.play(element, duration, {delay:i*delay + wait, repeat : 1});
	}
}

/** 
	play the animation once
	@param {PieceType} type
	@param {number} duration
	@param {number} delay
	@param {number=} wait
*/
TrajectoryView.prototype.playAnimationOnce = function(type, duration, delay, wait){
	wait = wait || 0;
	for (var i = 0; i < this.steps.length; i++){
		var element = this.steps[i];
		goog.dom.classes.add(element, type);
		this.animation.play(element, duration, {delay:i*delay + wait, repeat : "1"});
	}
	goog.style.setOpacity(this.steps[0], 0);
}

/** 
	stop the animation
*/
TrajectoryView.prototype.stopAnimation = function(){
	for (var i = 0; i < this.steps.length; i++){
		var element = this.steps[i];
		this.animation.stop(element);
	}
}

/** 
	pause the animation
*/
TrajectoryView.prototype.pauseAnimation = function(){
	this.stopAnimation();
	goog.style.setOpacity(this.steps[0], 1);
}

/** 
	@override
*/
TrajectoryView.prototype.disposeInternal = function(){
	this.animation.dispose();
	this.animation = null;
	for (var i = 0; i < this.steps.length; i++){
		goog.dom.removeChildren(this.steps[i]);
		goog.dom.removeNode(this.steps[i]);
		this.steps[i] = null;
	}
	this.steps = null;
	this.model = null;
	goog.base(this, "disposeInternal");
}
