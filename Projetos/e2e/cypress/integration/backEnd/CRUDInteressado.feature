Feature: CRUD Interessado

    Background: Gerar Token
        Given o token foi gerado

    Scenario: Buscar Interessados cadastrados na base
        When busco por todos os Interessados
        Then todos os Interessados devem ser retornados

    Scenario: Criar novo Interessado
            And gero um novo CPF
        When crio um novo Interessado
        Then não deve retornar erro na criação de novo Interessado

    Scenario: Atualizar Interessado criado
        When atualizo o Interessado criado
        Then deve retornar o Interessado com os dados atualizados do novo Interessado

    Scenario: Deletar Interessado criado
        When deleto o Interessado criado
        Then deve ser salvo a requisição no banco do novo Interessado
