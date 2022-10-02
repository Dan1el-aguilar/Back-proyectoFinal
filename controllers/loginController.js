const CustomError = require("../helpers/customError")
const bcrypt = require('bcrypt')
const UserModel = require("../models/UserModel")

const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if(!user) throw new CustomError('Usuario no encontrado', 404)
    const isOk = bcrypt.compareSync(password, user.password)
    if(!isOk) throw new CustomError('credenciales invalidas', 401)
    const token = jwt.sign({email, id: user._id}, process.env.JWT_SECRET_TOKEN, {expiresIn: '1h'})
    res.status(200).json({message: 'logeo correcto', token, user})
  } catch (error) {
    res.status(error.code || 500).json({message: error.message})
  }
}

module.exports =  { login }