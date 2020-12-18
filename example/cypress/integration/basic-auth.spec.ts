describe('Basic Auth', () => {
  it('Can login with Auth0', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Login').click();
  });
});
