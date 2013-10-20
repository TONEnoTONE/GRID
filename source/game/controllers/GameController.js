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
						console.log(position.x, position.y, direction);
					}
				})
			}
			testPiece.dispose();
		})
	},
	/** 
		prune away the pieces that are in the same place or diagonal
	*/
	pruneVerticalAndDiagonal : function(piece, collisions){
		for (var i = 0 ; i < collisions.length; i++){
			if (collision.direction)
		}
	}
};

GameController.initialize();
