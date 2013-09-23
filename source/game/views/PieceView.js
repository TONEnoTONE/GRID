goog.provide("game.views.PieceView");

goog.require("goog.events");
goog.require("goog.events.Event");
goog.require("goog.events.EventHandler");
goog.require("goog.dom");
goog.require("game.views.PieceSelection");
goog.require("data.Direction");
goog.require("goog.Disposable");


/** 
	@constructor
	@extends {goog.Disposable}
*/
var PieceView = function(model){
	goog.base(this);
	/** @type {Piece} */
	this.model = model;
	/** @type {Element}*/
	this.Element = goog.dom.createDom("div", {"class" : "PieceView"});
	/** @type {Element} */
	this.Canvas = goog.dom.createDom("canvas", {"id" : "PieceViewCanvas"});
	goog.dom.appendChild(this.Element, this.Canvas);
	/** @type */
	//add the type as a css class
	goog.dom.classes.add(this.Element, this.model.type);
	//bind all the events on Element
	this.mousedownhandler = new goog.events.EventHandler();
	this.mousedownhandler.listen(this.Element, [goog.events.EventType.MOUSEDOWN, goog.events.EventType.TOUCHSTART], this.mousedown, false, this);
	this.mouseuphandler = new goog.events.EventHandler();
	this.mouseuphandler.listen(this.Element, [goog.events.EventType.MOUSEUP, goog.events.EventType.TOUCHEND], this.mouseup, false, this);
	this.mousemovehandler = new goog.events.EventHandler();
	this.mousemovehandler.listen(GameScreen.Screen, [goog.events.EventType.MOUSEMOVE, goog.events.EventType.TOUCHMOVE], this.mousemove, false, this);
	/** 
		internal indicator to determine if there was a drag event while the piece was selected
		@type {boolean}
		@private
	*/
	this.dragged = false;
	/** 
		indicates if the mousedown event happened on this piece
		@type {boolean}
		@private
	*/
	this.selected = false;
	//if its a selection piece, add it to the selection container
	if (this.model.selection){
		goog.dom.appendChild(PieceSelection.Element, this.Element);
	}
}

//extend dispoable
goog.inherits(PieceView, goog.Disposable);

/** @override */
PieceView.prototype.disposeInternal = function() {
    this.mousedownhandler.dispose();
    this.mouseuphandler.dispose();
    this.mosuemovehandler.dispose();
    //remove the Element from the DOM
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	//unlink the model
    this.model = null;
    //dispose
	goog.base(this, 'disposeInternal');
};

/**
	@param {goog.events.Event} e The event object.
*/
PieceView.prototype.mousedown = function(e){
	//mark the piece as selected
	this.selected = true;
}

/**
	@param {goog.events.Event} e The event object.
*/
PieceView.prototype.mouseup = function(e){
	//pick the piece up?
	if(this.selected && !this.dragged){
		//if it's a selection piece
		if (this.model.selection){
			//make a new piece and set it to the piece selection
			PieceSelection.selected = new Piece(this.model.type);
		} else {
			//otherwise set this piece as the piece selection
			this.model.onBoard(false);
			PieceSelection.selected = this.model;
		}
	}
	this.selected = false;
	this.dragged = false;
}

/**
	@param {goog.events.Event} e The event object.
*/
PieceView.prototype.mousemove = function(e){
	e.preventDefault();
	if (this.selected && !this.model.selection){
		//don't fire this event on any more things!
		e.stopPropagation();
		//rotate the piece based on the relative direction of the event
		var pos = new goog.math.Coordinate(e.offsetX, e.offsetY);
		var direction = Direction.relativeDirection(this.model.position, pos);
		if (direction !== null){
			this.model.setDirection(direction);
		}
	}
}

/** 
	setup the sizes of the canvas and elements
*/
PieceView.prototype.size = function(){

}

/** 
	updates all the parameters of the view
*/
PieceView.prototype.render  = function(){

}