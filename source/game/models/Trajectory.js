
goog.provide("game.models.Trajectory");


goog.require("data.Const");
goog.require("goog.math.Coordinate");
/** 
	represents a step in a piece's path
	@constructor
*/
var Trajectory = function(){
	/** @type {Array.<goog.math.Coordinate>} */
	this.positions = [];
	/** @type {Array.<CONST.DIRECTION>}*/
	this.directions = [];
	/** @type {number} */
	this.length = 0;
};

/** 
	@return {boolean} returns true if the path forms a loop
*/
Trajectory.prototype.isLoop = function(){
	//if the last element is equal to the first
	var length = this.length;
	var firstPosition = this.positions[0];
	var firstDirection = this.directions[0];
	var lastPosition = this.positions[length - 1];
	var lastDirection = this.directions[length - 1];
	return lastDirection === firstDirection 
		&& goog.math.Coordinate.equals(firstPosition, lastPosition);
}

/** 
	add a step to the path
	@param {goog.math.Coordinate} position
	@param {CONST.DIRECTION} direction
*/
Trajectory.prototype.addStep = function(position, direction){
	this.positions.push(position);
	this.directions.push(direction);
	this.length++;
}

/** 
	@param {number} step
	@return {Object} the position and direction
*/
Trajectory.prototype.getStep = function(step){
	step = step % this.length;
	return {
		position : this.positions[step],
		direction : this.directions[step],
	}
}