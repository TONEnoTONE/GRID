/*=============================================================================

 _______  _______  _______  ______    ______     __   __  ___   _______  _     _ 
|  _    ||       ||   _   ||    _ |  |      |   |  | |  ||   | |       || | _ | |
| |_|   ||   _   ||  |_|  ||   | ||  |  _    |  |  |_|  ||   | |    ___|| || || |
|       ||  | |  ||       ||   |_||_ | | |   |  |       ||   | |   |___ |       |
|  _   | |  |_|  ||       ||    __  || |_|   |  |       ||   | |    ___||       |
| |_|   ||       ||   _   ||   |  | ||       |   |     | |   | |   |___ |   _   |
|_______||_______||__| |__||___|  |_||______|     |___|  |___| |_______||__| |__|


=============================================================================*/

goog.provide("game.view.BoardView");

var BoardView = {
	/** 
		@private 
		@type {CanvasRenderingContext2D}
	*/
	context : null,
	/** @private */
	canvas : null,
	initialize : function(){
		//make the drawing context
		BoardView.canvas = document.createElement("canvas");
		BoardView.context = BoardView.canvas.getContext('2d');
	}
}

BoardView.initialize();