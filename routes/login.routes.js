const { Router } = require('express');
const route = Router();
const { login } = require('../controllers/loginController')
const { check } = require('express-validator');
const validateFields = require('../middlewares/validateFields');
const userIsTrue = require('../helpers/userIsTrue');

route.post('/',
check('email').isEmail().withMessage("ingrese un email Valido").custom(userIsTrue),
check('password', 'campo requerido').not().isEmpty().isLength({max: 30}).withMessage('Maximo 30 caracteres'),
validateFields
, login)

module.exports = route