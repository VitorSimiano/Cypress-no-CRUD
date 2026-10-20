import usuarios from '../fixtures/usuarios.json';
import mensagens from '../fixtures/mensagens.json';
import usersPage from '../support/pages/UsersPage';

describe('CT03 - Validação do cadastro (idade fora do intervalo)', () => {
  it('rejeita idade maior que 150, mostra o erro da API e não cria o usuário', () => {
    const { diegoIdadeInvalida } = usuarios;

    usersPage.visitar();
    cy.cadastrarUsuario(diegoIdadeInvalida);

    usersPage.verificarErro(mensagens.erroIdade);

    // Nenhum card foi criado e os dados digitados continuam no formulário.
    usersPage.cards().should('not.exist');
    usersPage.campoNome().should('have.value', diegoIdadeInvalida.name);

    // A API também não gravou nada.
    cy.getUsersFromApi().should('have.length', 0);
  });
});
