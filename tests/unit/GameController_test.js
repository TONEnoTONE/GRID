goog.require('game.controllers.GameController');
goog.require('game.controllers.StageController');
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');


function testSetTrajectory(){
	StageController.useTestStages(true);
	GameController.setStage(0, 0);
	//place a piece down
	var piece = GameController.addPiece(new goog.math.Coordinate(3, 3));
	chai.expect(piece.trajectory.stepAt(0).direction).to.equal(Direction.West);
	chai.expect(piece.trajectory.stepAt(1).direction).to.equal(Direction.West);
	chai.expect(piece.trajectory.stepAt(2).direction).to.equal(Direction.East);
}