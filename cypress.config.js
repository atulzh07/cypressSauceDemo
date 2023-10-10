const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
    },
    chromeWebSecurity: false,
    env:{
      "PASSWORD": "PASSWORD",
      "baseUrl": "https://www.saucedemo.com/"
    },
    specPattern: 'cypress/e2e/*.js',
    watchForFileChanges: false,
    chromeWebSecurity: false,
    watchForFileChanges: false
  },
  browsers: [
    {
      name: 'firefox',
      family: 'firefox',
      channel: 'stable',
      displayName: 'Firefox',
      version: '100.0',
      path: '/Applications/Firefox.app/Contents/MacOS/firefox',
      minSupportedVersion: 86,
      majorVersion: '100',
    },
    {
      name: 'electron',
      channel: 'stable',
      family: 'chromium',
      displayName: 'Electron',
      version: '114.0.5735.289',
      path: '',
      majorVersion: 114,
    },
    {
      name: "chrome",
      channel: "stable",
      family: "chromium",
      displayName: 'chrome',
      version: '116.0.5845.96',
      path: '/Applications/Chrome.app/Contents/MacOS/Google Chrome',
      majorVersion: 116
    }
    ],
});