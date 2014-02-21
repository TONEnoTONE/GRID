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
		SplashScreen.makeScreen();
		SplashScreen.hideScreen();
		if (!FeatureDetection.hasNeededFeatures()){
			//make a blocking screen
			var notSupported = goog.dom.createDom("div", {"id" : "BrowserNotSupported"}, "I'm sorry your device does not support all the features required by this game.");
			goog.dom.appendChild(SplashScreen.div, notSupported);
			//var slide = new goog.fx.dom.Slide(this.dialog, [0, 1000], [0, 70], 300, Animation.Easing.backOut);
			//slide.play();
		}
		// for device tracking. keeping here commented out for now. refernce page: http://docs.phonegap.com/en/1.0.0/phonegap_device_device.md.html#Device
		var device = window["device"];
		if ( device ) {
			var deviceInfo= goog.string.buildString (
				" device.name: ", device.name,
				" device.phonegap: ", device.phonegap,
				" device.platform: ", device.platform,
				" device.uuid: ", device.uuid,
				" device.version: ", device.version
			);
	    	goog.dom.setTextContent(SplashScreen.commithashDiv, deviceInfo);
	    } else {
	    	//goog.dom.setTextContent(SplashScreen.commithashDiv, "no device info");
	    }
	    
	},
	/** 
	gets the version from the loading manager
	@private
	*/
	showVersion : function(){
		var version = "";

		console.log("Version.releaseVersion [SplashScreen]: " + Version.releaseVersion);

		if ( Version.build == "") {
			version = Version.releaseVersion;
		} else {
			version = goog.string.buildString(Version.releaseVersion, " (b", Version.build,")");
		}
		
		console.log(goog.string.buildString("ECHO ",version));
		goog.dom.setTextContent(SplashScreen.versionDiv, version);
		//goog.dom.setTextContent(SplashScreen.copyright, "TONEnoTONE");
		//goog.dom.setTextContent(SplashScreen.commithashDiv, versionInfo["commithash"]);
	},
	/** make the screen */
	makeScreen : function(){
		// draw the sucker
		//SplashScreen.copyright = goog.dom.createDom('div', { 'id': 'copyrightDiv' });
		SplashScreen.versionDiv = goog.dom.createDom('div', { 'id': 'versionDiv' }, "");
		goog.dom.appendChild(SplashScreen.div, SplashScreen.versionDiv);
		//goog.dom.appendChild(SplashScreen.div, SplashScreen.copyright);
		SplashScreen.commithashDiv = goog.dom.createDom('div', { 'id': 'commithashDiv' }, "");
		goog.dom.appendChild(SplashScreen.div, SplashScreen.commithashDiv);
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
		// track that we are here
		ga_storage._trackEvent('Screen', 'shown', 'SplashScreen');

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

		// show build number
		SplashScreen.showVersion();
	},
	/** 
		adds the button 
	*/
	addButton : function(){
		var b = new Button("click to start", SplashScreen.onPlayClick);
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