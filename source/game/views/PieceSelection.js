/*=============================================================================
 _______  ___   _______  _______  _______    _______  _______  ___      _______  _______  _______  ___   _______  __    _ 
|       ||   | |       ||       ||       |  |       ||       ||   |    |       ||       ||       ||   | |       ||  |  | |
|    _  ||   | |    ___||       ||    ___|  |  _____||    ___||   |    |    ___||       ||_     _||   | |   _   ||   |_| |
|   |_| ||   | |   |___ |       ||   |___   | |_____ |   |___ |   |    |   |___ |       |  |   |  |   | |  | |  ||       |
|    ___||   | |    ___||      _||    ___|  |_____  ||    ___||   |___ |    ___||      _|  |   |  |   | |  |_|  ||  _    |
|   |    |   | |   |___ |     |_ |   |___    _____| ||   |___ |       ||   |___ |     |_   |   |  |   | |       || | |   |
|___|    |___| |_______||_______||_______|  |_______||_______||_______||_______||_______|  |___|  |___| |_______||_|  |__|

the container where you can select the pieces from
=============================================================================*/

goog.provide("game.views.PieceSelection");

goog.require("goog.dom");
goog.require("managers.views.GameScreen");

var PieceSelection = {
	/** @type {Piece} */
	selected : null,
	/** @type {Array.<Piece>} */
	pieces : [],
	/** @type {Element} */
	Element : goog.dom.createDom("div", {"id" : "PieceSelection"}),
	initialize : function() {
		//add it to the game screen
		goog.dom.appendChild(GameScreen.Screen, PieceSelection.Element);
	},
	/** 
		set the available pieces displayed in the piece selection area
		@param {Array.<Piece.Type>} pieces
	*/
	setAvailablePieces : function(pieces){
		for (var i = 0; i < pieces.length; i++){
			var p = new Piece(pieces[i], true);
			PieceSelection.pieces.push(p);
		}
	},
	reset : function(){
		//destory all the pieces
		for (var i = 0; i < PieceSelection.pieces.length; i++){
			var p = PieceSelection.pieces[i];
			p.dispose();
		}
		PieceSelection.pieces = [];
	}
};

PieceSelection.initialize();
