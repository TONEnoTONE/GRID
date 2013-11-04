/*=============================================================================

 _______  ___      _______  __   __    _______  __   __  _______  _______  _______  __    _ 
|       ||   |    |   _   ||  | |  |  |  _    ||  | |  ||       ||       ||       ||  |  | |
|    _  ||   |    |  |_|  ||  |_|  |  | |_|   ||  | |  ||_     _||_     _||   _   ||   |_| |
|   |_| ||   |    |       ||       |  |       ||  |_|  |  |   |    |   |  |  | |  ||       |
|    ___||   |___ |       ||_     _|  |  _   | |       |  |   |    |   |  |  |_|  ||  _    |
|   |    |       ||   _   |  |   |    | |_|   ||       |  |   |    |   |  |       || | |   |
|___|    |_______||__| |__|  |___|    |_______||_______|  |___|    |___|  |_______||_|  |__|

the game's play button
=============================================================================*/

goog.provide("game.views.PlayButton");

goog.require("screens.views.GridDom");
goog.require("screens.views.Button");
goog.require("goog.dom.classes");
goog.require("graphics.KeyframeAnimation")

/** 
	@constructor
	@extends {Button}
	@param {string} contents
	@param {function(Button)} cb
*/
var PlayButton = function(contents, cb){
	goog.base(this, contents, cb, "PlayButton");
	//add it to the game screen
	goog.dom.appendChild(GridDom.GameScreen, this.Element);
	//the flashing keyframe animation for the count in
	/** @type {KeyframeAnimation}*/
	this.animation = new KeyframeAnimation([{"opacity" : 1}, {"opacity" : 0}, {"opacity" : 1}]);
}

goog.inherits(PlayButton, Button);

/** 
	@override
*/
PlayButton.prototype.disposeInternal = function(){
	this.animation.dispose();
	goog.base(this, "disposeInternal");
}

/** 
	@param {number} countIn
	@param {number} beatDuration (in seconds)
*/
PlayButton.prototype.countIn = function(countIn, beatDuration){
	//start with the count in
	if (countIn > 0){
		this.animation.play(this.Element, countIn*beatDuration / 2, {"timing" : 'ease-in-out', "repeat" : countIn - 1});
	} 
}

/** 
	@private
	@param {string} prefix
	@returns {string} the keyframe
*/

/** 
	put the buttin in "playing" mode
*/
PlayButton.prototype.play = function(){
	this.setText("STOP");
	goog.dom.classes.set(this.Element, "PlayButton playing");	
}

/** 
	put the buttin in "jam" mode
*/
PlayButton.prototype.jam = function(){
	goog.dom.classes.set(this.Element, "PlayButton jamming");	
}

PlayButton.prototype.retry = function(){
	this.setText("RETRY");
}

PlayButton.prototype.stop = function(){
	this.animation.stop(this.Element);
	//set the text
	this.setText("PLAY");
	goog.dom.classes.set(this.Element, "PlayButton stopped");	
}

PlayButton.prototype.next = function(){
	this.setText("NEXT");
	goog.dom.classes.set(this.Element, "PlayButton next");	
}
