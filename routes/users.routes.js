const { Router } = require('express');
const { getAllUsers, addUser, getUserById, deleteUser, updateByIdUser } = require('../controllers/usersController');
const route = Router()

route.get('/', getAllUsers)
route.get('/:id', getUserById)
route.post('/', addUser)
route.delete('/:id', deleteUser)
route.put('/:id', updateByIdUser)

module.exports = route