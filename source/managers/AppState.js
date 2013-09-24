 
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

goog.provide("managers.AppState");

goog.require("screens.ScreenController");
// goog.require("dependencies.statemachine");
goog.require("managers.LoadingManager");
goog.require("data.Const");

var AppState = {
	/** 
	The Finite State Machine
	@private
	@dict
	*/
	fsm : {},
	
	/** 
	legacy. just to learn what this state controller is doing and when
	@private
	@param {string} msg 
	*/
	log : function(msg) {
		console.log(msg);
	},

	/** 
	init the state machine
	*/
	initialize : function(){

		AppState.fsm = StateMachine.create({

			"events": [
				{ "name": 'start', 		"from": 'none',   "to": 'splash' },
				{ "name": 'showsongs',	"from": 'splash',	"to": 'songs' },
				{ "name": 'showsongs', 	"from": 'parts',  "to": 'songs' },
				{ "name": 'showsongs', 	"from": 'game',  	"to": 'songs' },
				{ "name": 'showparts', 	"from": 'songs', 	"to": 'parts' },
				{ "name": 'showparts', 	"from": 'game', 	"to": 'parts' },
				{ "name": 'showgame', 	"from": 'splash', "to": 'game' },
				{ "name": 'showgame', 	"from": 'songs', 	"to": 'game' },
				{ "name": 'showgame', 	"from": 'parts', 	"to": 'game' },
				],

			"callbacks": {
				"onstart": function(event, from, to) { AppState.log("SPLASH!"); },

				// ON BEFORE
				"onbeforestart": function(event, from, to) { 
					ScreenController.showScreen(CONST.APPSTATES.SCREEN_SPLASH);
					LoadingManager.loadApp(AppState.onAppLoaded);
				},
				"onbeforeshowsongs": function(event, from, to) { AppState.log("START   EVENT: onbeforeshowsongs!");  },
				"onbeforeshowparts": function(event, from, to) { AppState.log("START   EVENT: onbeforepartsToSongs!"); },
				"onbeforeshowgame": function(event, from, to) { AppState.log("START   EVENT: onbeforeshowgame!"); },

				
				// ON SHOW
				"onshowsongs": function(event, from, to) { 
					ScreenController.showScreen(CONST.APPSTATES.SCREEN_SONGS);
				},
				"onshowparts": function(event, from, to) { 
					ScreenController.showScreen(CONST.APPSTATES.SCREEN_PARTS);
				},
				"onshowgame": function(event, from, to) { 
					ScreenController.showScreen(CONST.APPSTATES.SCREEN_GAME); 
				},

				
				// ON LEAVE
				"onleavesplash": function(event, from, to) { 
					ScreenController.hideScreen(CONST.APPSTATES.SCREEN_SPLASH);
				},
				"onleavesongs":  function(event, from, to) {
					ScreenController.hideScreen(CONST.APPSTATES.SCREEN_SONGS);
				},
				"onleaveparts":  function(event, from, to) { 
					ScreenController.hideScreen(CONST.APPSTATES.SCREEN_PARTS);
				},
				"onleavegame":  function(event, from, to) { 
					ScreenController.hideScreen(CONST.APPSTATES.SCREEN_GAME);
				},

				// ON
				"onsplash": function(event, from, to) { AppState.log("ENTER   STATE: onsplash"); },
				"onsongs":  function(event, from, to) { AppState.log("ENTER   STATE: onsongs"); },
				"onparts":  function(event, from, to) { AppState.log("ENTER   STATE: onparts"); },
				"ongame":  function(event, from, to) { AppState.log("ENTER   STATE: ongame"); },

				"onchangestate": function(event, from, to) { AppState.log("CHANGED STATE: " + from + " to " + to); }
			}
	  	});
	},

	/** 
		Callback for when the Application has finished it's initial loading
		@private
	*/
	onAppLoaded : function() {
		// AppState.fsm["showsongs"]();	
		AppState.fsm["showgame"]();	
	},
	/** 
		start the fsm
	*/
	start : function(){
		AppState.fsm['start']();
	}
};
AppState.initialize();