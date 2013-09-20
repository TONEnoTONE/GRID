goog.require('game.controllers.StageController');
goog.require('data.Direction');
goog.require('game.controllers.TileController');
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');


function testBuildStage(){
	StageController.useTestStages(true);
	//set the stage
	TileController.setStage(0, 0);
	chai.expect(TileController.tileAt(new goog.math.Coordinate(0, 0)).active).to.be.false;
	chai.expect(TileController.tileAt(new goog.math.Coordinate(2, 2)).active).to.be.true;
	chai.expect(TileController.tileAt(new goog.math.Coordinate(7, 7)).active).to.be.false;
	chai.expect(TileController.tileAt(new goog.math.Coordinate(2, 3)).active).to.be.true;
}

function testHasWalls(){
	StageController.useTestStages(true);
	//set the stage
	TileController.setStage(0, 0);
	var coord0 = new goog.math.Coordinate(2, 2);
	var coord1 = new goog.math.Coordinate(5, 5);
	chai.expect(TileController.tileAt(coord0).hasWall(Direction.West)).to.be.true;
	chai.expect(TileController.tileAt(coord0).hasWall(Direction.North)).to.be.true;
	chai.expect(TileController.tileAt(coord0).hasWall(Direction.South)).to.be.false;
	chai.expect(TileController.tileAt(coord0).hasWall(Direction.East)).to.be.false;
	chai.expect(TileController.tileAt(coord1).hasWall(Direction.West)).to.be.false;
	chai.expect(TileController.tileAt(coord1).hasWall(Direction.North)).to.be.false;
	chai.expect(TileController.tileAt(coord1).hasWall(Direction.South)).to.be.true;
	chai.expect(TileController.tileAt(coord1).hasWall(Direction.East)).to.be.true;
}