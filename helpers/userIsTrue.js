const UserModel = require("../models/UserModel")


const userIsTrue = async (email) => {
  const searchEmail = await UserModel.find({email})
  if(searchEmail.length > 0) {
  if(!searchEmail[0].state) throw new Error(`te han inabilitado o estas a la espera de ser aceptado ${email}`)
  }

}

module.exports = userIsTrue