describe('Cypress', () => {
  it("Loga na aplicação", () => {
    cy.visit('/');
    cy.find('button').click();
  });
})