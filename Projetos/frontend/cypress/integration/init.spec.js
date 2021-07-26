describe('Cypress', () => {
  it("Loga na aplicação", () => {
    
    cy.visit('/');
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.get('button').click();
    cy.get('#username').type("alberto");
    cy.get('#password').type("123");
    cy.get('#kc-login').click();

    cy.contains('Processos').should('exist');
  });
  it("Desloga na aplicação", () => {
    cy.get('header').find('button').eq(2).click();
    cy.get('ul').find('li').eq(1).click();

    cy.contains('Login').should('exist');
  });
})