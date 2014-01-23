/*=============================================================================

FEEDBACK DELAY

=============================================================================*/

goog.provide("Synthesizer.FeedbackDelay");

/** 
	@constructor
    @param {AudioContext} audioContext
    @param {GridAudio} gridAudio
*/
Synthesizer.FeedbackDelay = function(audioContext, gridAudio){
	/** @private 
		@type {AudioContext} */	
	this.audioContext = audioContext;
	/** @type {AudioGainNode} */
	this.input = gridAudio.createGain();
 	/** @private
		@type {AudioGainNode} */
	this.dry = gridAudio.createGain();
	/** @private
		@type {AudioGainNode} */
	this.wet = gridAudio.createGain();
	/** @private
		@type {AudioGainNode} */
	this.feedback = gridAudio.createGain();
	/** @type {AudioGainNode} */
	this.output = gridAudio.createGain();
	/** @private
		@type {DelayNode} */
	this.delay = audioContext.createDelay(2);
	//connect it all up
	//input -> dry -> output
	this.input.connect(this.dry);
	this.dry.connect(this.output);
	//input -> delay -> wet -> output
	this.input.connect(this.delay);
	this.delay.connect(this.wet);
	this.wet.connect(this.output);
	//delay -> feedback -> delay
	this.delay.connect(this.feedback);
	this.feedback.connect(this.delay);
	//set some initial values
	this.feedback.gain.value = .4;
	this.wet.gain.value = .01;
	this.delayTime(.25);
}

/** 
	@param {number} time
*/
Synthesizer.FeedbackDelay.prototype.delayTime = function(time){
	this.delay.delayTime.value = time;
}

/** 
	turns up the wet all the way to grab the incoming signal into the delay
	@param {number} value
*/
Synthesizer.FeedbackDelay.prototype.setWet = function(value){
	var now = this.audioContext.currentTime;
	var currentValue = this.wet.gain.value;
	this.wet.gain.setValueAtTime(currentValue, now);
	this.wet.gain.linearRampToValueAtTime(value, now + .01);
}


