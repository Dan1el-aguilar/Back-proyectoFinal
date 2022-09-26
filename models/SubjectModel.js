const { Schema, model } = require('mongoose')

const SubjectModel = new Schema({
  name : {
    type : String,
    trim : true,
    required : true
  }
},{
  versionKey : false,
  timestamps : true
})

module.exports = model('Subject', SubjectModel)
