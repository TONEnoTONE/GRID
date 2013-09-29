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
goog.require("screens.views.GridDom");
goog.require("goog.dom");
goog.require("goog.dom.vendor");

/** 
	@constructor
	@extends {goog.Disposable}
*/
var TrajectoryView = function(model){
	goog.base(this);
	/** @private 
		@type {Trajectory} */
	this.model = model;
	/** the element that the animation definitions gets placed in
		@type {Element} */
	this.style = goog.dom.createDom("style", {"id" : "animStyle_"+model.uid});
	/** @type {string} */
	this.animationName = "animation_"+model.uid;
	/** @type {string} */
	this.animationClass = "animate_"+model.uid;
	//add the animation to the dom
	goog.dom.appendChild(GridDom.AnimationStyles, this.style);
}

goog.inherits(TrajectoryView, goog.Disposable);


/** 
	@param {Array.<TrajectoryStep>} steps
*/
TrajectoryView.prototype.generateCSS = function(steps){
	var vendor = goog.dom.vendor.getVendorPrefix()+"-";
	//the keyframes
	var keyframes = "";
	keyframes = goog.string.buildString(keyframes, this.generatePrefixKeyframesCSS("", steps));
	keyframes = goog.string.buildString(keyframes, this.generatePrefixKeyframesCSS(vendor, steps));
	//add it to the element
	goog.dom.setTextContent(this.style, keyframes);
}

/** 
	@returns {string}
*/
TrajectoryView.prototype.getAnimationDefinition = function(){
	var duration = "4s";
	return goog.string.buildString(this.animationName, " ", duration, " infinite linear;");
}

/** 
	@private
	@param {string} prefix
	@param {Array.<TrajectoryStep>} steps
	@return {string} 
*/
TrajectoryView.prototype.generatePrefixKeyframesCSS = function(prefix, steps){
	var cssKeyframes = goog.string.buildString("@", prefix, "keyframes ", this.animationName," { \n");
	var len = steps.length;
	for (var i = 0; i < len; i++){
		var step = steps[i];
		var percent = (i / (len - 1))*100;
		var keyframe = goog.string.buildString(percent.toFixed(2), "% {", step.view.getKeyFrame(prefix), "} \n");
		cssKeyframes = goog.string.buildString(cssKeyframes, keyframe);
	}
	cssKeyframes = goog.string.buildString(cssKeyframes, "} \n");
	//make the class which includes the 
	return cssKeyframes;
}

/** 
	@private
	@param {string} prefix
	@return {string}
*/
TrajectoryView.prototype.generatePrefixClass = function(prefix){
	var duration = "4s";
	//define the class
	var classDef = goog.string.buildString(".", this.animationClass, " {\n");
	//add the prefixed/normal animation definition
	classDef = goog.string.buildString(classDef, "animation: ", this.animationName, " ", duration, " infinite linear; \n");
	classDef = goog.string.buildString(classDef, prefix, "animation: ", this.animationName, " ", duration, " infinite linear; \n");
	//close the classdef
	classDef = goog.string.buildString(classDef, "} \n");
	return classDef;
}

/** 
	clears the css which was generated
*/
TrajectoryView.prototype.clear = function(){
	goog.dom.setTextContent(this.style, " ");
}

/** 
	@override
*/
TrajectoryView.prototype.disposeInternal = function(){
	//remove the Element from the DOM
	goog.dom.removeChildren(this.style);
	goog.dom.removeNode(this.style);
	this.style = null;
	this.model = null;
	goog.base(this, "disposeInternal");
}
