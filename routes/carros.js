const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("select * from carros", (error, resultado, fields) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      return res.status(200).send({ response: resultado });
    });
  });
});

router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `INSERT INTO carros(Combustivel, Cilindrada, Potencia, Matricula,Cor,Tipo, Ano, Marca, Descricao,Foto,VendedoresFK) 
            VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
      [
        req.body.Combustivel,
        req.body.Cilindrada,
        req.body.Potencia,
        req.body.Matricula,
        req.body.Cor,
        req.body.Tipo,
        req.body.Ano,
        req.body.Marca,
        req.body.Descricao,
        req.body.Foto,
        req.body.VendedoresFK,
      ],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }
        res.status(201).send({
          mensagem: "Carro inserido",
          id_carro: resultado.insertId,
        });
      }
    );
  });
});

router.get("/:id_carro", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "select * from carros where Id_Carro = ?",
      [req.params.id_carro],
      (error, resultado, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(200).send({ response: resultado });
      }
    );
  });
});

router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `UPDATE carros
                SET Combustivel = ?, 
                Cilindrada= ?, 
                Potencia= ?, 
                Matricula= ?,
                Cor= ?,
                Tipo= ?,
                Ano= ?, 
                Marca= ?, 
                Descricao= ?,
                Foto= ?,
                VendedoresFK= ? 
        WHERE Id_Carro =?        
            `,
      [
        req.body.Combustivel,
        req.body.Cilindrada,
        req.body.Potencia,
        req.body.Matricula,
        req.body.Cor,
        req.body.Tipo,
        req.body.Ano,
        req.body.Marca,
        req.body.Descricao,
        req.body.Foto,
        req.body.VendedoresFK,
        req.body.Id_Carro,
      ],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }
        res.status(202).send({
          mensagem: "Carro Atualizado",
        });
      }
    );
  });
});

router.delete("/", (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        conn.query(
          `Delete from carros           
            WHERE Id_Carro =?        
                `,
          [
            req.body.Id_Carro,
          ],
          (error, resultado, field) => {
            conn.release();
            if (error) {
              res.status(500).send({
                error: error,
                response: null,
              });
            }
            res.status(202).send({
              mensagem: "Carro Apagado",
            });
          }
        );
      });
});

module.exports = router;
