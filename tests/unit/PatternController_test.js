goog.require('game.controllers.PatternController');
goog.require('game.controllers.StageController');
goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');


function testMakePattern(){
	StageController.useTestStages(true);
	PatternController.setStage(0, 0);
	chai.expect(PatternController.pattern.beats[0].notes[0].type).to.equal("red");
	chai.expect(PatternController.pattern.beats[1].notes[0].type).to.equal("rest");
	chai.expect(PatternController.pattern.beats[2].notes[0].type).to.equal("green");
	chai.expect(PatternController.pattern.beats[3].notes[0].type).to.be.a("string");
}

function testToArray(){
	StageController.useTestStages(true);
	PatternController.setStage(0, 0);
	chai.expect(PatternController.pattern.beats[0].notesAsArray()).to.be.an("array");
	chai.expect(PatternController.pattern.beats[0].notesAsArray()).to.deep.equal(["red"]);
	chai.expect(PatternController.pattern.beats[1].notesAsArray()).to.deep.equal([]);
}

function testIsEqual(){
	StageController.useTestStages(true);
	PatternController.setStage(0, 0);
	chai.expect(PatternController.pattern.isEqual([["red"], [], ["green"], []])).to.be.true;
	chai.expect(PatternController.pattern.isEqual([["red", "green"], [], ["green"], []])).to.be.false;
}
	