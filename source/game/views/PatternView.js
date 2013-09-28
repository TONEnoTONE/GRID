/*=============================================================================
 _______  _______  _______  _______  _______  ______    __    _    __   __  ___   _______  _     _ 
|       ||   _   ||       ||       ||       ||    _ |  |  |  | |  |  | |  ||   | |       || | _ | |
|    _  ||  |_|  ||_     _||_     _||    ___||   | ||  |   |_| |  |  |_|  ||   | |    ___|| || || |
|   |_| ||       |  |   |    |   |  |   |___ |   |_||_ |       |  |       ||   | |   |___ |       |
|    ___||       |  |   |    |   |  |    ___||    __  ||  _    |  |       ||   | |    ___||       |
|   |    |   _   |  |   |    |   |  |   |___ |   |  | || | |   |   |     | |   | |   |___ |   _   |
|___|    |__| |__|  |___|    |___|  |_______||___|  |_||_|  |__|    |___|  |___| |_______||__| |__|

the container of all the pattern elements in the GameScreen
=============================================================================*/


goog.provide("game.views.PatternView");

goog.require("screens.views.GridDom");
goog.require("goog.math.Size");

/** 
	@typedef {Object}
*/
var PatternView = {
	/** @type {Element} */
	Element : goog.dom.createDom("div", {"id" : "PatternView"}),
	/** @type {goog.math.Size} */
	Size : new goog.math.Size(0, 0),
	/** @type {number} */
	patternLength : 0,
	initialize : function(){
		//add the element to the dom
		goog.dom.appendChild(GridDom.GameScreen, PatternView.Element);
		PatternView.Size = goog.style.getSize(PatternView.Element);
	},
	/** 
		@param {Pattern.Type} type
		@returns {number} the vertical position in pixels of a type
	*/
	getNoteTopPosition : function(type){
		var multiplier = 0;
		switch(type){
			case Pattern.Type.Red :
				multiplier = 0;
				break;
			case Pattern.Type.Blue :
				multiplier = 1;
				break;
			case Pattern.Type.Green :
				multiplier = 2;
				break;
			case Pattern.Type.Yellow : 
				multiplier = 3;
				break;
			case Pattern.Type.Purple :
				multiplier = 4;
				break;
			case Pattern.Type.Rest :
				multiplier = 2;
				break;
		}
		var elSize = PatternView.Size.height / 7;
		return elSize * (multiplier + 1);
	},
	/** 
		@param {number} beatNumber
		@returns {number} the horizontal position
	*/
	getNoteLeftPosition : function(beatNumber){
		// var elWidth = PatternView.Size.width / PatternController.pattern.getLength();
		var elWidth = PatternView.Size.width / PatternView.patternLength;
		return beatNumber*elWidth;
	},
	/** 
		@returns {number}
	*/
	getNoteWidth : function(){
		return PatternView.Size.width / PatternView.patternLength;
	}
};

PatternView.initialize();