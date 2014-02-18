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

goog.provide("audio.GridAudio");

goog.require("Synthesizer.FeedbackDelay");
goog.require("Synthesizer.StereoDelay");

/** 
	@typedef {Object}
*/
var GridAudio = {
	/** @type {boolean} */
	withCompressor : true,
	/** @type {AudioContext} */
	Context : null,
	/** @type {GainNode} */
	output : null,
	/** @type {GainNode} */
	dry : null,
	/** @type {Synthesizer.StereoDelay} */
	delay : null,
	/** @type {DynamicsCompressorNode | GainNode} */
	compressor : null,
	/** initializer */
	initialize : function(){
		if (goog.isDef(goog.global["AudioContext"])){
			GridAudio.Context = new AudioContext();
		} else if (goog.isDef(goog.global["webkitAudioContext"])){
			GridAudio.Context = new webkitAudioContext();
		} else {
			console.log("could not create Audio Context");
			return;
		}
		if (GridAudio.withCompressor){
			GridAudio.compressor = GridAudio.Context.createDynamicsCompressor();
			GridAudio.compressor.threshold.value = -20;
		} else {
			GridAudio.compressor = GridAudio.createGain();
		}
		GridAudio.output = GridAudio.createGain(),
		GridAudio.dry = GridAudio.createGain(),
		GridAudio.delay = new Synthesizer.StereoDelay(GridAudio.Context, GridAudio);
		//connect it up
		//output -> delay -> destination
		GridAudio.output.connect(GridAudio.delay.input);
		GridAudio.delay.output.connect(GridAudio.compressor);
		//dry -> destination
		GridAudio.dry.connect(GridAudio.compressor);
		GridAudio.compressor.connect(GridAudio.Context.destination);
	},
	/** 
		@returns {GainNode}
	*/
	createGain : function(){
		if (goog.isFunction(GridAudio.Context.createGain)){
			return GridAudio.Context.createGain();
		} else {
			return GridAudio.Context.createGainNode();
		}
	},
	/** 
		@returns {DelayNode}
	*/
	createDelay : function(){
		if (goog.isFunction(GridAudio.Context.createGain)){
			return GridAudio.Context.createDelay();
		} else {
			return GridAudio.Context.createDelayNode();
		}
	},
	/** 
		@returns {BiquadFilterNode}
	*/
	createFilter : function(){
		return GridAudio.Context.createBiquadFilter();
	}
};

GridAudio.initialize();