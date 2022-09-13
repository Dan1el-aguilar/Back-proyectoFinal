const { Schema, model} = require('mongoose')

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
  }
})

module.exports = model('User', UserModel)