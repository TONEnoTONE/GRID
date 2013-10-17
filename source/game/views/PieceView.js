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
	this.setEventListeners();
	/** @type {Element} */
	this.Canvas = goog.dom.createDom("i", {"id" : "PieceViewCanvas", "class" : "icon-chevron-left"});
	/** @private @type {number} */
	this.angle = 0;
	//add the canvas and type as a css class
	goog.dom.appendChild(this.Element, this.Canvas);
	goog.dom.classes.add(this.Canvas, this.model.type);
	/** @type {goog.events.EventHandler} */
	this.clickDownHandler = new goog.events.EventHandler();
	this.clickDownHandler.listen(this.Element, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.mousedown, false, this);
	/** @type {goog.events.EventHandler} */
	this.clickUpHandler = new goog.events.EventHandler();
	this.clickUpHandler.listen(document, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP], this.clearTimeout, false, this);
	/** @type {goog.events.EventHandler} */
	this.moveHandler = new goog.events.EventHandler();
	this.moveHandler.listen(BoardView.Board, [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE], this.mousemove, false, this);
	/** @type {number} */
	this.timeout = -1;
	/** @type {boolean} */
	this.rotatable = false;
}

//extend dispoable
goog.inherits(PieceView, goog.Disposable);

/** @override */
PieceView.prototype.disposeInternal = function() {
	//the handlers
	this.clickDownHandler.dispose();
	this.clickDownHandler = null;
	this.clickUpHandler.dispose();
	this.clickUpHandler = null;
	this.moveHandler.dispose();
	this.moveHandler = null;
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
		goog.dom.classes.add(this.Element, "selected");
	} else {
		goog.dom.classes.remove(this.Element, "selected");
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
	goog.style.transition.removeAll(this.Element);
	goog.style.setStyle(this.Element, {
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

//INTERACTIONS//////////////////////////////////////////////////////////////////////////////////////////////


/** 
	sets up the event listeners and callbacks
*/
PieceView.prototype.setEventListeners = function(){
	//on the first drag, replace the one in the selection
	this.dragger.listenOnce(goog.fx.Dragger.EventType.START, this.replaceSelection, false, this);
	this.dragger.listen(goog.fx.Dragger.EventType.START, this.clearTimeout, false, this);
	this.dragger.listen(goog.fx.Dragger.EventType.DRAG, this.clearTimeout, false, this);
	this.dragger.listen(goog.fx.Dragger.EventType.DRAG, this.dragging, false, this);
	this.dragger.listen(goog.fx.Dragger.EventType.END, this.endDrag, false, this);
}

/** 
	replace hte peice in the selection
	@param {goog.fx.DragEvent} e
*/
PieceView.prototype.replaceSelection = function(e){
	//add this piece to the board
	PieceController.addPiece(this.model);
	PieceSelection.replacePiece(this.model.type);
}

/** 
	@param {goog.fx.DragEvent} e
*/
PieceView.prototype.endDrag = function(e){
	var pixelPos = new goog.math.Coordinate(e.left, e.top);
	var position = BoardView.pixelToPosition(pixelPos);
	//lock in the position
	this.updatePosition(position);
	//potentially remove the piece from the board
	PieceController.removeFromBoard(this.model, position);
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
	this.mousedown(e);
}

/** 
	@param {goog.events.BrowserEvent} e
*/
PieceView.prototype.mousedown = function(e){
	e.preventDefault();
	this.timeout = setTimeout(function(self){
		self.setRotatable();
	}, 300, this);
}

/** 
	@param {goog.events.BrowserEvent} e
*/
PieceView.prototype.mousemove = function(e){
	e.preventDefault();
	this.maybeReinitTouchEvent(e);
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
	clearTimeout(this.timeout);
	this.timeout = -1;
	this.highlight(false);
	this.rotatable = false;
	this.dragger.setEnabled(true);
}

/** 
	sets the piece to rotatable
*/
PieceView.prototype.setRotatable = function(){
	this.highlight(true);
	this.rotatable = true;
	this.dragger.setEnabled(false);
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


//ANIMATIONS////////////////////////////////////////////////////////////////////////////////////////////////

/** 
	sets all the animation parameters
	@param {string} animationName
*/
PieceView.prototype.setAnimation = function(animationName){
	var style = this.Element.style;
	var stepNum = this.model.trajectory.getLength();
	var duration = goog.string.buildString(AudioController.stepsToSeconds(stepNum).toFixed(3),"s");
	var delayTime = goog.string.buildString(AudioController.countInDuration().toFixed(3), "s");
	var animationString = goog.string.buildString(animationName, " ", duration, " linear infinite ", delayTime);
	if (goog.isDef(style["animation"])){
		style["animation"] = animationString;
		style["animationPlayState"] = "running";
	} else if (goog.isDef(style[goog.dom.vendor.getPrefixedPropertyName("animation")])) {
		style[goog.dom.vendor.getPrefixedPropertyName("animation")] = animationString;
		style[goog.dom.vendor.getPrefixedPropertyName("animationPlayState")] = "running";
	}
}

/** 
	pause the animation in place
*/
PieceView.prototype.pauseAnimation = function(){
	var style = this.Element.style;
	var state = "paused";
	if (goog.isDef(style["animationPlayState"])){
		style["animationPlayState"] = state;
	} else if (goog.isDef(style[goog.dom.vendor.getPrefixedPropertyName("animationPlayState")])) {
		style[goog.dom.vendor.getPrefixedPropertyName("animationPlayState")] = state;
	}
}

/** 
	pause the animation in place
*/
PieceView.prototype.stopAnimation = function(){
	var style = this.Element.style;
	if (goog.isDef(style["animation"])){
		style["animation"] = "";
	} else if (goog.isDef(style[goog.dom.vendor.getPrefixedPropertyName("animation")])) {
		style[goog.dom.vendor.getPrefixedPropertyName("animation")] = "";
	}
}