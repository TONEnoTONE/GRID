goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');

goog.require("data.Const");

goog.require('screens.ScreenController'); 
goog.require('screens.views.SplashScreen'); 
goog.require('screens.views.SongsScreen'); 

function testShowHideScreens(){
	// // SplashScreen
	// ScreenController.showScreen(CONST.APPSTATES.SCREEN_SPLASH);	// show
	// chai.expect(SplashScreen.div.style.display).to.be.equal('');
	// ScreenController.hideScreen(CONST.APPSTATES.SCREEN_SPLASH);	// hide
	// chai.expect(SplashScreen.div.style.display).to.be.equal('none');
	
	// // SongsScreen
	// ScreenController.showScreen(CONST.APPSTATES.SCREEN_SONGS);	// show
	// chai.expect(SongsScreen.div.style.display).to.be.equal('');
	// ScreenController.hideScreen(CONST.APPSTATES.SCREEN_SONGS);	// hide
	// chai.expect(SongsScreen.div.style.display).to.be.equal('none');
}