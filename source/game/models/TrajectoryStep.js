/*=============================================================================
 _______  _______  _______  _______ 
|       ||       ||       ||       |
|  _____||_     _||    ___||    _  |
| |_____   |   |  |   |___ |   |_| |
|_____  |  |   |  |    ___||    ___|
 _____| |  |   |  |   |___ |   |    
|_______|  |___|  |_______||___|    

position and direction
kinda like a vector
=============================================================================*/

goog.provide("game.models.TrajectoryStep");

goog.require("goog.math.Coordinate");
goog.require("data.Direction");
goog.require("goog.Disposable");
goog.require("game.views.TrajectoryStepView");

/** 
	@constructor
	@param {!goog.math.Coordinate} position
	@param {!Direction} direction
	@extends {goog.Disposable}
*/
var TrajectoryStep = function(position, direction){
	goog.base(this);
	/** @type {!goog.math.Coordinate} */
	this.position = position;
	/** @type {Direction} */
	this.direction = direction;
}

//extend dispoable
goog.inherits(TrajectoryStep, goog.Disposable);

/** 
	@param {TrajectoryStep} step
	@return {boolean} 
	pieces collide if they're on the same position
	or if they are on adjacent positions and travelling in opposite directions
*/
TrajectoryStep.prototype.collidesWith = function(step){
	//it is a collision if they're on the same position
	if (goog.math.Coordinate.equals(this.position, step.position)){
		return true;
	//OR if theyre on adjacent positions and on a collision course
	} else if (this.adjacentPosition(step) && this.collisionCourse(step)){
		return true;
	} else {
		return false;
	}
}

/** 
	@private
	@param {TrajectoryStep} step
	@return {boolean} true is the steps are on adjacent elements
*/
TrajectoryStep.prototype.adjacentPosition = function(step){
	return goog.math.Coordinate.distance(this.position, step.position) === 1;
}

/** 
	@private
	@param {TrajectoryStep} step
	@return {boolean} true if theyre on a collision course
*/
TrajectoryStep.prototype.collisionCourse = function(step){
	//if step is headed in the opposite direction as the relative direction
	var direction = Direction.relativeDirection(this.position, step.position);
	return this.direction === direction && direction === Direction.opposite(step.direction);
}

/** 
	tear down
*/
TrajectoryStep.prototype.disposeInternal = function(){
	//dispose
	goog.base(this, 'disposeInternal');
}