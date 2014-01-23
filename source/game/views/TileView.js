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
	/** @private @type {Animation.Keyframe} */
	this.animation = null;
	this.makeAnimation();
}

/** 
	makes a keyframe animation
*/
TileView.prototype.makeAnimation  = function(){
	var from = {
		"opacity" : 0,
	};
	var to = {
		"opacity" : 1,
	};
	this.animation = new Animation.Keyframe([from, to, to, from], [0, 30, 70, 0]);
}

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

TileView.prototype.removeHighlight  = function(){
	goog.dom.removeNode(this.Element);
}

/** 
	turns the highlights off
*/
TileView.prototype.clearHighlight = function(){
	/*var tileFade = new goog.fx.dom.FadeOut(this.Element, this.fadetime);
	goog.events.listen(tileFade, goog.fx.Transition.EventType.END, function(e){
		var el = e.target.element;
		goog.dom.removeNode(el);
	});
	tileFade.play();*/
}

