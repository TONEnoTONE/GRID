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

/*=============================================================================
	STATIC
=============================================================================*/

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
