var fs = require('fs');
var checker = require('license-checker');

var init = function() {
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

function addExceptions(licenseData) {
    // var xhr = new XMLHttpRequest();
    // var URL = 'licenses.json';

    // xhr.open('GET', URL);

    // xhr.send(null);

    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4) {
    //     if (xhr.status === 200) {
    //       onSuccess(xhr.responseText);
    //     } else {
    //       console.log('Error: ' + xhr.status);
    //     }
    //   }
    // };
        

    // var onSuccess = function(response) {

      var licenses = licenseData;
      // var page = document.getElementById('data');
      var formattedData;

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

        formattedData += name;          

        // if (licenseType !== 'Public domain' && licenseType !== 'CC0-1.0' && licenseType !== 'Public Domain') {
          // var listItem = document.createElement('li');
          // var link = document.createElement('a');
          // var nameText = document.createTextNode(name);
          // var licenseText = document.createTextNode(': ' + licenseType);
          // link.appendChild(nameText);
          // link.href = repo;
          // listItem.appendChild(link);
          // listItem.appendChild(licenseText);
          // page.appendChild(listItem);

        // }

      }

      
    // };

        // var dir = path.dirname(args.out);
        // mkdirp.sync(dir);
        //Remove the color tags
        // formattedOutput = chalk.stripColor(formattedOutput);
        fs.writeFileSync('licenseList.json', formattedData, 'utf8');
}




exports.init = init();