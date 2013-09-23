goog.provide("game.views.PieceView");

goog.require("goog.events");
goog.require("goog.events.Event");
goog.require("goog.events.EventHandler");
goog.require("goog.dom");
goog.require("game.views.PieceSelection");
goog.require("data.Direction");
goog.require("goog.Disposable");
goog.require("data.Const");
goog.require("goog.style");
goog.require('game.views.BoardView');


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
	/** @type {CanvasRenderingContext2D} */
	this.context = this.Canvas.getContext('2d');
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
	//size the stuff
	this.size();
	//draw the arrow
	this.draw();
}

//extend dispoable
goog.inherits(PieceView, goog.Disposable);

/** @override */
PieceView.prototype.disposeInternal = function() {
    this.mousedownhandler.dispose();
    this.mouseuphandler.dispose();
    this.mousemovehandler.dispose();
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
	e.preventDefault();
	e.stopPropagation();
	//mark the piece as selected
	this.selected = true;
	//if it's part of the selection
	if (this.model.selection){
		//let the selection know
		PieceSelection.setSelected(this.model.type);
	}
}

/** 
	highlight the piece
	@param {boolean=} bool
*/
PieceView.prototype.highlight = function(bool){
	if (bool){
		goog.dom.classes.add(this.Element, "selected");
	} else {
		goog.dom.classes.remove(this.Element, "selected");
	}
}

/**
	@param {goog.events.Event} e The event object.
*/
PieceView.prototype.mouseup = function(e){
	e.preventDefault();
	e.stopPropagation();
	//pick the piece up?
	if(this.selected && !this.dragged && !this.model.selection){
		//otherwise set this piece as the piece selection
		PieceSelection.setSelected(this.model.type);
		//remove from the board
		// goog.array.remove(PieceController.pieces, this);
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
	var size = CONST.TILESIZE;
	goog.style.setSize(this.Canvas, size, size);
	this.context.canvas.height = size;
	this.context.canvas.width = size;
}

/** 
	draw the arrow
*/
PieceView.prototype.draw = function(){
	var tileSize = CONST.TILESIZE;
	var margin = 16 * CONST.PIXELSCALAR;
	this.context.moveTo(tileSize - margin * 2, margin);
	this.context.lineTo(margin, tileSize / 2);
	this.context.lineTo(tileSize - margin * 2, tileSize - margin);
	this.context.strokeStyle = Piece.TypeToColor(this.model.type);
	this.context.lineWidth = 16 * CONST.PIXELSCALAR;
	this.context.lineCap = 'round';
	this.context.lineJoin = 'round';
	this.context.stroke();
}


/** 
	updates all the parameters of the view
*/
PieceView.prototype.render  = function(){
	var model = this.model;
	if (!model.selection){
		if (model.onboard){
			goog.dom.appendChild(BoardView.Board, this.Element);
		} else {
			goog.dom.removeNode(this.Element);
		}
		this.translate(model.position);
	}
}

/** 
	@private
	@param {goog.math.Coordinate} position
*/
PieceView.prototype.translate  = function(position){
	var translated = BoardView.positionToPixel(position);
	var translateString = "translate( "+translated.x+"px , "+translated.y+"px)";
	var style = {
		"-webkit-transform-origin " : "0px 0px",
		"-ms-transform-origin " : "0px 0px",
		"transform-origin " : "0px 0px",
		"transform" : translateString,
		"-ms-transform" : translateString,
		"-webkit-transform" :translateString
	};
	goog.style.setStyle(this.Element, style);
}