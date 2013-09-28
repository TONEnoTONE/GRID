/*=============================================================================
 _______  _______  _______  _______  _______  ______    __    _    __    _  _______  _______  _______ 
|       ||   _   ||       ||       ||       ||    _ |  |  |  | |  |  |  | ||       ||       ||       |
|    _  ||  |_|  ||_     _||_     _||    ___||   | ||  |   |_| |  |   |_| ||   _   ||_     _||    ___|
|   |_| ||       |  |   |    |   |  |   |___ |   |_||_ |       |  |       ||  | |  |  |   |  |   |___ 
|    ___||       |  |   |    |   |  |    ___||    __  ||  _    |  |  _    ||  |_|  |  |   |  |    ___|
|   |    |   _   |  |   |    |   |  |   |___ |   |  | || | |   |  | | |   ||       |  |   |  |   |___ 
|___|    |__| |__|  |___|    |___|  |_______||___|  |_||_|  |__|  |_|  |__||_______|  |___|  |_______|

a single beat of a pattern
=============================================================================*/

goog.provide("game.models.PatternNote");

goog.require("goog.dom");
goog.require("goog.Disposable");
goog.require("game.views.PatternNoteView");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {Pattern.Type} type
	@param {number} beat
*/
var PatternNote = function(type, beat){
	goog.base(this);
	/** @type {Pattern.Type} */
	this.type = type;
	/** @type {number} */
	this.beatNumber = beat;
	/** @type {PatternNoteView} */
	this.view = new PatternNoteView(this);
}

goog.inherits(PatternNote, goog.Disposable);

/** @override */
PatternNote.prototype.disposeInternal = function(){
	this.view.dispose();
	this.view = null;
	goog.base(this, "disposeInternal");
}