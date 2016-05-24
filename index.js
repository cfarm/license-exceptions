'use strict';

var fs = require( 'fs' );
var checker = require( 'license-checker' );

function getTermsFile( licenses, fileName ) {
  fs.readFile( fileName, 'utf8', function( err, fileContents ) {
    // console.log( fileContents );
    var licenseOutput = addExceptions( licenses );
    // console.log( licenseOutput );

    var newTerms = fileContents + licenseOutput;
    console.log( newTerms );

    fs.writeFile( 'newTerms.md', newTerms, 'utf8' );
  });
}

function addExceptions( licenses ) {

  var formattedData = '# License Exceptions\n\n Source code or other assets that are excluded from the [TERMS](TERMS.md). This list includes dependencies that may be licensed differently (not CC0-1.0) or are not in the public domain.\n\n';

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

  // fs.writeFileSync( 'licenseExceptions.md', formattedData, 'utf8' );
}

exports.init = function() {
  checker.init( {
    start: './',
    exclude: 'CC0-1.0, Public domain, public domain, Public Domain',
    customPath: 'customFormatExample.json'
  }, function( json, err ) {
    if ( err ) {
      // Handle error
      console.log( err );
    } else {
      getTermsFile( json, 'TERMS.md' );
    }
  } );
};
