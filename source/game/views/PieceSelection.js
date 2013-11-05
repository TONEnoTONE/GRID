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
	/** @type {Object} */
	scrollOffset : {scroll : 0},
	/** @type {Element} */
	Element : goog.dom.createDom("div", {"id" : "PieceSelection"}),
	/** @type {Element} */
	Scroller : goog.dom.createDom("div", {"id" : "PieceSelectionScroller"}),
	/** @type {goog.math.Coordinate} */
	position : new goog.math.Coordinate(0, 0),
	//initialize
	initialize : function() {
		//add it to the game screen
		goog.dom.appendChild(BoardView.Board, PieceSelection.Scroller);
		goog.dom.appendChild(PieceSelection.Scroller, PieceSelection.Element);
		//set the position
		PieceSelection.position = goog.style.getPosition(PieceSelection.Element);
		PieceSelection.makeScrolls();
	},
	/** 
		@param {Element} element
		@param {number} index
	*/
	setPiecePosition : function(element, index){
		//set it's position
		// var position = PieceSelection.position.clone();
		var position = new goog.math.Coordinate(0, CONST.TILESIZE*index);
		goog.dom.appendChild(PieceSelection.Element, element);
		goog.style.setPosition(element, position);
	},
	/** 
		@private
	*/
	makeScrolls : function(){
		var topScroll = goog.dom.createDom("div", {"id" : "PieceTopScroll", "class" : "scrollerHandle"}, "^");
		var bottomScroll = goog.dom.createDom("div", {"id" : "PieceBottomScroll", "class" : "scrollerHandle"}, "v");
		goog.dom.appendChild(PieceSelection.Scroller, topScroll);
		goog.dom.appendChild(PieceSelection.Scroller, bottomScroll);
		//set the scroll top of GridDom.CardContainer
		var jumpSize = 15;
		goog.events.listen(bottomScroll, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], function(){
			PieceSelection.scrollOffset.scroll = jumpSize;
			PieceSelection.scrollTimeout();
		});
		goog.events.listen(topScroll, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], function(){
			PieceSelection.scrollOffset.scroll = -jumpSize;
			PieceSelection.scrollTimeout();
		});
		goog.events.listen(bottomScroll, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP, goog.events.EventType.MOUSEOUT], function(){
			PieceSelection.scrollOffset.scroll = 0;
		});
		goog.events.listen(topScroll, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP, goog.events.EventType.MOUSEOUT], function(){
			PieceSelection.scrollOffset.scroll = 0;
		});
	},
	/** 
		@private
	*/
	scrollTimeout : function(){
		if (PieceSelection.scrollOffset.scroll !== 0){
			setTimeout(function(){
				PieceSelection.scrollTimeout();
				PieceSelection.Scroller.scrollTop += PieceSelection.scrollOffset.scroll;
			}, 50);
		}
	}
};

PieceSelection.initialize();

