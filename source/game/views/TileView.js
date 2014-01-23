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
goog.require("goog.Disposable");
goog.require("game.views.BoardView");
goog.require("goog.fx.dom.FadeOut");
goog.require("goog.fx.dom.FadeIn");

/** 
	@constructor
*/
var TileView = function(tile){
	//if the tile is active, make a dom element
	//make an dom and add it to the board
	var pos = BoardView.positionToPixel(tile.position);
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"class" : "TileView"});
	goog.dom.appendChild(BoardView.Board, this.Element);
	goog.style.setPosition(this.Element, pos);
}

/** 
	highlight the tile
	@param {PieceType} color
*/
TileView.prototype.highlight = function(color){
	
}

