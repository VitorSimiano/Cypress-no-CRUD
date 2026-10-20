// Falha (exit 1) se algum arquivo da pasta cypress/ usar espera fixa.
// Esperas por alias de intercept, como cy.wait('@usuarios'), continuam permitidas.
const fs = require('fs');
const path = require('path');

const PASTA = path.join(__dirname, '..', 'cypress');
const PROIBIDOS = [
  { regex: /cy\.wait\(\s*[^'"\s)]/, nome: 'cy.wait(<tempo>)' },
  { regex: /\bsetTimeout\s*\(/, nome: 'setTimeout' },
  { regex: /\bsleep\s*\(/, nome: 'sleep' },
  { regex: /Cypress\.Promise\.delay/, nome: 'Cypress.Promise.delay' },
];

function listarArquivos(pasta) {
  return fs.readdirSync(pasta, { withFileTypes: true }).flatMap((item) => {
    const caminho = path.join(pasta, item.name);
    if (item.isDirectory()) return listarArquivos(caminho);
    return caminho.endsWith('.js') ? [caminho] : [];
  });
}

const problemas = [];
listarArquivos(PASTA).forEach((arquivo) => {
  fs.readFileSync(arquivo, 'utf8').split(/\r?\n/).forEach((linha, i) => {
    PROIBIDOS.forEach(({ regex, nome }) => {
      if (regex.test(linha)) {
        problemas.push(`${path.relative(process.cwd(), arquivo)}:${i + 1}  ${nome}`);
      }
    });
  });
});

if (problemas.length > 0) {
  console.error('Esperas fixas encontradas:\n' + problemas.join('\n'));
  process.exit(1);
}
console.log('OK: nenhuma espera fixa encontrada em cypress/.');
