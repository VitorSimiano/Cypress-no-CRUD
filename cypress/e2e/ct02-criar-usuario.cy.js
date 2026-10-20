import usuarios from '../fixtures/usuarios.json';
import usersPage from '../support/pages/UsersPage';

describe('CT02 - Cadastro de usuário', () => {
  it('cadastra um usuário válido e o exibe na listagem', () => {
    const { carla } = usuarios;

    usersPage.visitar();
    usersPage.mensagemVazia().should('exist');

    cy.cadastrarUsuario(carla);

    usersPage.cards().should('have.length', 1);
    cy.verificarCard(0, carla);

    // Após o sucesso, o formulário é limpo e a mensagem de lista vazia some.
    usersPage.campoNome().should('have.value', '');
    usersPage.mensagemVazia().should('not.exist');

    // O dado foi realmente persistido pela API.
    cy.getUsersFromApi().should('have.length', 1)
      .its(0).should('include', carla);
  });
});
