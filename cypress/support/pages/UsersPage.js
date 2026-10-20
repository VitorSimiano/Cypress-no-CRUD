// Page Object da tela de usuarios (o sistema tem uma unica tela: lista + formulario).
// Todos os seletores data-cy da suite ficam concentrados neste arquivo.

const seletores = {
  mensagemVazia: '[data-cy="empty-message"]',
  card: '[data-cy="user-card"]',
  nomeDoCard: '[data-cy="user-name"]',
  idadeDoCard: '[data-cy="user-age"]',
  emailDoCard: '[data-cy="user-email"]',
  botaoEditar: '[data-cy="btn-edit"]',
  botaoExcluir: '[data-cy="btn-delete"]',
  tituloFormulario: '[data-cy="form-title"]',
  erroFormulario: '[data-cy="form-error"]',
  campoNome: '[data-cy="input-name"]',
  campoIdade: '[data-cy="input-age"]',
  campoEmail: '[data-cy="input-email"]',
  botaoEnviar: '[data-cy="btn-submit"]',
  botaoCancelar: '[data-cy="btn-cancel"]',
};

class UsersPage {
  visitar() {
    cy.visit('/');
  }

  // --- Elementos da lista ---
  mensagemVazia() {
    return cy.get(seletores.mensagemVazia);
  }

  cards() {
    return cy.get(seletores.card);
  }

  card(indice) {
    return this.cards().eq(indice);
  }

  // Cada getter parte de cy.get(), entao a consulta e refeita se o card for recriado.
  nomeDoCard(indice) {
    return this.card(indice).find(seletores.nomeDoCard);
  }

  idadeDoCard(indice) {
    return this.card(indice).find(seletores.idadeDoCard);
  }

  emailDoCard(indice) {
    return this.card(indice).find(seletores.emailDoCard);
  }

  // --- Elementos do formulario ---
  tituloFormulario() {
    return cy.get(seletores.tituloFormulario);
  }

  erroFormulario() {
    return cy.get(seletores.erroFormulario);
  }

  campoNome() {
    return cy.get(seletores.campoNome);
  }

  campoIdade() {
    return cy.get(seletores.campoIdade);
  }

  campoEmail() {
    return cy.get(seletores.campoEmail);
  }

  botaoEnviar() {
    return cy.get(seletores.botaoEnviar);
  }

  botaoCancelar() {
    return cy.get(seletores.botaoCancelar);
  }

  // --- Acoes ---
  preencherFormulario({ name, age, email }) {
    this.campoNome().clear().type(name);
    this.campoIdade().clear().type(String(age));
    this.campoEmail().clear().type(email);
  }

  enviar() {
    this.botaoEnviar().click();
  }

  editar(indice) {
    this.card(indice).find(seletores.botaoEditar).click();
  }

  excluir(indice) {
    this.card(indice).find(seletores.botaoExcluir).click();
  }

  // --- Verificacao do alerta de erro do formulario ---
  verificarErro(mensagem) {
    this.erroFormulario()
      .should('not.have.class', 'd-none')
      .and('have.text', mensagem);
  }
}

export default new UsersPage();
