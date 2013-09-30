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
	/** @type {CanvasRenderingContext2D} */
	this.context = this.Canvas.getContext('2d');
	/** @private @type {number} */
	this.angle = 0;
	//size the stuff
	this.size();
	//draw the arrow
	this.draw();
	//add the canvas and type as a css class
	goog.dom.appendChild(this.Element, this.Canvas);
	goog.dom.classes.add(this.Canvas, this.model.type);
}

//extend dispoable
goog.inherits(PieceView, goog.Disposable);

/** @override */
PieceView.prototype.disposeInternal = function() {
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
		goog.dom.classes.add(this.Canvas, "selected");
	} else {
		goog.dom.classes.remove(this.Canvas, "selected");
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
	var context = this.context;
	context.moveTo(tileSize - margin * 2, margin);
	context.lineTo(margin, tileSize / 2);
	context.lineTo(tileSize - margin * 2, tileSize - margin);
	context.strokeStyle = Piece.TypeToColor(this.model.type);
	context.lineWidth = 16 * CONST.PIXELSCALAR;
	context.lineCap = 'round';
	context.lineJoin = 'round';
	context.stroke();
}


/** 
	updates all the parameters of the view
*/
PieceView.prototype.render  = function(){
	var model = this.model;
	this.translateAndRotateAnimated(model.position, model.direction);
}

/** 
	@private
	@param {goog.math.Coordinate} position
	@param {Direction} direction
*/
PieceView.prototype.translateAndRotateAnimated  = function(position, direction){
	var translated = BoardView.positionToPixel(position);
	var translateString = goog.string.buildString("translate3d( ",translated.x,"px , ",translated.y,"px, 0)");
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
	var translateString = goog.string.buildString("translate3d( ",translated.x,"px , ",translated.y,"px, 0)");
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
	var stepNum = this.model.trajectory.getLength();
	var duration = goog.string.buildString(AudioController.stepsToSeconds(stepNum).toFixed(3),"s");
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