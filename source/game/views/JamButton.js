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

goog.provide("Jam.Button");

goog.require("screens.views.GridDom");
goog.require("screens.views.Button");
goog.require("goog.dom.classes");

/** 
	@constructor
	@extends {Button}
	@param {string} contents
	@param {function(boolean)} cb
*/
Jam.Button = function(contents, cb){
	goog.base(this, contents, cb, "JamButton");
	/** @type {function(boolean)} */
	this.callback = cb;
	//add it to the game screen
	goog.dom.appendChild(GridDom.GameScreen, this.Element);
	/** @type {boolean} */
	this.activated = false;
}

goog.inherits(Jam.Button, Button);

/** 
	@override
*/
Jam.Button.prototype.disposeInternal = function(){
	goog.base(this, "disposeInternal");
}

/** 
	@param {Button} button
*/
Jam.Button.prototype.activate = function(bool){
	if (bool){
		goog.dom.classes.add(this.Element, "active");
	} else {
		goog.dom.classes.remove(this.Element, "active");
	}
}
