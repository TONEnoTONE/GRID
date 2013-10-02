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
	/** @private
		@type {Array.<TrajectoryStep>} */
	this.steps = [];
	/** @type {string} */
	this.uid = goog.string.getRandomString();
	/** @type {TrajectoryView} */
	this.view = new TrajectoryView(this);
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
	stepNumber = stepNumber % this.steps.length;
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
	this.view.clear();
}

/** 
	make the animation
*/
Trajectory.prototype.makeAnimation = function(){
	this.view.generateCSS(this.steps);
}
/** 
	@returns {string} the animation name which should be applied to the piece view
*/
Trajectory.prototype.getAnimationName = function(){
	return this.view.animationName;
}

/** 
	@returns {Array.<number>} the beats that the trajectory hits on
*/
Trajectory.prototype.getHits = function(){
	var hits = [];
	var currentDirection = this.steps[0].direction;
	for (var i = 1, len = this.steps.length; i < len; i++){
		var step = this.steps[i];
		if (step.direction !== currentDirection){
			currentDirection = step.direction;
			hits.push(i - 1)
		}
	}
	//return the hits
	return hits;
}


