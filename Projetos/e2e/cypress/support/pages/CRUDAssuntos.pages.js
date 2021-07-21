/// <reference types="Cypress" />
const criar_assunto_schema = require('../schema/criar_assunto.schema.json')

var todosAssuntos = ""
var novoAssunto = ""
var buscaAssuntoCriado = ""
var updateAssuntoCriado = ""
var deleteAssuntoCriado = ""
var flativo = 'n'

class CRUDAssuntos {

    buscoTodosAssuntos() {
        cy.assuntos().then(response => {
            todosAssuntos = response
            return cy.wrap(todosAssuntos)
        })
    }

    crioNovoAssunto() {
        cy.criar_assunto().then(response => {
            novoAssunto = response
        })
    }

    buscoAssuntoCriado() {
        cy.assuntos_id().then(response => {
            buscaAssuntoCriado = response
        })
    }

    atualizoAssuntoCriado() {
        cy.update_assunto().then(response => {
            updateAssuntoCriado = response
        })
    }

    deleteoAssuntoCriado() {
        cy.delete_assunto().then(response => {
            deleteAssuntoCriado = response
        })
    }

    validoRetornoAssuntos() {
        expect(todosAssuntos).to.be.a('array');
        expect(todosAssuntos).to.have.lengthOf.above(1)
    }

    validoRetornoAssuntoCriado() {
        cy.schema_validator(criar_assunto_schema, novoAssunto)
    }

    validoRetornoBuscaAssuntoID() {
        expect(buscaAssuntoCriado.id).to.be.eql(Cypress.env('id_assunto_criado'))
    }

    validoUpdateAssuntoCriado() {
        expect(updateAssuntoCriado.status).to.be.eq(204)
            // expect(updateAssuntoCriado.descricao).to.be.eql(nova_descricao.descricao_update_assunto)
    }


    validoDeleteAssuntoCriado() {
        expect(updateAssuntoCriado.status).to.be.eq(204)
            // expect(updateAssuntoCriado.descricao).to.be.eql(nova_descricao.descricao_update_assunto)
    }

}

export const crudAssuntosPages = new CRUDAssuntos();