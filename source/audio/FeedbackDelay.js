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
	/** @type {GainNode} */
	this.input = gridAudio.createGain();
 	/** @private
		@type {GainNode} */
	this.dry = gridAudio.createGain();
	/** @private
		@type {GainNode} */
	this.wet = gridAudio.createGain();
	/** @private
		@type {GainNode} */
	this.feedback = gridAudio.createGain();
	/** @type {GainNode} */
	this.output = gridAudio.createGain();
	/** @private
		@type {DelayNode} */
	this.delay = gridAudio.createDelay(2);
	/** @private
		@type {BiquadFilterNode} */
	this.filter = gridAudio.createFilter();
	this.filter.type = BiquadFilterNode.HIGHPASS;
	this.filter.frequency.value = 800;
	//connect it all up
	//input -> dry -> output
	this.input.connect(this.dry);
	this.dry.connect(this.output);
	//input -> delay -> wet -> output
	this.input.connect(this.delay);
	this.delay.connect(this.wet);
	this.wet.connect(this.output);
	//delay -> feedback -> highpass -> delay
	this.delay.connect(this.feedback);
	this.feedback.connect(this.filter);
	this.filter.connect(this.delay);
	//set some initial values
	this.feedback.gain.value = .4;
	this.wet.gain.value = .06;
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


