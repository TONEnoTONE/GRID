# GRID
it's cool. 

## Compiling

Let's closure this thing!

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

~~to compile the required code use [r.js](https://github.com/jrburke/r.js)~~

to compile the code, run ./compiler/close.sh. the build will appear in ./build/grid.min.js

## Tests

make sure that you have [mocha-phantomjs](http://metaskills.net/mocha-phantomjs/) installed

For testing were using [Chai](http://chaijs.com/)

Tests begin with 'define' and pull in chai and the module being tested. The function should return a function which will be called later in the correct Mocha context. 

For example : 

```javascript
define(["chai", "game/somemodule"], function(chai, module) {
	//alias to chai.expect
	var expect = chai.expect;
	//function to be returned
	var test = function(){
		describe("Module Test", function() {
			it('Follows Spec', function() {
				expect(module.name).to.be.a("string");
				expect(module.position).to.be.an("Object");
				//...etc
			});
		});
	}
  	//return the test so that it can be run in the correct context
  	return test;
});
``` 

## Links

[cool ascii text gen](http://patorjk.com/software/taag/#p=display&f=Modular&t=GRID)
