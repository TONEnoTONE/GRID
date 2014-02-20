/*============================================================
 __   __  _______  ______    _______  ___   _______  __    _ 
|  | |  ||       ||    _ |  |       ||   | |       ||  |  | |
|  |_|  ||    ___||   | ||  |  _____||   | |   _   ||   |_| |
|       ||   |___ |   |_||_ | |_____ |   | |  | |  ||       |
|       ||    ___||    __  ||_____  ||   | |  |_|  ||  _    |
 |     | |   |___ |   |  | | _____| ||   | |       || | |   |
  |___|  |_______||___|  |_||_______||___| |_______||_|  |__|
=============================================================*/

goog.provide("managers.Version");

goog.require("managers.LoadingManager");

var Version = {
    /** @type {String} */
	releaseVersion : "",
	/** @type {String} */
	build : "",
	/** @type {String} */
	commit : "",
    /** initializer */
	initialize : function(){
		var file = "./build/version.json";
		
		LoadingManager.loadJSON(file, function(data){
			Version.releaseVersion 	= data["version"];
			Version.build 			= data["build"];
			Version.commit 			= data["commithash"];
		});
	},	
}
Version.initialize();