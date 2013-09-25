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

goog.provide("game.models.Step");

goog.require("goog.math.Coordinate");
goog.require("data.Direction");
goog.require("goog.Disposable");
goog.require("game.views.StepView");

/** 
	@constructor
	@param {!goog.math.Coordinate} position
	@param {!Direction} direction
	@extends {goog.Disposable}
*/
var Step = function(position, direction){
	goog.base(this);
	/** @type {!goog.math.Coordinate} */
	this.position = position;
	/** @type {Direction} */
	this.direction = direction;
	/** @type {StepView} */
	this.view = new StepView(this);
}

//extend dispoable
goog.inherits(Step, goog.Disposable);

/** 
	@param {Step} step
	@return {boolean} 
	pieces collide if they're on the same position
	or if they are on adjacent positions and travelling in opposite directions
*/
Step.prototype.collidesWith = function(step){
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
	@param {Step} step
	@return {boolean} true is the steps are on adjacent elements
*/
Step.prototype.adjacentPosition = function(step){
	return goog.math.Coordinate.distance(this.position, step.position) === 1;
}

/** 
	@private
	@param {Step} step
	@return {boolean} true if theyre on a collision course
*/
Step.prototype.collisionCourse = function(step){
	//if step is headed in the opposite direction as the relative direction
	var direction = Direction.relativeDirection(this.position, step.position);
	return this.direction === direction && direction === Direction.opposite(step.direction);
}

/** 
	tear down
*/
Step.prototype.disposeInternal = function(){
	this.view.dispose();
	this.view = null;
	//dispose
	goog.base(this, 'disposeInternal');
}