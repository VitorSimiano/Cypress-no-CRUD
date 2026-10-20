import usuarios from '../fixtures/usuarios.json';
import usersPage from '../support/pages/UsersPage';

describe('CT01 - Listagem de usuários', () => {
  it('exibe nome, idade e e-mail de cada usuário cadastrado', () => {
    const { ana, bruno } = usuarios;

    cy.abrirComUsuarios([ana, bruno]);

    usersPage.cards().should('have.length', 2);
    usersPage.mensagemVazia().should('not.exist');

    cy.verificarCard(0, ana);
    cy.verificarCard(1, bruno);
  });
});
