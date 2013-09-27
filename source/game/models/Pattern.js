/*=============================================================================
 _______  _______  _______  _______  _______  ______    __    _ 
|       ||   _   ||       ||       ||       ||    _ |  |  |  | |
|    _  ||  |_|  ||_     _||_     _||    ___||   | ||  |   |_| |
|   |_| ||       |  |   |    |   |  |   |___ |   |_||_ |       |
|    ___||       |  |   |    |   |  |    ___||    __  ||  _    |
|   |    |   _   |  |   |    |   |  |   |___ |   |  | || | |   |
|___|    |__| |__|  |___|    |___|  |_______||___|  |_||_|  |__|

=============================================================================*/

goog.provide("game.models.Pattern");

goog.require("game.models.Piece");

/** 
	@constructor
	@extends {goog.Disposable}
*/
var Pattern = function(patternRepresentation){
	goog.base(this);
	/** */
}

//extends that $h!t
goog.inherits(Pattern, goog.Disposable);

/** 
	@override
*/
Pattern.prototype.disposeInternal = function(){
	goog.base(this, "disposeInternal");
}

/** 
	@enum {string}
*/
Pattern.Type = {
	Red : Piece.Type.Red,
	Yellow : Piece.Type.Yellow,
	Green : Piece.Type.Green,
	Purple : Piece.Type.Purple,
	Blue : Piece.Type.Blue,
	Rest : "rest"
}