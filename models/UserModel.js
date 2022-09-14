const { Schema, model } = require('mongoose')

const UserModel = new Schema({
  nameComplete : {
    type: String,
    trim : true
  },
  email : {
    type : String,
    trim : true
  },
  phone : {
    type : Number,
    trim : true
  },
  adress : {
    type : String,
    trim : true
  },
  courseInCharge : {
    type : [String]
  },
  state : {
    type : Boolean,
    default : false
  },
  admin : {
    type : Boolean,
    default : false
  }
}, {
  versionKey : false,
  timestamps : true
})

module.exports = model('User', UserModel)