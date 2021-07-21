Feature: CRUD Processos

    Background: Gerar Token
        Given o token foi gerado

    Scenario: Buscar Processos cadastrados na base
        When busco por todos os processos
        Then todos os processos devem ser retornados

    Scenario: Criar novo Processo
            And crio um novo assunto
            And gero um novo CPF
            And crio um novo Interessado
        When crio um novo Processo
        Then não deve retornar erro na requisição de novo Processo

    Scenario: Buscar Processo criado
        When busco pelo Processo criado
        Then deve retornar o Processo criado de novo Processo

    Scenario: Atualizar Processo criado
        When atualizo o Processo criado
        Then deve retornar o Processo com os dados atualizados de novo Processo

    Scenario: Deletar Processo criado
        When deleto o Processo criado
        Then deve ser salvo a requisição no banco de novo Processo
            And deleto o Assunto criado
            And deleto o Interessado criado
