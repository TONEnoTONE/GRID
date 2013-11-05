/*=============================================================================
 _______  _______  ___      ___   _______  __    _    _______  _______  ______    ___     
|       ||       ||   |    |   | |       ||  |  | |  |       ||       ||    _ |  |   |    
|       ||   _   ||   |    |   | |  _____||   |_| |  |       ||_     _||   | ||  |   |    
|       ||  | |  ||   |    |   | | |_____ |       |  |       |  |   |  |   |_||_ |   |    
|      _||  |_|  ||   |___ |   | |_____  ||  _    |  |      _|  |   |  |    __  ||   |___ 
|     |_ |       ||       ||   |  _____| || | |   |  |     |_   |   |  |   |  | ||       |
|_______||_______||_______||___| |_______||_|  |__|  |_______|  |___|  |___|  |_||_______|

=============================================================================*/

goog.provide("game.controllers.CollisionController");

goog.require("game.models.Collision");
goog.require("game.controllers.AudioController");
goog.require("goog.array");

/** 
	@typedef {Object}
*/
var CollisionController = {
	/** @type {Array.<Collision>}*/
	collisions : [],
	initialize : function(){

	},
	/** 
		@param {Array.<Piece>} pieces
		@param {number} step
	*/
	addCollision : function(pieces, step){
		//TODO: figure out if that step/position is not in the array

		//otherwise add the peice
		var coll = new Collision(pieces, step);
		CollisionController.collisions.push(coll);
		//sort the collision
		CollisionController.sort();
	},
	/** 
		sort the collisions by step
	*/
	sort : function(){
		goog.array.sort(CollisionController.collisions, function(a, b){
			return a.getStep() - b.getStep();
		});
	},
	/** 
		reset all the collisions
	*/
	reset : function(){
		for (var i = 0, len = CollisionController.collisions.length; i < len; i++){
			CollisionController.collisions[i].dispose();
		}
		CollisionController.collisions = [];
	},
	/** 
		@returns {boolean} true if there are collision
	*/
	hasCollisions : function(){
		return CollisionController.collisions.length > 0;
	},
	/** 
		@returns {number} the collision number or -1 if there are none
	*/
	getFirstCollisionStep : function(){
		if (CollisionController.collisions.length === 0){
			return -1;
		} else {
			return CollisionController.collisions[0].getStep();
		}
	},
	/** 
		@returns {Array.<Collision>} the first collision
	*/
	getFirstCollisions : function(){
		var ret = [CollisionController.collisions[0]];
		var firstStep = CollisionController.collisions[0].getStep();
		for (var i = 1; i < CollisionController.collisions.length; i++){
			var currentCollision = CollisionController.collisions[i];
			if (currentCollision.getStep() === firstStep){
				ret.push(currentCollision);
			} else {
				break;
			}
		}
		return ret;
	},
	/** 
		visualize first collision
	*/
	play : function(){
		if (CollisionController.hasCollisions()){
			var collisions = CollisionController.getFirstCollisions();
			var countInDuration = AudioController.countInDuration();
			var firstCollStep = CollisionController.getFirstCollisionStep();
			var playbackTime = countInDuration + AudioController.stepsToSeconds(firstCollStep);
			for (var i = 0; i < collisions.length; i++){
				collisions[i].play(playbackTime);
			}
		}
	},
	/** 
		stop the animations on all the element
	*/
	stop : function(){
		for (var i = 0; i < CollisionController.collisions.length; i++){
			CollisionController.collisions[i].stop();
		}
	},
	/** 
		pause the animation
	*/
	pause : function(){
		for (var i = 0; i < CollisionController.collisions.length; i++){
			CollisionController.collisions[i].pause();
		}
	}

}