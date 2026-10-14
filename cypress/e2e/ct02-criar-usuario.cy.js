describe('CT02 - Cadastro de usuário', () => {
  it('cadastra um usuário válido e o exibe na listagem', () => {
    cy.visit('/');
    cy.get('[data-cy="empty-message"]').should('exist');

    cy.get('[data-cy="input-name"]').type('Carla Mendes');
    cy.get('[data-cy="input-age"]').type('42');
    cy.get('[data-cy="input-email"]').type('carla@teste.com');
    cy.get('[data-cy="btn-submit"]').click();

    cy.get('[data-cy="user-card"]').should('have.length', 1).within(() => {
      cy.get('[data-cy="user-name"]').should('have.text', 'Carla Mendes');
      cy.get('[data-cy="user-age"]').should('have.text', '42');
      cy.get('[data-cy="user-email"]').should('have.text', 'carla@teste.com');
    });

    // Após o sucesso, o formulário é limpo e a mensagem de lista vazia some.
    cy.get('[data-cy="input-name"]').should('have.value', '');
    cy.get('[data-cy="empty-message"]').should('not.exist');

    // O dado foi realmente persistido pela API.
    cy.getUsersFromApi().should('have.length', 1)
      .its(0).should('include', { name: 'Carla Mendes', age: 42, email: 'carla@teste.com' });
  });
});
