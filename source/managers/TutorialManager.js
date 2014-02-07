/*=============================================================================
	TUTORIAL MANAGER

	manages the onboarding experience
=============================================================================*/

goog.provide("managers.TutorialManager");

goog.require("ScreenText");
goog.require("goog.storage.mechanism.HTML5LocalStorage");
goog.require("game.controllers.TileController");

var TutorialManager = {
	/** @type {goog.storage.mechanism.HTML5LocalStorage} */
	storage : new goog.storage.mechanism.HTML5LocalStorage(),
	/** @type {string} */
	storageName : "OnBoarding",
	/** @type {Object} */
	onBoardingState : {},
	/** init */
	initialize : function(){
		//pull the local storage into the onBoardingState
		var localStore = TutorialManager.getModelFromStorage();
		if (!localStore){
			TutorialManager.onBoardingState = {};
			TutorialManager.storeModel();
		} else {
			TutorialManager.onBoardingState = localStore;
		}
	},
	/** 
		called when the song screen is shown	
	*/
	songScreen : function(){
		if (!TutorialManager.seenAttribute("SongScreen", "firstView")){

		}
	},
	/*=========================================================================
		LOCAL STORAGE
	=========================================================================*/
	/** 
		@param {string} category
		@param {string} attribute
		@returns {boolean}
	*/
	seenAttribute : function(category, attribute){
		if (!TutorialManager.getAttribute(category, attribute, false)){
			//record the results
			TutorialManager.setAttribute(category, attribute, true, true);
			return false;
		} else {
			return true;
		}
	},
	/** 
		@param {string} category
		@param {string} attribute
		@param {*} value
		@param {boolean=} store
	*/
	setAttribute : function(category, attribute, value, store){
		if (!TutorialManager.onBoardingState[category]){
			TutorialManager.onBoardingState[category] = {};
		}
		TutorialManager.onBoardingState[category][attribute] = value;
		if (store){
			TutorialManager.storeModel();
		}
	},
	/** 
		stores everything in local storage
	*/
	storeModel : function(){
		TutorialManager.storage.set(TutorialManager.storageName, JSON.stringify(TutorialManager.onBoardingState));
	},
	/** 
		@suppress {checkTypes}
		@returns {Object | null} the stored object
	*/
	getModelFromStorage : function(){
		var storageString = TutorialManager.storage.get(TutorialManager.storageName);
		if (!goog.isNull(storageString)){
			return JSON.parse(storageString);
		} else {
			return null;
		}
	},
	/** 
		@param {string} category
		@param {string} attribute
		@param {boolean=} fromStorage
		@returns {*} the attribute requested
	*/
	getAttribute : function(category, attribute, fromStorage){
		var model = fromStorage ? TutorialManager.onBoardingState : TutorialManager.getModelFromStorage();
		if (model && model[category] && model[category][attribute]){
			return model[category][attribute];
		} else {
			return null;
		}
	},
	/*=========================================================================
		GAME SCREEN
	=========================================================================*/
	/** 
		@param {number} stage
		@param {number} level
	*/
	setStage : function(stage, level){
		if (stage === 0 && !TutorialManager.getAttribute("FirstStage", "Completed", false)) {
			//hide the back button
			GameScreen.backButton.hide();
			if (level === 0 && !TutorialManager.seenAttribute("FirstLevel", "Instruction") ){
				ScreenText.gameScreenInstruction("Lets get started!", "Drag the red piece to the red square.");
				// ScreenText.showNumbersOnGame(2000);	
				ScreenText.gameScreenDragPiece();
				//highlight the one piece
				TileController.highlightTile(new goog.math.Coordinate(2, 3), PieceType.Red, 1);
			} else if (level === 1 && !TutorialManager.seenAttribute("SecondLevel", "Instruction") ){
				ScreenText.gameScreenInstruction("To match the pattern above, place the green piece on the 3rd step from the wall.", undefined, 500);
				ScreenText.showNumbersOnGame(1000);	
				ScreenText.showNumbersOnPattern(1000);	
			} else if (level === 2 && !TutorialManager.seenAttribute("ThirdLevel", "Instruction") ){
				ScreenText.gameScreenInstruction("Solve the pattern above without the pieces colliding.", undefined, 500);
			} else if (level === 4 && !TutorialManager.seenAttribute("FifthLevel", "Instruction") ){
				ScreenText.gameScreenInstruction("The length of the path determines the length of the loop.", undefined, 500);
			} 
		} else {
			GameScreen.backButton.show();
		}
	},
	/** 
		@param {Piece} piece
		@param {!goog.math.Coordinate} position
	*/
	pieceDroppedOnBoard : function(piece, position){
		var stage = StageController.getCurrentStage();
		var level = StageController.getCurrentLevel();
		if (stage === 0 && level === 0){
			if (!TutorialManager.getAttribute("FirstLevel", "Completed", false)){
				if (position.x === 2 && position.y === 3){
					ScreenText.hideText();	
					ScreenText.quickBoardText("nice!");
					//remove the highlight
					TileController.clearHighlights();
					//press the play button
					ScreenText.highlightPlayButton("play", 1000);
					GameController.playButton.fadeIn();
				} else {
					// TRY AGAIN!
					ScreenText.quickBoardText("not quite.");
					GameController.playButton.fadeOut();
				}
			}
		}
		//second level
		if (stage === 0 && level === 1){
			if (!TutorialManager.getAttribute("SecondLevel", "Completed", false)){
				if (position.x === 4 && position.y === 3){
					ScreenText.hideText();
					ScreenText.quickBoardText("yes!");
					//remove the highlight
					TileController.clearHighlights();
					//press the play button
					ScreenText.highlightPlayButton("play", 500);
					GameController.playButton.fadeIn();
				} else {
					// TRY AGAIN!
					ScreenText.quickBoardText("almost.");
					GameController.playButton.fadeOut();
				}
			}
		}
	},
	/** 
		@param {GameOverInterstitial} modal
	*/
	gameOverInterShow : function(modal){
		if (!TutorialManager.getAttribute("FirstStage", "Completed")){
			//remove the unnecessary parts of the modal
			goog.dom.setTextContent(modal.TextDescription, "");
			modal.Replay.dispose();
		}
		//some level specific stuff
		var instructionDelay = 1500;
		if (!TutorialManager.seenAttribute("FirstLevel", "Completed")){
			//set the state
			ScreenText.gameScreenInstruction("\n\n\n\n\n\n\n\nPieces bounce off the walls to make loops.", undefined, instructionDelay);
			// ScreenText.highlightNextButton("next", instructionDelay + 1000);
		} else if (!TutorialManager.seenAttribute("SecondLevel", "Completed")){
			//set the state
			ScreenText.gameScreenInstruction("\n\n\n\n\n\n\n\nNow we're making music!", undefined, instructionDelay);
		} else if (!TutorialManager.seenAttribute("ThirdLevel", "Completed")){
			//set the state
			ScreenText.gameScreenInstruction("\n\n\n\n\n\n\n\nParts combine to make a song.", undefined, instructionDelay);
		} else if (!TutorialManager.seenAttribute("FourthLevel", "Completed")){
			//set the state
			ScreenText.gameScreenInstruction("\n\n\n\n\n\n\n\nThe fewer takes, the more stars!", undefined, instructionDelay);
		} else if (!TutorialManager.seenAttribute("FifthLevel", "Completed")){
			//set the state
			ScreenText.gameScreenInstruction("\n\n\n\n\n\n\n\nYou've finished your first song!", undefined, instructionDelay);
			TutorialManager.setAttribute("FirstStage", "Completed", true, true);
		}
	},
	/** 
		play button clicked
	*/
	gameScreenPlaying : function(){
		if (!TutorialManager.getAttribute("FirstStage", "Completed")){
			GameController.playButton.fadeOut();
		}
	}

}

TutorialManager.initialize();