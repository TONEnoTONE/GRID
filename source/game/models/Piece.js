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
	@param {boolean=} selection
*/
var Piece = function(type, selection){
	goog.base(this);
	/** @type {Piece.Type}*/
	this.type = type||Piece.Type.Red;
	/** @type {Direction} */
	this.direction = Direction.West;
	/** @type {!goog.math.Coordinate} */
	this.position = new goog.math.Coordinate(-1, -1);
	/** @type {Trajectory} */
	this.trajectory = new Trajectory();
	/** @type {boolean} */
	this.selection = selection || false;
	/** 
		indicates if it's on the board or not
		@type {boolean} 
	*/
	this.onboard = false;
	/** 
		the view 
		@type {PieceView}
		@private
	*/
	this.view = new PieceView(this);
}

//extend dispoable
goog.inherits(Piece, goog.Disposable);

/** 
	@param {!Direction} direction
*/
Piece.prototype.setDirection = function(direction){
	if (this.direction !== direction){
		this.direction = direction;
		//update the view
		this.view.render();
	}
}

/** 
	@param {!goog.math.Coordinate} position
*/
Piece.prototype.setPosition = function(position){
	if (!goog.math.Coordinate.equals(position, this.position)){
		this.onboard = true;
		this.position = position;
		//update the view
		this.view.render();
	}
}

/** 
	whether or not the piece is visible on the board
	@param {boolean} bool
*/
Piece.prototype.onBoard = function(bool){
	this.onboard = bool;
	//update the view
	this.view.render();
}

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

/** 
	plays the animation
*/
Piece.prototype.play = function(){
	
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

/** 
	@param {Piece.Type} type
	@returns {CONST.COLOR}
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
}
