Feature: CRUD Assunto

    Background: Gerar Token
        Given o token foi gerado

    Scenario: Buscar Assuntos cadastrados na base
        When busco por todos os assuntos
        Then todos os assuntos devem ser retornados

    Scenario: Criar novo Assunto
        When crio um novo assunto
        Then não deve retornar erro na requisição

    Scenario: Buscar Assunto criado
        When busco pelo Assunto criado
        Then deve retornar o assunto criado

    Scenario: Atualizar Assunto criado
        When atualizo o assunto criado
        Then deve retornar o Assunto com os dados atualizados

    Scenario: Deletar Assunto criado
        When deleto o Assunto criado
        Then deve ser salvo a requisição no banco
