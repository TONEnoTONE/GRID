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
goog.require("game.models.Game");

/** 
	@constructor
	@extends {goog.Disposable}
*/
var GameTopNav = function(game){
	goog.base(this);
	
	//set the callback on the game
	game.setCb(goog.bind(this.update, this));
	
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
 */
GameTopNav.prototype.setStage = function(stage, level){
	level += 1;
	var levelCount = StageController.getLevelCount(stage);
	//var takes = StageController.getNumberTakesAllowed(stage);
	
	var prog = goog.string.buildString(level, "/", levelCount);
	goog.dom.setTextContent(this.progress, prog);

	//this.updateTakes(takes);
}

/** 
	@param {Object} data
	this is where we update everything that needs updating in this view
*/
GameTopNav.prototype.update = function(data){
	this.updateTakes(data.takes);
}

/** 
	@param {number} takesCount
 */
GameTopNav.prototype.updateTakes = function(takesCount){
	//var takesText = goog.string.buildString("Takes: ", takesCount);
	var takesText = goog.string.buildString("Takes: ", takesCount);
	goog.dom.setTextContent(this.moves, takesText);
}
