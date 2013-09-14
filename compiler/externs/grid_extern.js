/*

*/




/**
	@constructor
	@param {Object} position
*/
var Tile = function(position){}

/** 
	@param {CONST.DIRECTION} direction
	@return {boolean}
*/
Tile.prototype.hasWall = function(direction){}

/** 
	clears all the data for level / stage switches
*/
Tile.prototype.reset = function(){}

/** 
	@param {CONST.DIRECTION} direction the piece is currently travelling in
	@returns {CONST.DIRECTION} the direction the piece would be in after leaving this tile
*/
Tile.prototype.bounce = function(direction){}