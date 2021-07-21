const token = require('../fixtures/token.json')
import { generate } from 'gerador-validador-cpf'


Cypress.Commands.add('schema_validator', (schema, response) => {
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
        return cy.wrap(response.body.access_token)
    }).then(token => {
        Cypress.env('token', token)
    }).as('token')
})

Cypress.Commands.add('gerar_cpf', () => {
    var cpf = generate({ format: true }) // Gera um CPF no formato 000.000.000-00
    Cypress.env('CPF', cpf)
})