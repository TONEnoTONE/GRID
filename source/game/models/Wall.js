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
	@param {Piece} piece
	@param {number} beatNumber
	@param {number} cycleTime
	@param {number} delay
*/
Wall.prototype.hit = function(piece, beatNumber, cycleTime, delay){
	this.view.hit(piece, beatNumber, cycleTime, delay);
}

/** 
	stop the animation
*/
Wall.prototype.stop = function(){
	this.view.stop();
}

/** 
	fade the wall in
*/
Wall.prototype.fadeIn = function(){
	// this.view = new WallView(this);
	if (this.view){
		this.view.fadeIn();
	}
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
	@enum {string}
*/
Wall.Orientation = {
	Horizontal : "horizontal",
	Vertical : "vertical",
}