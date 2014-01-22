goog.provide("graphics.ReflectedText");

goog.require("goog.dom");
goog.require("goog.Disposable");

/** 
	@extends {goog.Disposable}
	@constructor
	@param {string} text
	@param {Element} parent
*/
graphics.ReflectedText = function(text, parent){
	goog.base(this);
	/** @type {Element} */
	this.Element = goog.dom.createDom("div");
}

goog.inherits(graphics.ReflectedText, goog.Disposable);

/** @override */
graphics.ReflectedText.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	this.clickHandler.dispose();
	goog.base(this, "disposeInternal");
}

