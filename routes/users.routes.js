const { Router } = require('express');
const { getAllUsers, registerUser, getUserById, deleteUser, updateByIdUser } = require('../controllers/usersController');
const route = Router()

route.get('/', getAllUsers)
route.get('/:id', getUserById)
route.post('/', registerUser)
route.delete('/:id', deleteUser)
route.put('/:id', updateByIdUser)

module.exports = route