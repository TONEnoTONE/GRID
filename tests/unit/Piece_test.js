goog.require('game.controllers.PieceController');
goog.require('game.models.Piece');
goog.require('data.Const');
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');


function testConstructor(){
	var p = new Piece(Piece.Type.Red);
	var position = new goog.math.Coordinate(4, 3);
	p.setPosition(position);
	chai.expect(p.position.x).to.equal(4);
	chai.expect(p.position.y).to.be.a("number");
	p.setDirection(Direction.North);
	chai.expect(p.direction).to.equal(Direction.North);
}