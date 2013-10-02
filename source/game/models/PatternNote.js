/*=============================================================================

 _______  _______  ______    __    _    __    _  _______  _______  _______ 
|       ||       ||    _ |  |  |  | |  |  |  | ||       ||       ||       |
|    _  ||_     _||   | ||  |   |_| |  |   |_| ||   _   ||_     _||    ___|
|   |_| |  |   |  |   |_||_ |       |  |       ||  | |  |  |   |  |   |___ 
|    ___|  |   |  |    __  ||  _    |  |  _    ||  |_|  |  |   |  |    ___|
|   |      |   |  |   |  | || | |   |  | | |   ||       |  |   |  |   |___ 
|___|      |___|  |___|  |_||_|  |__|  |_|  |__||_______|  |___|  |_______|

=============================================================================*/

goog.provide("game.models.PatternNote");

goog.require("game.views.PatternNoteView");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {PieceType} type
*/
var PatternNote = function(type, beat){
	/** @type {PieceType} */
	this.type = type;
	/** @type {number} */
	this.beat = beat;
	/** @type {boolean} */
	this.hit = false;
}

goog.inherits(PatternNote, goog.Disposable);

/** @override */
PatternNote.prototype.disposeInternal = function(){
	goog.base(this, "disposeInternal");
}

PatternNote.prototype.hit = function(){
	this.hit = true;
}