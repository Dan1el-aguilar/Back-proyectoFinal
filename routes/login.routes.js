const { Router } = require('express');
const route = Router();
const { login } = require('../controllers/loginController')

route.post('/', login)

module.exports = route