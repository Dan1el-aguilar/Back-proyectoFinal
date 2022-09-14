const { Router } = require('express')
const { getAllAlumns, addAlumn, getByIdAlumn, deleteAlumn, updateAlumn } = require('../controllers/alumnsControllers')
const route = Router()

route.get('/', getAllAlumns)
route.get('/:idAlumn', getByIdAlumn)
route.delete('/:id', deleteAlumn)
route.post('/', addAlumn)
route.put('/:id', updateAlumn)

module.exports = route