const mysql = require("../mysql");

//Ver os carros Todos
exports.getCarros = async (req, res, next) => {
  try {
    const result = await mysql.execute("select * from carros")
    const response = {
      quantidade: result.lenght,
      carros: result.map(car => {
        return {
          Id_Carro: car.Id_Carro,
          Combustivel: car.Combustivel,
          Cilindrada: car.Cilindrada,
          Potencia: car.Potencia,
          Matricula: car.Matricula,
          Cor: car.Cor,
          Tipo: car.Tipo,
          Ano: car.Ano,
          Marca: car.Marca,
          Descricao: car.Descricao,
          Foto: car.Foto,
          VendedoresFK: car.VendedoresFK,
          request: {
            tipo: 'GET',
            descricao: 'Devolve os Carros',
            url: 'http://localhost:3000/carro/' + car.Id_Carro
          }
        }
      })
    }
    return res.status(200).send({ response });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

//Inserir um novo Carro
exports.postCarros = async (req, res, next) => {
  try {
    const result = await mysql.execute(`
      INSERT INTO carros(Combustivel, Cilindrada, Potencia, Matricula,Cor,Tipo, Ano, Marca, Descricao,Foto,VendedoresFK) 
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
    )
    const response = {
      mensagem: "Carro inserido",
      carro: {
        Combustivel: req.body.Combustivel,
        Cilindrada: req.body.Cilindrada,
        Potencia: req.body.Potencia,
        Matricula: req.body.Matricula,
        Cor: req.body.Cor,
        Tipo: req.body.Tipo,
        Ano: req.body.Ano,
        Marca: req.body.Marca,
        Descricao: req.body.Descricao,
        Foto: req.file.path,
        VendedoresFK: req.body.VendedoresFK,
        request: {
          tipo: 'POST',
          descricao: 'Carro inserido',
          url: 'http://localhost:3000/carro'
        }
      }
    }
    return res.status(201).send(response);

  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

//Carro especifico
exports.getEspecifico = async (req, res, next) => {
  try {
    const result = await mysql.execute("select * from carros where Id_Carro = ?",
      [req.params.Id_Carro],
    )
    if (result.lenght == 0) {
      return res.status(404).send({
        mensagem: 'Carro desconhecido'
      })
    }
    const response = {
      carro: {
        Id_Carro: result[0].Id_Carro,
        Combustivel: result[0].Combustivel,
        Cilindrada: result[0].Cilindrada,
        Potencia: result[0].Potencia,
        Matricula: result[0].Matricula,
        Cor: result[0].Cor,
        Tipo: result[0].Tipo,
        Ano: result[0].Ano,
        Marca: result[0].Marca,
        Descricao: result[0].Descricao,
        Foto: result[0].Foto,
        VendedoresFK: result[0].VendedoresFK,
        request: {
          tipo: 'GET',
          descricao: 'Carro Encontrado',
          url: 'http://localhost:3000/carro'
        }
      }
    }
    return res.status(200).send(response);

  } catch (error) {
    return res.status(500).send({ error: error });
  }

}

//Atualizar Carro
exports.patchCarro = async (req, res, next) => {
  try {
    const result = await mysql.execute(
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
        req.file.path,
        req.body.VendedoresFK,
        req.params.Id_Carro,
      ])

    const response = {
      mensagem: "Carro Atualizado",
      carroAtualizado: {
        Id_Carro: req.params.Id_Carro,
        Combustivel: req.body.Combustivel,
        Cilindrada: req.body.Cilindrada,
        Potencia: req.body.Potencia,
        Matricula: req.body.Matricula,
        Cor: req.body.Cor,
        Tipo: req.body.Tipo,
        Ano: req.body.Ano,
        Marca: req.body.Marca,
        Descricao: req.body.Descricao,
        Foto: req.file.path,
        VendedoresFK: req.body.VendedoresFK,
        request: {
          tipo: 'POST',
          descricao: 'Carro Atualizado',
          url: 'http://localhost:3000/carro/' + req.params.Id_Carro
        }
      }
    }
    return res.status(202).send(response);

  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

//Apagar Carro
exports.deleteCarro = async (req, res, next) => {
  try {
    const result = await mysql.execute(
      `Delete from carros           
      WHERE Id_Carro =?`,
      [
        req.body.Id_Carro,
      ])
    const response = {
      request: {
        tipo: 'POST',
        descricao: 'Carro Removido',
        url: 'http://localhost:3000/carro/'
      }
    }
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

//Inserir Imagens dos Carros
exports.postCarrosImg = async (req, res, next) => {
  try {
    const result = await mysql.execute(
      `INSERT INTO Imagens_Carros(Id_Carro,caminho) 
          VALUES(?,?)`,
      [
        req.params.Id_Carro,
        req.file.path,
      ])
    const response = {
      mensagem: "Imagem inserida com sucesso",
      carro: {
        Id_Imagem: result.insertId,
        Id_Carro: parseInt(req.params.Id_Carro),
        Foto: req.file.path,
      }
    }
    return res.status(201).send(response);

  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

//Ver as Fotos dos Carro expecifico
exports.getCarrosImg = async (req, res, next) => {

  try {
    const result = await mysql.execute(
      "select * from Imagens_Carros Where Id_Carro= ?",
      [req.params.Id_Carro]
    )
    const response = {
      quantidade: result.lenght,
      carros: result.map(img => {
        return {
          Id_Carro: parseInt(req.params.Id_Carro),
          Id_Imagem: img.Id_Imagem,
          caminho: img.caminho,
        }
      })
    }
    return res.status(200).send({ response });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

exports.deleteImagem = async (req, res, next) => {
  try {
    const result = await mysql.execute(
    `Delete from Imagens_Carros           
      WHERE Id_Carro = ?
        AND Id_Imagem =?
    `,
    [
      req.params.Id_Carro,
      req.params.Id_Imagem,
    ])

    const response = {
        mensagem: "Imagem Apagada",
        request: {
            tipo:'POST',
            descricao:'Imagem Removida',
            url: 'http://localhost:3000/carro/'
        }
      }
      res.status(202).send({
        response
      });
  
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}
