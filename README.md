# GRID
it's cool. 

## Compiling

Let's closure this thing!

We are using plovr, and plovr requires version 1.7 ( at least ) of Java. Download the JDK ( not just he JRE ) here:
[JDK Downloads](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html)

comments must look like this for closure:
```
/** comment */
```
or multiline
```
/**
	comment
*/
```

[closure compiler tags](https://developers.google.com/closure/compiler/docs/js-for-compiler#tags)

[compiler warnings](https://code.google.com/p/closure-compiler/wiki/Warnings)

[closure library](http://docs.closure-library.googlecode.com/git/index.html)

~~to compile the required code use [r.js](https://github.com/jrburke/r.js)~~

to compile the code, run ```compiler/close.sh```. the build will appear in "build/grid.min.js".

## goog.provide/goog.require

At the top of each file, state what you are "providing" with goog.provide. This name should reflect the folder structure until that point and have dots (.) between each folder relative to the "source" directory.

Underneath the provide you can add as many "requires" as necessary. Again, these are dot delimited and reflect the folder structure. 

[plovr](http://plovr.com/) is now the system for compiling and running GRID. It takes care of all the goog.provide/require stuff and will do type checking when compiled in ```mode=ADVANCED```

Run "compiler/plover.sh" to start up the plovr server, and then just open up "index.html" in the browser. 

## Tests

For now the best way to run tests is with plovr. Place unit tests in "/tests/unit" and end the file name with "_test.js". Plovr will automatically discover these tests and run them when you're in the [plovr console](http://localhost:9810/).

For testing I like [Chai](http://chaijs.com/) syntax. Just be sure to "require" chai and prefix "expect" with "chai.expect".

Test functions should be prefixed with "test"

For example:
```javascript
goog.require('goog.testing.jsunit'); //make sure you include this jsunit test
goog.require('dependencies.chai'); //and chai (if you want to use it)
goog.require('game.models.Piece'); //and of course the dependency you want to test

//functions prefixed with "test" will be run
function testConstructor(){
	var p = new game.models.Piece();
	p.setPosition({x : 4, y : 3});
	//notice chai.expect b/c chai does not pollute the global namespace
	chai.expect(p.position.x).to.equal(4);
	chai.expect(p.position.y).to.be.a("number");
}
```


## Links

[cool ascii text gen](http://patorjk.com/software/taag/#p=display&f=Modular&t=GRID)

[closure cheat sheet](http://www.closurecheatsheet.com/)
