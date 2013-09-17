 
/*=============================================================================
 _______  _______  _______  _______  _______  _______  _______  _______ 
|   _   ||       ||       ||       ||       ||   _   ||       ||       |
|  |_|  ||    _  ||    _  ||  _____||_     _||  |_|  ||_     _||    ___|
|       ||   |_| ||   |_| || |_____   |   |  |       |  |   |  |   |___ 
|       ||    ___||    ___||_____  |  |   |  |       |  |   |  |    ___|
|   _   ||   |    |   |     _____| |  |   |  |   _   |  |   |  |   |___ 
|__| |__||___|    |___|    |_______|  |___|  |__| |__|  |___|  |_______|

The state machine for the application. This is intended to handle the state for
all the navigable screens in the app.

=============================================================================*/

goog.provide("states.AppState");

//alias
var AppState = {
	
	/** current state */
	state : '',

	/** initializer */
	initialize : function(){
		/** @this {game.controllers.GameController} */
	},
	
	/** 
		@param {string} stage
	*/
	setState : function(state){
		AppState.state = state;
	},

	/** 
		@param {string} stage
	*/
	getState : function(){
		return AppState.state;
	}
};
AppState.initialize();