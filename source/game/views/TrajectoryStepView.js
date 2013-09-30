/*=============================================================================
 _______  _______  _______  _______    __   __  ___   _______  _     _ 
|       ||       ||       ||       |  |  | |  ||   | |       || | _ | |
|  _____||_     _||    ___||    _  |  |  |_|  ||   | |    ___|| || || |
| |_____   |   |  |   |___ |   |_| |  |       ||   | |   |___ |       |
|_____  |  |   |  |    ___||    ___|  |       ||   | |    ___||       |
 _____| |  |   |  |   |___ |   |       |     | |   | |   |___ |   _   |
|_______|  |___|  |_______||___|        |___|  |___| |_______||__| |__|

=============================================================================*/

goog.provide("game.views.TrajectoryStepView");

goog.require("goog.Disposable");
goog.require("game.views.BoardView");
goog.require("goog.string");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {TrajectoryStep} model
*/
var TrajectoryStepView = function(model){
	this.model = model;
	goog.base(this);
}

goog.inherits(TrajectoryStepView, goog.Disposable);

/** 
	@param {string=} vendor prefix
	@return {string} a keyframe representing this step
*/
TrajectoryStepView.prototype.getKeyFrame = function(vendor){
	vendor = vendor || "";
	var model = this.model;
	var translated = BoardView.positionToPixel(model.position);
	var translateString = goog.string.buildString("translate3d( ",translated.x,"px , ",translated.y,"px, 0) ");
	var angle = Direction.toAngle(model.direction)
	var rotateString = goog.string.buildString("rotate( ",angle,"deg) ");
	var transformString = goog.string.buildString(vendor, "transform : ", translateString, rotateString, "; ");
	return transformString;
}

/** 
	@override
*/
TrajectoryStepView.prototype.disposeInternal = function(){
	this.model = null;
	goog.base(this, "disposeInternal");
}