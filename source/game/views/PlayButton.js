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
	this.animation = new KeyframeAnimation(this.Element, ["opacity: 1;", "opacity: 0;", "opacity: 1;"]);
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
		this.animation.play(countIn*beatDuration / 2, 'ease-in', countIn - 1);
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
	this.setCopy("STOP");
	goog.dom.classes.remove(this.Element, "stopped");	
	goog.dom.classes.add(this.Element, "playing");
}

PlayButton.prototype.retry = function(){
	this.setCopy("RETRY");
}

PlayButton.prototype.stop = function(){
	this.animation.stop();
	//set the text
	this.setCopy("PLAY");
	goog.dom.classes.add(this.Element, "stopped");	
	goog.dom.classes.remove(this.Element, "playing");	
}

PlayButton.prototype.next = function(){
	this.setCopy("NEXT");
	goog.dom.classes.remove(this.Element, "stopped");	
	goog.dom.classes.remove(this.Element, "playing");		
}
