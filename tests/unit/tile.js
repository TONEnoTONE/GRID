/*
	Test an individual tile
*/
define(["chai", "game/models/Tile"], function(chai, Tile) {
	var expect = chai.expect;

	var tile = new Tile({x : 1, y : 0});

	var test = function(){
		describe("Individual Tile", function() {
			it('should have the input coordinate', function() {
				expect(tile.position).to.be.an("object");
				expect(tile.position.x).to.be.a("number");
				expect(tile.position.y).to.equal(0);
			});
		});
	}
  
  	return test;
});
