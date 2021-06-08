const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routacarro = require('./routes/carros');
const routaClientes = require('./routes/clientes');

app.use(morgan('dev'));
app.use('/imagens', express.static('imagens'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 

app.use('/carro',routacarro);
app.use('/clientes',routaClientes);

//quando nao encontra o caminho 
app.use((req, res, next) => {
    const erro = new Error('Pagina nao encontrada');
    erro.status= 404;
    next(erro);
}); 

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }   
    });
});
module.exports= app;