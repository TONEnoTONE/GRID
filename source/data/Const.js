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
var CONST = {
	/** @enum {string} */
	DIRECTION : {
		NORTH : 'n',
		SOUTH : 's',
		EAST : 'e',
		WEST : 'w'
	},
	/** @enum {number} */
	TILE : {
		INACTIVE : 0,
		ACTIVE : 1,
		FORWARDSLASH : 2, //a forward diagonal '/'
		BACKSLASH : 3 //a back diagonal '\'
	},
	/** 
		the size of the grid 
		@const
	*/
	SIZE : {
		WIDTH : 8,
		HEIGHT : 8
	},
	/** 
		the app states
		@const
	*/
	APPSTATES : {
		SCREEN_LOADING : 'SCREEN_LOADING',
		SCREEN_SONGS : 'SCREEN_SONGS',
		SCREEN_PARTS : 'SCREEN_PARTS',
		SCREEN_GAME : 'SCREEN_GAME'
	}
}