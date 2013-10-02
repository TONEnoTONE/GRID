/*=============================================================================
 _______  _______  ______    __    _    __   __  ___   _______  _     _ 
|       ||       ||    _ |  |  |  | |  |  | |  ||   | |       || | _ | |
|    _  ||_     _||   | ||  |   |_| |  |  |_|  ||   | |    ___|| || || |
|   |_| |  |   |  |   |_||_ |       |  |       ||   | |   |___ |       |
|    ___|  |   |  |    __  ||  _    |  |       ||   | |    ___||       |
|   |      |   |  |   |  | || | |   |   |     | |   | |   |___ |   _   |
|___|      |___|  |___|  |_||_|  |__|    |___|  |___| |_______||__| |__|

=============================================================================*/

goog.provide("game.views.PatternView");

goog.require("goog.Disposable");
goog.require("game.views.PatternNoteView");

/** 
	
*/
var PatternView = function(){
	goog.base(this);
	this.beats = [];
	var typesArray = PieceType.toArray();
	for (var i = 0; i < PatternController.patternLength; i++){
		this.beats[i] = [];
		for (var j = 0; j < typesArray.length; j++){
			var type = typesArray[j];
			this.beats[i][j] = new PatternNoteView(type, i);
		}
	}
}

goog.inherits(PatternView, goog.Disposable);

/** @override */
PatternView.prototype.disposeInternal = function(){
	var typesArray = PieceType.toArray();
	for (var i = 0; i < Pattern.length; i++){
		for (var j = 0; j < typesArray.length; j++){
			var type = typesArray[j];
			this.beats[i][type].dispose();
		}
		this.beats[i] = null;
	}
	this.beats = null;
	goog.base(this, "disposeInternal");
}

PatternView.prototype.display = function(pattern){
	var typesArray = PieceType.toArray();
	for (var i = 0; i < this.beats.length; i++){
		var patternIndex = i % pattern.beats.length;
		var beat = pattern.beats[patternIndex];
		// this.displayBeat(beat, i);
	}
}

/** 
	
*/
PatternView.prototype.displayBeat = function(beat, beatNumber){
	//hide them all
	var myBeat = this.beats[beatNumber];
	if (beat.isRest()){
		//hide them all

		//show the rest

	} else {
		for (var i = 0; i < myBeat.length; i++){
			if (goog.array.contains(beat.notes, myBeat[i]))	{
				myBeat[i].show();
			} else {
				myBeat[i].hide();
			}
		}
	}
}