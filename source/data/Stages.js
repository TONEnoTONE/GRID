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
		name : "Techno Fun",
		layout : [	
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1]
			],
		bpm : 120,
		levels : [
			{
			name : "1",
			samples : {
				"red" : AudioBuffers.kick808,
				"green" : AudioBuffers.snare808,
				"blue" : AudioBuffers.hh808,
				"click" : AudioBuffers.cow808,
			},
			//the pattern for this puzzle
			pattern : ["red", "rest", "green", "rest"],
			//the pieces allotted
			pieces : ["red", "red", "green", "blue", "blue"],
			countIn : 16,
			},
			{
			name : "2",
			samples : {
				"red" : AudioBuffers.kick808,
				"green" : AudioBuffers.snare808,
				"blue" : AudioBuffers.hh808,
				"click" : AudioBuffers.cow808,
			},
			//the pattern for this puzzle
			pattern : ["red", "rest", ["green", "red"], "rest"],
			//the pieces allotted
			pieces : ["red", "red", "green", "blue", "blue"],
			countIn : 16,
			},
			{
			name : "3",
			samples : {
				"red" : AudioBuffers.kick808,
				"green" : AudioBuffers.snare808,
				"blue" : AudioBuffers.hh808,
				"click" : AudioBuffers.cow808,
			},
			//the pattern for this puzzle
			pattern : ["red", "blue", ["green", "red"], "rest"],
			//the pieces allotted
			pieces : ["red", "red", "green", "blue", "blue"],
			countIn : 8,
			},
			{
			name : "4",
			samples : {
				"red" : AudioBuffers.kick808,
				"green" : AudioBuffers.snare808,
				"blue" : AudioBuffers.hh808,
				"click" : AudioBuffers.cow808,
			},
			//the pattern for this puzzle
			pattern : ["red", "blue", ["green", "red"], "blue"],
			//the pieces allotted
			pieces : ["red", "red", "green", "blue", "blue"],
			countIn : 8,
			},
		]
	},
	{
		name : "Sins u ben gawn",
		samples : {
			"red" : AudioBuffers.kick808,
			"green" : AudioBuffers.snare808,
			"blue" : AudioBuffers.hh808,
			"click" : AudioBuffers.cow808,
		},
		layout : [	
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1]
			],
		bpm : 120,
		levels : [
			{
			name : "1",
			//the pattern for this puzzle
			pattern : ["red", "rest", "green", "rest"],
			//the pieces allotted
			pieces : ["red", "red", "green", "blue", "blue"],
			countIn : 16,
			},
			{
			name : "2",
			//the pattern for this puzzle
			pattern : ["red", "rest", ["green", "red"], "rest"],
			//the pieces allotted
			pieces : ["red", "red", "green", "blue", "blue"],
			countIn : 16,
			},
			{
			name : "3",
			//the pattern for this puzzle
			pattern : ["red", "blue", ["green", "red"], "rest"],
			//the pieces allotted
			pieces : ["red", "red", "green", "blue", "blue"],
			countIn : 8,
			},
			{
			name : "3",
			//the pattern for this puzzle
			pattern : ["red", "blue", ["green", "red"], "blue"],
			//the pieces allotted
			pieces : ["red", "red", "green", "blue", "blue"],
			countIn : 8,
			},
		]
	}
];