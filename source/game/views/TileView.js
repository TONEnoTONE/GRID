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
	goog.style.setStyle(this.Element, "left", tile.position.x * 12.5 + "%");
	goog.style.setStyle(this.Element, "top", tile.position.y * 12.5 + "%");
	/** @private @type {Element} */
	this.Highlight = goog.dom.createDom("div", {"id" : "highlight"});
	goog.dom.appendChild(this.Element, this.Highlight);
}

/** @private @type {Animation.Keyframe} */
TileView.prototype.animation = new Animation.Keyframe(
		[{"opacity" : 0}, {"opacity" : 1}, {"opacity" : 1}, {"opacity" : 0}],
		[0, 30, 70, 0]
	);

/** @private @type {Animation.Keyframe} */
TileView.prototype.animateOut = new Animation.Keyframe([{"opacity" : 1}, {"opacity" : 0}]);

/** @private @type {Animation.Keyframe} */
TileView.prototype.animateIn = new Animation.Keyframe([{"opacity" : 0}, {"opacity" : 1}]);

/** @private @type {number} */
TileView.prototype.fadetime = 100;

/** 
	highlight the tile
	@param {PieceType} color
	@param {number} duration in seconds
	@param {number=} delay in seconds
*/
TileView.prototype.highlight = function(color, duration, delay){
	delay = delay || 0;
	goog.dom.appendChild(BoardView.Board, this.Element);
	goog.dom.classes.set(this.Highlight, color);
	this.animation.play(this.Element, duration, {delay : delay} , goog.bind(this.removeHighlight, this));
}

/** 
	highlight the tile (not animated)
	@param {PieceType} color
	@param {number=} delay
*/
TileView.prototype.highlightOn = function(color, delay){
	goog.dom.appendChild(BoardView.Board, this.Element);
	goog.dom.classes.set(this.Highlight, color);
	delay = delay || 0;
	this.animateIn.play(this.Element, .2, {delay : delay});
}

TileView.prototype.removeHighlight  = function(){
	goog.dom.removeNode(this.Element);
}

/** 
	turns the highlights off
*/
TileView.prototype.clearHighlight = function(){
	this.animateOut.play(this.Element, .2, {} , goog.bind(this.removeHighlight, this));
}

