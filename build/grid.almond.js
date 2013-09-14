
/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
  window: false, clearInterval: false, document: false,
  self: false, setInterval: false */


define('dependencies/domReady',[],function () {
    

    var isTop, testDiv, scrollIntervalId,
        isBrowser = typeof window !== "undefined" && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [];

    function runCallbacks(callbacks) {
        var i;
        for (i = 0; i < callbacks.length; i += 1) {
            callbacks[i](doc);
        }
    }

    function callReady() {
        var callbacks = readyCalls;

        if (isPageLoaded) {
            //Call the DOM ready callbacks
            if (callbacks.length) {
                readyCalls = [];
                runCallbacks(callbacks);
            }
        }
    }

    /**
     * Sets the page as loaded.
     */
    function pageLoaded() {
        if (!isPageLoaded) {
            isPageLoaded = true;
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }

            callReady();
        }
    }

    if (isBrowser) {
        if (document.addEventListener) {
            //Standards. Hooray! Assumption here that if standards based,
            //it knows about DOMContentLoaded.
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("load", pageLoaded, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", pageLoaded);

            testDiv = document.createElement('div');
            try {
                isTop = window.frameElement === null;
            } catch (e) {}

            //DOMContentLoaded approximation that uses a doScroll, as found by
            //Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
            //but modified by other contributors, including jdalton
            if (testDiv.doScroll && isTop && window.external) {
                scrollIntervalId = setInterval(function () {
                    try {
                        testDiv.doScroll();
                        pageLoaded();
                    } catch (e) {}
                }, 30);
            }
        }

        //Check if document already complete, and if so, just trigger page load
        //listeners. Latest webkit browsers also use "interactive", and
        //will fire the onDOMContentLoaded before "interactive" but not after
        //entering "interactive" or "complete". More details:
        //http://dev.w3.org/html5/spec/the-end.html#the-end
        //http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
        //Hmm, this is more complicated on further use, see "firing too early"
        //bug: https://github.com/requirejs/domReady/issues/1
        //so removing the || document.readyState === "interactive" test.
        //There is still a window.onload binding that should get fired if
        //DOMContentLoaded is missed.
        if (document.readyState === "complete") {
            pageLoaded();
        }
    }

    /** START OF PUBLIC API **/

    /**
     * Registers a callback for DOM ready. If DOM is already ready, the
     * callback is called immediately.
     * @param {Function} callback
     */
    function domReady(callback) {
        if (isPageLoaded) {
            callback(doc);
        } else {
            readyCalls.push(callback);
        }
        return domReady;
    }

    domReady.version = '2.0.1';

    /**
     * Loader Plugin API method
     */
    domReady.load = function (name, req, onLoad, config) {
        if (config.isBuild) {
            onLoad(null);
        } else {
            domReady(onLoad);
        }
    };

    /** END OF PUBLIC API **/

    return domReady;
});

/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

define('dependencies/requestAnimationFrame',[
], function() {

  /**
   * requirejs version of Paul Irish's RequestAnimationFrame
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   */

  return window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback, element) {

        window.setTimeout(callback, 1000 / 60);

      };
});
/*=============================================================================

 _______  _______  __   __  _______    _______  _______  _______  _______  _______ 
|       ||   _   ||  |_|  ||       |  |       ||       ||   _   ||       ||       |
|    ___||  |_|  ||       ||    ___|  |  _____||_     _||  |_|  ||_     _||    ___|
|   | __ |       ||       ||   |___   | |_____   |   |  |       |  |   |  |   |___ 
|   ||  ||       ||       ||    ___|  |_____  |  |   |  |       |  |   |  |    ___|
|   |_| ||   _   || ||_|| ||   |___    _____| |  |   |  |   _   |  |   |  |   |___ 
|_______||__| |__||_|   |_||_______|  |_______|  |___|  |__| |__|  |___|  |_______|

=============================================================================*/

define('appState/GameState',[], function(){

	var STATE = {
		stage : 0,
		level : 0
	}
	return STATE;
});
/*=============================================================================
 _______  _______  __    _  _______  _______ 
|       ||       ||  |  | ||       ||       |
|       ||   _   ||   |_| ||  _____||_     _|
|       ||  | |  ||       || |_____   |   |  
|      _||  |_|  ||  _    ||_____  |  |   |  
|     |_ |       || | |   | _____| |  |   |  
|_______||_______||_|  |__||_______|  |___|  

	the game constants
=============================================================================*/

