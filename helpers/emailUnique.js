const UserModel = require("../models/UserModel")


const emailUnique = async (email) => {
const searchEmail = await UserModel.find({email})
  if(searchEmail.length !== 0) throw new Error(`El email ${email} ya se encuentra en uso.`)
  
}

module.exports = emailUnique