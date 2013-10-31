/*=============================================================================
	PIECE TYPES
=============================================================================*/

goog.provide("data.PieceType");

/** 
	@enum {string}
*/
var PieceType = {
	Red : 'red',
	Green : 'green',
	Blue : 'blue',
	Purple : 'purple',
	Yellow : 'yellow'
}

/** 
	@param {PieceType} type
	@returns {string}
*/
PieceType.toColor = function(type){
	switch(type){
		case PieceType.Red:
			return "#d4463f";
		case PieceType.Green:
			return "#53CC66";
		case PieceType.Blue:
			return "#0092D2";
		case PieceType.Yellow:
			return "#F58107";
		case PieceType.Purple:
			return "#CA60CA";
	}
	//otherwise return black
	return "#000";
}

/** 
	@returns {Array.<PieceType>} the types an an array
*/
PieceType.toArray = function(){
	return [PieceType.Red, PieceType.Green, PieceType.Blue, PieceType.Purple, PieceType.Yellow];
}

/** 
	@returns {PieceType} a randomly chosen piecetype
*/
PieceType.random = function(){
	var pieces = PieceType.toArray();
	var randIndex = parseInt(Math.random()*pieces.length, 10);
	return pieces[randIndex];
}