/*=============================================================================
 _______  _______  _______  _______    __   __  ___   _______  _     _ 
|       ||       ||       ||       |  |  | |  ||   | |       || | _ | |
|  _____||_     _||    ___||    _  |  |  |_|  ||   | |    ___|| || || |
| |_____   |   |  |   |___ |   |_| |  |       ||   | |   |___ |       |
|_____  |  |   |  |    ___||    ___|  |       ||   | |    ___||       |
 _____| |  |   |  |   |___ |   |       |     | |   | |   |___ |   _   |
|_______|  |___|  |_______||___|        |___|  |___| |_______||__| |__|

=============================================================================*/

goog.provide("game.views.StepView");

goog.require("goog.Disposable");
goog.require("game.views.BoardView");
goog.require("goog.string");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {Step} model
*/
var StepView = function(model){
	this.model = model;
	goog.base(this);
}

goog.inherits(StepView, goog.Disposable);

/** 
	@param {string=} vendor prefix
	@returns {string} a keyframe representing this step
*/
StepView.prototype.getKeyFrame = function(vendor){
	vendor = vendor || "";
	var model = this.model;
	var translated = BoardView.positionToPixel(model.position);
	var translateString = goog.string.buildString("translate( ",translated.x,"px , ",translated.y,"px) ");
	var angle = Direction.toAngle(model.direction)
	var rotateString = goog.string.buildString("rotate( ",angle,"deg) ");
	var transformString = goog.string.buildString(vendor, "transform : ", translateString, rotateString, "; ");
	return transformString;
}

/** 
	@override
*/
StepView.prototype.disposeInternal = function(){
	this.model = null;
	goog.base(this, "disposeInternal");
}