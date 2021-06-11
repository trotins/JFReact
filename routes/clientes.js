const express = require("express");
const router = express.Router();


const clientes_Controller = require('../Controllers/Clientes_controller');
router.post('/registo', clientes_Controller.registoCliente );

router.post('/login',clientes_Controller.loginCliente);


module.exports = router;