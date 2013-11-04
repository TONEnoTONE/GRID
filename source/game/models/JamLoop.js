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
	var playTime = AudioController.getNextBeat(1);
	/** @type {AudioPlayer}*/
	this.player = AudioController.playHit({beat : 0, type : piece.type}, duration, playTime);
	//play the loop once it's been made
	this.play(playTime);
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
	var type = this.piece.type;
	var duration = AudioController.stepsToSeconds(4);
	var currentBeat = (AudioController.getCurrentBeat() % 4);
	var nextDownBeat = 4 - currentBeat;
	var beatDiff = (nextDownBeat + this.beat)%4;
	var playTime = AudioController.getNextBeat(beatDiff + 1);
	this.player.stop(playTime - .1);
	this.player = AudioController.playHit({beat : 0, type : type}, duration, playTime);
}

/** 
	stop everything
*/
Jam.Loop.prototype.stop = function(){
	//stop and restart all the audio when the section changes
	this.trajectory.stopAnimation();
	this.player.stop(0);
}

/** 
	plays the loop
*/
Jam.Loop.prototype.play = function(delay){
	this.trajectory.playAnimation(delay);
}