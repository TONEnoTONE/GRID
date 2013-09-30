/*=============================================================================
 _______  __   __  _______  _______  _______  ______    _______ 
|  _    ||  | |  ||       ||       ||       ||    _ |  |       |
| |_|   ||  | |  ||    ___||    ___||    ___||   | ||  |  _____|
|       ||  |_|  ||   |___ |   |___ |   |___ |   |_||_ | |_____ 
|  _   | |       ||    ___||    ___||    ___||    __  ||_____  |
| |_|   ||       ||   |    |   |    |   |___ |   |  | | _____| |
|_______||_______||___|    |___|    |_______||___|  |_||_______|

a mapping of names to buffers
=============================================================================*/

goog.provide("data.AudioBuffers");

goog.require("managers.LoadingManager");

/** 
	@typedef {Object}
	@dict
*/
var AudioBuffers = {
	//808!
	"kick808" : "kick808.mp3",
	"snare808" : "snare808.mp3",
	"hh808" : "hh808.mp3",
};

//load all the buffers
(function(){
	for (var sampleName in AudioBuffers){
		var file = "./assets/audio/"+AudioBuffers[sampleName]
		LoadingManager.loadAudio(file, function(){
			//some closure so that the buffer gets mapped to the right samplename
			var sample = sampleName;
			return function(buffer){
				AudioBuffers[sample] = buffer;
			}
		}());
	}
}());