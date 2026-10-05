# Site de Regras — Sua Cidade RP

Template inspirado no visual da referência enviada: dark mode, sidebar fixa, detalhes laranja, busca de regras, navegação por seções e calculadora.

## Arquivos

- `index.html` — estrutura da página.
- `styles.css` — todo o visual e responsividade.
- `script.js` — regras, navegação, pesquisa e calculadora.

## Como usar

1. Extraia a pasta.
2. Abra `index.html` no navegador.
3. Para colocar as regras da sua cidade, edite o array `sections` no começo de `script.js`.
4. Troque `SUA CIDADE` e os textos de apresentação no `index.html`.
5. Se quiser mudar o roxo, altere `--purple` e `--purple-2` no `styles.css`.

Não precisa de banco de dados para esta versão. Para uma área administrativa onde você possa cadastrar/editar regras pelo navegador, será necessário adicionar um backend/API e banco de dados.


## Calculadora de Venda

A calculadora agora fica em uma página separada:

- `calculadora.html`
- `calculator.css`
- `calculator.js`

O botão "Calculadora de Venda" da página principal abre essa página.

A calculadora possui:
- categorias Legal, Ilegal, Hospital, Mecânica e Tuning;
- busca por item;
- botões + e - para quantidade;
- desconto Sem desconto, 10% e 15%;
- subtotal e total;
- copiar lista;
- limpar seleção;
- layout responsivo.