define('const',[], function(){

	/**	
		the container of constants
		@typedef {Object}
	*/
	var CONST = {};

	/** @enum {string} */
	CONST.DIRECTION = {
		NORTH : 'n',
		SOUTH : 's',
		EAST : 'e',
		WEST : 'w'
	};
	/** @enum {string} */
	CONST.DIRECTION.OPPOSITE = {
		NORTH : CONST.DIRECTION.SOUTH,
		SOUTH : CONST.DIRECTION.NORTH,
		EAST : CONST.DIRECTION.WEST,
		WEST : CONST.DIRECTION.EAST
	};
	/** @enum {number}*/
	CONST.TILE = {
		INACTIVE : 0,
		ACTIVE : 1,
	};
	/** 
		the size of the grid 
		@const
	*/
	CONST.SIZE = {
		WIDTH : 8,
		HEIGHT : 8
	};

	return CONST;
});
/*=============================================================================
 _______  ___   ___      _______ 
|       ||   | |   |    |       |
|_     _||   | |   |    |    ___|
  |   |  |   | |   |    |   |___ 
  |   |  |   | |   |___ |    ___|
  |   |  |   | |       ||   |___ 
  |___|  |___| |_______||_______|
  
=============================================================================*/

define ('game/models/Tile',["const"], function(){

	var CONST = require("const");

	/**
		@constructor
		@param {Object} position
	*/
	var Tile = function(position){
		this.position = position;
		/** the walls adjacent to the tile*/
		this.walls = {};
		/** active/inactive */
		this.active = false;
	}

	/** 
		@param {CONST.DIRECTION} direction
		@return {boolean}
	*/
	Tile.prototype.hasWall = function(direction){
		return this.walls[direction];
	}

	/** 
		clears all the data for level / stage switches
	*/
	Tile.prototype.reset = function(){
		this.walls = {};
		this.active = false;
	}

	/** 
		@param {CONST.DIRECTION} direction the piece is currently travelling in
		@returns {CONST.DIRECTION} the direction the piece would be in after leaving this tile
	*/
	Tile.prototype.bounce = function(direction){
		return direction;
	}

	return Tile;
});

/*=============================================================================
 _______  _______  _______  _______  _______  _______ 
|       ||       ||   _   ||       ||       ||       |
|  _____||_     _||  |_|  ||    ___||    ___||  _____|
| |_____   |   |  |       ||   | __ |   |___ | |_____ 
|_____  |  |   |  |       ||   ||  ||    ___||_____  |
 _____| |  |   |  |   _   ||   |_| ||   |___  _____| |
|_______|  |___|  |__| |__||_______||_______||_______|

=============================================================================*/

define('data/Stages',[], function(){

	/** @const */
	var STAGES = [
		{
			//optional name
			name : "stage0",
			levels : [
				{
				name : "verse0",
				//width x height
				layout : [	
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 1, 1, 1, 1, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0, 0, 0]
						],
				// walls are defined as a 2 segment array 
				// in the form [{position},{position}]
				// i.e. [{x:x0,y:y0},{x:x1,y:y1}]
				walls : [],
				//the pattern for this puzzle
				pattern : {},
				//the pieces allotted
				pieces : [],
				}
			]
		}
	];

	return STAGES;
});
/*=============================================================================

	STAGE CONTROLLER

	turn the stage/level description into something more parseable
=============================================================================*/

