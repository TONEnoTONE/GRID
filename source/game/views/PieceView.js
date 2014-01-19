goog.provide("game.views.PieceView");

goog.require("goog.events");
goog.require("goog.events.Event");
goog.require("goog.events.EventHandler");
goog.require("goog.dom");
goog.require("goog.dom.vendor");
goog.require("game.views.PieceSelection");
goog.require("data.Direction");
goog.require("goog.Disposable");
goog.require("data.Const");
goog.require("goog.style");
goog.require('game.views.BoardView');
goog.require('goog.string');
goog.require("goog.style.transition");
goog.require("game.controllers.AudioController");
goog.require('goog.fx.Dragger');
goog.require("goog.fx.dom.FadeOut");
goog.require("goog.fx.dom.FadeIn");

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
	goog.dom.appendChild(BoardView.Board, this.Element);

	/** @type {goog.fx.Dragger} */
	this.dragger = new goog.fx.Dragger(this.Element);
	this.dragger.setHysteresis(5);

	/** @type {goog.events.EventHandler} */
	this.eventhandler = new goog.events.EventHandler();
	this.setEventListeners();

	/** @type {Element} */
	this.Canvas = goog.dom.createDom("div", {"id" : "PieceViewCanvas"});
	goog.dom.appendChild(this.Element, this.Canvas);
	goog.dom.classes.add(this.Canvas, this.model.type);

	/** @private @type {number} */
	this.angle = 0;
	/** @private @type {number} */
	this.lastTouch = 0;
	/** @type {number} */
	this.timeout = -1;
	/** @type {boolean} */
	this.rotatable = false;
	/** @type {boolean} */
	this.isDragged = false;
	/** @type {boolean} */
	this.fadedIn = false;
}

//extend dispoable
goog.inherits(PieceView, goog.Disposable);

/** @override */
PieceView.prototype.disposeInternal = function() {
	//the handler
	this.eventhandler.dispose();
	this.eventhandler = null;
	//remove the Element from the DOM
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	//unlink the model
	this.model = null;
	this.dragger.dispose();
	this.dragger = null;
	//dispose
	goog.base(this, 'disposeInternal');
};

/** 
	highlight the piece
	@param {boolean=} bool
*/
PieceView.prototype.highlight = function(bool){
	if (bool){
		
	} else {
		goog.dom.classes.remove(this.Element, "rotatable");
	}
}

/** 
	render the parameters of the view
*/
PieceView.prototype.render  = function(){
	var model = this.model;
	// this.translateAndRotateAnimated(model.position, model.direction);
}

/** 
	@private
	@param {Direction} direction
*/
PieceView.prototype.updateDirection  = function(direction){
	var relativeAngle =  Direction.toAngle(direction) - (this.angle % 360);
	//find the shortest path
	if (relativeAngle < -180){
		relativeAngle += 360;
	} else if (relativeAngle > 180){
		relativeAngle -= 360;
	}
	this.angle+=relativeAngle;
	var transformString = goog.string.buildString("translate3d(0,0,0) rotate( ",this.angle,"deg) ");
	goog.style.transition.removeAll(this.Canvas);
	goog.style.setStyle(this.Canvas, {
		'transform': transformString,
		'transition': goog.string.buildString(goog.dom.vendor.getVendorPrefix(),"-transform 50ms")
	});
}

PieceView.prototype.updatePosition = function(position){
	var pixelPos = BoardView.positionToPixel(position);
	// goog.style.transition.removeAll(this.Element);
	goog.style.setPosition(this.Element, pixelPos.x, pixelPos.y);
	// goog.style.setStyle(this.Element, {
	// 	"left" : realPos.x,
	// 	"top" : realPos.y,
	// 	"transition-property": "top, left",
	// 	'transition-duration': "50ms"
	// });
}

/**
	@param {boolean} playing
*/
PieceView.prototype.setPlaying = function(playing){
	if (playing){
		goog.dom.classes.add(this.Element, "playing");
	} else {
		goog.dom.classes.remove(this.Element, "playing");
	}
}

//INTERACTIONS//////////////////////////////////////////////////////////////////////////////////////////////


/** 
	sets up the event listeners and callbacks
*/
PieceView.prototype.setEventListeners = function(){
	//on the first drag, replace the one in the selection
	this.dragger.listen(goog.fx.Dragger.EventType.START, this.setActive, false, this);
	this.dragger.listen(goog.fx.Dragger.EventType.DRAG, this.clearTimeout, false, this);
	this.dragger.listen(goog.fx.Dragger.EventType.DRAG, this.dragging, false, this);
	this.dragger.listen(goog.fx.Dragger.EventType.END, this.endDrag, false, this);
	this.eventhandler.listen(this.Element, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], goog.bind(this.mousedown, this));
	this.eventhandler.listen(document, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP], goog.bind(this.clearTimeout, this));
	this.eventhandler.listen(BoardView.Board, [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE], goog.bind(this.mousemove, this));
}

