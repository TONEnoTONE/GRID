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

/** 
	@constructor
	@extends {goog.Disposable}
*/
var Pattern = function(){
	goog.base(this);
}

//extends that $h!t
goog.inherits(Pattern, goog.Disposable);

/** 
	@override
*/
Pattern.prototype.disposeInternal = function(){
	goog.base(this, "disposeInternal");
}