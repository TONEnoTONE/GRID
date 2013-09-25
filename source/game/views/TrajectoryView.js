/*=============================================================================
 _______  ______    _______      ___    __   __  ___   _______  _     _ 
|       ||    _ |  |   _   |    |   |  |  | |  ||   | |       || | _ | |
|_     _||   | ||  |  |_|  |    |   |  |  |_|  ||   | |    ___|| || || |
  |   |  |   |_||_ |       |    |   |  |       ||   | |   |___ |       |
  |   |  |    __  ||       | ___|   |  |       ||   | |    ___||       |
  |   |  |   |  | ||   _   ||       |   |     | |   | |   |___ |   _   |
  |___|  |___|  |_||__| |__||_______|    |___|  |___| |_______||__| |__|

=============================================================================*/

goog.provide("game.views.TrajectoryView");

goog.require("goog.Disposable");
goog.require("goog.cssom");
goog.require("goog.dom.vendor");

/** 
	@constructor
	@extends {goog.Disposable}
*/
var TrajectoryView = function(model){
	goog.base(this);
	/** @type {Trajectory} */
	this.model = model;

}

goog.inherits(TrajectoryView, goog.Disposable);


/** 
	@param {Array.<Step>} steps
*/
TrajectoryView.prototype.generateCSS = function(steps){
	var len = steps.length;
	var prefixFreePass = goog.string.buildString("@keyframes ", this.model.uid, "_animation { ");
	//prefix free pass
	for (var i = 0; i < len; i++){
		var step = steps[i];
		var percent = (i / (len - 1))*100;
		var keyframe = goog.string.buildString(percent.toFixed(0), "% {", step.view.getKeyFrame(), "}");
		prefixFreePass = goog.string.buildString(prefixFreePass, keyframe);
	}
	prefixFreePass = goog.string.buildString(prefixFreePass, "} ");
	//prefix pass
	var vendor = goog.dom.vendor.getVendorPrefix()+"-";
	var prefixPass = goog.string.buildString("@", vendor, "keyframes ", this.model.uid, "_animation { \n");
	for (var i = 0; i < len; i++){
		var step = steps[i];
		var percent = (i / (len - 1))*100;
		var keyframe = goog.string.buildString(percent.toFixed(2), "% {", step.view.getKeyFrame(vendor), "} \n");
		prefixPass = goog.string.buildString(prefixPass, keyframe);
	}
	prefixPass = goog.string.buildString(prefixPass, "} \n");

	// var element = goog.cssom.addCssText(prefixPass);
	// 
	//make a style which has this animation
	var animation = goog.string.buildString(".animate_", this.model.uid, " { ", vendor, "animation: ", this.model.uid, "_animation ", "5s infinite linear; ");
	//add the unprefixed version
	animation = goog.string.buildString(animation, "animation: ", this.model.uid, "_animation ", "5s infinite linear; }\n");
	// goog.cssom.addCssText(TrajectoryView.StyleSheet, animation);
	// goog.dom.appendChild(element, animation);
	var animateStyle = goog.string.buildString(animation, " \n ", prefixPass , "\n");
	var element = goog.cssom.addCssText(animateStyle);
	goog.dom.setProperties(element, {"id" : "nononono"});
	return goog.string.buildString("animate_", this.model.uid);
}

TrajectoryView.prototype.disposeInternal = function(){
	this.model = null;
	goog.base(this, "disposeInternal");
}

/** 
	@type {CSSStyleSheet}
*/
TrajectoryView.StyleSheet = (function(){
	var stylesheets = goog.cssom.getAllCssStyleSheets();
	for (var i = 0; i < stylesheets.length; i++){
		var sheet = stylesheets[i];
		if (goog.cssom.getFileNameFromStyleSheet(sheet)==="animations.css"){
			return sheet;
		}
	}
}());