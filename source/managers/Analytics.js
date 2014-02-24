/*============================================================================
 _______  __    _  _______  ___      __   __  _______  ___   _______  _______ 
|   _   ||  |  | ||   _   ||   |    |  | |  ||       ||   | |       ||       |
|  |_|  ||   |_| ||  |_|  ||   |    |  |_|  ||_     _||   | |       ||  _____|
|       ||       ||       ||   |    |       |  |   |  |   | |       || |_____ 
|       ||  _    ||       ||   |___ |_     _|  |   |  |   | |      _||_____  |
|   _   || | |   ||   _   ||       |  |   |    |   |  |   | |     |_  _____| |
|__| |__||_|  |__||__| |__||_______|  |___|    |___|  |___| |_______||_______|
=============================================================================*/

goog.provide("managers.Analytics");

goog.require("models.StagesModel");
goog.require("game.controllers.StageController");

var Analytics = {
    /** @type {string} */
	uuid : "",

    /** initializer */
	initialize : function(){
		// Prod
		//ga_storage._setAccount('UA-47760090-1'); 
		
		// Staging
		//ga_storage._setAccount('UA-47760090-2');

		// Dev 
		ga_storage._setAccount('UA-47760090-3');  
    },

	/** 
	Tracking an Event
	usgae: ga_storage._trackEvent('category', 'action', 'label', 'value');
	
	@param {string} category
	@param {string} action
	@param {string=} label
	@param {string=} value
	**/
	trackEvent : function (category, action, label, value) {
		if ( value ) {
			ga_storage._trackEvent(category, action, label, value);
		} else if ( label ) {
			ga_storage._trackEvent(category, action, label);
		} else if ( action ) {
			ga_storage._trackEvent(category, action);
		} else {
			console.log("Error using analytics. need at least 2 params.")
		}			
	},

	/** 
	Tracking an Pageview
	USAGE: ga_storage._trackPageview('/index', 'optional title');
	
	@param {string} page
	@param {string=} title
	**/
	trackPageview : function (page, title) {
		ga_storage._trackPageview(page, title);
	},

	/****************************************************************************************
	SPECIFIC ANALYTIC IMPLEMENTATIONS
	****************************************************************************************/

	/**
	track number of songs unlocked

	@param {string} sessionStartType
	**/
	trackSessionStartInfo :  function( sessionStartType ) {
		// set up a temp player obj
		var player = {};
		player.unlockedSongs=0;
		player.solvedLevels=0;
		player.numStars=0;
		player.numThreeStarLevels=0;
		player.songsRecorded=0;

		var stage=0;
		var stageCount = StageController.getStageCount();

		for (var len = stageCount; stage < len ; stage++){
			var status = StagesModel.getStageStatus(stage);

			if (status === StagesModel.STATUS.PLAYABLE){
				player.unlockedSongs++;
				
				for (var i = 0, len = StagesModel.getLevelCount(stage); i < len; i++){
					if (StagesModel.getLevelStatus(stage, i) === StagesModel.STATUS.SOLVED){
						player.solvedLevels++;

						var stars = StagesModel.getLevelStars(stage, i);

						player.numStars += stars;
						if ( stars == 3 ) {
							player.numThreeStarLevels++;

							if ( !StageController.getPattern(stage, i).isEmpty()) {
								player.songsRecorded++;
							}
						}
					}
				}
			}
		}

		// session has started
		Analytics.trackEvent('session', 'start', sessionStartType);

		// songs complete upon session start
		Analytics.trackEvent('session', 'user_stats', 'songs_unlocked', player.unlockedSongs.toString() );
		
		// parts complete upon session start
		Analytics.trackEvent('session', 'user_stats', 'solved_levels', player.solvedLevels.toString() );

		// Songs Recorded upon session start
		Analytics.trackEvent('session', 'user_stats', 'parts_recorded', player.songsRecorded.toString() );

		// stars earned
		Analytics.trackEvent('session', 'user_stats', 'stars_earned', player.numStars.toString() );

		// songs with 3 stars
		Analytics.trackEvent('session', 'user_stats', 'songs_with_3_stars', player.numThreeStarLevels.toString() );
		
	},

	/**
	track number of songs unlocked

	@param {string} sessionStartType
	**/
	trackDeviceInfo :  function() {
		Analytics.trackEvent('device', 'model', window["device"]["model"]);
        Analytics.trackEvent('device', 'platform', window["device"]["platform"]);
        Analytics.trackEvent('device', 'version', window["device"]["version"]);
		// maybe we want to use this somehow? 
        Analytics.uuid = window["device"]["uuid"];

        /*
    	alert("here comes the info that I keep promising.");
    	alert("device.model: " + window["device"]["model"]);
        alert("device.platform: " + window["device"]["platform"]);
        alert("device.version: " + window["device"]["version"]);
        alert("device.uuid: " + window["device"]["uuid"]);
        */
  	}
}
Analytics.initialize();