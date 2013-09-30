/*===============================================================================================================================
 ___      _______  _______  ______   ___   __    _  _______    __   __  _______  __    _  _______  _______  _______  ______   
|   |    |       ||   _   ||      | |   | |  |  | ||       |  |  |_|  ||   _   ||  |  | ||   _   ||       ||       ||    _ |  
|   |    |   _   ||  |_|  ||  _    ||   | |   |_| ||    ___|  |       ||  |_|  ||   |_| ||  |_|  ||    ___||    ___||   | ||  
|   |    |  | |  ||       || | |   ||   | |       ||   | __   |       ||       ||       ||       ||   | __ |   |___ |   |_||_ 
|   |___ |  |_|  ||       || |_|   ||   | |  _    ||   ||  |  |       ||       ||  _    ||       ||   ||  ||    ___||    __  |
|       ||       ||   _   ||       ||   | | | |   ||   |_| |  | ||_|| ||   _   || | |   ||   _   ||   |_| ||   |___ |   |  | |
|_______||_______||__| |__||______| |___| |_|  |__||_______|  |_|   |_||__| |__||_|  |__||__| |__||_______||_______||___|  |_|
=============================================================================================================================== */


goog.provide("managers.LoadingManager");

goog.require("goog.net.XhrManager");
goog.require("audio.Audio");

/** 
	@typedef {Object}
*/
var LoadingManager = {
	/** @private
		@type {number} */
	totalFiles : 0,
	/** @private
		@type {number} */
	loadedFiles : 0,
	/** @private
		@type {function() | null} */
	onloadcallback : null,
	/** @private 
		@type {goog.net.XhrManager} */
	manager : new goog.net.XhrManager(1, null, 1, 6),
	/** initializer */
	initialize : function(){
		
	},	
	/** 
		@param {function()} cb
	*/
	loadApp : function(cb){
		LoadingManager.onloadcallback = cb;
	}, 
	/** 
		@param {string} url of audio file
		@param {function(AudioBuffer)} callback invoked with an audio buffer
	*/
	loadAudio : function(url, callback){
		LoadingManager.totalFiles++;
		LoadingManager.manager.send(url, url, "GET", null, undefined, 1, function(e){
			// callback
			Audio.Context.decodeAudioData(e.target.getResponse(), function(b) {
				callback(b);
				LoadingManager.loadResolved();
			});
		}, 1, goog.net.XhrIo.ResponseType.ARRAY_BUFFER);
	},
	/** 
		@param {string} url of an image
		@param {function(Image)} callback invoked with an image
	*/
	loadImage : function(url, callback){
		LoadingManager.totalFiles++;
		var img = new Image();
		img.onload = function(){
			callback(img);
			LoadingManager.loadResolved();
		};
		img.src = url;
	},
	/** 
		@private
		call internally when a load is resolved to increment the loaded files
	*/
	loadResolved : function(){
		LoadingManager.loadedFiles++;
		if (LoadingManager.loadedFiles === LoadingManager.totalFiles){
			LoadingManager.allLoaded();
		}
	},
	/** 
		@private
		called when everything is loaded
		keeps trying to call the callback until one is available
	*/
	allLoaded : function(){
		//invoke the callback (if it's been assigned)
		if (LoadingManager.onloadcallback !== null){
			LoadingManager.onloadcallback();
		//otherwise set a timeout to try again in the future
		} else {
			setTimeout(function(){
				LoadingManager.allLoaded();
			}, 100);
		}
	}
};

LoadingManager.initialize();