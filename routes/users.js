var express = require('express');
var router = express.Router();
var { formularioLogin,formularioRegistro, formularioOlvidePassword } = require('../controllers/usersControllers.js');

 /* GET users listing. */
router.get('/login', formularioLogin);
router.get('/registro', formularioRegistro);
router.get('/olvide-password', formularioOlvidePassword);
module.exports = router;
