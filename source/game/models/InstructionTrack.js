/*=============================================================================
 ___   __    _  _______  _______    _______  ______    _______  _______  ___   _ 
|   | |  |  | ||       ||       |  |       ||    _ |  |   _   ||       ||   | | |
|   | |   |_| ||  _____||_     _|  |_     _||   | ||  |  |_|  ||       ||   |_| |
|   | |       || |_____   |   |      |   |  |   |_||_ |       ||       ||      _|
|   | |  _    ||_____  |  |   |      |   |  |    __  ||       ||      _||     |_ 
|   | | | |   | _____| |  |   |      |   |  |   |  | ||   _   ||     |_ |    _  |
|___| |_|  |__||_______|  |___|      |___|  |___|  |_||__| |__||_______||___| |_|

=============================================================================*/

goog.provide("Instruction.Track");

// goog.require("Instruction.Model");
goog.require("goog.Disposable");
goog.require("game.controllers.AudioController");
goog.require("game.controllers.WallController");
goog.require("game.controllers.TileController");

/** 
	@constructor
	@extends {goog.Disposable};
*/
Instruction.Track = function(description){
	goog.base(this);
	/** @type {buffer} */
	this.player = new AudioPlayer(description.sample.buffer);
	/** @type {Array.<number>} */
	this.entrances = goog.array.clone(description.entrances);
	//this.entrances.sort();
	/** @type {PieceType} */
	this.type = PieceType.fromInstrument(description.instrument);
	/** @type {beat} */
	this.beat = description.beat;
	/** @type {number} */
	this.completed = 0;
	/** @type {Instruction.Model} */
	this.currentInstruction = null;
	/** @type {boolean} */
	this.validated = false;
	/** @type {boolean} */
	this.playing = false;
}

goog.inherits(Instruction.Track, goog.Disposable);

/** @override */
Instruction.Track.prototype.disposeInternal = function(){
	goog.base(this, "disposeInternal");
}

/** 
	play the instruction
*/
Instruction.Track.prototype.play = function(time){
	this.playing = true;
	this.player.playAtTime(time);
	//start at silent
	this.player.fadeTo(.01);
	//set hte start time
	this.startTime = new Date().getTime();
	//set a timeout to play the next entrance
	var nextInst = goog.bind(this.nextInstruction, this);
	var nextInstructionTime = AudioController.barsToSeconds(this.entrances[0]);
	this.entrances.shift();
	setTimeout(function(){
		nextInst();
	}, nextInstructionTime*1000);
}

/** 
	stop the instructions
*/
Instruction.Track.prototype.stop = function(){
	this.player.stop();
	this.playing = false;
	this.currentInstruction = null;
	this.validated = false;
	this.currentInstruction = null;
	this.entrances = [];
}

/** 
	visualize the next instruction
*/
Instruction.Track.prototype.nextInstruction = function(){
	if (!this.playing){
		return;
	}
	var duration = AudioController.beatsToSeconds(8)*1000;
	//pick a random instruction
	var instruction = Instruction.Controller.getInstance().getRandomInstruction(this.beat, this.type);
	this.currentInstruction = instruction;
	//visualize the walls
	WallController.flashDirection(instruction.direction, this.type, duration);
	//visualize the tiles
	TileController.flashJamPosition(instruction.position, this.type, duration);
	//set a timeout for verification
	var verify = goog.bind(goog.partial(this.verifyInstruction, instruction), this);
	setTimeout(function(){
		verify();
	}, duration);
}

/** 
	verify the instruction
	@param {Instruction.Model} instruction
	@param {Instruction.Track} self
*/
Instruction.Track.prototype.verifyInstruction = function(instruction){
	if (!this.playing){
		return;
	}
	this.currentInstruction = null;
	if (this.validated){
		//play the winner
		AudioController.win();
		this.validated = false;
		this.player.fadeTo(1);
		//step the piece forward
		var trajectory = TrajectoryController.getInstance().stepForward(instruction.position, instruction.direction, instruction.type);
		trajectory.stepForward();
		var steps = trajectory.getLength();
		//queue the wall hit
		setTimeout(function(){
			WallController.flashDirection(instruction.direction, instruction.type, AudioController.beatsToSeconds(1)*1000);
		}, AudioController.beatsToSeconds(steps)*1000);
		this.completed++;
	} else {
		this.player.fadeTo(.01);
	}
	//trigger the next instruction
	var entrance = this.entrances.shift();
	if (entrance){
		var timeTillNext = AudioController.barsToSeconds(entrance)*1000 - (new Date().getTime() - this.startTime);
		var nextInst = goog.bind(this.nextInstruction, this);
		setTimeout(function(){
			nextInst();
		}, timeTillNext);
	}
}