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
var CONST = {};

/** @enum {number} */
CONST.DIAGONALWALL = {
	NONE : 0,
	FORWARDSLASH : 1, //a forward diagonal '/'
	BACKSLASH : 2 //a back diagonal '\'
};

/** 
	the dimensions of the grid 
	@const
*/
CONST.BOARDDIMENSION = {
	WIDTH : 4,
	HEIGHT : 4
};

/** @const */
CONST.PIXELSCALAR = .35;

/** @const */
CONST.TILESIZE = 120;

/** 
	the app states
	@const
	@enum {string}
*/
CONST.APPSTATES = {
	SCREEN_SPLASH : 'SCREEN_SPLASH',
	SCREEN_SONGS : 'SCREEN_SONGS',
	SCREEN_PARTS : 'SCREEN_PARTS',
	SCREEN_GAME : 'SCREEN_GAME'
};

/** @enum {string} */
CONST.COLOR = {
	BLUE: "#0092D2",
	RED: "#d4463f",
	YELLOW: "#F58107",
	GREEN : "#53CC66",
	PURPLE : "#CA60CA",
	BLACK : "#000001",
	WHITE : "#fffffd"
}