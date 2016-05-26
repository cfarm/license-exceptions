var licenseExceptions = require('../index.js');
var TERMS = 'TERMS.md';
var licenses = {
  'add-kittens': {
    "name": "add-kittens",
    "version": "10.0",
    "description": "adds kittens to your project",
    "licenses": "MIT",
    "licenseFile": "none",
    "licenseModified": "no"
  },
  'remove-puppies': {
    "name": "remove-puppies",
    "version": "1.0",
    "description": "remove stray puppies from your project",
    "licenses": "CC0-1.0",
    "licenseFile": "none",
    "licenseModified": "no"
  }
};
var markdownContent = '## Exceptions\n\n Source code or other assets that are excluded from the terms. This list includes dependencies that may be licensed differently (not CC0-1.0) or are not in the public domain.\n\n- [add-kittens](https://www.npmjs.com/package/add-kittens): MIT\n- [remove-puppies](https://www.npmjs.com/package/remove-puppies): CC0-1.0\n';

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.licenseExceptions = {
  setUp: function(done) {
    // setup here
    done();
  },
  'addExceptions returns licenses in Markdown format': function(test) {
    test.expect(2);
    test.ok( licenseExceptions.addExceptions( licenses ) );
    test.equal( licenseExceptions.addExceptions( licenses ), markdownContent );
    test.done();
  },
  'addExceptions throws an error if argument is not an object': function(test) {
    test.expect(1);
    test.throws( licenseExceptions.addExceptions( 'kitten' ) );
    test.done();
  },
  'getTermsFile throws an error if licenses arg is not an object': function(test) {
    test.expect(1);
    var msg = 'File not found - you must add the ' + TERMS + ' file to your project.'
    test.throws( function() {
      licenseExceptions.getTermsFile( 'kittens', TERMS )
    }, function(actual) {
        return (actual instanceof Error) && /licenses argument should be an object/.test(actual)
    }, 'assertion msg' );

    // msg 'TypeError: path must be a string'
    test.done();
  }
  // 'getTermsFile throws an error if fileName arg is not found': function(test) {
  //   test.expect(1);
  //   var msg = 'File not found - you must add the ../TERMS.md file to your project.';
  //   test.throws( licenseExceptions.getTermsFile( licenses, 'kittens.md' ) );
  //   test.done();
  // }
  // 'getTermsFile reads file': function(test) {
  //   test.expect(1);
  //   var fs = {};
  //   var _readFile = fs.readFile;
  //   fs.readFile = function(path, callback) {
  //       // it's a stub!
  //   };
  //   // test function that uses fs.readFile
  //   test.ok( licenseExceptions.getTermsFile( licenses, TERMS ) );
  //   // we're done
  //   fs.readFile = _readFile;
  //   test.done();
  // },
  // 'output does not include licenses in exclude list (public domain, CC0-1.0)': function(test) {
  //   test.expect(1);
  //   // tests here
  //   // var excludeList = licenseExceptions.init.checker.init.exclude;
  //   // console.log(excludeList);
  //   test.ok( licenseExceptions.init( TERMS ) );
  //   test.done();
  // }
};
