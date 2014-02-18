/*=============================================================================
	PARTS SCREEN BUTTON PATTERN

	displays the animated pattern when in play mode
=============================================================================*/

goog.provide("screens.views.PartsScreenButtonPattern");

goog.require("game.controllers.StageController");
goog.require('goog.Disposable');


/** 
	@constructor
	@extends {goog.Disposable}
	@param {number} stage
	@param {number} level
	@param {Element} container
*/
var PartsScreenButtonPattern = function(stage, level, container){
	goog.base(this);
	/** @type {number} */
	this.stage = stage;
	/** @type {number} */
	this.level = level;
	/** @private @type {Element} */
	this.Element = goog.dom.createDom("div", {"id" : "PartsScreenButtonPattern"});
	goog.dom.appendChild(container, this.Element);

	//the pattern
	var pattern = StageController.getPattern(stage, level);
	if (pattern.isEmpty()){
		pattern = StageController.getStagePattern(stage, level);
	}
	/** @type {Pattern} */
	this.pattern = pattern;
	this.pattern.setLength(pattern.length / 2);

	/** @type {Object}*/
	this.pieces = {};
	//get the colors of the stage
	// var available = StageController.getAvailablePieces(stage,level);
	var colors = PieceType.toArray();
	for (var i = 0 ; i < colors.length; i++){
		var color = colors[i];
		var p = new PartsScreenButtonPatternPiece(color, this.Element);
		this.pieces[color] = p;
	}
}

goog.inherits(PartsScreenButtonPattern, goog.Disposable);

/** 
	@override
*/
PartsScreenButtonPattern.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	for (var p in this.pieces){
		var piece = this.pieces[p];
		piece.dispose();
	}
	this.pieces = null;
	goog.base(this, "disposeInternal");
}

/** 
	fade the pattern in
*/
PartsScreenButtonPattern.prototype.fadeIn = function(){
	goog.dom.classes.add(this.Element, "visible");
}

/** 
	fade the pattern out
*/
PartsScreenButtonPattern.prototype.fadeOut = function(){
	goog.dom.classes.remove(this.Element, "visible");	
}

/** 
	play the animation
	@param {number} delay
*/
PartsScreenButtonPattern.prototype.play = function(delay){
	//get the beatTime
	var tempo = StageController.getBpm(this.stage, this.level);
	var beatTime = AudioController.stepsToSeconds(1, tempo);
	var duration = this.pattern.length * beatTime;
	var pieces = this.pieces;
	this.pattern.forEach(function(hit){
		var p = pieces[hit.type];
		p.play(beatTime * hit.beat + delay, duration);
	});
}

/** 
	stop the pattern from playing
*/
PartsScreenButtonPattern.prototype.stop = function(){
	for (var p in this.pieces){
		var piece = this.pieces[p];
		piece.stop();
	}
}

/** 
	@constructor
	@extends {goog.Disposable}
	@param {PieceType} color
	@param {Element} container
*/
var PartsScreenButtonPatternPiece = function(color, container){
	goog.base(this);
	/** @private @type {Element} */
	this.Element = goog.dom.createDom("div", {"class" : "Piece "+color});
	goog.dom.appendChild(container, this.Element);
	/** @private @type {Element} */
	this.Image = goog.dom.createDom("div", {"id" : "Boomerang"});
	goog.dom.appendChild(this.Element, this.Image);
	/** @type {Array.<Element>}*/
	this.fills = [];
}

goog.inherits(PartsScreenButtonPatternPiece, goog.Disposable);

/** 
	@override
*/
PartsScreenButtonPatternPiece.prototype.disposeInternal = function(){
	for (var i = 0; i < this.fills.length; i++){
		var fill = this.fills[i];
		this.flashAnimation.stop(fill);
		goog.dom.removeNode(fill);
	}
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	goog.base(this, "disposeInternal");
}

/** 
	animate hit
*/
PartsScreenButtonPatternPiece.prototype.play = function(delay, duration){
	//make a new fill, add it to the Element
	var fill = goog.dom.createDom("div", {"class" : "Fill"});
	goog.dom.appendChild(this.Element, fill);
	//animate that fill
	this.flashAnimation.play(fill, duration, {delay : delay, repeat : "infinite"});
	this.fills.push(fill);
}

/** 
	animate hit
*/
PartsScreenButtonPatternPiece.prototype.stop = function(){
	for (var i = 0; i < this.fills.length; i++){
		var fill = this.fills[i];
		this.flashAnimation.stop(fill);
		goog.dom.removeNode(fill);
	}
	this.fills = [];
}

/** @type {Animation.Keyframe} */
PartsScreenButtonPatternPiece.prototype.flashAnimation = new Animation.Keyframe([
		{opacity : 0},
		{opacity : 1}, 
		{opacity : 0}], 
		[0, 1, 20]);