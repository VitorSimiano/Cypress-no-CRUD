const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // Vídeos e prints da execução (npx cypress run) vão direto para a pasta de evidências.
  video: true,
  videosFolder: 'evidencias/videos',
  screenshotsFolder: 'evidencias/screenshots',

  // URL da API usada pelos comandos de apoio (lida com Cypress.expose('apiUrl')).
  // Para outro ambiente: npx cypress run --expose apiUrl=http://host:porta/api/users
  expose: {
    apiUrl: 'http://localhost:8000/api/users',
  },

  e2e: {
    // Frontend (Vite dev server, porta definida em crud-frontend-axios/vite.config.js).
    baseUrl: 'http://localhost:8080',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});