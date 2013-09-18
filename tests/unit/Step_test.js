goog.require('game.models.Step');
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');


function testNonCollision(){
	var step0 = new Step(new goog.math.Coordinate(0, 0), Direction.East);
	var step1 = new Step(new goog.math.Coordinate(1, 0), Direction.West);
	var step2 = new Step(new goog.math.Coordinate(1, 1), Direction.North);
	var step3 = new Step(new goog.math.Coordinate(0, 1), Direction.South);
	var expect = chai.expect;
	// expect(step0.collidesWith(step1)).to.be.true;
	// expect(step0.collidesWith(step0)).to.be.true;
	// expect(step1.collidesWith(step0)).to.be.true;
	// expect(step1.collidesWith(step2)).to.be.false;
	expect(step2.collidesWith(step3)).to.be.false;
}