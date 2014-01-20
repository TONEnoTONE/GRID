/*=============================================================================
 _______  __   __  __    _  _______  __   __ 
|       ||  | |  ||  |  | ||       ||  | |  |
|  _____||  |_|  ||   |_| ||_     _||  |_|  |
| |_____ |       ||       |  |   |  |       |
|_____  ||_     _||  _    |  |   |  |       |
 _____| |  |   |  | | |   |  |   |  |   _   |
|_______|  |___|  |_|  |__|  |___|  |__| |__|

=============================================================================*/

goog.provide("Synthesizer.NoiseFilter");


/** 
	@constructor
    @param {AudioContext} audioContext
*/
Synthesizer.NoiseFilter = function(audioContext){
    var lastOut = 0.0;
    this.brownNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
    this.brownNoise.onaudioprocess = function(e) {
        var output = e.outputBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            var white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; // (roughly) compensate for gain
        }
    }

	this.filter = audioContext.createBiquadFilter();
	this.brownNoise.connect(this.filter);
	this.filter.connect(audioContext.destination);
}

/** 
	@param {number=} time
*/
Synthesizer.NoiseFilter.prototype.noteOn = function(time){

}


/** 
	@param {number=} time
*/
Synthesizer.NoiseFilter.prototype.noteOff = function(){
	
}