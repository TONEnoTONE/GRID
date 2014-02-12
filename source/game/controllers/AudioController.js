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
goog.require("audio.PatternPlayer");
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
		the current stages mapping from color to sample for each level
		@type {Object} */
	stageSamples : {},
	/** @private
		@type {Array.<AudioPlayer|PatternPlayer>}*/
	players : [],
	/** @type {number} */
	countInBeats : 4,
	/** @type {AudioBuffer} */
	countInBuffer : null,
	/** @type {number} */
	sampleDuration : 16,
	/** @type {number} */
	bpm : 120,
	/** @type {number} */
	stageBpm : 120,
	/** @type {number} */
	startTime : -1,
	/** init */
	initialize : function(){
		//load just the cowbell to start
		AudioController.loadSample(AudioBuffers.drums808.cow, function(buffer){
			AudioController.countInBuffer = buffer;
			LoadingManager.resolvePreload();
		}, 2);
	},
	/** 
		@param {number} stage
		@param {number} level
	*/
	setStage : function(stage, level){
		AudioController.samples = StageController.getSamples(stage, level);
		AudioController.bpm = StageController.getBpm(stage, level);
		AudioController.stageBpm = StageController.getStageBpm(stage);
		var delayTime = AudioController.stepsToSeconds(1);
		GridAudio.delay.delayTime(delayTime);
	},
	/** 
		loads all of the audio for the stage
		@param {number} stage
		@param {function()} callback
	*/
	loadStageAudio : function(stage, callback){
		AudioController.stageSamples = {};
		var sampleUrls = [];
		var levels = StageController.getLevelCount(stage);
		//get a list of all the urls
		for (var level = 0; level < levels; level++){
			var levelSamples = StageController.getSamples(stage, level);
			for (var color in levelSamples){
				var url = levelSamples[color];
				if (!goog.isDef(AudioController.stageSamples[url])){
					AudioController.stageSamples[url] = {};
				}
			}
		}
		//callback tracker
		var callbacker = {
			total : goog.object.getCount(AudioController.stageSamples),
			loaded : 0,
			callback : callback
		}
		//load the samples
		for (var url in AudioController.stageSamples){
			AudioController.loadSample(url, function(){
				//closure
				var sampUrl = url;
				return function(buffer){
					AudioController.stageSamples[sampUrl] = buffer;
					callbacker.loaded++;
					if (callbacker.total === callbacker.loaded){
						callbacker.callback();
					}
				}
			}());
		}
	},
	/** 
		@param {string} url
		@param {function(AudioBuffer)} callback
		@param {number=} duration
	*/
	loadSample : function(url, callback, duration){
		duration = duration || AudioController.sampleDuration;
		LoadingManager.loadAudio(url, function(buffer){
			//unsigned long length, float sampleRate);
			var extendedBuffer = GridAudio.Context.createBuffer(buffer.numberOfChannels, 
				duration*buffer.sampleRate, buffer.sampleRate);
			//fill the buffer with the content
			for (var channel = 0; channel < buffer.numberOfChannels; channel++){
				var channelData = buffer.getChannelData(channel);
				var extendedBufferSamples = extendedBuffer.getChannelData(channel);
				for (var i = 0; i < channelData.length; i++){
					extendedBufferSamples[i] = channelData[i];
				}
			}
			callback(extendedBuffer);
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
		//the count in is at the stage tempo
		return AudioController.stepsToSeconds(AudioController.countInBeats, AudioController.stageBpm);
	},

	/** 
		convert a pattern into a bunch of sample loops
		@param {Pattern} pattern
		@param {number} delay
		@returns {PatternPlayer} 
	*/
	play : function(pattern, delay){
		AudioController.startClock();
		// GridAudio.delay.setWet(0);
		//setup the player
		var duration = AudioController.stepsToSeconds(pattern.length);
		var player = new PatternPlayer(pattern, AudioController.samples, AudioController.stageSamples);
		player.loopAtTime(AudioController.startTime, delay, duration, AudioController.stepsToSeconds(1));
		AudioController.players.push(player);
		return player;
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
		//shoren the pattern
		var half = pattern.clone();
		half.setLength(pattern.length / 2);
		var duration = AudioController.stepsToSeconds(half.length);
		half.forEach(function(hit){
			var type  = hit.type;
			var url = AudioController.samples[type];
			var buffer = AudioController.stageSamples[url];
			var player = new AudioPlayer(buffer);
			player.play(AudioController.stepsToSeconds(hit.beat), duration);
			AudioController.players.push(player);
		});
		/*
		//play the downbeat
		var hits = half.getHitsOnBeat(0);
		for (var i = 0; i < hits.length; i++){
			var hit = hits[i];
			var type  = hit.type;
			var url = AudioController.samples[type];
			var buffer = AudioController.stageSamples[url];
			var player = new AudioPlayer(buffer);
			var step = AudioController.stepsToSeconds(1);
			player.play(duration);
			AudioController.players.push(player);
		}
		*/
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
		var stageBpm = AudioController.stageBpm;
		for (var i = 0; i < AudioController.countInBeats / 2; i++){
			var buffer = AudioController.countInBuffer;
			var player = new AudioPlayer(buffer);
			player.playDry(AudioController.stepsToSeconds(i, stageBpm) * 2 + delay);
			AudioController.players.push(player);
		}
	},
	/** 
		plays all the audio files from the stage that are solved excluding the excludeLevel
		@param {number} stage
		@param {number} excludeLevel
		@param {number} delay
		@param {number=} volume
	*/
	playStage : function(stage, excludeLevel, delay, volume){
		AudioController.startClock();
		AudioController.setGlobalDelay(stage);
		//play all the solved levels
		StageController.forEachSolvedLevel(stage, function(level){
			if (level !== excludeLevel){
				AudioController.playLevel(stage, level, delay, volume);
			}
		});
	},
	/** 
		sets the delay for the stage
		@param {number} stage
	*/
	setGlobalDelay : function(stage){
		var tempo = StageController.getStageBpm(stage);
		var beatTime = AudioController.stepsToSeconds(1, tempo);
		//set the delay time
		GridAudio.delay.delayTime(beatTime);
	},
	/** 
		plays all the audio files from the stage
		@param {number} stage
		@param {number} level
		@param {number} delay
		@param {number=} volume
		@returns {PatternPlayer}
	*/
	playLevel : function(stage, level, delay, volume){
		//start the clock if it hasn't already been
		AudioController.startClock();
		//get the patterns
		var pattern = StageController.getPattern(stage, level);
		if (pattern.isEmpty()){
			pattern = StageController.getStagePattern(stage, level);
		}
		var volumeLevel = /** @type {number} */ (volume || 1);
		//get the tempo and samples of the level
		var samples = StageController.getSamples(stage, level);
		var tempo = StageController.getBpm(stage, level);
		//play each of the samples
		var duration = AudioController.stepsToSeconds(pattern.length, tempo);
		var beatTime = AudioController.stepsToSeconds(1, tempo);
		var player = new PatternPlayer(pattern, samples, AudioController.stageSamples);
		player.loopAtTime(AudioController.startTime, delay, duration, beatTime);
		AudioController.players.push(player);
		player.setVolume(volumeLevel);	
		return player;
	}
};

AudioController.initialize();