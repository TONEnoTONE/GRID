/*=======================================================================================================
 _______  _______  _______  __    _  _______  __   __    _______  _______  ______    ___      ______   
|       ||       ||       ||  |  | ||   _   ||  | |  |  |       ||       ||    _ |  |   |    |    _ |  
|_     _||   _   ||    _  ||   |_| ||  |_|  ||  |_|  |  |       ||_     _||   | ||  |   |    |   | ||  
  |   |  |  | |  ||   |_| ||       ||       ||       |  |       |  |   |  |   |_||_ |   |    |   |_||_ 
  |   |  |  |_|  ||    ___||  _    ||       ||       |  |      _|  |   |  |    __  ||   |___ |    __  |
  |   |  |       ||   |    | | |   ||   _   | |     |   |     |_   |   |  |   |  | ||       ||   |  | |
  |___|  |_______||___|    |_|  |__||__| |__|  |___|    |_______|  |___|  |___|  |_||_______||___|  |_|
========================================================================================================*/

goog.provide("screens.TopNavController");

goog.require("data.Const");
goog.require("screens.views.TopNav");

var TopNavController = {
	
	/** initializer */
	initialize : function(){
		
	},
	
	/** 
		@param {CONST.APPSTATES} appState
	*/
	setTopNav : function(appState){
		if (appState == CONST.APPSTATES.SCREEN_SONGS){
			TopNav.leftButton.text = 'SONGS';
			TopNav.title('SONGS');
			TopNav.rightButton.text = 'SONGSFOO';
			
			TopNav.show();
		} else if (appState == CONST.APPSTATES.SCREEN_PARTS){
			TopNav.leftButton.text = 'SONGS';
			TopNav.leftButton.show();
			TopNav.title('PARTS');
			TopNav.rightButton.hide();
			
			TopNav.show();
		} else if (appState == CONST.APPSTATES.SCREEN_GAME){
			TopNav.leftButton.text = 'SONGS';
			TopNav.leftButton.show();
			TopNav.title('GRID unLOCK!');
			TopNav.rightButton.hide();
			
			TopNav.show();
		} else {
			TopNav.hide();
		}
	},

	/** 
		@param {number} songIndex
	*/
	songSelectedCb : function(songIndex){
		//StagesModel.currentStage = songIndex;
		//AppState.fsm["showparts"]();
	},
	/** 
		@param {number} partIndex
	*/
	partSelectedCb : function(partIndex){
		//StagesModel.currentStage = partIndex;
		//AppState.fsm["showgame"]();
	}
};
TopNavController.initialize();