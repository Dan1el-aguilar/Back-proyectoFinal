const CustomError = require("../helpers/customError")
const UserModel = require("../models/UserModel")

const getAllUsers = async (req, res) => {
  try {
  const { limit = 15, page = 1} = req.query
   const [userCount, users] = await Promise.all([
      UserModel.count(),
      UserModel.find().skip((limit * page) - limit).limit(limit)
    ])
    if(users.length === 0) throw new CustomError('sin resultados', 404)
    res.status(200).json({userCount, page, users})
  } catch (error) {
    res.status(400 || error.code).json({message : error.message})
  }
}

const addUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body)
    const userSaved = await newUser.save()
    if(!userSaved) throw new CustomError('falla al guardar el usuario', 500)
    res.status(201).json({message : "usuario creado"})
  } catch (error) {
    res.status(404 || error.code).json({message : error.message})
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
    res.status(404).json({message : error.message})
  }
}

// const updateUser = async (req, res) => {
//   const { id } = req.params
//   try {
    
//   } catch (error) {
    
//   }
// }

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser
}