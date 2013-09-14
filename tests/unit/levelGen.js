/*
	Generate a level
*/
define(["chai", "game/controllers/TileController", "const"], function(chai, Tiles) {
	var expect = chai.expect;
	var CONST = require("const");

	var test = function(){
		describe("Tile from Stage", function() {
			it('translates data correctly', function() {
				Tiles.setStage(0,0);
				expect(Tiles.tileAt({x : 0, y : 0}).position.x).to.equal(0);
				expect(Tiles.tileAt({x : 0, y : 0}).active).to.equal(false);
			});
			it('computes walls coorectly', function() {
				Tiles.setStage(0,0);
				expect(Tiles.tileAt({x : 2, y : 2}).walls[CONST.DIRECTION.NORTH]).to.be.true;
				expect(Tiles.tileAt({x : 2, y : 2}).walls[CONST.DIRECTION.WEST]).to.be.true;
				expect(Tiles.tileAt({x : 2, y : 2}).walls[CONST.DIRECTION.EAST]).to.be.false;
				expect(Tiles.tileAt({x : 2, y : 2}).walls[CONST.DIRECTION.SOUTH]).to.be.false;
				//another position
				expect(Tiles.tileAt({x : 5, y : 5}).walls[CONST.DIRECTION.NORTH]).to.be.false;
				expect(Tiles.tileAt({x : 5, y : 5}).walls[CONST.DIRECTION.SOUTH]).to.be.true;
				expect(Tiles.tileAt({x : 5, y : 5}).walls[CONST.DIRECTION.EAST]).to.be.true;
				expect(Tiles.tileAt({x : 5, y : 5}).walls[CONST.DIRECTION.WEST]).to.be.false;
				//another position
				expect(Tiles.tileAt({x : 4, y : 4}).walls[CONST.DIRECTION.NORTH]).to.be.false;
				expect(Tiles.tileAt({x : 4, y : 4}).walls[CONST.DIRECTION.SOUTH]).to.be.false;
				expect(Tiles.tileAt({x : 4, y : 4}).walls[CONST.DIRECTION.EAST]).to.be.false;
				expect(Tiles.tileAt({x : 4, y : 4}).walls[CONST.DIRECTION.WEST]).to.be.false;
			});
		});
	}
  
  	return test;
});
