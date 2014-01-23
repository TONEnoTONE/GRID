/*=============================================================================
PATTERN PLAYER
=============================================================================*/


goog.provide("audio.PatternPlayer");

goog.require("audio.AudioPlayer");
goog.require("game.models.Pattern");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {Pattern} pattern

*/
var PatternPlayer = function(pattern){
	goog.base(this);
	/** @private
		@type {Pattern} */
	this.pattern = pattern;
	/** @private
		@type {Array.<AudioPlayer>} */
	this.players = [];
	//make the players
	pattern.forEach(function(hit){
		var type  = hit.type;
		var url = AudioController.samples[type];
		var buffer = AudioController.stageSamples[url];
		var player = new AudioPlayer(buffer);
		this.players.push(player);
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