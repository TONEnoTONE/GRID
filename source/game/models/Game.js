/* ================================================================================
 _______  _______  __   __  _______    __   __  _______  ______   _______  ___     
|       ||   _   ||  |_|  ||       |  |  |_|  ||       ||      | |       ||   |    
|    ___||  |_|  ||       ||    ___|  |       ||   _   ||  _    ||    ___||   |    
|   | __ |       ||       ||   |___   |       ||  | |  || | |   ||   |___ |   |    
|   ||  ||       ||       ||    ___|  |       ||  |_|  || |_|   ||    ___||   |___ 
|   |_| ||   _   || ||_|| ||   |___   | ||_|| ||       ||       ||   |___ |       |
|_______||__| |__||_|   |_||_______|  |_|   |_||_______||______| |_______||_______|
=================================================================================== */

goog.provide("game.models.Game");

/**
	@constructor
	@extends {goog.Disposable}
*/
var Game = function(){
	/** @type {number}*/
	this.takes = 0;
	this.cb = null;
}

//extends that $h!t
goog.inherits(Game, goog.Disposable);

/** @override */
Game.prototype.disposeInternal = function(){
	this.takes = -1;
	this.cb = null;
	goog.base(this, "disposeInternal");
}

/** 
	@param {Function} cb
	establishes the update callback
*/
Game.prototype.setCb = function(cb){
	this.cb = cb;
}

/** 
	@private
	does all updating needed
*/
Game.prototype.update = function(){
	var data = { takes: this.takes };
	this.cb(data);
}

/** 
	Handle a take happening
	@param {number} takes
*/
Game.prototype.setTakeCount = function(takes){
	this.takes = takes;
	this.update();
}

/** 
	Handle play button being pressed ( aka a take started )
*/
Game.prototype.startTake = function(){
	this.takes++;
	this.update();
}
