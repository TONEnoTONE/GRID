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
goog.provide("game.models.PieceVector");

goog.require("data.Direction");
goog.require("goog.events.EventTarget");
goog.require("data.PieceType");
goog.require("data.PatternType");
goog.require("goog.Disposable");
goog.require("goog.math.Coordinate");
goog.require("game.models.Trajectory");
goog.require("game.views.PieceView");
goog.require("game.models.Pattern");

/** 
	@extends {goog.events.EventTarget}
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
	this.trajectory = new Trajectory(this.type);
	/** @type {PieceView} */
	this.view = new PieceView(this);
	/** @type {Pattern} */
	this.pattern = new Pattern();
	/** @type Array.<TrajectoryHit> */
	this.bounces = [];
	/** @type {boolean}*/
	this.playing = false;
}

//extend dispoable
goog.inherits(Piece, goog.events.EventTarget);

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
	if (this.direction !== direction && !this.playing){
		this.direction = direction;
		// this.generateAnimation();
		this.view.updateDirection(direction);
	}
}

/** 
	@param {!goog.math.Coordinate} position
*/
Piece.prototype.setPosition = function(position){
	if (!goog.math.Coordinate.equals(position, this.position) && !this.playing){
		this.position = position;
		this.view.updatePosition(position);
		// this.generateAnimation();
	}
}

/** 
	render the animation
*/
Piece.prototype.generateAnimation = function(){
	if (this.onBoard && !this.playing){
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
	// this.trajectory.playAnimation(this.type);
	// this.playing = true;
}

/** 
	pause the animation
*/
Piece.prototype.pause = function(){
	// this.trajectory.stopAnimation();
}

/** 
	stop the animation
*/
Piece.prototype.stop = function(){	
	//stop the animation
	// this.trajectory.stopAnimation();
	this.playing = false;
}

/** 
	@typedef {{
		direction : Direction,
		position : !goog.math.Coordinate
	}}
*/
var PieceVector;

/** 
	@enum {string}
*/
Piece.EventType = {
	SECONDCLICK : goog.events.getUniqueId("second"),
	PICKEDUP : goog.events.getUniqueId("pickedup"),
	CLICKDOWN : goog.events.getUniqueId("clickdown"),
	PUTDOWN : goog.events.getUniqueId("putdown"),
};
