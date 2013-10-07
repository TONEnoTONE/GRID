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
}

goog.inherits(PlayButton, Button);

/** 
	@param {number} countIn
	@param {number} beatDuration (in seconds)
*/
PlayButton.prototype.countIn = function(countIn, beatDuration){
	//start with the count in
	if (countIn > 0){
		var callback = goog.bind(this.setPlay, this);
	} 
}

/** 
	put the buttin in "playing" mode
*/
PlayButton.prototype.play = function(){
	this.setCopy("STOP");
	goog.dom.classes.remove(this.Element, "stopped");	
	goog.dom.classes.add(this.Element, "playing");
}

PlayButton.prototype.reset = function(){
	this.setCopy("RETRY");
}

PlayButton.prototype.stop = function(){
	this.setCopy("PLAY");
	goog.dom.classes.add(this.Element, "stopped");	
	goog.dom.classes.remove(this.Element, "playing");	
}

PlayButton.prototype.next = function(){
	this.setCopy("NEXT");
	goog.dom.classes.remove(this.Element, "stopped");	
	goog.dom.classes.remove(this.Element, "playing");		
}
