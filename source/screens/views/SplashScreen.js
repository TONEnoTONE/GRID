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
goog.require("data.Const");
goog.require("managers.LoadingManager");

goog.require("goog.dom");
goog.require("goog.math");
goog.require("goog.style");
goog.require("goog.string");
goog.require("goog.events.BrowserEvent");
goog.require("goog.events.EventHandler");
goog.require("goog.fx.dom.FadeOut");
goog.require("goog.fx.dom.FadeIn");
goog.require("goog.fx.dom.Slide");
goog.require("FeatureDetection");

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
	copyright : null,
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
		if (!FeatureDetection.hasNeededFeatures()){
			//make a blocking screen
			var notSupported = goog.dom.createDom("div", {"id" : "BrowserNotSupported"}, "I'm sorry your device does not support all the features required by this game.");
			goog.dom.appendChild(SplashScreen.div, notSupported);
			//var slide = new goog.fx.dom.Slide(this.dialog, [0, 1000], [0, 70], 300, Animation.Easing.backOut);
			//slide.play();
		}
		// SplashScreen.addButton();
	},
	/** 
	gets the version from the loading manager
	@private
	*/
	getVersion : function(){
		var file = "./build/version.json";
		LoadingManager.loadJSON(file, function(versionInfo){
			var version= goog.string.buildString(CONST.APPVERSION, "(b", versionInfo["version"],")");
			console.log(goog.string.buildString("ECHO v",version));
			goog.dom.setTextContent(SplashScreen.versionDiv, version);
			//goog.dom.setTextContent(SplashScreen.copyright, "TONEnoTONE");
			//goog.dom.setTextContent(SplashScreen.commithashDiv, versionInfo["commithash"]);
		});

	},
	/** make the screen */
	makeScreen : function(){
		// draw the sucker
		//SplashScreen.copyright = goog.dom.createDom('div', { 'id': 'copyrightDiv' });
		SplashScreen.versionDiv = goog.dom.createDom('div', { 'id': 'versionDiv' }, "");
		goog.dom.appendChild(SplashScreen.div, SplashScreen.versionDiv);
		//goog.dom.appendChild(SplashScreen.div, SplashScreen.copyright);
		//goog.dom.appendChild(SplashScreen.div, SplashScreen.commithashDiv);
		//SplashScreen.commithashDiv = goog.dom.createDom('div', { 'id': 'commithashDiv' }, "");
	},
	/** 
		handle play button clicks
		@private
		@param {Button} playButton loadApp
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
	},
	/** 
		fade the button in when everything is loaded
	*/
	appLoaded : function(){
		//fade the button in 
		SplashScreen.addButton();
	},
	/** 
		adds the button 
	*/
	addButton : function(){
		var b = new Button("", SplashScreen.onPlayClick);
		goog.dom.appendChild(SplashScreen.div, b.Element);
		var anim = new goog.fx.dom.FadeIn(b.Element, 150);
		anim.play();
		// handle clicks
		goog.events.listen(anim, goog.fx.Transition.EventType.END, function(){
			SplashScreen.clickHandler = new goog.events.EventHandler();
			SplashScreen.clickHandler.listen(SplashScreen.div, [goog.events.EventType.TOUCHMOVE], SplashScreen.clicked);
		});
	}

};
SplashScreen.initialize();