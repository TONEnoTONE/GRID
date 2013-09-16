goog.require('data.Const');
goog.require('game.controllers.StageController');
goog.require('game.controllers.TileController');
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');


function testBuildStage(){
	game.controllers.StageController.useTestStages(true);
	//set the stage
	var TileController = game.controllers.TileController;
	TileController.setStage(0, 0);
	chai.expect(TileController.tileAt({x : 0, y : 0}).active).to.be.false;
	chai.expect(TileController.tileAt({x : 2, y : 2}).active).to.be.true;
	chai.expect(TileController.tileAt({x : 7, y : 7}).active).to.be.false;
	chai.expect(TileController.tileAt({x : 2, y : 3}).active).to.be.true;
	//chai.expect(TileController.tileAt({x : 0, y : 0}));
	//chai.expect(game.controllers.StageController.tileAt({x : 0, y : 0}, 0, 0).walls).to.equal
}

function testHasWalls(){
	game.controllers.StageController.useTestStages(true);
	//set the stage
	var TileController = game.controllers.TileController;
	TileController.setStage(0, 0);
	chai.expect(TileController.tileAt({x : 2, y : 2}).hasWall(CONST.DIRECTION.WEST)).to.be.true;
	chai.expect(TileController.tileAt({x : 2, y : 2}).hasWall(CONST.DIRECTION.NORTH)).to.be.true;
	chai.expect(TileController.tileAt({x : 2, y : 2}).hasWall(CONST.DIRECTION.SOUTH)).to.be.false;
	chai.expect(TileController.tileAt({x : 2, y : 2}).hasWall(CONST.DIRECTION.EAST)).to.be.false;
	chai.expect(TileController.tileAt({x : 5, y : 5}).hasWall(CONST.DIRECTION.WEST)).to.be.false;
	chai.expect(TileController.tileAt({x : 5, y : 5}).hasWall(CONST.DIRECTION.NORTH)).to.be.false;
	chai.expect(TileController.tileAt({x : 5, y : 5}).hasWall(CONST.DIRECTION.SOUTH)).to.be.true;
	chai.expect(TileController.tileAt({x : 5, y : 5}).hasWall(CONST.DIRECTION.EAST)).to.be.true;
}