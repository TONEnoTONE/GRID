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

/** 
	@constructor
	@extends {goog.Disposable}
	@param {goog.math.Coordinate} position
*/
var Wall = function(position){
	goog.base(this);
	this.position = position;
	//make the view
	// this.view = new WallView(this);
}

goog.inherits(Wall, goog.Disposable);

/** @override */
Wall.prototype.disposeInternal = function(){
	// this.view.dispose();
	this.view = null;
	this.position = null;
	goog.base(this, "disposeInternal");
}

Wall.prototype.hit = function(time){

}

/** 
	@returns {boolean} true if the wall is a vertical one
*/
Wall.prototype.isVertical = function(){
	return this.position.y % 2 === 0;
}
/** 
	@returns {boolean} true if the wall is a horizontal orientation
*/
Wall.prototype.isHorizontal = function(){
	return this.position.x % 2 === 0;
}