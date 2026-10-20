# Refatoração da suíte Cypress (Atividade 2)

A suíte da A1 tem 5 testes (`cypress/e2e/ct01` a `ct05`) e já usava `data-cy` e comandos de apoio, mas ainda repetia seletores, dados e sequências de passos. A refatoração manteve os 5 testes e as mesmas verificações, sem apagar nem desativar nenhum caso. Os commits são pequenos, um por mudança, e a entrega está na tag `atividade-2`.

## Tabela de smells (problema → solução)

| # | Smell | Onde estava | Por que era problema | Solução |
|---|-------|-------------|----------------------|---------|
| 1 | Seletores `data-cy` repetidos | 47 ocorrências nos 5 specs | Mudou um `data-cy`, é preciso editar vários arquivos | `cypress/support/pages/UsersPage.js` (a aplicação tem uma única tela). Os seletores existem só nele e os specs chamam métodos |
| 2 | Dados dentro dos testes | nomes, idades e e-mails em todos os specs | Difícil reutilizar e trocar a massa de dados | `cypress/fixtures/usuarios.json`, usada nos 5 testes. O CT03 é o cenário de falha e usa `diegoIdadeInvalida` (idade 200) |
| 3 | Textos da interface escritos no teste | CT03 (erro de idade), CT04 (títulos e botão), CT05 (confirmação) | Uma mudança de texto quebra o teste em vários pontos | `cypress/fixtures/mensagens.json` |
| 4 | URL da API fixa no código | `support/commands.js` | Não dá para apontar a suíte para outro ambiente sem editar código | `env.apiUrl` em `cypress.config.js`, lida com `Cypress.env('apiUrl')` |
| 5 | Criar usuários e abrir a tela, repetido | CT01, CT04, CT05 | Mesma sequência copiada em três testes | Passo `cy.abrirComUsuarios([...])` |
| 6 | Preencher e enviar o formulário, repetido | CT02, CT03 | Mesma sequência copiada | Passo `cy.cadastrarUsuario(usuario)` |
| 7 | Conferência do card repetida | CT01 (2x), CT02, CT04, CT05 | Mesma checagem de nome, idade e e-mail copiada | Passo `cy.verificarCard(indice, usuario)` |
| 8 | Asserção dentro de callback que pode nunca rodar | CT05, `cy.on('window:confirm')` | Se o diálogo não abrisse, o teste passava sem checar a mensagem | `cy.stub()` no `window:confirm` e asserção `calledOnce` + `calledWith` depois do clique |
| 9 | Asserção dependente da ordem por causa do `within` | CT04 (havia o comentário "espera o card ser recriado"), e `within` também no CT01 e CT02 | O card é refeito após salvar, e o `within` podia apontar para um elemento antigo, o que exigia ordem cuidadosa das asserções | Os getters do Page Object partem de `cy.get()` e a consulta é refeita até passar |
| 10 | Esperas fixas | nenhuma encontrada (`cy.wait(<tempo>)`, `setTimeout`, `sleep`) | Não havia o que remover | `npm run verificar:esperas` falha se alguma aparecer, e o `cy:run:3x` roda essa checagem antes dos testes |

O sistema não tem login, então os três passos extraídos foram os que realmente se repetiam (itens 5, 6 e 7).

## Como rodar e conferir

Com a API e o frontend de pé (veja o `README.md`), o comando abaixo confere as esperas e roda a suíte 3 vezes seguidas, parando na primeira falha:

```
npm run cy:run:3x
```

No Docker (porta 5500), use a variável `CYPRESS_BASE_URL=http://localhost:5500` antes do comando. As três execuções precisam terminar com 5 testes passando.
