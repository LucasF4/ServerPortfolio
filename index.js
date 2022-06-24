const express = require('express');
const authorize = require('./authorized_middleware');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/imagem', express.static(__dirname + 'public/imagem'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('../view/portfolio')
})

//Adicionando rota com verificação de middleware se a aplicação tem permissão em acessar os dados retornados da API

app.get('/dados', authorize(), (req,res) => {
    res.json({teste: "teste1234"});
})

app.listen(port, () => {
    console.log(`SERVIDOR RODANDO NA PORTA: ${port}`)
})

//Projeto lembrando como inicia uma API node.js