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

//goog.require("screens.views.GridDom");
goog.require("screens.views.Button");
goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.Disposable");
goog.require("goog.dom");
goog.require("goog.events.EventHandler");


/** 
	@constructor
	@extends {goog.Disposable}
*/
var TopNav = function () {
	goog.base(this);

	/** @type {Element} */
	this.Element = null;
	/** @type {Button} */
	this.leftButton = null;
	/** @type {Element} */
	this.navTitle = null;
	/** @type {Button} */
	this.rightButton = null;

	this.makeTopNav();
};

goog.inherits(TopNav, goog.Disposable);

/** 
	@private 
*/
TopNav.prototype.makeTopNav = function(){
	// the containing element
	this.Element = goog.dom.createDom("div", {"id" : "TopNav"} );
	// Left Button
	var leftButtonContainer = goog.dom.createDom('div', { 'class': 'ButtonContainer' });
	this.leftButton = new Button("", this.onTapNavClick, "BackButton");
	//this.leftButton = new Button("GRID", this.onTapNavClick);
	
	// Title
	this.navTitle = goog.dom.createDom('div', { 'id': 'Title' }, "unGRID");
	
	// Right Button
	var rightButtonContainer = goog.dom.createDom('div', { 'class': 'ButtonContainer' });
	this.rightButton = new Button("GRID", this.onTapNavClick);
	//this.rightButton = new Button("", this.onTapNavClick, "BackButton");

	goog.dom.appendChild(this.Element, leftButtonContainer);
	goog.dom.appendChild(leftButtonContainer, this.leftButton.Element);

	goog.dom.appendChild(this.Element, this.navTitle);

	goog.dom.appendChild(this.Element, rightButtonContainer);
	goog.dom.appendChild(rightButtonContainer, this.rightButton.Element);

	this.rightButton.hide();
	this.leftButton.hide();
},

/** 
	@private
	@param {Button} button 
*/
TopNav.prototype.onTapNavClick = function(button){
	// vatch all for clicking the top nav. generallt will not be used.
},

/** 
	@private
	@param {Button} button 
*/
TopNav.prototype.onButtonClick = function(button){
	if ( button === this.leftButton ) {
		console.log("left button");
	} else {
		console.log("right button");
	}	
}

/** 
	setter for the left button text
	@param {string} text 
	@param {function(Button)} cb
 */
TopNav.prototype.setLeftButton = function(text, cb){
	this.leftButton.setText(text);
	this.leftButton.setCb(cb);
	this.leftButton.show();
}

/** 
	setter for the right button text
	@param {string} text 
	@param {function(Button)} cb
 */
TopNav.prototype.setRightButton = function(text, cb){
	this.rightButton.setText(text);
	this.rightButton.setCb(cb);
	this.rightButton.show();
}

/** 
	setter for the title 
	@param {string} text
*/
TopNav.prototype.title = function(text){
	this.navTitle.textContent = text;
}

/** Shows the screen */
TopNav.prototype.show = function(){
	goog.style.setElementShown(this.Element, true);
}
	/** Hides the screen */
TopNav.prototype.hide = function(){
	goog.style.setElementShown(this.Element, false);
}