describe('CT03 - Validação do cadastro (idade fora do intervalo)', () => {
  it('rejeita idade maior que 150, mostra o erro da API e não cria o usuário', () => {
    cy.visit('/');

    cy.get('[data-cy="input-name"]').type('Diego Alves');
    cy.get('[data-cy="input-age"]').type('200');
    cy.get('[data-cy="input-email"]').type('diego@teste.com');
    cy.get('[data-cy="btn-submit"]').click();

    cy.get('[data-cy="form-error"]')
      .should('not.have.class', 'd-none')
      .and('have.text', 'Age must be between 1 and 150');

    // Nenhum card foi criado e os dados digitados continuam no formulário.
    cy.get('[data-cy="user-card"]').should('not.exist');
    cy.get('[data-cy="input-name"]').should('have.value', 'Diego Alves');

    // A API também não gravou nada.
    cy.getUsersFromApi().should('have.length', 0);
  });
});
