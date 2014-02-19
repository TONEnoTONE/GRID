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
	this.songName = goog.dom.createDom("div", {"id" : "SongName"});
	goog.dom.appendChild(this.Element, this.songName);

	/** @type {Element} */
	this.moves = goog.dom.createDom("div", {"id" : "Moves"});
	goog.dom.appendChild(this.Element, this.moves);

	/** @type {number} */
	this.maxTakes = 0;

	/** @type {boolean} */
	this.perfect = false;
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
	//make it visible
	var levelCount = StageController.getLevelCount(stage);
	this.maxTakes = StageController.getNumberTakesAllowed(stage);
	
	var prog = goog.string.buildString(level + 1, "/", levelCount);
	goog.dom.setTextContent(this.progress, prog);

	var songName = StageController.getName(stage);
	goog.dom.setTextContent(this.songName, songName);


	//make the moves visible
	goog.dom.classes.add(this.moves, "visible");
	this.perfect = StageController.isLevelPerfect(stage, level);
	if (this.perfect){
		// goog.dom.setTextContent(this.moves, "\u221E");
		goog.dom.setTextContent(this.moves, "REMIX");
		// goog.dom.classes.add(this.moves, "perfect");
	}
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
	if (!this.perfect){
		var takesText = goog.string.buildString("Take ", takesCount);
		goog.dom.setTextContent(this.moves, takesText);
		//if it's 2 away from the end, it should be red as a warning
		if (takesCount > this.maxTakes - 2){
			goog.dom.classes.add(this.moves, "Warning");
		} else {
			goog.dom.classes.remove(this.moves, "Warning");
		}
	}
}

/** 
	opacity is at 0 and there are no takes
*/
GameTopNav.prototype.reset = function(){
	goog.dom.classes.set(this.moves, "");
}
