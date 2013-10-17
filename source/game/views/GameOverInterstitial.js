goog.provide("game.views.GameOverInterstitial");

goog.require("goog.Disposable");
goog.require("screens.views.GridDom");

/** 
	@constructor
	@extends {goog.Disposable}
*/
var GameOverInterstitial = function(){
	/** @type {Element}*/
	this.Element = null;
	/** @type {Button}*/
	this.ns = null;
	/** @type {Button}*/
	this.r = null;
	/** @type {Element}*/
	this.dialog = null;

	goog.base(this);

	this.dialog = goog.dom.createDom("div", {"id" : "Dialog"});
	this.Element = goog.dom.createDom("div", {"id" : "GameOverInterstitial"});
	var blocker = goog.dom.createDom("div", {"id" : "Blocker"});
	var bg = goog.dom.createDom("div", {"id" : "Background"});
	var title = goog.dom.createDom('div', { 'id': 'Title' },'LE SUCCESS!! YOUdidIT!!');

	goog.dom.appendChild(GameScreen.div, this.Element);
	goog.dom.appendChild(this.Element, blocker);
	goog.dom.appendChild(this.Element, this.dialog);
	goog.dom.appendChild(this.dialog, bg);
	goog.dom.appendChild(this.dialog, title);

	this.makeButtons();
}

//extend dispoable
goog.inherits(GameOverInterstitial, goog.Disposable);

/** @override */
GameOverInterstitial.prototype.disposeInternal = function() {
	//remove the Element from the DOM
	goog.dom.removeChildren(this.Element);
	goog.dom.removeNode(this.Element);
	this.Element = null;
	this.ns = null;
	this.s = null;
	this.dialog = null;
	//dispose
	goog.base(this, 'disposeInternal');
};

/** 
	adding the menu buttons
	@private
*/
GameOverInterstitial.prototype.makeButtons = function() {
	var ns = new Button("NEXT SONG", goog.bind(this.onNextGameClick, this));
	var nsCont = goog.dom.createDom('div', { 'class': 'ButtonContainer' });

	var r = new Button("REPLAY", this.onReplay);
	var rCont = goog.dom.createDom('div', { 'class': 'ButtonContainer' });

	goog.dom.appendChild(this.dialog, nsCont);
	goog.dom.appendChild(nsCont, ns.Element);

	goog.dom.appendChild(this.dialog, rCont);
	goog.dom.appendChild(rCont, r.Element);
};

/** @private */
GameOverInterstitial.prototype.onNextGameClick = function() {
	GameController.fsm['newGame']();
};

/** @private */
GameOverInterstitial.prototype.onReplay = function() {
	GameController.fsm['retry']();
};
