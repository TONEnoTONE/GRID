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

goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.events.BrowserEvent");
goog.require("goog.events.EventHandler");
goog.require('goog.events.KeyHandler');

var Drawer =  {
	/** @private @type {Element} */
	div : GridDom.Drawer,
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
		//Drawer.songButtonsDiv = goog.dom.createDom('div', { 'id': 'SongButtons' });

		// make the buttons
		//Drawer.makeDrawerButtons();
		
		// draw the sucker
		goog.dom.appendChild(Drawer.div, Drawer.drawerButtonsContainer);
		//goog.dom.appendChild(SongsScreen.songButtonContainer, SongsScreen.songButtonsDiv);
		

	},
	/** 
		Shows the screen
	*/
	show : function(){
		goog.dom.classes.add(Drawer.div, "visible");
		goog.style.setElementShown(Drawer.div, true);
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