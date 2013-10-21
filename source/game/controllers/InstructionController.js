/*=============================================================================
 ___   __    _  _______  _______  ______    __   __  _______  _______  ___   _______  __    _  _______ 
|   | |  |  | ||       ||       ||    _ |  |  | |  ||       ||       ||   | |       ||  |  | ||       |
|   | |   |_| ||  _____||_     _||   | ||  |  | |  ||       ||_     _||   | |   _   ||   |_| ||  _____|
|   | |       || |_____   |   |  |   |_||_ |  |_|  ||       |  |   |  |   | |  | |  ||       || |_____ 
|   | |  _    ||_____  |  |   |  |    __  ||       ||      _|  |   |  |   | |  |_|  ||  _    ||_____  |
|   | | | |   | _____| |  |   |  |   |  | ||       ||     |_   |   |  |   | |       || | |   | _____| |
|___| |_|  |__||_______|  |___|  |___|  |_||_______||_______|  |___|  |___| |_______||_|  |__||_______|

=============================================================================*/

goog.provide("game.controllers.InstructionController");

goog.require("data.PieceType");
goog.require("data.Direction");
goog.require("game.controllers.WallController");
goog.require("game.controllers.StageController");
goog.require("game.views.InstructionView");

/** 
	@typedef {{
		type : PieceType,
		direction : Direction,
		position : !goog.math.Coordinate
	}}
*/
var Instruction;

/** 
	@typedef {Object}
*/
var InstructionController = {
	/** @type {Pattern} */
	pattern : null,
	/** @type {Array.<Instruction>} */
	instructions : [],
	/** @type {number} */
	progress : 0,
	//init
	initialize : function(){

	},
	/** 
		pulls the current level from the StageController
		@param {number} stage
		@param {number} level
	*/
	setStage : function(stage, level){
		//reset the old setup
		InstructionController.reset();
		//start a new one
		InstructionController.pattern = StageController.getPattern(stage, level);
	},
	/** 
		generates a set of instructions from the given pattern
		iterative backtracking to find a randomized solution
		which satisfies the given pattern
	*/
	generateInstructions : function(){

	},
	/** 
		@returns {Instruction} a random instruction which satisfies the direction / beat requirement
	*/
	randomInstruction : function(beat, type){
		
	},
	/** 
		remove the instructions
	*/
	reset : function(){
		InstructionController.progress = 0;
		for (var i = 0; i < InstructionController.instructions.length; i++){
			InstructionController.instructions[i] = null;
		}
		InstructionController.instructions = [];
	},
	/** 
		display the next instruction
	*/
	nextInstruction : function(){
		var instruction = InstructionController.instructions[InstructionController.progress];
		InstructionView.visualize(instruction);
		InstructionController.progress++;
	},
	/** 
		@returns {boolean} if the level is completed or not
	*/
	isCompleted : function(){
		return InstructionController.progress === InstructionController.instructions.length;
	},
	/** 
		@returns {boolean} true if the piece satisfies the current instruction
	*/
	pieceSatisfiesInstruction : function(piece, instruction){
		return goog.math.Coordinate.equals(piece.position, instruction.position) 
			&& piece.direction === instruction.direction
			&& piece.type === instruction.type;
	}
};

InstructionController.initialize();