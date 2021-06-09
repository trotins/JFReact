const mysql = require("../mysql").pool;


exports.getCarros =  (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query("select * from carros", (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
            quantidade : result.lenght,
            carros : result.map(car => {
                return {
                  Id_Carro: car.Id_Carro,
                  Combustivel:car.Combustivel,
                  Cilindrada:car.Cilindrada,
                  Potencia:car.Potencia,
                  Matricula:car.Matricula,
                  Cor:car.Cor,
                  Tipo:car.Tipo,
                  Ano:car.Ano,
                  Marca:car.Marca,
                  Descricao:car.Descricao,
                  Foto:car.Foto,
                  VendedoresFK:car.VendedoresFK,
                  request:{
                      tipo:'GET',
                      descricao:'Devolve os Carros',
                      url: 'http://localhost:3000/carro/' + car.Id_Carro
                  }
              }
            })
        }
        return res.status(200).send({ response });
      });
    });
}

exports.postCarros = (req, res, next) => {
    console.log(req.file);
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
          req.file.path,
          req.body.VendedoresFK,
        ],
        (error, result, field) => {
          conn.release();
  
          if (error) {return res.status(500).send({error: error}) }
            const response = {
              mensagem: "Carro inserido",
              carro: {
                  Combustivel:req.body.Combustivel,
                  Cilindrada:req.body.Cilindrada,
                  Potencia:req.body.Potencia,
                  Matricula:req.body.Matricula,
                  Cor:req.body.Cor,
                  Tipo:req.body.Tipo,
                  Ano:req.body.Ano,
                  Marca:req.body.Marca,
                  Descricao:req.body.Descricao,
                  Foto:req.file.path,
                  VendedoresFK:req.body.VendedoresFK,
                  request:{
                      tipo:'POST',
                      descricao:'Carro inserido',
                      url: 'http://localhost:3000/carro'
                  }
              }
            } 
          return res.status(201).send(response);
        }
      )
    });
}

exports.getEspecifico = (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        "select * from carros where Id_Carro = ?",
        [req.params.id_carro],
        (error, result, fields) => {
          conn.release();
          if (error) { 
            return res.status(500).send({ error: error });
          }
  
          // eslint-disable-next-line eqeqeq
          if(result.lenght == 0 ){
              return res.status(404).send({
                  mensagem: 'Carro desconhecido'
              })
          }
          const response = {
              carro: {
                  Id_carro: result[0].id_carro,
                  Combustivel:result[0].Combustivel,
                  Cilindrada:result[0].Cilindrada,
                  Potencia:result[0].Potencia,
                  Matricula:result[0].Matricula,
                  Cor:result[0].Cor,
                  Tipo:result[0].Tipo,
                  Ano:result[0].Ano,
                  Marca:result[0].Marca,
                  Descricao:result[0].Descricao,
                  Foto:result[0].Foto,
                  VendedoresFK:result[0].VendedoresFK,
                  request:{
                      tipo:'GET',
                      descricao:'Carro Encontrado',
                      url: 'http://localhost:3000/carro'
                  }
              }
            } 
          return res.status(200).send(response);
        }
      );
    });
}

exports.patchCarro = (req, res, next) => {
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
        (error, result, field) => {
          conn.release();
          if (error) {
            res.status(500).send({
              error: error,
              response: null,
            });
          }
          const response = {
              mensagem: "Carro Atualizado",
              carroAtualizado: {
                  Id_Carro:req.body.Id_Carro,
                  Combustivel:req.body.Combustivel,
                  Cilindrada:req.body.Cilindrada,
                  Potencia:req.body.Potencia,
                  Matricula:req.body.Matricula,
                  Cor:req.body.Cor,
                  Tipo:req.body.Tipo,
                  Ano:req.body.Ano,
                  Marca:req.body.Marca,
                  Descricao:req.body.Descricao,
                  Foto:req.body.Foto,
                  VendedoresFK:req.body.VendedoresFK,
                  request:{
                      tipo:'POST',
                      descricao:'Carro Atualizado',
                      url: 'http://localhost:3000/carro/' + req.body.Id_Carro
                  }
              }
            } 
          return res.status(202).send(response);
        }
      );
    });
}

exports.deleteCarro = (req, res, next) => {
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
          (error, result, field) => {
            conn.release();
            if (error) {
              res.status(500).send({
                error: error,
                response: null,
              });
            }
            const response = {
                request: {
                    tipo:'POST',
                    descricao:'Carro Removido',
                    url: 'http://localhost:3000/carro/'
                }
            }
            res.status(202).send({
             response
            });
          }
        );
      });
}

exports.postCarrosImg = (req, res, next) => {
  console.log(req.file);
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `INSERT INTO Imagens_Carros(Id_Carro,caminho) 
            VALUES(?,?)`,
      [
        req.params.id_carro,
        req.file.path,
      ],
      (error, result, field) => {
        conn.release();

        if (error) {return res.status(500).send({error: error}) }
          const response = {
            mensagem: "Imagem inserida com sucesso",
            carro: {
                Id_Imagem:result.insertId,
                Id_Carro:parseInt(req.params.id_carro),
                Foto:req.file.path,
            }
          } 
        return res.status(201).send(response);
      }
    )
  });
}

exports.getCarrosImg =  (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("select * from Imagens_Carros Where Id_Carro= ?",[req.params.id_carro], (error, result, fields) => {
      conn.release();
      if (error) {
        return res.status(500).send({ error: error });
      }
      const response = {
          quantidade : result.lenght,
          carros : result.map(img => {
              return {
                Id_carro: parseInt(req.params.id_carro),
                Id_Imagem: img.Id_Imagem,
                caminho:img.caminho,
            }
          })
      }
      return res.status(200).send({ response });
    });
  });
}
exports.deleteImagem = exports.deleteCarro = (req, res, next) => {
  mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        `Delete from Imagens_Carros           
          WHERE Id_Carro = ?
            AND Id_Imagem =? 
              `,
        [
          req.params.id_carro,
          req.params.Id_Imagem,
        ],
        (error, result, field) => {
          conn.release();
          if (error) {
            res.status(500).send({
              error: error,
              response: null,
            });
          }
          const response = {
            mensagem:"Imagem Apagada"
              // request: {
              //     tipo:'POST',
              //     descricao:'Carro Removido',
              //     url: 'http://localhost:3000/carro/'
              // }
          }
          res.status(202).send({
           response
          });
        }
      );
    });
}