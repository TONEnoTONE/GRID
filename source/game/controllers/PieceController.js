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
goog.require("game.controllers.StageController");
goog.require("game.views.PieceSelection");
goog.require("game.controllers.CollisionController");
goog.require("game.controllers.PatternController");
goog.require("game.models.Piece");

var PieceController = {
	/** @private
		@type {Array.<Piece>} */
	pieces : [],
	/** @private 
		@type {number} */
	cycleLength : 0,
	/** @private
		@type {Pattern} */
	aggregatePattern : new Pattern(),
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
		//reset the aggregate pattern
		PieceController.aggregatePattern.dispose();
		PieceController.aggregatePattern = new Pattern();
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
	/** 
		@returns {Pattern} the aggregate pattern of all the pieces
	*/
	getPattern : function(){
		return PieceController.aggregatePattern;
	},
	/** 
		@return {Array.<TrajectoryHit>} all of the wall hits
	*/
	getBounces : function(){
		var ret = [];
		PieceController.forEach(function(piece){
			ret = goog.array.concat(ret, piece.bounces);
		});
		return ret;
	},
	/*=========================================================================
		COMPUTE
	=========================================================================*/
	/** 
		@returns {number} the step of the first collision
	*/
	getFirstCollision : function(){
		return CollisionController.getFirstCollision();
	},
	/** 
		@returns {number} the first collision
	*/
	/** 
		computes the collisions
		stops after the first collision
	*/
	computeCollisions : function(){
		CollisionController.reset();
		var len = PieceController.cycleLength;
		for (var step = 0; step < len; step++){
			if (PieceController.collisionAtStep(step)){
				break;
			}
		}
	},
	/** 
		test a collision at a step
		O(n*log(n)) where n = number of pieces
		@param {number} step
		@returns {boolean} if there is a collision
	*/
	collisionAtStep : function(step){
		var didCollide = false;
		var len = PieceController.pieces.length;
		for (var i = 0; i < len; i++){
			//compare this piece against all the later ones
			var pieceI = PieceController.pieces[i];
			var testStep = pieceI.trajectory.stepAt(step);
			for (var j = i + 1; j < len; j++){
				var pieceJ = PieceController.pieces[j];
				var compareStep = pieceJ.trajectory.stepAt(step);
				if (testStep.collidesWith(compareStep)){
					CollisionController.addCollision([pieceI, pieceJ], step);
					didCollide = true;
				}
			}
		}
		return didCollide;
	},
	/** 
		compute the lowest common multiple of the trajectory lengths
		@private
		@returns {number} lcm of all the lengths
	*/
	computeCycleLength : function(){
		if (PieceController.pieces.length > 1){
			var lcm = PieceController.pieces[0].trajectory.getLength();
			for (var i = 1, len = PieceController.pieces.length; i < len; i++){
				var piece = PieceController.pieces[i];
				lcm = PieceController.lcm(lcm, piece.trajectory.getLength());
			}
			return lcm;
		} else if(PieceController.pieces.length === 1){
			return PieceController.pieces[0].trajectory.getLength();
		} else {
			return 0;
		}
	},
	/** 
		compute the lowest common multiple of two numbers
		@private
		@param {!number} a
		@param {!number} b
		@returns {!number} lcm of two numbers
	*/
	lcm : function(a, b){
		return a * (b / PieceController.gcd(a, b));
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
		@private
		@returns {Pattern} the pattern generated by all the pieces
	*/
	computeAggregatePattern : function(){
		//dispose the old pattern
		PieceController.aggregatePattern.dispose();
		//add all of the patterns together
		PieceController.aggregatePattern = new Pattern(PieceController.cycleLength);
		PieceController.forEach(function(piece){
			PieceController.aggregatePattern = Pattern.combine(PieceController.aggregatePattern , piece.pattern);
		});
		return PieceController.aggregatePattern;
	},
	/** 
		@param {Piece} piece
		computes the path for a piece
	*/
	computePath : function(piece){
		piece.clearPath();
		GameController.computePath(piece);
	},
	/** 
		notification that a piece was updated
		@param {Piece} piece
	*/
	updated : function(piece){
		//get the aggregate pattern
		PieceController.computeAggregatePattern();
		//notify the Pattern controller of a new user pattern
		PatternController.updated(PieceController.aggregatePattern);
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
			PieceController.pieces.push(piece);
			piece.setPosition(position);
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
		//update the cycle length
		PieceController.cycleLength = PieceController.computeCycleLength();
		//update the trajectory css
		// PieceController.updateTrajectoryCss();
	},
	/** 
		called when a touch event is cancelled or the mouse goes outside of the container
	*/
	mouseEnd : function(){
		PieceController.activePiece = null;
		PieceController.isPieceNew = false;
	},
	/** 
		removes a piece from the array
		@param {Piece} piece
	*/
	removePiece : function(piece){
		if (goog.array.remove(PieceController.pieces, piece)){
			PieceController.updated(piece);
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
	}
};