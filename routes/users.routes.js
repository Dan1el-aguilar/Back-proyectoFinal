const { Router } = require('express');
const { getAllUsers } = require('../controllers/usersController');
const route = Router()

route.get('/', getAllUsers)

module.exports = route