goog.provide("RequestAnimationFrame");

/**
* requirejs version of Paul Irish's RequestAnimationFrame
* http://paulirish.com/2011/requestanimationframe-for-smart-animating/
*/

window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback, element) {
  window.setTimeout(callback, 1000 / 60);
};