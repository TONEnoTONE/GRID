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
		//bind to the tileClicked callback
		TileController.onTileClicked = GameController.tileClicked;
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
	openPosition : function(position){
		//test if that's a valid tile && does not already have a piece there
		if (TileController.tileAt(position).active && PieceController.pieceAt(position) !== null){
			return true;
		} else {
			return false;
		}
	},
	/** 
		@param {!goog.math.Coordinate} position
		@param {Piece.Type} type
		@return {Piece} the piece htat was added
	*/
	addPiece : function(position, type){
		var piece = PieceController.addPiece(position, type);
		//return the piece
		return piece;
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
	},
	/** 
		@param {goog.math.Coordinate} position
	*/
	tileClicked : function(position){
		//if there is an available piece
		if (PieceController.selectedPiece !== null){
			//test that position
			if (GameController.openPosition(position)){
				//place the piece down
				var piece = GameController.addPiece(position, PieceController.selectedPiece);
				piece.selected = true;
			} else {
				//give some kind of error noise?
			}
		} else {
			//select a piece if there is one there
			if (PieceController.pieceAt(position) !== null){
				
			}
		}
	}
};

GameController.initialize();
