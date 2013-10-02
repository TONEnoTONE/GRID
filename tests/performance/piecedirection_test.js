goog.require('game.controllers.GameController');
goog.require('game.controllers.StageController');
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');


function testRotatePiece(){
	StageController.useTestStages(true);
	GameController.setStage(0, 0);
	//place a piece down
	PieceSelection.selected = PieceType.Red;
	var piece = PieceController.addPiece(new goog.math.Coordinate(3, 3));
	for (var i = 0; i < 15; i++){
		fourRotations(piece);
	}
}

function fourRotations(piece){
	piece.setDirection(Direction.South);
	piece.setDirection(Direction.West);
	piece.setDirection(Direction.North);
	piece.setDirection(Direction.East);
}

function testAddRemovePiece(){
	StageController.useTestStages(true);
	GameController.setStage(0, 0);
	//place a piece down
	PieceSelection.selected = PieceType.Red;
	for (var i = 0; i < 200; i++){
		var piece = PieceController.addPiece(new goog.math.Coordinate(3, 3));
		PieceController.removePiece(piece);
	}
}