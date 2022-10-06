const { Router } = require('express')
const { getAllAlumns, addAlumn, getByIdAlumn, deleteAlumn, updateAlumn, searchAlumn } = require('../controllers/alumnsControllers')
const route = Router()
const { check } = require('express-validator')
const validateFields = require('../middlewares/validateFields')
const veryfyAuth = require('../middlewares/veryfyAuth')
const veryfyAdmin = require('../middlewares/veryfyAdmin')

route.get('/', [veryfyAuth, veryfyAdmin], getAllAlumns)

route.get('/search', veryfyAuth,
check('search').isLength({max: 20}).withMessage('Maximo 20 caracteres'),validateFields, searchAlumn)

route.get('/:id', [veryfyAuth, veryfyAdmin],
check('id').isMongoId().withMessage('no es ID de MongoDB'), validateFields
, getByIdAlumn)

route.delete('/:id',[veryfyAuth, veryfyAdmin],check('id').isMongoId().withMessage('no es ID de MongoDB'), validateFields, deleteAlumn)

route.post('/', [veryfyAuth, veryfyAdmin],
check('nameCompleted').not().isEmpty().isLength({min: 3, max: 20}).withMessage('Campo requerido'),
check('curse').not().isEmpty().isLength({min: 3, max: 20}).withMessage('Campo requerido'),
check('cuoteDay').isBoolean({strict: true}).withMessage('solo campo Booleano').optional(),
check('phone').matches(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/).withMessage('ingrese un Numero de teléfono Válido'),
check('adress').isLength({min: 5, max: 30}).withMessage('minimo 5 y maximo 30 caracteres'),
validateFields
, addAlumn)

route.put('/:id',[veryfyAuth, veryfyAdmin],check('id').isMongoId().withMessage('no es ID de MongoDB'), validateFields ,updateAlumn)

module.exports = route