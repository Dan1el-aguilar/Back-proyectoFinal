const { Router } = require('express')
const { addSubject, getAllSubjects, deleteSubject, getSubjectById, updateByIdSubjects } = require('../controllers/subjectControllers')
const route = Router()
const { check } = require('express-validator')
const validateFields = require('../middlewares/validateFields')
const veryfyAuth = require('../middlewares/veryfyAuth')
const veryfyAdmin = require('../middlewares/veryfyAdmin')

route.get('/',[veryfyAuth, veryfyAdmin], getAllSubjects)
route.get('/:id',[veryfyAuth, veryfyAdmin], check('id').isMongoId().withMessage('No es un ID de MongoDB'), validateFields, getSubjectById)
route.post('/', check('name', 'minimo 3 y maximo 20 caracteres').isLength({min: 3, max: 20}),[veryfyAuth, veryfyAdmin], addSubject)
route.put('/:id', [veryfyAuth, veryfyAdmin],check('id').isMongoId().withMessage('no es un ID de MongoDB'), validateFields, updateByIdSubjects)
route.delete('/:id', [veryfyAuth, veryfyAdmin],check('id').isMongoId().withMessage('no es un ID de MongoDB'), validateFields ,deleteSubject)

module.exports = route