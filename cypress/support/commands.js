// Comandos de apoio: falam direto com a API para preparar o estado dos testes.
// Os seletores da interface ficam somente em support/pages/UsersPage.js.

import usersPage from './pages/UsersPage';

// A URL vem de cypress.config.js (env.apiUrl), nao fica fixa no codigo.
const apiUrl = () => Cypress.expose('apiUrl');

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

// --- Passos reutilizaveis (antes copiados em varios specs) ---

// Passo 1: cria os usuarios pela API, na ordem recebida, e abre a tela. (CT01, CT04, CT05)
Cypress.Commands.add('abrirComUsuarios', (users) => {
  users.forEach((user) => cy.seedUser(user));
  usersPage.visitar();
});

// Passo 2: preenche o formulario e envia. (CT02, CT03)
Cypress.Commands.add('cadastrarUsuario', (user) => {
  usersPage.preencherFormulario(user);
  usersPage.enviar();
});

// Passo 3: confere nome, idade e e-mail do card na posicao informada. (CT01, CT02, CT04, CT05)
Cypress.Commands.add('verificarCard', (indice, user) => {
  usersPage.nomeDoCard(indice).should('have.text', user.name);
  usersPage.idadeDoCard(indice).should('have.text', String(user.age));
  usersPage.emailDoCard(indice).should('have.text', user.email);
});