/** 
	replace hte peice in the selection
	@param {goog.fx.DragEvent} e
*/
PieceView.prototype.setActive = function(e){
	// e.preventDefault();
	goog.dom.classes.add(this.Element, "active");
	this.isDragged = true;
}

/** 
	@param {goog.fx.DragEvent} e
*/
PieceView.prototype.endDrag = function(e){
	e.preventDefault();
	goog.dom.classes.remove(this.Element, "active");
	var pixelPos = new goog.math.Coordinate(e.left, e.top);
	var position = BoardView.pixelToPosition(pixelPos);
	//lock in the position
	this.updatePosition(position);
	//potentially remove the piece from the board
	PieceController.pieceDroppedOnBoard(this.model, position);
	this.isDragged = false;
}

/** 
	move the piece to the top document level while it's being dragged
	@param {goog.fx.DragEvent} e
*/
PieceView.prototype.dragging = function(e){
	e.preventDefault();
	var pixelPos = new goog.math.Coordinate(e.left, e.top);
	var position = BoardView.pixelToPosition(pixelPos);
	PieceController.positionOnBoard(this.model, position);
	//start the rotatable timer
	// this.startRotatableTimeout(e.browserEvent);
}

/** 
	@param {goog.events.BrowserEvent} e
*/
PieceView.prototype.mousedown = function(e){
	e.preventDefault();
	// this.startRotatableTimeout(e);
	var now = goog.now();
	// console.log(now - this.lastTouch);
	if (now - this.lastTouch < 600){
		this.setRotatable();
	}
	this.lastTouch = now;
}

PieceView.prototype.startRotatableTimeout = function(e){
	this.timeout = setTimeout(goog.bind(this.setRotatable, this, e), 300);
}

/** 
	@param {goog.events.BrowserEvent} e
*/
PieceView.prototype.mousemove = function(e){
	e.preventDefault();
	// this.maybeReinitTouchEvent(e);
	if (this.rotatable){
		var pos = BoardView.mouseEventToPosition(e);
		var direction = Direction.relativeDirection(this.model.position, pos);
		if (direction){
			this.model.setDirection(direction);
			this.updateDirection(direction);
		}
	}
}

/** 
	@param {goog.events.BrowserEvent} e
*/
PieceView.prototype.clearTimeout = function(e){
	// clearTimeout(this.timeout);
	// this.timeout = -1;
	if (this.rotatable){
		goog.dom.classes.remove(this.Element, "rotatable");
		this.rotatable = false;
		this.dragger.setEnabled(true);
	}
	this.model.makeTrajectoryView();
}

/** 
	sets the piece to rotatable
*/
PieceView.prototype.setRotatable = function(){
	//if it's not on the board it can't be rotated
	if (this.model.onBoard){
		goog.dom.classes.add(this.Element, "rotatable");
		this.rotatable = true;
		this.dragger.setEnabled(false);
	}
	//end the drag
}

/** 
	@private
	@param {goog.events.BrowserEvent} e
*/
PieceView.prototype.maybeReinitTouchEvent = function(e) {
	var type = e.type;
	if (type == goog.events.EventType.TOUCHSTART || type == goog.events.EventType.TOUCHMOVE) {
		e.init(e.getBrowserEvent().targetTouches[0], e.currentTarget);
	} else if (type == goog.events.EventType.TOUCHEND || type == goog.events.EventType.TOUCHCANCEL) {
		e.init(e.getBrowserEvent().changedTouches[0], e.currentTarget);
	}
}

/** 
	@private
	@const
	the fade time in milliseconds
*/
PieceView.prototype.fadeTime = 150;

/** 
	the callback is invoked when the piece is fully faded out
	@param {function()} callback
*/
PieceView.prototype.fadeOutAndIn = function(callback){
	var anim = new goog.fx.dom.FadeOut(this.Canvas, this.fadeTime);
	var fadeIn = goog.bind(this.fadeIn, this);
	this.fadedIn = false;
	goog.events.listen(anim, goog.fx.Transition.EventType.END, function(){
		callback();
		fadeIn();
	});
	anim.play();
}


/** 
	fades the piece back in
*/
PieceView.prototype.fadeIn = function(){
	if (!this.fadedIn){
		this.fadedIn = true;
		var anim = new goog.fx.dom.FadeIn(this.Canvas, this.fadeTime);
		anim.play();
	}
}