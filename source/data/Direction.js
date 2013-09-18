/*=============================================================================
	DIRECTION
=============================================================================*/
goog.provide("data.Direction");

goog.require("goog.math.Coordinate");
/**
	@constructor
*/
var Direction = function(){
	/** 
		@private 
		@type {string}
	*/
	this.string = "none";
	/** @type {goog.math.Coordinate}*/
	this.vector = new goog.math.Coordinate(0, 0);
	/** @type {string}*/
	this.orientation = "none";
	/** @type {Direction}*/
	this.opposite = null;
	/** @type {Direction}*/
	this.left = null;
	/** @type {Direction}*/
	this.right = null;
}

/** 
	@param {Direction} d0
	@param {Direction} d1
	@return {boolean} if d0 and d1 are equal
*/
Direction.equals = function(d0, d1){
	return d0.string === d1.string;
}

/** 
	@constructor
	@extends {Direction}
*/
Direction.North = function(){
	/** 
		@private 
		@type {string}
	*/
	this.string = "north";
	/** @type {goog.math.Coordinate}*/
	this.vector = new goog.math.Coordinate(0, -1);
	/** @type {string}*/
	this.orientation = "vertical";
	/** @type {Direction}*/
	this.opposite = new Direction.South();
	/** @type {Direction}*/
	this.left = new Direction.West();
	/** @type {Direction}*/
	this.right = new Direction.East();
}

/** 
	@constructor
	@extends {Direction}
*/
Direction.South = function(){
	/** 
		@private 
		@type {string}
	*/
	this.string = "south";
	/** @type {goog.math.Coordinate}*/
	this.vector = new goog.math.Coordinate(0, 1);
	/** @type {string}*/
	this.orientation = "vertical";
	/** @type {Direction}*/
	this.opposite = new Direction.North();
	/** @type {Direction}*/
	this.left = new Direction.East();
	/** @type {Direction}*/
	this.right = new Direction.West();
}

/** 
	@constructor
	@extends {Direction}
*/
Direction.East = function(){
	/** 
		@private 
		@type {string}
	*/
	this.string = "east";
	/** @type {goog.math.Coordinate}*/
	this.vector = new goog.math.Coordinate(1, 0);
	/** @type {string}*/
	this.orientation = "horizontal";
	/** @type {Direction}*/
	this.opposite = new Direction.West();
	/** @type {Direction}*/
	this.left = new Direction.North();
	/** @type {Direction}*/
	this.right = new Direction.South();
}

/** 
	@constructor
	@extends {Direction}
*/
Direction.West = function(){
	/** 
		@private 
		@type {string}
	*/
	this.string = "north";
	/** @type {goog.math.Coordinate}*/
	this.vector = new goog.math.Coordinate(-1, 0);
	/** @type {string}*/
	this.orientation = "horizontal";
	/** @type {Direction}*/
	this.opposite = new Direction.East();
	/** @type {Direction}*/
	this.left = new Direction.South();
	/** @type {Direction}*/
	this.right = new Direction.North();
}
