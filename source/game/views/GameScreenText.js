/*=============================================================================

GAME TEXT

displays text on the game screen

=============================================================================*/

goog.provide("game.views.GameScreenTextView");

goog.require("goog.Disposable");
goog.require("goog.dom");
goog.require("Animation.Keyframe");
goog.require("data.Const");
goog.require("game.views.BoardView");

/** 
	@constructor
	@extends {goog.Disposable}
*/
var GameScreenTextView = function(){
	/** @private
		@type {Element} */
	this.Element = goog.dom.createDom("div", {"class" : "GameScreenText"});

	//the fade in animation
	var from = {"opacity" : 0}; 
	var to = {"opacity" : 1};
	/** @private
		@type {Animation.Keyframe} */
	this.animation = new Animation([from, to, to, from], [0, 20, 80, 100]);
}

goog.inherits(GameScreenTextView, goog.Disposable);

/** @override */
GameScreenTextView.prototype.disoposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.animation.dispose();
	this.animation = null;
	this.model = null;
	goog.base(this, "disposeInternal");
}