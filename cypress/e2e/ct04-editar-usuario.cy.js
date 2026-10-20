import usuarios from '../fixtures/usuarios.json';
import mensagens from '../fixtures/mensagens.json';
import usersPage from '../support/pages/UsersPage';

describe('CT04 - Edição de usuário', () => {
  it('carrega os dados no formulário, atualiza o nome e mantém os demais campos', () => {
    const { eva, evaEditada } = usuarios;

    cy.abrirComUsuarios([eva]);
    usersPage.editar(0);

    // Modo de edição: título, botão e campos preenchidos com os dados atuais.
    usersPage.tituloFormulario().should('have.text', mensagens.tituloEdicao);
    usersPage.botaoEnviar().should('have.text', mensagens.botaoAtualizar);
    usersPage.botaoCancelar().should('be.visible');
    usersPage.campoNome().should('have.value', eva.name);
    usersPage.campoIdade().should('have.value', String(eva.age));
    usersPage.campoEmail().should('have.value', eva.email);

    usersPage.campoNome().clear().type(evaEditada.name);
    usersPage.enviar();

    // Espera o card ser recriado com o novo nome (a consulta é refeita até passar).
    cy.verificarCard(0, evaEditada);
    usersPage.cards().should('have.length', 1);

    // Formulário de volta ao modo de cadastro.
    usersPage.tituloFormulario().should('have.text', mensagens.tituloCadastro);

    // A API também guardou a alteração.
    cy.getUsersFromApi().its(0).should('include', evaEditada);
  });
});