define('game/controllers/StageController',["data/Stages", "underscore", "const"], function(STAGES){

	var _ = require("underscore");

	var CONST = require("const");

	var CONTROLLER = {
		/** 
			@param {Object} position of the tile
			@param {number} stage
			@param {number} level
			@return {Object} tile with all the fields filled out
		*/
		tileAt : function(position, stage, level){
			var levelDef = STAGES[stage].levels[level];
			var tileDef = levelDef.layout[position.y][position.x];
			var walls = CONTROLLER.getWalls(position, stage, level);
			var tile = {
				walls : walls,
				active : tileDef === 0 ? false : true
			};
			return tile;
		},
		/** 
			@param {Object} position of the tile
			@param {number} stage
			@param {number} level
			@return {number} the type
		*/
		typeAt : function(position, stage, level){
			if (position.x >= CONST.SIZE.WIDTH || position.x < 0){
				return 0;
			} else if (position.y >= CONST.SIZE.HEIGHT || position.y < 0){
				return 0;
			} else {
				var levelDef = STAGES[stage].levels[level];
				return levelDef.layout[position.y][position.x];
			}
		},
		/**
			@param {Object} pos0
			@param {Object} pos1
		*/
		relativeDirection : function(pos0, pos1){
			if (pos0.x === pos1.x && pos0.y === pos1.y + 1){
				return CONST.DIRECTION.NORTH;
			} else if (pos0.x === pos1.x && pos0.y + 1 === pos1.y){
				return CONST.DIRECTION.SOUTH;
			} else if (pos0.x === pos1.x + 1 && pos0.y === pos1.y){
				return CONST.DIRECTION.WEST;
			} else if (pos0.x + 1 === pos1.x && pos0.y === pos1.y){
				return CONST.DIRECTION.EAST;
			} else {
				return false;
			}
		},
		/** 
			@param {Object} position of the tile
			@param {number} stage
			@param {number} level
			@return {Object} tile with all the fields filled out
		*/
		getWalls : function(position, stage, level){
			var walls = {};
			//initially set everything to false
			walls[CONST.DIRECTION.NORTH] = false;
			walls[CONST.DIRECTION.EAST] = false;
			walls[CONST.DIRECTION.SOUTH] = false;
			walls[CONST.DIRECTION.WEST] = false;
			//get the other walls
			var thisType = CONTROLLER.typeAt(position, stage, level);
			//get the walls around that tile
			var testPos = [position.x, position.y];
			var levelDef = STAGES[stage].levels[level];
			for (var i = 0; i < levelDef.walls.length; i++){
				var tile0Pos = levelDef.walls[i][0];
				var tile1Pos = levelDef.walls[i][1];
				//test the position
				if (_.isEqual(testPos, tile0Pos)){
					//figure out which side the wall is on
					walls[CONTROLLER.relativeDirection(tile0Pos, tile1Pos)] = true;
				} else if (_.isEqual(testPos, tile1Pos)){
					walls[CONTROLLER.relativeDirection(tile1Pos, tile0Pos)] = true;
				}
			}
			if (CONTROLLER.isEdge(thisType, CONTROLLER.typeAt({ x : position.x + 1, y : position.y }, stage, level))){
				walls[CONST.DIRECTION.EAST] = true;
			}  
			if (CONTROLLER.isEdge(thisType, CONTROLLER.typeAt({ x : position.x - 1, y : position.y }, stage, level))){
				walls[CONST.DIRECTION.WEST] = true;
			}  
			if (CONTROLLER.isEdge(thisType, CONTROLLER.typeAt({ x : position.x, y : position.y - 1}, stage, level))){
				walls[CONST.DIRECTION.NORTH] = true;
			} 
			if (CONTROLLER.isEdge(thisType, CONTROLLER.typeAt({ x : position.x, y : position.y + 1}, stage, level))){
				walls[CONST.DIRECTION.SOUTH] = true;
			}
			return walls;
		},
		/** 
			@param {number} type0
			@param {number} type1
			@return {boolean} return true of 0 && 1 or 1 && 0
		*/
		isEdge : function(type0, type1){
			return type0 + type1 === 1;
		},
		/** 
			@param {number} stage
			@return {number} the number of levels in the stage
		*/
		levelsInStage : function(stage){
			return STAGES[stage].levels.length;
		}
	}

	return CONTROLLER;
});
/*=============================================================================
 _______  ___   ___      _______  _______ 
|       ||   | |   |    |       ||       |
|_     _||   | |   |    |    ___||  _____|
  |   |  |   | |   |    |   |___ | |_____ 
  |   |  |   | |   |___ |    ___||_____  |
  |   |  |   | |       ||   |___  _____| |
  |___|  |___| |_______||_______||_______|

  Tile Controller
=============================================================================*/

