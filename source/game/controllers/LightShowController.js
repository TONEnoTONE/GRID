/*=============================================================================

 ___      ___   _______  __   __  _______    _______  __   __  _______  _     _ 
|   |    |   | |       ||  | |  ||       |  |       ||  | |  ||       || | _ | |
|   |    |   | |    ___||  |_|  ||_     _|  |  _____||  |_|  ||   _   || || || |
|   |    |   | |   | __ |       |  |   |    | |_____ |       ||  | |  ||       |
|   |___ |   | |   ||  ||       |  |   |    |_____  ||       ||  |_|  ||       |
|       ||   | |   |_| ||   _   |  |   |     _____| ||   _   ||       ||   _   |
|_______||___| |_______||__| |__|  |___|    |_______||__| |__||_______||__| |__|

=============================================================================*/

goog.provide("LightShow.Controller");
goog.provide("LightShow.Callback");

goog.require("goog.dom");
goog.require("data.Const");
goog.require("game.views.BoardView");
goog.require("game.controllers.AudioController");
goog.require("data.PieceType");


/** 
	@constructor
*/
LightShow.Controller = function(){
	/** @type {Array.<Array>}*/
	this.Elements = [];
	//setup the 2d array
	for (var i = 0; i < CONST.BOARDDIMENSION.HEIGHT; i++){
		this.Elements[i] = new Array(CONST.BOARDDIMENSION.WIDTH);
	}
	//fill it with tiles
	for (var x = 0; x < CONST.BOARDDIMENSION.WIDTH; x++){
		for (var y = 0; y < CONST.BOARDDIMENSION.HEIGHT; y++){
			var element = goog.dom.createDom("div", {"class" : "LightShow"});
			var position = new goog.math.Coordinate(x, y);
			var offset = BoardView.positionToPixel(position);
			goog.dom.appendChild(BoardView.Board, element);
			goog.style.setPosition(element, offset);
			this.Elements[y][x] = element;
		}
	}
	/** @type {number} */
	this.delay = AudioController.stepsToSeconds(.5)*1000;
	/** @type {number} */
	this.sustain = AudioController.stepsToSeconds(.5)*1000;
	/** @type {boolean} */
	this.playing = true;
	/** @type {boolean} */
	this.loop = false;
	/** @type {Array.<LightShow.Callback> */
	this.callbacks = this.random(10);
}

/** 
	play light show
*/
LightShow.Controller.prototype.start = function(){
	this.delay = AudioController.stepsToSeconds(.5)*1000;
	this.sustain = AudioController.stepsToSeconds(.5)*1000;
	this.playing = true;
	this.pointer = 0;
	this.playNext(this.callbacks[this.pointer]);
}

/** 
	stop the light show
*/
LightShow.Controller.prototype.stop = function(){
	this.playing = false;
}

/** 
	ripple from start to end horizontally
	@param {number} start
	@param {number} end
	@param {PieceType=} color
	@returns {number} total time function takes (in milliseconds)
*/
LightShow.Controller.prototype.rippleVertical = function(start, end, color){
	var sub = 0;
	if (start > end){
		var tmp = start;
		start = end;
		end = tmp;
		sub = tmp - 1;
	}
	color = color || PieceType.random();
	//fill it with tiles
	for (var x = start; x < end; x++){
		var delay = this.delay * Math.abs(sub - x);
		for (var y = 0; y < CONST.BOARDDIMENSION.HEIGHT; y++){
			this.flashLight(x, y, color, delay, this.sustain);
		}
	}
	return (end - start) * this.delay;
}

/** 
	ripple from start to end horizontally
	@param {number} start
	@param {number} end
	@param {PieceType=} color
	@returns {number} total time function takes (in milliseconds)
*/
LightShow.Controller.prototype.rippleHorizontal = function(start, end, color){
	var sub = 0;
	if (start > end){
		var tmp = start;
		start = end;
		end = tmp;
		sub = tmp - 1;
	}
	color = color || PieceType.random();
	//fill it with tiles
	for (var y = start; y < end; y++){
		var delay = this.delay * Math.abs(sub - y);
		for (var x = 0; x < CONST.BOARDDIMENSION.WIDTH; x++){
			this.flashLight(x, y, color, delay, this.sustain);
		}
	}
	return (end - start) * this.delay;
}

