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

/** 
	@constructor
	@struct
	@param {!goog.math.Coordinate} position
	@param {!Direction} direction
*/
var Step = function(position, direction){
	/** @type {!goog.math.Coordinate} */
	this.position = position;
	/** @type {Direction} */
	this.direction = direction;
}

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
	//OR if theyre on adjacent positions and going in opposite directions
	} else if (this.adjacentPosition(step) && this.direction === Direction.opposite(step.direction)){
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