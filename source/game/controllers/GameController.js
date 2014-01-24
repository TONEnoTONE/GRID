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
goog.require("game.views.PatternDisplay");
goog.require("game.controllers.AudioController");
goog.require("game.controllers.WallController");
goog.require("game.views.PlayButton");
goog.require("game.models.Game");
goog.require("models.StagesModel");
goog.require("game.views.GameOverInterstitial");
goog.require("GameTopNav");

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
	/** @private
		@type {GameTopNav} */
	gameTopNav : null,
	/** the game model
		@private
		@type {Game} */
	gameModel : null,
	/** the finite state machine
		@dict */
	fsm : null,
	/** @type {number} */
	timeout : -1,
	/** @private @type {EventHandler} */
	levelEnterClickHandler : new goog.events.EventHandler(),
	/** initializer */
	initialize : function(){
		//make the button
		GameController.playButton = new PlayButton("PLAY", GameController.playHit);
		//make the topnav
		GameController.gameTopNav = new GameTopNav();
		// set up the game model
		GameController.gameModel = new Game();
		//make the state machine
		GameController.setupFSM();
	},
	/** 
		remove the relevant stage elements
	*/
	clearStage : function(){
		TileController.reset();
		WallController.reset();
		PieceController.reset();
		PatternController.reset();
	},
	/** 
		@param {number} stage
		@param {number} level
	*/
	setStage : function(stage, level){
		level = level||0;
		//setup the map
		TileController.setStage(stage, level);
		PieceController.setStage(stage, level);
		PatternController.setStage(stage, level);
		AudioController.setStage(stage, level);
		GameController.gameTopNav.setStage(stage, level);
	},
	/** 
		@param {number} stage
		@param {number} level
		@param {number} moves
	*/
	setStageAnimated : function(stage, level, moves){
		GameController.fsm["levelEntrance"]();
		var animateOut = 200;
		var animateIn = 1500;
		level = level||0;
		//setup the map
		TileController.setStage(stage, level, animateIn);
		PieceController.setStage(stage, level, animateIn);
		PatternController.setStage(stage, level, animateIn);
		AudioController.setStage(stage, level);
		GameController.gameTopNav.setStage(stage, level, moves);
		GameController.timeout = setTimeout(function(){
			GameController.playPattern(function(){
				GameController.fsm["startGame"]();
			});
		}, animateIn);
	},
	/** 
		@private
		if the animation is cut off, complete the missing parts	
	*/
	finishSetStageAnimation : function(){
		var stage = StagesModel.currentStage;
		var level = StagesModel.currentLevel;
		TileController.finishAnimation();
		PieceController.finishAnimation();
		PatternController.finishAnimation();
	},
	/**
		go to the next level
	*/
	nextLevel : function(){
		GameController.clearStage();
		//show the new board after some time
		StagesModel.nextLevel();
		GameController.setStageAnimated(StagesModel.currentStage, StagesModel.currentLevel, 20); // !!! eventually put the 20 in the json
	},
	/** 
		plays the pattern on start
		@param {function()=} callback
	*/
	playPattern : function(callback){
		AudioController.playOnce(PatternController.targetPattern);
		//extend the pattern
		var pattern = PatternController.targetPattern;
		PatternController.playOnce(pattern, 0, 2);
		PatternController.animatePatternIn(AudioController.stepsToSeconds(1) * 1000);
		var totalTime = (pattern.length + 1) * AudioController.stepsToSeconds(1) * 1000;
		if (goog.isDef(callback)){
			GameController.timeout = setTimeout(callback, totalTime);
		}
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
	*/
	positionOnBoard : function(piece, position){
		//if it's a valid tile and there isn't already a piece there
		if (TileController.isActiveTile(position) && 
			(PieceController.pieceAt(position) === null || PieceController.pieceAt(position) === piece)){
			PieceController.setPosition(piece, position);
		} else if (piece.onBoard) {
			piece.onBoard = false;
			piece.position.x = -1;
			piece.position.y = -1;
			PieceController.updated(piece);
		}
	},
	/** 
		@param {Piece} piece
		@param {!goog.math.Coordinate} position
	*/
	pieceDroppedOnBoard : function(piece, position){
		// if NOT an active tile -or- there is a piece in the position it is being dropped at, send it back to the holding pen
		if (!TileController.isActiveTile(position) || PieceController.pieceAt(position) !== piece){
			// PieceController.removePiece(piece);
			PieceController.placeInSelection(piece);
		} else if (TileController.isActiveTile(position)) {
			// else it's valid. do fun stuff.
			// update the model
			GameController.gameModel.movePiece();
			console.log('GameController.gameModel.moves: ' + GameController.gameModel.moves);
			GameController.gameTopNav.updateMoves(GameController.gameModel.moves);
		}
	},
	/*=========================================================================
		PLAY / PAUSE / STOP
	=========================================================================*/
	setupFSM : function(){
		GameController.fsm = StateMachine.create({

			"initial" : "outOfLevel",

			"events": [
				{ "name": 'levelEntrance',	"from": ['outOfLevel', "stopped"],					"to": 'entering' },
				{ "name": 'startGame',	"from": 'entering',										"to": 'stopped' },
				{ "name": 'collide',	"from": 'playing',										"to": 'collision' },
				{ "name": 'retry',		"from": ['playing','collision'],						"to": 'retrying'  },
				{ "name": 'endcountin',	"from": 'countin',										"to": 'playing' },
				{ "name": 'exitGame',	"from": ['*'],											"to": 'outOfLevel' },
				{ "name": 'win',		"from": 'playing',										"to": 'gameOverDialog' },
				{ "name": 'sameGame',	"from": 'gameOverDialog',								"to": 'continuePlaying' },
				{ "name": 'newGame',	"from": 'gameOverDialog',								"to": 'stopped' },
				//the next state depends on the current state when teh button is hit
				{ "name": 'hitButton', 	"from": "stopped", 										"to": 'countin' },
				{ "name": 'hitButton', 	"from": "countin", 										"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "playing", 										"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "retrying", 									"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "entering", 									"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "continuePlaying", 								"to": 'stopped' },
			],

			"callbacks": {
				// ON EVENT
				"oncollide": function(event, from, to) { 
					//point out where the collisions are?
					// var colls = PieceController.getFirstCollisionsPositions();
				},
				"onhitButton": function(event, from, to) { 

				},
				"onretrying" : function(event, from, to){
					TileController.showCollisions();
					//update the button
					GameController.playButton.retry();	
				},
				"onleaveretrying" : function(event, from, to){
					
				},
				"onoutOfLevel" : function(event, from, to){
					if (GameController.timeout !== -1){
						clearTimeout(GameController.timeout);
						GameController.timeout = -1;
					}
					PieceController.stop();
					AudioController.stop();
					//stop the pattern animation
					PatternController.stop();
					//stop the wall animation
					TileController.stop();
					//set the button to "stop"
					GameController.playButton.stop();
				},
				"onenterentering":  function(event, from, to) { 
					//put a click listener which progresses things to the next stage
					GameController.levelEnterClickHandler.listenOnce(document, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], function(e){
						e.preventDefault();
						GameController.fsm["startGame"]();
						GameController.finishSetStageAnimation();
					});
				},
				"onleaveentering":  function(event, from, to) { 
					GameController.levelEnterClickHandler.removeAll();
				},
				"onrestart":  function(event, from, to) { 
					PieceController.restart();
				},
				"onstopped":  function(event, from, to) { 
					//clear the timeout if there is one
					if (GameController.timeout !== -1){
						clearTimeout(GameController.timeout);
						GameController.timeout = -1;
					}
					//point out where the collisions are?
					if (from === "playing" || from === "retrying" || from === "continuePlaying"){
						PieceController.restart();
					} else {
						PieceController.stop();

					}
					AudioController.stop();
					//stop the pattern animation
					PatternController.stop();
					//stop the wall animation
					TileController.stop();
					//set the button to "stop"
					GameController.playButton.stop();
				},
				"onplaying" : function(event, from, to){
					//the aggregate pattern
					var hitPattern = PieceController.getPattern();
					//test for a collision and set a timeout
					var collisionStep = PieceController.getFirstCollision();
					if (collisionStep !== -1){
						var collisionTime = Math.max(AudioController.stepsToSeconds(collisionStep - .5) * 1000, 100);
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
					var halfBeatDelay = AudioController.stepsToSeconds(.5);
					//collision testing
					PieceController.computeCollisions();
					//the aggregate pattern
					var hitPattern = PieceController.getPattern();
					//set the count in timer
					var countInDuration = AudioController.countInDuration();
					//scheduling playing after the count in
					GameController.timeout = setTimeout(function(){
						GameController.timeout = -1;
						GameController.fsm["endcountin"]();
					}, countInDuration * 1000);
					//first the count in
					AudioController.countIn(halfBeatDelay);
					//and the wall animations
					PieceController.forEach(function(piece){
						TileController.play(piece, AudioController.stepsToSeconds(1), countInDuration + halfBeatDelay);	
					})
					//put hte pieces in motion
					//nb : these include the offset for the countin
					PieceController.play(countInDuration);
					//set the pattern in motion
					PatternController.play(hitPattern, countInDuration);
					//set the button to "stop"
					GameController.playButton.countIn(AudioController.countInBeats, AudioController.stepsToSeconds(1));
					//play the audio
					AudioController.play(hitPattern, countInDuration + halfBeatDelay);
					if (StagesModel.currentLevel > 0){
						AudioController.playStage(StagesModel.currentStage, StagesModel.currentLevel, 
							countInDuration + halfBeatDelay, .1);
					}
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
				"onleavecollision" : function(){

				},
				"onwin" : function(event, from, to){
					StagesModel.currentLevelSolved();
					var animDuration = TileController.showSuccess();
					//show the game over modal only after the success animation has finished
					setTimeout(function(){
						GameController.showGameOverModal();	
					}, animDuration);
				},
				"onleavegameOverDialog" : function(event, from , to){
					if (to == "stopped"){
						GameController.removeGameOverModal(true);
					} else {
						GameController.removeGameOverModal(false);
					}
				},
				"onnewGame" : function(event, from , to){
					GameController.nextLevel();
				},
				"onsameGame" : function(event, from , to){
					
				}
			}
	  	});
	},
	/** 
		shows the Game Over Interstitial
	*/
	showGameOverModal : function(){
		GameController.gameOverModal = new GameOverInterstitial(function(){
			GameController.fsm["sameGame"]();
		}, 
		function(){
			GameController.fsm["newGame"]();
		}, StageController.getStageColor(StagesModel.currentStage));
	},
	/** 
		removes the Game Over Interstitial
		@param {boolean} top
	*/
	removeGameOverModal : function(top){
		GameController.gameOverModal.animateOut(top, function(){
      		GameController.gameOverModal.dispose();	
      	});
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
		GameController.fsm["exitGame"]();
		GameController.clearStage();
	}
};

GameController.initialize();
