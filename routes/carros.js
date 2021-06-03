const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'teste carros'
    });
});

router.post('/', (req, res, next) => {
    const carro = {
        nome:req.body.nome,
        preco:req.body,preco
    };
    res.status(201).send({
        mensagem: 'usando o post',
        carrocriado: carro 
    });
});


router.get('/:id_carro',(req, res, next) => {
    const id = req.params.id_carro
    if(id == 1){
        res.status(200).send({
            mensagem: 'Carro especifico',
            id: id
        }); 
    } else{
        res.status(200).send({
            mensagem: 'ID normal'
        })
    }
  
});
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando o patch'
    });
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando o Delete'
    });
});

module.exports = router;
