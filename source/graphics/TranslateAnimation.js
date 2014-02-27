/*=============================================================================
	TRANSLATING ANIMATION
=============================================================================*/

goog.provide("Animation.Translate");
goog.require("goog.fx.dom.PredefinedEffect");

/**
 * Creates an animation object that will slide an element from A to B.  (This
 * in effect automatically sets up the onanimate event for an Animation object)
 *
 * Start and End should be 2 dimensional arrays
 *
 * @param {Element} element Dom Node to be used in the animation.
 * @param {Array.<number>} start 2D array for start coordinates (X, Y).
 * @param {Array.<number>} end 2D array for end coordinates (X, Y).
 * @param {number} time Length of animation in milliseconds.
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1.
 * @extends {goog.fx.dom.PredefinedEffect}
 * @constructor
 */

 Animation.Translate = function(element, start, end, time, opt_acc){
	if (start.length != 2 || end.length != 2) {
		throw Error('Start and end points must be 2D');
	}
	goog.fx.dom.PredefinedEffect.apply(this, arguments);
};

goog.inherits(Animation.Translate, goog.fx.dom.PredefinedEffect);

/** @override */
Animation.Translate.prototype.updateStyle = function() {
	var transformString = goog.string.buildString("translate3d(", this.coords[0],"px, ", this.coords[1],"px, 0px)");
	goog.style.setStyle(this.element, {
		"transform" : transformString
	});
};