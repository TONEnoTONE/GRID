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
goog.require("game.views.GameOverInterstitial");
goog.require("game.views.GameFailInterstitial");
goog.require("GameTopNav");
goog.require("managers.TutorialManager");

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
		@type {GameFailInterstitial} */
	gameFailModal : null,
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
	/** @type {boolean} */
	freePlay : false,
	/** @private @type {EventHandler} */
	levelEnterClickHandler : new goog.events.EventHandler(),
	/** initializer */
	initialize : function(){
		//make the button
		GameController.playButton = new PlayButton("PLAY", GameController.playHit);
		// set up the game model
		GameController.gameModel = new Game();
		//GameController.gameModel.setCb( function(){} );
		//make the topnav
		GameController.gameTopNav = new GameTopNav(GameController.gameModel);
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
		called before the level is visible
	*/
	beforeVisible : function(){
		//set the takes
		GameController.gameTopNav.reset();
		//set the game button to faded out
		GameController.playButton.fadeOut();
	},
	/** 
		@param {number} stage
		@param {number} level
	*/
	setStageAnimated : function(stage, level){
		GameController.fsm["levelEntrance"]();
		var animateOut = 200;
		var animateIn = 1500;
		level = level||0;
		//setup the map
		TileController.setStage(stage, level, animateIn);
		PieceController.setStage(stage, level, animateIn);
		PatternController.setStage(stage, level, animateIn);
		AudioController.setStage(stage, level);
		GameController.timeout = setTimeout(function(){
			GameController.playPattern(function(){
				GameController.fsm["startGame"]();
			});
		}, animateIn);
		//first take
		GameController.gameTopNav.setStage(stage, level);
		GameController.gameModel.firstTake();
		//figure out if it's in free play or not
		GameController.freePlay = StageController.isLevelPerfect(stage, level);
		//and the tutorial hook
		TutorialManager.setStage(stage, level);
	},

	/** 
		@private
		if the animation is cut off, complete the missing parts	
	*/
	finishSetStageAnimation : function(){
		clearTimeout(GameController.timeout);
		var stage = StageController.getCurrentStage();
		var level = StageController.getCurrentLevel();
		TileController.finishAnimation();
		PieceController.finishAnimation();
		PatternController.finishAnimation();
	},
	/**
		go to the next level
	*/
	nextLevel : function(){
		//show the new board after some time
		if (StageController.nextLevel()){
			//if they have completed the song, go onto thte next song's parts screen
			AppState.fsm["showparts"]();
		} else {
			GameController.clearStage();
			GameController.setStageAnimated(StageController.getCurrentStage(), StageController.getCurrentLevel()); 
			GameController.playButton.fadeOut();
		}
	},
	/** 
		plays the pattern on start
		@param {function()=} callback
	*/
	playPattern : function(callback){
		AudioController.playOnce(PatternController.targetPattern);
		//extend the pattern
		var pattern = PatternController.targetPattern;
		PatternController.playOnce(pattern, 0, 1);
		var stepTime = AudioController.stepsToSeconds(1) * 1000;
		PatternController.animatePatternIn(stepTime);
		var totalTime = (pattern.length / 2) * stepTime;
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
			//let the tutorial manager know
			TutorialManager.pieceDroppedOnBoard(piece, position);
		}
	},
	/*=========================================================================
		PLAY / PAUSE / STOP
	=========================================================================*/
	setupFSM : function(){
		GameController.fsm = StateMachine.create({

			"initial" : "outOfLevel",

			"events": [
				{ "name": 'levelEntrance',	"from": ['outOfLevel', "stopped"],		"to": 'entering' },
				{ "name": 'startGame',		"from": 'entering',						"to": 'stopped' },
				{ "name": 'collide',		"from": 'playing',						"to": 'collision' },
				{ "name": 'retry',			"from": ['playing','collision'],		"to": 'retrying'  },
				{ "name": 'endcountin',		"from": 'countin',						"to": 'playing' },
				{ "name": 'exitGame',		"from": ['*'],							"to": 'outOfLevel' },
				{ "name": 'win',			"from": 'playing',						"to": 'gameOverDialog' },
				{ "name": 'lose',			"from": ['playing','collision', "entering"],		"to": 'gameFailDialog' },
				{ "name": 'sameGame',		"from": ['gameOverDialog',"gameFailDialog"],			"to": 'continuePlaying' },
				{ "name": 'newGame',		"from": 'gameOverDialog',				"to": 'stopped' },
				{ "name": 'goFree',			"from": 'countin',						"to": 'freePlay' },
				//the next state depends on the current state when teh button is hit
				{ "name": 'hitButton', 	"from": "stopped", 							"to": 'countin' },
				{ "name": 'hitButton', 	"from": "countin", 							"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "playing", 							"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "retrying", 						"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "entering", 						"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "freePlay", 						"to": 'stopped' },
				{ "name": 'hitButton', 	"from": "continuePlaying", 					"to": 'stopped' },
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
					//display retry text
					ScreenText.gameScreenRetry();
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
					//if the level is timed out, show the fail interstitial
					var stage = StageController.getCurrentStage();
					var level = StageController.getCurrentLevel();
					if (StageController.isLevelTimedOut(stage, level)){
						GameController.fsm["lose"]();
					}
				},
				"onleaveentering":  function(event, from, to) { 
					GameController.levelEnterClickHandler.removeAll();
					//fade the play button in
					GameController.playButton.fadeIn();
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
					if (from === "playing" || from === "retrying"){
						PieceController.restart();
						// update takes
						GameController.gameModel.nextTake();
					} else if (from === "continuePlaying"){
						//put all the pieces back in the selection
						PieceController.stop();
						PieceController.forEach(function(piece){
							PieceController.placeInSelection(piece);
						});
					} else {
						PieceController.stop();

					}
					AudioController.stop();
					//stop the pattern animation
					PatternController.stop();
					//stop the wall animation
					TileController.stop();
					//set the button to "stop"
					GameController.playButton.stop(GameController.freePlay);
				},
				"onplaying" : function(event, from, to){
					//test for a collision and set a timeout
					var collisionStep = PieceController.getFirstCollision();
					if (collisionStep > 0){
						var collisionTime = Math.max(AudioController.stepsToSeconds(collisionStep) * 1000, 50);
						GameController.timeout = setTimeout(function(){
							GameController.fsm["collide"]();
							GameController.timeout = -1;
						}, collisionTime);
					} else {
						//the aggregate pattern
						var hitPattern = PieceController.getPattern();
						var timeoutTime = AudioController.stepsToSeconds(PieceController.cycleLength / 2) * 1000;
						var success = PatternController.isTargetPattern(hitPattern);
						var maxTakes = StageController.getNumberTakesAllowed();
						if (!success && GameController.gameModel.takes >= maxTakes){
							GameController.fsm["lose"]();
						} else {
							GameController.timeout = setTimeout(function(){
								//go to the won state if the pattern matches
								var eventName = success ? "win" : "retry";
								//otherwise go to the retry phase
								GameController.fsm[eventName]();
								GameController.timeout = -1;
							}, timeoutTime);
						}
					}
					GameController.playButton.play();
					// track this as a take
					GameController.gameModel.startTake();
					//notify the tutorial
					TutorialManager.gameScreenPlaying();
				},
				"onfreePlay" : function(event, from, to) {
					GameController.playButton.play();
				},
				"oncountin":  function(event, from, to) {
					var halfBeatDelay = AudioController.stepsToSeconds(.5);
					//if there are no pieces on the board, just play the pattern back
					var piecesOnBoard = PieceController.onBoardPieces().length;
					if (piecesOnBoard === 0){
						//animate the target pattern
						var delay = .1;
						PatternController.play(PatternController.targetPattern, delay);
						AudioController.play(PatternController.targetPattern, delay);
						GameController.playButton.play();
						return;
					}

					//the aggregate pattern
					var hitPattern = PieceController.getPattern();
					//if it's in free play
					var nextState = "endcountin";
					if (GameController.freePlay){
						nextState = "goFree";
						//store the current pattern
						PatternController.setTargetPattern(hitPattern);
						PatternController.updated(hitPattern);
					} else {
						//collision testing
						PieceController.computeCollisions();
					}
					//set the count in timer
					var countInDuration = AudioController.countInDuration() + halfBeatDelay;
					//first the count in
					AudioController.countIn(halfBeatDelay);
					//and the wall animations
					PieceController.forEach(function(piece){
						TileController.play(piece, AudioController.stepsToSeconds(1), countInDuration);	
					})
					//put hte pieces in motion
					PieceController.play(countInDuration - halfBeatDelay);
					//set the pattern in motion
					PatternController.play(hitPattern, countInDuration);
					//set the button to "stop"
					GameController.playButton.countIn(AudioController.countInBeats, countInDuration);
					//play the audio
					AudioController.play(hitPattern, countInDuration);
					AudioController.playStage(StageController.getCurrentStage(), StageController.getCurrentLevel(), 
						countInDuration, .1);
					//scheduling playing after the count in
					GameController.timeout = setTimeout(function(){
						GameController.timeout = -1;
						GameController.fsm[nextState]();
					}, (countInDuration  - halfBeatDelay) * 1000);
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
					//if there are too many takes, lock them out
					var maxTakes = StageController.getNumberTakesAllowed();
					if (GameController.gameModel.takes >= maxTakes){
						GameController.fsm["lose"]();
					} else { //or go to retry
						GameController.fsm["retry"]();
					}
				},
				"onleavecollision" : function(){

				},
				"onwin" : function(event, from, to){
					var stars = StageController.currentLevelSolved(GameController.gameModel.takes);
					var animDuration = TileController.showSuccess();
					//show the game over modal only after the success animation has finished
					setTimeout(function(){
						GameController.showGameOverModal(stars);	
					}, animDuration + 300);
				},
				"onlose" : function(event, from , to){
					//lock out of level
					StageController.setCurrentLevelLockedOut();
					setTimeout(function(){
						GameController.showGameFailModal();	
					}, from === "entering" ? 800 : 200);
				},
				"onleavegameOverDialog" : function(event, from , to){
					if (to == "stopped"){
						GameController.removeGameOverModal(true);
					} else {
						GameController.removeGameOverModal(false);
					}
				},
				"onleavegameFailDialog" : function(event, from , to){
					if (to == "stopped"){
						GameController.removeGameFailModal(true);
					} else {
						GameController.removeGameFailModal(false);
					}
				},
				"onnewGame" : function(event, from , to){
					GameController.nextLevel();
				},
				"onsameGame" : function(event, from , to){
					//test if they got perfect and set it up for that
					var stage = StageController.getCurrentStage();
					var level = StageController.getCurrentLevel();
					GameController.gameTopNav.setStage(stage, level);
					PatternController.refreshPattern(stage, level);
					GameController.gameModel.firstTake();
					//figure out if it's in free play or not
					GameController.freePlay = StageController.isLevelPerfect(stage, level);
				}
			}
	  	});
	},
	/** 
		shows the Game Over Interstitial
		@param {number} stars
	*/
	showGameOverModal : function(stars){
		var stageNumber = StageController.getCurrentStage();
		var songCompleted = (StageController.getCurrentLevel() === StageController.getLevelCount(stageNumber) - 1);
		var gameCompleted = songCompleted && (stageNumber === StageController.getStageCount() - 1);
		GameController.gameOverModal = new GameOverInterstitial(function(){
			if (songCompleted){
				AppState.fsm["showparts"]();
			} else {
				GameController.fsm["sameGame"]();
			}
		}, 
		function(){
			GameController.fsm["newGame"]();
		}, StageController.getStageColor(stageNumber), stars, songCompleted, gameCompleted);
		//let the tutorial manager know
		TutorialManager.gameOverInterShow(GameController.gameOverModal);
	},
	/** 
		shows the Game Fail Interstitial
	*/
	showGameFailModal : function(){
		GameController.gameFailModal = new GameFailInterstitial(function(){
			//go back to the parts screen
			AppState.fsm["showparts"]();
		}, function(){
			GameController.fsm["sameGame"]();
		});
	},
	/** 
		removes the Game Fail Interstitial
		@param {boolean} top
	*/
	removeGameFailModal : function(top){
		GameController.gameFailModal.animateOut(top, function(){
      		GameController.gameFailModal.dispose();	
      	});
	},
	/** 
		removes the Game Over Interstitial
		@param {boolean} top
	*/
	removeGameOverModal : function(top){
		//trying to reduce latency on this
		setTimeout(function(){
			GameController.gameOverModal.animateOut(top, function(){
				GameController.gameOverModal.dispose();	
			});
		}, 50)
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
