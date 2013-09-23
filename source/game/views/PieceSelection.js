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

goog.provide("game.views.PieceSection");

goog.require("goog.dom");
goog.require("managers.views.GameScreen");

var PieceSection = {
	/** @type {Element} */
	Element : goog.dom.createDom("div", {"id" : "PieceSection"}),
	initialize : function() {
		//add it to the game screen
		goog.dom.appendChild(GameScreen.Screen, PieceSection.Element);
	},
	/** 
		set the available pieces displayed in the piece selection area
		@param {Array.<Piece>} pieces
	*/
	setAvailablePieces : function(pieces){
		//add a callback to each of the pieces when its selected
	},
	reset : function(){
		//remove all the event listeners on the pieces
	}
};

PieceSection.initialize();

