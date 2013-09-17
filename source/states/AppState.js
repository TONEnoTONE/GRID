 
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

goog.scope(function(){

	//alias
	var AppState = states.AppState;

	/** current state */
	AppState.state = '';

	/** initializer */
	AppState.initialize = function(){
		/** @this {game.controllers.GameController} */
	}

	/** 
		@param {string} stage
	*/
	AppState.setState = function(state){
		AppState.state = state;
	}

	/** 
		@param {string} stage
	*/
	AppState.getState = function(){
		return AppState.state;
	}

	//run initializer
	AppState.initialize();

});