 
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
goog.require("managers.LoadingManager");

goog.require("screens.ScreenController");
//goog.require("screens.TopNavController");

goog.require("data.Const");

var AppState = {
	/** 
	The Finite State Machine
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
				{ "name": 'start', 		"from": 'none',   					"to": 'splash' },
				{ "name": 'showsongs',	"from": ['splash','parts','game'],	"to": 'songs' },
				{ "name": 'showparts', 	"from": ['songs','game'], 			"to": 'parts' },
				{ "name": 'showgame', 	"from": ['splash','parts','songs'], "to": 'game' },
			],

			"callbacks": {
				// ON BEFORE
				"onbeforestart": function(event, from, to){},
				"onbeforeshowsongs": function(event, from, to){},
				"onbeforeshowparts": function(event, from, to){},
				"onbeforeshowgame": function(event, from, to){},

				// ON SHOW
				"onstart": function(event, from, to) { 
					ScreenController.showScreen(CONST.APPSTATES.SCREEN_SPLASH);
					LoadingManager.loadApp(AppState.onAppLoaded);
					//TopNavController.setTopNav(CONST.APPSTATES.SCREEN_SPLASH);
				},
				"onshowsongs": function(event, from, to) { 
					ScreenController.showScreen(CONST.APPSTATES.SCREEN_SONGS);
					//TopNavController.setTopNav(CONST.APPSTATES.SCREEN_SONGS);
				},
				"onshowparts": function(event, from, to) { 
					ScreenController.showScreen(CONST.APPSTATES.SCREEN_PARTS);
					//TopNavController.setTopNav(CONST.APPSTATES.SCREEN_PARTS);
				},
				"onshowgame": function(event, from, to) { 
					ScreenController.showScreen(CONST.APPSTATES.SCREEN_GAME);
					//TopNavController.setTopNav(CONST.APPSTATES.SCREEN_GAME);
				},

				
				// ON LEAVE
				"onleavesplash": function(event, from, to) { 
					ScreenController.hideScreen(CONST.APPSTATES.SCREEN_SPLASH);
					return StateMachine.ASYNC;
				},
				"onleavesongs":  function(event, from, to) {
					ScreenController.hideScreen(CONST.APPSTATES.SCREEN_SONGS);
					return StateMachine.ASYNC;
				},
				"onleaveparts":  function(event, from, to) { 
					ScreenController.hideScreen(CONST.APPSTATES.SCREEN_PARTS);
					return StateMachine.ASYNC;
				},
				"onleavegame":  function(event, from, to) { 
					ScreenController.hideScreen(CONST.APPSTATES.SCREEN_GAME);
					return StateMachine.ASYNC;
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
	// AppState.fsm.transition;
	onAppLoaded : function() {
		AppState.fsm["showsongs"]();	
		//AppState.fsm["showgame"]();	
	},
	/** 
		start the fsm
	*/
	start : function(){
		AppState.fsm['start']();
	}
};
AppState.initialize();