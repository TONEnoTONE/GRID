/*=============================================================================
 _______  ___   _______  _______  _______ 
|       ||   | |       ||       ||       |
|    _  ||   | |    ___||       ||    ___|
|   |_| ||   | |   |___ |       ||   |___ 
|    ___||   | |    ___||      _||    ___|
|   |    |   | |   |___ |     |_ |   |___ 
|___|    |___| |_______||_______||_______|

=============================================================================*/

goog.provide("game.models.Piece");

goog.require("data.Direction");
goog.require("goog.Disposable");
goog.require("goog.math.Coordinate");
goog.require("game.models.Trajectory");
goog.require("game.views.PieceView");

/** 
	@extends {goog.Disposable}
	@constructor
	@param {Piece.Type | null} type
*/
var Piece = function(type){
	goog.base(this);
	/** @type {Piece.Type}*/
	this.type = type||Piece.Type.Red;
	/** @type {Direction} */
	this.direction = Direction.West;
	/** @type {!goog.math.Coordinate} */
	this.position = new goog.math.Coordinate(-1, -1);
	/** @type {Trajectory} */
	this.trajectory = new Trajectory();
	/** 
		the view 
		@type {PieceView}
	*/
	this.view = new PieceView(this);
}

//extend dispoable
goog.inherits(Piece, goog.Disposable);

/** 
	@param {!Direction} direction
*/
Piece.prototype.setDirection = function(direction){
	if (this.direction !== direction){
		this.direction = direction;
		//update the view
		this.view.render();
	}
}

/** 
	clears the current trajectory
*/
Piece.prototype.clearPath = function(){
	this.trajectory.dispose();
	this.trajectory = new Trajectory();
}


/** 
	@param {!goog.math.Coordinate} position
*/
Piece.prototype.setPosition = function(position){
	if (!goog.math.Coordinate.equals(position, this.position)){
		this.position = position;
		//update the view
		this.view.render();
	}
}

/** 
	tear down all the parameters before the piece is destroyed
*/
Piece.prototype.disposeInternal = function(){
	this.trajectory.dispose();
	this.trajectory = null;
	this.view.dispose();
	this.view = null;
	goog.base(this, 'disposeInternal');
}

/** 
	plays the animation
*/
Piece.prototype.play = function(){
	//generate the animation
	var animationName = this.trajectory.makeAnimation();
	//add that animation name to the view
	this.view.setAnimation(animationName);
}

/** 
	pause the animation
*/
Piece.prototype.pause = function(){
	this.view.pauseAnimation();
}

/** 
	stop the animation
*/
Piece.prototype.stop = function(){	
	//stop the animation
	this.view.stopAnimation();
}


/** 
	piece types
	@enum {string}
*/
Piece.Type = {
	Red : 'red',
	Green : 'green',
	Blue : 'blue',
	Purple : 'purple',
	Yellow : 'yellow'
};

/** 
	@param {Piece.Type} type
	@return {CONST.COLOR}
*/
Piece.TypeToColor = function(type){
	switch(type){
		case Piece.Type.Red:
			return CONST.COLOR.RED;
		case Piece.Type.Green:
			return CONST.COLOR.GREEN;
		case Piece.Type.Blue:
			return CONST.COLOR.BLUE;
		case Piece.Type.Yellow:
			return CONST.COLOR.YELLOW;
		case Piece.Type.Purple:
			return CONST.COLOR.PURPLE;
	}
	//otherwise just return red
	return CONST.COLOR.RED;
}
