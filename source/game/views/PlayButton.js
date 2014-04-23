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
goog.require("Animation.Keyframe");
goog.require('goog.fx.dom.FadeOut');
goog.require('goog.fx.dom.FadeIn');
goog.require('game.views.BoardView');
goog.require('game.views.PieceSelection');
goog.require("goog.dom.ViewportSizeMonitor");
goog.require("goog.events");

/** 
	@constructor
	@extends {Button}
	@param {string} contents
	@param {function(Button)} cb
*/
var PlayButton = function(contents, cb){
	goog.base(this, "" , cb, {"id" : "PlayButton"});
	/** @type {Element} */
	this.Blocker = goog.dom.createDom("div", {"id" : "GameScreenBlocker"});
	goog.dom.appendChild(GridDom.GameScreen, this.Blocker);
	//add it to the game screen
	goog.dom.appendChild(GridDom.GameScreen, this.Element);
	// goog.style.setShown
	//add it to the game screen
	goog.dom.appendChild(GridDom.GameScreen, this.Element);
	//the flashing keyframe animation for the count in
	/** @type {Animation.Keyframe}*/
	this.animation = new Animation.Keyframe([{"opacity" : 1}, {"opacity" : 0}, {"opacity" : 1}], [0, 10, 50]);
	//listen for resizing
	var vsm = new goog.dom.ViewportSizeMonitor();
	goog.events.listen(vsm, goog.events.EventType.RESIZE, goog.bind(this.onresize, this));
	//size it initially
	this.onresize();
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
	@param {number} totalDuration (in seconds)
*/
PlayButton.prototype.countIn = function(countIn, totalDuration){
	goog.dom.classes.add(this.Blocker, "block");	
	//start with the count in
	if (countIn > 0){
		this.animation.play(this.Element, totalDuration / countIn, {repeat : countIn});
	} 
}

/** 
	
*/
PlayButton.prototype.onresize = function(e){
	//the width is equal to the left offset of the pieceselection
	var size = goog.style.getSize(GridDom.GameScreen);
	var width = size.width - CONST.TILESIZE*7;
	goog.style.setSize(this.Element, new goog.math.Size(width, CONST.TILESIZE*3));
}


/** 
	put the buttin in "playing" mode
*/
PlayButton.prototype.play = function(){
	//this.setText("STOP");
	goog.dom.classes.set(this.Element, "playing");
	goog.dom.classes.add(this.Blocker, "block");	
}

/** 
	put the buttin in "free play" mode
*/
PlayButton.prototype.playFree = function(){
	goog.dom.classes.set(this.Element, "playing free");
	goog.dom.classes.add(this.Blocker, "block");	
}

PlayButton.prototype.retry = function(){
	goog.dom.classes.set(this.Element, "retry");
	goog.dom.classes.add(this.Blocker, "block");	
}

/** 
	@param {boolean=} freePlay
*/
PlayButton.prototype.stop = function(freePlay){
	this.animation.stop(this.Element);
	//set the text
	//this.setText("PLAY");
	if (freePlay){
		goog.dom.classes.set(this.Element, "stopped FreePlay");	
	} else {
		goog.dom.classes.set(this.Element, "stopped");	
	}
	goog.dom.classes.remove(this.Blocker, "block");	
}

PlayButton.prototype.next = function(){
	//this.setText("NEXT");
	goog.dom.classes.set(this.Element, "");	
	goog.dom.classes.add(this.Blocker, "block");	
}



PlayButton.prototype.fadeTime = 300;

PlayButton.prototype.fadedOpacity = .1;

PlayButton.prototype.fadeIn = function(){
	goog.dom.classes.remove(this.Element, "faded");
}

PlayButton.prototype.fadeOut = function(){
	goog.dom.classes.add(this.Element, "faded");
}
