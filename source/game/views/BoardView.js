/*=============================================================================

 _______  _______  _______  ______    ______     __   __  ___   _______  _     _ 
|  _    ||       ||   _   ||    _ |  |      |   |  | |  ||   | |       || | _ | |
| |_|   ||   _   ||  |_|  ||   | ||  |  _    |  |  |_|  ||   | |    ___|| || || |
|       ||  | |  ||       ||   |_||_ | | |   |  |       ||   | |   |___ |       |
|  _   | |  |_|  ||       ||    __  || |_|   |  |       ||   | |    ___||       |
| |_|   ||       ||   _   ||   |  | ||       |   |     | |   | |   |___ |   _   |
|_______||_______||__| |__||___|  |_||______|     |___|  |___| |_______||__| |__|

renders the view and sets an event listener
=============================================================================*/

goog.provide("game.views.BoardView");

//a bunch of goog.event dependencies
goog.addDependency('', [
	"goog.events.EventHandler",
	"goog.events.EventTarget",
	"goog.debug.ErrorHandler",
	"goog.events.EventWrapper"
	],[]);

goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.math.Coordinate");
goog.require("goog.events.Event");
goog.require("goog.events");
goog.require("game.views.TileView");
goog.require("screens.views.GridDom");
goog.require('goog.fx.DragDrop');


