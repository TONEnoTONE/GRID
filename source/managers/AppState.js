 
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
goog.require("managers.Analytics");
goog.require("managers.Version");
goog.require("screens.ScreenController");
goog.require("data.Const");

/** 
	@typedef {Object}
*/
var AppState = {
	/** 
	The Finite State Machine
	@dict
	*/
	fsm : {},
	drawerOverState : "",
	/** 
	init the state machine
	*/
	initialize : function(){

		AppState.fsm = StateMachine.create({

			"events": [
				{ "name": 'start', 			"from": 'none',   					"to": 'splash' },
				{ "name": 'showsplash',		"from": ['songs','parts','game'],	"to": 'splash' },
				{ "name": 'showsongs',		"from": ['splash','parts','game'],	"to": 'songs' },
				{ "name": 'showparts', 		"from": ['songs','game'], 			"to": 'parts' },
				{ "name": 'showgame', 		"from": ['parts'], 					"to": 'game' },
				{ "name": 'openthedrawer', 	"from": ['songs','parts'], 			"to": 'drawerisopen' },
				{ "name": 'closethedrawer', "from": ['drawerisopen'],			"to": 'drawerisclosed' },
				{ "name": 'resetsongsstate', "from": ['drawerisclosed'],		"to": 'songs' },
				{ "name": 'resetpartsstate', "from": ['drawerisclosed'],		"to": 'parts' },
			],

			"callbacks": {
				// ON BEFORE
				"onbeforestart": function(event, from, to){},
				"onbeforeshowsongs": function(event, from, to){},
				"onbeforeshowparts": function(event, from, to){},
				"onbeforeshowthegame": function(event, from, to){},
				"onbeforeopenthedrawer": function(event, from, to){  
					AppState.drawerOverState = from;
				},
				"onbeforeclosedrawer": function(event, from, to){  },

				// ON SHOW
				"onstart": function(event, from, to) { 
					ScreenController.showScreen(CONST.APPSTATES.SCREEN_SPLASH);
					LoadingManager.loadApp(AppState.onAppLoaded);
				},
				"onshowsplash": function(event, from, to) { 
					ScreenController.showScreen(CONST.APPSTATES.SCREEN_SPLASH);
				},
				"onshowsongs": function(event, from, to) { 
					ScreenController.showScreen(CONST.APPSTATES.SCREEN_SONGS);
				},
				"onshowparts": function(event, from, to) { 
					ScreenController.showScreen(CONST.APPSTATES.SCREEN_PARTS);
				},
				"onshowgame": function(event, from, to) { 
					ScreenController.showScreen(CONST.APPSTATES.SCREEN_GAME);
				},
				"onopenthedrawer": function(event, from, to) { 
					ScreenController.openDrawer();
				},
				"onclosethedrawer": function(event, from, to) { 
					ScreenController.closeDrawer();
				},
				
				// ON LEAVE
				"onleavesplash": function(event, from, to) { 
					ScreenController.hideScreen(CONST.APPSTATES.SCREEN_SPLASH);
					return StateMachine.ASYNC;
				},
				"onleavesongs":  function(event, from, to) {
					if ( event != 'openthedrawer' ) {
						ScreenController.hideScreen(CONST.APPSTATES.SCREEN_SONGS);
						return StateMachine.ASYNC;
					}
				},
				"onleaveparts":  function(event, from, to) { 
					if ( event != 'openthedrawer' ) {
						ScreenController.hideScreen(CONST.APPSTATES.SCREEN_PARTS);
						return StateMachine.ASYNC;
					}
				},
				"onleavegame":  function(event, from, to) { 
					ScreenController.hideScreen(CONST.APPSTATES.SCREEN_GAME);
					return StateMachine.ASYNC;
				},
				"onleavedrawerisopen":  function(event, from, to) {},

				// ON
				"onsplash": function(event, from, to) {},
				"onsongs":  function(event, from, to) {},
				"onparts":  function(event, from, to) {},
				"ongame":  function(event, from, to) {},
				"ondrawerisclosed":  function(event, from, to) {
					console.log(AppState.drawerOverState);
					AppState.fsm['reset'+AppState.drawerOverState+'state']();

				},

				"onchangestate": function(event, from, to) {}
			}
	  	});
	},

	/** 
		Callback for when the Application has finished it's initial loading
		@private
	*/
	// AppState.fsm.transition;
	onAppLoaded : function() {
		Analytics.initialize();
		Analytics.trackSessionStartInfo("init");
		Analytics.trackEvent("version", Version.releaseVersion);

		ScreenController.appLoaded();
		//print the load time
		if (window.performance){
			var t = window.performance.timing;
			var loadTime = Date.now() - t.responseEnd;
			console.log("page loaded in "+loadTime+"ms");
			// track that load time
			Analytics.trackEvent('performance', 'loading', 'page', loadTime.toString());
		}
	},
	/** 
		start the fsm
	*/
	start : function(){
		AppState.fsm['start']();
	},
};
AppState.initialize();