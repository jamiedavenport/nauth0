describe('Login', () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  it('sets the state cookie', () => {
    cy.request('api/auth/login');
    cy.getCookie('nauth0:state').should('exist');
  });
});
