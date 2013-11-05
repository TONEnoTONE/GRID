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
goog.require("Card.Pointer");

/** 
	@enum {string}
*/
Card.EventType = {
	NEXT : goog.events.getUniqueId("next"),
	START : goog.events.getUniqueId("start"),
	END : goog.events.getUniqueId("end"),
	CLICKED : goog.events.getUniqueId("clicked"),
	SELECTED : goog.events.getUniqueId("selected"),
	POINTERSELECTED : goog.events.getUniqueId("ptrSelected")
}

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
	/** @type {Card.Pointer} */
	this.pointer = new Card.Pointer();
	//make the scroll bars
	this.makeScrolls();
	/** @type {Object} */
	this.scrollOffset = {scroll : 0};
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
	@param {function(Card.Model)} callback
*/
Card.Controller.prototype.forEach = function(callback){
	var cards = this.cards;
	for (var i = 0, len = cards.length; i < len; i++){
		callback(cards[i]);
	}
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
	var cm = new Card.Model(patterns, stage);
	this.cards.push(cm);
	//and a view for that model
	var stageName = StageController.getStageName(stage);
	var genre = StageController.getStageGenre(stage);
	var cv = new Card.View(cm, stageName, patterns, stage, genre);
	this.views.push(cv);
	this.bindEvents(cm, cv);
	return cm;
}

/** 
	bind the events to the view
	@param {Card.Model} model
	@param {Card.View} view
*/
Card.Controller.prototype.bindEvents = function(model, view){
	goog.events.listen(model, Card.EventType.CLICKED, this.cardSelected, false, this);
	// goog.events.listen(model, Card.EventType.NEXT, this.nextLevel, false, this);
}

/** 
	callback when a card is selected
	@param {goog.events.Event} e
*/
Card.Controller.prototype.cardSelected = function(e){
	//set this one as selected
	var card = e.target;
	if (!card.selected){
		//set all the other ones as not selected
		this.forEach(function(otherCard){
			if (card !== otherCard){
				otherCard.setSelected(false);
			}
		})
		//set the card as selected
		card.setSelected(true);
		//set the stage number
		GameController.newCard(card.stage);
		//setup the instruction
		// PieceController.setStage(card.stage, 0);
		this.pointer.setLevel(0);
	}
}

/** 
	@param {number} level
*/
Card.Controller.prototype.setLevel = function(level){
	this.pointer.setLevel(level);
}

/** 
	@param {function(Card.PointerLight)} callback
	@param {Object} ctx
*/
Card.Controller.prototype.listenForPointerSelected = function(callback, ctx){
	var pointers = this.pointer.pointers;
	for (var i = 0; i < pointers.length; i++){
		goog.events.listen(pointers[i], Card.EventType.POINTERSELECTED, callback, false, ctx);
	}
}

/** 
	@private
*/
Card.Controller.prototype.makeScrolls = function(){
	var topScroll = goog.dom.createDom("div", {"id" : "CardTopScroll", "class" : "scrollerHandle"}, "^");
	var bottomScroll = goog.dom.createDom("div", {"id" : "CardBottomScroll", "class" : "scrollerHandle"}, "v");
	goog.dom.appendChild(GridDom.CardScroller, topScroll);
	goog.dom.appendChild(GridDom.CardScroller, bottomScroll);
	//set the scroll top of GridDom.CardContainer
	var jumpSize = 10;
	var mousedown = false;
	var that = this;
	goog.events.listen(bottomScroll, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], function(){
		that.scrollOffset.scroll = jumpSize;
		that.scrollTimeout();
	});
	goog.events.listen(topScroll, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], function(){
		that.scrollOffset.scroll = -jumpSize;
		that.scrollTimeout();
	});
	goog.events.listen(bottomScroll, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP, goog.events.EventType.MOUSEOUT], function(){
		that.scrollOffset.scroll = 0;
	});
	goog.events.listen(topScroll, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP, goog.events.EventType.MOUSEOUT], function(){
		that.scrollOffset.scroll = 0;
	});
}

/** 
	@private
*/
Card.Controller.prototype.scrollTimeout = function(){
	if (this.scrollOffset.scroll !== 0){
		var that = this;
		setTimeout(function(){
			that.scrollTimeout();
			GridDom.CardScroller.scrollTop += that.scrollOffset.scroll;
			that = null;
		}, 50);
	}
}

//make it a singleton
goog.addSingletonGetter(Card.Controller);
//and instantiate it
Card.Controller.getInstance();

