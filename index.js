'use strict';

var fs = require( 'fs' );
var checker = require( 'license-checker' );

function getTermsFile( licenses, fileName ) {
  fs.readFile( fileName, 'utf8', function( err, fileContents ) {
    if ( err && err.fileNotFound || err && err.code === 'ENOENT' ) {
      console.log( 'File not found - you must add the ' + fileName + ' file to your project.' );
    } else if ( err ) {
      console.log( err );
    } else {
      var licenseOutput = addExceptions( licenses );
      var exceptionsContent = '## Exceptions';
      var removeOldExceptions = fileContents.split( exceptionsContent )[0];
      var newTerms = removeOldExceptions + licenseOutput;

      fs.writeFile( fileName, newTerms, 'utf8' );
    }

  });
}

function addExceptions( licenses ) {

  var formattedData = '## Exceptions\n\n Source code or other assets that are excluded from the terms. This list includes dependencies that may be licensed differently (not CC0-1.0) or are not in the public domain.\n\n';

  var licenseList = Object.keys( licenses ).map(
    function( license ) {
      return licenses[license];
    }
  );

  for ( var i = 0; i < licenseList.length; i++ ) {
    var licenseType = String( licenseList[i].licenses );
    // remove asterisk from license
    licenseType = licenseType.replace( /\*$/, '' );
    var repo = licenseList[i].repository;
    var name = licenseList[i].name;
    if ( repo == undefined ) {
      repo = 'https://www.npmjs.com/package/' + name;
    }
    var markItDown = '- [' + name + '](' + repo + '): ' + licenseType + '\n';
    formattedData += markItDown;
  }

  return formattedData;
}

exports.init = function() {
  checker.init( {
    start: './',
    exclude: 'CC0-1.0, Public domain, public domain, Public Domain',

    // @todo fix path to be relative to node modules folder not project folder, write test!!!
    // customPath: 'customFormatExample.json'
    customPath: './node_modules/license-exceptions/customFormatExample.json'

  }, function( json, err ) {
    if ( err ) {
      // Handle error
      console.log( err );
    } else {
      getTermsFile( json, 'TERMS.md' );
    }
  } );
};
