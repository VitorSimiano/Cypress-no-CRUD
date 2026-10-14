import './commands';

// Cada teste começa com a base de usuários vazia, para não depender de execuções anteriores.
beforeEach(() => {
  cy.resetUsers();
});
