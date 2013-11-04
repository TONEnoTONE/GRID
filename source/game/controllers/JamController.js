/*=============================================================================
     ___  _______  __   __    _______  _______  ______    ___     
    |   ||   _   ||  |_|  |  |       ||       ||    _ |  |   |    
    |   ||  |_|  ||       |  |       ||_     _||   | ||  |   |    
    |   ||       ||       |  |       |  |   |  |   |_||_ |   |    
 ___|   ||       ||       |  |      _|  |   |  |    __  ||   |___ 
|       ||   _   || ||_|| |  |     |_   |   |  |   |  | ||       |
|_______||__| |__||_|   |_|  |_______|  |___|  |___|  |_||_______|

when pieces are placed on the board in jam mode
=============================================================================*/

//listen for secondClicks and send pieces in circular motion
//sound stops when piece gets picked up
//select the instruments by selecting the song section

goog.provide("Jam.Controller");

goog.require("game.controllers.PieceController");
goog.require("Card.Controller");
goog.require("Jam.Loop");

/** 
	@constructor
*/
Jam.Controller = function(){
	/** @type {Array.<Jam.Loop>} */
	this.loops = [];
	/** @type {number} */
	this.stage = -1;
	/** @type {boolean} */
	this.isJamMode = false;
}

Jam.Controller.prototype.listenForEvents = function(){
	//listen for a second click on each of the pieces on the board
	//listen for pieces being picked up
	var that = this;
	PieceController.forEachAll(function(piece){
		goog.events.listen(piece, Piece.EventType.SECONDCLICK, that.addPiece, false, that);
		goog.events.listen(piece, Piece.EventType.PICKEDUP, that.removePiece, false, that);
	});
	//listen for changes to the song level when selected
	Card.Controller.getInstance().listenForPointerSelected(this.switchSection, this);
}

/** 
	@param {goog.events.Event} e
	get the piece going
*/
Jam.Controller.prototype.addPiece = function(e){
	if (this.isJamMode){
		var piece = e.target;
		if (this.loops.length === 0){
			//start the transport
			AudioController.startTransport();
		}
		if (this.getLoop(piece) === null){
			var loop = new Jam.Loop(piece);
			this.loops.push(loop);
		}
	}
}


/** 
	@param {goog.events.Event} e
	stop the piece
*/
Jam.Controller.prototype.removePiece = function(e){
	if (this.isJamMode){
		var piece = e.target;
		if (this.loops.length === 0){
			//stop the transport
		}
		var loop = this.getLoop(piece);
		if (loop !== null){
			loop.stop();
			goog.array.remove(this.loops, loop);
			loop.dispose();
		}
	}
}

/** 
	@param {Piece} piece
	stop the piece
*/
Jam.Controller.prototype.getLoop = function(piece){
	var ret = null;
	this.forEach(function(loop){
		if (loop.piece === piece){
			ret = loop;
		}
	});
	return ret;
}

/** 
	@param {function(Jam.Loop)} callback
*/
Jam.Controller.prototype.forEach = function(callback){
	for (var i = 0; i < this.loops.length; i++){
		callback(this.loops[i]);
	}
}

/** 
	a new card was placed in
	@param {number} stage
*/
Jam.Controller.prototype.newCard = function(stage){
	this.stage = stage;
	//remove all the old loops
	this.forEach(function(loop){
		loop.dispose();
	});
	this.loops = [];
	//listen for new events
	this.listenForEvents();
}

/** 
	@param {goog.events.Event} e
*/
Jam.Controller.prototype.switchSection = function(e){
	if (this.isJamMode){
		var position = e.target.position;
		var levels = StageController.getLevelCount(this.stage);
		if (position < levels){
			Card.Controller.getInstance().setLevel(position);
			AudioController.setStage(this.stage, position);
			//switch all the loops sounds
			this.forEach(function(loop){
				loop.changeSection();
			})
		}
	}
}

/** 
	a new card was placed in
	@param {number} stage
*/
Jam.Controller.prototype.end = function(){
	this.stage = -1;
	//remove all the old loops
	this.forEach(function(loop){
		loop.dispose();
	});
	this.loops = [];
}

/** 
	a new card was placed in
	@param {number} stage
*/
Jam.Controller.prototype.start = function(stage){
	this.newCard(stage);
}

//finally make it a singleton
goog.addSingletonGetter(Jam.Controller);
Jam.Controller.getInstance();


