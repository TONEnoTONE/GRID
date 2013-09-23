goog.require('screens.views.GameScreen');
goog.require('game.controllers.PieceController');
goog.require('game.views.BoardView');
goog.require('goog.math.Coordinate');
goog.require('data.Const');
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');


function testAddAndGetPiece(){
	var position = new goog.math.Coordinate(3, 3);
	var piece = new Piece(Piece.Type.Red);
	piece.setPosition(position);
	PieceController.addPiece(piece);
	var p = PieceController.pieceAt(position);
	chai.expect(p.position.x).to.equal(3);
	chai.expect(p.position.y).to.be.a("number");
	var position2 = new goog.math.Coordinate(4, 3);
	var p2 = PieceController.pieceAt(position2);
	chai.expect(p2).to.be.null;
}
