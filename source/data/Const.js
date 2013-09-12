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

define([], function(){

	/**	
		the container of constants
		@const
	*/
	var CONST = {
		/** @enum */
		DIRECTION : {
			NORTH : 'n',
			SOUTH : 's',
			EAST : 'e',
			WEST : 'w'
		},
		/** @enum */
		TILE : {
			INACTIVE : 0,
			ACTIVE : 1
		},
		/** @enum */
		WALL : {
			NORTH : 0
		},
		/** the size of the grid */
		SIZE : {
			WIDTH : 8,
			HEIGHT : 8
		}
	}

	return CONST;
})