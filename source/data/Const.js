/*=============================================================================
_______  _______  __    _  _______  _______ 
|       ||       ||  |  | ||       ||       |
|       ||   _   ||   |_| ||  _____||_     _|
|       ||  | |  ||       || |_____   |   |  
|      _||  |_|  ||  _    ||_____  |  |   |  
|     |_ |       || | |   | _____| |  |   |  
|_______||_______||_|  |__||_______|  |___|  

	the game constants
=============================================================================*/

goog.provide("data.Const");

/**	
	the container of constants
	@typedef {Object}
*/
var CONST = {}

/** @enum {string} */
CONST.DIRECTION = {
	NORTH : 'n',
	SOUTH : 's',
	EAST : 'e',
	WEST : 'w'
}

/** @enum {string} */
CONST.DIRECTION.OPPOSITE = {
	NORTH : CONST.DIRECTION.SOUTH,
	SOUTH : CONST.DIRECTION.NORTH,
	EAST : CONST.DIRECTION.WEST,
	WEST : CONST.DIRECTION.EAST
}
/** @enum {number} */
CONST.TILE = {
	INACTIVE : 0,
	ACTIVE : 1,
	FORWARDSLASH : 2, //a forward diagonal '/'
	BACKSLASH : 3 //a back diagonal '\'
}
/** 
	the size of the grid 
	@const
*/
CONST.SIZE = {
	WIDTH : 8,
	HEIGHT : 8
}

/** 
	the app states
	@const
*/
CONST.APPSTATES = {
	SCREEN_LOADING : 'SCREEN_LOADING',
	SCREEN_SONGS : 'SCREEN_SONGS',
	SCREEN_PARTS : 'SCREEN_PARTS',
	SCREEN_GAME : 'SCREEN_GAME'
}