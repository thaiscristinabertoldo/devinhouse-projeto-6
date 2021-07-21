/// <reference types="Cypress" />
const criar_Interessado_schema = require('../schema/criar_Interessado.schema.json')

var todosInteressados = ""
var novoInteressado = ""
var updateInteressadoCriado = ""
var deleteInteressadoCriado = ""

class CRUDInteressados {

    buscoTodosInteressados() {
        cy.interessado().then(response => {
            todosInteressados = response
            return cy.wrap(todosInteressados)
        })
    }

    crioNovoInteressado() {
        cy.criar_interessado().then(response => {
            novoInteressado = response
        })
    }


    atualizoInteressadoCriado() {
        cy.update_interessado().then(response => {
            updateInteressadoCriado = response
        })
    }

    deleteoInteressadoCriado() {
        cy.delete_interessado().then(response => {
            deleteInteressadoCriado = response
        })
    }

    validoRetornoInteressados() {
        expect(todosInteressados).to.be.a('array');
        expect(todosInteressados).to.have.lengthOf.above(1)
    }

    validoRetornoInteressadoCriado() {
        cy.schema_validator(criar_Interessado_schema, novoInteressado)
    }

    validoUpdateInteressadoCriado() {
        expect(updateInteressadoCriado.status).to.be.eq(204)
    }


    validoDeleteInteressadoCriado() {
        expect(updateInteressadoCriado.status).to.be.eq(204)
    }

}

export const crudInteressadosPages = new CRUDInteressados();