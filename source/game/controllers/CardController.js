/*=============================================================================
 _______  _______  ______    ______     _______  _______  ______    ___     
|       ||   _   ||    _ |  |      |   |       ||       ||    _ |  |   |    
|       ||  |_|  ||   | ||  |  _    |  |       ||_     _||   | ||  |   |    
|       ||       ||   |_||_ | | |   |  |       |  |   |  |   |_||_ |   |    
|      _||       ||    __  || |_|   |  |      _|  |   |  |    __  ||   |___ 
|     |_ |   _   ||   |  | ||       |  |     |_   |   |  |   |  | ||       |
|_______||__| |__||___|  |_||______|   |_______|  |___|  |___|  |_||_______|

=============================================================================*/

goog.provide("Card.Controller");
goog.provide("Card.EventType");

goog.require("Card.View");
goog.require("Card.Model");
goog.require("game.controllers.StageController");

/** 
	@constructor
	@extends {goog.events.EventTarget}
*/
Card.Controller = function(){
	/** @type {Array.<Card.Model>} */
	this.cards = [];
	/** @type {Array.<Card.View>} */
	this.views = [];
	//make a card for all the stages
	var stageCount = StageController.getStageCount();
	for (var i = 0; i < stageCount; i++){
		this.addCard(i);
	}
}

goog.inherits(Card.Controller, goog.events.EventTarget);

/** @override */
Card.Controller.prototype.disposeInternal = function(){
	//get rid of everything
	for (var i = 0; i < this.cards.length; i++){
		this.cards[i].dispose();
		this.cards[i] = null;
	}
	this.cards = null;
	for (var i = 0; i < this.views.length; i++){
		this.views[i].dispose();
		this.views[i] = null;
	}
	this.views = null;
}

/** 
	add the cards and bind the events to the view
	@param {number} stage
	@returns {Card.Model} the card that was created
*/
Card.Controller.prototype.addCard = function(stage){
	//get all the levels for the stage in an array
	var levels = StageController.getLevelCount(stage);
	var patterns = new Array(levels);
	for (var i = 0; i < levels; i++){
		var pattern = StageController.getPattern(stage, i);
		var p = new Pattern(pattern);
		patterns[i] = p;
	}
	var cm = new Card.Model(patterns);
	this.cards.push(cm);
	//and a view for that model
	var stageName = StageController.getStageName(stage);
	var cv = new Card.View(cm, stageName, patterns);
	this.views.push(cv);
	this.bindEvents(cm, cv);
}

/** 
	bind the events to the view
	@param {Card.Model} model
	@param {Card.View} view
*/
Card.Controller.prototype.bindEvents = function(model, view){
	goog.events.listen(model, Card.EventType.NEXT, view.indicate, false, view);
	goog.events.listen(model, Card.EventType.CLICKED, this.cardSelected, false, this);
}

/** 
	callback when a card is selected
	@param {goog.events.Event} e
*/
Card.Controller.prototype.cardSelected = function(e){
	var i = e.target;
	console.log(e.target);
}

//make it a singleton
goog.addSingletonGetter(Card.Controller);
//and instantiate it
Card.Controller.getInstance();

/*=============================================================================
 EventType
=============================================================================*/

/** 
	@enum {string}
*/
Card.EventType = {
	NEXT : goog.events.getUniqueId("next"),
	START : goog.events.getUniqueId("start"),
	END : goog.events.getUniqueId("end"),
	CLICKED : goog.events.getUniqueId("clicked")
}