/*=============================================================================
PATTERN TYPES
=============================================================================*/

goog.provide("data.PatternType");

goog.require("data.PieceType");

/** 
	@enum {string}
*/
var PatternType = {
	Red : PieceType.Red,
	Yellow : PieceType.Yellow,
	Green : PieceType.Green,
	Purple : PieceType.Purple,
	Blue : PieceType.Blue,
	Rest : "rest"
}