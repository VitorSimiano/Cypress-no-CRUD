describe('CT04 - Edição de usuário', () => {
  it('carrega os dados no formulário, atualiza o nome e mantém os demais campos', () => {
    cy.seedUser({ name: 'Eva Costa', age: 30, email: 'eva@teste.com' });

    cy.visit('/');
    cy.get('[data-cy="btn-edit"]').click();

    // Modo de edição: título, botão e campos preenchidos com os dados atuais.
    cy.get('[data-cy="form-title"]').should('have.text', 'Edit User');
    cy.get('[data-cy="btn-submit"]').should('have.text', 'Update');
    cy.get('[data-cy="btn-cancel"]').should('be.visible');
    cy.get('[data-cy="input-name"]').should('have.value', 'Eva Costa');
    cy.get('[data-cy="input-age"]').should('have.value', '30');
    cy.get('[data-cy="input-email"]').should('have.value', 'eva@teste.com');

    cy.get('[data-cy="input-name"]').clear().type('Eva Costa Silva');
    cy.get('[data-cy="btn-submit"]').click();

    // Espera o card ser recriado com o novo nome antes de conferir o restante.
    cy.get('[data-cy="user-name"]').should('have.text', 'Eva Costa Silva');
    cy.get('[data-cy="user-card"]').should('have.length', 1);
    cy.get('[data-cy="user-age"]').should('have.text', '30');
    cy.get('[data-cy="user-email"]').should('have.text', 'eva@teste.com');

    // Formulário de volta ao modo de cadastro.
    cy.get('[data-cy="form-title"]').should('have.text', 'Create User');

    // A API também guardou a alteração.
    cy.getUsersFromApi().its(0).should('include', { name: 'Eva Costa Silva', age: 30 });
  });
});