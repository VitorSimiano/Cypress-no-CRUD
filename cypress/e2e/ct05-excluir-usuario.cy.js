import usuarios from '../fixtures/usuarios.json';
import mensagens from '../fixtures/mensagens.json';
import usersPage from '../support/pages/UsersPage';

describe('CT05 - Exclusão de usuário', () => {
  it('pede confirmação, remove apenas o usuário escolhido e mantém os demais', () => {
    const { fabio, gabriela } = usuarios;

    cy.abrirComUsuarios([fabio, gabriela]);
    usersPage.cards().should('have.length', 2);

    // Aceita o diálogo e guarda a chamada, para conferir a mensagem depois.
    const confirmar = cy.stub().returns(true).as('confirmar');
    cy.on('window:confirm', confirmar);

    usersPage.excluir(0);

    // Se o diálogo não abrir, estas linhas falham (antes o teste passava calado).
    cy.get('@confirmar').should('have.been.calledOnce');
    cy.get('@confirmar').should('have.been.calledWith', mensagens.confirmacaoExclusao);

    usersPage.cards().should('have.length', 1);
    cy.verificarCard(0, gabriela);

    // A API também removeu somente o usuário excluído.
    cy.getUsersFromApi().should('have.length', 1)
      .its(0).should('have.property', 'name', gabriela.name);
  });
});
