const { Router } = require('express')
const { getAllAlumns, addAlumn, getByIdAlumn, deleteAlumn, updateAlumn, searchAlumn } = require('../controllers/alumnsControllers')
const route = Router()

route.get('/', getAllAlumns)
route.get('/search', searchAlumn)
route.get('/:id', getByIdAlumn)
route.delete('/:id', deleteAlumn)
route.post('/', addAlumn)
route.put('/:id', updateAlumn)

module.exports = route