/*========================================================
 ______   ______    _______  _     _  _______  ______   
|      | |    _ |  |   _   || | _ | ||       ||    _ |  
|  _    ||   | ||  |  |_|  || || || ||    ___||   | ||  
| | |   ||   |_||_ |       ||       ||   |___ |   |_||_ 
| |_|   ||    __  ||       ||       ||    ___||    __  |
|       ||   |  | ||   _   ||   _   ||   |___ |   |  | |
|______| |___|  |_||__| |__||__| |__||_______||___|  |_|

=========================================================*/

goog.provide("screens.views.Drawer");
goog.require("screens.views.Button");
goog.require("managers.Version");

goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.events.BrowserEvent");
goog.require("goog.events.EventHandler");
goog.require('goog.events.KeyHandler');

var Drawer =  {
	/** @private @type {Element} */
	div : GridDom.Drawer,
	/** @private @type {Element} */
	drawerButtonsContainer : null,
	/** @private @type {Element} */
	versionEl : null,
	/** initializer */
	initialize : function(){
		Drawer.makeDrawer();
		Drawer.hide();
	},
	/** 
	make the screen 
	@private
	**/
	makeDrawer : function() {
		// holder for the song buttons
		Drawer.drawerButtonsContainer = goog.dom.createDom('div', { 'id': 'DrawerButtonsContainer' });
		
		// make the buttons
		Drawer.makeDrawerButtons();

		// make the version on the bottom
		Drawer.makeVersionFooter();
		
		// draw the sucker
		goog.dom.appendChild(Drawer.div, Drawer.drawerButtonsContainer);
		//goog.dom.appendChild(SongsScreen.songButtonContainer, SongsScreen.songButtonsDiv);
		

	},
	/**
		Make the footer with the version

	*/
	makeVersionFooter : function() {
		Drawer.versionEl = goog.dom.createDom('div', { 'id': 'DrawerFooter' });
		goog.dom.appendChild(Drawer.div, Drawer.versionEl);
	},
	/**
		sets the version string
		@private
	*/
	setVersionText :  function() {
		goog.dom.setTextContent(Drawer.versionEl, Version.getVersionString());
	},
	/** 
		Make each button
		@private
	*/
	makeDrawerButton : function(text, cb, iconCSSClass) {
		var iconEl = goog.dom.createDom('div', { 'id': 'DrawerIcon', "class" : iconCSSClass });
		var textEl = goog.dom.createDom('div', { 'id': 'DrawerText' });
		goog.dom.setTextContent(textEl, text);

		var buttonContents = goog.dom.createDom('div', { 'id': 'DrawerButtonContents' });
		//var twitterButton = goog.dom.createDom('div', { 'id': 'DrawerButton' });
		goog.dom.appendChild(buttonContents, iconEl);
		goog.dom.appendChild(buttonContents, textEl);
		
		var twitterButton = new Button(buttonContents, cb, {"id" : "DrawerButton"});
		goog.dom.appendChild(Drawer.drawerButtonsContainer, twitterButton.Element);
	},
	/** 
		Make all the buttons
		@private
	*/
	makeDrawerButtons : function(){
		Drawer.makeDrawerButton('Help and Tips', Drawer.onHelpPress, 'fa fa-info');
		Drawer.makeDrawerButton('Contact Us', Drawer.onContactUsPress, 'fa fa-envelope');
		Drawer.makeDrawerButton('Twitter', Drawer.onTwitterPress, 'fa fa-twitter');
		Drawer.makeDrawerButton('Facebook', Drawer.onFacebookPress, 'fa fa-facebook-square');
	},
	
	

	/*******************************************************************
	/* INDIVIDUALL BUTTON CALLBACKS
	/*******************************************************************
	/** callback for the twitter button
		@private */
	onTwitterPress : function() {
		var ref = window.open('twitter://user?screen_name=tonenotone', '_blank', 'location=no,closebuttoncaption=<,toolbarposition=top');
		ref.show();
		//var ref = window.open(encodeURI('http://www.twitter.com/tonenotone/'), '_blank', 'location=yes');
	},
	/** callback for the facebook button
		@private */
	onFacebookPress : function() {
		//navigator.app.loadUrl('http://www.facebook.com/echomusicgame/', { openExternal:true });
		var ref = window.open(encodeURI('http://www.facebook.com/echomusicgame/'),'_system', 'location=no');
		ref.show();
	},
	/** callback for the contact us button
		@private */
	onContactUsPress : function() {
		var ref = window.open(encodeURI('https://docs.google.com/forms/d/1A-3R5MIHBsp-yeEf_oiln3T8kBYwOesGklvZ54QDUGw/viewform'), '_blank', 'location=yes');
		ref.show();
	},
	/** callback for the contact us button
		@private */
	onHelpPress : function() {
		var ref = window.open('http://support.tonenotone.com/echo/', '_blank', 'location=no');
		ref.show();
	},




	/** 
		Shows the screen
	*/
	show : function(){
		goog.dom.classes.add(Drawer.div, "visible");
		goog.style.setElementShown(Drawer.div, true);
		// brute force, but whateves. need to set up some sort of notif / subscribe system
		Drawer.setVersionText();
	},
	/** 
		Hides the screen
	*/
	hide : function(){
		goog.dom.classes.remove(Drawer.div, "visible");
		goog.style.setElementShown(Drawer.div, false);
	}
};
Drawer.initialize();