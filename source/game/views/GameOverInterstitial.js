goog.provide("game.views.GameOverInterstitial");

goog.require("goog.Disposable");
goog.require("screens.views.GridDom");

/** 
	@constructor
	@extends {goog.Disposable}
*/
var GameOverInterstitial = function(){
	goog.base(this);

	var container = goog.dom.createDom("div", {"id" : "GameOverInterstitial"});
	var bg = goog.dom.createDom("div", {"id" : "Background"});
	var title = goog.dom.createDom('div', { 'id': 'Title' },'LE SUCCESS!! YOUdidIT!!');

	this.Element = container;

	goog.dom.appendChild(GameScreen.div, this.Element);
	goog.dom.appendChild(this.Element, bg);
	goog.dom.appendChild(this.Element, title);

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

	//dispose
	goog.base(this, 'disposeInternal');
};

/** 
	adding the menu buttons
	@private
*/
GameOverInterstitial.prototype.makeButtons = function() {
	var ns= new Button("NEXT SONG", this.onNextGameClick);
	var nsCont = goog.dom.createDom('div', { 'class': 'ButtonContainer' });

	var r= new Button("REPLAY", this.onReplay);
	var rCont = goog.dom.createDom('div', { 'class': 'ButtonContainer' });

	goog.dom.appendChild(this.Element, nsCont);
	goog.dom.appendChild(nsCont, ns.Element);

	goog.dom.appendChild(this.Element, rCont);
	goog.dom.appendChild(rCont, r.Element);
};

GameOverInterstitial.prototype.onNextGameClick = function() {
	GameController.fsm['newGame']();
};

GameOverInterstitial.prototype.onReplay = function() {
	GameController.fsm['retry']();
};
