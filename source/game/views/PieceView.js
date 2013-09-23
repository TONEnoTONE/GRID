goog.provide("game.views.PieceView");

goog.require("goog.events");
goog.require("goog.dom");


var PieceView = function(model){
	/** @type {Piece} */
	this.model = model;
	/** @type {Element}*/
	this.Element = goog.dom.createDom("div", {"class" : "PieceView"});
}

/** 
	does some tear down when object is destroyed to prevent memory leaks
*/
PieceView.prototype.destroy = function(){
	this.model = null;
}

/** 
	updates all the parameters of the view
*/
PieceView.prototype.render  = function(){

}

PieceView.prefix = (function () {
	var styles = window.getComputedStyle(document.documentElement, ''),
	pre = (Array.prototype.slice
	  .call(styles)
	  .join('') 
	  .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
	)[1],
	dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
	return {
		dom: dom,
		lowercase: pre,
		css: '-' + pre + '-',
		js: pre[0].toUpperCase() + pre.substr(1)
	};
})();