const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 4000,
  chromeWebSecurity: false,
  viewportWidth: 1000,
  viewportHeight: 600,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochareports',
    overwrite: false,
    html: false,
    json: true
  },
  e2e: {
    baseUrl: 'https://reqres.in/',
    setupNodeEvents(on, config) {
    },
    specPattern: 'cypress/integration/**/*.{js,jsx,ts,tsx}',
  },
});
