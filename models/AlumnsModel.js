const { Schema, model } = require('mongoose')

const AlumnModel = new Schema({
  nameCompleted : {
    type : String,
    trim : true
  },
  curse : {
    type : String,
    trim : true
  },
  cuoteDay : {
    type : Boolean,
    default : true
  },
  phone : {
    type : Number,
    trim : true
  },
  adress : {
    type : String,
    trim : true
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = model('Alumn', AlumnModel)