var BoardView = {
	/** @type {Element} */
	Board : goog.dom.createDom("div", {"id" : "BoardView"}),
	/** @type {Element} */
	TileCanvas : goog.dom.createDom("canvas", {"id" : "TileCanvas"}),
	/** 
		@private 
		@type {CanvasRenderingContext2D}
	*/
	TileContext : null,
	/** @type {goog.fx.DragDrop} */
	BoardDrop : null,
	/** 
		@const
		@type {number}
		@private
	*/
	margin : 58 * CONST.PIXELSCALAR,
	initialize : function(){
		//make the droppable version of the board
		BoardView.BoardDrop = new goog.fx.DragDrop(BoardView.Board);
		BoardView.BoardDrop.init();
		//put the canvas in the board
		goog.dom.appendChild(BoardView.Board, BoardView.TileCanvas);
		//make the drawing context
		BoardView.TileContext = BoardView.TileCanvas.getContext('2d');
		//size the canvas
		var margin = BoardView.margin;
		goog.style.setSize(BoardView.Board, CONST.TILESIZE * CONST.BOARDDIMENSION.WIDTH + margin*2, CONST.TILESIZE * CONST.BOARDDIMENSION.HEIGHT + margin *2);
		goog.style.setSize(BoardView.TileCanvas, CONST.TILESIZE * CONST.BOARDDIMENSION.WIDTH + margin * 2, CONST.TILESIZE * CONST.BOARDDIMENSION.HEIGHT + margin * 2);
		//size the context
		BoardView.TileContext.canvas.width = CONST.TILESIZE * CONST.BOARDDIMENSION.WIDTH + margin * 2;
		BoardView.TileContext.canvas.height = CONST.TILESIZE * CONST.BOARDDIMENSION.HEIGHT + margin * 2;
		//add the board to the game screen
		goog.dom.appendChild(GridDom.GameScreen, BoardView.Board);
		//bind an event listener to the board
		goog.events.listen(BoardView.Board, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], BoardView.mousedown);
		goog.events.listen(BoardView.Board, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP], BoardView.mouseup);
		goog.events.listen(BoardView.Board, [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE], BoardView.mousemove);
		goog.events.listen(BoardView.Board, [goog.events.EventType.MOUSEOUT], BoardView.mouseend);
	},
	/** 
		sets the margin on the Element's top and left
		@param {Element} element
	*/
	applyMargin : function(element){
		var margin = BoardView.margin;
		goog.style.setPosition(element, new goog.math.Coordinate(margin, margin));
	},
	drawGrid : function(){
		var context = BoardView.TileContext;
		var margin = BoardView.margin;
		context.save();
		context.translate(margin, margin);
		context.fillStyle = "#999";
		var radius = 2;
		var twoPi = 2 * Math.PI;
		for (var y = 0; y < CONST.BOARDDIMENSION.HEIGHT+1; y++){
			for (var x = 0; x < CONST.BOARDDIMENSION.WIDTH+1; x++){
				context.beginPath();
				context.arc(x * CONST.TILESIZE, y * CONST.TILESIZE, radius, 0, twoPi, false);
				context.fill();
			}
		}
		context.restore();
	},
	reset : function() {
		//clear the canvas
		BoardView.TileContext.clearRect(0, 0, BoardView.TileCanvas.width, BoardView.TileCanvas.height);
	},
	/** 
		translates board coordinates to a tile position
		@param {!goog.math.Coordinate} position
		@return {!goog.math.Coordinate}
	*/
	pixelToPosition : function(position){
		var ret = position.clone().translate(-BoardView.margin, -BoardView.margin);
		ret.scale(1 / CONST.TILESIZE);
		return ret.floor();
	},
	/** 
		translates tile position to pixels
		@param {goog.math.Coordinate} position
		@return {goog.math.Coordinate}
	*/
	positionToPixel : function(position){
		return position.clone().scale(CONST.TILESIZE).translate(BoardView.margin, BoardView.margin);
	},
	/*=========================================================================
		MOUSE STUFFS
	=========================================================================*/
	/**
		Event handler for mouse/touchdown on the board. 
		@param {goog.events.Event} e The event object.
		@return {!goog.math.Coordinate}
	*/
	mouseEventToPosition : function(e){
		var clientPosition = goog.style.getClientPosition(BoardView.Board);
		//subtract the touch position to get the offset
		var offset = new goog.math.Coordinate(e.clientX - clientPosition.x, e.clientY - clientPosition.y);
		// e.stopPropagation();
		var position = BoardView.pixelToPosition(offset);
		return position;
	},
	/**
		Event handler for mouse/touchdown on the board. 
		@param {goog.events.Event} e The event object.
	*/
	mousedown : function(e){
		e.preventDefault();
		BoardView.maybeReinitTouchEvent(e);
		//invoke the click callback
		GameController.mouseDownOnTile(BoardView.mouseEventToPosition(e));
	},
	/**
		Event handler for mouse/touchup on the board. 
		@param {goog.events.BrowserEvent} e The event object.
	*/
	mouseup : function(e){
		e.preventDefault();
		BoardView.maybeReinitTouchEvent(e);
		//invoke the click callback
		if (goog.isDef(GameController)){			
			GameController.mouseUpOnTile(BoardView.mouseEventToPosition(e));
		}
	},
	/**
		Event handler for mouse/touchmove on the board. 
		@param {goog.events.Event} e The event object.
	*/
	mousemove : function(e){
		e.preventDefault();
		BoardView.maybeReinitTouchEvent(e);
		//invoke the move callback
		if (goog.isDef(GameController)){
			GameController.mouseMoveOnTile(BoardView.mouseEventToPosition(e));
		}
	},
	mouseend : function(e){
		e.preventDefault();
		BoardView.maybeReinitTouchEvent(e);
		//test if the mouse moved off the board
		var clientPosition = goog.style.getClientPosition(BoardView.Board);
		var offset = new goog.math.Coordinate(e.clientX - clientPosition.x, e.clientY - clientPosition.y);
		var size = goog.style.getSize(BoardView.Board);
		if (offset.x > size.width || offset.x < 0 || offset.y < 0 || offset.y > size.height){
			if (goog.isDef(GameController)){
				GameController.mouseEnd();
			}
		}	
	},
	/** 
		@private
	*/
	maybeReinitTouchEvent : function(e) {
		var type = e.type;
		if (type == goog.events.EventType.TOUCHSTART || type == goog.events.EventType.TOUCHMOVE) {
			e.init(e.getBrowserEvent().targetTouches[0], e.currentTarget);
		} else if (type == goog.events.EventType.TOUCHEND || type == goog.events.EventType.TOUCHCANCEL) {
			e.init(e.getBrowserEvent().changedTouches[0], e.currentTarget);
		}
	}
};

//initialize the board
BoardView.initialize();
