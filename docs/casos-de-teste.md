# Casos de teste automatizados — CRUD de Usuários

**Ferramenta:** Cypress 16.1.1 (E2E), Electron 146 headless · **API:** `http://localhost:8000/api/users` · **Frontend:** `http://localhost:8080` (local) ou `http://localhost:5500` (Docker)

## Escopo e critério de escolha

O sistema não possui autenticação nem outros módulos além do cadastro de usuários, e não havia um roteiro manual do 1º bimestre para este projeto. Por isso os 5 casos foram criados novos, cobrindo áreas diferentes do sistema: leitura, cadastro, validação, edição e exclusão. Todos os seletores usam apenas `data-cy`, e cada teste tem pelo menos duas asserções significativas (conteúdo da tela e, na maioria, o dado gravado na API).

**Pré-condição comum:** antes de cada teste, a base de usuários é esvaziada via API (`cy.resetUsers()`). Os dados necessários a cada caso são criados via API (`cy.seedUser()`).

## Resultado da execução (`npx cypress run`)

Todos os 5 testes passaram na execução headless, em 10 segundos no total. Os vídeos estão em `evidencias/videos`.

| ID | Área | Objetivo | Arquivo | Resultado |
|----|------|----------|---------|-----------|
| CT01 | Listagem (Read) | Exibir os usuários cadastrados | `ct01-listar-usuarios.cy.js` | Passou |
| CT02 | Cadastro (Create) | Cadastrar usuário válido | `ct02-criar-usuario.cy.js` | Passou |
| CT03 | Validação | Rejeitar idade fora do intervalo | `ct03-validacao-idade.cy.js` | Passou |
| CT04 | Edição (Update) | Alterar o nome de um usuário | `ct04-editar-usuario.cy.js` | Passou |
| CT05 | Exclusão (Delete) | Excluir um usuário com confirmação | `ct05-excluir-usuario.cy.js` | Passou |

## CT01 — Listar usuários cadastrados

- **Pré-condição:** existem 2 usuários: Ana Souza (28, ana@teste.com) e Bruno Lima (35, bruno@teste.com).
- **Passos:** 1) acessar `/`.
- **Resultado esperado:** a lista mostra 2 cards, na ordem de cadastro, cada um com nome, idade e e-mail corretos; a mensagem de lista vazia não aparece.
- **Asserções:** quantidade de cards = 2; ausência de `empty-message`; nome, idade e e-mail de cada card.

## CT02 — Cadastrar usuário válido

- **Pré-condição:** nenhum usuário cadastrado.
- **Passos:** 1) acessar `/`; 2) preencher nome "Carla Mendes", idade "42" e e-mail "carla@teste.com"; 3) clicar em Create.
- **Resultado esperado:** um card com os dados informados aparece, o formulário é limpo, a mensagem de lista vazia some e a API passa a ter o usuário.
- **Asserções:** 1 card com nome, idade e e-mail corretos; campo nome vazio; `empty-message` inexistente; usuário presente na resposta da API.

## CT03 — Validação: idade fora do intervalo

- **Pré-condição:** nenhum usuário cadastrado.
- **Passos:** 1) acessar `/`; 2) preencher nome "Diego Alves", idade "200" e e-mail "diego@teste.com"; 3) clicar em Create.
- **Resultado esperado:** o alerta de erro é exibido com a mensagem "Age must be between 1 and 150"; nenhum usuário é criado; os dados digitados continuam no formulário.
- **Asserções:** `form-error` visível com a mensagem exata; nenhum card; campo nome mantido; API sem usuários.

## CT04 — Editar usuário

- **Pré-condição:** existe o usuário Eva Costa (30, eva@teste.com).
- **Passos:** 1) acessar `/`; 2) clicar em Edit; 3) trocar o nome para "Eva Costa Silva"; 4) clicar em Update.
- **Resultado esperado:** ao clicar em Edit o formulário entra em modo de edição com os dados atuais; após Update o card mostra o novo nome, idade e e-mail permanecem e o formulário volta ao modo de cadastro.
- **Asserções:** título "Edit User", botão "Update", botão Cancel visível e campos preenchidos; card com novo nome e demais campos inalterados; título "Create User"; nome atualizado na API.

## CT05 — Excluir usuário

- **Pré-condição:** existem 2 usuários: Fabio Reis e Gabriela Nunes.
- **Passos:** 1) acessar `/`; 2) clicar em Delete no primeiro card; 3) aceitar a confirmação.
- **Resultado esperado:** o sistema pergunta "Are you sure you want to delete this user?"; após confirmar, somente Fabio Reis é removido.
- **Asserções:** texto do diálogo de confirmação; 1 card restante; nome restante = Gabriela Nunes; API com 1 usuário (Gabriela Nunes).

## Como executar

Veja o `README.md` na raiz (`npx cypress open` e `npx cypress run`).