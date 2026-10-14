describe('CT01 - Listagem de usuários', () => {
  it('exibe nome, idade e e-mail de cada usuário cadastrado', () => {
    cy.seedUser({ name: 'Ana Souza', age: 28, email: 'ana@teste.com' });
    cy.seedUser({ name: 'Bruno Lima', age: 35, email: 'bruno@teste.com' });

    cy.visit('/');

    cy.get('[data-cy="user-card"]').should('have.length', 2);
    cy.get('[data-cy="empty-message"]').should('not.exist');

    cy.get('[data-cy="user-card"]').eq(0).within(() => {
      cy.get('[data-cy="user-name"]').should('have.text', 'Ana Souza');
      cy.get('[data-cy="user-age"]').should('have.text', '28');
      cy.get('[data-cy="user-email"]').should('have.text', 'ana@teste.com');
    });

    cy.get('[data-cy="user-card"]').eq(1).within(() => {
      cy.get('[data-cy="user-name"]').should('have.text', 'Bruno Lima');
      cy.get('[data-cy="user-age"]').should('have.text', '35');
      cy.get('[data-cy="user-email"]').should('have.text', 'bruno@teste.com');
    });
  });
});
