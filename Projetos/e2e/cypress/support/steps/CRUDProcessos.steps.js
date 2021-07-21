import { crudProcessosPage } from '../pages/CRUDProcessos.pages';

When(/^busco por todos os processos$/, () => {
    crudProcessosPage.buscoTodosProcessos()
})

When(/^crio um novo Processo$/, () => {
    crudProcessosPage.crioNovoProcesso()
})

When(/^busco pelo Processo criado$/, () => {
    crudProcessosPage.buscoProcessoCriado()
})

When(/^atualizo o Processo criado$/, () => {
    crudProcessosPage.atualizoProcessoCriado()
})

When(/^deleto o Processo criado$/, () => {
    crudProcessosPage.deleteoProcessoCriado()
})

Then(/^todos os processos devem ser retornados$/, () => {
    crudProcessosPage.validoRetornoProcessos()
})

Then(/^não deve retornar erro na requisição de novo Processo$/, () => {
    crudProcessosPage.validoRetornoProcessoCriado()
})

Then(/^deve retornar o Processo criado de novo Processo$/, () => {
    crudProcessosPage.validoRetornoProcessoCriado()
})

Then(/^deve ser salvo a requisição no banco de novo Processo$/, () => {
    crudProcessosPage.validoDeleteProcessoCriado()
})

Then(/^deve retornar o Processo com os dados atualizados de novo Processo$/, () => {
    crudProcessosPage.validoUpdateProcessoCriado()
})