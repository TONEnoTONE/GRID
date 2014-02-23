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
					"red" : AudioBuffers.drums505.kick,
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
					"green" : AudioBuffers.dr110.clap,
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
					"blue" : AudioBuffers.volca.hh,
					"purple" : AudioBuffers.dr110.hho
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
					"pink" : AudioBuffers.casioFlute.A1,
					"yellow" : AudioBuffers.casioFlute.Csharp2,
					"purple" : AudioBuffers.casioFlute.E2,
					"blue" : AudioBuffers.casioFlute.Fsharp2
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
				pattern : ["pink", "rest", "pink", "yellow"],
				//the pieces allotted
				samples : {
					"yellow" : AudioBuffers.cs80Mellow.A2,
					"pink" : AudioBuffers.cs80Mellow.A1,
				},
				pieces : ["pink", "yellow"]
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
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
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
		name : "Ups and Downs",
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
					"pink" : AudioBuffers.dr110.kick,
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
						[1, 0, 1, 1, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 1, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 1],
						[1, 0, 1, 0, 1, 0, 1, 0],
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
						[0, 1, 1, 1, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 1],
						[0, 0, 0, 0, 0, 1, 0, 1],
						[0, 0, 0, 1, 0, 1, 0, 1],
						[0, 1, 0, 1, 0, 1, 0, 0],
						[0, 1, 0, 1, 0, 0, 0, 0],
						[0, 1, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 1, 1, 1, 0]
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
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
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
		BOSS NOVA
	=========================================================================*/
	{
		name : "Boss Nova",
		color : PieceType.Red,
		bpm : 100,
		levels : [
				{
				name : "bass0",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["pink", "rest", "rest", "rest", "rest", "rest", "rest", "rest"],
				//the pieces allotted
				pieces : ["pink"],
				samples : {
					"pink" : AudioBuffers.cs80Mellow.A1,
				},
				multiplier : 1
			},
			{
				name : "bass1",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["rest", "rest", "rest", "purple", "rest", "rest", "green", "rest"],
				//the pieces allotted
				pieces : ["purple", "green"],
				samples : {
					"purple" : AudioBuffers.cs80Mellow.E2,
					"green" : AudioBuffers.cs80Mellow.A2,
				},
				multiplier : 2
			},
			{
				name : "agogo low",
				//width x height
				layout : [	
						[0, 1, 1, 1, 0, 0, 0, 0],
						[0, 1, 1, 1, 0, 0, 0, 0],
						[0, 1, 1, 1, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 1, 1, 1, 0, 0, 0, 0],
						[0, 1, 1, 1, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["blue", "red", "rest", "rest", "rest", "blue", "red", "rest"],
				//the pieces allotted
				pieces : ["blue", "blue", "red", "red"],
				samples : {
					"blue" : AudioBuffers.volca.clav5,
					"red" : AudioBuffers.volca.clav6,
				},
				multiplier : 1
			},
			{
				name : "agogo high",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["rest", "rest", "rest", "rest", "rest", "red", "rest", "red"],
				//the pieces allotted
				pieces : ["red", "red"],
				samples : {
					"red" : AudioBuffers.volca.clav6,
				},
				multiplier : 2
			},
			{
				name : "chords",
				//width x height
				layout : [	
						[0, 1, 1, 1, 0, 0, 0, 0],
						[0, 1, 1, 1, 0, 0, 0, 0],
						[0, 1, 1, 1, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 1, 1, 1, 0, 0, 0, 0],
						[0, 1, 1, 1, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : [["purple", "blue", "green", "red"], "rest", "rest", "rest", "rest", "rest", "rest", "rest"],
				//the pieces allotted
				pieces : ["purple", "blue", "green", "red"],
				samples : {
					"purple" : AudioBuffers.korgElectric.A3,
					"blue" : AudioBuffers.korgElectric.C4,
					"green" : AudioBuffers.korgElectric.E4,
					"red" : AudioBuffers.korgElectric.G4,
				},
				multiplier : 1
			},
			{
				name : "chords2",
				//width x height
				layout : [	
						[0, 1, 1, 1, 0, 0, 0, 0],
						[0, 1, 1, 1, 0, 0, 0, 0],
						[0, 1, 1, 1, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 1, 1, 1, 0, 0, 0, 0],
						[0, 1, 1, 1, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["rest", "rest", "rest", ["purple", "blue", "green", "red"], "rest", "rest", "rest", "rest"],
				//the pieces allotted
				pieces : ["purple", "blue", "green", "red"],
				samples : {
					"purple" : AudioBuffers.korgElectric.A3,
					"blue" : AudioBuffers.korgElectric.C4,
					"green" : AudioBuffers.korgElectric.E4,
					"red" : AudioBuffers.korgElectric.G4,
				},
				multiplier : 2
			},
		]
	},
	/*=========================================================================
		LO-HI
	=========================================================================*/
	{
		name : "LoHi",
		color : PieceType.Purple,
		bpm : 130,
		levels : [
			{
				name : "bass",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				//the pattern for this puzzle
				pattern : ["purple", "rest", "pink", "pink"],
				//the pieces allotted
				pieces : ["purple", "pink", "pink"],
				samples : {
					"purple" : AudioBuffers.cdBass.E1,
					"pink" : AudioBuffers.cdBass.A0,
				},
				multiplier : .5
			},
			{
				name : "acoustic",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				//the pattern for this puzzle
				pattern : ["yellow", "red", "green", "rest"],
				//the pieces allotted
				pieces : ["yellow", "red", "green"],
				samples : {
					"yellow" : AudioBuffers.cdAcoustic.E2,
					"green" : AudioBuffers.cdAcoustic.Csharp3,
					"red" : AudioBuffers.cdAcoustic.E3,
				},
				multiplier : .5
			},
			{
				name : "electri",
				//width x height
				layout : [	
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["pink", "pink", "blue", "rest", "purple", "rest", "rest", "rest"],
				//the pieces allotted
				pieces : ["pink", "pink", "blue", "purple"],
				samples : {
					"pink" : AudioBuffers.cdElectric.E2,
					"blue" : AudioBuffers.cdElectric.Gsharp3,
					"purple" : AudioBuffers.cdElectric.Fsharp3,
				},
				multiplier : 1
			},
			{
				name : "kit",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				//the pattern for this puzzle
				pattern : ["yellow", "yellow", "green", "rest"],
				//the pieces allotted
				pieces : ["yellow", "yellow", "green"],
				samples : {
					"yellow" : AudioBuffers.linnDrum.kick,
					"green" : AudioBuffers.linnDrum.snare
				},
				multiplier : .5
			},
			{
				name : "kit 2",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["rest", "rest", "red", "rest", "rest", "rest", "red", "yellow"],
				//the pieces allotted
				pieces : ["yellow", "red"],
				samples : {
					"yellow" : AudioBuffers.linnDrum.kick,
					"red" : AudioBuffers.linnDrum.tamb
				},
				multiplier : 1
			},
			/*{
				name : "noodles",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["yellow", "blue", "blue", "yellow"],
				//the pieces allotted
				pieces : ["yellow", "yellow", "blue", "blue"],
				samples : {
					"blue" : AudioBuffers.korgElectric.Gsharp5,
					"yellow" : AudioBuffers.korgElectric.Gsharp4
				},
				multiplier : 1
			},*/
		]
	},
	/*=========================================================================
		T.V.
	=========================================================================*/
	{
		name : "T.V.",
		color : PieceType.Pink,
		bpm : 130,
		levels : [
			{
				name : "bass",
				//width x height
				layout : [	
						[0, 0, 1, 1, 0, 0, 0, 0],
						[1, 1, 1, 1, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 1, 1, 1, 1, 0],
						[1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 1, 1],
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["blue", "rest", "rest" , "pink", "yellow", "purple"],
				//the pieces allotted
				pieces : ["blue", "purple", "yellow", "pink"],
				samples : {
					"blue" : AudioBuffers.operatorBass.Dsharp1,
					"purple" : AudioBuffers.operatorBass.D1,
					"yellow" : AudioBuffers.operatorBass.Csharp1,
					"pink" : AudioBuffers.operatorBass.Asharp0,
				},
				multiplier : .5
			},
			{
				name : "chords",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 1, 1],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 1, 1, 1, 0, 1, 1, 1],
						],
				//the pattern for this puzzle
				pattern : ["rest", ["red", "blue", "purple"], "rest", "rest", ["green", "blue", "yellow"], "rest"],
				//the pieces allotted
				pieces : ["red", "green", "blue", "blue", "purple", "yellow"],
				samples : {
					"red" : AudioBuffers.operatorGuitar.Fsharp3,
					"green" : AudioBuffers.operatorGuitar.F3,
					"blue" : AudioBuffers.operatorGuitar.Csharp3,
					"purple" : AudioBuffers.operatorGuitar.Asharp2,
					"yellow" : AudioBuffers.operatorGuitar.Gsharp2,
				},
				multiplier : .5
			},
			{
				name : "shaker",
				//width x height
				layout : [	
						[1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 0, 0],
						[0, 1, 1, 0, 0, 1, 1, 0],
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["green", "rest", "blue"],
				//the pieces allotted
				pieces : ["blue", "green"],
				samples : {
					"blue" : AudioBuffers.volca.hh,
					"green" : AudioBuffers.dr110.hh,
				},
				multiplier : 3/2
			},
			{
				name : "kit",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 1, 1, 1, 0],
						[0, 0, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 0, 1, 1, 1, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : [["green","purple"], "rest", "red", "rest", "red", "rest"],
				//the pieces allotted
				pieces : ["green", "purple", "red", "red"],
				samples : {
					"purple" : AudioBuffers.drums505.kick,
					"green" : AudioBuffers.linnDrum.tamb,
					"red" : AudioBuffers.dr110.cymbal,
				},
				multiplier : 1
			},
			{
				name : "lead",
				//width x height
				layout : [	
						[0, 0, 1, 1, 0, 0, 1, 0],
						[1, 1, 1, 1, 1, 0, 1, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 1, 1, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 1, 1],
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : [["red", "green"], "rest" , "rest", ["blue", "purple"], "rest", "rest"],
				//the pieces allotted
				pieces : ["red", "green", "purple", "blue"],
				samples : {
					"red" : AudioBuffers.operatorSlow.Fsharp2,
					"blue" : AudioBuffers.operatorSlow.F2,
					"green" : AudioBuffers.operatorSlow.Dsharp2,
					"purple" : AudioBuffers.operatorSlow.Csharp2,
				},
				multiplier : .5
			},
		]
	},
	/*=========================================================================
		Phase
	=========================================================================*/
	{
		name : "Phase",
		color : PieceType.Yellow,
		bpm : 148,
		levels : [
				{
				name : "piano 0",
				//width x height
				layout : [	
						[1, 1, 1, 1, 0, 0, 0, 0],
						[1, 0, 0, 0, 0, 0, 0, 0],
						[1, 0, 1, 1, 1, 1, 1, 1],
						[1, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["pink", "yellow", "purple", "blue", "green", "yellow", "pink", "blue", "purple", "yellow", "green", "blue"],
				//the pieces allotted
				pieces : ["pink", "purple", "green", "yellow", "blue"],
				samples : {
					"green" : AudioBuffers.korgPiano.Dsharp5,
					"blue" : AudioBuffers.korgPiano.D5,
					"purple" : AudioBuffers.korgPiano.Asharp4,
					"yellow" : AudioBuffers.korgPiano.G4,
					"pink" : AudioBuffers.korgPiano.F4,
				},
				multiplier : 1
			},
			{
				name : "piano 1",
				//width x height
				layout : [	
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 1, 0, 0, 0, 0, 0, 0],
						[0, 1, 0, 0, 0, 0, 0, 0],
						[0, 1, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 0, 1],
						[0, 1, 0, 0, 0, 0, 0, 1],
						[0, 0, 0, 0, 0, 0, 0, 1],
						[0, 0, 0, 0, 1, 1, 1, 1],
						],
				//the pattern for this puzzle
				pattern : ["pink", "yellow", "purple", "blue", "green", "yellow", "pink", "blue", "purple", "yellow", "green", "blue"],
				//the pieces allotted
				pieces : ["pink", "purple", "green", "yellow", "blue"],
				samples : {
					"green" : AudioBuffers.korgElectric.Dsharp5,
					"purple" : AudioBuffers.korgElectric.Asharp4,
					"pink" : AudioBuffers.korgElectric.F4,
					"blue" : AudioBuffers.korgElectric.D5,
					"yellow" : AudioBuffers.korgElectric.G4,
				},
				multiplier : 1.02
			},
		]
	},
	/*=========================================================================
		Differential (+/-)
	=========================================================================*/
	{
		name : "Differential",
		color : PieceType.Green,
		bpm : 130,
		levels : [
				{
				name : "piano bass",
				//width x height
				layout : [	
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						],
				//the pattern for this puzzle
				pattern : ["blue", "rest", "blue", "rest", "yellow", "rest", "yellow", "rest"],
				//the pieces allotted
				pieces : ["blue", "blue", "yellow", "yellow"],
				samples : {
					"blue" : AudioBuffers.korgPiano.F2,
					"yellow" : AudioBuffers.korgPiano.C2,
				},
				multiplier : .5
			},
			{
				name : "piano bass 2",
				//width x height
				layout : [	
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						],
				//the pattern for this puzzle
				pattern : ["rest", "blue", "rest", "blue", "rest", "yellow", "rest", "yellow"],
				//the pieces allotted
				pieces : ["blue", "blue", "yellow", "yellow"],
				samples : {
					"blue" : AudioBuffers.korgPiano.F2,
					"yellow" : AudioBuffers.korgPiano.C2,
				},
				multiplier : .5
			},
			{
				name : "riff",
				//width x height
				layout : [	
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						],
				//the pattern for this puzzle
				pattern : ["rest", "red", "rest", "blue", "rest", "green", "yellow", "purple"],
				//the pieces allotted
				pieces : ["blue", "red", "green", "yellow", "purple"],
				samples : {
					"red" : AudioBuffers.korgPiano.A4,
					"green" : AudioBuffers.korgPiano.G4,
					"blue" : AudioBuffers.korgPiano.E4,
					"purple" : AudioBuffers.korgPiano.D4,
					"yellow" : AudioBuffers.korgPiano.C4,
				},
				multiplier : 1
			},
			{
				name : "vocal",
				//width x height
				layout : [	
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						],
				//the pattern for this puzzle
				pattern : ["green", "red" , "purple", "blue", "green", "rest", "rest", "rest"],
				//the pieces allotted
				pieces : ["red", "green", "green", "purple", "blue"],
				samples : {
					"red" : AudioBuffers.casioHorn.A2,
					"green" : AudioBuffers.casioHorn.G2,
					"blue" : AudioBuffers.casioHorn.F2,
					"purple" : AudioBuffers.casioHorn.E2,
				},
				multiplier : .25
			},
			{
				name : "vocal harm",
				//width x height
				layout : [	
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						[1, 0, 1, 0, 1, 0, 1, 0],
						],
				//the pattern for this puzzle
				pattern : ["purple", "blue", "pink", "yellow", "purple", "rest", "rest", "rest"],
				//the pieces allotted
				pieces : ["purple", "purple", "blue", "pink", "yellow"], 
				samples : {
					"blue" : AudioBuffers.casioHorn.F2,
					"purple" : AudioBuffers.casioHorn.E2,
					"yellow" : AudioBuffers.casioHorn.D2,
					"pink" : AudioBuffers.casioHorn.C2,
				},
				multiplier : .25
			}
		]
	},
	/*=========================================================================
		GIZMOID
	=========================================================================*/
	{
		name : "Gizmoid",
		color : PieceType.Purple,
		bpm : 120,
		levels : [
				{
				name : "kick snare",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 1, 1, 1],
						[0, 0, 0, 0, 0, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["yellow", "pink", "blue", "rest", "rest", "rest", "blue", "rest"],
				//the pieces allotted
				pieces : ["pink", "yellow", "blue"],
				samples : {
					"pink" : AudioBuffers.cdFX.kick,
					"yellow" : AudioBuffers.cdFX.kickShort,
					"blue" : AudioBuffers.cdFX.snare,
				},
				multiplier : 1
			},
			{
				name : "intricate click",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 1, 1, 1],
						[0, 0, 0, 0, 0, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["red", "green", "rest", "blue", "rest", "green", "red", "blue"],
				//the pieces allotted
				pieces : ["green", "red", "red", "blue"],
				samples : {
					"green" : AudioBuffers.cdFX.click0,
					"red" : AudioBuffers.cdFX.click1,
					"blue" : AudioBuffers.volca.hh,
				},
				multiplier : 2
			},
			{
				name : "beeps",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 1, 1, 1],
						[0, 0, 0, 0, 0, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["green", "blue", "green", "rest", ["purple", "green"], "blue", "green", "rest"],
				//the pieces allotted
				pieces : ["green", "purple", "blue"],
				samples : {
					"green" : AudioBuffers.cdFX.beep0,
					"purple" : AudioBuffers.cdFX.beep2,
					"blue" : AudioBuffers.cdFX.beep1,
				},
				multiplier : 2
			},
			{
				name : "drops",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 1, 1, 1],
						[0, 0, 0, 0, 0, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["rest", "red", "yellow", "rest", "rest", "red", "yellow", "blue"],
				//the pieces allotted
				pieces : ["red", "blue", "yellow"],
				samples : {
					"red" : AudioBuffers.volca.highTom,
					"blue" : AudioBuffers.volca.sweepDown1,
					"yellow" : AudioBuffers.volca.clav2
				},
				multiplier : 1
			},
		]
	},
	/*=========================================================================
		HEYA WORLD
	=========================================================================*/
	{
		name : "Heya World",
		color : PieceType.Pink,
		bpm : 150,
		levels : [
			{
				name : "kick",
				//width x height
				layout : [	
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["yellow", "rest", "rest", "yellow", "rest", "yellow", "rest", "rest"],
				//the pieces allotted
				pieces : ["yellow", "yellow", "yellow"],
				samples : {
					"yellow" : AudioBuffers.drums505.kick,
				},
				multiplier : 1
			},
			{
				name : "with claps",
				//width x height
				layout : [	
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["rest", "purple", "rest", "purple", "rest", ["purple", "red"], ["rest", "red"], ["purple", "red"]],
				//the pieces allotted
				pieces : ["purple", "red", "red", "red"],
				samples : {
					"red" : AudioBuffers.volca.clap,
					"purple" : AudioBuffers.drums505.snare,
				},
				multiplier : .5
			},
			{
				name : "bass",
				//width x height
				layout : [	
						[0, 0, 0, 1, 0, 0, 1, 0],
						[0, 0, 0, 1, 0, 0, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 1, 1, 0],
						[0, 0, 0, 1, 1, 1, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 0, 0, 1, 0],
						[0, 0, 0, 1, 0, 0, 1, 0]
						],
				//the pattern for this puzzle
				pattern : ["pink", "rest", "rest", "pink", "rest", "pink", "blue", "rest"],
				//the pieces allotted
				pieces : ["pink", "pink", "pink", "blue"],
				samples : {
					"blue" : AudioBuffers.casioFunny.D0,
					"pink" : AudioBuffers.casioFunny.G01,
				},
				multiplier : 1
			},
			{
				name : "vibes lead",
				//width x height
				layout : [	
						[0, 0, 0, 1, 0, 0, 1, 0],
						[0, 0, 0, 1, 0, 0, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 1, 1, 0],
						[0, 0, 0, 1, 1, 1, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 0, 0, 1, 0],
						[0, 0, 0, 1, 0, 0, 1, 0]
						],
				//the pattern for this puzzle
				pattern : ["rest", "rest", "rest", "rest", "purple", "blue", "green", "red"],
				//the pieces allotted
				pieces : ["purple", "blue", "green", "red"],
				samples : {
					"red" : AudioBuffers.casioVibes.E4,
					"green" : AudioBuffers.casioVibes.D4,
					"blue" : AudioBuffers.casioVibes.C4,
					"purple" : AudioBuffers.casioVibes.B3,
				},
				multiplier : 1
			},
			{
				name : "guitar 1",
				//width x height
				layout : [	
						[0, 0, 0, 1, 0, 0, 1, 0],
						[0, 0, 0, 1, 0, 0, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 0, 0, 1, 0],
						[0, 0, 0, 1, 0, 0, 1, 0]
						],
				//the pattern for this puzzle
				pattern : ["rest", "rest", ["blue", "green", "red"], ["blue", "green", "red"]],
				//the pieces allotted
				pieces : ["blue", "blue", "green", "green", "red", "red"],
				samples : {
					"red" : AudioBuffers.operatorGuitar.G3,
					"green" : AudioBuffers.operatorGuitar.B2,
					"blue" : AudioBuffers.operatorGuitar.D2,
				},
				multiplier : 1
			},
			{
				name : "guitar 0",
				//width x height
				layout : [	
						[0, 0, 0, 1, 0, 0, 1, 0],
						[0, 0, 0, 1, 0, 0, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 0, 0, 1, 0],
						[0, 0, 0, 1, 0, 0, 1, 0]
						],
				//the pattern for this puzzle
				pattern : [["blue", "green", "red"], "rest", "rest", "rest", "rest", ["blue", "green", "red"], "rest", "rest"],
				//the pieces allotted
				pieces : ["blue", "blue", "green", "green", "red", "red"],
				samples : {
					"red" : AudioBuffers.operatorGuitar.G3,
					"green" : AudioBuffers.operatorGuitar.B2,
					"blue" : AudioBuffers.operatorGuitar.D2,
				},
				multiplier : 1
			},			
		]
	},
	/*=========================================================================
		DEEP BLUE
	=========================================================================*/
	{
		name : "Deep Blue",
		color : PieceType.Blue,
		bpm : 130,
		levels : [
			{
				name : "1",
				//width x height
				layout : [	
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["pink", "yellow", "purple", "blue", "green", "blue", "purple", "yellow"],
				//the pieces allotted
				pieces : ["pink", "yellow", "yellow", "purple", "blue", "blue", "green"],
				samples : {
					"pink" : AudioBuffers.casioCosmic.C0,
					"yellow" : AudioBuffers.casioCosmic.E0,
					"purple" : AudioBuffers.casioCosmic.G0,
					"blue" : AudioBuffers.casioCosmic.A0,
					"green" : AudioBuffers.casioCosmic.Asharp0,
				},
				multiplier : .5
			},
			{
				name : "hats",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "rest", "rest", "red", "rest", "green"],
				//the pieces allotted
				pieces : ["red", "green"],
				samples : {
					"red" : AudioBuffers.drums808.hh,
					"green" : AudioBuffers.drums808.hho,
				},
				multiplier : 3/2,
			},
			{
				name : "kicksnare",
				//width x height
				layout : [	
						[0, 1, 1, 0, 0, 0, 0, 1],
						[0, 1, 1, 0, 0, 0, 0, 0],
						[0, 1, 1, 0, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 0, 0, 0],
						[0, 1, 1, 1, 1, 0, 0, 0],
						[0, 1, 1, 0, 0, 0, 0, 0],
						[0, 1, 1, 0, 0, 0, 0, 0],
						[0, 1, 1, 0, 0, 0, 0, 1],
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : ["red", "red", "green", "rest","rest", "rest",  "green",  "rest"],
				//the pieces allotted
				pieces : ["red", "red", "green"],
				samples : {
					"red" : AudioBuffers.drums808.kick,
					"green" : AudioBuffers.drums808.snare,
				},
			},
			{
				name : "piano",
				//width x height
				layout : [	
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0],
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : [["red", "purple", "blue", "green"], "rest","rest", ["red", "purple", "blue", "green"], "rest",  "rest",  "rest", "rest"],
				//the pieces allotted
				pieces : ["red", "red", "green", "green", "blue", "blue", "purple", "purple"],
				samples : {
					"red" : AudioBuffers.casioPiano.A2,
					"green" : AudioBuffers.casioPiano.G2,
					"blue" : AudioBuffers.casioPiano.E2,
					"purple" : AudioBuffers.casioPiano.C2,
				},
			},
		]
	},
	/*=========================================================================
		STIJL
	=========================================================================*/
	{
		name : "Stijl",
		color : PieceType.Yellow,
		bpm : 90,
		levels : [
			{
				name : "chords",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				//the pattern for this puzzle
				pattern : [["red", "blue", "purple"],["red", "blue", "purple"], ["red", "blue", "purple"], ["red", "blue", "purple"]],
				//the pieces allotted
				pieces : ["red", "blue", "purple"],
				samples : {
					"red" : AudioBuffers.casioHarpsichord.C2,
					"blue" : AudioBuffers.casioHarpsichord.E2,
					"purple" : AudioBuffers.casioHarpsichord.A2,
				},
				multiplier : 1
			},
			{
				name : "bass",
				//width x height
				layout : [	
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[1, 0, 0, 1, 1, 0, 0, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 0, 0, 1, 1, 0, 0, 1],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0]
						],
				//the pattern for this puzzle
				pattern : ["yellow", "rest", "rest", "purple", "pink", "rest", "rest", "blue"],
				//the pieces allotted
				pieces : ["blue", "purple", "yellow", "pink"],
				samples : {
					"blue" : AudioBuffers.cs80Brassy.C2,
					"purple" : AudioBuffers.cs80Brassy.B1,
					"yellow" : AudioBuffers.cs80Brassy.A1,
					"pink" : AudioBuffers.cs80Brassy.G1,
				},
				multiplier : .5
			},
			{
				name : "drums",
				//width x height
				layout : [	
						[1, 1, 0, 0, 0, 0, 1, 1],
						[1, 1, 0, 0, 0, 0, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 0, 0, 0, 0, 1, 1],
						[1, 1, 0, 0, 0, 0, 1, 1],
						],
				//the pattern for this puzzle
				pattern : ["pink", "blue", "green", "rest"],
				//the pieces allotted
				pieces : ["pink", "green" ,"blue"],
				samples : {
					"pink" : AudioBuffers.drums808.kick,
					"green" : AudioBuffers.drums505.snare,
					"blue" : AudioBuffers.drums505.hho,
				},
				multiplier : 1
			},
			{
				name : "synth lead",
				//width x height
				layout : [	
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0]
						],
				//the pattern for this puzzle
				pattern : ["rest", "rest", "rest", "blue", "purple", "blue", "green", "red"],
				//the pieces allotted
				pieces : ["purple", "blue", "blue", "green", "red"],
				samples : {
					"red" : AudioBuffers.casioVibes.E4,
					"green" : AudioBuffers.casioVibes.D4,
					"blue" : AudioBuffers.casioVibes.C4,
					"purple" : AudioBuffers.casioVibes.B3,
				},
				multiplier : 2
			},
		]
	},
	/*=========================================================================
		ARKESTRA
	=========================================================================*/
	/*{
		name : "Space is the place",
		color : PieceType.Purple,
		bpm : 90,
		levels : [
			{
				name : "chords",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				//the pattern for this puzzle
				pattern : [["red", "blue", "purple"],["red", "blue", "purple"], ["red", "blue", "purple"], ["red", "blue", "purple"]],
				//the pieces allotted
				pieces : ["red", "blue", "purple"],
				samples : {
					"red" : AudioBuffers.casioHarpsichord.C2,
					"blue" : AudioBuffers.casioHarpsichord.E2,
					"purple" : AudioBuffers.casioHarpsichord.A2,
				},
				multiplier : 1
			},
		]p
	},*/
	/*=========================================================================
		PLOT
	=========================================================================*/
	{
		name : "Plot",
		color : PieceType.Green,
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
				pieces : ["pink", "green"],
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
				name : "snares",
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
				pattern : ["rest", "blue", "rest", "rest", "green", "rest", "rest", "rest"],
				//the pieces allotted
				pieces : ["blue", "green"],
				samples : {
					"blue" : AudioBuffers.drums808.hho,
					"green" : AudioBuffers.linnDrum.clap
				},
				multiplier : .5
			},
			{
				name : "bass",
				//width x height
				layout : [	
						[0, 0, 1, 0, 0, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
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
			{
				name : "melody",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				//the pattern for this puzzle
				pattern : ["blue", "rest", "red", "rest", "purple", "rest"],
				//the pieces allotted
				pieces : ["blue", "red", "purple"],
				samples : {
					"blue" : AudioBuffers.casioPiano.Dsharp2,
					"red" : AudioBuffers.casioPiano.G2,
					"purple" : AudioBuffers.casioPiano.D2,
				},
				multiplier : 3/4
			},
			{
				name : "melody2",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0],
						[0, 1, 0, 0, 1, 0, 0, 0],
						[0, 1, 0, 0, 1, 0, 0, 0],
						[0, 1, 1, 1, 1, 1, 1, 0],
						[0, 1, 0, 0, 1, 0, 0, 0],
						[0, 1, 0, 0, 1, 0, 0, 0],
						[0, 1, 0, 0, 0, 0, 0, 0]
						],
				//the pattern for this puzzle
				pattern : ["yellow", "rest", "purple", "rest", "pink", "rest"],
				//the pieces allotted
				pieces : ["yellow", "purple", "pink"],
				samples : {
					"yellow" : AudioBuffers.casioPiano.C2,
					"purple" : AudioBuffers.casioPiano.Dsharp2,
					"pink" : AudioBuffers.casioPiano.Asharp1,
				},
				multiplier : 3/4
			},
		]
	},
	/*=========================================================================
		OPERAND
	=========================================================================*/
	{
		name : "Operand",
		color : PieceType.Purple,
		bpm : 135,
		levels : [
			{
				name : "bass",
				//width x height
				layout : [	
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0]
						],
				//the pattern for this puzzle
				pattern : ["rest", "pink", "red", "pink", "red", "rest", "rest", "rest"],
				//the pieces allotted
				pieces : ["pink", "pink", "red", "red"],
				samples : {
					"red" : AudioBuffers.cs80Mellow.Asharp2,
					"pink" : AudioBuffers.cs80Mellow.Asharp1,
				},
				multiplier : 1
			},
			{
				name : "drums",
				//width x height
				layout : [	
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0],
						[0, 0, 0, 1, 1, 0, 0, 0]
						],
				//the pattern for this puzzle
				pattern : ["yellow", "rest", "purple", "rest", "yellow", "green", ["green", "purple"], "green"],
				//the pieces allotted
				pieces : ["yellow", "purple", "green", "green", "green"],
				samples : {
					"purple" : AudioBuffers.linnDrum.clap,
					"yellow" : AudioBuffers.linnDrum.kick,
					"green" : AudioBuffers.volca.hh,
				},
				multiplier : 1
			},
			{
				name : "arp",
				//width x height
				layout : [	
						[0, 0, 1, 1, 0, 0, 0, 0],
						[0, 0, 1, 1, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 1, 1, 0, 0],
						[0, 0, 0, 0, 1, 1, 0, 0]
						],
				//the pattern for this puzzle
				pattern : ["yellow", "blue", "red", "blue", "red", "rest"],
				//the pieces allotted
				pieces : ["yellow", "blue", "blue", "red", "red"],
				samples : {
					"red" : AudioBuffers.casioHarpsichord.Asharp3,
					"blue" : AudioBuffers.casioHarpsichord.Asharp2,
					"yellow" : AudioBuffers.casioHarpsichord.Asharp1,
				},
				multiplier : 1
			},
			{
				name : "effects",
				//width x height
				layout : [	
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 1, 1, 0, 0, 0, 0],
						[0, 1, 1, 1, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 1, 1, 1, 0],
						[0, 0, 0, 0, 1, 1, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0]
						],
				//the pattern for this puzzle
				pattern : [["purple", "green"], "red", "green", "rest", "green", "red", ["blue", "green"], "rest"],
				//the pieces allotted
				pieces : ["red", "green", "blue", "purple"],
				samples : {
					"red" : AudioBuffers.volca.clav6,
					"green" : AudioBuffers.volca.clav4,
					"blue" : AudioBuffers.volca.sweepUp,
					"purple" : AudioBuffers.volca.sweepDown0,
				},
				multiplier : 1
			},
			{
				name : "chords",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				//the pattern for this puzzle
				pattern : ["rest", ["pink", "yellow"], ["pink", "yellow"], "rest", "green", ["pink", "yellow"], ["pink", "yellow"], "rest"],
				//the pieces allotted
				pieces : ["pink", "pink", "yellow", "yellow", "green"],
				samples : {
					"green" : AudioBuffers.casioTrumpet.D3,
					"yellow" : AudioBuffers.casioTrumpet.D2,
					"pink" : AudioBuffers.casioTrumpet.Asharp1,
				},
				multiplier : .5
			},
		]
	},
	/*=========================================================================
		BREAKING OUT
	=========================================================================*/
	{
		name : "Breaking Out",
		color : PieceType.Blue,
		bpm : 124,
		levels : [
			{
				name : "sax",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 1, 0],
						[0, 0, 0, 0, 0, 0, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 1, 0],
						[0, 0, 0, 0, 0, 0, 1, 0],
						],
				//the pattern for this puzzle
				pattern : ["yellow", "yellow", "purple", "purple", "blue", "blue", "purple", "purple"],
				//the pieces allotted
				pieces : ["purple", "purple", "yellow", "yellow", "blue", "blue"],
				samples : {
					"blue" : AudioBuffers.operatorBrass.Gsharp3,
					"purple" : AudioBuffers.operatorBrass.G3,
					"yellow" : AudioBuffers.operatorBrass.F3,
				},
				multiplier : 1
			},
			{
				name : "sax harm",
				//width x height
				layout : [	
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 0, 0, 0, 0],
						[0, 0, 0, 1, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["blue", "blue", "green", "green", "red", "red", "green", "green"],
				//the pieces allotted
				pieces : ["red", "red", "green", "green", "blue","blue"],
				samples : {
					"red" : AudioBuffers.operatorBrass.C3, 
					"green" : AudioBuffers.operatorBrass.Asharp2, 
					"blue" : AudioBuffers.operatorBrass.Gsharp2,
				},
				multiplier : 1
			},
			{
				name : "kit",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 1, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["yellow", "blue", "blue", "blue", "purple", "blue", "blue", "blue"],
				//the pieces allotted
				pieces : ["yellow", "purple", "blue", "blue", "blue"],
				samples : {
					"blue" : AudioBuffers.dr110.hh, 
					"purple" : AudioBuffers.drums505.snare, 
					"yellow" : AudioBuffers.drums505.kick,
				},
				multiplier : 2
			},
			{
				name : "bass 0",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 1, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["purple", "rest", ["red", "blue"], "rest", "rest", "rest", ["red", "blue"], "yellow"],
				//the pieces allotted
				pieces : ["yellow", "purple", "red", "blue"],
				samples : {
					"red" : AudioBuffers.operatorGuitar.D4, 
					"blue" : AudioBuffers.operatorGuitar.F3, 
					"purple" : AudioBuffers.cs80Brassy.Asharp1, 
					"yellow" : AudioBuffers.cs80Brassy.F1, 
				},
				multiplier : 1
			},
			{
				name : "bass 2",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 1, 1, 1, 1, 0],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						],
				//the pattern for this puzzle
				pattern : ["rest", "rest", "rest", "rest", ["green", "purple"], "rest", "rest", "pink"],
				//the pieces allotted
				pieces : ["pink", "purple", "green"],
				samples : {
					"green" : AudioBuffers.operatorGuitar.Gsharp3, 
					"purple" : AudioBuffers.operatorGuitar.Asharp2, 
					"pink" : AudioBuffers.cs80Brassy.Gsharp1, 
				},
				multiplier : 2
			},
		]
	},
	/*=========================================================================
		SRSLY DOOD
	=========================================================================*/
	{
		name : "SRSLY",
		color : PieceType.Red,
		bpm : 100,
		levels : [
			{
				name : "beatz",
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
				//the pattern for this puzzle
				pattern : ["red", "blue", "green", "purple", "red", "blue", "green", ["red", "purple"]],
				//the pieces allotted
				pieces : ["red", "red","green", 'blue', "purple"],
				samples : {
					"red" : AudioBuffers.drums505.kick,
					"green" : AudioBuffers.drums505.snare,
					"blue" : AudioBuffers.drums808.hh,
					"purple" : AudioBuffers.drums808.hho
				}
			},
			{
				name : "bass",
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
				//the pattern for this puzzle
				pattern : ["purple", ["red", "green"], "rest", "yellow", "pink", ["red", "green"], "rest", "yellow"],
				//the pieces allotted
				pieces : ["purple", "yellow", "pink", "red", "green"],
				samples : {
					"red" : AudioBuffers.korgPiano.G5,
					"green" : AudioBuffers.korgPiano.Dsharp5,
					"purple" : AudioBuffers.cs80Brassy.C2,
					"yellow" : AudioBuffers.cs80Brassy.Asharp1,
					"pink" : AudioBuffers.cs80Brassy.Gsharp1,
				},
				multiplier : .5
			},
			{
				name : "synth",
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
				//the pattern for this puzzle
				pattern : ["red", ["green", "blue"], ["green", "blue"],"rest", "rest", ["green", "blue"], ["green", "blue"], "rest"],
				//the pieces allotted
				pieces : ["red", "green", "green", "blue", "blue"],
				samples : {
					"red" : AudioBuffers.casioVibes.G3,
					"green" : AudioBuffers.casioVibes.Dsharp3,
					"blue" : AudioBuffers.casioVibes.C3,
				},
				multiplier : 1
			},
			{
				name : "shaker",
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
				//the pattern for this puzzle
				pattern : ["green", "green", "green", "rest", "green", "green", "green", "green"],
				//the pieces allotted
				pieces : ["green", "green", "green", "green"],
				samples : {
					"green" : AudioBuffers.volca.hh,
				},
				multiplier : 2
			},
			{
				name : "tom",
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
				//the pattern for this puzzle
				pattern : ["yellow", "blue", "rest", "rest", "yellow", "blue", "yellow", "yellow"],
				//the pieces allotted
				pieces : ["blue", "yellow", "yellow", "yellow"],
				samples : {
					"blue" : AudioBuffers.volca.highTom,
					"yellow" : AudioBuffers.volca.lowTom,
				},
				multiplier : 1
			},
		]
	},
	/*=========================================================================
		COURT.LY
	=========================================================================*/
	{
		name : "Court.ly",
		color : PieceType.Yellow,
		bpm : 80,
		levels : [
			{
				name : "keys",
				layout : [	
						[1, 0, 0, 0, 1, 0, 0, 1],
						[1, 1, 0, 0, 1, 0, 1, 1],
						[1, 1, 1, 0, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 0, 1, 1, 1, 1],
						[1, 1, 0, 0, 1, 0, 1, 1],
						[1, 0, 0, 0, 1, 0, 0, 1],
						],						
				//the pattern for this puzzle
				pattern : [["red", "blue"], ["purple", "green"], ["blue", "yellow"],["purple", "pink"], ["blue", "yellow"],["purple", "green"],["yellow", "blue"],["purple", "pink"]],
				samples : {
					"pink" : AudioBuffers.casioPiano.B1,
					"yellow" : AudioBuffers.casioPiano.C2,
					"purple" : AudioBuffers.casioPiano.D2,
					"blue" : AudioBuffers.casioPiano.E2,
					"green" : AudioBuffers.casioPiano.F2,
					"red" : AudioBuffers.casioPiano.G2,
				},
				//the pieces allotted
				pieces : ["pink", "pink", "yellow", "yellow", "purple", "blue", "green", "green", "red"],
				multiplier : .5
			},
			{
				name : "bass",
				//width x height
				layout : [	
						[1, 0, 0, 0, 1, 0, 0, 1],
						[1, 1, 0, 0, 1, 0, 1, 1],
						[1, 1, 1, 0, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 0, 1, 1, 1, 1],
						[1, 1, 0, 0, 1, 0, 1, 1],
						[1, 0, 0, 0, 1, 0, 0, 1],
						],
				//the pattern for this puzzle
				pattern : ["blue", "pink", "yellow", "rest", "green", "rest", "pink", "rest"],
				samples : {
					"green" : AudioBuffers.cs80Brassy.D2, 
					"blue" : AudioBuffers.cs80Brassy.C2,
					"yellow" : AudioBuffers.cs80Brassy.A1,
					"pink" : AudioBuffers.cs80Brassy.G1,
				},
				//the pieces allotted
				pieces : ["green", "blue", "yellow", "pink", "pink"],
				multiplier : .5
			},
			{
				name : "tenor",
				//width x height
				layout : [	
						[1, 0, 0, 0, 1, 0, 0, 1],
						[1, 1, 0, 0, 1, 0, 1, 1],
						[1, 1, 1, 0, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 0, 1, 1, 1, 1],
						[1, 1, 0, 0, 1, 0, 1, 1],
						[1, 0, 0, 0, 1, 0, 0, 1],
						],
				//the pattern for this puzzle
				pattern : ["pink", "yellow", "purple", "blue", "rest", "green", "rest", "blue"],
				samples : {
					"green" : AudioBuffers.casioHorn.A2, 
					"blue" : AudioBuffers.casioHorn.G2, 
					"purple" : AudioBuffers.casioHorn.E2, 
					"yellow" : AudioBuffers.casioHorn.D2,
					"pink" : AudioBuffers.casioHorn.C2,
				},
				//the pieces allotted
				pieces : ["green", "blue", "yellow", "purple", "pink"],
				multiplier : .5
			},
			{
				name : "alto",
				//width x height
				layout : [	
						[1, 0, 0, 0, 1, 0, 0, 1],
						[1, 1, 0, 0, 1, 0, 1, 1],
						[1, 1, 1, 0, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 0, 1, 1, 1, 1],
						[1, 1, 0, 0, 1, 0, 1, 1],
						[1, 0, 0, 0, 1, 0, 0, 1],
						],
				//the pattern for this puzzle
				pattern : ["green", "red", "green", "blue", "purple", "rest", "purple", "blue"],
				samples : {
					"red" : AudioBuffers.casioFunny.F2, 
					"green" : AudioBuffers.casioFunny.E2, 
					"blue" : AudioBuffers.casioFunny.D2, 
					"purple" : AudioBuffers.casioFunny.C2,
				},
				//the pieces allotted
				pieces : ["green", "green", "blue", "purple", "purple", "red"],
				multiplier : .5
			},
			{
				name : "sopra",
				//width x height
				layout : [	
						[1, 0, 0, 0, 1, 0, 0, 1],
						[1, 1, 0, 0, 1, 0, 1, 1],
						[1, 1, 1, 0, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 0, 1, 1, 1, 1],
						[1, 1, 0, 0, 1, 0, 1, 1],
						[1, 0, 0, 0, 1, 0, 0, 1],
						],
				//the pattern for this puzzle
				pattern : ["red", "green", "blue", "pink", "yellow", "rest", "blue", "green"],
				samples : {
					"red" : AudioBuffers.casioClarinet.C4, 
					"green" : AudioBuffers.casioClarinet.B3, 
					"blue" : AudioBuffers.casioClarinet.A3, 
					"yellow" : AudioBuffers.casioClarinet.F3,
					"pink" : AudioBuffers.casioClarinet.E3,
				},
				//the pieces allotted
				pieces : ["green", "green", "blue", "pink", "yellow", "red"],
				multiplier : .5
			},
		]
	},
	/*=========================================================================
		ENDIAN
	=========================================================================*/
	/*{
		name : "Endian",
		color : PieceType.Purple,
		bpm : 120,
		levels : [
				{
				name : "chords",
				//width x height
				layout : [	
						[0, 0, 1, 1, 0, 0, 0, 0],
						[0, 0, 1, 1, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 1, 1],
						[0, 0, 1, 1, 1, 1, 1, 1],
						[1, 1, 1, 1, 1, 1, 0, 0],
						[1, 1, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 1, 1, 0, 0],
						[0, 0, 0, 0, 1, 0, 0, 0]
						],
				//the pattern for this puzzle
				pattern : [["red", "blue", "purple"],["red", "blue", "purple"], ["red", "blue", "purple"], ["red", "blue", "purple"]],
				//the pieces allotted
				pieces : ["red", "blue", "purple"],
				samples : {
					"red" : AudioBuffers.casioHarpsichord.C1,
					"blue" : AudioBuffers.casioHarpsichord.E1,
					"purple" : AudioBuffers.casioHarpsichord.A1,
				},
				multiplier : 1
			},
		]
	},*/
];