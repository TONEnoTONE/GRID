/*==================================================================================
 _______  _______  __    _  _______  ___   _______        ______   _______  __   __ 
|       ||       ||  |  | ||       ||   | |       |      |      | |       ||  | |  |
|       ||   _   ||   |_| ||    ___||   | |    ___|      |  _    ||    ___||  |_|  |
|       ||  | |  ||       ||   |___ |   | |   | __       | | |   ||   |___ |       |
|      _||  |_|  ||  _    ||    ___||   | |   ||  | ___  | |_|   ||    ___||       |
|     |_ |       || | |   ||   |    |   | |   |_| ||   | |       ||   |___  |     | 
|_______||_______||_|  |__||___|    |___| |_______||___| |______| |_______|  |___|  
===================================================================================*/

goog.provide("data.Config");

/**	
	@typedef {Object}
*/
var CONFIG = {
	/** construct */
	initialize : function() {},

	/**
	@param {string} configType
	@returns {Object}
	*/
	ValueOf : function (configType) {
		return configType[CONFIG.PLATFORM];
	},

	/** 
	@const @private 
	@type {Object.<CONFIG.PLATFORMS, boolean>}
	*/
	SHOW_PHONE_WRAPPER : {
		"dev" : true,
		"iphone" : false
	}
};

/** 
@enum {string} 
*/
CONFIG.PLATFORMS = {
	DEV : "dev",
	IPHONE : "iphone"
};

/** @define {CONFIG.PLATFORMS} */
CONFIG.PLATFORM = "dev";

CONFIG.initialize();
