const UserModel = require("../models/UserModel")


const userIsTrue = async (email) => {
  const searchEmail = await UserModel.find({email})
  if(searchEmail.length > 0) {
  if(!searchEmail[0].state) throw new Error(`No estas habilitado, un administrador debe autorizarte.`)
  }

}

module.exports = userIsTrue