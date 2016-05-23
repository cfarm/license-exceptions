var fs = require('fs');
var checker = require('license-checker');

function addExceptions(licenses) {

      var formattedData = '';

      var licenseList = Object.keys(licenses).map(
        function(license) {
          return licenses[license];
        }
      );
      
      for (var i = 0; i < licenseList.length; i++) {
        var licenseType = String(licenseList[i].licenses);
        // remove asterisk from license
        var licenseType = licenseType.replace(/\*$/, "");
        var repo = licenseList[i].repository;
        var name = licenseList[i].name;
        if (repo == undefined) {
            repo = 'https://www.npmjs.com/package/' + name;
        }
        var markItDown = '- [' + name + '](' + repo + '): ' + licenseType + '\n';
        formattedData += markItDown;
      }

    fs.writeFileSync('licenseExceptions.md', formattedData, 'utf8');
}

exports.init = function() {
    checker.init({
        start: './',
        exclude: 'CC0-1.0, Public domain, public domain, Public Domain',
        customPath: 'customFormatExample.json'
    }, function(json, err) {
        if (err) {
            //Handle error
        } else {
            //The sorted json data
            addExceptions(json);
        }
    });
}