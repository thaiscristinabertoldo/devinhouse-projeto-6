const assunto = require('../../fixtures/Assuntos.json')

Cypress.Commands.add('assuntos', () => {
    cy.request({
        method: 'GET',
        url: '/assuntos',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`,
        }
    }).then(response => {
        return cy.wrap(response.body)
    }).as('assuntos')
})


Cypress.Commands.add('assuntos_id', () => {
    cy.request({
        method: 'GET',
        url: `/assuntos/${Cypress.env('id_assunto_criado')}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`,
        }
    }).then(response => {
        expect(response.status).to.be.eq(200)
    }).then(response => {
        return cy.wrap(response.body)
    }).as('assuntos_id')
})

Cypress.Commands.add('criar_assunto', () => {
    cy.request({
        method: 'POST',
        url: `/assuntos`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`,
        },
        body: {
            "descricao": assunto.descricao_novo_assunto
        }
    }).then(response => {
        expect(response.status).to.be.eq(201)
    }).then(response => {
        Cypress.env("id_assunto_criado", response.body.id)
        return cy.wrap(response.body)
    }).as('criar_assunto')
})

Cypress.Commands.add('update_assunto', () => {
    cy.request({
        method: 'PUT',
        url: `/assuntos/${Cypress.env('id_assunto_criado')}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`,
        },
        body: {
            "descricao": assunto.descricao_update_assunto
        }
    }).then(response => {
        expect(response.status).to.be.eq(204)
    }).then(response => {
        return cy.wrap(response)
    }).as('update_assunto')
})

Cypress.Commands.add('delete_assunto', () => {
    cy.request({
        method: 'DELETE',
        url: `/assuntos/${Cypress.env('id_assunto_criado')}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`,
        }
    }).then(response => {
        expect(response.status).to.be.eq(204)
    }).then(response => {
        return cy.wrap(response)
    }).as('delete_assunto')
})