/*===============================================================================================================================
 ___      _______  _______  ______   ___   __    _  _______    __   __  _______  __    _  _______  _______  _______  ______   
|   |    |       ||   _   ||      | |   | |  |  | ||       |  |  |_|  ||   _   ||  |  | ||   _   ||       ||       ||    _ |  
|   |    |   _   ||  |_|  ||  _    ||   | |   |_| ||    ___|  |       ||  |_|  ||   |_| ||  |_|  ||    ___||    ___||   | ||  
|   |    |  | |  ||       || | |   ||   | |       ||   | __   |       ||       ||       ||       ||   | __ |   |___ |   |_||_ 
|   |___ |  |_|  ||       || |_|   ||   | |  _    ||   ||  |  |       ||       ||  _    ||       ||   ||  ||    ___||    __  |
|       ||       ||   _   ||       ||   | | | |   ||   |_| |  | ||_|| ||   _   || | |   ||   _   ||   |_| ||   |___ |   |  | |
|_______||_______||__| |__||______| |___| |_|  |__||_______|  |_|   |_||__| |__||_|  |__||__| |__||_______||_______||___|  |_|
=============================================================================================================================== */


goog.provide("states.LoadingManager");

var LoadingManager = {
	
	/** initializer */
	initialize : function(){
		
	},
	
	/** 
		@param {function()} cb
	*/
	loadApp : function(cb){
		var t=setTimeout(function(){cb()},1500)
	}
};
LoadingManager.initialize();