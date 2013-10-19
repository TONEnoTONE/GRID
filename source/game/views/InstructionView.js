/*=============================================================================
 ___   __    _  _______  _______    __   __  ___   _______  _     _ 
|   | |  |  | ||       ||       |  |  | |  ||   | |       || | _ | |
|   | |   |_| ||  _____||_     _|  |  |_|  ||   | |    ___|| || || |
|   | |       || |_____   |   |    |       ||   | |   |___ |       |
|   | |  _    ||_____  |  |   |    |       ||   | |    ___||       |
|   | | | |   | _____| |  |   |     |     | |   | |   |___ |   _   |
|___| |_|  |__||_______|  |___|      |___|  |___| |_______||__| |__|

=============================================================================*/

goog.provide("game.views.InstructionView");

goog.require("screens.views.GridDom");
goog.require("goog.dom");
goog.require("game.views.InstructionLightView");
goog.require("graphics.KeyframeAnimation");

/** 
	@typedef {Object}
*/
var InstructionView = {
	/** @type {Array.<InstructionLightView>} */
	lights : new Array(CONST.PATTERNLENGTH),
	/** @type {Element} */
	Element : goog.dom.createDom("div", {"id" : "InstructionView"}),
	/** @type {KeyframeAnimation} */
	animation : new KeyframeAnimation([{opacity : 1},{opacity : 0}]),
	//init
	initialize : function(){
		//append it to the dom
		goog.dom.appendChild(GridDom.GameScreen, InstructionView.Element);
		//make the lights for the view
		for (var i = 0; i < CONST.PATTERNLENGTH; i++){
			InstructionView.lights[i] = new InstructionLightView(InstructionView.Element);
		}
	},
	/** 
		@param {Instruction} inst
	*/
	lightUp : function(inst, time){
		//apply the animation to the light
		var light = InstructionView.lights[inst.beat];
		light.setColor(inst.type);
		InstructionView.animation.play(light.light, .5, {repeat : "infinite"});
	},
	/** 
		stops the current lightup
	*/
	stopLightUp : function(inst){
		var light = InstructionView.lights[inst.beat];
		light.removeColor(inst.type);
		InstructionView.animation.stop(light.light);
	},
	/** 
		display the pattern
		@param {Instruction} instruction
	*/
	visualize : function(instruction){
		//get the light at the beat
		InstructionView.lightUp(instruction);
		//and the wall
		WallController.flashDirection(instruction.direction, instruction.type);
	},
	/** 
		stop the current animation
	*/
	stop : function(instruction){

	}
}

InstructionView.initialize();