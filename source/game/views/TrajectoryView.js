/*=============================================================================
 _______  ______    _______      ___    __   __  ___   _______  _     _ 
|       ||    _ |  |   _   |    |   |  |  | |  ||   | |       || | _ | |
|_     _||   | ||  |  |_|  |    |   |  |  |_|  ||   | |    ___|| || || |
  |   |  |   |_||_ |       |    |   |  |       ||   | |   |___ |       |
  |   |  |    __  ||       | ___|   |  |       ||   | |    ___||       |
  |   |  |   |  | ||   _   ||       |   |     | |   | |   |___ |   _   |
  |___|  |___|  |_||__| |__||_______|    |___|  |___| |_______||__| |__|

=============================================================================*/

goog.provide("game.views.TrajectoryView");

goog.require("goog.Disposable");
goog.require("goog.cssom");

/** 
	@constructor
	@extends {goog.Disposable}
*/
var TrajectoryView = function(model){
	goog.base(this);
	/** @type {Trajectory} */
	this.model = model;

}

goog.inherits(TrajectoryView, goog.Disposable);


/** 
	@param {Array.<Step>} steps
*/
TrajectoryView.prototype.generateCSS = function(steps){
	var cssText = goog.string.buildString(".", this.model.uid, "{ background-color:yellow; }");

}

TrajectoryView.prototype.disposeInternal = function(){
	this.model = null;
	goog.base(this, "disposeInternal");
}