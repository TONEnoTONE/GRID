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
		name : "0th",
		color : PieceType.Purple,
		bpm : 124,
		takes : 30000,
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
				name : "threee",
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
				pattern : ["rest", "blue", "rest", "purple"],
				//the pieces allotted
				samples : {
					"blue" : AudioBuffers.drums808.hh,
					"purple" : AudioBuffers.drums808.hho
				},
				pieces : ["blue", "purple"]
			},
			{
				name : "3",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["pink", "yellow", "purple", "blue"],
				//the pieces allotted
				pieces : ["pink", "yellow", "purple", "blue"],
				samples : {
					"pink" : AudioBuffers.lead.B,
					"yellow" : AudioBuffers.lead.Dsharp,
					"purple" : AudioBuffers.lead.Fsharp,
					"blue" : AudioBuffers.lead.Gsharp,
				},
				multiplier : 1
			},
			{
				name : "bass",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
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
				pattern : ["pink", "blue", "pink", "rest"],
				//the pieces allotted
				samples : {
					"blue" : AudioBuffers.bass.Fsharp,
					"pink" : AudioBuffers.bass.B,
				},
				pieces : ["pink", "blue"]
			}
		]
	},
	/*=========================================================================
		PHONOMETRICIAN
	=========================================================================*/
	{
		name : "Phonometrician",
		color : PieceType.Blue,
		bpm : 90,
		levels : [
			{
				name : "1",
				//width x height
				layout : [	
						[0, 1, 0, 1, 0, 1, 0, 0],
						[0, 0, 1, 0, 1, 0, 1, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 0, 1, 0, 1, 0],
						[0, 1, 0, 1, 0, 1, 0, 0]
						],
				walls : [],
				//the pattern for this puzzle
				pattern : ["yellow", "rest", 'rest', "pink", "rest", "rest"],
				samples : {
					"pink" : AudioBuffers.casioPiano.D0,
					"yellow" : AudioBuffers.casioPiano.G0
				},
				//the pieces allotted
				pieces : ["pink", "yellow"],
				multiplier : .5
			},
			{
				name : "2",
				//width x height
				layout : [	
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 1, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				walls : [],
				//the pattern for this puzzle
				pattern : ["rest", ["red", "green", "purple"], 'rest', "rest", ["red", "blue", "yellow"], "rest"],
				samples : {
					"red" : AudioBuffers.casioPiano.Fsharp2,
					"green" : AudioBuffers.casioPiano.D2,
					"blue" : AudioBuffers.casioPiano.Csharp2,
					"purple" : AudioBuffers.casioPiano.B1,
					"yellow" : AudioBuffers.casioPiano.A1,
				},
				//the pieces allotted
				pieces : ["red", "green", "purple", "blue", "yellow"],
				multiplier : .5
			},
			{
				name : "3",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 1]
						],
				walls : [],
				//the pattern for this puzzle
				pattern : ["blue", "red", "green", "blue", "yellow", "pink"],
				samples : {
					"red" : AudioBuffers.casioVibes.A3,
					"green" : AudioBuffers.casioVibes.G3,
					"blue" : AudioBuffers.casioVibes.Fsharp3,
					"yellow" : AudioBuffers.casioVibes.Csharp3,
					"pink" : AudioBuffers.casioVibes.B2,
				},
				//the pieces allotted
				pieces : ["red", "green", "blue", "yellow", "pink"],
				multiplier : 1
			},
			{
				name : "drums",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				walls : [],
				//the pattern for this puzzle
				pattern : ["pink", "pink", "rest", "rest", "green", "rest", "rest", "rest"],
				samples : {
					"green" : AudioBuffers.volca.clap,
					"pink" : AudioBuffers.drums808.kick,
				},
				//the pieces allotted
				pieces : ["green", "pink", "pink"],
				multiplier : 4/3
			},
			{
				name : "bloops",
				//width x height
				layout : [	
						[0, 1, 0, 1, 0, 1, 0, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 0, 1, 0, 1, 0, 1, 0]
						],
				walls : [],
				//the pattern for this puzzle
				pattern : ["rest", "purple", "yellow", "purple", "rest", ["purple", "blue"]],
				samples : {
					"yellow" : AudioBuffers.volca.clav2,
					"purple" : AudioBuffers.volca.clav5,
					"blue" : AudioBuffers.volca.clav6,
				},
				//the pieces allotted
				pieces : ["yellow", "purple", "blue"],
				multiplier : 1
			}
		]
	},
	/*=========================================================================
		UP AND DOWN
	=========================================================================*/
	{
		name : "Up and Down",
		color : PieceType.Green,
		bpm : 120,
		levels : [
			{
				name : "kick",
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
				pattern : ["pink", "rest", "rest", "rest"],
				//the pieces allotted
				pieces : ["pink"],
				samples : {
					"pink" : AudioBuffers.volca.kick,
				},
				multiplier : .5
			},
			{
				name : "accent and snare",
				//width x height
				layout : [	
						[0, 0, 1, 0, 1, 0, 1, 0],
						[0, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[0, 0, 1, 0, 1, 0, 1, 0],
						[0, 0, 1, 0, 1, 0, 1, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["rest", "rest", "green", "rest", "rest", "pink",  "rest", "green"],
				//the pieces allotted
				pieces : ["pink", "green", "green"],
				samples : {
					"pink" : AudioBuffers.volca.kick,
					"green" : AudioBuffers.volca.clap,
				}
			},
			{
				name : "bass",
				//width x height
				layout : [	
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 1, 1, 0, 1, 0, 1, 0],
						[1, 1, 1, 1, 1, 0, 1, 0],
						[1, 0, 1, 1, 1, 1, 1, 0],
						[1, 0, 1, 0, 1, 1, 1, 1],
						[1, 0, 1, 0, 1, 0, 1, 1],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["green", "rest", "blue", "rest", "purple",  "rest", "yellow", "rest"],
				//the pieces allotted
				pieces : ["green", "blue", "purple", "yellow"],
				samples : {
					"green" : AudioBuffers.casioFunny.C1,
					"blue" : AudioBuffers.casioFunny.B0,
					"purple" : AudioBuffers.casioFunny.A0,
					"yellow" : AudioBuffers.casioFunny.G0,
				},
				multiplier : .5
			},
			{
				name : "wannaannaanaa",
				//width x height
				layout : [	
						[1, 1, 1, 1, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 1],
						[0, 0, 0, 0, 0, 1, 0, 1],
						[0, 0, 0, 1, 0, 1, 0, 1],
						[0, 1, 0, 1, 0, 1, 0, 0],
						[0, 1, 0, 1, 0, 0, 0, 0],
						[0, 1, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 1, 1, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["purple", "blue", "green"],
				//the pieces allotted
				pieces : ["purple", "blue", "green"],
				samples : {
					"purple" : AudioBuffers.casioCosmic.D2,
					"blue" : AudioBuffers.casioCosmic.E2,
					"green" : AudioBuffers.casioCosmic.G2,
				}
			},
			{
				name : "clarinet",
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
				pattern : ["red", "rest", "blue", "rest"],
				//the pieces allotted
				pieces : ["red", "blue"],
				samples : {
					"red" : AudioBuffers.casioClarinet.G2,
					"blue" : AudioBuffers.casioClarinet.E2,
				},
				multiplier : .5
			},
			{
				name : "7",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["rest", "red", "green", "red"],
				//the pieces allotted
				pieces : ["red", "red", "green"],
				samples : {
					"red" : AudioBuffers.volca.hh,
					"green" : AudioBuffers.volca.clav5,
				},
				multiplier : 2
			},
		]
	},
	/*=========================================================================
		PLOT
	=========================================================================*/
	{
		name : "Plot",
		color : PieceType.Yellow,
		bpm : 140,
		levels : [
			{
				name : "rocker",
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
				//the pattern for this puzzle
				pattern : ["pink", "rest", "green", "rest"],
				//the pieces allotted
				pieces : ["pink", "rest", "green", "rest"],
				samples : {
					"pink" : AudioBuffers.casioCosmic.Dsharp2,
					"green" : AudioBuffers.casioCosmic.Dsharp3,
				},
			},
			{
				name : "rocker2",
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
				//the pattern for this puzzle
				pattern : ["yellow", "rest", ["yellow", "red"], "rest"],
				//the pieces allotted
				pieces : ["red", "yellow"],
				samples : {
					"yellow" : AudioBuffers.casioCosmic.G2,
					"red" : AudioBuffers.casioCosmic.G3,
				},
				multiplier : 3/2,
			},
			{
				name : "kick",
				//width x height
				layout : [	
						[0, 0, 1, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 0, 0, 0, 0, 0],
						[0, 0, 1, 0, 0, 0, 0, 0],
						[0, 0, 1, 0, 0, 1, 0, 0],
						[0, 0, 1, 0, 1, 1, 1, 1],
						[0, 0, 1, 0, 0, 1, 0, 0],
						[0, 0, 1, 0, 0, 1, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["purple", "rest", "rest", "rest", "rest", "rest", "rest", "purple"],
				//the pieces allotted
				pieces : ["purple", "purple"],
				samples : {
					"purple" : AudioBuffers.volca.kick,
				},
				multiplier : .5
			},
			{
				name : "kick2",
				//width x height
				layout : [	
						[0, 0, 1, 0, 0, 1, 0, 0],
						[0, 0, 1, 1, 0, 1, 0, 0],
						[1, 1, 1, 0, 0, 1, 0, 0],
						[0, 0, 1, 0, 0, 1, 0, 0],
						[0, 0, 0, 0, 0, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 1, 0, 0],
						[0, 0, 0, 0, 0, 1, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["rest", "blue", "rest", "rest", "rest", "green", "rest", "rest"],
				//the pieces allotted
				pieces : ["blue", "green"],
				samples : {
					"blue" : AudioBuffers.volca.clap,
					"green" : AudioBuffers.volca.clav5
				},
				multiplier : .5
			},
			{
				name : "bass",
				//width x height
				layout : [	
						[0, 0, 1, 0, 0, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 0, 0, 1, 0, 0],
						[0, 0, 1, 0, 0, 1, 0, 0],
						[0, 0, 1, 0, 0, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 0, 0, 1, 0, 0],
						[0, 0, 1, 0, 0, 1, 0, 0]
						],
				//the pattern for this puzzle
				pattern : ["purple", "rest", "purple", "rest", "pink", "rest", "pink", "rest"],
				//the pieces allotted
				pieces : ["pink", "pink", "purple", "purple"],
				samples : {
					"pink" : AudioBuffers.cs80Brassy.C2,
					"purple" : AudioBuffers.cs80Brassy.Dsharp2,
				},
				multiplier : .5
			},
		]
	},
	/*=========================================================================
		SRSLY DOOD
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
	},
	/*=========================================================================
		PIOUS.LY
	=========================================================================*/
	{
		name : "Miraculous.ly",
		color : PieceType.Yellow,
		bpm : 80,
		levels : [
			{
				name : "1",
				//width x height
				layout : [	
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 0, 0, 1, 1],
						[1, 1, 0, 0, 0, 0, 0, 0],
						[1, 1, 0, 0, 0, 0, 0, 0],
						],
				walls : [],
				//the pattern for this puzzle
				pattern : [["yellow", "blue"], ["purple", "green"], ["blue", "red"], ["purple", "green"],["yellow", "blue"],["purple", "pink"],["yellow", "blue"],["purple", "pink"]],
				samples : {
					"pink" : AudioBuffers.keys.B,
					"yellow" : AudioBuffers.keys.C,
					"purple" : AudioBuffers.keys.D,
					"blue" : AudioBuffers.keys.E,
					"green" : AudioBuffers.keys.F,
					"red" : AudioBuffers.keys.G,
				},
				//the pieces allotted
				pieces : ["pink", "pink", "yellow", "yellow", "purple", "blue", "green", "green", "red"],
				multiplier : .5
			},
			
		]
	}
];