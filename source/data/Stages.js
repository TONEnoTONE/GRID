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

/** @const */
var Stages = [
	{
		name : "stage0",
		levels : [
			{
			name : "verse0",
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
			pattern : ["red", "rest", "green", "rest"],
			//the pieces allotted
			pieces : ["red", "green"]
			},
			{
			name : "verse2",
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
			pattern : {},
			//the pieces allotted
			pieces : ["red", "green"]
			}
		]
	},
	{
		name : "stage1",
		levels : [
			{
			name : "verse0",
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
			pattern : {},
			//the pieces allotted
			pieces : ["red", "green"]
			}
		]
	},
	{
		name : "stage2",
		levels : [
			{
			name : "verse0",
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
			pattern : {},
			//the pieces allotted
			pieces : ["red", "green"]
			}
		]
	}
];
