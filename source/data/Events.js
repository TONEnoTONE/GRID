/*=============================================================================
 _______  __   __  _______  __    _  _______  _______ 
|       ||  | |  ||       ||  |  | ||       ||       |
|    ___||  |_|  ||    ___||   |_| ||_     _||  _____|
|   |___ |       ||   |___ |       |  |   |  | |_____ 
|    ___||       ||    ___||  _    |  |   |  |_____  |
|   |___  |     | |   |___ | | |   |  |   |   _____| |
|_______|  |___|  |_______||_|  |__|  |___|  |_______|

=============================================================================*/

goog.provide("data.Events");

goog.require("goog.events");

/** 
	@typedef {Object}
*/
var Events  = {
	//aliases for the different events
	/** @type {goog.events.EventType} */
	CLICK : goog.events.EventType.CLICK,
	/** @type {goog.events.EventType} */
	DOWN : goog.events.EventType.MOUSEDOWN,
	/** @type {goog.events.EventType} */
	UP : goog.events.EventType.MOUSEUP,
	/** @type {goog.events.EventType} */
	MOVE : goog.events.EventType.MOUSEMOVE
}