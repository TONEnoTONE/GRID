/*=============================================================================

 _______  ______    ___   ______     _______  __   __  ______   ___   _______ 
|       ||    _ |  |   | |      |   |   _   ||  | |  ||      | |   | |       |
|    ___||   | ||  |   | |  _    |  |  |_|  ||  | |  ||  _    ||   | |   _   |
|   | __ |   |_||_ |   | | | |   |  |       ||  |_|  || | |   ||   | |  | |  |
|   ||  ||    __  ||   | | |_|   |  |       ||       || |_|   ||   | |  |_|  |
|   |_| ||   |  | ||   | |       |  |   _   ||       ||       ||   | |       |
|_______||___|  |_||___| |______|   |__| |__||_______||______| |___| |_______|

setups up the context

=============================================================================*/

goog.provide("audio.Audio");

/** 
	@typedef {Object}
*/
var GridAudio = {
	/** @type {AudioContext} */
	Context : null,
	/** @private */
	initialize : function(){
		if (goog.isDef(window.AudioContext)){
			GridAudio.Context = new AudioContext();
		} else if (goog.isDef(window.webkitAudioContext)){
			GridAudio.Context = new webkitAudioContext();
		} else {
			throw Error("cannot create AudioContext");
		}
	}
};

GridAudio.initialize();