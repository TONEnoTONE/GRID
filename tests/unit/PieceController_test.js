goog.require('game.controllers.PieceController');
goog.require('data.Const');
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');


function testAddPiece(){
	var position = {x : 3, y : 3};
	game.controllers.PieceController.addPiece({x : 3, y : 3});
	var p = game.controllers.PieceController.pieceAt({x : 3, y : 3});

}