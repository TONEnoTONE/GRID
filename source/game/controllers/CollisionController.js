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
	getFirstCollision : function(){
		if (CollisionController.collisions.length === 0){
			return -1;
		} else {
			return CollisionController.collisions[0].step;
		}
	}
}