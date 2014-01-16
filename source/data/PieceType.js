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
			return "#EE1B21";
		case PieceType.Green:
			return "#00A550";
		case PieceType.Blue:
			return "#02ACEE";
		case PieceType.Yellow:
			return "#F46E1E";
		case PieceType.Purple:
			return "#605EC2";
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