/// <reference types="Cypress" />
const criar_Processo_schema = require('../schema/criar_processo.schema.json')

var todosProcessos = ""
var novoProcessos = ""
var buscaProcessosCriado = ""
var updateProcessosCriado = ""
var deleteProcessosCriado = ""

class CRUDProcessos {

    buscoTodosProcessos() {
        cy.processos().then(response => {
            todosProcessos = response
        })
    }

    crioNovoProcesso() {
        cy.criar_processo().then(response => {
            novoProcessos = response
        })
    }

    buscoProcessoCriado() {
        cy.processos_id().then(response => {
            buscaProcessosCriado = response
        })
    }

    atualizoProcessoCriado() {
        cy.update_processo().then(response => {
            updateProcessosCriado = response
        })
    }

    deleteoProcessoCriado() {
        cy.delete_processo().then(response => {
            deleteProcessosCriado = response
        })
    }

    validoRetornoProcessos() {
        expect(todosProcessos).to.be.a('array');
        expect(todosProcessos).to.have.lengthOf.above(1)
    }

    validoRetornoProcessoCriado() {
        cy.schema_validator(criar_Processo_schema, novoProcessos)
    }

    validoUpdateProcessoCriado() {
        expect(updateProcessosCriado.status).to.be.eq(204)
    }

    validoDeleteProcessoCriado() {
        expect(deleteProcessosCriado.status).to.be.eq(204)
    }
}

export const crudProcessosPage = new CRUDProcessos();