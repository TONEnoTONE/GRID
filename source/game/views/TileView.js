/*=============================================================================
 _______  ___   ___      _______    __   __  ___   _______  _     _ 
|       ||   | |   |    |       |  |  | |  ||   | |       || | _ | |
|_     _||   | |   |    |    ___|  |  |_|  ||   | |    ___|| || || |
  |   |  |   | |   |    |   |___   |       ||   | |   |___ |       |
  |   |  |   | |   |___ |    ___|  |       ||   | |    ___||       |
  |   |  |   | |       ||   |___    |     | |   | |   |___ |   _   |
  |___|  |___| |_______||_______|    |___|  |___| |_______||__| |__|

=============================================================================*/

goog.provide("game.views.TileView");

goog.require("data.Direction");
goog.require("data.Const");

var TileView = {
	/** 
		@param {Tile} tile
		@param {CanvasRenderingContext2D} context
	*/
	drawTile : function(tile, context){	
		if (tile.active){
			TileView.drawWalls(tile, context);
		}
	},
	/** 
		@param {Tile} tile
		@param {CanvasRenderingContext2D} context
	*/
	drawWalls : function(tile, context){
		var position = tile.position.clone().scale(CONST.TILESIZE);
		var activeWidth = 4;
		var margin = 4;
		var activeColor = "#fff";
		//south
		if (tile.walls[Direction.South]){
			context.beginPath();
			context.lineWidth = activeWidth;
			context.strokeStyle = activeColor;
			context.moveTo(position.x + margin, position.y + CONST.TILESIZE);
			context.lineTo(position.x + CONST.TILESIZE - margin, position.y + CONST.TILESIZE);
			context.stroke();
		} 
		
		//north
		if (tile.walls[Direction.North]){
			context.beginPath();
			context.lineWidth = activeWidth;
			context.strokeStyle = activeColor;
			context.moveTo(position.x + margin, position.y);
			context.lineTo(position.x + CONST.TILESIZE - margin, position.y);
			context.stroke();
		}
		//west
		if (tile.walls[Direction.West]){
			context.beginPath();
			context.lineWidth = activeWidth;
			context.strokeStyle = activeColor;
			context.moveTo(position.x, position.y + margin);
			context.lineTo(position.x, position.y + CONST.TILESIZE - margin);
			context.stroke();
		}
		
		//east
		if (tile.walls[Direction.East]){
			context.beginPath();
			context.lineWidth = activeWidth;
			context.strokeStyle = activeColor;
			context.moveTo(position.x + CONST.TILESIZE, position.y + margin);
			context.lineTo(position.x + CONST.TILESIZE, position.y + CONST.TILESIZE - margin);
			context.stroke();
		}
	}
};