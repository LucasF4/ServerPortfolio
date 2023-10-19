const express = require('express');
//const authorize = require('./authorized_middleware');
const app = express();
const port = process.env.PORT || 8080;
const axios = require('axios')

require('dotenv').config();

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/imagem', express.static(__dirname + 'public/imagem'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('../view/portfolio')
})

//Adicionando rota com verificação de middleware se a aplicação tem permissão em acessar os dados retornados da API

app.get('/download', (req, res) => {
    try {
        const file = `${__dirname}/public/upload_cv/Currículo Lucas.pdf`;
        res.download(file);
        console.log('Donwload realizado com sucesso!')
    } catch (e) {
        res.status(401).send("Something Went Wrong!")
        console.log(e);
    }
})

app.use(function (req, res, next) {
    res.status(400).render('../view/404', { url: req.url })
})

setInterval(async () => {
    var url = 'https://lucasfelix-portfolio.onrender.com/'
    await axios.get(url, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async resp => {
        console.log(`ping ${url}`)
    }).catch((e) => { console.log(e) })
}, 45000)

app.listen(port, () => {
    console.log(`SERVIDOR RODANDO NA PORTA: ${port}`)
})

//Projeto lembrando como inicia uma API node.js