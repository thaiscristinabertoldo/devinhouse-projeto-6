# DEVinHouse Projeto 06

Repositório para realização do projeto 6 do DEVinHouse

### Descrição

Você está participando de um processo seletivo para ingressar numa vaga de programador em uma grande empresa de TI. Uma das etapas consiste na implementação de autenticação e Logging em uma API RESTFULL, além do desenvolvimento de um projeto Front-end para consumir os dados da API.
Na parte de back-end os endpoints para consumo já foram desenvolvidos no “Projeto final módulo 2 - Backend”, então usando esta API deverão ser adicionados às novas funcionalidades solicitadas.
Para o front-end será necessário criar um novo projeto para realizar as implementações solicitadas.

### Funcionalidades

- [Back-end] Deverá ser implementado autenticação na API utilizando o keycloak, pode ser usado o servidor disponível em: https://training.dev.delivery/auth
- [Back-end] Deverá ser implementado Logging com pelo menos 2 níveis de Log
- [Front-end] Deverá ser criado formulário de login com validação de campos e que deve ser exibida caso o usuário não esteja autenticado
- [Front-end] Deverá ser criado componente de layout com AppBar contendo menu e exibir as informações de usuários com ação de sair (deslogar)
- [Front-end] Deverá ser adicionado opção para o usuário escolher entre dark e light theme, mantendo o tema selecionado mesmo que o usuário atualize a página
- [Front-end] Deverá ser criado página para listar os processos obtidos pelo endpoint de listagem da API
  - Deverá ser exibido em formato de card
  - Deverá apresentar Skeleton enquanto está sendo feito o fetch na API
  - Deverá ter opção de editar o processo
  - Deverá ter opção de excluir o processo
  - Deverá ter opção para adição de um novo processo
- [Front-end] Deverá ser criado página para criação de um novo processo contendo formulário com validação de campos, ela deve ser aberta pela ação de adicionar da página de listagem
- [Front-end] Deverá ser criado página para edição de um processo podendo ser utilizado o mesmo formulário usada na criação de processos, ela deve ser aberta pela ação do card
- [Front-end] Deverá ser adicionado ação na opção de excluir processo pelo card
- [Front-end] Deverá ser adicionado filtro de busca número do processo ou assunto (deve ter as duas possibilidades, porém o usuário escolhe uma ou outra)
- [Front-end] Deverá ser adicionado testes unitários com no mínimo de 50% de cobertura de código
- [Front-end] Deverá ser crido projeto de e2e com cypress e possuir a implementação de pelo menos um teste de ponta a ponta

### Requisitos

- Utilizar Keycloak para implementação da autenticação
- O projeto de front deve ser criado projeto utilizando React com CRA template
- Utilizar Material-UI para estilização dos componentes
- Utilizar Formik para criação dos formulários
- Utilizar Yup para validação dos formulários
- Utilizar React Testing Library para realizar os testes unitários do Front-end
- Utilizar Cypress para o desenvolvimento dos testes de e2e
- Utilizar React Router DOM para navegação entre as páginas
- Se for necessário algum gerenciamento de estado global utilize a Contex API

### Considerações

O Layout é livre, porém deve atender aos recursos solicitados. A página com a lista de processos, formulários... só deve ser acessível a usuários autenticados, em casos onde o usuário não esteja autenticado deve ser redirecionado para o login.

### Instruções para a avaliação

- Assim que o grupo concluir o seu desafio, encaminhe o link dos repositórios no AVA
- Todos deverão participar da apresentação do projeto que tem tempo máximo de 15 minutos
- Realize a apresentação de acordo com os requisitos solicitados neste projeto
