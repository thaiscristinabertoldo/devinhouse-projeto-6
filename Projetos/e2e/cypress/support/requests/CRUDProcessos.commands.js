const processo = require('../../fixtures/Processos.json')

Cypress.Commands.add('processos', () => {
    cy.request({
        method: 'GET',
        url: '/processos',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`,
        }
    }).then(response => {
        return cy.wrap(response.body)
    }).as('processos')
})

Cypress.Commands.add('processos_id', () => {
    cy.request({
        method: 'GET',
        url: `/processos/${Cypress.env('id_processo_criado')}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`,
        }
    }).then(response => {
        expect(response.status).to.be.eq(200)
    }).then(response => {
        return cy.wrap(response.body)
    }).as('processos_id')
})

Cypress.Commands.add('criar_processo', () => {
    cy.request({
        method: 'POST',
        url: `/processos`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`,
        },
        body: {
            "sgOrgaoSetor": processo.sgOrgaoSetor,
            "nuAno": processo.nuAno,
            "descricao": processo.descricao,
            "cdAssuntoId": Cypress.env('id_assunto_criado'),
            "cdInteressadoId": Cypress.env('id_Interessado_criado')
        }
    }).then(response => {
        expect(response.status).to.be.eq(201)
    }).then(response => {
        Cypress.env("id_processo_criado", response.body.id)
        return cy.wrap(response.body)
    }).as('criar_processo')
})

Cypress.Commands.add('update_processo', () => {
    cy.request({
        method: 'PUT',
        url: `/processos/${Cypress.env('id_processo_criado')}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`,
        },
        body: {
            "descricao": processo.descricao_update_processo
        }
    }).then(response => {
        expect(response.status).to.be.eq(204)
    }).then(response => {
        return cy.wrap(response)
    }).as('update_processo')
})

Cypress.Commands.add('delete_processo', () => {
    cy.request({
        method: 'DELETE',
        url: `/processos/${Cypress.env('id_processo_criado')}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cypress.env('token')}`,
        }
    }).then(response => {
        expect(response.status).to.be.eq(204)
    }).then(response => {
        return cy.wrap(response)
    }).as('delete_processo')
})