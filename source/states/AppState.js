 
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

goog.provide("game.controllers.GameController");

goog.scope(function(){

	//alias
	var AppState = game.states.AppState;

	/** initializer */
	AppState.initialize = function(){
		/** @this {game.controllers.GameController} */
	}

	/** 
		@param {number} stage
		@param {number=} level
	*/
	AppState.setGetState = function(stage, level){
		level = level||0;
		//setup the map
		game.controllers.TileController.setStage(stage, level);
	}

	//run initializer
	AppState.initialize();

});