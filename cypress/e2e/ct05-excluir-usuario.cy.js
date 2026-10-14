describe('CT05 - Exclusão de usuário', () => {
  it('pede confirmação, remove apenas o usuário escolhido e mantém os demais', () => {
    cy.seedUser({ name: 'Fabio Reis', age: 25, email: 'fabio@teste.com' });
    cy.seedUser({ name: 'Gabriela Nunes', age: 31, email: 'gabriela@teste.com' });

    cy.visit('/');
    cy.get('[data-cy="user-card"]').should('have.length', 2);

    // Confirma a mensagem do diálogo e aceita a exclusão.
    cy.on('window:confirm', (message) => {
      expect(message).to.equal('Are you sure you want to delete this user?');
      return true;
    });

    cy.get('[data-cy="user-card"]').eq(0).find('[data-cy="btn-delete"]').click();

    cy.get('[data-cy="user-card"]').should('have.length', 1);
    cy.get('[data-cy="user-name"]').should('have.text', 'Gabriela Nunes');

    // A API também removeu somente o usuário excluído.
    cy.getUsersFromApi().should('have.length', 1)
      .its(0).should('have.property', 'name', 'Gabriela Nunes');
  });
});
