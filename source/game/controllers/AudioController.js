/*=============================================================================
 _______  __   __  ______   ___   _______    _______  _______  ______    ___     
|   _   ||  | |  ||      | |   | |       |  |       ||       ||    _ |  |   |    
|  |_|  ||  | |  ||  _    ||   | |   _   |  |       ||_     _||   | ||  |   |    
|       ||  |_|  || | |   ||   | |  | |  |  |       |  |   |  |   |_||_ |   |    
|       ||       || |_|   ||   | |  |_|  |  |      _|  |   |  |    __  ||   |___ 
|   _   ||       ||       ||   | |       |  |     |_   |   |  |   |  | ||       |
|__| |__||_______||______| |___| |_______|  |_______|  |___|  |___|  |_||_______|

sets up sample playback
musical timing based on bpm
=============================================================================*/

goog.provide("game.controllers.AudioController");

goog.require("data.AudioBuffers");
goog.require("audio.AudioPlayer");

/** 
	@typedef {Object}
*/
var AudioController = {
	/** @private
		the current stages mapping from color to sample 
		@type {Object} */
	samples : {},
	/** @private
		@type {Array.<AudioPlayer>}*/
	players : [],
	/** @private
		@const 
		@type {number} */
	sampleDuration : 32,
	/** @private
		@const 
		@type {number} */
	samplePosition : 30,
	/** 
		@param {number} stage
		@param {number} level
	*/
	setStage : function(stage, level){
		AudioController.samples = StageController.getSamples(stage);
	},
	/** 
		@returns {number} the time in seconds of that many steps
	*/
	stepsToSeconds : function(steps){
		//assumes its 120bpm for now
		return steps*.5;
	},
	/** 
		convert a pattern into a bunch of sample loops
		@param {Array.<Array>} pattern
	*/
	play : function(pattern){
		var duration = AudioController.stepsToSeconds(pattern.length);
		for (var i  = 0; i < pattern.length; i++){
			var beat = pattern[i];
			for (var j = 0; j < beat.length; j++){
				var type  = beat[j];
				var buffer = AudioBuffers[AudioController.samples[type]];
				var player = new AudioPlayer(buffer);
				player.loop(AudioController.stepsToSeconds(i), duration);
				AudioController.players.push(player);
			}
		}
	},
	/** 
		stop the pattern's playback
	*/
	stop : function(){
		for (var i = 0, len = AudioController.players.length; i < len; i++){
			var player = AudioController.players[i];
			player.stop();
			player.dispose();
		}
		AudioController.players = [];
	}
};