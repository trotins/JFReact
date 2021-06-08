const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/registo', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }  
        conn.query('SELECT * FROM clientes where email = ?', [req.body.email], (error,results)=>{
            if (error) { return res.status(500).send({ error: error }) }  

            if (results.length >0 ){
                res.status(409).send({mensagem:'Cliente ja existente'})
            }else{
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
            }
        })    
    });
})

router.post('/login',(req,res,next)=>{
    mysql.getConnection((error, conn)=>{
        if (error) { return res.status(500).send({ error: error }) }  
        const query =`SELECT * from clientes where email = ? `;
        conn.query(query,[req.body.email],(error,results,fields)=>{
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }  
            if(results.length <1){
                return res.status(401).send({mensagem:'Falha no Login'})
            }
            bcrypt.compare(req.body.password, results[0].password,(err,result)=>{
                if(err){
                return res.status(401).send({mensagem:'Falha no Login'})
                }
                if(result){
                    const token = jwt.sign({
                        Id_Cliente : results[0].Id_Cliente,
                        email: results[0].email,
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn:"1h"
                    });
                    return res.status(200).send({mensagem:'Login efetuado', token:token})
                }
                return res.status(401).send({mensagem:'Falha no Login'})
            })
        })
    })
})


module.exports = router;