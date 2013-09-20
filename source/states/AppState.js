 
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

goog.require("screens.ScreenController");
goog.require("dependencies.statemachine");
goog.require("states.LoadingManager");
goog.require("data.Const");

var AppState = {
	/** 
	The Finite State Machine
	@private
	@type {Element} 
	*/
	fsm : null,
	
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
	@suppress {checkTypes|undefinedNames|undefinedVars}
	*/
	initialize : function(){

		AppState.fsm = StateMachine.create({

			events: [
			{ name: 'start', 		from: 'none',   	to: 'splash' },
			{ name: 'showsongs',  from: 'splash',		to: 'songs' },
			{ name: 'showsongs', 	from: 'parts',  	to: 'songs' },
			{ name: 'showparts', 	from: 'songs', 		to: 'parts' },
	      //{ name: 'clear', from: 'red',    to: 'green'  },
	      //{ name: 'clear', from: 'yellow', to: 'green'  },
	      ],

	      callbacks: {
	      	onbeforestart: function(event, from, to) { 
	      		ScreenController.showScreen(CONST.APPSTATES.SCREEN_SPLASH);	     
	      		LoadingManager.loadApp(AppState.onAppLoaded);
	      	},
	      	onstart: function(event, from, to) { AppState.log("SPLASH!");       },

	      	onbeforeshowsongs: function(event, from, to) { AppState.log("START   EVENT: onbeforeshowsongs!");  },
	      	onbeforeshowparts: function(event, from, to) { AppState.log("START   EVENT: onbeforepartsToSongs!");  },

	      	onshowsongs: function(event, from, to) { 
	      		AppState.log("FINISH  EVENT: onintroduceSongs!");    
	      		ScreenController.showScreen(CONST.APPSTATES.SCREEN_SONGS);	     
	      	},
	      	onshowparts: function(event, from, to) { AppState.log("FINISH  EVENT: onpartsToSongs!");        },

	      	onleavesplash: function(event, from, to) { 
	      		AppState.log("LEAVE   STATE: onleavesplash");
	      		ScreenController.hideScreen(CONST.APPSTATES.SCREEN_SPLASH);	  
	      	},
	      	
	      	onleavesongs:  function(event, from, to) { AppState.log("LEAVE   STATE: onleavesongs"); },
	      	onleaveparts:  function(event, from, to) { AppState.log("LEAVE   STATE: onleaveparts");  },

	      	onsplash: function(event, from, to) { AppState.log("ENTER   STATE: onsplash");  },
	      	onsongs:  function(event, from, to) { AppState.log("ENTER   STATE: onsongs"); },
	      	onparts:  function(event, from, to) { AppState.log("ENTER   STATE: onparts");    },

	      	onchangestate: function(event, from, to) { AppState.log("CHANGED STATE: " + from + " to " + to); }
	      }
	  });

 	  AppState.fsm.start();
	},

	/** 
		Callback for when the Application has finished it's initial loading
		@private
		@suppress {checkTypes|undefinedNames|undefinedVars}
    */
	onAppLoaded : function() {
		AppState.fsm.showsongs();	
	}
};
AppState.initialize();