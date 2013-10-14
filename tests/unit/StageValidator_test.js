goog.require('data.PieceType');
goog.require('data.PatternType');
goog.require("goog.array");
goog.require("game.controllers.StageController");
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');

function setUpPage(){
	window.patternTypes = []
	for (var type in PatternType){
		patternTypes.push(PatternType[type]);
	}
	window.pieceTypes = [];
	for (var type in PieceType){
		if (goog.isString(PieceType[type])){
			pieceTypes.push(PieceType[type]);
		}
	}
}

function testStageValidPatternType(){
	//test that the patterns are valid
	var stageCount = StageController.getStageCount();
	for (var i = 0; i < stageCount; i++){
		var levelCount = StageController.getLevelCount(i);
		for (var j = 0; j < levelCount; j++){
			var pattern = StageController.getPattern(i, j);
			checkPatternAgainstPatternTypes(pattern);
		}
	}
}

function checkPatternAgainstPatternTypes(pattern){
	for (var i = 0; i < pattern.length; i++){
		if (goog.isArray(pattern[i])){
			for (var j = 0; j < pattern[i].length; j++){
				isPatternType(pattern[i][j]);
			}
		} else {
			isPatternType(pattern[i]);
		}
	}
}

function isPatternType(pattern){
	if (!goog.array.contains(patternTypes, pattern)){
		throw Error("pattern is not the right type: "+pattern);
	}
}

function testStageValidPieceType(){
	//test that the patterns are valid
	var stageCount = StageController.getStageCount();
	for (var i = 0; i < stageCount; i++){
		var levelCount = StageController.getLevelCount(i);
		for (var j = 0; j < levelCount; j++){
			var pieces = StageController.getAvailablePieces(i, j);
			checkPiecesAgainstPieceTypes(pieces);
		}
	}
}

function checkPiecesAgainstPieceTypes(pieces){
	for (var i = 0; i < pieces.length; i++){
		var piece = pieces[i];
		if (!goog.array.contains(pieceTypes, piece)){
			throw Error("piece is not the right type: "+piece);
		}
	}
}

function testValidSampleNames(){
	var sampleTypes = pieceTypes;
	sampleTypes.push("click");
	//test that the patterns are valid
	var stageCount = StageController.getStageCount();
	for (var i = 0; i < stageCount; i++){
		var levelCount = StageController.getLevelCount(i);
		for (var j = 0; j < levelCount; j++){
			var samples = StageController.getSamples(i, j);
			for (var samp in samples){
				if (!goog.array.contains(sampleTypes, samp)){
					throw Error("sample is not the right type: "+samp);
				}
			}
		}
	}
}