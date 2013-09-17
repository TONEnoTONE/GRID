goog.require('game.models.Piece');
goog.require('data.Const');
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');


function testConstructor(){
	var p = new Piece();
	p.setPosition({x : 4, y : 3});
	chai.expect(p.position.x).to.equal(4);
	chai.expect(p.position.y).to.be.a("number");
	p.setDirection(CONST.DIRECTION.NORTH);
	chai.expect(p.direction).to.equal(CONST.DIRECTION.NORTH);
}