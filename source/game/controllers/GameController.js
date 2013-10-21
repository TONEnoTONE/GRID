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
goog.require("Instruction.Controller");
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
		@param {Instruction.Model} instruction
	*/
	visualizeInstruction : function(instruction){
		//stop the previous wall animation
		WallController.stopFlashing();
		//visualize the walls
		WallController.flashDirection(instruction.direction, instruction.type);
		//visualize the tiles
		TileController.flashPosition(instruction.position, instruction.type);

	},
	/** 
		remove the relevant stage elements
	*/
	clearStage : function(){
		WallController.reset();
		PieceController.reset();
		PatternController.reset();
		Instruction.Controller.getInstance().reset();
	},
	/** 
		@param {number} stage
		@param {number=} level
	*/
	setStage : function(stage, level){
		level = level||0;
		//setup the map
		TileController.setStage(stage, level);
		PatternController.setStage(stage, level);
		AudioController.setStage(stage, level);
		//setup the instruction
		PieceController.setStage(stage, level);
		Instruction.Controller.getInstance().generateInstructions(PatternController.targetPattern.hits);
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
	/** 
		@param {Piece} piece
		trigger the piece as activated
	*/
	pieceActivated : function(piece){
		
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
				
				//instruct -> play
				{ "name": 'start',				"from": 'stopped',							"to": 'instruction' },
				{ "name": 'play',				"from": 'instruction',						"to": 'playing' },
				{ "name": 'instruct',			"from": 'playing',							"to": 'instruction' },
				{ "name": 'fail',				"from": 'instruction',						"to": 'lose' },
				{ "name": 'win',				"from": 'instruction',						"to": 'awesome' },

				//button stuff
				{ "name": 'hitButton', 	"from": "stopped", 										"to": 'instruction' },
				{ "name": 'hitButton', 	"from": "countin", 										"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "playing", 										"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "retrying", 									"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "won", 											"to": 'stopped' },
			],

			"callbacks": {
				//EVENTS
				"onstart": function(event, from, to) { 

				},
				"onanimate" : function(event, from, to){
					//start the animation
				},
				//STATES
				"oninstruction" : function(){
					var instructions = Instruction.Controller.getInstance();
					//if it's all completed
					if (instructions.isCompleted()){
						//go to win
						GameController.fsm["win"]();
					} else {
						//otherwise indicate the next instruction
						var inst = instructions.nextInstruction();
						GameController.visualizeInstruction(inst);
						//start the audio count in
						setTimeout(function(){
							//go to play
							GameController.fsm["play"]();
						}, AudioController.stepsToSeconds(instructions.getCountIn())*1000);
					}
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
					//play the audio
					AudioController.play(hitPattern);
					var timeoutTime = AudioController.stepsToSeconds(PieceController.cycleLength) * 1000;
					GameController.timeout = setTimeout(function(){
						//otherwise go to the retry phase
						GameController.fsm["instruct"]();
						GameController.timeout = -1;
					}, timeoutTime);
					//and the wall animations
					PieceController.forEach(function(piece){
						TileController.play(piece.bounces, AudioController.stepsToSeconds(piece.pattern.length), piece.type);	
					});
					//set the pieces in motion
					PieceController.play();
					//set the pattern in motion
					PatternController.play();
					GameController.playButton.play();
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
		start the animiation
	*/
	playHit : function(button){
		GameController.fsm["hitButton"]();
	},
	/** 
		stops everything when the game is left
	*/
	stopGame : function(){
		
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
		return collisions;
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
					if (PieceController.doesCollide(piece, collision)){
						collisions.push(collision);
					}
				})
			}
		});
		return collisions;
	}
};

GameController.initialize();
