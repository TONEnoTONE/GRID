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
	countInBeats : 0,
	/** @type {Array.<string>} */
	countInSamples : [AudioBuffers.countIn01, AudioBuffers.countIn02, AudioBuffers.countIn11, AudioBuffers.countIn12, AudioBuffers.countIn13, AudioBuffers.countIn14, AudioBuffers.countIn21, AudioBuffers.countIn22, AudioBuffers.countIn23, AudioBuffers.countIn24],
	/** @type {number}*/
	bpm : 120,
	/** 
		@param {number} stage
		@param {number} level
	*/
	setStage : function(stage, level){
		AudioController.samples = StageController.getSamples(stage, level);
		AudioController.bpm = StageController.getBPM(stage);
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
		@param {number} delay time in seconds
	*/
	play : function(pattern, delay){
		//setup the player
		var duration = AudioController.stepsToSeconds(pattern.length);
		pattern.forEach(function(hit){
			AudioController.playHit(hit, duration, delay);
		});
	},
	/** 
		@param {PatternHit} hit
		@param {number} duration	
		@param {number} delay	
	*/
	playHit : function(hit, duration, delay){
		var type  = hit.type;
		var buffer = AudioController.samples[type].buffer;
		var player = new AudioPlayer(buffer);
		player.loop(AudioController.stepsToSeconds(hit.beat) + delay, duration);
		AudioController.players.push(player);
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
	},
	/** 
		@param {number} the count in beats
	*/
	countIn : function(beats){
		var btos = AudioController.stepsToSeconds;
		if (beats === 16) {
			var timing = [btos(4), btos(4), btos(2), btos(2), btos(2), btos(2)];
			var totalDelay = 0;
			for (var i = 0; i < 6; i++){
				AudioController.playOneShot(AudioController.countInSamples[i].buffer, totalDelay);
				totalDelay += timing[i];
			}
		} else if (beats === 8) {
			var timing = [btos(2), btos(2), btos(2), btos(2)];
			var totalDelay = 0;
			var offset = 6;
			for (var i = 0 + offset; i < offset + 4; i++){
				AudioController.playOneShot(AudioController.countInSamples[i].buffer, totalDelay);
				totalDelay += timing[i - offset];
			}
		}
	},
	/** 
		play the win sound
	*/
	win : function(){
		var buffer = AudioBuffers.win.buffer;
		AudioController.playOneShot(buffer);
	},
	/** 
		the lose sound
	*/
	lose : function(){
		var buffer = AudioBuffers.lose.buffer;
		AudioController.playOneShot(buffer);
	},
	/** 
		plays a one shot sound
		@param {AudioBuffer} buffer
		@param {number=} time
	*/
	playOneShot : function(buffer, time){
		time = time || 0;
		var player = new AudioPlayer(buffer);
		player.play(time);
		AudioController.players.push(player);
	}
};

AudioController.initialize();