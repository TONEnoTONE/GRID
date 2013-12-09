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
		name : "Get Lucky",
		layout : [	
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1],
			[1, 1, 1, 1]
			],
		bpm : 116,
		genre : "dance",
		//the pieces allotted
		pieces : ["red", "green", "blue", "purple", "purple", "yellow"],
		levels : [],
		tracks : [
			{
				name : "bass0",
				instrument : "bass",
				sample : AudioBuffers.GetLucky_Bass0,
				beat : 0,
				//measure number
				entrances : [17, 42]
			},
			{
				name : "bass1",
				instrument : "bass",
				sample : AudioBuffers.GetLucky_Bass1,
				beat : 3,
				//measure number
				entrances : [12, 28]
			},
			{
				name : "guitar0",
				instrument : "guitar",
				sample : AudioBuffers.GetLucky_Guitar0,
				beat : 0,
				//measure number
				entrances : [26, 36]
			},
			{
				name : "guitar1",
				instrument : "guitar",
				sample : AudioBuffers.GetLucky_Guitar1,
				beat : 2,
				//measure number
				entrances : [8, 34]
			},
			{
				name : "chords",
				instrument : "keys",
				sample : AudioBuffers.GetLucky_Chords,
				beat : 0,
				//measure number
				entrances : [0, 30, 52]
			},
			{
				name : "kick",
				instrument : "drums",
				sample : AudioBuffers.GetLucky_Kick,
				beat : 0,
				//measure number
				entrances : [16, 45]
			},
			{
				name : "snare",
				instrument : "drums",
				sample : AudioBuffers.GetLucky_Snare,
				beat : 1,
				//measure number
				entrances : [4, 48]
			},
			{
				name : "hats",
				instrument : "drums",
				sample : AudioBuffers.GetLucky_Hats,
				beat : 0,
				//measure number
				entrances : [20, 51]
			},
			{
				name : "lead0",
				instrument : "mic",
				sample : AudioBuffers.GetLucky_Lead0,
				beat : 1,
				//measure number
				entrances : [24]
			},
			{
				name : "lead1",
				instrument : "mic",
				sample : AudioBuffers.GetLucky_Lead1,
				beat : 0,
				//measure number
				entrances : [32, 37]
			},
			{
				name : "lead2",
				instrument : "mic",
				sample : AudioBuffers.GetLucky_Lead2,
				beat : 3,
				//measure number
				entrances : [40, 44]
			}
		]
	}
];