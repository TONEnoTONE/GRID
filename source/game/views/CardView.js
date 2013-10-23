/*=============================================================================
 _______  _______  ______    ______     __   __  ___   _______  _     _ 
|       ||   _   ||    _ |  |      |   |  | |  ||   | |       || | _ | |
|       ||  |_|  ||   | ||  |  _    |  |  |_|  ||   | |    ___|| || || |
|       ||       ||   |_||_ | | |   |  |       ||   | |   |___ |       |
|      _||       ||    __  || |_|   |  |       ||   | |    ___||       |
|     |_ |   _   ||   |  | ||       |   |     | |   | |   |___ |   _   |
|_______||__| |__||___|  |_||______|     |___|  |___| |_______||__| |__|

=============================================================================*/

goog.provide("Card.View");

goog.require("goog.dom");
goog.require("goog.events.EventTarget");
goog.require("game.views.PatternView");
goog.require("screens.views.GridDom");

/** 
	a card that represents an entire song
	@constructor
	@extends {goog.events.EventTarget}
	@param {Card.Model} model
	@param {string} stageName
	@param {Array.<Pattern>} patterns
*/
Card.View = function(model, stageName, patterns){
	goog.base(this);
	/** @type {Card.Model} */
	this.model = model;
	/** @type {Element} */
	this.Element = goog.dom.createDom("div", {"class" : "CardView", "id" : stageName});
	var title = goog.dom.createDom("div", {"id" : "Title"}, stageName);
	goog.dom.appendChild(GridDom.CardContainer, this.Element);
	goog.dom.appendChild(this.Element, title);
	/** @type {Array.<Element>}*/
	this.containers = new Array(patterns.length);
	this.makeContainer(patterns.length);
	/** @type {Array.<PatternView>} */
	this.views = new Array(patterns.length);
	//add the patterns to the card
	this.addPatterns(patterns);
	//bind the events
	this.bindEvents();
}

//extend
goog.inherits(Card.View, goog.events.EventTarget);

/** @override */
Card.View.prototype.disposeInternal = function(){
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	this.model = null;
	goog.base(this, "disposeInternal");
}

/**
	makes all the containers for the card
	@param {number} num
*/
Card.View.prototype.makeContainer = function(num){
	for (var i = 0; i < num; i++){
		var el = goog.dom.createDom("div", {"class" : "PatternContainer"});
		goog.dom.appendChild(this.Element, el);
		this.containers[i] = el;
	}
}

/**
	add the patterns to the view
	@param {Array.<Pattern>} patterns
*/
Card.View.prototype.addPatterns = function(patterns){
	for (var i = 0; i < patterns.length; i++){
		//make a pattern view for each of the patterns
		var pattern = patterns[i];
		var view = new PatternView(this.containers[i], pattern.getLength());
		view.displayPattern(pattern);
		view.displayRests(pattern);
		this.views[i] = view;
	}
}

/** 
	listen for and bind events on the model
*/
Card.View.prototype.bindEvents = function(){
	goog.events.listen(this.model, Card.EventType.NEXT, this.indicate, false, this);
	goog.events.listen(this.Element, [goog.events.EventType.TOUCHEND, goog.events.EventType.CLICK], this.clicked, false, this);
}

/** 
	indicates the current pattern
	@param {goog.events.Event} e
*/
Card.View.prototype.indicate = function(e){
	var progress = e.target.progress;
	console.log(progress);
}

/** 
	@param {goog.events.BrowserEvent} e
*/
Card.View.prototype.clicked = function(e){
	this.model.dispatchEvent(Card.EventType.CLICKED);
}