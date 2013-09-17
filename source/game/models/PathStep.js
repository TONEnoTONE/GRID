goog.provide("game.models.PathStep");


goog.require("data.Const");
goog.require("goog.math.Coordinate");
/** 
	represents a step in a piece's path
	@constructor
	@struct
	@param {goog.math.Coordinate} position
	@param {CONST.DIRECTION} direction
*/
var PathStep = function(position, direction){
	/** @type {goog.math.Coordinate} */
	this.position = position;
	/** @type {CONST.DIRECTION}*/
	this.direction = direction;
};