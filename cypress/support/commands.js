// Comandos de apoio: falam direto com a API para preparar o estado dos testes.
// Os seletores da interface continuam sendo exclusivamente data-cy nos specs.

const API_URL = 'http://localhost:8000/api/users';

Cypress.Commands.add('resetUsers', () => {
  cy.request('GET', API_URL).then(({ body }) => {
    body.users.forEach((user) => {
      cy.request('DELETE', `${API_URL}?id=${user.id}`);
    });
  });
});

Cypress.Commands.add('seedUser', (user) => {
  return cy.request('POST', API_URL, user).its('body');
});

Cypress.Commands.add('getUsersFromApi', () => {
  return cy.request('GET', API_URL).its('body.users');
});