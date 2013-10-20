/*=============================================================================
 _______  _______  __   __  _______ 
|       ||   _   ||  |_|  ||       |
|    ___||  |_|  ||       ||    ___|
|   | __ |       ||       ||   |___ 
|   ||  ||       ||       ||    ___|
|   |_| ||   _   || ||_|| ||   |___ 
|_______||__| |__||_|   |_||_______|

=============================================================================*/
goog.provide("game.controllers.GameController");

goog.require("goog.math.Coordinate");
goog.require("goog.fx.dom");

goog.require("data.Const");
goog.require("game.controllers.PieceController");
goog.require("game.controllers.TileController");
goog.require("game.controllers.PatternController");
goog.require("game.controllers.InstructionController");
goog.require("game.views.PatternDisplay");
goog.require("game.controllers.AudioController");
goog.require("game.controllers.WallController");
goog.require("game.views.PlayButton");
goog.require("models.StagesModel");
goog.require("game.views.GameOverInterstitial");

/** 
	@typedef {Object}
*/
var GameController = {
	/** @private
		@type {PlayButton} */
	playButton : null,
	/** @private
		@type {GameOverInterstitial} */
	gameOverModal : null,
	/** the finite state machine
		@dict */
	fsm : null,
	/** initializer */
	initialize : function(){
		//make the button
		GameController.playButton = new PlayButton("PLAY", GameController.playHit);
		GameController.setupFSM();
	},
	/** 
		remove the relevant stage elements
	*/
	clearStage : function(){
		WallController.reset();
		PieceController.reset();
		PatternController.reset();
		InstructionController.reset();
	},
	/** 
		@param {number} stage
		@param {number=} level
	*/
	setStage : function(stage, level){
		level = level||0;
		//setup the map
		TileController.setStage(stage, level);
		PieceController.setStage(stage, level);
		PatternController.setStage(stage, level);
		AudioController.setStage(stage, level);
		InstructionController.setStage(stage, level);
	},
	/** 
		@returns {boolean} true if the user has completed the instruction without 
		any collisions
	*/
	completedInstruction : function(){
		
	},
	/*=========================================================================
		COMPUTE
	=========================================================================*/
	/** 
		computes the pieces path
		@param {Piece} piece
	*/
	computePath : function(piece){
		//the first step
		var currentStep = new TrajectoryStep(piece.position, piece.direction);
		//construct the piece's path
		while(!piece.trajectory.isLoop()){
			//add it to the path
			piece.trajectory.addStep(currentStep);
			//get the next step
			var currentTile = TileController.tileAt(currentStep.position);
			//move forward one step
			currentStep = currentTile.nextStep(currentStep.direction);
		}
	},
	/*=========================================================================
		INTERACTIONS
	=========================================================================*/
	/** 
		@param {!goog.math.Coordinate} position
		@param {Piece} piece
		@returns {boolean} true if the piece was placed on the board
	*/
	positionOnBoard : function(piece, position){
		//if it's a valid tile and there isn't already a piece there
		if (TileController.isActiveTile(position) && PieceController.pieceAt(position) === null){
			PieceController.setPosition(piece, position);
			return true;
		}  else {
			return false;
		}
	},
	/** 
		@param {Piece} piece
		@param {!goog.math.Coordinate} position
		@returns {boolean} if the piece was removed
	*/
	removeFromBoard : function(piece, position){
		//if it's a valid tile and there isn't already a piece there
		if (!TileController.isActiveTile(position) || PieceController.pieceAt(position) !== piece){
			PieceController.removePiece(piece);
			return true;
		}
		return false;
	},
	/*=========================================================================
		PLAY / PAUSE / STOP
	=========================================================================*/
	/** @private
		@type {number} */
	timeout : -1,
	setupFSM : function(){
		GameController.fsm = StateMachine.create({

			"initial" : "stopped",

			"events": [
				{ "name": 'collide',	"from": 'playing',										"to": 'collision' },
				{ "name": 'retry',		"from": ['endgame','playing','collision'],				"to": 'stopped'  },
				{ "name": 'win',		"from": 'countin',										"to": 'gameOverDialog' },
				{ "name": 'endcountin',	"from": 'countin',										"to": 'playing' },
				{ "name": 'leaveGame',	"from": ['*'],											"to": 'stopped' },
				{ "name": 'sameGame',	"from": 'gameOverDialog',								"to": 'stopped' },
				{ "name": 'newGame',	"from": 'gameOverDialog',								"to": 'stopped' },
				
				//instruct -> playing loop
				{ "name": 'start',				"from": 'stopped',							"to": 'instruction' },
				{ "name": 'nextInstruct',		"from": 'stopped',							"to": 'instruction' },
				{ "name": 'fail',				"from": 'instruction',								"to": 'lose' },
				{ "name": 'win',				"from": 'instruction',							"to": 'aweseome' },

				//button stuff
				{ "name": 'hitButton', 	"from": "stopped", 										"to": 'countin' },
				{ "name": 'hitButton', 	"from": "countin", 										"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "playing", 										"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "retrying", 									"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "won", 											"to": 'stopped' },
			],

			"callbacks": {
				// ON EVENT
				"oncollide": function(event, from, to) { 
					//point out where the collisions are?
					
				},
				"onretry" : function(event, from, to){
					//update the button
					GameController.playButton.retry();	
				},
				"onstopped":  function(event, from, to) { 
					//clear the timeout if there is one
					if (GameController.timeout !== -1){
						clearTimeout(GameController.timeout);
						GameController.timeout = -1;
					}
					//reset the pieces
					PieceController.stop();
					//stop the pattern animation
					PatternController.stop();
					//stop the wall animation
					TileController.stop();
					//stop the audio
					AudioController.stop();
					//set the button to "stop"
					GameController.playButton.stop();
				},
				"onplaying" : function(event, from, to){
					//the aggregate pattern
					var hitPattern = PieceController.getPattern();
					//test for a collision and set a timeout
					var collisionStep = PieceController.getFirstCollision();
					if (collisionStep !== -1){
						var collisionTime = Math.max(AudioController.stepsToSeconds(collisionStep) * 1000, 100);
						GameController.timeout = setTimeout(function(){
							GameController.fsm["collide"]();
							GameController.timeout = -1;
						}, collisionTime);
					} else {
						var timeoutTime = AudioController.stepsToSeconds(PieceController.cycleLength) * 1000;
						GameController.timeout = setTimeout(function(){
							//go to the won state if the pattern matches
							var eventName = PatternController.isTargetPattern(hitPattern) ? "win" : "retry";
							//otherwise go to the retry phase
							GameController.fsm[eventName]();
							GameController.timeout = -1;
						}, timeoutTime);
					}
					GameController.playButton.play();
				},
				"oncountin":  function(event, from, to) {
					//collision testing
					PieceController.computeCollisions();
					//the aggregate pattern
					var hitPattern = PieceController.getPattern();
					//set the count in timer
					var countInDuration = AudioController.countInDuration() * 1000;
					//scheduling playing after the count in
					GameController.timeout = setTimeout(function(){
						GameController.timeout = -1;
						GameController.fsm["endcountin"]();
					}, countInDuration);
					//play the audio
					AudioController.play(hitPattern);
					//and the wall animations
					PieceController.forEach(function(piece){
						TileController.play(piece.bounces, AudioController.stepsToSeconds(piece.pattern.length), piece.type);	
					})
					//put hte pieces in motion
					//nb : these include the offset for the countin
					PieceController.play();
					//set the pattern in motion
					PatternController.play();
					//set the button to "stop"
					GameController.playButton.countIn(AudioController.countInBeats, AudioController.stepsToSeconds(1));
				},
				//ON STATES
				"oncollision": function(event, from, to) { 
					//pause the scene
					PieceController.pause();
					//pause the pattern scolling
					PatternController.pause();
					//stop the walls
					TileController.stop();
					//stop the sound
					AudioController.stop();
					//go to retry
					GameController.fsm["retry"]();
				},
				"onwin" : function(event, from, to){
					//alert("nice!");
					StagesModel.currentLevelSolved();
				},
				"onentergameOverDialog" : function(event, from , to){
					GameController.showGameOverModal();
				},
				"onleavegameOverDialog" : function(event, from , to){
					GameController.removeGameOverModal();
				},
				"onnewGame" : function(event, from , to){
					GameController.clearStage();
					//show the new board after some time
					GameController.timeout = setTimeout(function(){
						GameController.timeout = -1;
						StagesModel.nextLevel();
						GameController.setStage(StagesModel.currentStage, StagesModel.currentLevel);
					}, 400);
				},
				"onsameGame" : function(event, from , to){
					// this space left intentionally blank
				}
			}
	  	});
	},
	/** 
		shows the Game Over Interstitial
	*/
	showGameOverModal : function(){
		GameController.gameOverModal = new GameOverInterstitial();

		var anim = new goog.fx.dom.FadeInAndShow(GameController.gameOverModal.Element, 200);
      	//goog.events.listen(anim, goog.fx.Transition.EventType.BEGIN, disableButtons);
      	goog.events.listen(anim, goog.fx.Transition.EventType.END, function(){
      		anim.dispose();
      		anim=null;
      	});
      	anim.play();
	},
	/** 
		removes the Game Over Interstitial
	*/
	removeGameOverModal : function(){
		var anim = new goog.fx.dom.FadeOutAndHide(GameController.gameOverModal.Element, 400);
      	//goog.events.listen(anim, goog.fx.Transition.EventType.BEGIN, disableButtons);
      	goog.events.listen(anim, goog.fx.Transition.EventType.END, function(){
      		GameController.gameOverModal.dispose();	
      		anim.dispose();
      		anim=null;
      	});
      	anim.play();
	},
	/** 
		does the wall animations
	*/
	playWallAnimations : function(){

	},
	/** 
		start the animiation
	*/
	playHit : function(button){
		GameController.fsm["hitButton"]();
	},
	/** 
		stops everything when the game is left
	*/
	stopGame : function(){
		GameController.fsm["leaveGame"]();
	},
	/*=========================================================================
		COLLISION GENERATOR
	=========================================================================*/
	/** 
		brute force collision generator
		goes through all combinations of position and direction and generates
		a data structure which contains all collisions
	*/
	collisionsWithPiece : function(piece){
		var collisions = [];
		//for every tile, make a piece
		TileController.forEach(function(tile, position){
			var testPiece = new Piece(PieceType.Red);
			if (GameController.positionOnBoard(testPiece, position)){	
				//rotate that piece in every direction
				Direction.forEach(function(direction){
					testPiece.setDirection(direction);
					PieceController.computeCollisions();
					var collisionStep = PieceController.getFirstCollision();
					if (collisionStep !== -1){
						collisions.push({
							position : position,
							direction : direction
						})
					}
				})
			}
			testPiece.dispose();
		});
		GameController.pruneVerticalAndDiagonal(piece, collisions);
	},
	/** 
		non-brute force collision testing algorithm
	*/
	collisionsWithPieceOptimized : function(piece){
		var collisions = [];
		//for every tile, make a piece
		TileController.forEach(function(tile, position){
			if (!goog.math.Coordinate.equals(piece.position, position)){
				Direction.forEach(function(direction){
					var collision = {
						position : position,
						direction : direction
					}
					if (GameController.doesCollide(piece, collision)){
						collisions.push(collision);
					}
				})
			}
		});
		// GameController.pruneVerticalAndDiagonal(piece, collisions);
		GameController.visualizeCollisions(collisions);
	},
	/** 
		prune away the pieces that are in the same place or diagonal
	*/
	pruneVerticalAndDiagonal : function(piece, collisions){
		var nonStar = [];
		for (var i = 0 ; i < collisions.length; i++){
			var collision = collisions[i];
			var pieceOrientation = Direction.getOrientation(piece.direction);
			if (Direction.getOrientation(collision.direction) === pieceOrientation){
				if (pieceOrientation === Direction.Orientation.Vertical){
					if (piece.position.x !== collision.position.x){
						nonStar.push(collision);
					}
				} else {
					if (piece.position.y !== collision.position.y){
						nonStar.push(collision);
					}
				}
			} else {
				if (!GameController.isDiagonal(piece, collision)){
					nonStar.push(collision);
				}
			}
		}
		GameController.visualizeCollisions(nonStar);
	},
	visualizeCollisions : function(collisions){
		//clear the previous collisions
		if (GameController.collisions){
			for (var i = 0; i < GameController.collisions.length; i++){
				var coll = GameController.collisions[i];
				coll.dispose();
			}
		}
		//set the new collisions array
		GameController.collisions = [];
		for (var i = 0; i < collisions.length; i++){
			var coll = collisions[i];
			var p = new Piece(PieceType.Blue);
			p.view.updatePosition(coll.position);
			p.view.updateDirection(coll.direction);
			GameController.collisions.push(p);
		}
	},
	/** 
		shows all of the collisions of the first piece down
	*/
	visualizeFirstPieceCollisions : function(){
		var p = PieceController.pieces[0];
		GameController.collisionsWithPieceOptimized(p);
	},
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

		@param {Piece} collision
		@param {Piece|PieceVector} collision
		@returns {boolean} true if the two pieces collide
	*/
	doesCollide : function(piece, collision){
		//test if it's vertically aligned
		if (GameController.isVertical(piece, collision)){
			return true;
		} else if (GameController.isDiagonal(piece, collision)){
			return true;
		} else {
			//test each of the reflections
			var N = GameController.reflect(collision, Direction.North);
			var S = GameController.reflect(collision, Direction.South);
			var E = GameController.reflect(collision, Direction.East);
			var W = GameController.reflect(collision, Direction.West);
			var NW = GameController.reflect(N, Direction.West);
			var NE = GameController.reflect(N, Direction.East);
			var SE = GameController.reflect(S, Direction.East);
			var SW = GameController.reflect(S, Direction.West);
			var reflections = [N, S, E, W, NW, NE, SW, SE];
			for (var i = 0; i < reflections.length; i++){
				var reflection = reflections[i];
				if (GameController.isDiagonal(piece, reflection)){
					return true;
				}
			}
			return false;
		}
	},
	/** 
		@param {Piece} piece
		@param {Piece|PieceVector} collision
		@returns {bollean} true if the piece is in a collision diagonal relative to the test peice
	*/
	isDiagonal : function(piece, collision){
		var relativePosition = goog.math.Coordinate.difference(collision.position, piece.position);
		if (Math.abs(relativePosition.x)===Math.abs(relativePosition.y)){
			if (relativePosition.x * relativePosition.y > 0){
				return collision.direction === Direction.right(piece.direction);
			} else {
				return collision.direction === Direction.left(piece.direction);
			}
		} else {
			return false;
		}
	},
	/** 
		@param {Piece} piece
		@param {Piece|PieceVector} collision
		@returns {bollean} true if the two pieces are in the same orientation on a collision trajectory
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
		var direction = Direction.reflect(piece.direction, Direction.oppositeOrientation(direction));
		return {
			direction : direction,
			position : position
		}
	}
};

GameController.initialize();
