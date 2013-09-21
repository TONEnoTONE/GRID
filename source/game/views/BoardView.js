/*=============================================================================

 _______  _______  _______  ______    ______     __   __  ___   _______  _     _ 
|  _    ||       ||   _   ||    _ |  |      |   |  | |  ||   | |       || | _ | |
| |_|   ||   _   ||  |_|  ||   | ||  |  _    |  |  |_|  ||   | |    ___|| || || |
|       ||  | |  ||       ||   |_||_ | | |   |  |       ||   | |   |___ |       |
|  _   | |  |_|  ||       ||    __  || |_|   |  |       ||   | |    ___||       |
| |_|   ||       ||   _   ||   |  | ||       |   |     | |   | |   |___ |   _   |
|_______||_______||__| |__||___|  |_||______|     |___|  |___| |_______||__| |__|


=============================================================================*/

goog.provide("game.views.BoardView");

goog.require("goog.dom");
goog.require("goog.events.BrowserEvent");
goog.require("game.views.TileView");
goog.require("goog.style");

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
	/** 
		@const
		@type {number}
	*/
	margin : 10,
	initialize : function(){
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
	},
	drawTile : function(tile){
		var margin = BoardView.margin;
		BoardView.TileContext.save();
		BoardView.TileContext.translate(margin, margin);
		TileView.drawTile(tile, BoardView.TileContext);
		BoardView.TileContext.restore();
	},
	drawGrid : function(){
		var context = BoardView.TileContext;
		var margin = BoardView.margin;
		context.save();
		context.translate(margin, margin);
		context.strokeStyle = "#999";
		context.lineWidth = 1;
		for (var y = 0; y < CONST.BOARDDIMENSION.HEIGHT+1; y++){
			context.beginPath();
			context.moveTo(0, y * CONST.TILESIZE);
			context.lineTo(CONST.TILESIZE * CONST.BOARDDIMENSION.WIDTH, y * CONST.TILESIZE);
			context.stroke();
		}
		for (var x = 0; x < CONST.BOARDDIMENSION.WIDTH+1; x++){
			context.beginPath();
			context.moveTo(x * CONST.TILESIZE, 0);
			context.lineTo(x * CONST.TILESIZE, CONST.TILESIZE * CONST.BOARDDIMENSION.HEIGHT);
			context.stroke();
		}
		context.restore();
	}
};

//initialize the board
BoardView.initialize();


