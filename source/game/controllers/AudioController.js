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
	/** @type {number} */
	fadeOutTime : 50,
	/** @type {number}*/
	bpm : 120,
	/** @type {number} */
	startTime : 0,
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
	createBuffer : function(){

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
		@param {number=} repeat (if omitted it is looped)
	*/
	play : function(pattern, delay, repeat){
		//setup the player
		var duration = AudioController.stepsToSeconds(pattern.length);
		pattern.forEach(function(hit){
			AudioController.playHit(hit, duration, delay, repeat);
		});
	},
	/** 
		@param {PatternHit} hit
		@param {number} duration	
		@param {number} delay	
		@param {number=} repeat (if omitted it is looped)
	*/
	playHit : function(hit, duration, delay, repeat){
		var type  = hit.type;
		var buffer = AudioController.samples[type].buffer;
		var player = new AudioPlayer(buffer);
		if (goog.isNumber(repeat)){
			for (var i = 0; i < repeat; i++){
				player.play(AudioController.stepsToSeconds(hit.beat) + delay, duration);			
				delay += duration;
			}
		} else {
			player.loop(AudioController.stepsToSeconds(hit.beat) + delay, duration);
		}
		AudioController.players.push(player);
	},
	/** 	
		stop the pattern's playback
		@param {number=} time
	*/
	stop : function(time){
		time = time || 0;
		for (var i = 0, len = AudioController.players.length; i < len; i++){
			var player = AudioController.players[i];
			player.stop(time);
		}
		var arrayCopy = AudioController.players.slice();
		//dispose them after they've had time to fade out
		setTimeout(function(){
			for (var i = 0, len = arrayCopy.length; i < len; i++){
				var player = arrayCopy[i];
				player.dispose();
			}
			arrayCopy = null;
		}, AudioController.fadeOutTime);
		AudioController.players = [];
	},
	/** 
		@param {number} the count in beats
	*/
	countIn : function(beats){
		var btos = AudioController.stepsToSeconds;
		if (beats === 16) {
			var timing = [btos(4), btos(4), btos(2), btos(2), btos(2), btos(2)];
			// var timing = [4, 4, 2, 2, 2, 2];
			var totalDelay = 0;
			for (var i = 0; i < 6; i++){
				var player = new AudioPlayer(AudioController.countInSamples[i].buffer);
				player.play(totalDelay);
				totalDelay += timing[i];
				AudioController.players.push(player);
			}
		} else if (beats === 8) {
			var timing = [btos(2), btos(2), btos(2), btos(2)];
			var totalDelay = 0;
			var offset = 6;
			if (AudioController.bpm < 80){
				offset = 2;
			}
			for (var i = 0 + offset; i < offset + 4; i++){
				var player = new AudioPlayer(AudioController.countInSamples[i].buffer);
				player.play(totalDelay);
				totalDelay += timing[i - offset];
				AudioController.players.push(player);
			}
		} else if (beats === 4) {
			var timing = [btos(1), btos(1), btos(1), btos(1)];
			var totalDelay = 0;
			if (AudioController.bpm < 80){
				offset = 2;
			}
			for (var i = 0 + offset; i < offset + 4; i++){
				var player = new AudioPlayer(AudioController.countInSamples[i].buffer);
				player.play(totalDelay);
				totalDelay += timing[i - offset];
				AudioController.players.push(player);
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
		plays the ending sample of the song
		@param {number=} time
	*/
	playEnding : function(time){
		var buffer = AudioController.samples["end"].buffer;
		AudioController.playOneShot(buffer, time);
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
	},
	/*=========================================================================
		TRANSPORT
	=========================================================================*/
	/** 
		start the transport
	*/
	startTransport : function(){
		AudioController.startTime = GridAudio.Context.currentTime;
	},
	/** 
		stop the transport
	*/
	stopTransport : function(){
		AudioController.startTime = -1;
	},
	/** 
		@param {number} beat (relative to the start of the transport)
		@returns {number} the absolute time that beat occurs
	*/ 
	getBeatTime : function(beat){
		return AudioController.stepsToSeconds(beat) + AudioController.startTime;
	},
	/** 
		@returns {number} the number of beats since the start of the transport
	*/ 
	getCurrentBeat : function(){
		var elapsedTime = GridAudio.Context.currentTime - AudioController.startTime;
		var beatNumber = parseInt(elapsedTime / AudioController.stepsToSeconds(1), 10);
		return beatNumber;
	},
	/** 
		@param {number} beat (relative to now)
		@returns {number} the time from now (in seconds) that beat occurs
	*/ 
	getNextBeat : function(beat){
		var futureBeat = AudioController.getCurrentBeat()+beat;
		var futureBeatTime = AudioController.getBeatTime(futureBeat);
		return futureBeatTime - GridAudio.Context.currentTime;
	},

};

AudioController.initialize();