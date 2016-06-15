

@todo: 

- fix customPath
- tests
- travis
- snyk
- update open-source-project-template

enhancements:

- add link to license
- automate install steps
- add to setup.sh for projects that use that

# License exceptions

A Node package to add a list of non-public domain Node.js modules to your project's [TERMS](TERMS.md) Exceptions.

Uses the [License checker](https://github.com/davglass/license-checker) tool to determine the license for your software's Node.js dependencies, and outputs the list to CFPB's standard [TERMS](TERMS.md) file to be included with all of our open source software.

## Dependencies

- [Node.js](https://nodejs.org/en/)

## Installation

1. First install [Node.js](https://nodejs.org/en/). Then in your project's root directory:
  
  ```
  npm install license-exceptions --save-dev
  ```
1. Add the following script to your index.js or a custom JS file:

  ```javascript
  'use strict';

  var licenseExceptions = require('license-exceptions');

  licenseExceptions.init();
  ```

## Usage

1. Run the script you installed:
  
  ```
  node index.js
  ```
1. Commit the updated `TERMS.md` file.
1. Run anytime you update `package.json`.

<!-- @todo: automate this step - add to setup.sh -->

## How to test the software

If the software includes automated tests, detail how to run those tests.

## Known issues

Document any known significant shortcomings with the software.

## Getting help

Instruct users how to get help with this software; this might include links to an issue tracker, wiki, mailing list, etc.

**Example**

If you have questions, concerns, bug reports, etc, please file an issue in this repository's Issue Tracker.

## Getting involved

This section should detail why people should get involved and describe key areas you are
currently focusing on; e.g., trying to get feedback on features, fixing certain bugs, building
important pieces, etc.

General instructions on _how_ to contribute should be stated with a link to [CONTRIBUTING](CONTRIBUTING.md).


----

## Open source licensing info
1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)


----

## Credits and references

1. This project uses [License checker](https://github.com/davglass/license-checker) to grab license info for your installed node modules.
