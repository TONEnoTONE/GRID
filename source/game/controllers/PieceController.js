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
		for (var i = 0, len = PieceController.pieces.length; i < len; i++){
			PieceController.pieces[i].dispose();
		}
		//clear the array
		PieceController.pieces = [];
		//reset the aggregate pattern
		PieceController.aggregatePattern.dispose();
		PieceController.aggregatePattern = new Pattern();
	},
	/** 
		pulls the current level from the StageController
		@param {number} stage
		@param {number} level
		@param {number=} animationTime
	*/
	setStage : function(stage, level, animationTime){
		animationTime = animationTime || 0;
		//start a new one
		var pieceTypes = StageController.getAvailablePieces(stage, level);
		for (var i = 0; i < pieceTypes.length; i++){
			var delayTime = ((i + 1) * animationTime) / pieceTypes.length;
			var p = PieceController.addPiece(pieceTypes[i]);
			PieceSelection.setPiecePosition(p.view.Element, i);
			//fade the piece in
			setTimeout(function(){
				//create a closure
				var pc = p;
				return function(){	
					pc.fadeIn();
					pc = null;	
				}
			}(), delayTime);
		}
	},
	/** 
		finish fading in all the pieces
	*/
	finishAnimation : function(){
		for (var i = 0, len = PieceController.pieces.length; i < len; i++){
			var piece = PieceController.pieces[i];
			piece.fadeIn();
		}
	},
	/**
		iterator over all the pieces (on the board)
		@param {function(Piece)} callback takes the object and the index
	*/
	forEach : function(callback){
		for (var i = 0, len = PieceController.pieces.length; i < len; i++){
			var piece = PieceController.pieces[i];
			//only active pieces
			if (piece.onBoard){
				callback(piece);
			}
		}
	},
	/** 
		@returns {Array.<Piece>} all the pieces on the board
	*/
	onBoardPieces : function(){
		var pieces = [];
		PieceController.forEach(function(piece){
			pieces.push(piece);
		});
		return pieces;
	},
	/** 
		@param {!goog.math.Coordinate} position
		@returns {Piece | null} return the piece that's at position
	*/
	pieceAt : function(position){
		var retPiece = null;
		PieceController.forEach(function(piece){
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
		return CollisionController.getFirstCollisionStep();
	},
	/** 
		computes the collisions
	*/
	computeCollisions : function(){
		CollisionController.reset();
		var len = PieceController.cycleLength;
		for (var step = 0; step < len; step++){
			PieceController.collisionAtStep(step)
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
		var pieces = PieceController.onBoardPieces();
		var len = pieces.length;
		for (var i = 0; i < len; i++){
			//compare this piece against all the later ones
			var pieceI = pieces[i];
			var testStep = pieceI.trajectory.stepAt(step);
			for (var j = i + 1; j < len; j++){
				var pieceJ = pieces[j];
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
		var onBoardPieces = PieceController.onBoardPieces();
		if (onBoardPieces.length > 1){
			var lcm = onBoardPieces[0].trajectory.getLength();
			for (var i = 1, len = onBoardPieces.length; i < len; i++){
				var piece = onBoardPieces[i];
				lcm = PieceController.lcm(lcm, piece.trajectory.getLength());
			}
			return lcm;
		} else if(onBoardPieces.length === 1){
			return onBoardPieces[0].trajectory.getLength();
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
		GameController.computePath(piece);
	},
	/** 
		notification that a piece was updated
		@param {Piece} piece
	*/
	updated : function(piece){
		//compute the cyclelength
		PieceController.cycleLength = PieceController.computeCycleLength();
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
		@param {number=} delay
	*/
	play : function(delay){
		PieceController.forEach(function(piece){
			piece.play(delay);
		});
		//play the collision
		CollisionController.play();
	},
	/** 
		stop the animation
	*/
	stop : function(){
		PieceController.forEach(function(piece){
			piece.stop();
		});
		CollisionController.stop();
	},
	/** 
		animate the peces back
	*/
	restart : function(){
		PieceController.forEach(function(piece){
			piece.restart();
		});
		CollisionController.stop();
	},
	/** 
		pause the animation
	*/
	pause : function(){
		PieceController.forEach(function(piece){
			piece.pause();
		});
		CollisionController.pause();
	},
	/*=========================================================================
		INTERACTIONS
	=========================================================================*/
	/** 
		add a piece to the board
		@param {PieceType} type
		@returns {Piece} the newely created piece
	*/
	addPiece : function(type){
		var p = new Piece(type);
		PieceController.pieces.push(p);
		return p;
	},
	/** 
		removes a piece from the array
		@param {Piece} piece
	*/
	removePiece : function(piece){
		if (goog.array.remove(PieceController.pieces, piece)){
			piece.dispose();
			piece = null;
		}
	},
	/** 
		@param {Piece} piece
		@param {!goog.math.Coordinate} position
	*/
	setPosition : function(piece, position){
		piece.onBoard = true;
		piece.setPosition(position);
	},
	/** 
		@param {Piece} piece
		@param {!goog.math.Coordinate} position
	*/
	positionOnBoard : function(piece, position){
		GameController.positionOnBoard(piece, position);
	},
	/** 
		@param {Piece} piece
		puts it back in the selection
	*/
	placeInSelection : function(piece){
		for (var i = 0; i < PieceController.pieces.length; i++){
			if (piece === PieceController.pieces[i]){
				piece.onBoard = false;
				piece.position.x = -1;
				piece.position.y = -1;
				piece.fadeOutAndIn(function(){
					var index = i;
					return function(){
						PieceSelection.setPiecePosition(piece.view.Element, index);
						PieceController.updated(piece);
						piece = null;
					}
				}());
			}
		}
	},
	/** 
		@param {Piece} piece
		@param {!goog.math.Coordinate} position
	*/
	pieceDroppedOnBoard : function(piece, position){
		GameController.pieceDroppedOnBoard(piece, position);
	}
};