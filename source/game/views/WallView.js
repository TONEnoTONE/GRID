/*=============================================================================

_     _  _______  ___      ___        __   __  ___   _______  _     _ 
| | _ | ||   _   ||   |    |   |      |  | |  ||   | |       || | _ | |
| || || ||  |_|  ||   |    |   |      |  |_|  ||   | |    ___|| || || |
|       ||       ||   |    |   |      |       ||   | |   |___ |       |
|       ||       ||   |___ |   |___   |       ||   | |    ___||       |
|   _   ||   _   ||       ||       |   |     | |   | |   |___ |   _   |
|__| |__||__| |__||_______||_______|    |___|  |___| |_______||__| |__|

=============================================================================*/

goog.provide("game.views.WallView");

goog.require("goog.Disposable");
goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.string");
goog.require("game.views.BoardView");
goog.require("data.Const");

/** 
@constructor
@param {Wall} model
@extends {goog.Disposable}
*/
var WallView = function(model){
	goog.base(this);
	/** @type {Wall} */
	this.model = model;
	this.Element = goog.dom.createDom("div", {"class" : "WallView"});
	goog.dom.appendChild(BoardView.Board, this.Element);
	this.positionWall();
}


goog.inherits(WallView, goog.Disposable);

/** @override */
WallView.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.model = null;
	goog.base(this, "disposeInternal");
}

/** 
	position the element in the board
*/
WallView.prototype.positionWall = function(){
	var position = this.model.position;
	var translateString = goog.string.buildString("translate3d(", position.x / 2 * CONST.TILESIZE, "px , ", position.y / 2 * CONST.TILESIZE, "px , 0)");
	goog.style.setStyle(this.Element, {"transform" : translateString});
	//set the orientation class
	goog.dom.classes.add(this.Element, this.model.getOrientation());
}