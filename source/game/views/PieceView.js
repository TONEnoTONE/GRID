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
goog.require("goog.fx.css3.Transition");


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
	/** @type {Element}*/
	this.MouseLayer = goog.dom.createDom("div", {"id" : "MouseLayer"});
	goog.dom.appendChild(this.Element, this.MouseLayer);
	goog.dom.appendChild(this.Element, this.Canvas);
	/** @type {CanvasRenderingContext2D} */
	this.context = this.Canvas.getContext('2d');
	//add the type as a css class
	goog.dom.classes.add(this.Element, this.model.type);
	//bind all the events on Element
	this.mousedownhandler = new goog.events.EventHandler();
	// this.mousedownhandler.listen(this.Element, [goog.events.EventType.MOUSEDOWN, goog.events.EventType.TOUCHSTART], this.mousedown, false, this);
	this.mousedownhandler.listen(this.MouseLayer, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.mousedown, false, this);
	this.mouseuphandler = new goog.events.EventHandler();
	// this.mouseuphandler.listen(this.Element, [goog.events.EventType.MOUSEUP, goog.events.EventType.TOUCHEND], this.mouseup, false, this);
	this.mouseuphandler.listen(this.MouseLayer, [goog.events.EventType.TOUCHEND, goog.events.EventType.CLICK, goog.events.EventType.MOUSEUP, goog.events.EventType.TOUCHCANCEL, goog.events.EventType.MOUSEOUT], this.mouseup, false, this);
	this.mousemovehandler = new goog.events.EventHandler();
	// this.mousemovehandler.listen(GameScreen.Screen, goog.events.EventType.MOUSEMOVE, goog.events.EventType.TOUCHMOVE], this.mousemove, false, this);
	this.mousemovehandler.listen(this.MouseLayer, [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE], this.mousemove, false, this);
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
	/** 
		true the first time the pieceview has been placed
		@type {boolean}
		@private
	*/
	this.first = true;
	/** @private @type {number} */
	this.angle = 0;
	//if its a selection piece, add it to the selection container
	if (this.model.selection){
		goog.dom.appendChild(PieceSelection.Element, this.Element);
	} else {
		this.selected = true;
		goog.dom.classes.add(this.MouseLayer, "expanded");
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
PieceView.prototype.mousedown = function(e){
	e.preventDefault();
	//mark the piece as selected
	this.selected = true;
	//if it's part of the selection
	if (this.model.selection){
		//let the selection know
		PieceSelection.setSelected(this.model.type);
	} else {
		goog.dom.classes.add(this.MouseLayer, "expanded");
	}
}


/**
	@param {goog.events.Event} e The event object.
*/
PieceView.prototype.mouseup = function(e){
	e.preventDefault();
	//pick the piece up?
	if(this.selected && !this.dragged && !this.model.selection && !this.first){
		//otherwise set this piece as the piece selection
		PieceSelection.setSelected(this.model.type);
		//remove from the board
		PieceController.removePiece(this.model);
	}
	this.selected = false;
	this.dragged = false;
	this.first = false;
	goog.dom.classes.remove(this.MouseLayer, "expanded");
}

/**
	@param {goog.events.Event} e The event object.
*/
PieceView.prototype.mousemove = function(e){
	e.preventDefault();
	this.dragged = true;
	if (this.selected && !this.model.selection){
		//rotate the piece based on the relative direction of the event
		var size = goog.style.getSize(this.MouseLayer);
		var position = goog.style.getClientPosition(this.MouseLayer);
		//subtract the touch position
		var pos = new goog.math.Coordinate(e.clientX - position.x, e.clientY - position.y);
		//subtract the size
		pos.translate(-size.width / 2, -size.height / 2);
		pos = BoardView.pixelToPosition(pos);
		var direction = Direction.relativeDirection(new goog.math.Coordinate(-1, -1), pos);
		if (direction !== null){
			this.model.setDirection(direction);
		}
	}
}

/**
	reinits the event if it's a touch
	@private
	@param {goog.events.Event} e The event object.
*/
PieceView.prototype.reinitIfTouch = function(e) {
  var type = e.type;
  if (type == goog.events.EventType.TOUCHSTART ||
      type == goog.events.EventType.TOUCHMOVE) {
    e.init(e.getBrowserEvent().targetTouches[0], e.currentTarget);
  } else if (type == goog.events.EventType.TOUCHEND ||
             type == goog.events.EventType.TOUCHCANCEL) {
    e.init(e.getBrowserEvent().changedTouches[0], e.currentTarget);
  }
};

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
		this.translateAndRotateAnimated(model.position, model.direction);
		// this.rotate(model.direction);
	}
}

/** 
	@private
	@param {goog.math.Coordinate} position
	@param {Direction} direction
*/
PieceView.prototype.translateAndRotateAnimated  = function(position, direction){
	var translated = BoardView.positionToPixel(position);
	var translateString = goog.string.buildString("translate( ",translated.x,"px , ",translated.y,"px)");
	var relativeAngle =  Direction.toAngle(direction) - (this.angle % 360);
	//find the shortest path
	if (relativeAngle < -180){
		relativeAngle += 360;
	} else if (relativeAngle > 180){
		relativeAngle -= 360;
	}
	this.angle+=relativeAngle;
	var rotateString = goog.string.buildString("rotate( ",this.angle,"deg) ");
	var transformString = goog.string.buildString(translateString, rotateString);
	goog.style.transition.removeAll(this.Element);
	goog.style.setStyle(this.Element, {
		'transform': transformString,
		'transition': goog.string.buildString(goog.dom.vendor.getVendorPrefix(),"-transform 50ms")
	});
}

/** 
	@private
	@param {goog.math.Coordinate} position
	@param {Direction} direction
*/
PieceView.prototype.translateAndRotate  = function(position, direction){
	var translated = BoardView.positionToPixel(position);
	var translateString = goog.string.buildString("translate( ",translated.x,"px , ",translated.y,"px)");
	var angle = Direction.toAngle(direction);
	var rotateString = goog.string.buildString("rotate( ",angle,"deg) ");
	var transformString = goog.string.buildString(translateString, rotateString);
	goog.style.setStyle(this.Element, {'transform': transformString});
}

/** 
	sets all the animation parameters
	@param {string} animationName
*/
PieceView.prototype.setAnimation = function(animationName){
	var style = this.Element.style;
	var duration = "2s";
	var animationString = goog.string.buildString(animationName, " ", duration, " linear infinite");
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