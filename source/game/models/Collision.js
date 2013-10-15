/*=============================================================================
 _______  _______  ___      ___      ___   _______  ___   _______  __    _ 
|       ||       ||   |    |   |    |   | |       ||   | |       ||  |  | |
|       ||   _   ||   |    |   |    |   | |  _____||   | |   _   ||   |_| |
|       ||  | |  ||   |    |   |    |   | | |_____ |   | |  | |  ||       |
|      _||  |_|  ||   |___ |   |___ |   | |_____  ||   | |  |_|  ||  _    |
|     |_ |       ||       ||       ||   |  _____| ||   | |       || | |   |
|_______||_______||_______||_______||___| |_______||___| |_______||_|  |__|

a collision points to the two colliding pieces, their crash position, and the crash step
=============================================================================*/

goog.provide("game.models.Collision");

goog.require("goog.array");
goog.require("goog.math.Coordinate");
goog.require("game.views.CollisionView");

/** 
	@constructor
	@param {Array.<Piece>} pieces
	@param {number} step
	@extends {goog.Disposable}
*/
var Collision = function(pieces, step){
	goog.base(this);
	/** @type {Array.<Piece>} */
	this.pieces = pieces;
	/** @type {number} */
	this.step = step;
	/** @type {CollisionView} */
	this.view = new CollisionView(this);
}

goog.inherits(Collision, goog.Disposable);

/** @override */
Collision.prototype.disposeInternal = function(){
	//remove references to the pieces
	for (var i = 0; i < this.pieces.length; i++){
		this.pieces[i] = null;
	}
	this.pieces = null;
	this.view.dispose()
	this.view = null;
	goog.base(this, "disposeInternal");
}

/** 
	adds the pieces to the array if they're not already in there
	@param {Array.<Piece>} pieces
*/
Collision.prototype.addPieces = function(pieces){
	for (var i = 0; i < pieces.length; i++){
		var piece = pieces[i];
		if (!goog.array.contains(this.pieces, piece)){
			this.pieces.push(piece)
		}
	}
}

/** 
	@returns {number} the step the collision happens on
*/
Collision.prototype.getStep = function(){
	if (this.betweenSteps()){
		return this.step + .5;
	} else {
		return this.step;
	}
}

/** 
	@returns {goog.math.Coordinate} the coordinate the collision happens on
*/
Collision.prototype.getPosition = function(){
	//take the average of all the piece's positions at that time
	var averagePos = this.pieces[0].trajectory.stepAt(this.step).position.clone();
	for (var i = 1; i < this.pieces.length; i++){
		averagePos = goog.math.Coordinate.sum(averagePos, this.pieces[i].trajectory.stepAt(this.step).position);
	}
	averagePos.scale(1 / this.pieces.length);
	return averagePos;
}

/** 
	@private
	@returns {boolean} if the collision occured between steps
*/
Collision.prototype.betweenSteps = function(){
	var pos = this.getPosition();
	return !(this.isInteger(pos.x) && this.isInteger(pos.y));
}

/** 
	@private
	@param {number} num
	@returns {boolean}
*/
Collision.prototype.isInteger = function(num){
	return num % 1 === 0;
}

/** 
	play the collision animation at the right time
	@param {number} playbackTime
*/
Collision.prototype.play = function(playbackTime){
	this.view.play(playbackTime);
}

/** 
	stop the animation
*/
Collision.prototype.stop  = function(){
	this.view.stop();
}

/** 
	stop the animation
*/
Collision.prototype.pause  = function(){
	this.view.pause();
}

