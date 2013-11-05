/*=============================================================================

     ___  _______  __   __    ___      _______  _______  _______ 
    |   ||   _   ||  |_|  |  |   |    |       ||       ||       |
    |   ||  |_|  ||       |  |   |    |   _   ||   _   ||    _  |
    |   ||       ||       |  |   |    |  | |  ||  | |  ||   |_| |
 ___|   ||       ||       |  |   |___ |  |_|  ||  |_|  ||    ___|
|       ||   _   || ||_|| |  |       ||       ||       ||   |    
|_______||__| |__||_|   |_|  |_______||_______||_______||___|    

holds all the components of the loop
=============================================================================*/

goog.provide("Jam.Loop");

goog.require("goog.Disposable");
goog.require("game.controllers.TrajectoryController");
goog.require("game.controllers.AudioController");

/** 
	collected all teh components of a loop
	@constructor
	@extends {goog.Disposable}
*/
Jam.Loop = function(piece){
	goog.base(this);
	/** @type {Piece} */
	this.piece = piece;
	/** @type {number} */
	this.beat = AudioController.getCurrentBeat()%4;
	/** @type {Trajectory} */
	this.trajectory = TrajectoryController.getInstance().makeJamTrajectory(piece.position, piece.direction, piece.type);
	//and the player
	var duration = AudioController.stepsToSeconds(4);
	var hits = this.trajectory.getHits();
	var hit = hits[0];
	var downBeat = AudioController.getNextDownbeat();
	var playTime = downBeat + AudioController.stepsToSeconds(hit.beat);
	hit.type = piece.type;
	/** @type {AudioPlayer}*/
	this.player = AudioController.playHit(hit, duration, downBeat);
	//play the loop once it's been made
	this.play(downBeat);
	/** @type {Array.<Element>}*/
	this.walls = TileController.play(hits, duration*2, piece.type, downBeat);
	TileController.flashJamPosition(piece.position, piece.type, downBeat);
}

goog.inherits(Jam.Loop, goog.Disposable);

/** 
	@override
*/
Jam.Loop.prototype.disposeInternal = function(){
	this.stop();
	this.trajectory = null;
	this.player = null;
	this.piece = null;
	goog.base(this, "disposeInternal");
}

Jam.Loop.prototype.changeSection = function(){
	//stop and restart all the audio when the section changes
	var duration = AudioController.stepsToSeconds(4);
	var hits = this.trajectory.getHits();
	var hit = hits[0];
	var downBeat = AudioController.getNextDownbeat();
	var playTime = downBeat + AudioController.stepsToSeconds(hit.beat);
	this.player.stop(playTime - .1);
	hit.type = this.piece.type;
	this.player = AudioController.playHit(hit, duration, downBeat);
}

/** 
	a timeout loop for starting the next 
*/

/** 
	stop everything
*/
Jam.Loop.prototype.stop = function(){
	//stop and restart all the audio when the section changes
	this.trajectory.stopAnimation();
	this.player.stop(0);
	for (var i = 0; i < this.walls.length; i++){
		goog.dom.removeNode(this.walls[i]);
	}
}

/** 
	plays the loop
*/
Jam.Loop.prototype.play = function(delay){
	this.trajectory.playAnimation(delay);
	// TileController.play(hits, AudioController.stepsToSeconds(8), traj.type);
}