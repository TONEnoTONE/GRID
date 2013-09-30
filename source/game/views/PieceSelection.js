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

var PieceSelection = {
	/** 
		@private
		@type {PieceType|null} 
	*/
	selected : null,
	/** @type {Array.<Piece>} */
	pieces : [],
	/** @type {Element} */
	Element : goog.dom.createDom("div", {"id" : "PieceSelection"}),
	initialize : function() {
		//add it to the game screen
		goog.dom.appendChild(GridDom.GameScreen, PieceSelection.Element);
		goog.events.listen(PieceSelection.Element, [goog.events.EventType.TOUCHEND, goog.events.EventType.CLICK], PieceSelection.clicked);
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
		for (var i = 0; i < types.length; i++){
			var p = new Piece(types[i]);
			PieceSelection.pieces.push(p);
			goog.dom.appendChild(PieceSelection.Element, p.view.Element);
		}
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

