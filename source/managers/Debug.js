/*=============================================
 ______   _______  _______  __   __  _______ 
|      | |       ||  _    ||  | |  ||       |
|  _    ||    ___|| |_|   ||  | |  ||    ___|
| | |   ||   |___ |       ||  |_|  ||   | __ 
| |_|   ||    ___||  _   | |       ||   ||  |
|       ||   |___ | |_|   ||       ||   |_| |
|______| |_______||_______||_______||_______|
==============================================*/

goog.provide("managers.Debug");

goog.require("goog.events.KeyHandler");
goog.require("managers.AppState");

var Debug = {
	/** initializer */
	initialize : function(){
		Debug.activateKeyboardCommands();
	},
	/** initializer */
	activateKeyboardCommands : function(){
		// register the handler 
		var keyHandler = new goog.events.KeyHandler(document);
		goog.events.listen(
   			keyHandler,
    		goog.events.KeyHandler.EventType.KEY,
    		Debug.keyup
		);
	},
	keyup : function(e){
		if (e.keyCode == 71) { // 'g' for the game screen
			AppState.fsm["showgame"]();
		} else if (e.keyCode == 83) { // 's' for the songs screen
			AppState.fsm["showsongs"]();
		} else if (e.keyCode == 80) { // 'p' for the parts screen
			AppState.fsm["showparts"]();
		} else if (e.keyCode == 76) { // 'l' for the parts screen
			AppState.fsm["showsplash"]();
		}
	}
	
};
Debug.initialize();