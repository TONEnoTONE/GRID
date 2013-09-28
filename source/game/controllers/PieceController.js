/*=============================================================================
 _______  ___   _______  _______  _______  _______ 
|       ||   | |       ||       ||       ||       |
|    _  ||   | |    ___||       ||    ___||  _____|
|   |_| ||   | |   |___ |       ||   |___ | |_____ 
|    ___||   | |    ___||      _||    ___||_____  |
|   |    |   | |   |___ |     |_ |   |___  _____| |
|___|    |___| |_______||_______||_______||_______|

The piece controller. 
collision detection between pieces
=============================================================================*/

goog.provide("game.controllers.PieceController");

goog.require("goog.math.Coordinate");
goog.require("goog.array");
goog.require("game.models.Piece");
goog.require("game.controllers.StageController");
goog.require("game.views.PieceSelection");

var PieceController = {
	/** @private
		@type {Array.<Piece>} */
	pieces : [],
	/** @private 
		@type {number} */
	cycleLength : 0,
	/*=========================================================================
		SETUP
	=========================================================================*/
	/** 
		clear all the pieces
	*/
	reset : function(){
		PieceController.forEach(function(piece){
			piece.dispose();
		})
		//clear the array
		PieceController.pieces = [];
		PieceSelection.reset();
	},
	/** 
		pulls the current level from the StageController
		@param {number} stage
		@param {number} level
	*/
	setStage : function(stage, level){
		//reset the old setup
		PieceController.reset();
		//start a new one
		var pieces = [];
		var pieceTypes = StageController.getAvailablePieces(stage, level);
		PieceSelection.setAvailablePieces(pieceTypes);
	},
	/**
		iterator over all the pieces
		@param {function(Piece, number)} callback takes the object and the index
	*/
	forEach : function(callback){
		for (var i = 0, len = PieceController.pieces.length; i < len; i++){
			var piece = PieceController.pieces[i];
			callback(piece, i);
		}
	},

	/** 
		@param {goog.math.Coordinate} position
		@returns {Piece | null} return the piece that's at position
	*/
	pieceAt : function(position){
		var retPiece = null;
		PieceController.forEach(function(piece, index){
			if (goog.math.Coordinate.equals(piece.position, position)){
			 	retPiece = piece
			 }
		});
		return retPiece;
	},
	/*=========================================================================
		COMPUTE
	=========================================================================*/
	/** 
		@private
		updates all of the pieces which need updating
	*/
	updateTrajectories : function(){
		var wasUpdated = false;
		PieceController.forEach(function(piece){
			wasUpdated = piece.updateTrajectory() || wasUpdated;
		});
		if (wasUpdated){
			//update the length
			PieceController.cycleLength = PieceController.leastCommonMultiple();
		}
	},
	/** 
		@returns {number} the step there was a collision at, or -1 for no collisions
	*/
	collisionStep : function(){
		var len = PieceController.cycleLength;
		for (var step = 0; step < len; step++){
			if (PieceController.collisionAtStep(step)){
				return step;
			}
		}
		return -1;
	},
	/** 
		test a collision at a step
		O(n*log(n)) where n = number of pieces
		@param {number} step
		@returns {boolean} if there is a collision
	*/
	collisionAtStep : function(step){
		var len = PieceController.pieces.length;
		for (var i = 0; i < len; i++){
			//compare this piece against all the later ones
			var testStep = PieceController.pieces[i].trajectory.stepAt(step);
			for (var j = i + 1; j < len; j++){
				var compareStep = PieceController.pieces[j].trajectory.stepAt(step);
				if (testStep.collidesWith(compareStep)){
					return true;
				}
			}
		}
		return false;
	},
	/** 
		compute the lowest common multiple of the trajectory lengths
		@private
		@returns {number} lcm of all the lengths
	*/
	leastCommonMultiple : function(){
		if (PieceController.pieces.length > 1){
			var gcd = PieceController.pieces[0].trajectory.getLength();
			for (var i = 1, len = PieceController.pieces.length; i < len; i++){
				var piece = PieceController.pieces[i];
				gcd = PieceController.gcd(gcd, piece.trajectory.getLength());
			}
			var total = gcd;
			for (var i = 1, len = PieceController.pieces.length; i < len; i++){
				var piece = PieceController.pieces[i];
				total*=piece.trajectory.getLength();
			}
			return total / gcd;
		} else if(PieceController.pieces.length === 1){
			return PieceController.pieces[0].trajectory.getLength();
		} else {
			return 0;
		}
	},
	/** 
		used to compute the lowest common multiple
		@private
		@param {!number} a
		@param {!number} b
		@returns {!number} greatest common denominator of the two numbers
	*/
	gcd : function(a, b){
		if (a == 0)
			return b;
		while (b != 0) {
			if (a > b)
				a = a - b;
			else
				b = b - a;
		}
		return a;
	},
	/** 
		@returns {Array.<Array>} the hits on each of the beats
	*/
	hitPattern : function(){
		var hits = new Array(PieceController.cycleLength / 2);
		//make the multidimensional array
		for (var i = 0; i < hits.length; i++){
			hits[i] = [];
		}
		PieceController.forEach(function(piece){
			var hitBeats = piece.getHits();
			for (var i = 0; i < hitBeats.length; i++){
				var hitBeat = hitBeats[i];
				if (hitBeat < PieceController.cycleLength / 2){
					hits[hitBeat].push(piece.type);
				}
			}
		});
		return hits;
	},
	/*=========================================================================
		PLAY / STOP
	=========================================================================*/
	/** 
		generate and play all the animations
	*/
	play : function(){
		PieceController.forEach(function(piece){
			piece.play();
		})
	},
	/** 
		stop the animation
	*/
	stop : function(){
		PieceController.forEach(function(piece){
			piece.stop();
		})
	},
	/** 
		pause the animation
	*/
	pause : function(){
		PieceController.forEach(function(piece){
			piece.pause();
		})	
	},
	/*=========================================================================
		INTERACTIONS
	=========================================================================*/
	/** 
		@private
		@type {Piece}
	*/
	activePiece : null,
	/** 
		@private
		@type {boolean}
	*/
	isPieceNew : false,
	/** 
		select the tile if there is 
		@param {!goog.math.Coordinate} position
	*/
	selectPosition : function(position){
		//if there is a piece at that position
		//mark it as active
		var pieceUnderPosition = PieceController.pieceAt(position);
		if (pieceUnderPosition !== null){
			PieceController.activePiece = pieceUnderPosition;
			PieceController.isPieceNew = false;
		} else { //otherwise add a piece at that position
			PieceController.addPiece(position);
		}
	},
	/** 
		unselect selected
	*/
	clearSelected : function(){
		PieceController.activePiece = null;
		PieceController.isPieceNew = false;
		PieceSelection.clearSelected();
	},
	/** 
		add a piece at this position
		@param {!goog.math.Coordinate} position
		@returns {Piece|null} piece if one was made
	*/
	addPiece : function(position){
		//if there has been a piece from the piece selection
		var selectedType = PieceSelection.getSelected();
		if (selectedType !== null){
			var piece = new Piece(selectedType);
			piece.setPosition(position);
			PieceController.pieces.push(piece);
			//the added piece is active
			PieceController.activePiece = piece;
			PieceController.isPieceNew = true;
			//add it to the board
			goog.dom.appendChild(BoardView.Board, piece.view.Element);
			PieceSelection.clearSelected();
			return piece;
		}
		PieceSelection.clearSelected();
		return null;
	},
	/** 
		if it's not "new" remove it
		@param {!goog.math.Coordinate} position
	*/
	mouseUp : function(position){
		//if the mouse up happend on the active piece
		var mouseUpPiece = PieceController.pieceAt(position);
		if (mouseUpPiece === PieceController.activePiece && mouseUpPiece !== null){
			//if it's not new, 
			if (!PieceController.isPieceNew) {
				// remove it and set that type as the selection
				var active = PieceController.activePiece;
				PieceSelection.setSelected(active.type);
				PieceController.removePiece(active);
				PieceController.activePiece = null;
				PieceController.isPieceNew = false;
			} else {
				PieceController.clearSelected();
			}
		} else {
			PieceController.clearSelected();
		}
		//update the trajectories
		PieceController.updateTrajectories();

	},
	/** 
		removes a piece from the array
		@param {Piece} piece
	*/
	removePiece : function(piece){
		if (goog.array.remove(PieceController.pieces, piece)){
			piece.dispose();
		}
	},
	/** 
		rotate the active piece
		@param {!goog.math.Coordinate} position
	*/
	rotatePiece : function(position){
		var activePiece = PieceController.activePiece;
		if (activePiece !== null){
			var direction = Direction.relativeDirection(activePiece.position, position);
			if (direction !== null){
				activePiece.setDirection(direction);
			}
		}
	},
	/*=========================================================================
		COMPUTES
	=========================================================================*/
	/** 
		@param {Piece} piece
		computes the path for a piece
	*/
	computePath : function(piece){
		piece.clearPath();
		GameController.computePath(piece);
	},
	/** 
		goes through the trajectories of all the pieces 
		@returns {Array} all of the hits on every beat
	*/
	computeHits : function(){

	}
};