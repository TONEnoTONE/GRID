/*=============================================================================================================
 _______  _______  ___      _______  _______  __   __    _______  _______  ______    _______  _______  __    _ 
|       ||       ||   |    |   _   ||       ||  | |  |  |       ||       ||    _ |  |       ||       ||  |  | |
|  _____||    _  ||   |    |  |_|  ||  _____||  |_|  |  |  _____||       ||   | ||  |    ___||    ___||   |_| |
| |_____ |   |_| ||   |    |       || |_____ |       |  | |_____ |       ||   |_||_ |   |___ |   |___ |       |
|_____  ||    ___||   |___ |       ||_____  ||       |  |_____  ||      _||    __  ||    ___||    ___||  _    |
 _____| ||   |    |       ||   _   | _____| ||   _   |   _____| ||     |_ |   |  | ||   |___ |   |___ | | |   |
|_______||___|    |_______||__| |__||_______||__| |__|  |_______||_______||___|  |_||_______||_______||_|  |__|

==============================================================================================================*/

goog.provide("screens.views.SplashScreen");
goog.require("screens.views.GridDom");
goog.require("screens.views.Button");
goog.require("managers.LoadingManager");

goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.string");
goog.require("goog.events.BrowserEvent");
goog.require("goog.events.EventHandler");

var SplashScreen = {
	/** 
	@private
	@type {Element} 
	*/
	div : GridDom.SplashScreen,
	/** 
	@private
	@type {Element} 
	*/
	versionDiv : null,
	/** 
	@private
	@type {Element} 
	*/
	commithashDiv : null,
	
	/** initializer */
	initialize : function(){
		SplashScreen.getVersion();
		SplashScreen.makeScreen();
		SplashScreen.hideScreen();
	},
	/** 
	gets the version from the loading manager
	@private
	*/
	getVersion : function(){
		var file = "./build/version.json";
		LoadingManager.loadJSON(file, function(versionInfo){
			goog.dom.setTextContent(SplashScreen.versionDiv, goog.string.buildString(versionInfo["version"],".", versionInfo["commithash"]));

			//goog.dom.setTextContent(SplashScreen.commithashDiv, versionInfo.commithash);
		});
	},
	/** make the screen */
	makeScreen : function(){
		var gridBubble = "\n" +
" ______    _______  _______  ___      _______  _______  _______ \n" +
"|    _ |  |       ||       ||   |    |       ||       ||       |\n" +
"|   | ||  |    ___||    ___||   |    |    ___||       ||_     _|\n" +
"|   |_||_ |   |___ |   |___ |   |    |   |___ |       |  |   |  \n" +
"|    __  ||    ___||    ___||   |___ |    ___||      _|  |   |  \n" +
"|   |  | ||   |___ |   |    |       ||   |___ |     |_   |   |  \n" +
"|___|  |_||_______||___|    |_______||_______||_______|  |___|  \n";


		// holder for the song buttons
		var  gridBubbleDiv = goog.dom.createDom('pre', { 'id': 'gridBubbleDiv' }, gridBubble);
		SplashScreen.versionDiv = goog.dom.createDom('div', { 'id': 'versionDiv' }, "");
		//SplashScreen.commithashDiv = goog.dom.createDom('div', { 'id': 'commithashDiv' }, "");
		var b = new Button("PLAY", SplashScreen.onPlayClick);
		
		// draw the sucker
		goog.dom.appendChild(SplashScreen.div, gridBubbleDiv);
		goog.dom.appendChild(SplashScreen.div, b.Element);
		goog.dom.appendChild(SplashScreen.div, SplashScreen.versionDiv);
		//goog.dom.appendChild(SplashScreen.div, SplashScreen.commithashDiv);

		// handle clicks
		SplashScreen.clickHandler = new goog.events.EventHandler();
		SplashScreen.clickHandler.listen(SplashScreen.div, [goog.events.EventType.TOUCHMOVE], SplashScreen.clicked, true, SplashScreen);
	},
	/** 
		handle play button clicks
		@private
		@param {Button} playButton 
	*/
	onPlayClick : function(playButton){
		AppState.fsm["showsongs"]();
	},
	/** 
		click handler 
		@param {goog.events.BrowserEvent} e
	*/
	clicked : function(e){
		e.preventDefault();
	},
	/** Show the screen */
	showScreen : function(){
		goog.style.setElementShown(SplashScreen.div, true);
	},

	/** Hides the screen */
	hideScreen : function(){
		goog.style.setElementShown(SplashScreen.div, false);
	}

};
SplashScreen.initialize();