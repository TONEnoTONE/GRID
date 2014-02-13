/*=============================================================================
	THINGS THAT ARE USEFUL
=============================================================================*/

goog.provide("data.Util");

var Util = {
	/** 
		compute the lowest common multiple of two numbers
		@private
		@param {!number} a
		@param {!number} b
		@returns {!number} lcm of two numbers
	*/
	lcm : function(a, b){
		return a * (b / Util.gcd(a, b));
	},
	/** 
		used to compute the lowest common multiple
		@private
		@param {!number} a
		@param {!number} b
		@returns {!number} greatest common denominator of the two numbers
	*/
	gcd : function(a, b){
		if (a == 0)
			return b;
		while (b != 0) {
			if (a > b)
				a = a - b;
			else
				b = b - a;
		}
		return a;
	}
}