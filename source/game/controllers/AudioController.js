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
	/** @type {number} */
	countInBeats : 4,
	/** @type {number} */
	sampleDuration : 16,
	/** @type {number} */
	bpm : 120,
	/** 
		@param {number} stage
		@param {number} level
	*/
	setStage : function(stage, level){
		AudioController.samples = StageController.getSamples(stage);
		AudioController.bpm = StageController.getBpm(stage);
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
					//unsigned long length, float sampleRate);
					var extendedBuffer = GridAudio.Context.createBuffer(buffer.numberOfChannels, 
						AudioController.sampleDuration*buffer.sampleRate, buffer.sampleRate);
					//fill the buffer with the content
					for (var channel = 0; channel < buffer.numberOfChannels; channel++){
						var channelData = buffer.getChannelData(channel);
						var extendedBufferSamples = extendedBuffer.getChannelData(channel);
						for (var i = 0; i < channelData.length; i++){
							extendedBufferSamples[i] = channelData[i];
						}
					}
					AudioBuffers[sample].buffer = extendedBuffer;
				}
			}());
		}
	},
	/** 
		@returns {number} the time in seconds of that many steps
	*/
	stepsToSeconds : function(steps){
		//assumes its 8th note at 120bpm
		return steps*(30/AudioController.bpm);
	},
	/** 
		@returns {number} the delay time of the count in
	*/
	countInDuration : function(){
		//assumes its 8th note at 120bpm
		return AudioController.stepsToSeconds(AudioController.countInBeats);
	},

	/** 
		convert a pattern into a bunch of sample loops
		@param {Pattern} pattern
		@param {number=} delay
	*/
	play : function(pattern, delay){
		delay = delay || 0;
		//setup the player
		var duration = AudioController.stepsToSeconds(pattern.length);
		pattern.forEach(function(hit){
			var type  = hit.type;
			var buffer = AudioController.samples[type].buffer;
			var player = new AudioPlayer(buffer);
			player.loop(AudioController.stepsToSeconds(hit.beat) + delay, duration);
			AudioController.players.push(player);
		});
	},
	/** 
		plays the pattern once
	*/
	playOnce : function(pattern){
		//setup the player
		var duration = AudioController.stepsToSeconds(pattern.length);
		pattern.forEach(function(hit){
			var type  = hit.type;
			var buffer = AudioController.samples[type].buffer;
			var player = new AudioPlayer(buffer);
			player.play(AudioController.stepsToSeconds(hit.beat), duration);
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
		}
		//after the fadeout timeout, dispose the player
		setTimeout(function(){
			for (var i = 0, len = AudioController.players.length; i < len; i++){
				var player = AudioController.players[i];
				player.dispose();
			}
		}, 50);
		AudioController.players = [];
	},
	countIn : function(){
		//play the clicks
		for (var i = 0; i < AudioController.countInBeats / 2; i++){
			var buffer = AudioBuffers.cow808.buffer;
			var player = new AudioPlayer(buffer);
			player.play(AudioController.stepsToSeconds(i) * 2);
			AudioController.players.push(player);
		}
	},
	/** 
		plays all the audio files from the stage
		@param {number} stage
		@param {number} upToLevel
		@param {boolean=} bringToFront makes the upToLevel the loudest
	*/
	playStage : function(stage, upToLevel, bringToFront){
		bringToFront = bringToFront || false;
		
	}
};

AudioController.initialize();