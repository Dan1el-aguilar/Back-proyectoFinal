const CustomError = require("../helpers/customError")
const bcrypt = require('bcrypt')
const UserModel = require("../models/UserModel")

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    const isOk = bcrypt.compareSync(password, user.password)
    if(!isOk) throw new CustomError('credenciales invalidas', 401)
    res.status(200).json({message: 'logeo correcto'})
  } catch (error) {
    res.status(error.code || 500).json({message: error.message})
  }
}

module.exports =  { login }