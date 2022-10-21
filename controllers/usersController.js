const CustomError = require("../helpers/customError")
const UserModel = require("../models/UserModel")
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res) => {
  try {
  const { limit = 15, page = 1} = req.query
   const [userCount, users] = await Promise.all([
      UserModel.count(),
      UserModel.find().skip((limit * page) - limit).limit(limit)
    ])
    res.status(200).json({total : userCount, page, users})
  } catch (error) {
    res.status(400 || error.code).json({message : error.message})
  }
}

const getUsersIsAcepted = async (req, res) => {
  try {
  const { limit = 15, page = 1} = req.query
   const [userCount, users] = await Promise.all([
      UserModel.count(),
      UserModel.find().skip((limit * page) - limit).limit(limit).select('-students -courseInCharge -phone -adress -updatedAt')
    ])
    if(users.length === 0) throw new CustomError('no hay registros para mostrar.', 404)
    res.status(200).json({total : userCount, page, users})
  } catch (error) {
    res.status(400 || error.code).json({message : error.message})
  }
}


const registerUser = async (req, res) => {
  try {
    const { password, ...user } = req.body
    const salt = bcrypt.genSaltSync(10)
    const passwordEncripted = bcrypt.hashSync(password, salt)
    const newUser = new UserModel({
      ...user,
      password: passwordEncripted
    })
    const userSaved = await newUser.save()
    if(!userSaved) throw new CustomError('falla al guardar el usuario', 500)
    res.status(201).json({message : "usuario creado"})
  } catch (error) {
    res.status(400 || error.code).json({message : error.message})
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const userById = await UserModel.findById(id)
    if(!userById) throw new CustomError('usuario no encontrado', 404)
    res.status(200).json(userById)
  } catch (error) {
    res.status(error.code || 400).json({message : error.message})
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const userDeleted = await UserModel.findByIdAndDelete(id)
    if(!userDeleted) throw new CustomError('usuario no encontrado', 404)
    res.status(200).json({message : "usuario eliminado"})
  } catch (error) {
    res.status(error.code || 400).json({message : error.message})
  }
}

const updateByIdUser = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    const body = req.body
    const { id } = req.params
    const updateUser = await UserModel.findByIdAndUpdate(id, body, {new : true})
    if(!updateUser) throw new CustomError('usuario no encontrado', 404)
    res.status(200).json({message : 'usuario actualizado', updateUser})
  } catch (error) {
    res.status(error.code || 400).json({message : error.message})
  }
}

const auth = async (req, res) => {
  try {
    const id = req.id
    const user = await UserModel.findById(id)
    if(!user) throw new CustomError('Usuario no encontrado', 404)
    res.status(200).json(user)
  } catch (error) {
    res.status(error.code || 500).json({message: error.message})
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  deleteUser,
  updateByIdUser,
  auth,
  getUsersIsAcepted
}