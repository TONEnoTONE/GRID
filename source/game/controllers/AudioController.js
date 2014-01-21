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
	/** @type {number} */
	startTime : -1,
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
		for (var key in AudioBuffers){
			var samples = AudioBuffers[key];
			if (samples.url && samples.buffer){
				AudioController.loadSample(samples);
			} else {
				for (var name in samples){
					var samp = samples[name];
					AudioController.loadSample(samp);
				}
			}
		}
	},
	/** 
		@param {Object} sample
	*/
	loadSample : function(sample){
			var file = "./assets/audio/"+sample.url
			LoadingManager.loadAudio(file, function(buffer){
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
				sample.buffer = extendedBuffer;
			});
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
		@param {number} delay
		@param {number} now
	*/
	play : function(pattern, delay, now){
		AudioController.startClock();
		// GridAudio.delay.setWet(0);
		//setup the player
		var duration = AudioController.stepsToSeconds(pattern.length);
		pattern.forEach(function(hit){
			var type  = hit.type;
			var buffer = AudioController.samples[type].buffer;
			var player = new AudioPlayer(buffer);
			player.loopAtTime(AudioController.startTime, AudioController.stepsToSeconds(hit.beat) + delay, duration);
			AudioController.players.push(player);
		});
	},
	/** 
		@private
		starts the "start clock"
	*/
	startClock : function(){
		if (AudioController.startTime < 0){
			AudioController.startTime = GridAudio.Context.currentTime;
		}
	},
	stopClock : function(){
		AudioController.startTime = -1;
	},
	/** 
		plays the pattern once
	*/
	playOnce : function(pattern){
		AudioController.startClock();
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
	*/
	stop : function(){
		AudioController.stopClock();
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
	},
	/** 
		@param {number=} delay
	*/
	countIn : function(delay){
		//play the clicks
		for (var i = 0; i < AudioController.countInBeats / 2; i++){
			var buffer = AudioBuffers.drums808.cow.buffer;
			var player = new AudioPlayer(buffer);
			player.playDry(AudioController.stepsToSeconds(i) * 2 + delay);
			AudioController.players.push(player);
		}
	},
	/** 
		plays all the audio files from the stage
		@param {number} stage
		@param {number} upToLevel
		@param {number} delay
		@param {number=} volume
	*/
	playStage : function(stage, upToLevel, delay, volume){
		AudioController.startClock();
		//set the delay time
		var tempo = StageController.getBpm(stage);
		var delayTime = AudioController.stepsToSeconds(1, tempo);
		GridAudio.delay.delayTime(delayTime);
		//GridAudio.delay.setWet(0);
		volume = volume || 1;
		//cap the levels
		upToLevel = Math.min(StageController.getLevelCount(stage), upToLevel);
		//get the patterns
		var playTime = AudioController.startTime;
		var patterns = new Array(upToLevel);
		for (var level = 0; level < upToLevel; level++){
			AudioController.playLevel(stage, level, delay + playTime, volume);
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
		volume = /** @type {number} */ (volume || 1);
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
			player.setVolume(volume);
			player.loopAtTime(playTime, AudioController.stepsToSeconds(hit.beat, tempo), duration);
			AudioController.players.push(player);
		});
	}
};

AudioController.initialize();