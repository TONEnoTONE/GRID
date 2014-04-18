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
goog.require("game.controllers.StageController");
goog.require("goog.dom.ViewportSizeMonitor");

var PieceSelection = {
	/** 
		@private
		@type {PieceType|null} 
	*/
	selected : null,
	/** @type {Array.<Piece>} */
	pieces : [],
	/** @type {number} */
	piecesInLevel : 1,
	/** @type {number}*/
	padding : 10,
	/** @type {Array.<PieceType>} */
	types : [],
	/** @type {Element} */
	Element : goog.dom.createDom("div", {"id" : "PieceSelection"}),
	/** @type {goog.math.Coordinate} */
	position : new goog.math.Coordinate(0, 0),
	//initialize
	initialize : function() {
		//add it to the game screen
		goog.dom.appendChild(BoardView.BoardContainer, PieceSelection.Element);
		//set the size
		//PieceSelection.position = goog.style.getPosition(PieceSelection.Element);
		PieceSelection.setSize()
		//and on resize
		var vsm = new goog.dom.ViewportSizeMonitor();
		goog.events.listen(vsm, goog.events.EventType.RESIZE, function(size){
			PieceSelection.setSize();
			//resize the selection area
			//reposition the board
		});
	},
	/** 
		@param {Element} element
		@param {number} index
	*/
	setPiecePosition : function(element, index){
		//set it's position
		var height = CONST.TILESIZE / 2;
		if (PieceSelection.piecesInLevel > 6){
			if (index < 6){
				height = 0
			} else {
				index = index % 6;
				height = CONST.TILESIZE;
			}
		} 
		var position = goog.style.getPosition(PieceSelection.Element);
		var boardOffset = goog.style.getRelativePosition(BoardView.Board, BoardView.BoardContainer);
		position = goog.math.Coordinate.difference(position, boardOffset);
		position.translate(CONST.TILESIZE*index + PieceSelection.padding, height + PieceSelection.padding);
		goog.style.setPosition(element, position);
	},
	/** 
		set the size of the element
	*/
	setSize : function(){
		var height = CONST.TILESIZE*2 + PieceSelection.padding*2;
		var size = new goog.math.Size(CONST.TILESIZE*6 + PieceSelection.padding*2, height);
		goog.style.setSize(PieceSelection.Element, size);
		//margin at 3%
		var margin = goog.style.getSize(GridDom.GameScreen).width * .03;
		goog.style.setStyle(BoardView.Board, "bottom", margin*3 + height + "px");
		goog.style.setStyle(PieceSelection.Element, "bottom", margin + "px");
	},
	/** 
		pulls the current level from the StageController
		@param {number} stage
		@param {number} level
	*/
	setStage : function(stage, level){
		PieceSelection.piecesInLevel = StageController.getAvailablePieces(stage, level).length;
	}
};

PieceSelection.initialize();