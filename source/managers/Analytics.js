/*============================================================================
 _______  __    _  _______  ___      __   __  _______  ___   _______  _______ 
|   _   ||  |  | ||   _   ||   |    |  | |  ||       ||   | |       ||       |
|  |_|  ||   |_| ||  |_|  ||   |    |  |_|  ||_     _||   | |       ||  _____|
|       ||       ||       ||   |    |       |  |   |  |   | |       || |_____ 
|       ||  _    ||       ||   |___ |_     _|  |   |  |   | |      _||_____  |
|   _   || | |   ||   _   ||       |  |   |    |   |  |   | |     |_  _____| |
|__| |__||_|  |__||__| |__||_______|  |___|    |___|  |___| |_______||_______|
=============================================================================*/

goog.provide("managers.Analytics");

var Analytics = {
    /** initializer */
	initialize : function(){
		// Prod
		//ga_storage._setAccount('UA-47760090-1'); 
		
		// Staging
		//ga_storage._setAccount('UA-47760090-2');

		// Dev 
		ga_storage._setAccount('UA-47760090-3');  
    	ga_storage._setDomain('none');
    	ga_storage._trackPageview('Analytics.initialize');
	},	
}
Analytics.initialize();