/*=============================================================================
STEREO DELAY
=============================================================================*/

goog.provide("Synthesizer.StereoDelay");

goog.require("Synthesizer.FeedbackDelay");

/** 
	@constructor
    @param {AudioContext} audioContext
    @param {GridAudio} gridAudio
*/
Synthesizer.StereoDelay = function(audioContext, gridAudio){
	/** @private 
		@type {AudioContext} */	
	this.audioContext = audioContext;
	/** @type {GainNode} */
	this.input = gridAudio.createGain();
	/** @type {GainNode} */
	this.output = gridAudio.createGain();
	/** @type {AudioChannelSplitter} */
	this.splitter = audioContext.createChannelSplitter(2);
	/** @type {AudioChannelMerger} */
	this.merger = audioContext.createChannelMerger(2);
	/** @type {Synthesizer.FeedbackDelay} */
	this.leftDelay = new Synthesizer.FeedbackDelay(audioContext, gridAudio);
	/** @type {Synthesizer.FeedbackDelay} */
	this.rightDelay = new Synthesizer.FeedbackDelay(audioContext, gridAudio);
	/** @type {DelayNode} */
	this.initialDelay = gridAudio.createDelay(2);
	/** @private
		@type {BiquadFilterNode} */
	this.filter = gridAudio.createFilter();
	this.filter.type = this.filter.HIGHPASS;
	this.filter.frequency.value = 800;

	this.input.connect(this.leftDelay.input);
	this.input.connect(this.rightDelay.input);
	this.leftDelay.output.connect(this.merger, 0, 0);
	this.rightDelay.output.connect(this.merger, 0, 1);

	//output
	this.merger.connect(this.output);
}

/** 
	@param {number} time
*/
Synthesizer.StereoDelay.prototype.delayTime = function(time){
	this.leftDelay.delayTime(time * 2);
	this.rightDelay.delayTime(time * 2);
	this.leftDelay.initialDelayTime(time);
	// this.initialDelay.delayTime.value = time;
}