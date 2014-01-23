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
goog.require("goog.fx.dom.FadeOutAndHide");
goog.require("goog.fx.dom.FadeInAndShow");

/** 
	@constructor
*/
var TileView = function(tile){
	//if the tile is active, make a dom element
	//make an dom and add it to the board
	var pos = BoardView.positionToPixel(tile.position);
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"class" : "TileView"});
	goog.style.setPosition(this.Element, pos);
	/** @private @type {Element} */
	this.Highlight = goog.dom.createDom("div", {"id" : "highlight"});
	goog.dom.appendChild(this.Element, this.Highlight);
}

/** @private @type {number} */
TileView.prototype.fadetime = 100;

/** 
	highlight the tile
	@param {PieceType} color
	@param {number=} duration in milliseconds
*/
TileView.prototype.highlight = function(color, duration){
	goog.dom.appendChild(BoardView.Board, this.Element);
	goog.dom.classes.set(this.Highlight, color);
	var tileFade = new goog.fx.dom.FadeIn(this.Element, this.fadetime);
	tileFade.play();
	if (goog.isDef(duration)){
		setTimeout(goog.bind(this.clearHighlight, this), duration);
	}
}

TileView.prototype.placeElement  = function(){

}

/** 
	turns the highlights off
*/
TileView.prototype.clearHighlight = function(){
	var tileFade = new goog.fx.dom.FadeOut(this.Element, this.fadetime);
	goog.events.listen(tileFade, goog.fx.Transition.EventType.END, function(e){
		var el = e.target.element;
		goog.dom.removeNode(el);
	});
	tileFade.play();
}

