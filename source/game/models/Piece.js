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
goog.require("data.PieceType");
goog.require("goog.Disposable");
goog.require("goog.math.Coordinate");
goog.require("game.models.Trajectory");
goog.require("game.views.PieceView");

/** 
	@extends {goog.Disposable}
	@constructor
	@param {PieceType | null} type
*/
var Piece = function(type){
	goog.base(this);
	/** @type {PieceType}*/
	this.type = type||PieceType.Red;
	/** @type {Direction} */
	this.direction = Direction.West;
	/** @type {!goog.math.Coordinate} */
	this.position = new goog.math.Coordinate(-1, -1);
	/** @type {Trajectory} */
	this.trajectory = new Trajectory();
	/** @private
		@type {boolean} */
	this.needsUpdate = false;
	/** @type {PieceView} */
	this.view = new PieceView(this);
}

//extend dispoable
goog.inherits(Piece, goog.Disposable);

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

/*=============================================================================
	GETTER/SETTER
=============================================================================*/

/** 
	@param {!Direction} direction
*/
Piece.prototype.setDirection = function(direction){
	if (this.direction !== direction){
		this.direction = direction;
		//update the view
		this.view.render();
		this.needsUpdate = true;
	}
}



/** 
	@param {!goog.math.Coordinate} position
*/
Piece.prototype.setPosition = function(position){
	if (!goog.math.Coordinate.equals(position, this.position)){
		this.position = position;
		//update the view
		this.view.render();
		this.needsUpdate = true;
	}
}

/*=============================================================================
	COMPUTE
=============================================================================*/

/** 
	clears the current trajectory
*/
Piece.prototype.clearPath = function(){
	this.trajectory.clear();
}


/** 
	@returns {Array.<number>} the steps there was a hit on
*/
Piece.prototype.getHits = function(){
	return this.trajectory.getHits();
}

/** 
	update trajectory if necessary
	@returns {boolean} if the trajectory was updated
*/
Piece.prototype.updateTrajectory = function(){
	if (this.needsUpdate){
		this.needsUpdate = false;
		//update the trajectory
		this.clearPath();
		PieceController.computePath(this);
		//generate the animation
		this.trajectory.makeAnimation();
		return true;
	}
	return false;
}

/*=============================================================================
	PLAY PAUSE STOP
=============================================================================*/

/** 
	plays the animation
*/
Piece.prototype.play = function(){
	//add that animation name to the view
	this.view.setAnimation(this.trajectory.getAnimationName());
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
