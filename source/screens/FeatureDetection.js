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
	},
	/** 
		reports the missing features to analytics
	*/
	reportMissingFeatures : function(){
		if (!Modernizr.webaudio){
			Analytics.trackEvent("error", "missing_feature", "webaudio");
		}
		if (!Modernizr.opacity){
			Analytics.trackEvent("error", "missing_feature", "opacity");
		}
		if (!Modernizr.localstorage){
			Analytics.trackEvent("error", "missing_feature", "localstorage");
		}
		if (!Modernizr.csstransitions){
			Analytics.trackEvent("error", "missing_feature", "csstransitions");
		}
		if (!Modernizr.csstransforms){
			Analytics.trackEvent("error", "missing_feature", "csstransforms");
		}
		if (!Modernizr.canvas){
			Analytics.trackEvent("error", "missing_feature", "canvas");
		}
		if (!Modernizr.cssanimations){
			Analytics.trackEvent("error", "missing_feature", "cssanimations");
		}
		if (!Modernizr.fontface){
			Analytics.trackEvent("error", "missing_feature", "fontface");
		}
	},
}
