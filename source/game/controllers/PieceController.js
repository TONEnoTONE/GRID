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
goog.require("game.models.PieceVector");

var PieceController = {
	/** @private
		@type {Array.<Piece>} */
	pieces : [],
	/** @private 
		@type {number} */
	cycleLength : 8,
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
		//remove all teh pieces
		for (var i = 0; i < PieceController.pieces.length; i++){
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
	*/
	setStage : function(stage, level){
		//reset the old setup
		PieceController.reset();
		//start a new one
		var pieces = [];
		var pieceTypes = StageController.getAvailablePieces(stage, level);
		for (var i = 0; i < pieceTypes.length; i++){
			var p = PieceController.addPiece(pieceTypes[i]);
			PieceSelection.setPiecePosition(p.view.Element, i);
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
		PieceController.cycleLength = 8;
		//get the aggregate pattern
		PieceController.computeAggregatePattern();
		//notify the Pattern controller of a new user pattern
		PatternController.updated(PieceController.aggregatePattern);
	},
	/*=========================================================================
		COLLISION
	=========================================================================*/
	/** 
		Collision Tester
		collisions occur in an hour glass pattern with the test piece in the center:

		>  v  <
		 > v <
		  >v<
		   ^   <<<test piece
		  <^>
		 < ^ >
		<  ^  >
		...etc.

		in an entirely open map with walls on all sides, these positions and equivalent pieces
		to the diagonals will collide with the test piece. 

		equivalence is determined by reflecting the piece's position across 8 axes, 
		if any of those reflections is a diagonal, those pieces will collide

		@param {Piece|PieceVector} piece
		@param {Piece|PieceVector} collision
		@returns {boolean} true if the two pieces collide
	*/
	doesCollide : function(piece, collision){
		//if they're on the same position
		if (goog.math.Coordinate.equals(piece.position, collision.position)){	
			return true;
		//test if it's vertically aligned and in the same orientation
		} else if (PieceController.isVertical(piece, collision)){
			return true;
		//otherwise if it's diagonal
		} else if (PieceController.isDiagonal(piece, collision)){
			return true;
		//test if it's reflection is diagonal
		} else {
			//test each of the reflections
			var N = PieceController.reflect(collision, Direction.North);
			var S = PieceController.reflect(collision, Direction.South);
			var E = PieceController.reflect(collision, Direction.East);
			var W = PieceController.reflect(collision, Direction.West);
			var NW = PieceController.reflect(N, Direction.West);
			var NE = PieceController.reflect(N, Direction.East);
			var SE = PieceController.reflect(S, Direction.East);
			var SW = PieceController.reflect(S, Direction.West);
			var reflections = [N, S, E, W, NW, NE, SW, SE];
			for (var i = 0; i < reflections.length; i++){
				var reflection = reflections[i];
				if (PieceController.isDiagonal(piece, reflection)){
					return true;
				}
			}
			return false;
		}
	},
	/** 
		@param {Piece|PieceVector} piece
		@param {Piece|PieceVector} collision
		@returns {boolean} true if the piece is in a collision diagonal relative to the test peice
	*/
	isDiagonal : function(piece, collision){
		var relativePosition = goog.math.Coordinate.difference(collision.position, piece.position);
		if (Math.abs(relativePosition.x)===Math.abs(relativePosition.y)){
			//if it's vertically oriented
			if (Direction.getOrientation(piece.direction) === Direction.Orientation.Vertical){
				if (relativePosition.x * relativePosition.y > 0){
					return collision.direction === Direction.right(piece.direction);
				} else {
					return collision.direction === Direction.left(piece.direction);
				}
			} else {
				if (relativePosition.x * relativePosition.y > 0){
					return collision.direction === Direction.left(piece.direction);
				} else {
					return collision.direction === Direction.right(piece.direction);
				}
			}
		} else {
			return false;
		}
	},
	/** 
		@param {Piece|PieceVector} piece
		@param {Piece|PieceVector} collision
		@returns {boolean} true if the two pieces are in the same orientation on a collision trajectory
	*/
	isVertical : function(piece, collision){
		var pieceOrientation = Direction.getOrientation(piece.direction);
		if (Direction.getOrientation(collision.direction) === pieceOrientation){
			if (pieceOrientation === Direction.Orientation.Vertical){
				if (piece.position.x === collision.position.x){
					return true;
				}
			} else {
				if (piece.position.y === collision.position.y){
					return true;
				}
			}
		}
		return false;
	},
	/** 
		@param {Piece|PieceVector} piece
		@param {Direction} direction
		@returns {PieceVector} the position/direction of the piece when reflected 
	*/
	reflect : function(piece, direction){
		var position = piece.position.clone();
		var width = CONST.BOARDDIMENSION.WIDTH;
		var height = CONST.BOARDDIMENSION.HEIGHT;
		//the origin point for the reflection
		switch (direction){
			case Direction.West : 
				position.x = -position.x - 1;
				break;
			case Direction.East : 
				position.x = (width - position.x - 1) + width;
				break;
			case Direction.North : 
				position.y = -position.y - 1;
				break;
			case Direction.South : 
				position.y = (height - position.y - 1) + height;
				break;
		}
		//reflect hte pieces direction over that orientation
		var retDirection = Direction.reflect(piece.direction, Direction.oppositeOrientation(direction));
		return {
			direction : retDirection,
			position : position
		}
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
		trigger the piece as activated
	*/
	pieceActivated : function(piece){
		GameController.pieceActivated(piece);
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
		@returns {boolean} true if the piece was placed on the board
	*/
	positionOnBoard : function(piece, position){
		return GameController.positionOnBoard(piece, position);
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
				PieceSelection.setPiecePosition(piece.view.Element, i);
			}
		}
	},
	/** 
		@param {Piece} piece
		@param {!goog.math.Coordinate} position
	*/
	removeFromBoard : function(piece, position){
		GameController.removeFromBoard(piece, position);
	},
};