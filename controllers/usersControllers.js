var {check, validationResult} = require('express-validator')
var Usuario = require('../models/Usuario')
var {generateId} = require('../helpers/tokens')
var {emailRegistro} = require('../helpers/emails')


const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar sesión'
    })
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear cuenta'
    })
}
const registrar = async (req, res) => {

    await check('nombre')
          .notEmpty()
          .withMessage('El nombre es obligatorio')
          .run(req);

    await check('email')
          .isEmail()
          .withMessage('No es un email')
          .run(req);

    await check('password')
          .isLength({ min: 6 })
          .withMessage('El password debe ser al menos 6 caracteres')
          .run(req);
      
    await check('repetir_password')
          .equals(req.body.password)
          .withMessage('Los passwords deben ser iguales')
          .run(req);

    let resultado = validationResult(req);

    if(!resultado.isEmpty()){
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    const {nombre, email, password} = req.body

    const usuarioExiste = await Usuario.findOne({
        where: {
            email
        }
    })

    if(usuarioExiste){
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            errores: [{msg: 'Usuario ya existe'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }
    
    const usuario = await Usuario.create({
        nombre,
        email, 
        password,
        token: generateId()
    })

    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    return res.render('templates/mensaje', {
        pagina: 'Registro Exitoso',
        mensaje: 'Hemos enviado un email de confirmacion!'
    })
}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a Bienes Raices'
    })
}

const confirmar = async (req, res) => {
    const {token} = req.params
    const usuario = Usuario.findOne({where : {token}})
    console.log(usuario)
}


module.exports = {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar,
    confirmar

}