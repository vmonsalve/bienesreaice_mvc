var express = require('express');
var router = express.Router();
var { formularioLogin,formularioRegistro, formularioOlvidePassword, registrar, confirmar } = require('../controllers/usersControllers.js');

 /* GET users listing. */
router.get('/login', formularioLogin);
router.get('/registro', formularioRegistro);
router.post('/registro', registrar);
router.get('/confirmar/:token', confirmar)
router.get('/olvide-password', formularioOlvidePassword);
module.exports = router;
