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

/** @const */
CONST.APPVERSION = "1.0.0",

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
	WIDTH : 8,
	HEIGHT : 8
};

/** @const */
CONST.PIXELSCALAR = .35;

/** @const */
CONST.TILESIZE = 100 * CONST.PIXELSCALAR;

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

/** 
	when true, you can click on any locked item without being locked out
	useful for making new levels without having to beat all the other levels of parts
	@define {boolean} 
*/
CONST.LOCKED_LOCKED = false;

/** 
	@const
	@type {number} 
	the level above which there are no more hints
*/
CONST.NO_HINTS_LEVEL = 10;
