const { Router } = require('express');
const { getAllUsers, addUser, getUserById, deleteUser } = require('../controllers/usersController');
const route = Router()

route.get('/', getAllUsers)
route.get('/:id', getUserById)
route.post('/', addUser)
route.delete('/:id', deleteUser)

module.exports = route