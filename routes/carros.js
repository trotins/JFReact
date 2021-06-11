const express = require("express");
const router = express.Router();
const multer = require('multer');
const login = require('../Middleware/login');
const Carros_Controller = require("../Controllers/Carros_controller")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'imagens/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage })

router.get("/", Carros_Controller.getCarros);

router.post(
  "/",
  login.obrigatorio,
  upload.single('Foto'),
  Carros_Controller.postCarros
);

router.get("/:Id_Carro", Carros_Controller.getEspecifico);

router.patch("/:Id_Carro", login.obrigatorio,upload.single('Foto'), Carros_Controller.patchCarro);

router.delete("/", login.obrigatorio, Carros_Controller.deleteCarro);

router.post(
  '/:Id_Carro/imagem',
  login.obrigatorio,
  upload.single('Foto'),
  Carros_Controller.postCarrosImg
  );

router.get(
  '/:Id_Carro/imagens',
  Carros_Controller.getCarrosImg
);
router.delete(
  '/:Id_Carro/:Id_Imagem',
  login.obrigatorio,
  Carros_Controller.deleteImagem
);

module.exports = router;
