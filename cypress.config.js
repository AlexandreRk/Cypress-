const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

module.exports = {
  e2e: {
    baseUrl: 'http://localhost:3000/', 
    env: {
      apiUrl: 'http://localhost:3333'
    },
    viewportwidth: 1920, 
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
      // implement node event listeners here
    },
  },
};
