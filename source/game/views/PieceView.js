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


/** 
	@constructor
	@extends {goog.events.EventTarget}
*/
var PieceView = function(model){
	goog.base(this);
	/** @type {Piece} */
	this.model = model;
	/** @type {Element}*/
	this.Element = goog.dom.createDom("div", {"class" : "PieceView"});
	goog.dom.appendChild(BoardView.Board, this.Element);

	/** @type {goog.events.EventHandler} */
	this.eventhandler = new goog.events.EventHandler();
	this.setEventListeners();

	/** @type {Element} */
	this.Canvas = goog.dom.createDom("i", {"id" : "PieceViewCanvas"});
	goog.dom.appendChild(this.Element, this.Canvas);
	goog.dom.classes.add(this.Canvas, this.model.type);

	/** @private @type {number} */
	this.angle = 0;
	/** @type {number} */
	this.timeout = -1;
	/** @type {boolean} */
	this.rotatable = false;
	/** @type {boolean} */
	this.isActive = false;
	/** @type {boolean} */
	this.wasRotated = false;
	/** @type {boolean} */
	this.wasMoved = false;
	/** @type {boolean} */
	this.wasClicked = false;
}

//extend dispoable
goog.inherits(PieceView, goog.events.EventTarget);

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
	goog.style.transition.removeAll(this.Element);
	goog.style.setStyle(this.Element, {
		'transform': transformString,
		// 'transition': goog.string.buildString(goog.dom.vendor.getVendorPrefix(),"-transform 50ms")
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

//INTERACTIONS//////////////////////////////////////////////////////////////////////////////////////////////


/** 
	sets up the event listeners and callbacks
*/
PieceView.prototype.setEventListeners = function(){
	this.eventhandler.listen(document, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP], this.resetMouseFlags, false, this);
	this.eventhandler.listen(this.Element, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.selectPiece, false, this);
	this.eventhandler.listen(document, [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE], this.mousemove, false, this);
	this.eventhandler.listen(document, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.mousedown, false, this);
	this.eventhandler.listen(this.Element, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP], this.mouseup, false, this);
}

/** 
	set the piece as active
	@param {boolean} bool
*/
PieceView.prototype.setActive = function(bool){
	if (!this.model.playing){
		// e.preventDefault();
		this.isActive = bool;
		if (bool){
			goog.dom.classes.add(this.Element, "active");
		} else {
			goog.dom.classes.remove(this.Element, "active");
		}
	}
}

/** 
	@param {goog.events.BrowserEvent} e
*/
PieceView.prototype.mousedown = function(e){
	e.preventDefault();
	if (this.isActive){
		this.maybeReinitTouchEvent(e);
		var pos = BoardView.mouseEventToPosition(e);
		this.setActive(false);
		//place the piece down on this position
		//add the piece to the board (conditionally)
		if (PieceController.positionOnBoard(this.model, pos)){
			this.wasMoved = true;
			this.rotatable = true;
		} else {
			//return to the selection
			PieceController.placeInSelection(this.model);
			this.wasMoved = false;
			this.rotatable = false;
		}
	}
}

/** 
	@param {goog.events.BrowserEvent} e
*/
PieceView.prototype.selectPiece = function(e){
	e.preventDefault();
	this.wasClicked = true;
	if (!this.model.playing){
		this.rotatable = true;
	}
}

/** 
	@param {goog.events.BrowserEvent} e
*/
PieceView.prototype.resetMouseFlags = function(e){
	this.wasMoved = false;
	this.wasRotated = false;
	this.rotatable = false;
	this.wasClicked = false;
}


/** 
	@param {goog.events.BrowserEvent} e
*/
PieceView.prototype.mouseup = function(e){
	e.preventDefault();
	if (!this.isActive && !this.wasMoved && !this.wasRotated && this.wasClicked){
		this.setActive(true);
	}
	this.wasMoved = false;
	this.wasRotated = false;
	this.rotatable = false;
	this.wasClicked = false;
}

/** 
	@param {goog.events.BrowserEvent} e
*/
PieceView.prototype.mousemove = function(e){
	e.preventDefault();
	// this.maybeReinitTouchEvent(e);
	if (this.rotatable && this.model.onBoard){
		//test if the event is more than some delta of movement
		if (!this.wasRotated){
			var thisPos = goog.style.getClientPosition(this.Element);
			var ePos = new goog.math.Coordinate(e.clientX, e.clientY);
			var eDelta = goog.math.Coordinate.distance(thisPos, ePos);
			if (eDelta > CONST.TILESIZE * .5){
				this.wasRotated = true;
			}
		} else {
			var pos = BoardView.mouseEventToPosition(e);
			var direction = Direction.relativeDirection(this.model.position, pos);
			if (direction){
				this.model.setDirection(direction);
			}
		}
	}
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