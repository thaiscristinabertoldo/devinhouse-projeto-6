const token = require('../fixtures/token.json')

Cypress.Commands.add('validar_contrato', (schema, response) => {
    const Ajv = require("ajv")
    const ajv = new Ajv({ allErrors: true, strict: false })

    const validate = ajv.compile(schema)
    validate(response)
    expect(validate.errors).to.be.a('null')
})

Cypress.Commands.add('token', () => {
    cy.request({
        method: 'POST',
        url: token.url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        body: {
            grant_type: token.grant_type,
            client_id: token.client_id,
            client_secret: token.client_secret,
            username: token.username,
            password: token.password
        }
    }).then(response => {
        Cypress.env('token', response.body.access_token)
    }).as('token')
})