/*=======================================================
 _______  _______  _______  __    _  _______  __   __ 
|       ||       ||       ||  |  | ||   _   ||  | |  |
|_     _||   _   ||    _  ||   |_| ||  |_|  ||  |_|  |
  |   |  |  | |  ||   |_| ||       ||       ||       |
  |   |  |  |_|  ||    ___||  _    ||       ||       |
  |   |  |       ||   |    | | |   ||   _   | |     | 
  |___|  |_______||___|    |_|  |__||__| |__|  |___|  
=======================================================*/

goog.provide("screens.views.TopNav");

goog.require("screens.views.GridDom");
goog.require("screens.views.Button");
goog.require("goog.dom");
goog.require("goog.style");

/** 
	@typedef {Object}
*/
var TopNav = {
	/** @type {Element} */
	div : GridDom.TopNav,
	
	/** @private @type {Element} */
	leftButton : null,
	/** @private @type {Element} */
	navTitle : null,
	/** @private @type {Element} */
	rightButton : null,
	
	//initialize
	initialize : function(){
		TopNav.hide();
		TopNav.makeTopNav();
	},
	
	/** 
		@private 
	*/
	makeTopNav : function(){
		// Left Button
		TopNav.leftButton = new Button("GRID", TopNav.onLeftButton);
		// Title
		TopNav.navTitle = goog.dom.createDom('div', { 'id': 'Title' }, "unGRID");
		// Right Button
		TopNav.rightButton = new Button("GRID", TopNav.onRightButton);
		
		goog.dom.appendChild(TopNav.div, TopNav.leftButton.Element);
		goog.dom.appendChild(TopNav.div, TopNav.navTitle);
		goog.dom.appendChild(TopNav.div, TopNav.rightButton.Element);
	},
	
	/** 
		@private
		@param {Button} button 
	*/
	onButtonClick : function(button){
		if ( button === TopNav.leftButton ) {
			console.log("left button");
		} else {
			console.log("right button");
		}	
	},

	/** setter for the title */
	title : function(copy){
		TopNav.navTitle.text = copy;
	},

	/** Shows the screen */
	show : function(){
		goog.style.setElementShown(TopNav.div, true);
	},
	/** Hides the screen */
	hide : function(){
		goog.style.setElementShown(TopNav.div, false);
	},
};
TopNav.initialize();