define('game/controllers/TileController',['const', "underscore", 'game/models/Tile', "game/controllers/StageController"], function(CONST, _, Tile, StageController){

	// var CONST = require("const");
	// var _ = require("underscore");
	// /** @typedef {function(Object)} */
	// var Tile = require('game/models/Tile');
	// var StageController = require("game/controllers/StageController");

	/** @type {Object} */
	Tile;

	/** @typedef {Object} */
	var TileController;

	/** 
		the tile controller
	*/
	TileController = {
		/** the tiles */
		tiles : new Array(CONST.SIZE.HEIGHT),
		initialize : function(){
			//setup the 2d array
			for (var i = 0; i < CONST.SIZE.HEIGHT; i++){
				TileController.tiles[i] = new Array(CONST.SIZE.WIDTH);
			}
			//fill it with tiles
			for (var x = 0; x < CONST.SIZE.WIDTH; x++){
				for (var y = 0; y < CONST.SIZE.HEIGHT; y++){
					var position = {x : x, y : y};
					TileController.tiles[y][x] = new Tile(position);
				}
			}
			//set all the neighbor pointers
			//does it need pointers to the neighbors??
			//circular references could be bad?!?!
			/*for (var x = 0; x < CONST.SIZE.WIDTH; x++){
				for (var y = 0; y < CONST.SIZE.HEIGHT; y++){
					var t = Tiles.tileAt({x : x, y : y});
					t.neighbors[CONST.DIRECTION.NORTH] = Tiles.tileAt({x : x, y : y - 1});
					t.neighbors[CONST.DIRECTION.SOUTH] = Tiles.tileAt({x : x, y : y + 1});
					t.neighbors[CONST.DIRECTION.EAST] = Tiles.tileAt({x : x + 1, y : y});
					t.neighbors[CONST.DIRECTION.WEST] = Tiles.tileAt({x : x - 1, y : y});
				}
			}*/
		},
		/** 
			@param {Object} position x,y
			@return {Tile | undefined} tile
		*/
		tileAt : function(position){
			//in bounds testing
			if (position.y >= 0 && position.y < CONST.SIZE.HEIGHT){
				//what happens if you pick somehting out of bounds? 
				return TileController.tiles[position.y][position.x];
			} else {
				return;
			}
		},
		/**
			map a function onto each tile
			@param {function(Tile, Object=)} callback takes the object and the position
		*/
		forEach : function(callback){
			var width = CONST.SIZE.WIDTH;
			var height = CONST.SIZE.HEIGHT;
			for (var x = 0; x < width; x++){
				for (var y = 0; y < height;  y++){
					var position = {x : x, y : y};
					callback(TileController.tileAt(position), position);
				}
			}
		},
		/** 
			resets the tiles for a new level
		*/
		reset : function(){
			TileController.forEach(function(tile){
				tile.reset();
			})
		},
		/** 
			pulls the current level from the StageController
			@param {number} stage
			@param {number} level
		*/
		setStage : function(stage, level){
			//reset the previous stuffs
			TileController.reset();
			TileController.forEach(function(tile, position){
				var response = StageController.tileAt(position, stage, level);
				tile.walls = response.walls;
				tile.active = response.active;
			});
		}
	}

	//init
	TileController.initialize();

	//return for require
	return TileController;
});
/*=============================================================================
 _______  _______  __   __  _______ 
|       ||   _   ||  |_|  ||       |
|    ___||  |_|  ||       ||    ___|
|   | __ |       ||       ||   |___ 
|   ||  ||       ||       ||    ___|
|   |_| ||   _   || ||_|| ||   |___ 
|_______||__| |__||_|   |_||_______|

=============================================================================*/


define('game/controllers/GameController',["underscore", "appState/GameState","game/controllers/TileController"], function(){

	var _ = require("underscore");

	var State = require("appState/GameState");

	/** @type {TileController} */
	var Tiles = require("game/controllers/TileController");

	var GAME = {
		/** initializer */
		initialize : function(){
			GAME.setStage(0, 0);
		},
		/** 
			goes to the next level
		*/
		nextLevel : function(){

		},
		/** 
			@param {number} stage
			@param {number=} level
		*/
		setStage : function(stage, level){
			level = level||0;
			//setup the map
			Tiles.setStage(stage, level);
		}
	}

	//run initializer
	GAME.initialize();

	return GAME;
});
/*=============================================================================
 _______  ______    ___   ______  
|       ||    _ |  |   | |      | 
|    ___||   | ||  |   | |  _    |
|   | __ |   |_||_ |   | | | |   |
|   ||  ||    __  ||   | | |_|   |
|   |_| ||   |  | ||   | |       |
|_______||___|  |_||___| |______| 

=============================================================================*/


//require configuration
require.config({
	baseUrl: "./source/",
	paths: {
		// "some": "some/v1.0"
		'underscore' : "dependencies/underscore",
		'const' : "data/Const"
	},
	shim: {
		underscore: {
			exports: '_'
		}
	}
});

//and so it begins...
require(['dependencies/domReady', 'dependencies/requestAnimationFrame', "game/controllers/GameController"], function (domReady) {
	
	//the application singleton
	var GRID = {
		/** @const */
		version : "0.0.1",
		/** */
		initialize : function(){
			console.log("GRID version "+GRID.version);
			//do initialization stuffs

			//kick off the loop
			GRID.loop();
		},
		/** 
			the loop happens on the animation frame
		*/
		loop : function(){
			//setup the next loop
			requestAnimationFrame(GRID.loop);
		}
	}

	//initialize the application when the dom is ready
	domReady(function () {
		//initialize it
		GRID.initialize();
	});
});


define("../source/main", function(){});
/**
 * almond 0.2.6 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

/**
 * @fileoverview
 * @suppress {checkTypes}
 */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        if (config.deps) {
            req(config.deps, config.callback);
        }
        return req;
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());
