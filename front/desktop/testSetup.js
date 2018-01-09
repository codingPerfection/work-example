// This file is written in ES5 since it's not transpiled by Babel.
/* This file does the following:
 1. Sets Node environment variable
 2. Registers babel for transpiling our code for testing
 3. Disables Webpack-specific features that Mocha doesn't understand.
 4. Requires jsdom so we can test via an in-memory DOM in Node
 5. Sets up global vars that mimic a browser.
This setting assures the .babelrc dev config (which includes
 hot module reloading code) doesn't apply for tests.
 But also, we don't want to set it to production here for
 two reasons:
 1. You won't see any PropType validation warnings when
 code is running in prod mode.
 2. Tests will not display detailed error messages
 when running against production version code
*/
process.env.NODE_ENV = 'test'
// Register babel so that it will transpile ES6 to ES5 before our tests run.
var babel = require('babel-register')()
// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.

let ignoreExt = ['.css', '.gif', '.jpg', '.png'];

ignoreExt.forEach(ext => {
  require.extensions[ext] = (file) => { return null }
})



// Configure JSDOM and set global variables
// to simulate a browser environment for tests.
var jsdom = require('jsdom').jsdom
var exposedProperties = ['window', 'navigator', 'document']
global.document = jsdom('')
global.navigator = { userAgent: 'node.js' }
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})
documentRef = document


var appSettings = require('./src/Settings').settings;
appSettings.setupTestingEnvironment();

var enzyme = require('enzyme');
var adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new adapter() });


var auth = require('./src/helpers/Auth').auth;
var userSettings = require('./src/helpers/UserSettings').userSettings;

global.login = {
  manager: (setupUserSettings) => {
    auth.setAuthToken('123456');
    /* istanbul ignore next */
    if (setupUserSettings) {
      userSettings.guild = "Renascentia";
      userSettings.isManager = true;
      userSettings.fetched = true;
      userSettings.charId = "1";
    }
  },
  user: (setupUserSettings) => {
    auth.setAuthToken('1234567');
    /* istanbul ignore next */
    if (setupUserSettings) {
      userSettings.guild = "Renascentia";
      userSettings.isManager = false;
      userSettings.fetched = true;
      userSettings.charId = "2";
    }
  }
}


// var dummyAPIServer = require('./../dummyApi/index');

// describe('dummy server is up', (next) => {

//   it("should have server up", () => {
//     return dummyAPIServer;
//   }).timeout(5000)

// })

