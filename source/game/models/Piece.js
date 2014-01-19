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
goog.require("data.PatternType");
goog.require("goog.Disposable");
goog.require("goog.math.Coordinate");
goog.require("game.models.Trajectory");
goog.require("game.views.PieceView");
goog.require("game.models.Pattern");

/** 
	@extends {goog.Disposable}
	@constructor
	@param {PieceType | null} type
*/
var Piece = function(type){
	goog.base(this);
	/** @type {PieceType}*/
	this.type = type||PieceType.Red;
	/** @type {boolean} */
	this.onBoard = false;
	/** @type {Direction} */
	this.direction = Direction.West;
	/** @type {!goog.math.Coordinate} */
	this.position = new goog.math.Coordinate(-1, -1);
	/** @type {Trajectory} */
	this.trajectory = new Trajectory();
	/** @type {PieceView} */
	this.view = new PieceView(this);
	/** @type {Pattern} */
	this.pattern = new Pattern();
	/** @type Array.<TrajectoryHit> */
	this.bounces = [];
}

//extend dispoable
goog.inherits(Piece, goog.Disposable);

/** 
	tear down all the parameters before the piece is destroyed
*/
Piece.prototype.disposeInternal = function(){
	this.bounces = null;
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
		this.update();
	}
}

/** 
	@param {!goog.math.Coordinate} position
*/
Piece.prototype.setPosition = function(position){
	if (!goog.math.Coordinate.equals(position, this.position)){
		this.position = position;
		this.update();
	}
}

/** 
	@private
	internal update
*/
Piece.prototype.update = function(){
	if (this.onBoard){
		this.updateTrajectory();
		//update the pattern
		this.pattern.dispose();
		this.pattern = new Pattern(this.trajectory.getLength());
		var hits = this.trajectory.getHits();
		for (var i = 0; i < hits.length; i++){
			var beatNum = hits[i].beat;
			this.pattern.addHit(this.type, beatNum);
		}
		this.bounces = hits;
		//update the view
		this.view.render();
		//let the controller know
		PieceController.updated(this);
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
	update trajectory if necessary
*/
Piece.prototype.updateTrajectory = function(){
	//update the trajectory
	this.trajectory.clear();
	PieceController.computePath(this);
	// this.makeTrajectoryView();
}

/** 
	makes the trajecotry view
*/
Piece.prototype.makeTrajectoryView = function(){
	//generate the animation
	this.trajectory.makeView();
}

/*=============================================================================
	PLAY PAUSE STOP
=============================================================================*/

/** 
	plays the animation
*/
Piece.prototype.play = function(){
	//apply the animation to the piece's element
	this.trajectory.playAnimation(this.view.Canvas);
	this.view.setPlaying(true);
}

/** 
	pause the animation
*/
Piece.prototype.pause = function(){
	this.trajectory.pauseAnimation(this.view.Canvas);
}

/** 
	stop the animation
*/
Piece.prototype.stop = function(){	
	//stop the animation
	this.trajectory.stopAnimation(this.view.Canvas);
	this.view.setPlaying(false);
}

/** 
	stop the animation
*/
Piece.prototype.restart = function(){	
	//pause the animation
	this.pause();
	//animate out the opacity
	//stop the animation to put it back in the original spot
	//animate back in the opacity
	this.view.fadeOutAndIn(goog.bind(this.stop, this));
}

/** 
	fade the piece in
*/
Piece.prototype.fadeIn = function(){
	if (this.view){
		this.view.fadeIn();
	}
}