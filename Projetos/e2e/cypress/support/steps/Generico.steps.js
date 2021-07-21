Given(/^o token foi gerado$/, () => {
    cy.token()
})

And(/^gero um novo CPF$/, () => {
    cy.gerar_cpf()
})