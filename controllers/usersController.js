const UserModel = require("../models/UserModel")

const getAllUsers = (req, res) => {
  res.json([])
}

const addUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body)
    const userSaved = await newUser.save()
    res.status(201).json({message : "usuario creado"})
  } catch (error) {
    console.log(error);
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const userById = await UserModel.findById(id)
    res.status(200).json({userById})
  } catch (error) {
    console.log(error);
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const userById = await UserModel.findByIdAndDelete(id)
    res.status(200).json({message : "usuario eliminado"})
  } catch (error) {
    console.log(error);
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