/*=============================================================================

 _     _  _______  ___      ___     
| | _ | ||   _   ||   |    |   |    
| || || ||  |_|  ||   |    |   |    
|       ||       ||   |    |   |    
|       ||       ||   |___ |   |___ 
|   _   ||   _   ||       ||       |
|__| |__||__| |__||_______||_______|

=============================================================================*/

goog.provide("game.models.Wall");

goog.require("goog.Disposable");
goog.require("game.views.WallView");

/** 
	@constructor
	@extends {goog.Disposable}
	@param {goog.math.Coordinate} position
*/
var Wall = function(position){
	goog.base(this);
	this.position = position;
	//make the view
	this.view = new WallView(this);
}

goog.inherits(Wall, goog.Disposable);

/** @override */
Wall.prototype.disposeInternal = function(){
	this.view.dispose();
	this.view = null;
	this.position = null;
	goog.base(this, "disposeInternal");
}

/** 
	trigger the hit animation
	@param {number} cycleDuration
	@param {number} delay
	@param {PieceType} color
*/
Wall.prototype.hit = function(cycleDuration, delay, color){
	this.view.hit(cycleDuration, delay, color);
}

/** 
	stop the animation
*/
Wall.prototype.stop = function(){
	this.view.stop();
}

/** 
	@returns {Wall.Orientation} the orientation of the wall
*/
Wall.prototype.getOrientation = function(){
	if (this.position.x % 2 === 0){
		return Wall.Orientation.Vertical;
	} else {
		return Wall.Orientation.Horizontal;
	}
}

/** 
	flash the wall at a time
	@param {number} time
	@param {PieceType} color
*/
Wall.prototype.flash = function(time, color){
	this.view.flash(time, color);
}

/** 
	stop flashing
*/
Wall.prototype.stopFlashing = function(){
	this.view.stopFlashing();
}

/** 
	@enum {string}
*/
Wall.Orientation = {
	Horizontal : "horizontal",
	Vertical : "vertical",
}