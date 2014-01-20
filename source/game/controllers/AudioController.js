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
goog.require("audio.GridAudio");
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
	/** init */
	initialize : function(){
		AudioController.loadSamples();
	},
	/** 
		@param {number} stage
		@param {number} level
	*/
	setStage : function(stage, level){
		AudioController.samples = StageController.getSamples(stage, level);
		AudioController.bpm = StageController.getBpm(stage);
		var delayTime = AudioController.stepsToSeconds(1);
		GridAudio.delay.delayTime(delayTime);
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
		@param {number=} bpm
		@returns {number} the time in seconds of that many steps
	*/
	stepsToSeconds : function(steps, bpm){
		bpm = bpm || AudioController.bpm;
		return steps*(30/bpm);
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
		// GridAudio.delay.setWet(0);
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
		//GridAudio.delay.setWet(0);
		//setup the player
		var duration = AudioController.stepsToSeconds(pattern.length);
		pattern.forEach(function(hit){
			var type  = hit.type;
			var buffer = AudioController.samples[type].buffer;
			var player = new AudioPlayer(buffer);
			player.play(AudioController.stepsToSeconds(hit.beat), duration);
			AudioController.players.push(player);
		});
		//play the downbeat
		var hits = pattern.getHitsOnBeat(0);
		for (var i = 0; i < hits.length; i++){
			var hit = hits[i];
			var type  = hit.type;
			var buffer = AudioController.samples[type].buffer;
			var player = new AudioPlayer(buffer);
			var step = AudioController.stepsToSeconds(1);
			player.play(duration);
			AudioController.players.push(player);
		}

	},
	/** 
		stop the pattern's playback
		//stop after the next beat
		@param {boolean=} withDelay
	*/
	stop : function(withDelay){
		var fadeTime = AudioController.stepsToSeconds(1);
		for (var i = 0, len = AudioController.players.length; i < len; i++){
			var player = AudioController.players[i];
			player.fadeTo(0, fadeTime);
		}
		//after the fadeout timeout, dispose the player
		setTimeout(function(){
			for (var i = 0, len = AudioController.players.length; i < len; i++){
				var player = AudioController.players[i];
				player.stop();
				player.dispose();
			}
			AudioController.players = [];
		}, fadeTime * 1000);
		if (withDelay){
			//GridAudio.delay.setWet(.1);
		}
	},
	/** 
		@param {number=} delay
	*/
	countIn : function(delay){
		//play the clicks
		for (var i = 0; i < AudioController.countInBeats / 2; i++){
			var buffer = AudioBuffers.cow808.buffer;
			var player = new AudioPlayer(buffer);
			player.play(AudioController.stepsToSeconds(i) * 2 + delay);
			AudioController.players.push(player);
		}
	},
	/** 
		plays all the audio files from the stage
		@param {number} stage
		@param {number} upToLevel
		@param {number=} volume
	*/
	playStage : function(stage, upToLevel, volume){
		//set the delay time
		var tempo = StageController.getBpm(stage);
		var delayTime = AudioController.stepsToSeconds(1, tempo);
		GridAudio.delay.delayTime(delayTime);
		//GridAudio.delay.setWet(0);
		volume = volume || 1;
		//cap the levels
		upToLevel = Math.min(StageController.getLevelCount(stage), upToLevel);
		//get the patterns
		var playTime = GridAudio.Context.currentTime + .1;
		var patterns = new Array(upToLevel);
		for (var level = 0; level < upToLevel; level++){
			AudioController.playLevel(stage, level, playTime);
		}
	},
	/** 
		plays all the audio files from the stage
		@param {number} stage
		@param {number} level
		@param {number} playTime
		@param {number=} volume
	*/
	playLevel : function(stage, level, playTime, volume){
		//get the patterns
		var hits = StageController.getPattern(stage, level);
		var pattern = new Pattern(hits.length);
		pattern.addPattern(hits);
		//get the tempo and samples of the level
		var samples = StageController.getSamples(stage, level);
		var tempo = StageController.getBpm(stage);
		//play each of the samples
		var duration = AudioController.stepsToSeconds(pattern.length, tempo);
		pattern.forEach(function(hit){
			var type  = hit.type;
			var buffer = samples[type].buffer;
			var player = new AudioPlayer(buffer);
			player.loopAtTime(playTime, AudioController.stepsToSeconds(hit.beat, tempo), duration);
			AudioController.players.push(player);
		});
	}
};

AudioController.initialize();