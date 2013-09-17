goog.require('game.controllers.PieceController');
goog.require('data.Const');
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');


function testAddPiece(){
	var position = {x : 3, y : 3};
	PieceController.addPiece({x : 3, y : 3});
	var p = PieceController.pieceAt({x : 3, y : 3});

}