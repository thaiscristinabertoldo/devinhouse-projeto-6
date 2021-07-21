import { crudAssuntosPages } from '../pages/CRUDAssuntos.pages';


When(/^busco por todos os assuntos$/, () => {
    crudAssuntosPages.buscoTodosAssuntos()
})

When(/^crio um novo assunto$/, () => {
    crudAssuntosPages.crioNovoAssunto()
})

When(/^busco pelo Assunto criado$/, () => {
    crudAssuntosPages.buscoAssuntoCriado()
})

When(/^atualizo o assunto criado$/, () => {
    crudAssuntosPages.atualizoAssuntoCriado()
})

When(/^deleto o Assunto criado$/, () => {
    crudAssuntosPages.deleteoAssuntoCriado()
})

Then(/^todos os assuntos devem ser retornados$/, () => {
    crudAssuntosPages.validoRetornoAssuntos()
})

Then(/^não deve retornar erro na requisição de novo Assunto$/, () => {
    crudAssuntosPages.validoRetornoAssuntoCriado()
})

Then(/^deve retornar o assunto criado de novo Assunto$/, () => {
    crudAssuntosPages.validoRetornoBuscaAssuntoID()
})

Then(/^deve retornar o Assunto com os dados atualizados de novo Assunto$/, () => {
    crudAssuntosPages.validoUpdateAssuntoCriado()
})

Then(/^deve ser salvo a requisição no banco de novo Assunto$/, () => {
    crudAssuntosPages.validoDeleteAssuntoCriado()
})

And(/^busco por um Assunto ativo$/, () => {
    crudAssuntosPages.buscoPorAssuntoAtivo()
})