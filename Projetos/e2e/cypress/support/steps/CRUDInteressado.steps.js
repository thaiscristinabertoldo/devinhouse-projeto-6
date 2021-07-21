import { crudInteressadosPages } from '../pages/CRUDInteressado.pages';


When(/^busco por todos os Interessados$/, () => {
    crudInteressadosPages.buscoTodosInteressados()
})

When(/^crio um novo Interessado$/, () => {
    crudInteressadosPages.crioNovoInteressado()
})

When(/^busco pelo Interessado criado$/, () => {
    crudInteressadosPages.buscoInteressadoCriado()
})

When(/^atualizo o Interessado criado$/, () => {
    crudInteressadosPages.atualizoInteressadoCriado()
})

When(/^deleto o Interessado criado$/, () => {
    crudInteressadosPages.deleteoInteressadoCriado()
})

Then(/^todos os Interessados devem ser retornados$/, () => {
    crudInteressadosPages.validoRetornoInteressados()
})

Then(/^não deve retornar erro na criação de novo Interessado$/, () => {
    crudInteressadosPages.validoRetornoInteressadoCriado()
})

Then(/^deve retornar o Interessado criado$/, () => {
    crudInteressadosPages.validoRetornoBuscaInteressadoID()
})

Then(/^deve retornar o Interessado com os dados atualizados do novo Interessado$/, () => {
    crudInteressadosPages.validoUpdateInteressadoCriado()
})

Then(/^deve ser salvo a requisição no banco do novo Interessado$/, () => {
    crudInteressadosPages.validoDeleteInteressadoCriado()
})

And(/^busco por um Interessado ativo$/, () => {
    crudInteressadosPages.buscoPorInteressadoAtivo()
})