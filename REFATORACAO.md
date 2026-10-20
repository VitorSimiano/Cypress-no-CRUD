# Refatoração da suíte Cypress (Atividade 2)

Diagnóstico dos smells da suíte da A1 (5 testes, `cypress/e2e/ct01` a `ct05` e `cypress/support`).

| # | Smell | Onde está | Por que é um problema |
|---|-------|-----------|-----------------------|
| 1 | Seletores `data-cy` repetidos | 47 ocorrências nos 5 specs | Se um `data-cy` mudar, é preciso editar vários arquivos |
| 2 | Dados dentro dos testes | nomes, idades e e-mails em todos os specs | Difícil reutilizar e trocar a massa de dados |
| 3 | Textos da interface escritos no teste | `ct03` (erro de idade), `ct04` (títulos e botão), `ct05` (confirmação) | Uma mudança de texto quebra o teste em vários pontos |
| 4 | URL da API fixa no código | `support/commands.js` | Não dá para apontar a suíte para outro ambiente sem editar código |
| 5 | Criar usuários e abrir a tela, repetido | `ct01`, `ct04`, `ct05` | Mesma sequência copiada em três testes |
| 6 | Preencher e enviar o formulário, repetido | `ct02`, `ct03` (e parte do `ct04`) | Mesma sequência copiada |
| 7 | Conferência do card repetida | `ct01` (2x), `ct02`, `ct04`, `ct05` | Mesma checagem de nome, idade e e-mail copiada |
| 8 | Asserção dentro de callback que pode nunca rodar | `ct05`, `cy.on('window:confirm')` | Se o diálogo não abrir, o teste passa sem checar a mensagem |
| 9 | Esperas fixas | nenhuma encontrada (`cy.wait` com número, `setTimeout`, `sleep`) | Não há o que remover, mas fica protegido por script |