/** 
	ripple a big square
	@param {number} goInward
	@param {PieceType=} color
	@returns {number} total time function takes (in milliseconds)
*/
LightShow.Controller.prototype.square = function(goInward, color){
	color = color || PieceType.random();
	for (var y = 0; y < CONST.BOARDDIMENSION.HEIGHT; y++){
		for (var x = 0; x < CONST.BOARDDIMENSION.WIDTH; x++){
			//the center 4
			if (y === 0 || x === 0 || x === 3 || y === 3){
				var delay = this.delay;
				if (goInward){
					delay = 0;
				}
				this.flashLight(x, y, color, delay, this.sustain);
			} else {
				var delay = 0;
				if (goInward){
					delay = this.delay;
				}
				this.flashLight(x, y, color, delay, this.sustain);
			}
		}
	}
	return this.delay*2;
}

/** 
	noise
	@returns {number} total time function takes (in milliseconds)
*/
LightShow.Controller.prototype.noise = function(){
	var order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	goog.array.shuffle(order);
	for (var y = 0; y < CONST.BOARDDIMENSION.HEIGHT; y++){
		for (var x = 0; x < CONST.BOARDDIMENSION.WIDTH; x++){
			var color = PieceType.random();
			var delay = order[y*CONST.BOARDDIMENSION.HEIGHT + x];
			this.flashLight(x, y, color, delay * this.delay * .5, this.sustain);
		}
	}
	return this.delay*8;
}

/** 
	turns the light on then off
	@param {number} x
	@param {number} y
	@param {PieceType} color
	@param {number} startTime
	@param {number} sustain
*/
LightShow.Controller.prototype.flashLight = function(x, y, color, startTime, sustain){
	var el = this.Elements[y][x];
	goog.dom.classes.set(el, "LightShow "+color);
	var isIt = { stillPlaying : this.playing };
	setTimeout(function(){
		if (isIt.stillPlaying){
			goog.style.setOpacity(el, 1);
			setTimeout(function(){
				goog.style.setOpacity(el, 0);
			}, sustain);
		}
	}, startTime);
}

/** 
	@param {LightShow.Callback} callback
*/
LightShow.Controller.prototype.playNext = function(callback){
	//invoked the function
	var wait = callback.fn.apply(this, callback.args);
	//increment the pointer
	this.pointer++;
	if (this.pointer === this.callbacks.length && this.loop){
		this.pointer = 0;
	}
	var that = this;
	setTimeout(function(){
		if (that.playing && that.pointer < that.callbacks.length){
			that.playNext(that.callbacks[that.pointer]);
		}
		that = null;
	}, wait)
}

/** 
	@returns {Array.<LightShow.Callback>}
*/
LightShow.Controller.prototype.allCallbacks = function(){
	return [
		{
			fn : this.rippleVertical,
			args : [0, 4]
		},
		{
			fn : this.rippleHorizontal,
			args : [4, 0]
		},
		{
			fn : this.rippleVertical,
			args : [4, 0]
		},
		{
			fn : this.rippleHorizontal,
			args : [0, 4]
		},
		{
			fn : this.square,
			args : [false]
		},
		{
			fn : this.square,
			args : [true]
		},
		{
			fn : this.noise,
			args : []
		},

	];
}

/** 
	@param {number} length
	@returns {Array.<LightShow.Callback>} a random callback
*/
LightShow.Controller.prototype.random = function(length){
	var all = this.allCallbacks();
	var ret = [];
	for (var i = 0; i < length; i++){
		var randIndex = goog.math.randomInt(all.length);
		ret.push(all[randIndex]);
	}
	return ret;
}

/** 
	the win show
*/
LightShow.Controller.prototype.win = function(){
	this.callbacks = [
		{
			fn : this.square,
			args : [false, PieceType.Green]
		},
		{
			fn : this.square,
			args : [true, PieceType.Green]
		}
	];
	this.loop = false;
	this.start();
}

/** 
	the win show
*/
LightShow.Controller.prototype.lose = function(){
	this.callbacks = [
		{
			fn : this.square,
			args : [true, PieceType.Red]
		},
		{
			fn : this.square,
			args : [false, PieceType.Red]
		}
	];
	this.loop = false;
	this.start();
}

/** 
	the win show
*/
LightShow.Controller.prototype.playShow = function(){
	this.callbacks = this.random(10);
	this.loop = true;
	this.start();
}

/** 
	@typedef {{
		fn : funciton,
		args : Array
	}}
*/
LightShow.Callback;

goog.addSingletonGetter(LightShow.Controller);
LightShow.Controller.getInstance();