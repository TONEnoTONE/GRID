/*=============================================================================
 _______  _______  _______  _______  _______  _______ 
|       ||       ||   _   ||       ||       ||       |
|  _____||_     _||  |_|  ||    ___||    ___||  _____|
| |_____   |   |  |       ||   | __ |   |___ | |_____ 
|_____  |  |   |  |       ||   ||  ||    ___||_____  |
 _____| |  |   |  |   _   ||   |_| ||   |___  _____| |
|_______|  |___|  |__| |__||_______||_______||_______|

=============================================================================*/

goog.provide("data.Stages");

goog.require("data.AudioBuffers");
goog.require("data.PieceType");

/** @const */
var Stages = [
	{
		name : "Techno Tone",
		layout : [	
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1]
			],
		bpm : 120,
		genre : "dance",
		//the pieces allotted
		pieces : ["red", "red", "green", "blue", "blue"],
		levels : [
			{
			name : "1",
			samples : {
				"red" : AudioBuffers.kick808,
				"green" : AudioBuffers.snare808,
				"blue" : AudioBuffers.hh808,
			},
			//the pattern for this puzzle
			pattern : ["red", "rest", "green", "rest"],
			countIn : 16,
			},
			{
			name : "2",
			samples : {
				"red" : AudioBuffers.kick808,
				"green" : AudioBuffers.snare808,
				"blue" : AudioBuffers.hh808,
			},
			//the pattern for this puzzle
			pattern : ["red", "rest", ["green", "red"], "rest"],
			countIn : 16,
			},
			{
			name : "3",
			samples : {
				"red" : AudioBuffers.kick808,
				"green" : AudioBuffers.snare808,
				"blue" : AudioBuffers.hh808,
			},
			//the pattern for this puzzle
			pattern : ["red", "blue", ["green", "red"], "rest"],

			countIn : 8,
			},
			{
			name : "4",
			samples : {
				"red" : AudioBuffers.kick808,
				"green" : AudioBuffers.snare808,
				"blue" : AudioBuffers.hh808,
				"end" : AudioBuffers.kick808,
			},
			//the pattern for this puzzle
			pattern : ["red", "blue", ["green", "red"], "blue"],
			countIn : 8,
			},
		]
	},
	{
		name : "No Surprises",
		layout : [	
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1]
			],
		bpm : 76,
		genre : "rock",
		//the pieces allotted
		pieces : ["red", "green", "blue", "purple", "blue"],
		levels : [
			{
			name : "1",
			repeat : 3,
			samples : {
				"red" : AudioBuffers.nosur_A,
				"green" : AudioBuffers.nosur_F,
				"blue" : AudioBuffers.nosur_C,
			},
			//the pattern for this puzzle
			pattern : ["red", "blue", "green", "blue"],
			countIn : 8,
			},
			{
			name : "2",
			samples : {
				"red" : AudioBuffers.nosur_G,
				"green" : AudioBuffers.nosur_F,
				"blue" : AudioBuffers.nosur_Db,
				"purple" : AudioBuffers.nosur_Bb,
			},
			//the pattern for this puzzle
			pattern : ["purple", "blue", "green", "red"],
			countIn : 8,
			},
			{
			name : "3",
			repeat : 3,
			samples : {
				"red" : AudioBuffers.nosur_A,
				"green" : AudioBuffers.nosur_F,
				"blue" : AudioBuffers.nosur_C,
				"purple" : AudioBuffers.nosur_BassF
			},
			//the pattern for this puzzle
			pattern : [["red", "purple"], "blue", "green", "blue"],
			countIn : 4,
			},
			{
			name : "4",
			samples : {
				"red" : AudioBuffers.nosur_G,
				"green" : AudioBuffers.nosur_F,
				"blue" : AudioBuffers.nosur_Db,
				"purple" : AudioBuffers.nosur_Bb,
				"yellow" : AudioBuffers.nosur_BassBb,
				"end" : AudioBuffers.nosur_A,
			},
			//the pattern for this puzzle
			pattern : [["purple", "yellow"], "blue", "green", "red"],
			countIn : 4,
			}
		]
	}
];