const express = require('express')
const morgan = require('morgan')
const chalk = require('chalk')
const app = express()
const port = 3000

const produtoRota = require("./controllers/produto/router.js")

const morganMiddleware = morgan(function (tokens, req, res) {
  return [
      '\n\n\n',
      chalk.red(tokens.method(req, res)),
      chalk.green(tokens.url(req, res)),
      chalk.yellow(tokens['response-time'](req, res) + ' ms'),
      '\n\n\n',
  ].join(' ');
});

app.use(morganMiddleware);


app.use(express.json())

app.get('/', (req, res) => {
  res.send('A documentação da api')
})

app.use('/', produtoRota)

app.use((req, res) => {
  res.status(404).send("{message: rota não encontrada}")
})

app.listen(port, () => {
  console.log(`Rodando no link http://localhost:${port}`)
})