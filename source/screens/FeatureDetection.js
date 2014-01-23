/*=============================================================================
FEATURE DETECTION

makes sure that the browser has all of the features needed to play the game
=============================================================================*/

goog.provide("FeatureDetection");

var FeatureDetection = {
	/** 
		@returns {boolean} true if it has all of the features for the app
	*/
	hasNeededFeatures : function(){
		return Modernizr.webaudio && 
			Modernizr.opacity && 
			Modernizr.localstorage &&
			Modernizr.csstransitions && 
			Modernizr.csstransforms3d && 
			Modernizr.csstransforms && 
			Modernizr.canvas && 
			Modernizr.cssanimations &&
      Modernizr.fontface;
	}
}
