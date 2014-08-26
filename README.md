Scribe
======

Simple logger.

How to use
======

````js
define('app', ['scribe'], function(scribe) {

	var arg1 = 'foo',
	    arg2 = 'bar',
	    arg3 = 'baz';

	scribe.log('New message:', arg1, arg2, arg3);
	// Result: New message: foo bar baz

});
````
