// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    timeout: 30000,
    use: {
        headless: false,
        browserName: 'chromium',
    },
    reporter: 'html',
});
