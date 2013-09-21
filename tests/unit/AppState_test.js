goog.require('goog.testing.jsunit');
goog.require('dependencies.chai');
goog.require('states.AppState');

function testConstructor(){
    //AppState.setState("test");
    //notice chai.expect b/c chai does not pollute the global namespace
    //chai.expect(AppState.getState()).to.equal('test');
    //chai.expect(AppState.getState()).to.be.a("string");
}

function testCheckAllStates(){
	AppState.fsm.start(); 		chai.expect(AppState.fsm.current).to.equal('splash');
	AppState.fsm.showsongs(); 	chai.expect(AppState.fsm.current).to.equal('songs');
	AppState.fsm.showparts(); 	chai.expect(AppState.fsm.current).to.equal('parts');
	AppState.fsm.showsongs(); 	chai.expect(AppState.fsm.current).to.equal('songs');
}