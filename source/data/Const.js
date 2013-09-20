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

/** @enum {number} */
CONST.DIAGONALWALL = {
	NONE : 0,
	FORWARDSLASH : 1, //a forward diagonal '/'
	BACKSLASH : 2 //a back diagonal '\'
}

/** 
	the dimensions of the grid 
	@const
*/
CONST.BOARDDIMENSION = {
	WIDTH : 8,
	HEIGHT : 8
}

/** @const */
CONST.PIXELSCALR = .5;

/** @const */
CONST.TILESIZE = 100 * CONST.PIXELSCALR;

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