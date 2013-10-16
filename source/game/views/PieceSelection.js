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
		// goog.events.listen(PieceSelection.Element, [goog.events.EventType.TOUCHEND, goog.events.EventType.CLICK], PieceSelection.clicked);
		//set the position
		PieceSelection.position = goog.style.getPosition(PieceSelection.Element);
	},
	/**
	@param {goog.events.BrowserEvent} e The event object.
	*/
	clicked : function(e){
		var clickedClasses = goog.dom.classes.get(e.target);
		//get the type from the event
		for (var i = 0; i < PieceSelection.pieces.length; i++){
			var piece = PieceSelection.pieces[i];
			if (goog.array.contains(clickedClasses, piece.type)){
				PieceSelection.selected = piece.type;
				piece.view.highlight(true);
			} else {
				piece.view.highlight(false);
			}
		}
	},
	/** 
		set the available pieces displayed in the piece selection area
		@param {Array.<PieceType>} types
	*/
	setAvailablePieces : function(types){
		PieceSelection.types = types;
		for (var i = 0; i < types.length; i++){
			var p = new Piece(types[i]);
			PieceSelection.setPiecePosition(p);
		}
	},
	/** 
		@param {Piece} piece
	*/
	setPiecePosition : function(piece){
		for (var i = 0; i < PieceSelection.types.length; i++){
			if (PieceSelection.types[i] === piece.type){
				//add it to the array
				PieceSelection.pieces[i] = piece;
				//set it's position
				var position = PieceSelection.position.clone();
				position.translate(CONST.TILESIZE*i, 0);
				goog.style.setPosition(piece.view.Element, position);
			}
		}
	},
	/** 
		replace a piece of a certain type in the piece selection
		@param {PieceType} type
	*/
	replacePiece : function(type){
		var p = new Piece(type);
		PieceSelection.setPiecePosition(p);
	},
	/** 
		remove all the pieces from the selection
	*/
	reset : function(){
		//destory all the pieces
		for (var i = 0; i < PieceSelection.pieces.length; i++){
			var p = PieceSelection.pieces[i];
			p.dispose();
		}
		PieceSelection.pieces = [];
	},
	/** 
		@param {PieceType} type
	*/
	setSelected : function(type){
		PieceSelection.selected = type;
		//highlight the selected piece
		for (var i = 0; i < PieceSelection.pieces.length; i++){
			var piece = PieceSelection.pieces[i];
			if (piece.type === type){
				piece.view.highlight(true);
			} else {
				piece.view.highlight(false);
			}
		}
	},
	/** 
		@return {PieceType|null} the selected piece
	*/
	getSelected : function(){
		return PieceSelection.selected;
	},
	/** 
		no piece is selected
	*/
	clearSelected : function(){
		for (var i = 0; i < PieceSelection.pieces.length; i++){
			var piece = PieceSelection.pieces[i];
			piece.view.highlight(false);
		}
		PieceSelection.selected = null;
	}
};

PieceSelection.initialize();

