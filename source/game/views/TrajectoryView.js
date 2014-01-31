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
goog.require("Animation.Keyframe");

/** 
	@constructor
	@extends {goog.Disposable}
*/
var TrajectoryView = function(model){
	goog.base(this);
	/** @private 
		@type {Trajectory} */
	this.model = model;
	/** @type {Animation.Keyframe}*/
	this.animation = null;
	this.makeAnimation();
}

goog.inherits(TrajectoryView, goog.Disposable);

/** 
	makes the animation
*/
TrajectoryView.prototype.makeAnimation = function(){
	var animation = [];
	var timing = [];
	var steps = this.model.steps;
	if (steps.length > 0){
		var stepSize = 100 / (steps.length - 1);
		var offset = steps[0].position;
		for (var i = 0, len = steps.length; i < len; i++){
			var step = steps[i];
			var previousStep;
			if (i > 0){
				previousStep = steps[i-1];
			}
			var ret = this.makeStep(step, previousStep);
			//convert the animation positions into a timing and transform stuff
			var percent = (i / (len - 1)) * 100;
			if (goog.isArray(ret)){
				for (var j = 0; j < ret.length; j++){
					var retStep = ret[j];
					timing.push(percent + stepSize*retStep.time - stepSize);
					animation.push(this.makeStepStyle(retStep, offset));
				}	
			} else {
				//timing.push(percent);
				//animation.push(this.makeStepStyle(ret, offset));
			}
		}
	}
	this.animation = new Animation.Keyframe(animation, timing);
}


/** 
	@private
	@param {TrajectoryStep} step
	@param {TrajectoryStep | undefined} previousStep
	@returns {Object | Array.<Object>}
*/
TrajectoryView.prototype.makeStep = function(step, previousStep){
	if (step.edge && goog.isDef(previousStep)){
		var scaleAmount = .5;
		var bounceTime = .4;
		var endTime = 1;
		var startPosition = .45;
		//the edge point
		var againstWall = Direction.toVector(previousStep.direction).scale(startPosition);
		againstWall.translate(previousStep.position);
		return [
			{
				scale : 1,
				rotation : Direction.toAngle(previousStep.direction),
				translation : previousStep.position,
				time : 0,
				timing : "linear"
			},
			{
				scale : scaleAmount,
				rotation : Direction.toAngle(previousStep.direction),
				translation : againstWall,
				time : bounceTime,
				timing : "linear"
			},
			{
				scale : scaleAmount,
				rotation : Direction.toAngle(step.direction),
				translation : againstWall,
				time : bounceTime + .0001,
				timing : "linear"
			},
			{
				scale : 1,
				rotation : Direction.toAngle(step.direction),
				translation : step.position,
				time : endTime,
				timing : "cubic-bezier(.64,.64,1,.9)"
				// timing : "linear"
			}
		];
	} else {
		return {
			scale : 1,
			rotation : Direction.toAngle(step.direction),
			translation : step.position,
			time : 1
		};
	}
}

/** 
	@private
	@param {Object} step
	@param {!goog.math.Coordinate} offset
	@returns {Object} the step in a form for the keyframe animation
*/
TrajectoryView.prototype.makeStepStyle = function(step, offset){
	//offset hte position by the position
	var diff = goog.math.Coordinate.difference(step.translation, offset);
	var translated = diff.scale(CONST.TILESIZE, CONST.TILESIZE);
	//build the translation string
	var translateString = goog.string.buildString("translate3d( ",translated.x,"px , ",translated.y,"px, 0) ");
	//build the rotation string
	var rotateString = goog.string.buildString("rotate( ",step.rotation,"deg) ");
	//build the scale string
	var scaleString = goog.string.buildString("scale(", step.scale, ", 1) ");
	//combine them in the style
	var style = {};
	var transformString = goog.userAgent.WEBKIT ? "-webkit-transform" : "transform";
	style[transformString] = goog.string.buildString(translateString, rotateString, scaleString);
	var animationString = goog.userAgent.WEBKIT ? "-webkit-animation-timing-function" : "animation-timing-function";
	style[animationString] = step.timing || "linear";
	return style;
}

/** 
	play the animation
	@param {Element} element
	@param {number} duration
	@param {number} delay
	@param {number=} repeat
	@suppress {checkTypes}
*/
TrajectoryView.prototype.playAnimation = function(element, duration, delay, repeat){
	//HACK: THIS IS HERE BECAUSE OF A CHROME 32 animationIterationCount BUG
	if (!goog.userAgent.MOBILE && repeat !== "infinite" && !goog.math.isInt(repeat)){
		//round it up
		repeat = Math.ceil(repeat);
	}
	repeat = repeat || "infinite";
	this.animation.play(element, duration, {delay:delay, repeat : repeat});
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
