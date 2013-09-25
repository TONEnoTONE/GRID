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

/** 
	@typedef {Object}
*/
var GameController = {
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
		@param {!goog.math.Coordinate} position
		@return {boolean} if the piece is valid and available
	*/
	availablePosition : function(position){
		//test if that's a valid tile && does not already have a piece there
		var tile = TileController.tileAt(position);
		if (tile && tile.active && PieceController.pieceAt(position) === null){
			return true;
		} else {
			return false;
		}
	},
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
		if (piece.onboard){
			//the first step
			var currentStep = new Step(piece.position, piece.direction);
			//construct the piece's path
			while(!piece.trajectory.isLoop()){
				//add it to the path
				piece.trajectory.addStep(currentStep);
				//get the next step
				var currentTile = TileController.tileAt(currentStep.position);
				//move forward one step
				currentStep = currentTile.nextStep(currentStep.direction);
			}
		}
	},
	/** 
		@param {!goog.math.Coordinate} position
		mouse down on a tile will:
		a) add a new piece if a selection has been chosen
		b) "select" a piece if there is one at that position
	*/
	mouseDownOnTile : function(position){
		//if there is an available piece
		if (PieceSelection.getSelected() !== null){
			//test that position
			if (GameController.availablePosition(position)){
				//make a new piece of that type
				if (PieceSelection.getSelected() !== null){	
					var piece = new Piece(PieceSelection.getSelected());
					//place the piece down
					piece.setPosition(position);
					//add it to the array
					PieceController.addPiece(piece);
					//clear the selection
					PieceSelection.clearSelected();
				}
			} else {
				PieceSelection.clearSelected();
			}
		}
	},
	/** 
		@param {!goog.math.Coordinate} position
		mouse up on a tile with either:
		a) 
		b) move a piece if there is a piece currently selected
	*/
	mouseUpOnTile : function(position){

	},
	/** 
		compute the paths
		generate the path css
		start the animiation
	*/
	play : function(){
		GameController.computePaths();
		PieceController.play();
	}
};

GameController.initialize();
