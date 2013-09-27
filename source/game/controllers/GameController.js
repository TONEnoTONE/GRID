/*=============================================================================
 _______  _______  __   __  _______ 
|       ||   _   ||  |_|  ||       |
|    ___||  |_|  ||       ||    ___|
|   | __ |       ||       ||   |___ 
|   ||  ||       ||       ||    ___|
|   |_| ||   _   || ||_|| ||   |___ 
|_______||__| |__||_|   |_||_______|

=============================================================================*/
goog.provide("game.controllers.GameController");

goog.require("goog.math.Coordinate");
goog.require("data.Const");
goog.require("game.controllers.PieceController");
goog.require("game.controllers.TileController");
goog.require("game.controllers.PatternController");

/** 
	@typedef {Object}
*/
var GameController = {
	/** @type {boolean}*/
	playing : false,
	/** initializer */
	initialize : function(){
		GameController.setStage(0, 0);
	},
	/** 
		@param {number} stage
		@param {number=} level
	*/
	setStage : function(stage, level){
		//reset the Pieces
		PieceController.reset();
		level = level||0;
		//setup the map
		TileController.setStage(stage, level);
		PieceController.setStage(stage, level);
	},
	/** 
		computes the path of all the pieces
	*/
	computePaths : function(){
		PieceController.forEach(function(piece){
			GameController.computePiecePath(piece);
		});
	},
	/** 
		computes the pieces path
		@param {Piece} piece
	*/
	computePiecePath : function(piece){
		//the first step
		var currentStep = new TrajectoryStep(piece.position, piece.direction);
		piece.clearPath();
		//construct the piece's path
		while(!piece.trajectory.isLoop()){
			//add it to the path
			piece.trajectory.addStep(currentStep);
			//get the next step
			var currentTile = TileController.tileAt(currentStep.position);
			//move forward one step
			currentStep = currentTile.nextStep(currentStep.direction);
		}
	},
	/*=========================================================================
		MOUSE STUFFS
	=========================================================================*/
	/** 
		@param {!goog.math.Coordinate} position
		mouse down on a tile will:
		a) add a new piece if a selection has been chosen
		b) "select" a piece if there is one at that position
	*/
	mouseDownOnTile : function(position){
		//if there is an available piece
		if (TileController.isActiveTile(position)){
			PieceController.selectPosition(position);
		} else {
			PieceController.clearSelected();
		}
	},
	/** 
		@param {!goog.math.Coordinate} position
		mouse up on a tile will remove the piece if it's not new
	*/
	mouseUpOnTile : function(position){
		PieceController.mouseUp(position);
	},
	/** 
		@param {!goog.math.Coordinate} position
		mouse move will rotate the "selected" piece
	*/
	mouseMoveOnTile : function(position){
		PieceController.rotatePiece(position);
	},
	mouseEnd : function(){
		// PieceController.clearSelected();
	},
	/*=========================================================================
		PLAY / PAUSE / STOP
	=========================================================================*/
	/** 
		compute the paths
		generate the path css
		start the animiation
	*/
	play : function(){
		if (!GameController.playing){
			GameController.playing = true;
			GameController.computePaths();
			PieceController.play();
		}
	},
	stop : function(){
		if (GameController.playing){
			GameController.playing = false;
			PieceController.stop();
		}
	}
};

GameController.initialize();
