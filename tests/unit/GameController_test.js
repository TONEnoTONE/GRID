goog.require('game.controllers.GameController');
goog.require('game.controllers.StageController');
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');


function testSetTrajectory(){
	StageController.useTestStages(true);
	GameController.setStage(0, 0);
	//place a piece down
	PieceSelection.selected = Piece.Type.Red;
	var piece = PieceController.addPiece(new goog.math.Coordinate(3, 3));
	piece.setDirection(Direction.West);
	PieceController.updateTrajectories();
	chai.expect(piece.trajectory.stepAt(0).direction).to.equal(Direction.West);
	chai.expect(piece.trajectory.stepAt(1).direction).to.equal(Direction.West);
	chai.expect(piece.trajectory.stepAt(2).direction).to.equal(Direction.East);
}

function testPieceCollision(){
	StageController.useTestStages(true);
	GameController.setStage(0, 0);
	//place a piece down
	PieceSelection.selected = Piece.Type.Red;
	PieceController.addPiece(new goog.math.Coordinate(3, 3));
	PieceSelection.selected = Piece.Type.Red;
	var piece1 = PieceController.addPiece(new goog.math.Coordinate(4, 4));
	piece1.setDirection(Direction.South);
	PieceController.updateTrajectories();
	chai.expect(PieceController.collisionAtStep(0)).to.be.false;
	chai.expect(PieceController.collisionAtStep(1)).to.be.false;
	chai.expect(PieceController.collisionAtStep(2)).to.be.false;
	chai.expect(PieceController.collisionAtStep(3)).to.be.false;
	chai.expect(PieceController.collisionAtStep(4)).to.be.true;
}

function testAllCollision(){
	StageController.useTestStages(true);
	GameController.setStage(0, 0);
	//place a piece down
	PieceSelection.selected = Piece.Type.Red;
	PieceController.addPiece(new goog.math.Coordinate(3, 3));
	PieceSelection.selected = Piece.Type.Red;
	var piece1 = PieceController.addPiece(new goog.math.Coordinate(3, 5));
	piece1.setDirection(Direction.South);
	PieceController.updateTrajectories();
	PieceController.computeCollisions();
	chai.expect(PieceController.getFirstCollision()).to.equal(3);
}

function testNonCollision(){
	StageController.useTestStages(true);
	GameController.setStage(0, 0);
	//place a piece down
	//place a piece down
	PieceSelection.selected = Piece.Type.Red;
	PieceController.addPiece(new goog.math.Coordinate(3, 3));
	PieceSelection.selected = Piece.Type.Red;
	var piece1 = PieceController.addPiece(new goog.math.Coordinate(3, 4));
	piece1.setDirection(Direction.South);
	PieceController.updateTrajectories();
	PieceController.computeCollisions();
	chai.expect(PieceController.getFirstCollision()).to.equal(-1);
}