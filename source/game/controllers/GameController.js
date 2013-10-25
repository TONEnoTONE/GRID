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
goog.require("Card.Controller");

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
	/** @type {Piece} */
	lastPiece : null,
	/** @type {number} */
	currentLevel : 0,
	/** @type {number} */
	currentStage : 0,
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
		//visualize the walls
		WallController.flashDirection(instruction.direction, instruction.type);
		//visualize the tiles
		TileController.flashPosition(instruction.position, instruction.type);
	},
	/** 
		stops the instruction
	*/
	stopInstruction : function(){
		TileController.stopFlashing();
		WallController.stopFlashing();
	},
	/** 
		@param {Array.<Instruction.Model>} instructions
	*/
	sonifyInstructions : function(instructions){
		//setup the timing for all of the instructions
		var duration = AudioController.stepsToSeconds(PieceController.cycleLength/2);
		var controller = Instruction.Controller.getInstance();
		for (var i = 0; i < instructions.length; i++){
			var instruction = instructions[i];
			var delay = AudioController.stepsToSeconds(controller.getCountIn()*(i + 1) + PieceController.cycleLength*i);
			AudioController.playHit({beat : instruction.beat, type : instruction.type}, duration, delay);
		}
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
		GameController.currentStage = stage;
		GameController.currentLevel = level;
		GameController.clearStage();
		GameController.lastPiece = null;
		level = level||0;
		//setup the map
		TileController.setStage(stage, level);
		PatternController.setStage(stage, level);
		AudioController.setStage(stage, level);
		//setup the instruction
		PieceController.setStage(stage, level);
		Instruction.Controller.getInstance().generateInstructions(PatternController.targetPattern.hits);
		Instruction.Controller.getInstance().setStage(stage, level);
		Card.Controller.getInstance().setLevel(level);
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
		if (TileController.isActiveTile(position) && (PieceController.pieceAt(position) === null || PieceController.pieceAt(position) === piece)){
			PieceController.setPosition(piece, position);
			GameController.lastPiece = piece;
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
			// PieceController.removePiece(piece);
			PieceController.placeInSelection(piece);
			return true;
		}
		return false;
	},
	/** 
		@param {Piece} piece
		trigger the piece as activated
	*/
	pieceActivated : function(piece){
		GameController.lastPiece = piece;
	},
	/** 
		@returns {boolean} true if the last piece was placed down in time
	*/
	wasPieceActivated : function(){
		//test if the piece matches the current instruction
		var currentInstruction = Instruction.Controller.getInstance().currentInstruction;
		var piece = GameController.lastPiece;
		if (piece === null){
			return false;
		} 
		return piece.direction === currentInstruction.direction
			&& goog.math.Coordinate.equals(currentInstruction.position, piece.position)
			&& piece.type === currentInstruction.type;
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
				{ "name": 'stop',				"from": "*",								"to": 'stopped' },
				{ "name": 'start',				"from": ['stopped',	"testOver"],			"to": 'instruction' },
				{ "name": 'play',				"from": 'instruction',						"to": 'playing' },
				{ "name": 'instruct',			"from": ['playing',"testOver"],				"to": 'instruction' },
				{ "name": 'fail',				"from": 'playing',							"to": 'lose' },
				{ "name": 'nextLevel',			"from": 'instruction',						"to": 'testOver' },
				{ "name": 'win',				"from": 'testOver',							"to": 'awesome' },
				//button stuff
				{ "name": 'hitButton', 	"from": "stopped", 										"to": 'instruction' },
				{ "name": 'hitButton', 	"from": ["awesome", "lose", "playing", "instruction"],	"to": 'stopped' },
			],

			"callbacks": {
				//EVENTS
				"onhitButton": function(event, from, to) { 
					if (from === "stopped"){
						GameController.playButton.play();
						GameController.currentLevel = 0;
						GameController.lastPiece = null;
						GameController.sonifyInstructions(Instruction.Controller.getInstance().instructions);
						//move all the pieces back to the selection area
						PieceController.forEach(function(piece){
							PieceController.placeInSelection(piece);
						})
					}
				},
				"onfail" : function(event, from, to){
					//update the button
					GameController.playButton.retry();	
					GameController.fsm["stop"]();
					GameController.stopInstruction();
					GameController.setStage(GameController.currentStage, 0);
					AudioController.lose();
					alert("try again");
				},
				//STATES
				"onawesome" : function(event, from, to){
					alert("nice!");
				},
				"ontestOver" : function(event, from, to){
					//if there are more levels in the stage, go there, otherwise go to awesome!
					var maxLevels = StageController.getLevelCount(GameController.currentStage);
					//stop the audio
					AudioController.stop();
					AudioController.win();
					GameController.currentLevel++;
					if (GameController.currentLevel == maxLevels){
						GameController.fsm["win"]();
					} else {
						GameController.setStage(GameController.currentStage, GameController.currentLevel);
						setTimeout(function(){
							GameController.sonifyInstructions(Instruction.Controller.getInstance().instructions);
							GameController.fsm["instruct"]();
						}, AudioController.stepsToSeconds(2))
					}
				},
				"oninstruction" : function(){
					var instructions = Instruction.Controller.getInstance();
					//if it's all completed
					if (instructions.isCompleted()){
						//go to win
						GameController.fsm["nextLevel"]();
					} else {
						PieceController.stop();
						TileController.stop();
						//otherwise indicate the next instruction
						var inst = instructions.nextInstruction();
						GameController.visualizeInstruction(inst);
						var countIn = instructions.getCountIn();
						AudioController.countIn(countIn);
						//start the audio count in
						setTimeout(function(){
							//go to play
							GameController.fsm["play"]();
						}, AudioController.stepsToSeconds(countIn)*1000);
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
					Instruction.Controller.getInstance().stop();
					GameController.stopInstruction();
					//move all the pieces back to the selection area
					PieceController.forEach(function(piece){
						PieceController.placeInSelection(piece);
					})
				},
				"onplaying" : function(event, from, to){
					if (!GameController.wasPieceActivated()){
						GameController.fsm["fail"]();
					} else {
						//stop the previous instruction animation
						GameController.stopInstruction();
						var piece = GameController.lastPiece;
						var timeoutTime = AudioController.stepsToSeconds(PieceController.cycleLength) * 1000;
						GameController.timeout = setTimeout(function(){
							//otherwise go to the retry phase
							GameController.fsm["instruct"]();
							GameController.timeout = -1;
						}, timeoutTime);
						//and the wall animations
						PieceController.forEach(function(piece){
							TileController.play(piece.bounces, AudioController.stepsToSeconds(piece.pattern.length), piece.type);	
						})
						//set the pieces in motion
						PieceController.play();
					}
				},
				"onwin" : function(event, from, to){
					//alert("nice!");
					// StagesModel.currentLevelSolved();
				},
				"onentergameOverDialog" : function(event, from , to){
					// GameController.showGameOverModal();
				},
				"onleavegameOverDialog" : function(event, from , to){
					// GameController.removeGameOverModal();
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
