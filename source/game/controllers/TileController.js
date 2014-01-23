/*=============================================================================
 _______  ___   ___      _______  _______ 
|       ||   | |   |    |       ||       |
|_     _||   | |   |    |    ___||  _____|
  |   |  |   | |   |    |   |___ | |_____ 
  |   |  |   | |   |___ |    ___||_____  |
  |   |  |   | |       ||   |___  _____| |
  |___|  |___| |_______||_______||_______|

  Tile Controller
  sets up and controls all the tile models. 
  mediates the views on those models
=============================================================================*/

goog.provide("game.controllers.TileController");

goog.require("data.Const");
goog.require("goog.math.Coordinate");
goog.require('game.models.Tile');
goog.require('game.views.BoardView');
goog.require("game.controllers.StageController");
goog.require("game.controllers.WallController");
goog.require("game.controllers.AudioController");

/** 
	@typedef {Object}
*/
var TileController = {
	initialize : function(){
		//setup the 2d array
		for (var i = 0; i < CONST.BOARDDIMENSION.HEIGHT; i++){
			TileController.tiles[i] = new Array(CONST.BOARDDIMENSION.WIDTH);
		}
		//fill it with tiles
		for (var x = 0; x < CONST.BOARDDIMENSION.WIDTH; x++){
			for (var y = 0; y < CONST.BOARDDIMENSION.HEIGHT; y++){
				var position = new goog.math.Coordinate(x, y);
				TileController.tiles[y][x] = new Tile(position);
			}
		}
	},
	/** the tiles */
	tiles : new Array(CONST.BOARDDIMENSION.HEIGHT),
	/** 
		@param {!goog.math.Coordinate} position x,y
		@return {Tile | null} tile
	*/
	tileAt : function(position){
		//in bounds testing
		if (TileController.isInBounds(position)){
			//what happens if you pick somehting out of bounds? 
			return TileController.tiles[position.y][position.x];
		} else {
			return null;
		}
	},
	/** 
		@private
		@param {!goog.math.Coordinate} position
		@return {boolean} 
	*/
	isInBounds : function(position){
		var x = position.x;
		var y = position.y;
		return x >= 0 && x < CONST.BOARDDIMENSION.WIDTH &&
	     y >= 0 && y < CONST.BOARDDIMENSION.HEIGHT;
	},
	/**
		map a function onto each tile
		@param {function(Tile, !goog.math.Coordinate)} callback takes the object and the position
	*/
	forEach : function(callback){
		var width = CONST.BOARDDIMENSION.WIDTH;
		var height = CONST.BOARDDIMENSION.HEIGHT;
		for (var x = 0; x < width; x++){
			for (var y = 0; y < height;  y++){
				var position = new goog.math.Coordinate(x, y);
				callback(TileController.tileAt(position), position);
			}
		}
	},
	/** 
		resets the tiles for a new level
	*/
	reset : function(){
		//reset the view as well
		BoardView.reset();
		//reset all the tiles
		TileController.forEach(function(tile){
			tile.reset();
		});
	},
	/** 
		highlight all of the active tiles
		@param {PieceType} color
		@param {number} duration
	*/
	highlightActive : function(color, duration){
		//reset all the tiles
		TileController.forEach(function(tile){
			if (tile.active){
				var delay = tile.position.x / CONST.BOARDDIMENSION.WIDTH + tile.position.y / CONST.BOARDDIMENSION.HEIGHT;
				delay /= 2;
				delay*=duration;
				tile.highlight(color, duration, delay);
			}
		});
	},
	/** 
		highlight all of the active tiles
		@param {PieceType} color
		@param {number} duration
	*/
	highlightInactive : function(color, duration){
		//reset all the tiles
		TileController.forEach(function(tile){
			if (!tile.active){
				tile.highlight(color, duration);
			}
		});
	},
	/** 
		highlight all of the active tiles
		@param {PieceType} activeColor
		@param {PieceType} inactiveColor
		@param {number} duration
	*/
	highlightAll : function(activeColor, inactiveColor, duration){
		//reset all the tiles
		TileController.forEach(function(tile){
			var waitTime = tile.position.x / CONST.BOARDDIMENSION.WIDTH + tile.position.y / CONST.BOARDDIMENSION.HEIGHT;
			waitTime /= 2;
			waitTime*=duration;
			var color = tile.active ? activeColor : inactiveColor;
			setTimeout(function(){
				tile.highlight(color, duration);
			}, waitTime)
		});
	},
	clearHighlights : function(){
		//reset all the tiles
		TileController.forEach(function(tile){
			tile.clearHighlight();
		});
	},
	/** 
		
	*/
	showCollisions : function(){
		var duration = .4;
		TileController.highlightActive(PieceType.Red, duration);
	},
	/** 
		
	*/
	showSuccess : function(){
		var duration = .4;
		TileController.highlightActive(PieceType.Green, duration);
	},
	/** 
		pulls the current level from the StageController
		@param {number} stage
		@param {number} level
		@param {number=} animationTime
	*/
	setStage : function(stage, level, animationTime){
		//reset the previous stuffs
		//WallController.reset();
		TileController.forEach(function(tile, position){
			var response = StageController.tileAt(position, stage, level);
			tile.active = response.active;
			//foreach of the walls, make a new wall
			goog.object.forEach(response.walls, function(hasWall, direction){
				if (hasWall){
					var wall = WallController.addWall(position, direction);
					tile.walls[direction] = wall;
					setTimeout(function(){
						//animate the wall in
						wall.fadeIn();
						wall = null;
					}, goog.math.randomInt(animationTime || 0));
				}
			});
		});
		//redraw the board when the level has been changed
		TileController.draw(animationTime);
	},
	/** 
		finishes the entrance animation right away
	*/
	finishAnimation : function(){
		TileController.forEach(function(tile, position){
			TileController.forEach(function(tile, position){
				if (tile.active){
					tile.forEachWall(function(wall){
						wall.fadeIn();
					});
				}
			});
		});
		//draw the board
		BoardView.reset();
		BoardView.drawGrid(0);
	},
	/** 
		draws the board
		@param {number=} animationTime
	*/
	draw : function(animationTime){
		//draw the grid
		BoardView.drawGrid(animationTime);
	},
	/** 
		is the tile active?
		@param {!goog.math.Coordinate} position
		@return {boolean}
	*/
	isActiveTile : function(position){
		var tile = TileController.tileAt(position);
		if (tile && tile.active){
			return true;
		} else {
			return false;
		}
	},
	/** 
		Animate the pieces bouncing
		@param {Array.<TrajectoryHit>} bounces
		@param {number} cycleDuration in seconds
		@param {PieceType} color
	*/
	play : function(bounces, cycleDuration, color){
		var countInDuration = AudioController.countInDuration();
		for (var i = 0; i < bounces.length; i++){
			var bounce = bounces[i];
			var wall = WallController.getWall(bounce.position, bounce.direction);
			var delay = countInDuration + AudioController.stepsToSeconds(bounce.beat);
			wall.hit(cycleDuration, delay, color);
		}
	},
	/** 
		stops the wall animation
	*/
	stop : function(){
		WallController.forEach(function(wall){
			wall.stop();
		})
	}
};

//init
TileController.initialize();