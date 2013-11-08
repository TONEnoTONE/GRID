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
	this.entrances = description.entrances;
	this.entrances.sort();
	/** @type {PieceType} */
	this.type = PieceType.fromInstrument(description.instrument);
	/** @type {beat} */
	this.beat = description.beat;
	/** @type {number} */
	this.completed = 0;
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
	this.player.playAtTime(time);
	//start at silent
	this.player.fadeTo(.01);
	//set hte start time
	this.startTime = new Date().getTime();
	//set a timeout to play the next entrance
	var nextInst = goog.bind(this.nextInstruction, this);
	var nextInstructionTime = AudioController.barsToSeconds(this.entrances[0]);
	setTimeout(function(){
		nextInst();
	}, nextInstructionTime*1000);
}

/** 
	visualize the next instruction
*/
Instruction.Track.prototype.nextInstruction = function(){
	var duration = AudioController.beatsToSeconds(8)*1000;
	//pick a random instruction
	var instruction = this.randomInstruction(this.beat, this.type);
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
	var piece = PieceController.pieceAt(instruction.position);
	if (piece && piece.type === instruction.type && piece.direction === instruction.direction){
		this.player.fadeTo(1);
		//step the piece forward
		var trajectory = TrajectoryController.getInstance().stepForward(piece.position, piece.direction, piece.type);
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
	// var timeTilNext = 
}

/** 
	@returns {Instruction.Model} a random instruction which satisfies the beat/type requirement
*/
Instruction.Track.prototype.randomInstruction = function(beat, type){
	var direction = Direction.random();
	//var randomPosition = parseInt(Math.random()*CONST.BOARDDIMENTION.WIDTH, 10);
	var position = new goog.math.Coordinate(0, 0);
	//get a postioin which satisfies the beat
	switch(direction){
		case Direction.West:
			position.x = beat;
			position.y = parseInt(Math.random()*CONST.BOARDDIMENSION.HEIGHT, 10);
			break;
		case Direction.East:
			position.x = CONST.BOARDDIMENSION.WIDTH - beat - 1;
			position.y = parseInt(Math.random()*CONST.BOARDDIMENSION.HEIGHT, 10);
			break;
		case Direction.North:
			position.y = beat;
			position.x = parseInt(Math.random()*CONST.BOARDDIMENSION.WIDTH, 10);
			break;
		case Direction.South:
			position.y = CONST.BOARDDIMENSION.HEIGHT - beat - 1;
			position.x = parseInt(Math.random()*CONST.BOARDDIMENSION.WIDTH, 10);
			break;
	}
	return {
		direction : direction,
		position : position,
		type : type,
		beat : beat,
		countIn : this.countIn
	};
};