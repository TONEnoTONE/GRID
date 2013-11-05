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
goog.require("graphics.KeyframeAnimation");
goog.require("screens.views.GridDom");
goog.require("game.views.BoardView");

/** 
	@constructor
*/
var TileView = function(){
	/** @type {KeyframeAnimation} */
	this.animation = new KeyframeAnimation([{opacity : 0}, {opacity : 1},{opacity : 0}]);
	// this.animation = new KeyframeAnimation([{opacity : 1}]);
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"id" : "TileView"});
	this.fill = goog.dom.createDom("div", {"id" : "TileViewFill"});
	//append it to the board
	goog.dom.appendChild(BoardView.Board, this.Element);
	goog.dom.appendChild(this.Element, this.fill);
}

/** 
	@param {number} time
	@param {!goog.math.Coordinate} position
	@param {PieceType} color
*/
TileView.prototype.flashPosition = function(time, position, color){
	//make a new element
	var offset = BoardView.positionToPixel(position);
	goog.style.setPosition(this.Element, offset);
	//add the piecetype as a class
	goog.dom.classes.set(this.Element, color);
	// goog.style.setOpacity(this.Element, .7);
	//start the animation on that element
	this.animation.play(this.Element, time, {repeat : "infinite"});
}

/** 
	stop flashing
*/
TileView.prototype.stopFlashing = function(){
	//start the animation on that element
	this.animation.stop(this.Element);
	// goog.style.setOpacity(this.Element, 0);
}

/** 
	@param {number} time
	@param {!goog.math.Coordinate} position
	@param {PieceType} color
*/
TileView.prototype.flashJamPosition = function(time, position, color, duration){
	//make a new element
	/** @type {Element} */
	var el = goog.dom.createDom("div", {"id" : "TileView"});
	var fill = goog.dom.createDom("div", {"id" : "TileViewFill"});
	//append it to the board
	goog.dom.appendChild(BoardView.Board, el);
	goog.dom.appendChild(el, fill);
	var offset = BoardView.positionToPixel(position);
	goog.style.setPosition(el, offset);
	//add the piecetype as a class
	goog.dom.classes.set(el, color);
	//start the animation on that element
	this.animation.play(el, time, {repeat : "infinite"});
	var that = this;
	setTimeout(function(){
		that.animation.stop(el);
		goog.dom.removeNode(el);
	}, duration*1000);
}

