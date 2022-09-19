const { Router } = require('express')
const { addSubject, getAllSubjects, deleteSubject, getSubjectById, updateByIdSubjects } = require('../controllers/subjectControllers')
const route = Router()

route.get('/', getAllSubjects)
route.get('/:id', getSubjectById)
route.post('/', addSubject)
route.put('/:id', updateByIdSubjects)
route.delete('/:id', deleteSubject)

module.exports = route