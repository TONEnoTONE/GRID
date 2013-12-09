/*=============================================================================
TILE BUTTONS
=============================================================================*/

goog.provide("game.views.TileButton");

goog.require("game.views.BoardView");
goog.require("data.Direction");

/** 
	@constructor
	@param {Tile} model
*/
var TileButton = function(model){
	/** @param {Tile} */
	this.model = model;
	/** @param {Element} */
	this.container = goog.dom.createDom("div", {"class" : "TileButton"});
	goog.dom.appendChild(BoardView.Board, this.container);
	goog.style.setPosition(this.container, BoardView.positionToPixel(this.model.position));
	/** @type {Element} */
	this.eastButton = goog.dom.createDom("div", {"class"  : Direction.East + " TButton"});
	goog.dom.appendChild(this.container, this.eastButton);
	goog.events.listen(this.eastButton, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.selectDirection, false, this);
	/** @type {Element} */
	this.westButton = goog.dom.createDom("div", {"class"  : Direction.West + " TButton"});
	goog.dom.appendChild(this.container, this.westButton);
	goog.events.listen(this.westButton, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.selectDirection, false, this);
	/** @type {Element} */
	this.northButton = goog.dom.createDom("div", {"class"  : Direction.North + " TButton"});
	goog.dom.appendChild(this.container, this.northButton);
	goog.events.listen(this.northButton, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.selectDirection, false, this);
	/** @type {Element} */
	this.southButton = goog.dom.createDom("div", {"class"  : Direction.South + " TButton"});
	goog.dom.appendChild(this.container, this.southButton);
	goog.events.listen(this.southButton, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.selectDirection, false, this);
}

TileButton.prototype.selectDirection = function(e){
	//get the current instruction tile and place the piece down. 
	var direction = goog.dom.classes.get(e.target)[0];
	//console.log(Instruction.Controller.getInstance().currentInstruction);
	Instruction.Controller.getInstance().validatePosition(this.model.position, direction);
}