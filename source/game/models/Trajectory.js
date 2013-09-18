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


goog.require("game.models.Step");
goog.require("goog.math.Coordinate");

/** 
	represents a step in a piece's path
	@constructor
*/
var Trajectory = function(){
	/** @type {Array.<Step>} */
	this.steps = [];
};

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
		return lastDirection === firstDirection 
			&& goog.math.Coordinate.equals(firstPosition, lastPosition);
	} else {
		return false;
	}
}

/** 
	add a step to the path
	@param {Step} step
*/
Trajectory.prototype.addStep = function(step){
	this.steps.push(step);
}

/** 
	@param {number} stepNumber
	@return {Step} the position and direction
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