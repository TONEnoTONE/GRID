/*=============================================================================
	PATTERN PLAYER

	play an entire pattern with controls on volume etc. 
=============================================================================*/


goog.provide("audio.PatternPlayer");

goog.require("audio.AudioPlayer");
goog.require("game.models.Pattern");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {Pattern} pattern
	@param {Object} samples
	@param {Object} stageSamples
*/
var PatternPlayer = function(pattern, samples, stageSamples){
	goog.base(this);
	/** @private
		@type {Pattern} */
	this.pattern = pattern;
	/** @private
		@type {Array.<AudioPlayer>} */
	this.players = [];
	var self = this;
	//make the players
	pattern.forEach(function(hit){
		var type  = hit.type;
		var url = samples[type];
		var buffer = stageSamples[url];
		var player = new AudioPlayer(buffer);
		self.players.push(player);
	});
}

goog.inherits(PatternPlayer, goog.Disposable);

/** @override */
PatternPlayer.prototype.disposeInternal = function(){
	this.forEach(function(player){
		player.dispose();
		player = null;
	});
	this.players = [];
	goog.base(this, "disposeInternal");
}

/** 
	@param {function(AudioPlayer, number)} callback
*/
PatternPlayer.prototype.forEach = function(callback){
	for (var i = 0, len = this.players.length; i < len; i++){
		callback(this.players[i], i);
	}
}

/** 
	@param {number} startTime
	@param {number} delay
	@param {number} duration of loop
	@param {number} beatTime
*/
PatternPlayer.prototype.loopAtTime = function(startTime, delay, duration, beatTime){
	var players = this.players;
	this.pattern.forEach(function(hit, index){
		var player = players[index];
		player.loopAtTime(startTime, beatTime * hit.beat + delay, duration);
	});
}

/** 
	@param {number} volume
	@param {number=} fadeOutTime
*/
PatternPlayer.prototype.fadeTo = function(volume, fadeOutTime){
	this.forEach(function(player){
		player.fadeTo(volume, fadeOutTime);
	});
}

/** 
	@param {number} volume
*/
PatternPlayer.prototype.setVolume = function(volume){
	this.fadeTo(volume, .01);
}

/** 
	mute the player
*/
PatternPlayer.prototype.mute = function(){
	this.setVolume(0);
}

/** 
	mute the player
*/
PatternPlayer.prototype.unmute = function(){
	this.setVolume(1);
}

/** 
	stops the audio
	@param {number=} time
*/
PatternPlayer.prototype.stop = function(time){
	this.forEach(function(player){
		player.stop(time);
	});
}