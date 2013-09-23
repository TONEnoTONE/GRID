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
goog.require("goog.math.Coordinate");
goog.require("game.models.Trajectory");
goog.require("game.views.PieceView");

/** 
	@constructor
	@param {Piece.Type} type
*/
var Piece = function(type){
	/** @type {Piece.Type}*/
	this.type = type;
	/** @type {Direction} */
	this.direction = Direction.West;
	/** @type {!goog.math.Coordinate} */
	this.position = new goog.math.Coordinate(0, 0);
	/** @type {Trajectory} */
	this.trajectory = new Trajectory();
	/** 
		the view 
		@type {PieceView}
	*/
	this.view = new PieceView(this);
}

/** 
	@param {!Direction} direction
*/
Piece.prototype.setDirection = function(direction){
	this.direction = direction;
	//update the view
	this.view.render();
}

/** 
	@param {!goog.math.Coordinate} position
*/
Piece.prototype.setPosition = function(position){
	this.position = position;
	//update the view
	this.view.render();
}

/** 
	tear down all the parameters before the piece is destroyed
*/
Piece.prototype.destroy = function(){
	this.trajectory = null;
	this.view.destroy();
	this.view = null;
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
