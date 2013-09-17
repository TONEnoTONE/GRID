goog.require('game.models.Tile');
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');


function testConstructor(){
	var t = new Tile({x : 0, y : 0});
	chai.expect(t.position.x).to.equal(0);
	chai.expect(t.position.y).to.be.a("number");
}