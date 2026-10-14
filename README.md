# CRUD de Usuários — Testes E2E com Cypress

Sistema CRUD de usuários (nome, idade e e-mail) com API em PHP (`crud-api`) e frontend em JavaScript + Axios + Vite (`crud-frontend-axios`). Esta atividade adiciona testes end-to-end com **Cypress**, que abrem o frontend no navegador e conferem também o que foi gravado na API.

## Pré-requisitos

- Node.js 20 ou superior
- Docker Desktop **ou** PHP 8.3 ou superior (para subir a API sem Docker)

## 1. Instalar o Cypress

Na raiz do repositório:

```bash
npm install
```

## 2. Subir o sistema

### Opção A — Docker (frontend na porta 5500, API na 8000)

```bash
docker compose up --build
```

O `--build` é necessário para o frontend incluir os atributos `data-cy`.

### Opção B — Sem Docker (frontend na porta 8080, API na 8000)

Instale as dependências do frontend uma vez:

```bash
cd crud-frontend-axios
npm install
cd ..
```

Terminal 1, na raiz do projeto (API PHP):

```powershell
# Windows PowerShell
$env:DATA_FILE = "$PWD\crud-api\data\data.test.json"
php -S localhost:8000 -t crud-api/public crud-api/public/index.php
```

```bash
# Linux / macOS / Git Bash
DATA_FILE="$PWD/crud-api/data/data.test.json" php -S localhost:8000 -t crud-api/public crud-api/public/index.php
```

Terminal 2 (frontend):

```bash
cd crud-frontend-axios
npm run dev
```

> **Atenção:** os testes apagam todos os usuários antes de cada caso para partir de um estado conhecido. Na Opção B a API usa um arquivo separado (`data.test.json`, ignorado pelo Git) e o `data.json` não é tocado. Na Opção A os testes apagam os usuários de `crud-api/data/data.json`; faça backup antes, se necessário.

## 3. Executar os testes

Em outro terminal, na raiz do repositório. O `baseUrl` padrão (`cypress.config.js`) é `http://localhost:8080`, que corresponde à Opção B. Na Opção A, informe a porta 5500.

**Modo interativo (`open`):**

```bash
npx cypress open
# Docker (Opção A):
npx cypress open --config baseUrl=http://localhost:5500
```

**Modo headless (`run`)**, que roda os 5 testes no terminal e grava os vídeos em `evidencias/videos`:

```bash
npx cypress run
# Docker (Opção A):
npx cypress run --config baseUrl=http://localhost:5500
```

Também existem os atalhos `npm run cy:open` e `npm run cy:run`.

## Configuração

- `cypress.config.js`: define o `baseUrl` do frontend (`http://localhost:8080`), a pasta de vídeos (`evidencias/videos`) e a de screenshots de falha (`evidencias/screenshots`).
- `cypress/support/commands.js`: contém a URL da API (`http://localhost:8000/api/users`) e os comandos que preparam e conferem os dados (`resetUsers`, `seedUser`, `getUsersFromApi`).
- `cypress/support/e2e.js`: esvazia a base de usuários antes de cada teste.

## Estrutura dos testes

```
cypress/
  e2e/
    ct01-listar-usuarios.cy.js
    ct02-criar-usuario.cy.js
    ct03-validacao-idade.cy.js
    ct04-editar-usuario.cy.js
    ct05-excluir-usuario.cy.js
  support/
    commands.js
    e2e.js
docs/casos-de-teste.md   # descrição e resultado dos 5 casos
evidencias/              # vídeos e print da execução do npx cypress run
```

Os elementos da tela são selecionados **exclusivamente por `data-cy`** (por exemplo `[data-cy="btn-submit"]`). Os atributos foram adicionados em `crud-frontend-axios/src/index.html` e `crud-frontend-axios/src/scripts/dom/render.js`.

## Problemas comuns

- **`ECONNREFUSED` ou página não abre:** confirme que a API (8000) e o frontend (8080 ou 5500) estão de pé antes de rodar o Cypress.
- **Elementos `data-cy` não encontrados no Docker:** reconstrua as imagens com `docker compose up --build`.
- **Visual sem estilo:** o Bootstrap é carregado por CDN, então é preciso internet durante a execução.
- **Aviso de Electron "deprecated":** é apenas um aviso do Cypress; os testes rodam normalmente.