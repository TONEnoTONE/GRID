/*=============================================================================

GAME SCREEN TOP NAV

=============================================================================*/

goog.provide("GamescreenTopBar");

goog.require("goog.Disposable");
goog.require("goog.dom");
goog.require("goog.style");

/** 
	@constructor
	@extends {goog.Disposable}
*/
var GamescreenTopBar = function(){
	goog.base(this);
}

//extend dispoable
goog.inherits(GamescreenTopBar, goog.Disposable);

/** @override */
GamescreenTopBar.prototype.disposeInternal = function(){
	goog.base(this, 'disposeInternal');
}