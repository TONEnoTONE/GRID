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
	@param {goog.math.Coordinate} position
	@param {Direction} direction
*/
var Step = function(position, direction){
	/** @type {goog.math.Coordinate} */
	this.position = position;
	/** @type {Direction} */
	this.direction = direction;
}

/** 
	@param {Step} step
	@return {boolean} 
*/
Step.prototype.collidesWith = function(step){
	
}