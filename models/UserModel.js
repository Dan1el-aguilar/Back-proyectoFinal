const { Schema, model } = require('mongoose')

const UserModel = new Schema({
  name : {
    type: String,
    trim : true,
    required: true
  },
  email : {
    type : String,
    trim : true,
    required: true
  },
  password:{
    type : String,
    trim : true,
    required: true
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
  role : {
    type : String,
    required: true,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
}, {
  versionKey : false,
  timestamps : true
})

UserModel.methods.toJSON = function() {
  const { password, ...user } = this.toObject()
  return user
}
module.exports = model('User', UserModel)