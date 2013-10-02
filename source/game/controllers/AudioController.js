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
goog.require("managers.LoadingManager");

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
	/** init */
	initialize : function(){
		AudioController.loadSamples();
	},
	/** load the samples in AudioBuffer */
	loadSamples : function(){
		for (var sampleName in AudioBuffers){
		var file = "./assets/audio/"+AudioBuffers[sampleName].url
		LoadingManager.loadAudio(file, function(){
			//some closure so that the buffer gets mapped to the right samplename
			var sample = sampleName;
			return function(buffer){
					AudioBuffers[sample].buffer = buffer;
				}
			}());
		}
	},
	/** 
		@returns {number} the time in seconds of that many steps
	*/
	stepsToSeconds : function(steps){
		//assumes its 8th note at 120bpm
		return steps*.25;
	},
	/** 
		convert a pattern into a bunch of sample loops
		@param {Pattern} pattern
	*/
	play : function(pattern){
		var duration = AudioController.stepsToSeconds(pattern.length);
		pattern.forEach(function(hit){
			var type  = hit.type;
			var buffer = AudioController.samples[type].buffer;
			var player = new AudioPlayer(buffer);
			player.loop(AudioController.stepsToSeconds(hit.beat), duration);
			AudioController.players.push(player);
		});
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

AudioController.initialize();