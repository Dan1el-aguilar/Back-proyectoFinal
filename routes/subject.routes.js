const { Router } = require('express')
const { addSubject, getAllSubjects, deleteSubject, getSubjectById, updateByIdSubjects } = require('../controllers/subjectControllers')
const route = Router()
const { check } = require('express-validator')
const validateFields = require('../middlewares/validateFields')

route.get('/', getAllSubjects)
route.get('/:id', check('id').isMongoId().withMessage('No es un ID de MongoDB'), validateFields, getSubjectById)
route.post('/', addSubject)
route.put('/:id',check('id').isMongoId().withMessage('no es un ID de MongoDB'), validateFields, updateByIdSubjects)
route.delete('/:id',check('id').isMongoId().withMessage('no es un ID de MongoDB'), validateFields ,deleteSubject)

module.exports = route