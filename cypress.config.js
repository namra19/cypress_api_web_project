const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://reqres.in/',
    setupNodeEvents(on, config) {
    },
    specPattern: 'cypress/integration/**/*.{js,jsx,ts,tsx}',
  },
})
