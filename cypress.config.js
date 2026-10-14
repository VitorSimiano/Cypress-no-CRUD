const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // Vídeos e prints da execução (npx cypress run) vão direto para a pasta de evidências.
  video: true,
  videosFolder: 'evidencias/videos',
  screenshotsFolder: 'evidencias/screenshots',

  e2e: {
    // Frontend (Vite dev server, porta definida em crud-frontend-axios/vite.config.js).
    baseUrl: 'http://localhost:8080',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});