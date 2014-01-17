/*
* Ease
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

goog.provide("Animation.Easing");

goog.require('goog.fx.easing');

/**
 * alias
 */
Animation.Easing.easeIn = goog.fx.easing.easeIn;


/**
 * alias
 */
Animation.Easing.easeOut = goog.fx.easing.easeOut;


/**
 * alias
 */
Animation.Easing.inAndOut = goog.fx.easing.inAndOut;

/**
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 */
Animation.Easing.bounceIn = function(t) {
	return 1-Animation.Easing.bounceOut(1-t);
}

/**
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 */
Animation.Easing.bounceOut = function(t) {
	if (t < 1/2.75) {
		return (7.5625*t*t);
	} else if (t < 2/2.75) {
		return (7.5625*(t-=1.5/2.75)*t+0.75);
	} else if (t < 2.5/2.75) {
		return (7.5625*(t-=2.25/2.75)*t+0.9375);
	} else {
		return (7.5625*(t-=2.625/2.75)*t +0.984375);
	}
}

Animation.Easing.backOut = function(t){
	var amount = 1.4;
	return (--t*t*((amount+1)*t + amount) + 1);
}

Animation.Easing.backIn = function(t){
	var amount = 1.4;
	return t*t*((amount+1)*t-amount);
}