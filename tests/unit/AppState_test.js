goog.require('goog.testing.jsunit'); //make sure you include this jsunit test
goog.require('dependencies.chai'); //and chai (if you want to use it)
goog.require('states.AppState'); //and of course the dependency you want to test

//functions prefixed with "test" will be run
function testConstructor(){
    //AppState.setState("test");
    //notice chai.expect b/c chai does not pollute the global namespace
    //chai.expect(AppState.getState()).to.equal('test');
    //chai.expect(AppState.getState()).to.be.a("string");
}