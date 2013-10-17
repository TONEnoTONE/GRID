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
	this.animation = null;
	this.makeAnimation();
}

goog.inherits(TrajectoryView, goog.Disposable);

/** 
	makes the animation
*/
TrajectoryView.prototype.makeAnimation = function(){
	var animation = [];
	var steps = this.model.steps;
	for (var i = 0; i < steps.length; i++){
		var offset = steps[0].position;
		var step = steps[i];
		var style = this.getStepStyle(step, offset);
		animation.push(style);
	}
	this.animation = new KeyframeAnimation(animation);
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
	@param {Element} element
	@param {number} duration
	@param {number} delay
*/
TrajectoryView.prototype.playAnimation = function(element, duration, delay){
	this.animation.play(element, duration, {delay:delay, repeat : "infinite"});
}

/** 
	stop the animation
*/
TrajectoryView.prototype.stopAnimation = function(element){
	this.animation.stop(element);
}

/** 
	pause the animation
*/
TrajectoryView.prototype.pauseAnimation = function(element){
	this.animation.pause(element);
}

/** 
	@override
*/
TrajectoryView.prototype.disposeInternal = function(){
	this.animation.dispose();
	this.animation = null;
	this.model = null;
	goog.base(this, "disposeInternal");
}
