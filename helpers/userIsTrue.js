const UserModel = require("../models/UserModel")
const CustomError = require("./customError")

const userIsTrue = async (email) => {
  const searchEmail = await UserModel.find({email})
  if(searchEmail.length > 0) {
  if(!searchEmail[0].state) throw new CustomError(`te han inabilitado o estas a la espera de ser aceptado ${email}`, 403)
  }

}

module.exports = userIsTrue