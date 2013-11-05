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
		pieces : ["red", "red", "green", "green", "blue", "blue"],
		levels : [
			{
			name : "1",
			repeat : 2,
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
			repeat : 2,
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
			repeat : 2,
			samples : {
				"red" : AudioBuffers.kick808,
				"green" : AudioBuffers.snare808,
				"blue" : AudioBuffers.hh808,
			},
			//the pattern for this puzzle
			pattern : ["red", "blue", ["green", "red"], "rest"],

			countIn : 16,
			},
			{
			name : "4",
			repeat : 2,
			samples : {
				"red" : AudioBuffers.kick808,
				"green" : AudioBuffers.snare808,
				"blue" : AudioBuffers.hh808,
				"end" : AudioBuffers.kick808,
			},
			//the pattern for this puzzle
			pattern : ["red", "blue", ["green", "red"], "blue"],
			countIn : 16,
			},
		]
	},
	{
		name : "Every Breath",
		layout : [	
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1]
			],
		bpm : 57,
		genre : "rock",
		//the pieces allotted
		pieces : ["red", "green", "blue", "purple", "purple", "yellow"],
		levels : [
			{
				name : "1",
				repeat : 2,
				samples : {
					"red" : AudioBuffers.EveryBreath_GuitarA0,
					"green" : AudioBuffers.EveryBreath_GuitarA1,
					"blue" : AudioBuffers.EveryBreath_BassA,
					"purple" : AudioBuffers.EveryBreath_Snare,
					"yellow" : AudioBuffers.EveryBreath_Kick,
				},
				//the pattern for this puzzle
				pattern : [["red", 'yellow'], "purple", "green", "rest"],
				countIn : 8,
			},
			{
				name : "2",
				repeat : 2,
				samples : {
					"red" : AudioBuffers.EveryBreath_GuitarB0,
					"green" : AudioBuffers.EveryBreath_GuitarB1,
					"blue" : AudioBuffers.EveryBreath_BassB,
					"purple" : AudioBuffers.EveryBreath_Snare,
					"yellow" : AudioBuffers.EveryBreath_Kick,
				},
				//the pattern for this puzzle
				pattern : [["red", 'yellow'], "purple", "green", "rest"],
				countIn : 8,
			},
			{
				name : "3",
				repeat : 1,
				samples : {
					"red" : AudioBuffers.EveryBreath_GuitarC0,
					"green" : AudioBuffers.EveryBreath_GuitarC1,
					"blue" : AudioBuffers.EveryBreath_BassC,
					"purple" : AudioBuffers.EveryBreath_Snare,
					"yellow" : AudioBuffers.EveryBreath_Kick,
				},
				//the pattern for this puzzle
				pattern : [["red", 'yellow'], "purple", "green", "rest"],
				countIn : 4,
			},
			{
				name : "4",
				repeat : 1,
				samples : {
					"red" : AudioBuffers.EveryBreath_GuitarD0,
					"green" : AudioBuffers.EveryBreath_GuitarD1,
					"blue" : AudioBuffers.EveryBreath_BassD,
					"purple" : AudioBuffers.EveryBreath_Snare,
					"yellow" : AudioBuffers.EveryBreath_Kick,
				},
				//the pattern for this puzzle
				pattern : [["red", 'yellow'], "purple", "green", "rest"],
				countIn : 4,
			},
			{
				name : "1",
				repeat : 2,
				samples : {
					"red" : AudioBuffers.EveryBreath_GuitarA0,
					"green" : AudioBuffers.EveryBreath_GuitarA1,
					"blue" : AudioBuffers.EveryBreath_BassA,
					"purple" : AudioBuffers.EveryBreath_Snare,
					"yellow" : AudioBuffers.EveryBreath_Kick,
					"end" : AudioBuffers.EveryBreath_End,
				},
				//the pattern for this puzzle
				pattern : [["red", 'yellow'], "purple", "green", "rest"],
				countIn : 4,
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
		pieces : ["red", "green", "blue", "blue", "purple", "yellow"],
		levels : [
			{
			name : "1",
			repeat : 3,
			samples : {
				"red" : AudioBuffers.nosur_A,
				"green" : AudioBuffers.nosur_F,
				"blue" : AudioBuffers.nosur_C,
				"purple" : AudioBuffers.nosur_BassF
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
	},
	{
		name : "Get Lucky",
		layout : [	
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1]
			],
		bpm : 60,
		genre : "dance",
		//the pieces allotted
		pieces : ["red", "green", "blue", "purple", "purple", "yellow"],
		levels : [
			{
			name : "1",
			samples : {
				"red" : AudioBuffers.GetLucky_GuitarA0,
				"green" : AudioBuffers.GetLucky_GuitarA1,
				"blue" : AudioBuffers.GetLucky_BassA,
				"purple" : AudioBuffers.GetLucky_Snare,
				"yellow" : AudioBuffers.GetLucky_KickA
			},
			//the pattern for this puzzle
			pattern : [["red", "blue", "yellow"], "purple", "green", "purple"],
			countIn : 8,
			},
			{
			name : "2",
			samples : {
				"red" : AudioBuffers.GetLucky_GuitarB0,
				"green" : AudioBuffers.GetLucky_GuitarB1,
				"blue" : AudioBuffers.GetLucky_BassB,
				"purple" : AudioBuffers.GetLucky_Snare,
				"yellow" : AudioBuffers.GetLucky_KickA
			},
			//the pattern for this puzzle
			pattern : [["red", "blue", "yellow"], "purple", "green", "purple"],
			countIn : 8,
			},
			{
			name : "3",
			samples : {
				"red" : AudioBuffers.GetLucky_GuitarC0,
				"green" : AudioBuffers.GetLucky_GuitarC1,
				"blue" : AudioBuffers.GetLucky_BassC,
				"purple" : AudioBuffers.GetLucky_Snare,
				"yellow" : AudioBuffers.GetLucky_KickA
			},
			//the pattern for this puzzle
			pattern : [["red", "blue", "yellow"], "purple", "green", "purple"],
			countIn : 4,
			},
			{
			name : "4",
			samples : {
				"red" : AudioBuffers.GetLucky_GuitarD0,
				"green" : AudioBuffers.GetLucky_GuitarD1,
				"blue" : AudioBuffers.GetLucky_BassD,
				"purple" : AudioBuffers.GetLucky_Snare,
				"yellow" : AudioBuffers.GetLucky_KickB
			},
			//the pattern for this puzzle
			pattern : [["red", "blue", "yellow"], "purple", "rest", ["green", "purple"]],
			countIn : 4,
			}
		]
	}
];