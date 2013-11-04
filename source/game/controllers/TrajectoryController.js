/*=============================================================================

 _______  ______    _______      ___    _______  _______  ______    ___     
|       ||    _ |  |   _   |    |   |  |       ||       ||    _ |  |   |    
|_     _||   | ||  |  |_|  |    |   |  |       ||_     _||   | ||  |   |    
  |   |  |   |_||_ |       |    |   |  |       |  |   |  |   |_||_ |   |    
  |   |  |    __  ||       | ___|   |  |      _|  |   |  |    __  ||   |___ 
  |   |  |   |  | ||   _   ||       |  |     |_   |   |  |   |  | ||       |
  |___|  |___|  |_||__| |__||_______|  |_______|  |___|  |___|  |_||_______|


=============================================================================*/

goog.provide("game.controllers.TrajectoryController");

goog.require("game.models.Trajectory");
goog.require("game.controllers.TileController");
goog.require("data.Direction");
goog.require("goog.math.Coordinate");

/** 
	@constructor
	@extends {goog.events.EventTarget}
*/
var TrajectoryController = function(){
	goog.base(this);
	/** @type {Array.<Trajectory>} */
	this.trajectories = [];
	/** @type {Array.<TrajectoryView>} */
	this.views = [];
}

goog.inherits(TrajectoryController, goog.events.EventTarget);

/** @override */
TrajectoryController.prototype.disposeInternal = function(){
	goog.base(this, "disposeInternal");
}

/** 
	play all the instructions until the index
	@param {number} index
*/
TrajectoryController.prototype.playInstruction = function(index){
	for (var i = 0; i < index; i++){
		var traj = this.trajectories[i];
		traj.playAnimation();
		var hits = traj.getHits();
		TileController.play(hits, AudioController.stepsToSeconds(8), traj.type);	
	}
}

/** 
	@param {function(Trajectory)} callback
*/
TrajectoryController.prototype.forEach = function(callback){
	for (var i = 0, len = this.trajectories.length; i < len; i++){
		callback(this.trajectories[i]);
	}
}

/** 
	make a trajectory from an instruction
	@param {Instruction.Model} instruction
	@return {Trajectory} 
*/
TrajectoryController.prototype.makeInstruction = function(instruction){
	var trajectory = new Trajectory(instruction.type);
	//compute all the steps of the traj:
	//the first step
	var currentStep = new TrajectoryStep(instruction.position, instruction.direction);
	//construct the trajectory's path
	while(!trajectory.isLoop()){
		//add it to the path
		trajectory.addStep(currentStep);
		//get the next step
		var currentTile = TileController.tileAt(currentStep.position);
		//move forward one step
		currentStep = currentTile.nextStep(currentStep.direction);
	}
	trajectory.makeView();
	this.trajectories.push(trajectory);
	return trajectory;
}

/** 
	make a circular trajectory from a position an direction
	@param {!goog.math.Coordinate} position
	@param {!Direction} direction
	@param {PieceType} type
	@return {Trajectory} 
*/
TrajectoryController.prototype.makeJamTrajectory = function(position, direction, type){
	var trajectory = new Trajectory(type);
	//compute all the steps of the traj:
	//the first step
	var currentStep = new TrajectoryStep(position, direction);
	//construct the trajectory's path
	while(!trajectory.isLoop()){
		//add it to the path
		trajectory.addStep(currentStep);
		//get the next step
		var currentTile = TileController.tileAt(currentStep.position);
		//if it's a wall in that direction, loop around to the other side
		//move forward one step
		currentStep = currentTile.nextLoopStep(currentStep.direction);
	}
	trajectory.makeView();
	this.trajectories.push(trajectory);
	return trajectory;
}

/** 
	clear all of the trajectories
*/
TrajectoryController.prototype.reset = function(){
	for (var i = 0; i < this.trajectories.length; i++){
		this.trajectories[i].dispose();
	}
	this.trajectories = [];
}

/** 
	pause all teh animations
*/
TrajectoryController.prototype.pause = function(){
	for (var i = 0; i < this.trajectories.length; i++){
		this.trajectories[i].pauseAnimation();
	}
}

/** 
	pause all teh animations
*/
TrajectoryController.prototype.stop = function(){
	for (var i = 0; i < this.trajectories.length; i++){
		this.trajectories[i].stopAnimation();
	}
}


goog.addSingletonGetter(TrajectoryController);
TrajectoryController.getInstance();