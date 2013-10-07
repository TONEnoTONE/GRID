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
goog.require("data.Const");
goog.require("game.controllers.PieceController");
goog.require("game.controllers.TileController");
goog.require("game.controllers.PatternController");
goog.require("game.controllers.AudioController");
goog.require("game.views.PlayButton");
goog.require("models.AppModel");


/** 
	@typedef {Object}
*/
var GameController = {
	/** @private
		@type {PlayButton} */
	playButton : null,
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
		@param {number} stage
		@param {number=} level
	*/
	setStage : function(stage, level){
		//reset the Pieces
		PieceController.reset();
		level = level||0;
		//setup the map
		TileController.setStage(stage, level);
		PieceController.setStage(stage, level);
		PatternController.setStage(stage, level);
		AudioController.setStage(stage, level);
	},
	/*=========================================================================
		COMPUTE
	=========================================================================*/
	/** 
		computes the pieces path
		@param {Piece} piece
	*/
	computePath : function(piece){
		//clear the path first
		piece.clearPath();
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
		MOUSE STUFFS
	=========================================================================*/
	/** 
		@param {!goog.math.Coordinate} position
		mouse down on a tile will:
		a) add a new piece if a selection has been chosen
		b) "select" a piece if there is one at that position
	*/
	mouseDownOnTile : function(position){
		//if there is an available piece
		if (TileController.isActiveTile(position)){
			PieceController.selectPosition(position);
		} else {
			PieceController.clearSelected();
		}
	},
	/** 
		@param {!goog.math.Coordinate} position
		mouse up on a tile will remove the piece if it's not new
	*/
	mouseUpOnTile : function(position){
		PieceController.mouseUp(position);
		PatternController.showTarget();
	},
	/** 
		@param {!goog.math.Coordinate} position
		mouse move will rotate the "selected" piece
	*/
	mouseMoveOnTile : function(position){
		PieceController.rotatePiece(position);
	},
	mouseEnd : function(){
		PieceController.mouseEnd();
		// PatternController.showTarget();
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
				{ "name": 'collide',	"from": 'playing',					"to": 'collision' },
				{ "name": 'retry',		"from": ['playing',	'collision'],	"to": 'retrying'  },
				{ "name": 'win',		"from": 'playing',					"to": 'won' },
				//the next state depends on the current state when teh button is hit
				{ "name": 'hitButton', 	"from": "stopped", 					"to": 'playing' },
				{ "name": 'hitButton', 	"from": "playing", 					"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "retrying", 				"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "won", 						"to": 'stopped' },
			],

			"callbacks": {
				// ON EVENT
				"onwin" : function(event, from, to){
					alert("nice!");
				},
				"oncollide": function(event, from, to) { 
					//point out where the collisions are?
					
				},
				"onretry" : function(event, from, to){
					//update the button
					GameController.playButton.reset();	
				},
				//ON STATES
				"oncollision": function(event, from, to) { 
					//pause the scene
					PieceController.pause();
					//pause the pattern scolling
					PatternController.pause();
					//stop the sound
					AudioController.stop();
					//go to retry
					GameController.fsm["retry"]();
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
					//stop the audio
					AudioController.stop();
					//set the button to "stop"
					GameController.playButton.stop();
				},
				"onplaying":  function(event, from, to) {
					var countInDuration = AudioController.countInDuration() * 1000;
					//put hte pieces in motion
					PieceController.play();
					//collision testing
					PieceController.computeCollisions();
					//test for a collision and set a timeout
					var collisionStep = PieceController.getFirstCollision();
					var hitPattern = PieceController.getPattern();
					if (collisionStep !== -1){
						var collisionTime = Math.max(AudioController.stepsToSeconds(collisionStep) * 1000, 100) + countInDuration;
						GameController.timeout = setTimeout(function(){
							GameController.fsm["collide"]();
							GameController.timeout = -1;
						}, collisionTime);
					} else {
						var timeoutTime = AudioController.stepsToSeconds(PieceController.cycleLength / 2) * 1000 + countInDuration;
						//go to the won state if the pattern matches
						var eventName = PatternController.isTargetPattern(hitPattern) ? "win" : "retry";
						//otherwise go to the retry phase
						GameController.timeout = setTimeout(function(){
							GameController.fsm[eventName]();
							GameController.timeout = -1;
						}, timeoutTime);
					}
					//set the pattern in motion
					PatternController.play();
					//play the audio
					AudioController.play(hitPattern);
					//set the button to "stop"
					GameController.playButton.play(AudioController.countInBeats, AudioController.stepsToSeconds(1));
				},
				"onwon" : function(event, from , to){
					AppModel.nextLevel();
					GameController.playButton.next();
				},
				"onleavewon" : function(event, from , to){
					//set the next stage;
					GameController.setStage(AppModel.currentStage, AppModel.currentLevel);
				}
			}
	  	});
	},
	/** 
		start the animiation
	*/
	playHit : function(button){
		GameController.fsm["hitButton"]();
	}
};

GameController.initialize();
