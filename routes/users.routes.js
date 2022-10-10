const { Router } = require('express');
const { getAllUsers, registerUser, getUserById, deleteUser, updateByIdUser, auth, getUsersIsAcepted } = require('../controllers/usersController');
const { check } = require('express-validator'); 
const validateFields = require('../middlewares/validateFields');
const emailUnique = require('../helpers/emailUnique');
const veryfyAuth = require('../middlewares/veryfyAuth');
const veryfyAdmin = require('../middlewares/veryfyAdmin')
const route = Router()

route.get('/',[veryfyAuth, veryfyAdmin], getAllUsers)

route.get('/auth', veryfyAuth, auth)

route.get('/isacepted', getUsersIsAcepted)

route.get('/:id',[veryfyAuth, veryfyAdmin],
 check('id').isMongoId().withMessage('No es un ID de MongoDB'),
validateFields
 , getUserById)

route.post('/',[
check('name').not().isEmpty().withMessage('campo Nombre Requerido').isLength({min: 3, max:25}).withMessage('minimo 3 y maximo 25 caracteres'),
check('email').isEmail().withMessage('Ingrese un mail Valido').custom(emailUnique),
check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).withMessage('minimo 8 caracteres, una letra mayuscula, un numero y una caracter especial').isLength({max: 30}).withMessage('Maximo 30 caracteres'),
check('phone').matches(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/).withMessage('Ingrese un numero de telefono valido'),
check('adress').isLength({min: 5, max: 25}).withMessage('ingrese una direccion'),
check('courseInCharge').not().isEmpty().isLength({min: 3, max: 30}).withMessage('Ingrese su Curso, Minimo 3 y Maximo 30  Caracteres'),
check('state').isBoolean({strict: true}).optional().withMessage('ingrese un Booleano (true o false)'),
check('role').isIn(['USER', 'ADMIN']).withMessage('indique rol').optional(),
validateFields
], registerUser)

route.delete('/:id',[veryfyAuth, veryfyAdmin],
check('id').isMongoId().withMessage('No es un ID de MongoDB'),
validateFields
, deleteUser)

route.put('/:id', veryfyAuth,
check('id').isMongoId().withMessage('No es un ID de MongoDB'),
check('name').isLength({min: 3, max: 25}).withMessage('minimo 3 y maximo 25 caracteres').optional(),
check('password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).withMessage('minimo 8 caracteres, una letra mayuscula, un numero y una caracter especial').optional(),
check('phone').matches(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/).withMessage('Ingrese un numero de telefono valido').optional(),
check('adress').isLength({min: 5, max: 25}).withMessage('ingrese una direccion').optional(),
check('courseInCharge').not().isEmpty().isLength({min: 3, max: 30}).withMessage('Ingrese su Curso, Minimo 3 y Maximo 30  Caracteres').optional(),
check('state').isBoolean({strict: true}).withMessage('ingrese un Booleano (true o false)').optional(),
check('role').isIn(['USER', 'ADMIN']).withMessage('indique rol').optional(),
validateFields, 
updateByIdUser)

module.exports = route