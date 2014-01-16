/*=============================================================================

GAME SCREEN TOP NAV

=============================================================================*/

goog.provide("GamescreenTopBar");

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
var GamescreenTopBar = function(){
	goog.base(this);
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"id" : "GamescreenTopBar"});
	goog.dom.appendChild(GridDom.GameScreen, this.Element);
	/** @type {Element} */
	this.progress = goog.dom.createDom("div", {"id" : "Progress"});
	goog.dom.appendChild(this.Element, this.progress);
}

//extend dispoable
goog.inherits(GamescreenTopBar, goog.Disposable);

/** @override */
GamescreenTopBar.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	this.progress = null;
	goog.base(this, 'disposeInternal');
}

/** 
	@param {number} stage
	@param {number} level
 */
GamescreenTopBar.prototype.setStage = function(stage, level){
	level += 1;
	var levelCount = StageController.getLevelCount(stage);
	var prog = goog.string.buildString(level, "/", levelCount);
	goog.dom.setTextContent(this.progress, prog);
}

