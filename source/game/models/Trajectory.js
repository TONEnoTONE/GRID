/*=============================================================================

 _______  ______    _______      ___  _______  _______  _______  _______  ______    __   __ 
|       ||    _ |  |   _   |    |   ||       ||       ||       ||       ||    _ |  |  | |  |
|_     _||   | ||  |  |_|  |    |   ||    ___||       ||_     _||   _   ||   | ||  |  |_|  |
  |   |  |   |_||_ |       |    |   ||   |___ |       |  |   |  |  | |  ||   |_||_ |       |
  |   |  |    __  ||       | ___|   ||    ___||      _|  |   |  |  |_|  ||    __  ||_     _|
  |   |  |   |  | ||   _   ||       ||   |___ |     |_   |   |  |       ||   |  | |  |   |  
  |___|  |___|  |_||__| |__||_______||_______||_______|  |___|  |_______||___|  |_|  |___|  

=============================================================================*/

goog.provide("game.models.Trajectory");

goog.require("game.views.TrajectoryView");
goog.require("game.models.TrajectoryStep");
goog.require("goog.math.Coordinate");
goog.require("goog.Disposable");
goog.require("goog.string");

/** 
	represents a step in a piece's path
	@constructor
	@extends {goog.Disposable}
*/
var Trajectory = function(){
	goog.base(this);
	/** @type {Array.<TrajectoryStep>} */
	this.steps = [];
	/** @type {string} */
	this.uid = goog.string.getRandomString();
	/** @type {TrajectoryView} */
	this.view = new TrajectoryView(this);
	/** @type {boolean} */
	this.needsView = true;
};

//extend dispoable
goog.inherits(Trajectory, goog.Disposable);

/** 
	@override
*/
Trajectory.prototype.disposeInternal = function(){
	for (var i = 0; i < this.steps.length; i++){
		var s = this.steps[i];
		s.dispose();
		s = null;
	}
	this.steps = null;
	//tear down the view
	this.view.dispose();
	this.view = null;
	//dispose
	goog.base(this, 'disposeInternal');
}

/** 
	@return {boolean} returns true if the path forms a loop
*/
Trajectory.prototype.isLoop = function(){
	//if the last element is equal to the first
	var length = this.steps.length;
	if (length > 1){	
		var firstPosition = this.steps[0].position;
		var firstDirection = this.steps[0].direction;
		var lastPosition = this.steps[length - 1].position;
		var lastDirection = this.steps[length - 1].direction;
		return lastDirection === firstDirection && goog.math.Coordinate.equals(firstPosition, lastPosition);
	} else {
		return false;
	}
}

/** 
	add a step to the path
	@param {TrajectoryStep} step
*/
Trajectory.prototype.addStep = function(step){
	this.steps.push(step);
}

/** 
	@param {number} stepNumber
	@return {TrajectoryStep} the position and direction
*/
Trajectory.prototype.stepAt = function(stepNumber){
	stepNumber = stepNumber % this.getLength();
	return this.steps[stepNumber];
}

/** 
	@return {number} length
*/
Trajectory.prototype.getLength = function(){
	return this.steps.length - 1;
}

/** 
	clears the steps
*/
Trajectory.prototype.clear = function(){
	for (var i = 0; i < this.steps.length; i++){
		var s = this.steps[i];
		s.dispose();
		s = null;
	}
	this.steps = [];
	//clear the view
	this.view.dispose();
	this.needsView = true;
}

/** 
	make the animation
*/
Trajectory.prototype.makeView = function(){
	if (this.needsView){
		this.needsView = false;
		this.view = new TrajectoryView(this);
	}
}
/** 
	@param {Element} element
	apply the animation to the element
*/
Trajectory.prototype.playAnimation = function(element){
	var duration = AudioController.stepsToSeconds(this.getLength());
	var delay = AudioController.countInDuration();
	this.view.playAnimation(element, duration, delay);
}

/** 
	@param {Element} element
	pause the animation
*/
Trajectory.prototype.pauseAnimation = function(element){
	this.view.pauseAnimation(element);
}

/** 
	@param {Element} element
	stop the animation
*/
Trajectory.prototype.stopAnimation = function(element){
	this.view.stopAnimation(element);
}

/** 
	@typedef {{
		direction : Direction,
		position : !goog.math.Coordinate,
		beat : number
	}}
*/
var TrajectoryHit;

/** 
	@returns {Array.<TrajectoryHit>} the beats that the trajectory hits on
*/
Trajectory.prototype.getHits = function(){
	var hits = [];
	var currentDirection = this.steps[0].direction;
	for (var i = 1, len = this.steps.length; i < len; i++){
		var step = this.steps[i];
		if (step.direction !== currentDirection){
			currentDirection = step.direction;
			var prevStep = this.steps[i-1];
			hits.push({
				beat : i - 1,
				position : prevStep.position,
				direction : prevStep.direction
			})
		}
	}
	//return the hits
	return hits;
}


