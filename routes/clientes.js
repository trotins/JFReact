const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require('bcrypt');

router.post('/registo', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
            conn.query(
                `INSERT INTO clientes (Nome,iban,email,Telefone,VendedoresFK,password)
                        VALUES(?,?,?,?,?,?)`,
            [
                req.body.Nome,
                req.body.iban,
                req.body.email,
                req.body.Telefone,
                req.body.VendedoresFK,
                hash
            ],
                (error, results) => {
                    conn.release();
                    if (error) { return res.status(500).send({ error: error }) }
                    const response = {
                        mensagem: "Cliente criado com sucesso",
                        cliente: {
                            Id_Cliente:results.insertId,
                            Nome: req.body.Nome,
                            iban: req.body.iban,
                            email: req.body.email,
                            Telefone: req.body.Telefone
                        }
                    }
                    return res.status(201).send(response)
                })
        });
    });
})



module.exports = router;