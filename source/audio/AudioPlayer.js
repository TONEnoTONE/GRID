/*=============================================================================

 _______  __   __  ______   ___   _______    _______  ___      _______  __   __  _______  ______   
|   _   ||  | |  ||      | |   | |       |  |       ||   |    |   _   ||  | |  ||       ||    _ |  
|  |_|  ||  | |  ||  _    ||   | |   _   |  |    _  ||   |    |  |_|  ||  |_|  ||    ___||   | ||  
|       ||  |_|  || | |   ||   | |  | |  |  |   |_| ||   |    |       ||       ||   |___ |   |_||_ 
|       ||       || |_|   ||   | |  |_|  |  |    ___||   |___ |       ||_     _||    ___||    __  |
|   _   ||       ||       ||   | |       |  |   |    |       ||   _   |  |   |  |   |___ |   |  | |
|__| |__||_______||______| |___| |_______|  |___|    |_______||__| |__|  |___|  |_______||___|  |_|

plays/loops audio files in a cross-browser way
=============================================================================*/

goog.provide("audio.AudioPlayer");

goog.require("audio.Audio");
goog.require("goog.Disposable");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {AudioBuffer} buffer
*/
var AudioPlayer = function(buffer){
	goog.base(this);
	/** @private 
		@type {AudioBuffer} */
	this.buffer = buffer;
	/** @private
		@type {AudioBufferSourceNode | null} */
	this.source = null;
}

goog.inherits(AudioPlayer, goog.Disposable);

/** @override */
AudioPlayer.prototype.disposeInternal = function(){
	this.buffer = null;
	this.source = null;
	goog.base(this, "disposeInternal");
}

/** 
	@param {number} startOffset of playback
	@param {number} duration of loop
*/
AudioPlayer.prototype.loop = function(startOffset, duration){
	this.source = GridAudio.Context.createBufferSource();
	var startTime = GridAudio.Context.currentTime;
	var source = this.source;
	source.buffer = this.buffer;
	source.connect(GridAudio.Context.destination);
	source.loop = true;
	if (goog.isDef(source.loopStart) && goog.isDef(source.loopEnd)){
		source.loopStart = 0;
		source.loopEnd = duration;
		source.start(startTime + startOffset);
	} else {
		//fall back to older web audio implementation
		source.noteGrainOn(startTime + startOffset, 0, duration);
	}
}

/** 
	stops the audio
*/
AudioPlayer.prototype.stop = function(){
	var time = GridAudio.Context.currentTime;
	var source = this.source;
	if (goog.isDef(source.stop)){
		source.stop(time);
	} else {
		//fall back to older web audio implementation
		source.noteOff(time);
	}
}

