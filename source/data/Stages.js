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
		name : "Tutorial Beat",
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
			pattern : ["red", "rest", "rest", "rest"],
			//the pieces allotted
			pieces : ["red"]
			},
			{
			name : "2",
			//the pattern for this puzzle
			pattern : ["red", "rest", "rest", "rest"],
			//the pieces allotted
			pieces : ["red"]
			},
			{
			name : "3",
			//the pattern for this puzzle
			pattern : ["red", "rest", "green", "rest", "red", "rest", "green", "rest"],
			//the pieces allotted
			pieces : ["red", "green"]
			},
			{
			name : "4",
			//the pattern for this puzzle
			pattern : ["red", "red", "rest", "rest", "red", "red", "rest", "rest"],
			//the pieces allotted
			pieces : ["red", "red"]
			},
			{
			name : "5",
			pattern : ["red", "red", "green", "rest", "red", "red", "green", "rest"],
			//the pieces allotted
			pieces : ["red", "red", "green"]
			},
			{
			name : "6",
			//the pattern for this puzzle
			pattern : ["red", "rest", "green", "rest", "red", "rest", "green", "rest"],
			//the pieces allotted
			pieces : ["red", "green"]
			},
			{
			name : "7",
			//the pattern for this puzzle
			pattern : ["red", "red", "green", "rest", "red", "red", "green", "rest"],
			//the pieces allotted
			pieces : ["red", "red", "green"]
			},
			{
			name : "8",
			//the pattern for this puzzle
			pattern : ["rest", "rest", "green", "rest", "rest", "rest", "green", "rest"],
			//the pieces allotted
			pieces : ["green"]
			}
		]
	},
	{
		name : "Jam",
		samples : {
			"red" : AudioBuffers.kick808,
			"green" : AudioBuffers.snare808,
			"blue" : AudioBuffers.hh808,
			"purple" : AudioBuffers.cow808,
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
			// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
			walls : [],
			//the pattern for this puzzle
			pattern : ["rest", "rest", "rest", "rest", "rest", "rest", "rest", "rest"],
			//the pieces allotted
			pieces : ["red", "green","blue",'purple']
			}
		]
	}
];