const mysql = require("../mysql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Criar Cliente
exports.registoCliente = async (req, res, next) => {
    try {
        const result = await mysql.execute(
            'SELECT * FROM clientes where email = ?',
            [req.body.email]
        )
        if (result.length > 0) {
            res.status(409).send({ mensagem: 'Cliente ja existente' })
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        const results = await mysql.execute(
            `INSERT INTO clientes (Nome,iban,email,Telefone,VendedoresFK,password)
                    VALUES(?,?,?,?,?,?)`,
            [
                req.body.Nome,
                req.body.iban,
                req.body.email,
                req.body.Telefone,
                req.body.VendedoresFK,
                hash
            ])
        const response = {
            mensagem: "Cliente criado com sucesso",
            cliente: {
                Id_Cliente: results.insertId,
                Nome: req.body.Nome,
                iban: req.body.iban,
                email: req.body.email,
                Telefone: req.body.Telefone
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

//Login Cliente
exports.loginCliente = async (req, res, next) => {
    try {
        const result = await mysql.execute(
            `SELECT * from clientes where email = ? `,
            [req.body.email]
        )
        if (result.length < 1) {
            return res.status(401).send({ mensagem: 'Falha no Login' })
        }

        if (await bcrypt.compareSync(req.body.password, result[0].password)) {
            const token = jwt.sign({
                Id_Cliente: result[0].Id_Cliente,
                email: result[0].email,
            },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                });
            return res.status(200).send({ mensagem: 'Login efetuado', token: token })
        }
        return res.status(401).send({ mensagem: 'Falha no Login' })
    } catch (error) {
        return res.status(500).send({ message: 'Falha na autenticação' });
    }
}


