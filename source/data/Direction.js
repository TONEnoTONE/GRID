/*=============================================================================
	DIRECTION
=============================================================================*/
goog.provide("data.Direction");

goog.require("goog.math.Coordinate");

/** 
	@enum {string}
*/
var Direction = {
	North : 'n',
	South : 's',
	East : 'e',
	West : 'w',
}


/** 
	@param {Direction} direction
	@return {Direction}	the opposite direction
*/
Direction.opposite = function(direction){
	switch(direction){
		case Direction.North : 
			return Direction.South;
	}
}

/** 
	@param {Direction} direction
	@return {Direction}	the direction to the left
*/
Direction.left = function(direction){
	switch(direction){
		case Direction.North : 
			return Direction.West;
	}
}

/** 
	@param {Direction} direction
	@return {Direction}	the direction to the right
*/
Direction.right = function(direction){
	switch(direction){
		case Direction.North : 
			return Direction.East;
	}
}

/** 
	@param {Direction} direction
	@return {goog.math.Coordinate} vector representation of that direction
*/
Direction.toVector = function(direction){
	switch(direction){
		case Direction.North : 
			return new goog.math.Coordinate(0, -1);
		case Direction.South : 
			return new goog.math.Coordinate(0, 1);
	}
}


// /** 
// 	@constructor
// 	@extends {Direction}
// */
// Direction.North = function(){
// 	/** 
// 		@private 
// 		@type {string}
// 	*/
// 	this.string = "north";
// 	/** @type {string} */
// 	this.orientation = "vertical";
// 	/** @return {goog.math.Coordinate}*/
// 	this.toVector = function(){
// 		return new goog.math.Coordinate(0, -1);
// 	}
// 	/** @return {Direction}*/
// 	this.opposite = function(){
// 		return new Direction.South();
// 	}
// 	/** @return {Direction}*/
// 	this.left = function(){
// 		return new Direction.West();
// 	}
// 	/** @return {Direction}*/
// 	this.right = function(){
// 		return new Direction.East();
// 	}
// }

// /** 
// 	@constructor
// 	@extends {Direction}
// */
// Direction.South = function(){
// 	/** 
// 		@private 
// 		@type {string}
// 	*/
// 	this.string = "south";
// 	/** @type {string} */
// 	this.orientation = "vertical";
// 	/** @return {goog.math.Coordinate}*/
// 	this.toVector = function(){
// 		return new goog.math.Coordinate(0, 1);
// 	}
// 	/** @return {Direction}*/
// 	this.opposite = function(){
// 		return new Direction.North();
// 	}
// 	/** @return {Direction}*/
// 	this.left = function(){
// 		return new Direction.East();
// 	}
// 	/** @return {Direction}*/
// 	this.right = function(){
// 		return new Direction.West();
// 	}
// }

// * 
// 	@constructor
// 	@extends {Direction}

// Direction.West = function(){
// 	/** 
// 		@private 
// 		@type {string}
// 	*/
// 	this.string = "west";
// 	/** @type {string} */
// 	this.orientation = "horizontal";
// 	/** @return {goog.math.Coordinate}*/
// 	this.toVector = function(){
// 		return new goog.math.Coordinate(-1, 0);
// 	}
// 	/** @return {Direction}*/
// 	this.opposite = function(){
// 		return new Direction.East();
// 	}
// 	/** @return {Direction}*/
// 	this.left = function(){
// 		return new Direction.South();
// 	}
// 	/** @return {Direction}*/
// 	this.right = function(){
// 		return new Direction.North();
// 	}
// }

// /** 
// 	@constructor
// 	@extends {Direction}
// */
// Direction.East = function(){
// 	/** 
// 		@private 
// 		@type {string}
// 	*/
// 	this.string = "east";
// 	/** @type {string} */
// 	this.orientation = "horizontal";
// 	/** @return {goog.math.Coordinate}*/
// 	this.toVector = function(){
// 		return new goog.math.Coordinate(1, 0);
// 	}
// 	/** @return {Direction}*/
// 	this.opposite = function(){
// 		return new Direction.West();
// 	}
// 	/** @return {Direction}*/
// 	this.left = function(){
// 		return new Direction.North();
// 	}
// 	/** @return {Direction}*/
// 	this.right = function(){
// 		return new Direction.South();
// 	}
// }
