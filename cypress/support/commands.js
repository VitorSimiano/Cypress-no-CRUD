// Comandos de apoio: falam direto com a API para preparar o estado dos testes.
// Os seletores da interface continuam sendo exclusivamente data-cy nos specs.

// A URL vem de cypress.config.js (env.apiUrl), nao fica fixa no codigo.
const apiUrl = () => Cypress.env('apiUrl');

Cypress.Commands.add('resetUsers', () => {
  cy.request('GET', apiUrl()).then(({ body }) => {
    body.users.forEach((user) => {
      cy.request('DELETE', `${apiUrl()}?id=${user.id}`);
    });
  });
});

Cypress.Commands.add('seedUser', (user) => {
  return cy.request('POST', apiUrl(), user).its('body');
});

Cypress.Commands.add('getUsersFromApi', () => {
  return cy.request('GET', apiUrl()).its('body.users');
});