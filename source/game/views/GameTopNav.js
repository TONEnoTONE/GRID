/*=============================================================================

GAME SCREEN TOP NAV

=============================================================================*/

goog.provide("GameTopNav");

goog.require("goog.Disposable");
goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.string");
goog.require("screens.views.GridDom");
goog.require("game.controllers.StageController");

/** 
	@constructor
	@extends {goog.Disposable}
*/
var GameTopNav = function(){
	goog.base(this);
	
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"id" : "GameTopNav"});
	goog.dom.appendChild(GridDom.GameScreen, this.Element);
	
	/** @type {Element} */
	this.progress = goog.dom.createDom("div", {"id" : "Progress"});
	goog.dom.appendChild(this.Element, this.progress);

	/** @type {Element} */
	this.moves = goog.dom.createDom("div", {"id" : "Moves"});
	goog.dom.appendChild(this.Element, this.moves);
}

//extend dispoable
goog.inherits(GameTopNav, goog.Disposable);

/** @override */
GameTopNav.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	this.progress = null;
	this.moves = null;
	goog.base(this, 'disposeInternal');
}

/** 
	@param {number} stage
	@param {number} level
	@param {number} moves
 */
GameTopNav.prototype.setStage = function(stage, level, movesCount){
	level += 1;
	var levelCount = StageController.getLevelCount(stage);
	var prog = goog.string.buildString(level, "/", levelCount);
	goog.dom.setTextContent(this.progress, prog);

	var moveText = goog.string.buildString("MOVES: ", movesCount);
	goog.dom.setTextContent(this.moves, moveText);
}

/** 
	@param {number} moves
 */
GameTopNav.prototype.updateMoves = function(movesCount){
	var moveText = goog.string.buildString("MOVES: ", movesCount);
	goog.dom.setTextContent(this.moves, moveText);
}

