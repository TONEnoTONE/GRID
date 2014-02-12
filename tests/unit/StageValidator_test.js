goog.require('data.PieceType');
goog.require("goog.array");
goog.require("goog.object");
goog.require("game.controllers.StageController");
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');

function setUpPage(){
	window.patternTypes = PieceType.toArray();
	patternTypes.push("rest");
	window.pieceTypes = PieceType.toArray();
}

function forEachLevel(callback){
	var stageCount = StageController.getStageCount();
	for (var stage = 0; stage < stageCount; stage++){
		var levelCount = StageController.getLevelCount(stage);
		for (var level = 0; level < levelCount; level++){
			callback(stage, level);
		}
	}
}

function testStageValidPatternType(){
	forEachLevel(function(stage, level){
		var hits = StageController.getPatternHits(stage, level);
		hits = goog.array.flatten(hits);
		for (var i = 0 ; i < hits.length; i++){
			if (goog.array.indexOf(patternTypes, hits[i]) === -1){
				throw Error("Pattern includes invalid type: "+hits[i]+" on level: "+stage+", "+level);
			}
		}
	});
}

function testStageValidPieceType(){
	//test that the pieces are valid
	forEachLevel(function(stage, level){
		var pieces = StageController.getAvailablePieces(stage, level);
		for (var i = 0 ; i < pieces.length; i++){
			if (goog.array.indexOf(pieceTypes, pieces[i]) === -1){
				throw Error("Pieces includes invalid type: "+pieces[i]+" on level: "+stage+", "+level);
			}
		}
	});
}

function testStagesHaveRightSamples(){
	//test that the pieces are valid
	forEachLevel(function(stage, level){
		var pieces = StageController.getAvailablePieces(stage, level);
		var samples = StageController.getSamples(stage, level);
		//make sure each of the pieces has a sample
		for (var i = 0 ; i < pieces.length; i++){
			var type = pieces[i];
			if (!goog.isDef(samples[type])){
				throw Error("Sample does not exist: "+pieces[i]+" on level: "+stage+", "+level);
			}
		}
	});
}

//make sure the board is correctly formatted
function testLevelBoardIsCorrectSize(){
	forEachLevel(function(stage, level){
		var layout = StageController.getLevelLayout(stage, level);
		if (layout.length !== 8){
			throw Error("level layout not right on level: "+stage+", "+level);
		}
		for (var i = 0; i < layout.length; i++){
			var row = layout[i];
			if (row.length !== 8){
				throw Error("Layout not valid on level: "+stage+", "+level);		
			}
		}
	});
}

//test that the available pieces are in the pattern
function testAvailablePiecesInPattern(){
	forEachLevel(function(stage, level){
		var pieces = StageController.getAvailablePieces(stage, level);
		var hits = StageController.getPatternHits(stage, level);
		hits = goog.array.flatten(hits);
		//make sure that the pieces are in the pattern
		goog.array.forEach(pieces, function(piece){
			if (goog.array.indexOf(hits, piece) === -1){
				throw Error("Pattern does not contain piece: "+piece+" on level: "+stage+", "+level);		
			}
		});
		//make sure that the pattern is all in the pieces
		goog.array.forEach(hits, function(hit){
			if (hit !== "rest"){
				if (goog.array.indexOf(pieces, hit) === -1){
					throw Error("Pieces does not contain pattern: "+hit+" on level: "+stage+", "+level);		
				}
			}
		});
	});
}

//test that the available pieces are in the pattern
function testStageAttributes(){
	var stageCount = StageController.getStageCount();
	for (var stage = 0; stage < stageCount; stage++){
		//name
		var name = StageController.getName(stage);
		if (!goog.isString(name)){
			throw Error("Name invalid for stage: "+stage);		
		}
		//bpm
		var bpm = StageController.getStageBpm(stage);
		if (!goog.isNumber(bpm)){
			throw Error("BPM invalid for stage: "+stage);		
		}
		//color
		var color = StageController.getStageColor(stage);
		if (goog.array.indexOf(pieceTypes, color) === -1){
			throw Error("Stage Color invalid for stage: "+stage);			
		}
	}
}

/*
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
}*/