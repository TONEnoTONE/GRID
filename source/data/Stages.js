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
	/*=========================================================================
	LEVEL 0
	=========================================================================*/
	{
		name : "GET Fnky",
		color : PieceType.Purple,
		bpm : 100,
		levels : [
			{
				name : "1",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "rest", "rest", "rest"],
				samples : {
					"red" : AudioBuffers.drums808.kick,
				},
				//the pieces allotted
				pieces : ["red"]
			},
			{
				name : "2",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["rest", "rest", "green", "rest"],
				samples : {
					"green" : AudioBuffers.drums808.snare,
				},
				//the pieces allotted
				pieces : ["green"],
			},
			{
				name : "3",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["yellow", "rest", "rest", "pink"],
				//the pieces allotted
				pieces : ["yellow", "pink"],
				samples : {
					"yellow" : AudioBuffers.bass.Dsharp,
					"pink" : AudioBuffers.bass.C,
				},
			},
			{
				name : "4",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["rest", "blue", "rest", "blue", "rest", "blue", "rest", ["blue", "purple"]],
				//the pieces allotted
				samples : {
					"blue" : AudioBuffers.drums808.hh,
					"purple" : AudioBuffers.drums808.hho,
				},
				pieces : ["blue", "purple"]
			},
			{
				name : "5",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["rest", "rest", "rest", ["green", "yellow"],"rest", "rest", "rest", ["blue", "yellow"]],
				//the pieces allotted
				pieces : ["green", "yellow", "blue"],
				samples : {
					"green" : AudioBuffers.lead.G,
					"blue" : AudioBuffers.lead.F,
					"yellow" : AudioBuffers.lead.Csharp
				},
			},
			{
				name : "6",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "rest", "red", "rest", "red", "purple"],
				//the pieces allotted
				pieces : ["red", "purple"],
				samples : {
					"red" : AudioBuffers.drums808.tomHi,
					"purple" : AudioBuffers.drums808.tomLow
				},
			},
		]
	},

	/*=========================================================================
	LEVEL 1
	=========================================================================*/
	{
		name : "Tutorial Beat",
		color : PieceType.Blue,
		bpm : 100,
		levels : [
			{
				name : "1",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "rest", "rest", "rest"],
				samples : {
					"red" : AudioBuffers.drums808.kick,
				},
				//the pieces allotted
				pieces : ["red"]
			},
			{
				name : "2",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "rest", "rest", "rest"],
				//the pieces allotted
				pieces : ["red"],
				samples : {
					"red" : AudioBuffers.drums808.kick,
					"green" : AudioBuffers.drums808.snare,
				}
			},
			{
				name : "3",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "rest", "green", "rest"],
				//the pieces allotted
				pieces : ["red", "green"],
				samples : {
					"red" : AudioBuffers.drums808.kick,
					"green" : AudioBuffers.drums808.snare,
				}
			},
			{
				name : "4",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "red", "rest", "rest"],
				//the pieces allotted
				pieces : ["red", "red"],
				samples : {
					"red" : AudioBuffers.drums808.kick,
					"green" : AudioBuffers.drums808.snare,
				}
			},
			{
				name : "5",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "red", "green", "rest"],
				//the pieces allotted
				pieces : ["red", "red", "green"],
				samples : {
					"red" : AudioBuffers.drums808.kick,
					"green" : AudioBuffers.drums808.snare,
				}
			},
			{
				name : "6",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "rest", "green", "rest"],
				//the pieces allotted
				pieces : ["red", "green"],
				samples : {
					"red" : AudioBuffers.drums808.kick,
					"green" : AudioBuffers.drums808.snare,
				}
			},
			{
				name : "7",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "red", "green", "rest"],
				//the pieces allotted
				pieces : ["red", "red", "green"],
				samples : {
					"red" : AudioBuffers.drums808.kick,
					"green" : AudioBuffers.drums808.snare,
				}
			},
			{
				name : "8",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["rest", "rest", "green", "rest"],
				//the pieces allotted
				pieces : ["green"],
				samples : {
					"red" : AudioBuffers.drums808.kick,
					"green" : AudioBuffers.drums808.snare,
				}
			}
		]
	},
	/*=========================================================================
	LEVEL 1
	=========================================================================*/
	{
		name : "SRSLY D00D",
		color : PieceType.Red,
		bpm : 100,
		levels : [
			{
				name : "1",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "rest", "rest", "rest", "red", "rest", "rest", "red"],
				//the pieces allotted
				pieces : ["red", "red"],
				samples : {
					"red" : AudioBuffers.drums808.kick,
					"green" : AudioBuffers.drums808.snare,
				}
			},
			{
				name : "2",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "rest", "green", "rest", "red", "rest", "green", "red"],
				//the pieces allotted
				pieces : ["red", "red","green"],
				samples : {
					"red" : AudioBuffers.drums808.kick,
					"green" : AudioBuffers.drums808.snare,
				}
			},
			{
				name : "3",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "blue", "green", "rest", "red", "blue", "green", "red"],
				//the pieces allotted
				pieces : ["red", "red","green", 'blue'],
				samples : {
					"red" : AudioBuffers.drums808.kick,
					"green" : AudioBuffers.drums808.snare,
					"blue" : AudioBuffers.drums808.hh
				}
			},
			{
				name : "3",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "blue", "green", "purple", "red", "blue", "green", ["red", "purple"]],
				//the pieces allotted
				pieces : ["red", "red","green", 'blue', "purple"],
				samples : {
					"red" : AudioBuffers.drums808.kick,
					"green" : AudioBuffers.drums808.snare,
					"blue" : AudioBuffers.drums808.hh,
					"purple" : AudioBuffers.drums808.hho
				}
			},
			{
				name : "3",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", ["blue","yellow"], "green", ["purple","yellow"], "red", ["blue","yellow"], "green", ["red", "purple", "yellow"]],
				//the pieces allotted
				pieces : ["red", "red","green", 'blue', "purple", "yellow"],
				samples : {
					"red" : AudioBuffers.drums808.kick,
					"green" : AudioBuffers.drums808.snare,
					"blue" : AudioBuffers.drums808.hh,
					"purple" : AudioBuffers.drums808.hho,
					"yellow" : AudioBuffers.drums808.tomHi,
				}
			}
		]
	}
];