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
goog.require("goog.events");
goog.require("screens.views.GridDom");
goog.require("game.views.BoardView");

var PieceSelection = {
	/** 
		@private
		@type {PieceType|null} 
	*/
	selected : null,
	/** @type {Array.<Piece>} */
	pieces : [],
	/** @type {Array.<PieceType>} */
	types : [],
	/** @type {Element} */
	Element : goog.dom.createDom("div", {"id" : "PieceSelection"}),
	/** @type {goog.math.Coordinate} */
	position : new goog.math.Coordinate(0, 0),
	//initialize
	initialize : function() {
		//add it to the game screen
		goog.dom.appendChild(BoardView.Board, PieceSelection.Element);
		//set the position
		PieceSelection.position = goog.style.getPosition(PieceSelection.Element);
	},
	/** 
		@param {Element} element
		@param {number} index
	*/
	setPiecePosition : function(element, index){
		//set it's position
		var position = PieceSelection.position.clone();
		position.translate(CONST.TILESIZE*index, 0);
		goog.style.setPosition(element, position);
	}
};

PieceSelection.initialize();