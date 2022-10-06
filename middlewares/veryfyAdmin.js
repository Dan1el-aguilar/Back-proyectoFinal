const UserModel = require("../models/UserModel")

const veryfyAdmin = async (req, res, next) => {
  try {
    const id = req.id
    const user = await UserModel.findById(id)
    if(user.role === 'ADMIN') {
      next()
    }else {
      throw new Error('Usted no tiene Permisos')
    }
  } catch (error) {
    res.status(403).json({message: error.message})
  }
}

module.exports = veryfyAdmin