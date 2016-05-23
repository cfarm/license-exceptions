var fs = require('fs');
var checker = require('license-checker');

function addExceptions(licenseData) {

      var licenses = licenseData;
      var formattedData = '';

      var licenseList = Object.keys(licenses).map(
        function(license) {
          return licenses[license];
        }
      );

      var licenseNames = Object.keys(licenses).map(
        function(license) {
          return license;
        }
      );
      
      for (var i = 0; i < licenseList.length; i++) {
        var licenseType = String(licenseList[i].licenses);
        // remove asterisk from license
        var licenseType = licenseType.replace(/\*$/, "");
        var repo = licenseList[i].repository;
        var name = licenseNames[i];
        var markItDown = '- [' + name + '](' + repo + '): ' + licenseType + '\n';
        formattedData += markItDown;
      }

    fs.writeFileSync('licenseExceptions.md', formattedData, 'utf8');
}

exports.init = function() {
    checker.init({
        start: './'
    }, function(json, err) {
        if (err) {
            //Handle error
        } else {
            //The sorted json data
            addExceptions(json);
        }
    });
}